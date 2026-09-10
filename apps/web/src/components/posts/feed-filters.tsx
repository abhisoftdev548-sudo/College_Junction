'use client';
import * as React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { FilterOptions, ListPostsQuery } from '@college-junction/types';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { filtersApi } from '@/lib/queries';

export type FeedFilters = Pick<ListPostsQuery, 'search' | 'type' | 'course' | 'branch' | 'year' | 'session'>;

export function useDebounced<T>(value: T, ms = 350): T {
  const [v, setV] = React.useState(value);
  React.useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);
  return v;
}

export function FeedFiltersBar({ value, onChange }: { value: FeedFilters; onChange: (f: FeedFilters) => void }) {
  const [options, setOptions] = React.useState<FilterOptions | null>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { filtersApi.options().then(setOptions).catch(() => setOptions({ course: [], branch: [], year: [], session: [] })); }, []);

  const active = (['course', 'branch', 'year', 'session'] as const).filter((k) => value[k]).length;
  const set = (k: keyof FeedFilters, v: string) => onChange({ ...value, [k]: v || undefined });

  const selects: Array<[keyof FilterOptions, string]> = [['course', 'Course'], ['branch', 'Branch'], ['year', 'Year'], ['session', 'Session']];
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input value={value.search ?? ''} onChange={(e) => set('search', e.target.value)} placeholder="Search notes, problems, people…" className="pl-9" aria-label="Search" />
        </div>
        <Button variant={active ? 'default' : 'outline'} onClick={() => setOpen((o) => !o)} aria-expanded={open} className="lg:hidden"><SlidersHorizontal /> {active ? active : ''}</Button>
      </div>
      <Tabs value={value.type ?? 'all'} onValueChange={(v) => set('type', v === 'all' ? '' : v)}>
        <TabsList className="w-full sm:w-auto"><TabsTrigger value="all" className="flex-1">All</TabsTrigger><TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger><TabsTrigger value="problem" className="flex-1">Problems</TabsTrigger></TabsList>
      </Tabs>
      <div className={`${open ? 'grid' : 'hidden'} grid-cols-2 gap-2 lg:grid lg:grid-cols-4`}>
        {selects.map(([k, label]) => (
          <Select key={k} aria-label={label} value={value[k] ?? ''} onChange={(e) => set(k, e.target.value)} disabled={!options}>
            <option value="">{label}: All</option>
            {options?.[k].map((o) => <option key={o} value={o}>{k === 'year' ? `Year ${o}` : o}</option>)}
          </Select>
        ))}
      </div>
      {active > 0 && <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => onChange({ search: value.search, type: value.type })}><X className="h-3 w-3" /> Clear {active} filter{active > 1 && 's'}</Button>}
    </div>
  );
}
