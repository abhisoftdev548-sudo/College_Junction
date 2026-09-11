import type { CursorPage } from '@college-junction/types';

/** Fetch `limit + 1` docs, then use this to trim + compute the next cursor. */
export function buildCursorPage<T extends { id: string }>(docs: T[], limit: number): CursorPage<T> {
  const hasMore = docs.length > limit;
  const items = hasMore ? docs.slice(0, limit) : docs;
  return { items, hasMore, nextCursor: hasMore ? items[items.length - 1].id : null };
}
