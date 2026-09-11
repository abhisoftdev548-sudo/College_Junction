import type { Types } from 'mongoose';
import type { PublicUser, PostDTO, CommentDTO } from '@college-junction/types';
import type { UserDoc } from '../models/User';

type AnyUser = UserDoc | (Record<string, unknown> & { _id: Types.ObjectId });

export function serializeUser(u: AnyUser, opts: { includeEmail?: boolean } = {}): PublicUser {
  const o = (typeof (u as UserDoc).toObject === 'function' ? (u as UserDoc).toObject() : u) as Record<string, unknown>;
  const str = (v: unknown) => (v === undefined || v === null ? undefined : String(v));
  return {
    id: String(o._id),
    username: o.username as string,
    ...(opts.includeEmail ? { email: o.email as string } : {}),
    role: o.role as PublicUser['role'],
    isEmailVerified: Boolean(o.isEmailVerified),
    isProfileComplete: Boolean(o.isProfileComplete),
    isRestricted: Boolean(o.isRestricted),
    fullName: str(o.fullName),
    college: str(o.college),
    course: str(o.course),
    branch: str(o.branch),
    year: str(o.year),
    semester: str(o.semester),
    session: str(o.session),
    createdAt: new Date(o.createdAt as Date).toISOString(),
    updatedAt: new Date(o.updatedAt as Date).toISOString(),
  };
}

/** Post lean object → DTO; likesCount/savesCount derived from arrays (spec §1.5). */
export function serializePost(p: Record<string, unknown>, viewerId?: string): PostDTO {
  const likedBy = (p.likedBy as Types.ObjectId[] | undefined) ?? [];
  const savedBy = (p.savedBy as Types.ObjectId[] | undefined) ?? [];
  const snap = (p.authorSnapshot ?? {}) as Record<string, unknown>;
  const mine = (arr: Types.ObjectId[]) => Boolean(viewerId && arr.some((id) => String(id) === viewerId));
  return {
    id: String(p._id),
    author: String(p.author),
    authorSnapshot: {
      username: String(snap.username ?? ''),
      fullName: snap.fullName as string | undefined,
      college: snap.college as string | undefined,
      course: snap.course as string | undefined,
      branch: snap.branch as string | undefined,
      year: snap.year as string | undefined,
      session: snap.session as string | undefined,
    },
    type: p.type as PostDTO['type'],
    title: p.title as string,
    description: p.description as string,
    fileUrl: (p.fileUrl as string | null) ?? null,
    fileType: (p.fileType as PostDTO['fileType']) ?? null,
    externalLinks: (p.externalLinks as string[] | undefined) ?? [],
    likesCount: likedBy.length,
    savesCount: savedBy.length,
    commentsCount: Number(p.commentsCount ?? 0),
    likedByMe: mine(likedBy),
    savedByMe: mine(savedBy),
    deleteAt: p.deleteAt ? new Date(p.deleteAt as Date).toISOString() : null,
    createdAt: new Date(p.createdAt as Date).toISOString(),
    updatedAt: new Date(p.updatedAt as Date).toISOString(),
  };
}

export function serializeComment(c: Record<string, unknown>): CommentDTO {
  const a = c.author as (Record<string, unknown> & { _id: Types.ObjectId }) | Types.ObjectId | null;
  const author =
    a && typeof a === 'object' && 'username' in a
      ? { id: String(a._id), username: String(a.username), fullName: a.fullName as string | undefined }
      : null;
  return {
    id: String(c._id),
    post: String(c.post),
    author,
    parentComment: c.parentComment ? String(c.parentComment) : null,
    text: c.text as string,
    createdAt: new Date(c.createdAt as Date).toISOString(),
  };
}
