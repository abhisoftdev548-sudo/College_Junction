import type { NextRequest } from 'next/server';

/**
 * Same-origin proxy for /api/* → Express — the DEFAULT deployment mode
 * (web + API behind one host). Forwards cookies both ways and drops the browser
 * Origin/Host headers, since from the browser's point of view this is a
 * same-origin request (no CORS involved) and cookies stay first-party (Lax).
 *
 * Request bodies are STREAMED through, never buffered, so multipart uploads
 * (≤10 MB) aren't held in memory twice and no artificial size cap is added.
 * For hosts that cap request bodies anyway (e.g. serverless ~4.5 MB), point
 * uploads directly at the API with NEXT_PUBLIC_UPLOADS_URL (see lib/api.ts).
 *
 * When NEXT_PUBLIC_API_URL is set the browser calls the API directly
 * (split-origin) and this route is unused.
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
/** Generous budget for proxied uploads (Vercel: Hobby max is 60s; ignored elsewhere). */
export const maxDuration = 60;

const API = (process.env.API_INTERNAL_URL || 'http://localhost:4000').replace(/\/$/, '');
const HOP = new Set(['host', 'origin', 'connection', 'content-length', 'transfer-encoding', 'keep-alive', 'upgrade', 'accept-encoding', 'expect']);

async function proxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  const url = `${API}/api/${params.path.join('/')}${req.nextUrl.search}`;
  const headers = new Headers();
  req.headers.forEach((v, k) => { if (!HOP.has(k.toLowerCase())) headers.set(k, v); });
  headers.set('x-forwarded-host', req.headers.get('host') ?? '');
  headers.set('x-forwarded-proto', (req.headers.get('x-forwarded-proto') ?? req.nextUrl.protocol.replace(':', '')).split(',')[0]?.trim() ?? 'http');

  const hasBody = !['GET', 'HEAD'].includes(req.method);
  const init: RequestInit & { duplex?: 'half' } = {
    method: req.method,
    headers,
    // Pass the stream straight through; undici requires duplex:'half' for stream bodies.
    body: hasBody ? req.body : undefined,
    redirect: 'manual',
    cache: 'no-store',
  };
  if (hasBody) init.duplex = 'half';
  const upstream = await fetch(url, init);

  const resHeaders = new Headers();
  upstream.headers.forEach((v, k) => { if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(k.toLowerCase())) resHeaders.append(k, v); });
  // Forward every Set-Cookie individually (Headers.forEach merges them).
  const cookies = (upstream.headers as unknown as { getSetCookie?: () => string[] }).getSetCookie?.() ?? [];
  resHeaders.delete('set-cookie');
  for (const c of cookies) resHeaders.append('set-cookie', c);

  return new Response(upstream.body, { status: upstream.status, headers: resHeaders });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS, proxy as HEAD };
