import type { NextRequest } from 'next/server';

/**
 * Same-origin proxy for /api/* → Express (dev / single-host deployments).
 * Forwards cookies both ways and drops the browser Origin header, since from the
 * browser's point of view this is a same-origin request (no CORS involved).
 * When NEXT_PUBLIC_API_URL is set the browser calls the API directly and this is unused.
 */
export const dynamic = 'force-dynamic';
const API = (process.env.API_INTERNAL_URL || 'http://localhost:4000').replace(/\/$/, '');
const HOP = new Set(['host', 'origin', 'connection', 'content-length', 'transfer-encoding', 'keep-alive', 'accept-encoding']);

async function proxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  const url = `${API}/api/${params.path.join('/')}${req.nextUrl.search}`;
  const headers = new Headers();
  req.headers.forEach((v, k) => { if (!HOP.has(k.toLowerCase())) headers.set(k, v); });
  headers.set('x-forwarded-host', req.headers.get('host') ?? '');
  headers.set('x-forwarded-proto', req.nextUrl.protocol.replace(':', ''));

  const hasBody = !['GET', 'HEAD'].includes(req.method);
  const upstream = await fetch(url, {
    method: req.method,
    headers,
    body: hasBody ? await req.arrayBuffer() : undefined,
    redirect: 'manual',
    cache: 'no-store',
  });

  const resHeaders = new Headers();
  upstream.headers.forEach((v, k) => { if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(k.toLowerCase())) resHeaders.append(k, v); });
  // Forward every Set-Cookie individually (Headers.forEach merges them).
  const cookies = (upstream.headers as unknown as { getSetCookie?: () => string[] }).getSetCookie?.() ?? [];
  resHeaders.delete('set-cookie');
  for (const c of cookies) resHeaders.append('set-cookie', c);

  return new Response(upstream.body, { status: upstream.status, headers: resHeaders });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS };
