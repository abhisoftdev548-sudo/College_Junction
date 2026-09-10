'use client';
import * as React from 'react';
import type { PostDTO, ListPostsQuery } from '@college-junction/types';
import { postsApi } from '@/lib/queries';
import { RequestError } from '@/lib/api';

/** Cursor-based infinite loading (spec §1.7). Resets whenever the filter object changes. */
export function useInfinitePosts(query: Partial<ListPostsQuery>, enabled = true) {
  const [items, setItems] = React.useState<PostDTO[]>([]);
  const [cursor, setCursor] = React.useState<string | null>(null);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const key = JSON.stringify(query);
  const reqId = React.useRef(0);

  const load = React.useCallback(async (reset: boolean) => {
    if (!enabled) return;
    const id = ++reqId.current;
    setLoading(true);
    setError(null);
    try {
      const page = await postsApi.list({ ...query, limit: 10, cursor: reset ? undefined : cursor ?? undefined });
      if (id !== reqId.current) return; // stale
      setItems((prev) => (reset ? page.items : [...prev, ...page.items]));
      setCursor(page.nextCursor);
      setHasMore(page.hasMore);
    } catch (e) {
      if (id === reqId.current) setError(e instanceof RequestError ? e.message : 'Failed to load posts');
    } finally {
      if (id === reqId.current) { setLoading(false); setInitialLoading(false); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, cursor, enabled]);

  React.useEffect(() => {
    setItems([]); setCursor(null); setHasMore(true); setInitialLoading(true);
    void load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  const loadMore = React.useCallback(() => { if (!loading && hasMore) void load(false); }, [load, loading, hasMore]);

  const update = React.useCallback((id: string, patch: Partial<PostDTO>) => setItems((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x))), []);
  const remove = React.useCallback((id: string) => setItems((p) => p.filter((x) => x.id !== id)), []);
  const prepend = React.useCallback((post: PostDTO) => setItems((p) => [post, ...p]), []);

  return { items, hasMore, loading, initialLoading, error, loadMore, refresh: () => load(true), update, remove, prepend };
}

/** Fires `onIntersect` when the sentinel scrolls into view. */
export function useIntersection(onIntersect: () => void, enabled: boolean) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const obs = new IntersectionObserver((entries) => { if (entries[0]?.isIntersecting) onIntersect(); }, { rootMargin: '400px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onIntersect, enabled]);
  return ref;
}
