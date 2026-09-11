import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ACCESS_COOKIE } from '../utils/cookies';
import { verifyAccessToken } from '../utils/tokens';
import { User, type UserDoc } from '../models/User';
import { env } from '../config/env';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserDoc;
      authUserId?: string;
    }
  }
}

function extractToken(req: Request): string | undefined {
  const fromCookie = req.cookies?.[ACCESS_COOKIE] as string | undefined;
  if (fromCookie) return fromCookie;
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) return h.slice(7);
  return undefined;
}

/** Requires a valid access token AND loads the fresh user (so restrictions apply immediately). */
export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) throw ApiError.unauthorized('Not authenticated');
    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (e) {
      const expired = (e as Error).name === 'TokenExpiredError';
      throw new ApiError(401, expired ? 'Access token expired' : 'Invalid access token', expired ? { code: 'TOKEN_EXPIRED' } : undefined);
    }
    const user = await User.findById(payload.sub);
    if (!user) throw ApiError.unauthorized('User no longer exists');
    req.user = user as UserDoc;
    req.authUserId = user.id;
    next();
  } catch (err) {
    next(err);
  }
}

/** Like requireAuth but doesn't fail — used for public reads that personalise (likedByMe etc). */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractToken(req);
    if (token) {
      const payload = verifyAccessToken(token);
      const user = await User.findById(payload.sub);
      if (user) {
        req.user = user as UserDoc;
        req.authUserId = user.id;
      }
    }
  } catch {
    /* ignore — anonymous */
  }
  next();
}

export function requireRole(...roles: Array<'student' | 'admin'>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(ApiError.unauthorized());
    if (!roles.includes(req.user.role as 'student' | 'admin')) return next(ApiError.forbidden('Insufficient permissions'));
    next();
  };
}

/** Gate for content creation: verified email (unless disabled), completed profile, not restricted. */
export function requireActiveContributor(req: Request, _res: Response, next: NextFunction) {
  const u = req.user;
  if (!u) return next(ApiError.unauthorized());
  if (env.REQUIRE_EMAIL_VERIFICATION && !u.isEmailVerified) return next(ApiError.forbidden('Please verify your email first'));
  if (!u.isProfileComplete) return next(new ApiError(403, 'Complete your profile before posting', { code: 'PROFILE_INCOMPLETE' }));
  if (u.isRestricted) return next(new ApiError(403, 'Your account is restricted from posting', { code: 'RESTRICTED' }));
  next();
}
