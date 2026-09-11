import { randomUUID } from 'crypto';
import type { Request } from 'express';
import { RefreshToken } from '../models/RefreshToken';
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/User';

export interface IssuedTokens { accessToken: string; refreshToken: string; refreshExpiresAt: Date }

/** Issue a brand-new token family (login / signup / after password reset). */
export async function issueTokenFamily(userId: string, role: 'student' | 'admin', req?: Request): Promise<IssuedTokens> {
  const family = randomUUID();
  const { token, expiresAt } = signRefreshToken(userId, family);
  await RefreshToken.create({
    userId,
    tokenHash: hashToken(token),
    family,
    expiresAt,
    userAgent: req?.get('user-agent'),
    ip: req?.ip,
  });
  return { accessToken: signAccessToken(userId, role), refreshToken: token, refreshExpiresAt: expiresAt };
}

/**
 * Rotate a refresh token with reuse detection (spec §1.2).
 * - Unknown token → 401
 * - Token already revoked/rotated → THEFT: revoke whole family, 401
 * - Valid → mark old as revoked, issue new token in same family
 */
export async function rotateRefreshToken(presented: string, req?: Request): Promise<IssuedTokens & { userId: string }> {
  let payload;
  try {
    payload = verifyRefreshToken(presented);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const tokenHash = hashToken(presented);
  const stored = await RefreshToken.findOne({ tokenHash });

  if (!stored) {
    // Signed by us but not in DB — family was purged (logout-all) or DB reset. Be safe: revoke family.
    await RefreshToken.updateMany({ family: payload.family }, { $set: { revoked: true } });
    throw ApiError.unauthorized('Refresh token not recognised');
  }

  if (stored.revoked) {
    if (stored.replacedBy) {
      // This token was already rotated and is being presented again → theft. Burn the whole family.
      await RefreshToken.updateMany({ family: stored.family }, { $set: { revoked: true } });
      throw new ApiError(401, 'Refresh token reuse detected. All sessions have been logged out.', { code: 'TOKEN_REUSE' });
    }
    // Revoked by logout / logout-all / password reset — not a reuse attack, just a dead session.
    throw new ApiError(401, 'Session has been revoked. Please sign in again.', { code: 'SESSION_REVOKED' });
  }

  if (stored.expiresAt.getTime() < Date.now()) {
    throw ApiError.unauthorized('Refresh token expired');
  }

  const user = await User.findById(stored.userId);
  if (!user) throw ApiError.unauthorized('User no longer exists');

  const { token: newToken, expiresAt } = signRefreshToken(user.id, stored.family);
  const newHash = hashToken(newToken);

  // Atomically revoke the old token only if still unrevoked — protects against concurrent refreshes.
  const revoked = await RefreshToken.findOneAndUpdate(
    { _id: stored._id, revoked: false },
    { $set: { revoked: true, replacedBy: newHash } },
  );
  if (!revoked) {
    await RefreshToken.updateMany({ family: stored.family }, { $set: { revoked: true } });
    throw new ApiError(401, 'Refresh token reuse detected. All sessions have been logged out.', { code: 'TOKEN_REUSE' });
  }

  await RefreshToken.create({
    userId: user._id,
    tokenHash: newHash,
    family: stored.family,
    expiresAt,
    userAgent: req?.get('user-agent'),
    ip: req?.ip,
  });

  return {
    userId: user.id,
    accessToken: signAccessToken(user.id, user.role as 'student' | 'admin'),
    refreshToken: newToken,
    refreshExpiresAt: expiresAt,
  };
}

export async function revokeByToken(presented: string): Promise<void> {
  await RefreshToken.updateOne({ tokenHash: hashToken(presented) }, { $set: { revoked: true } });
}

export async function revokeAllForUser(userId: string): Promise<void> {
  await RefreshToken.updateMany({ userId, revoked: false }, { $set: { revoked: true } });
}
