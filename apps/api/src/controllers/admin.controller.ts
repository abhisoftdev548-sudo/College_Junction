import type { Request, Response } from 'express';
import type { z } from 'zod';
import { TIMER_DURATIONS, type offsetQuerySchema, type ListPostsQuery } from '@college-junction/types';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { RefreshToken } from '../models/RefreshToken';
import { OrphanFile } from '../models/OrphanFile';
import { ApiError } from '../utils/ApiError';
import { sendSuccess } from '../utils/response';
import { escapeRegex } from '../utils/sanitize';
import { getQuery } from '../middleware/validate';
import { serializeUser, serializePost } from '../services/serializers';
import { deleteAsset } from '../services/cloudinary.service';
import { invalidateFilterCache } from '../services/filterCache.service';
import { buildCursorPage } from '../utils/pagination';
import mongoose from 'mongoose';

type OffsetQ = z.infer<typeof offsetQuerySchema>;

export async function stats(_req: Request, res: Response) {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [users, restricted, posts, notes, problems, comments, newUsers7d, newPosts7d, scheduled] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isRestricted: true }),
    Post.countDocuments(),
    Post.countDocuments({ type: 'notes' }),
    Post.countDocuments({ type: 'problem' }),
    Comment.countDocuments(),
    User.countDocuments({ createdAt: { $gte: since } }),
    Post.countDocuments({ createdAt: { $gte: since } }),
    Post.countDocuments({ deleteAt: { $ne: null } }),
  ]);
  return sendSuccess(res, { users, restricted, posts, notes, problems, comments, newUsers7d, newPosts7d, scheduledForDeletion: scheduled });
}

export async function listUsers(req: Request, res: Response) {
  const q = getQuery<OffsetQ>(req);
  const filter: Record<string, unknown> = {};
  if (q.search) {
    const rx = new RegExp(escapeRegex(q.search), 'i');
    filter.$or = [{ username: rx }, { email: rx }, { fullName: rx }, { college: rx }];
  }
  const [total, docs] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).sort({ createdAt: -1 }).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
  ]);
  const items = docs.map((u) => serializeUser(u as never, { includeEmail: true }));
  return sendSuccess(res, { items, page: q.page, limit: q.limit, total, totalPages: Math.ceil(total / q.limit) });
}

export async function restrictUser(req: Request, res: Response) {
  const { isRestricted } = req.body as { isRestricted: boolean };
  const target = await User.findById(req.params.id);
  if (!target) throw ApiError.notFound('User not found');
  if (target.role === 'admin') throw ApiError.forbidden('Cannot restrict an admin');
  target.isRestricted = isRestricted;
  await target.save();
  return sendSuccess(res, { user: serializeUser(target, { includeEmail: true }) }, isRestricted ? 'User restricted' : 'Restriction lifted');
}

export async function deleteUser(req: Request, res: Response) {
  const target = await User.findById(req.params.id);
  if (!target) throw ApiError.notFound('User not found');
  if (target.role === 'admin') throw ApiError.forbidden('Cannot delete an admin');
  if (target.id === req.user!.id) throw ApiError.forbidden('Cannot delete yourself');

  const posts = await Post.find({ author: target._id }).select('_id filePublicId fileResourceType').lean();
  const postIds = posts.map((p) => p._id);

  await Promise.all([
    Post.deleteMany({ author: target._id }),
    Comment.deleteMany({ $or: [{ author: target._id }, { post: { $in: postIds } }] }),
    RefreshToken.deleteMany({ userId: target._id }),
    OrphanFile.deleteMany({ post: { $in: postIds } }),
    // Remove their id from other posts' like/save arrays.
    Post.updateMany({ $or: [{ likedBy: target._id }, { savedBy: target._id }] }, { $pull: { likedBy: target._id, savedBy: target._id } }),
    target.deleteOne(),
  ]);
  // Best-effort Cloudinary cleanup.
  await Promise.all(posts.filter((p) => p.filePublicId).map((p) => deleteAsset(p.filePublicId!, p.fileResourceType ?? 'image')));
  invalidateFilterCache();
  return sendSuccess(res, null, 'User and their content deleted');
}

/** Admin feed view — same cursor pagination as public feed, reuses ListPostsQuery. */
export async function listPosts(req: Request, res: Response) {
  const q = getQuery<ListPostsQuery>(req);
  const filter: Record<string, unknown> = {};
  if (q.cursor) filter._id = { $lt: new mongoose.Types.ObjectId(q.cursor) };
  if (q.type) filter.type = q.type;
  if (q.search) {
    const rx = new RegExp(escapeRegex(q.search), 'i');
    filter.$or = [{ title: rx }, { 'authorSnapshot.username': rx }];
  }
  const docs = await Post.find(filter).sort({ _id: -1 }).limit(q.limit + 1).lean();
  return sendSuccess(res, buildCursorPage(docs.map((d) => serializePost(d as Record<string, unknown>, req.authUserId)), q.limit));
}

/** Sets/clears deleteAt — Mongo TTL index performs the deletion (spec §1.4). No setTimeout. */
export async function setPostTimer(req: Request, res: Response) {
  const { duration } = req.body as { duration: keyof typeof TIMER_DURATIONS | null };
  const post = await Post.findById(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');

  if (duration === null) {
    post.deleteAt = null;
    await post.save();
    await OrphanFile.deleteMany({ post: post._id });
    return sendSuccess(res, { post: serializePost(post.toObject(), req.authUserId) }, 'Auto-delete timer cleared');
  }

  const deleteAt = new Date(Date.now() + TIMER_DURATIONS[duration]);
  post.deleteAt = deleteAt;
  await post.save();

  // Queue Cloudinary reconciliation for after TTL fires (TTL deletes don't run hooks).
  if (post.filePublicId) {
    await OrphanFile.updateOne(
      { post: post._id, publicId: post.filePublicId },
      { $set: { resourceType: post.fileResourceType ?? 'image', checkAfter: new Date(deleteAt.getTime() + 2 * 60 * 1000), attempts: 0 } },
      { upsert: true },
    );
  }
  return sendSuccess(res, { post: serializePost(post.toObject(), req.authUserId) }, `Post will auto-delete in ${duration}`);
}

export async function deletePost(req: Request, res: Response) {
  const post = await Post.findById(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');
  await Promise.all([
    post.deleteOne(),
    Comment.deleteMany({ post: post._id }),
    OrphanFile.deleteMany({ post: post._id }),
    post.filePublicId ? deleteAsset(post.filePublicId, post.fileResourceType ?? 'image') : Promise.resolve(),
  ]);
  invalidateFilterCache();
  return sendSuccess(res, null, 'Post removed by admin');
}
