import type { Response, CookieOptions } from 'express';
import { env, cookieSecure, cookieSameSite } from '../config/env';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

function base(): CookieOptions {
  return {
    httpOnly: true,
    secure: cookieSecure,
    // 'lax' (default) for the same-origin /api proxy; 'none' only for split-origin deploys.
    sameSite: cookieSameSite,
    path: '/',
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  };
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string, refreshExpiresAt: Date): void {
  // `expires` rather than `maxAge`: identical for browsers, but avoids a curl cookie-jar quirk when clearing.
  res.cookie(ACCESS_COOKIE, accessToken, { ...base(), expires: new Date(Date.now() + 15 * 60 * 1000) });
  res.cookie(REFRESH_COOKIE, refreshToken, { ...base(), expires: refreshExpiresAt });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(ACCESS_COOKIE, base());
  res.clearCookie(REFRESH_COOKIE, base());
}
