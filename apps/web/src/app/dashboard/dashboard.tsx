'use client';
import * as React from 'react';
import Link from 'next/link';
import { Bookmark, Home, MailWarning, PenSquare, User as UserIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostFeed, type PostFeedHandle } from '@/components/posts/post-feed';
import { CreatePostDialog } from '@/components/posts/create-post-dialog';
import { FeedFiltersBar, useDebounced, type FeedFilters } from '@/components/posts/feed-filters';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

type Scope = 'all' | 'mine' | 'saved';

export function Dashboard() {
  const { user } = useAuth();
  const feedRef = React.useRef<PostFeedHandle>(null);
  const [scope, setScope] = React.useState<Scope>('all');
  const [filters, setFilters] = React.useState<FeedFilters>({});
  const search = useDebounced(filters.search);
  const query = React.useMemo(() => ({ ...filters, search: search || undefined, ...(scope === 'mine' ? { author: user?.username } : {}), ...(scope === 'saved' ? { saved: true } : {}) }), [filters, search, scope, user?.username]);

  const nav: Array<{ id: Scope; label: string; icon: typeof Home }> = [{ id: 'all', label: 'Home feed', icon: Home }, { id: 'mine', label: 'My posts', icon: PenSquare }, { id: 'saved', label: 'Saved', icon: Bookmark }];

  return (
    <main className="container grid gap-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_260px]">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-4">
          <Card><CardContent className="flex items-center gap-3 p-4">
            <Avatar name={user?.fullName || user?.username} className="h-11 w-11 text-sm" />
            <div className="min-w-0"><p className="truncate font-semibold">{user?.fullName || user?.username}</p><p className="truncate text-xs text-muted-foreground">{[user?.course, user?.branch, user?.year && `Yr ${user.year}`].filter(Boolean).join(' · ')}</p></div>
          </CardContent></Card>
          <nav className="space-y-1">
            {nav.map((n) => (
              <button key={n.id} onClick={() => setScope(n.id)} className={cn('flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent', scope === n.id && 'bg-accent text-accent-foreground')}>
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
            <Link href={`/profile/${user?.username}`} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"><UserIcon className="h-4 w-4" /> My profile</Link>
          </nav>
          <CreatePostDialog onCreated={(p) => { setScope('all'); feedRef.current?.prepend(p); }} trigger={<Button className="w-full"><PenSquare /> New post</Button>} />
        </div>
      </aside>

      {/* Feed */}
      <section className="min-w-0 space-y-4">
        {user && !user.isEmailVerified && (
          <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/60 p-3 text-sm">
            <MailWarning className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div><p className="font-medium">Verify your email to start posting.</p><p className="text-muted-foreground">Didn&apos;t get it? <Link href="/auth/verify-email" className="text-primary underline">Resend link</Link></p></div>
          </div>
        )}
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Tabs value={scope} onValueChange={(v) => setScope(v as Scope)}><TabsList>{nav.map((n) => <TabsTrigger key={n.id} value={n.id}><n.icon className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">{n.label}</span></TabsTrigger>)}</TabsList></Tabs>
          <CreatePostDialog onCreated={(p) => { setScope('all'); feedRef.current?.prepend(p); }} trigger={<Button size="sm"><PenSquare /> Post</Button>} />
        </div>
        <FeedFiltersBar value={filters} onChange={setFilters} />
        <PostFeed
          ref={feedRef}
          query={query}
          emptyTitle={scope === 'saved' ? 'Nothing saved yet' : scope === 'mine' ? 'You haven’t posted yet' : 'No posts match'}
          emptyDescription={scope === 'saved' ? 'Tap the bookmark on any post to find it here.' : scope === 'mine' ? 'Share your first notes or ask a question.' : 'Try clearing a filter or searching for something else.'}
          emptyAction={scope !== 'saved' ? <CreatePostDialog onCreated={(p) => feedRef.current?.prepend(p)} /> : undefined}
        />
      </section>

      {/* Right rail */}
      <aside className="hidden xl:block">
        <div className="sticky top-20 space-y-4">
          <Card><CardContent className="p-4 text-sm">
            <p className="font-semibold">Posting tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
              <li>Name the unit/chapter in the title.</li>
              <li>Upload clear PDFs under 10 MB.</li>
              <li>For problems, say what you already tried.</li>
              <li>Be kind — this is your batch.</li>
            </ul>
          </CardContent></Card>
        </div>
      </aside>
    </main>
  );
}
