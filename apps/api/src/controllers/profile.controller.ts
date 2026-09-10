import type { Request, Response } from 'express';
import type { CompleteProfileInput } from '@college-junction/types';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { ApiError } from '../utils/ApiError';
import { sendSuccess } from '../utils/response';
import { serializeUser } from '../services/serializers';
import { sanitizeText } from '../utils/sanitize';

export async function completeProfile(req: Request, res: Response) {
  const input = req.body as CompleteProfileInput;
  const user = req.user!;

  const clean = Object.fromEntries(Object.entries(input).map(([k, v]) => [k, sanitizeText(v)])) as CompleteProfileInput;
  Object.assign(user, clean, { isProfileComplete: true });
  await user.save();

  return sendSuccess(res, { user: serializeUser(user, { includeEmail: true }) }, 'Profile updated');
}

export async function getPublicProfile(req: Request, res: Response) {
  const { username } = req.params;
  const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
  if (!user) throw ApiError.notFound('User not found');

  const [postsCount, likesAgg] = await Promise.all([
    Post.countDocuments({ author: user._id }),
    Post.aggregate<{ total: number }>([
      { $match: { author: user._id } },
      { $group: { _id: null, total: { $sum: { $size: { $ifNull: ['$likedBy', []] } } } } },
    ]),
  ]);

  const isSelf = req.authUserId === user.id;
  return sendSuccess(res, {
    user: serializeUser(user, { includeEmail: isSelf }),
    stats: { posts: postsCount, likesReceived: likesAgg[0]?.total ?? 0 },
  });
}
