import { NextResponse, type NextRequest } from 'next/server';

/**
 * Presence-only check of the access-token cookie (spec §4). Real validation
 * happens on every API request server-side; this just avoids flashing
 * protected pages to anonymous visitors.
 */
const PROTECTED = ['/dashboard', '/profile/complete', '/admin'];
const AUTH_PAGES = ['/auth/signin', '/auth/signup'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = req.cookies.has('access_token') || req.cookies.has('refresh_token');

  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`)) && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/signin';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  if (AUTH_PAGES.includes(pathname) && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'] };
