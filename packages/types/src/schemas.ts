import { z } from 'zod';

export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const usernameSchema = z
  .string()
  .trim()
  .regex(USERNAME_REGEX, 'Username must be 3-20 chars: letters, numbers, underscore only');

export const passwordSchema = z
  .string()
  .regex(PASSWORD_REGEX, 'Password must be at least 8 chars with 1 uppercase letter and 1 number');

export const emailSchema = z.string().trim().toLowerCase().email('Invalid email address');

export const signupSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  identifier: z.string().trim().min(3, 'Enter your email or username'),
  password: z.string().min(1, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z.object({ token: z.string().min(10) });
export const forgotPasswordSchema = z.object({ email: emailSchema });
export const resetPasswordSchema = z.object({ token: z.string().min(10), password: passwordSchema });
export const resendVerificationSchema = z.object({ email: emailSchema });

const shortText = (label: string, max = 80) =>
  z.string().trim().min(1, `${label} is required`).max(max, `${label} is too long`);

export const completeProfileSchema = z.object({
  fullName: shortText('Full name', 60),
  college: shortText('College', 120),
  course: shortText('Course', 60),
  branch: shortText('Branch', 60),
  year: shortText('Year', 20),
  semester: shortText('Semester', 20),
  session: shortText('Session', 20),
});
export type CompleteProfileInput = z.infer<typeof completeProfileSchema>;

export const postTypeSchema = z.enum(['problem', 'notes']);

export const createPostSchema = z.object({
  type: postTypeSchema,
  title: z.string().trim().min(3, 'Title too short').max(140, 'Title too long'),
  description: z.string().trim().min(1, 'Description is required').max(5000, 'Description too long'),
  externalLinks: z
    .array(z.string().trim().url('Invalid URL').max(2048))
    .max(5, 'Max 5 links')
    .default([]),
});
export type CreatePostInput = z.infer<typeof createPostSchema>;

export const listPostsQuerySchema = z.object({
  cursor: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid cursor').optional(),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().max(100).optional(),
  type: postTypeSchema.optional(),
  course: z.string().trim().max(60).optional(),
  branch: z.string().trim().max(60).optional(),
  year: z.string().trim().max(20).optional(),
  session: z.string().trim().max(20).optional(),
  author: usernameSchema.optional(),
  saved: z.coerce.boolean().optional(),
});
export type ListPostsQuery = z.infer<typeof listPostsQuerySchema>;

export const createCommentSchema = z.object({
  text: z.string().trim().min(1, 'Comment cannot be empty').max(1000, 'Comment too long'),
  parentComment: z.string().regex(/^[a-f\d]{24}$/i).nullable().optional(),
});
export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export const cursorQuerySchema = z.object({
  cursor: z.string().regex(/^[a-f\d]{24}$/i).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const offsetQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(100).optional(),
});

export const TIMER_DURATIONS = { '24h': 24 * 60 * 60 * 1000, '3d': 3 * 24 * 60 * 60 * 1000, '7d': 7 * 24 * 60 * 60 * 1000 } as const;
export type TimerDuration = keyof typeof TIMER_DURATIONS;

export const postTimerSchema = z.object({
  duration: z.enum(['24h', '3d', '7d']).nullable(), // null clears the timer
});

export const restrictUserSchema = z.object({ isRestricted: z.boolean() });

export const objectIdParamSchema = z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id') });
export const usernameParamSchema = z.object({ username: usernameSchema });
