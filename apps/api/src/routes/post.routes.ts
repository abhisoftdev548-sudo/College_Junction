import { Router } from 'express';
import { z } from 'zod';
import { createPostSchema, listPostsQuerySchema, objectIdParamSchema, createCommentSchema, cursorQuerySchema } from '@college-junction/types';
import { validate } from '../middleware/validate';
import { requireAuth, optionalAuth, requireActiveContributor } from '../middleware/auth';
import { createPostLimiter } from '../middleware/rateLimit';
import { handleUpload, verifyFileMagic } from '../middleware/upload';
import { asyncHandler } from '../utils/asyncHandler';
import * as p from '../controllers/post.controller';
import * as cm from '../controllers/comment.controller';

const r = Router();
const idParam = validate(objectIdParamSchema, 'params');
const commentParams = validate(objectIdParamSchema.extend({ commentId: z.string().regex(/^[a-f\d]{24}$/i) }), 'params');

r.get('/', optionalAuth, validate(listPostsQuerySchema, 'query'), asyncHandler(p.listPosts));
r.post(
  '/',
  requireAuth,
  requireActiveContributor,
  createPostLimiter,
  handleUpload,
  asyncHandler(async (req, res, next) => verifyFileMagic(req, res, next)),
  p.normalizeMultipartBody,
  validate(createPostSchema),
  asyncHandler(p.createPost),
);
r.get('/:id', optionalAuth, idParam, asyncHandler(p.getPost));
r.delete('/:id', requireAuth, idParam, asyncHandler(p.deletePost));
r.post('/:id/like', requireAuth, idParam, asyncHandler(p.likePost));
r.post('/:id/unlike', requireAuth, idParam, asyncHandler(p.unlikePost));
r.post('/:id/save', requireAuth, idParam, asyncHandler(p.toggleSave));

r.get('/:id/comments', idParam, validate(cursorQuerySchema, 'query'), asyncHandler(cm.listComments));
r.post('/:id/comments', requireAuth, requireActiveContributor, idParam, validate(createCommentSchema), asyncHandler(cm.createComment));
r.delete('/:id/comments/:commentId', requireAuth, commentParams, asyncHandler(cm.deleteComment));

export default r;
