export type UserRole = 'student' | 'admin';
export type PostType = 'problem' | 'notes';
export type FileType = 'pdf' | 'image';

export interface PublicUser {
  id: string;
  username: string;
  email?: string; // only present for the current user
  role: UserRole;
  isEmailVerified: boolean;
  isProfileComplete: boolean;
  isRestricted: boolean;
  fullName?: string;
  college?: string;
  course?: string;
  branch?: string;
  year?: string;
  semester?: string;
  session?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorSnapshot {
  username: string;
  fullName?: string;
  college?: string;
  course?: string;
  branch?: string;
  year?: string;
  session?: string;
}

export interface PostDTO {
  id: string;
  author: string;
  authorSnapshot: AuthorSnapshot;
  type: PostType;
  title: string;
  description: string;
  fileUrl: string | null;
  filePublicId?: string | null;
  fileType: FileType | null;
  externalLinks: string[];
  likesCount: number;
  savesCount: number;
  commentsCount: number;
  likedByMe: boolean;
  savedByMe: boolean;
  deleteAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommentDTO {
  id: string;
  post: string;
  author: { id: string; username: string; fullName?: string } | null;
  parentComment: string | null;
  text: string;
  createdAt: string;
}

export interface FilterOptions {
  course: string[];
  branch: string[];
  year: string[];
  session: string[];
}
