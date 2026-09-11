import { Router } from 'express';
import { completeProfileSchema, usernameParamSchema } from '@college-junction/types';
import { validate } from '../middleware/validate';
import { requireAuth, optionalAuth } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import * as c from '../controllers/profile.controller';

const r = Router();
r.put('/complete', requireAuth, validate(completeProfileSchema), asyncHandler(c.completeProfile));
r.get('/:username', optionalAuth, validate(usernameParamSchema, 'params'), asyncHandler(c.getPublicProfile));
export default r;
