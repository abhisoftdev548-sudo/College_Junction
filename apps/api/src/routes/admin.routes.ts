import { Router } from 'express';
import { offsetQuerySchema, objectIdParamSchema, restrictUserSchema, postTimerSchema, listPostsQuerySchema } from '@college-junction/types';
import { validate } from '../middleware/validate';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import * as a from '../controllers/admin.controller';

const r = Router();
r.use(requireAuth, requireRole('admin'));
const idParam = validate(objectIdParamSchema, 'params');

r.get('/stats', asyncHandler(a.stats));
r.get('/users', validate(offsetQuerySchema, 'query'), asyncHandler(a.listUsers));
r.patch('/users/:id/restrict', idParam, validate(restrictUserSchema), asyncHandler(a.restrictUser));
r.delete('/users/:id', idParam, asyncHandler(a.deleteUser));
r.get('/posts', validate(listPostsQuerySchema, 'query'), asyncHandler(a.listPosts));
r.patch('/posts/:id/timer', idParam, validate(postTimerSchema), asyncHandler(a.setPostTimer));
r.delete('/posts/:id', idParam, asyncHandler(a.deletePost));

export default r;
