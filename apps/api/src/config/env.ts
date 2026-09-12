import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  CLIENT_URL: z.string().url().default('http://localhost:3000'),
  /** Comma-separated extra allowed origins (e.g. preview hosts). */
  EXTRA_CLIENT_ORIGINS: z.string().optional(),
  MONGODB_URI: z.string().optional(),

  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_EMAIL_SECRET: z.string().min(16),
  ACCESS_TOKEN_TTL: z.string().default('15m'),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(7),

  /** Force secure cookies regardless of NODE_ENV (useful for HTTPS previews). */
  COOKIE_SECURE: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === 'true')),
  /**
   * Cookie SameSite policy. Default 'lax' — the recommended deploy serves the
   * web app and API from one host via the Next.js /api proxy, so cookies never
   * cross sites. Set 'none' only for split-origin deploys where the browser
   * calls the API on another site; that forces Secure cookies (browsers reject
   * SameSite=None without Secure).
   */
  COOKIE_SAMESITE: z.enum(['lax', 'strict', 'none']).default('lax'),
  COOKIE_DOMAIN: z.string().optional(),

  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_SECURE: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => v === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default('College Junction <no-reply@collegejunction.com>'),

  /** When true, skip the email-verification gate (dev convenience only). */
  REQUIRE_EMAIL_VERIFICATION: z
    .enum(['true', 'false'])
    .default('true')
    .transform((v) => v === 'true'),
  /** When true, ensure an admin from ADMIN_USERNAME/ADMIN_EMAIL/ADMIN_PASSWORD exists at boot. */
  BOOTSTRAP_ADMIN: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  /** Dev/test only: disable all rate limiters (never enable in production). */
  DISABLE_RATE_LIMIT: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  TRUST_PROXY: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Invalid environment configuration:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === 'production';
if (isProd && env.DISABLE_RATE_LIMIT) {
  console.error('❌ DISABLE_RATE_LIMIT cannot be true in production');
  process.exit(1);
}

/** Cookie security is env-driven (spec §1.1): prod → secure; dev → insecure. */
const wantSecure = env.COOKIE_SECURE ?? isProd;

if (env.COOKIE_SAMESITE === 'none' && !wantSecure) {
  console.warn('⚠️  COOKIE_SAMESITE=none needs Secure cookies — forcing secure=true (browsers drop insecure SameSite=None cookies)');
}

export const cookieSecure = env.COOKIE_SAMESITE === 'none' ? true : wantSecure;

/** SameSite policy (see COOKIE_SAMESITE above). 'lax' by default (same-origin proxy mode). */
export const cookieSameSite = env.COOKIE_SAMESITE;

export const allowedOrigins: string[] = [
  env.CLIENT_URL,
  ...(env.EXTRA_CLIENT_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) ?? []),
];

export const cloudinaryConfigured = Boolean(
  env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET,
);
export const smtpConfigured = Boolean(env.SMTP_HOST && env.SMTP_PORT);
