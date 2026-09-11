import rateLimit from 'express-rate-limit';
import type { Request } from 'express';
import { env } from '../config/env';

const skipInTest = () => env.NODE_ENV === 'test' || env.DISABLE_RATE_LIMIT;

function makeLimiter(windowMs: number, limit: number, message: string, keyGenerator?: (req: Request) => string) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skip: skipInTest,
    ...(keyGenerator ? { keyGenerator } : {}),
    handler: (_req, res) => {
      res.status(429).json({ success: false, message });
    },
  });
}

/** General API: 100 req / 15 min per IP (spec §1.11). */
export const generalLimiter = makeLimiter(15 * 60 * 1000, 100, 'Too many requests, please slow down');

/** Login/signup: 5 req / 15 min per IP. */
export const authLimiter = makeLimiter(15 * 60 * 1000, 5, 'Too many attempts. Try again in 15 minutes');

/** Post creation: 10 / hour per user (falls back to IP when unauthenticated). */
export const createPostLimiter = makeLimiter(
  60 * 60 * 1000,
  10,
  'Post limit reached. You can create up to 10 posts per hour',
  (req) => req.authUserId ?? req.ip ?? 'anon',
);

/** Email-sending endpoints: 3 / 15 min per IP to avoid mail-bombing. */
export const emailLimiter = makeLimiter(15 * 60 * 1000, 3, 'Too many email requests. Try again later');
