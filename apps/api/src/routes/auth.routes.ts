import { Router } from 'express';
import {
  signupSchema, loginSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema, resendVerificationSchema,
} from '@college-junction/types';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import { authLimiter, emailLimiter } from '../middleware/rateLimit';
import { asyncHandler } from '../utils/asyncHandler';
import * as c from '../controllers/auth.controller';
import { z } from 'zod';

const r = Router();

r.post('/signup', authLimiter, validate(signupSchema), asyncHandler(c.signup));
r.post('/login', authLimiter, validate(loginSchema), asyncHandler(c.login));
r.post('/refresh', validate(z.object({}).passthrough().optional()), asyncHandler(c.refresh));
r.post('/logout', asyncHandler(c.logout));
r.post('/logout-all', requireAuth, asyncHandler(c.logoutAll));
r.get('/me', requireAuth, asyncHandler(c.me));
r.post('/verify-email', validate(verifyEmailSchema), asyncHandler(c.verifyEmail));
r.post('/resend-verification', emailLimiter, validate(resendVerificationSchema), asyncHandler(c.resendVerification));
r.post('/forgot-password', emailLimiter, validate(forgotPasswordSchema), asyncHandler(c.forgotPassword));
r.post('/reset-password', authLimiter, validate(resetPasswordSchema), asyncHandler(c.resetPassword));

export default r;
