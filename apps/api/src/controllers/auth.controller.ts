import type { Request, Response } from 'express';
import type { SignupInput, LoginInput } from '@college-junction/types';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { sendSuccess } from '../utils/response';
import { setAuthCookies, clearAuthCookies, REFRESH_COOKIE } from '../utils/cookies';
import { signEmailToken, verifyEmailToken } from '../utils/tokens';
import { issueTokenFamily, rotateRefreshToken, revokeByToken, revokeAllForUser } from '../services/token.service';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service';
import { serializeUser } from '../services/serializers';

export async function signup(req: Request, res: Response) {
  const { username, email, password } = req.body as SignupInput;

  const existing = await User.findOne({ $or: [{ email }, { username }] }).collation({ locale: 'en', strength: 2 });
  if (existing) {
    const errors: Record<string, string> = {};
    if (existing.email === email) errors.email = 'Email already registered';
    if (existing.username.toLowerCase() === username.toLowerCase()) errors.username = 'Username already taken';
    throw ApiError.conflict('Account already exists', errors);
  }

  const user = await User.create({ username, email, password });

  // Fire-and-forget email; failures shouldn't block signup.
  const token = signEmailToken(user.id, user.email, 'verify');
  sendVerificationEmail(user.email, user.username, token).catch((e) => console.error('verification email failed', e));

  const tokens = await issueTokenFamily(user.id, user.role as 'student' | 'admin', req);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens.refreshExpiresAt);

  return sendSuccess(res, { user: serializeUser(user, { includeEmail: true }) }, 'Account created. Please verify your email.', 201);
}

export async function login(req: Request, res: Response) {
  const { identifier, password } = req.body as LoginInput;
  const id = identifier.trim();

  // Email OR username, via $or (spec §3).
  const user = await User.findOne({ $or: [{ email: id.toLowerCase() }, { username: id }] })
    .collation({ locale: 'en', strength: 2 })
    .select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid credentials');
  }

  const tokens = await issueTokenFamily(user.id, user.role as 'student' | 'admin', req);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens.refreshExpiresAt);
  return sendSuccess(res, { user: serializeUser(user, { includeEmail: true }) }, 'Logged in');
}

export async function refresh(req: Request, res: Response) {
  const presented = req.cookies?.[REFRESH_COOKIE] as string | undefined;
  if (!presented) throw ApiError.unauthorized('No refresh token');

  try {
    const rotated = await rotateRefreshToken(presented, req);
    setAuthCookies(res, rotated.accessToken, rotated.refreshToken, rotated.refreshExpiresAt);
    return sendSuccess(res, { refreshed: true }, 'Session refreshed');
  } catch (e) {
    clearAuthCookies(res);
    throw e;
  }
}

export async function logout(req: Request, res: Response) {
  const presented = req.cookies?.[REFRESH_COOKIE] as string | undefined;
  if (presented) await revokeByToken(presented);
  clearAuthCookies(res);
  return sendSuccess(res, null, 'Logged out');
}

export async function logoutAll(req: Request, res: Response) {
  await revokeAllForUser(req.user!.id);
  clearAuthCookies(res);
  return sendSuccess(res, null, 'Logged out from all devices');
}

export async function me(req: Request, res: Response) {
  return sendSuccess(res, { user: serializeUser(req.user!, { includeEmail: true }) });
}

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.body as { token: string };
  let payload;
  try {
    payload = verifyEmailToken(token, 'verify');
  } catch {
    throw ApiError.badRequest('Verification link is invalid or has expired');
  }
  const user = await User.findById(payload.sub);
  if (!user || user.email !== payload.email) throw ApiError.badRequest('Verification link is invalid');
  if (!user.isEmailVerified) {
    user.isEmailVerified = true;
    await user.save();
  }
  return sendSuccess(res, { user: serializeUser(user, { includeEmail: true }) }, 'Email verified');
}

export async function resendVerification(req: Request, res: Response) {
  const { email } = req.body as { email: string };
  const user = await User.findOne({ email });
  // Always respond 200 to avoid account enumeration.
  if (user && !user.isEmailVerified) {
    const token = signEmailToken(user.id, user.email, 'verify');
    await sendVerificationEmail(user.email, user.username, token).catch((e) => console.error(e));
  }
  return sendSuccess(res, null, 'If that email is registered and unverified, a new link has been sent');
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body as { email: string };
  const user = await User.findOne({ email });
  if (user) {
    // Embed tokenVersion so the link is single-use: reset bumps the version.
    const token = signEmailToken(`${user.id}:${user.tokenVersion}`, user.email, 'reset');
    await sendPasswordResetEmail(user.email, user.username, token).catch((e) => console.error(e));
  }
  return sendSuccess(res, null, 'If that email is registered, a reset link has been sent');
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body as { token: string; password: string };
  let payload;
  try {
    payload = verifyEmailToken(token, 'reset');
  } catch {
    throw ApiError.badRequest('Reset link is invalid or has expired');
  }
  const [userId, versionStr] = payload.sub.split(':');
  const user = await User.findById(userId).select('+password');
  if (!user || user.email !== payload.email || String(user.tokenVersion) !== versionStr) {
    throw ApiError.badRequest('Reset link is invalid or has already been used');
  }

  user.password = password;
  user.tokenVersion += 1; // consumes the link
  if (!user.isEmailVerified) user.isEmailVerified = true; // proves email ownership
  await user.save();

  // Security: log out everywhere after password change.
  await revokeAllForUser(user.id);
  clearAuthCookies(res);
  return sendSuccess(res, null, 'Password reset. Please sign in with your new password.');
}
