import jwt, { type SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env';

export interface AccessPayload { sub: string; role: 'student' | 'admin'; type: 'access' }
export interface RefreshPayload { sub: string; family: string; jti: string; type: 'refresh' }
export interface EmailPayload { sub: string; email: string; purpose: 'verify' | 'reset'; type: 'email' }

export function signAccessToken(userId: string, role: AccessPayload['role']): string {
  const p: AccessPayload = { sub: userId, role, type: 'access' };
  return jwt.sign(p, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL } as SignOptions);
}

export function signRefreshToken(userId: string, family: string): { token: string; jti: string; expiresAt: Date } {
  const jti = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
  const p: RefreshPayload = { sub: userId, family, jti, type: 'refresh' };
  const token = jwt.sign(p, env.JWT_REFRESH_SECRET, { expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d` } as SignOptions);
  return { token, jti, expiresAt };
}

export function signEmailToken(userId: string, email: string, purpose: EmailPayload['purpose']): string {
  const p: EmailPayload = { sub: userId, email, purpose, type: 'email' };
  const expiresIn = purpose === 'verify' ? '24h' : '30m';
  return jwt.sign(p, env.JWT_EMAIL_SECRET, { expiresIn } as SignOptions);
}

export function verifyAccessToken(token: string): AccessPayload {
  const p = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessPayload;
  if (p.type !== 'access') throw new Error('Wrong token type');
  return p;
}

export function verifyRefreshToken(token: string): RefreshPayload {
  const p = jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshPayload;
  if (p.type !== 'refresh') throw new Error('Wrong token type');
  return p;
}

export function verifyEmailToken(token: string, purpose: EmailPayload['purpose']): EmailPayload {
  const p = jwt.verify(token, env.JWT_EMAIL_SECRET) as EmailPayload;
  if (p.type !== 'email' || p.purpose !== purpose) throw new Error('Wrong token type');
  return p;
}

/** Refresh tokens are stored hashed (sha256) — never in plaintext. */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
