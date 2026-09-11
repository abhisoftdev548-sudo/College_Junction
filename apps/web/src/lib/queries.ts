import type { PublicUser, PostDTO, CommentDTO, CursorPage, OffsetPage, FilterOptions, ListPostsQuery, CompleteProfileInput } from '@college-junction/types';
import { get, post, put, patch, del } from './api';

// ---- auth ----
export const authApi = {
  me: () => get<{ user: PublicUser }>('/auth/me'),
  login: (identifier: string, password: string) => post<{ user: PublicUser }>('/auth/login', { identifier, password }),
  signup: (d: { username: string; email: string; password: string }) => post<{ user: PublicUser }>('/auth/signup', d),
  logout: () => post<null>('/auth/logout'),
  verifyEmail: (token: string) => post<{ user: PublicUser }>('/auth/verify-email', { token }),
  resendVerification: (email: string) => post<null>('/auth/resend-verification', { email }),
  forgotPassword: (email: string) => post<null>('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => post<null>('/auth/reset-password', { token, password }),
};

// ---- profile ----
export const profileApi = {
  complete: (d: CompleteProfileInput) => put<{ user: PublicUser }>('/profile/complete', d),
  get: (username: string) => get<{ user: PublicUser; stats: { posts: number; likesReceived: number } }>(`/profile/${username}`),
};

// ---- posts ----
export const postsApi = {
  list: (q: Partial<ListPostsQuery>) => get<CursorPage<PostDTO>>('/posts', q),
  get: (id: string) => get<{ post: PostDTO }>(`/posts/${id}`),
  create: (fd: FormData) => post<{ post: PostDTO }>('/posts', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id: string) => del<null>(`/posts/${id}`),
  like: (id: string) => post<{ liked: boolean; likesCount: number }>(`/posts/${id}/like`),
  unlike: (id: string) => post<{ liked: boolean; likesCount: number }>(`/posts/${id}/unlike`),
  save: (id: string) => post<{ saved: boolean; savesCount: number }>(`/posts/${id}/save`),
  comments: (id: string, cursor?: string) => get<CursorPage<CommentDTO>>(`/posts/${id}/comments`, { cursor, limit: 20 }),
  addComment: (id: string, text: string, parentComment?: string | null) => post<{ comment: CommentDTO }>(`/posts/${id}/comments`, { text, parentComment: parentComment ?? null }),
  deleteComment: (id: string, commentId: string) => del<{ deleted: number }>(`/posts/${id}/comments/${commentId}`),
};

export const filtersApi = { options: () => get<FilterOptions>('/filters/options') };

// ---- admin ----
export interface AdminStats { users: number; restricted: number; posts: number; notes: number; problems: number; comments: number; newUsers7d: number; newPosts7d: number; scheduledForDeletion: number }
export const adminApi = {
  stats: () => get<AdminStats>('/admin/stats'),
  users: (page: number, search?: string) => get<OffsetPage<PublicUser>>('/admin/users', { page, limit: 20, search: search || undefined }),
  restrict: (id: string, isRestricted: boolean) => patch<{ user: PublicUser }>(`/admin/users/${id}/restrict`, { isRestricted }),
  deleteUser: (id: string) => del<null>(`/admin/users/${id}`),
  posts: (cursor?: string, search?: string) => get<CursorPage<PostDTO>>('/admin/posts', { cursor, limit: 20, search: search || undefined }),
  timer: (id: string, duration: '24h' | '3d' | '7d' | null) => patch<{ post: PostDTO }>(`/admin/posts/${id}/timer`, { duration }),
  deletePost: (id: string) => del<null>(`/admin/posts/${id}`),
};
