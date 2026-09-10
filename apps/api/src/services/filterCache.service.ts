import type { FilterOptions } from '@college-junction/types';
import { Post } from '../models/Post';

/** Simple in-memory cache with 5-min TTL, invalidated on post creation (spec §1.8). */
const TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { value: FilterOptions; expiresAt: number }>();
const KEY = 'filters';

export async function getFilterOptions(): Promise<FilterOptions> {
  const hit = cache.get(KEY);
  if (hit && hit.expiresAt > Date.now()) return hit.value;

  const [course, branch, year, session] = await Promise.all([
    Post.distinct('authorSnapshot.course'),
    Post.distinct('authorSnapshot.branch'),
    Post.distinct('authorSnapshot.year'),
    Post.distinct('authorSnapshot.session'),
  ]);
  const clean = (arr: unknown[]) => (arr.filter((v) => typeof v === 'string' && v.trim()) as string[]).sort();
  const value: FilterOptions = { course: clean(course), branch: clean(branch), year: clean(year), session: clean(session) };
  cache.set(KEY, { value, expiresAt: Date.now() + TTL_MS });
  return value;
}

export function invalidateFilterCache(): void {
  cache.delete(KEY);
}
