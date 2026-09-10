'use client';
import * as React from 'react';
import Link from 'next/link';
import { Ban, CheckCircle2, FileText, MessageSquare, Search, ShieldCheck, Timer, TimerOff, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { PostDTO, PublicUser } from '@college-junction/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDebounced } from '@/components/posts/feed-filters';
import { adminApi, type AdminStats } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';
import { RequestError } from '@/lib/api';
import { timeAgo } from '@/lib/utils';

const msg = (e: unknown) => (e instanceof RequestError ? e.message : 'Something went wrong');

export function AdminDashboard() {
  const [stats, setStats] = React.useState<AdminStats | null>(null);
  const loadStats = React.useCallback(() => adminApi.stats().then(setStats).catch(() => null), []);
  React.useEffect(() => { void loadStats(); }, [loadStats]);

  const tiles = stats ? [
    { label: 'Users', value: stats.users, sub: `+${stats.newUsers7d} this week`, icon: Users },
    { label: 'Posts', value: stats.posts, sub: `${stats.notes} notes · ${stats.problems} problems`, icon: FileText },
    { label: 'Comments', value: stats.comments, sub: `+${stats.newPosts7d} posts this week`, icon: MessageSquare },
    { label: 'Moderation', value: stats.restricted, sub: `${stats.scheduledForDeletion} posts scheduled to expire`, icon: ShieldCheck },
  ] : [];

  return (
    <main className="container space-y-6 py-6">
      <div><h1 className="text-2xl font-bold">Admin dashboard</h1><p className="text-sm text-muted-foreground">Manage members, moderate posts and schedule auto-deletion.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats ? tiles.map((t) => (
          <Card key={t.label}><CardContent className="flex items-start justify-between p-5"><div><p className="text-sm text-muted-foreground">{t.label}</p><p className="mt-1 text-3xl font-bold">{t.value}</p><p className="mt-1 text-xs text-muted-foreground">{t.sub}</p></div><t.icon className="h-5 w-5 text-primary" /></CardContent></Card>
        )) : [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-28" />)}
      </div>
      <Tabs defaultValue="users">
        <TabsList><TabsTrigger value="users"><Users className="mr-1.5 h-4 w-4" /> Users</TabsTrigger><TabsTrigger value="posts"><FileText className="mr-1.5 h-4 w-4" /> Posts</TabsTrigger></TabsList>
        <TabsContent value="users"><UsersPanel onChanged={loadStats} /></TabsContent>
        <TabsContent value="posts"><PostsPanel onChanged={loadStats} /></TabsContent>
      </Tabs>
    </main>
  );
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return <div className="relative max-w-sm"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9" /></div>;
}

function UsersPanel({ onChanged }: { onChanged: () => void }) {
  const { user: me } = useAuth();
  const [search, setSearch] = React.useState('');
  const q = useDebounced(search);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState<{ items: PublicUser[]; total: number; totalPages: number } | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => { setLoading(true); adminApi.users(page, q).then(setData).catch((e) => toast.error(msg(e))).finally(() => setLoading(false)); }, [page, q]);
  React.useEffect(() => { setPage(1); }, [q]);
  React.useEffect(() => { load(); }, [load]);

  async function restrict(u: PublicUser) {
    try { const { user } = await adminApi.restrict(u.id, !u.isRestricted); setData((d) => d && { ...d, items: d.items.map((x) => (x.id === u.id ? user : x)) }); toast.success(user.isRestricted ? `@${u.username} restricted` : `Restriction lifted for @${u.username}`); onChanged(); }
    catch (e) { toast.error(msg(e)); }
  }
  async function remove(u: PublicUser) {
    if (!confirm(`Delete @${u.username} and ALL their posts/comments? This cannot be undone.`)) return;
    try { await adminApi.deleteUser(u.id); setData((d) => d && { ...d, items: d.items.filter((x) => x.id !== u.id), total: d.total - 1 }); toast.success('User deleted'); onChanged(); }
    catch (e) { toast.error(msg(e)); }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0"><CardTitle className="text-base">Members {data && <span className="font-normal text-muted-foreground">({data.total})</span>}</CardTitle><SearchBox value={search} onChange={setSearch} placeholder="Search name, username, email, college" /></CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-y bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-2.5">User</th><th className="px-3 py-2.5">Academics</th><th className="px-3 py-2.5">Status</th><th className="px-3 py-2.5">Joined</th><th className="px-3 py-2.5 text-right">Actions</th></tr></thead>
            <tbody>
              {loading && !data ? [0, 1, 2].map((i) => <tr key={i}><td colSpan={5} className="px-5 py-3"><Skeleton className="h-9 w-full" /></td></tr>)
              : data?.items.length === 0 ? <tr><td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">No users match.</td></tr>
              : data?.items.map((u) => (
                <tr key={u.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar name={u.fullName || u.username} className="h-8 w-8 text-[10px]" /><div className="min-w-0"><Link href={`/profile/${u.username}`} className="font-medium hover:underline">{u.fullName || u.username}</Link><p className="truncate text-xs text-muted-foreground">@{u.username} · {u.email}</p></div></div></td>
                  <td className="px-3 py-3 text-xs text-muted-foreground">{u.isProfileComplete ? [u.college, u.course, u.branch, u.year && `Yr ${u.year}`].filter(Boolean).join(' · ') : <span className="italic">Profile incomplete</span>}</td>
                  <td className="px-3 py-3"><div className="flex flex-wrap gap-1">{u.role === 'admin' && <Badge>Admin</Badge>}{u.isRestricted && <Badge variant="destructive">Restricted</Badge>}{!u.isEmailVerified && <Badge variant="outline">Unverified</Badge>}{u.role !== 'admin' && !u.isRestricted && u.isEmailVerified && <Badge variant="accent">Active</Badge>}</div></td>
                  <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{timeAgo(u.createdAt)}</td>
                  <td className="px-3 py-3 text-right">
                    {u.role !== 'admin' && u.id !== me?.id && (
                      <div className="inline-flex gap-1">
                        <Button size="sm" variant={u.isRestricted ? 'outline' : 'secondary'} onClick={() => restrict(u)}>{u.isRestricted ? <><CheckCircle2 /> Unrestrict</> : <><Ban /> Restrict</>}</Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => remove(u)} aria-label="Delete user"><Trash2 /></Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-5 py-3 text-sm"><span className="text-muted-foreground">Page {page} of {data.totalPages}</span><div className="flex gap-2"><Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button><Button size="sm" variant="outline" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button></div></div>
        )}
      </CardContent>
    </Card>
  );
}

function PostsPanel({ onChanged }: { onChanged: () => void }) {
  const [search, setSearch] = React.useState('');
  const q = useDebounced(search);
  const [items, setItems] = React.useState<PostDTO[]>([]);
  const [cursor, setCursor] = React.useState<string | null>(null);
  const [hasMore, setHasMore] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async (c?: string) => {
    setLoading(true);
    try { const page = await adminApi.posts(c, q); setItems((p) => (c ? [...p, ...page.items] : page.items)); setCursor(page.nextCursor); setHasMore(page.hasMore); }
    catch (e) { toast.error(msg(e)); } finally { setLoading(false); }
  }, [q]);
  React.useEffect(() => { void load(); }, [load]);

  async function setTimer(p: PostDTO, d: '24h' | '3d' | '7d' | null) {
    try { const { post } = await adminApi.timer(p.id, d); setItems((it) => it.map((x) => (x.id === p.id ? post : x))); toast.success(d ? `Will auto-delete in ${d}` : 'Timer cleared'); onChanged(); }
    catch (e) { toast.error(msg(e)); }
  }
  async function remove(p: PostDTO) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    try { await adminApi.deletePost(p.id); setItems((it) => it.filter((x) => x.id !== p.id)); toast.success('Post removed'); onChanged(); } catch (e) { toast.error(msg(e)); }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0"><CardTitle className="text-base">Posts</CardTitle><SearchBox value={search} onChange={setSearch} placeholder="Search title or author" /></CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-y bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-2.5">Post</th><th className="px-3 py-2.5">Author</th><th className="px-3 py-2.5">Engagement</th><th className="px-3 py-2.5">Auto-delete</th><th className="px-3 py-2.5 text-right">Actions</th></tr></thead>
            <tbody>
              {loading && items.length === 0 ? [0, 1, 2].map((i) => <tr key={i}><td colSpan={5} className="px-5 py-3"><Skeleton className="h-9 w-full" /></td></tr>)
              : items.length === 0 ? <tr><td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">No posts found.</td></tr>
              : items.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="max-w-xs px-5 py-3"><Link href={`/post/${p.id}`} className="line-clamp-1 font-medium hover:underline">{p.title}</Link><p className="text-xs text-muted-foreground"><Badge variant={p.type === 'notes' ? 'accent' : 'secondary'} className="mr-1 px-1.5 py-0 capitalize">{p.type}</Badge>{timeAgo(p.createdAt)}</p></td>
                  <td className="px-3 py-3 text-xs"><Link href={`/profile/${p.authorSnapshot.username}`} className="hover:underline">@{p.authorSnapshot.username}</Link><p className="text-muted-foreground">{[p.authorSnapshot.course, p.authorSnapshot.branch].filter(Boolean).join(' · ')}</p></td>
                  <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">♥ {p.likesCount} · 💬 {p.commentsCount}</td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap">{p.deleteAt ? <span className="inline-flex items-center gap-1 text-destructive"><Timer className="h-3.5 w-3.5" /> {new Date(p.deleteAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span> : <span className="text-muted-foreground">—</span>}</td>
                  <td className="px-3 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="sm" variant="secondary"><Timer /> Timer</Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {(['24h', '3d', '7d'] as const).map((d) => <DropdownMenuItem key={d} onSelect={() => setTimer(p, d)}><Timer /> Delete in {d}</DropdownMenuItem>)}
                          {p.deleteAt && <><DropdownMenuSeparator /><DropdownMenuItem onSelect={() => setTimer(p, null)}><TimerOff /> Clear timer</DropdownMenuItem></>}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => remove(p)} aria-label="Delete post"><Trash2 /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {hasMore && <div className="border-t p-3 text-center"><Button size="sm" variant="outline" loading={loading} onClick={() => load(cursor ?? undefined)}>Load more</Button></div>}
      </CardContent>
    </Card>
  );
}
