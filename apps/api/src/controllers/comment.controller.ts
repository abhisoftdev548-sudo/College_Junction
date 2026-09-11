import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import type { CreateCommentInput } from '@college-junction/types';
import { z } from 'zod';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { ApiError } from '../utils/ApiError';
import { sendSuccess } from '../utils/response';
import { sanitizeText } from '../utils/sanitize';
import { buildCursorPage } from '../utils/pagination';
import { getQuery } from '../middleware/validate';
import { serializeComment } from '../services/serializers';
import { cursorQuerySchema } from '@college-junction/types';

type CursorQ = z.infer<typeof cursorQuerySchema>;

export async function listComments(req: Request, res: Response) {
  const q = getQuery<CursorQ>(req);
  const postId = req.params.id;
  if (!(await Post.exists({ _id: postId }))) throw ApiError.notFound('Post not found');

  // Comments are shown oldest → newest; cursor = last seen comment id ($gt).
  const filter: Record<string, unknown> = { post: postId };
  if (q.cursor) filter._id = { $gt: new mongoose.Types.ObjectId(q.cursor) };

  const docs = await Comment.find(filter)
    .sort({ _id: 1 })
    .limit(q.limit + 1)
    .populate('author', 'username fullName')
    .lean();
  const items = docs.map((d) => serializeComment(d as Record<string, unknown>));
  return sendSuccess(res, buildCursorPage(items, q.limit));
}

export async function createComment(req: Request, res: Response) {
  const { text, parentComment } = req.body as CreateCommentInput;
  const postId = req.params.id;
  const post = await Post.findById(postId).select('_id');
  if (!post) throw ApiError.notFound('Post not found');

  if (parentComment) {
    const parent = await Comment.findOne({ _id: parentComment, post: post._id }).select('_id');
    if (!parent) throw ApiError.badRequest('Parent comment not found on this post');
  }

  const comment = await Comment.create({
    post: post._id,
    author: req.user!._id,
    parentComment: parentComment ?? null,
    text: sanitizeText(text),
  });
  // Atomic counter increment — tied to an actual insert, never client-driven.
  await Post.updateOne({ _id: post._id }, { $inc: { commentsCount: 1 } });

  await comment.populate('author', 'username fullName');
  return sendSuccess(res, { comment: serializeComment(comment.toObject() as Record<string, unknown>) }, 'Comment added', 201);
}

export async function deleteComment(req: Request, res: Response) {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment || String(comment.post) !== req.params.id) throw ApiError.notFound('Comment not found');
  const isOwner = String(comment.author) === req.user!.id;
  if (!isOwner && req.user!.role !== 'admin') throw ApiError.forbidden();

  // Delete the comment and its direct replies; decrement by actual number removed.
  const result = await Comment.deleteMany({ $or: [{ _id: comment._id }, { parentComment: comment._id }] });
  await Post.updateOne({ _id: comment.post, commentsCount: { $gte: result.deletedCount } }, { $inc: { commentsCount: -result.deletedCount } });
  return sendSuccess(res, { deleted: result.deletedCount }, 'Comment deleted');
}
