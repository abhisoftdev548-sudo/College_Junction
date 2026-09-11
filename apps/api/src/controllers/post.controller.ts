import type { Request, Response } from 'express';
import mongoose, { type FilterQuery } from 'mongoose';
import type { CreatePostInput, ListPostsQuery } from '@college-junction/types';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { OrphanFile } from '../models/OrphanFile';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { sendSuccess } from '../utils/response';
import { sanitizeText, escapeRegex } from '../utils/sanitize';
import { buildCursorPage } from '../utils/pagination';
import { getQuery } from '../middleware/validate';
import { serializePost } from '../services/serializers';
import { uploadPostFile, deleteAsset } from '../services/cloudinary.service';
import { invalidateFilterCache } from '../services/filterCache.service';

/** Multipart bodies arrive as strings — normalise externalLinks before Zod. */
export function normalizeMultipartBody(req: Request, _res: Response, next: () => void) {
  const b = req.body as Record<string, unknown>;
  if (typeof b.externalLinks === 'string') {
    const raw = b.externalLinks.trim();
    if (!raw) b.externalLinks = [];
    else if (raw.startsWith('[')) {
      try { b.externalLinks = JSON.parse(raw); } catch { b.externalLinks = [raw]; }
    } else b.externalLinks = raw.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
  } else if (b.externalLinks === undefined) b.externalLinks = [];
  next();
}

export async function createPost(req: Request, res: Response) {
  const input = req.body as CreatePostInput;
  const user = req.user!;

  let file: { url: string; publicId: string; resourceType: string; fileType: 'pdf' | 'image' } | null = null;
  if (req.file) {
    file = await uploadPostFile(req.file.buffer, req.file.mimetype, input.type);
  }

  try {
    const post = await Post.create({
      author: user._id,
      // Immutable snapshot (spec §1.6)
      authorSnapshot: {
        username: user.username,
        fullName: user.fullName,
        college: user.college,
        course: user.course,
        branch: user.branch,
        year: user.year,
        session: user.session,
      },
      type: input.type,
      title: sanitizeText(input.title),
      description: sanitizeText(input.description),
      externalLinks: input.externalLinks,
      fileUrl: file?.url ?? null,
      filePublicId: file?.publicId ?? null,
      fileResourceType: file?.resourceType ?? null,
      fileType: file?.fileType ?? null,
    });
    invalidateFilterCache();
    return sendSuccess(res, { post: serializePost(post.toObject(), user.id) }, 'Post created', 201);
  } catch (e) {
    if (file) await deleteAsset(file.publicId, file.resourceType); // don't leak orphaned uploads
    throw e;
  }
}

export async function listPosts(req: Request, res: Response) {
  const q = getQuery<ListPostsQuery>(req);
  const filter: FilterQuery<typeof Post> = {};

  if (q.cursor) filter._id = { $lt: new mongoose.Types.ObjectId(q.cursor) };
  if (q.type) filter.type = q.type;
  if (q.course) filter['authorSnapshot.course'] = q.course;
  if (q.branch) filter['authorSnapshot.branch'] = q.branch;
  if (q.year) filter['authorSnapshot.year'] = q.year;
  if (q.session) filter['authorSnapshot.session'] = q.session;

  if (q.author) {
    const author = await User.findOne({ username: q.author }).collation({ locale: 'en', strength: 2 }).select('_id');
    if (!author) return sendSuccess(res, buildCursorPage([], q.limit));
    filter.author = author._id;
  }
  if (q.saved) {
    if (!req.authUserId) throw ApiError.unauthorized('Sign in to view saved posts');
    filter.savedBy = new mongoose.Types.ObjectId(req.authUserId);
  }
  if (q.search) {
    const rx = new RegExp(escapeRegex(q.search), 'i');
    filter.$or = [{ title: rx }, { description: rx }, { 'authorSnapshot.username': rx }];
  }

  const docs = await Post.find(filter).sort({ _id: -1 }).limit(q.limit + 1).lean();
  const items = docs.map((d) => serializePost(d as Record<string, unknown>, req.authUserId));
  return sendSuccess(res, buildCursorPage(items, q.limit));
}

export async function getPost(req: Request, res: Response) {
  const post = await Post.findById(req.params.id).lean();
  if (!post) throw ApiError.notFound('Post not found');
  return sendSuccess(res, { post: serializePost(post as Record<string, unknown>, req.authUserId) });
}

export async function deletePost(req: Request, res: Response) {
  const post = await Post.findById(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');
  const isOwner = String(post.author) === req.user!.id;
  const isAdmin = req.user!.role === 'admin';
  if (!isOwner && !isAdmin) throw ApiError.forbidden('You can only delete your own posts');

  await Promise.all([
    post.deleteOne(),
    Comment.deleteMany({ post: post._id }),
    OrphanFile.deleteMany({ post: post._id }),
    post.filePublicId ? deleteAsset(post.filePublicId, post.fileResourceType ?? 'image') : Promise.resolve(),
  ]);
  invalidateFilterCache();
  return sendSuccess(res, null, 'Post deleted');
}

/** Atomic, condition-guarded like (spec §1.5). Idempotent. */
export async function likePost(req: Request, res: Response) {
  const userId = req.user!._id;
  const r = await Post.updateOne({ _id: req.params.id, likedBy: { $ne: userId } }, { $addToSet: { likedBy: userId } });
  const post = await Post.findById(req.params.id).select('likedBy').lean();
  if (!post) throw ApiError.notFound('Post not found');
  return sendSuccess(res, { liked: true, likesCount: post.likedBy.length, changed: r.modifiedCount === 1 }, 'Liked');
}

export async function unlikePost(req: Request, res: Response) {
  const userId = req.user!._id;
  const r = await Post.updateOne({ _id: req.params.id }, { $pull: { likedBy: userId } });
  const post = await Post.findById(req.params.id).select('likedBy').lean();
  if (!post) throw ApiError.notFound('Post not found');
  return sendSuccess(res, { liked: false, likesCount: post.likedBy.length, changed: r.modifiedCount === 1 }, 'Unliked');
}

/** Toggle save. Atomic in both directions. */
export async function toggleSave(req: Request, res: Response) {
  const userId = req.user!._id;
  const exists = await Post.exists({ _id: req.params.id });
  if (!exists) throw ApiError.notFound('Post not found');

  const added = await Post.updateOne({ _id: req.params.id, savedBy: { $ne: userId } }, { $addToSet: { savedBy: userId } });
  let saved = true;
  if (added.modifiedCount === 0) {
    await Post.updateOne({ _id: req.params.id }, { $pull: { savedBy: userId } });
    saved = false;
  }
  const post = await Post.findById(req.params.id).select('savedBy').lean();
  return sendSuccess(res, { saved, savesCount: post?.savedBy.length ?? 0 }, saved ? 'Saved' : 'Removed from saved');
}
