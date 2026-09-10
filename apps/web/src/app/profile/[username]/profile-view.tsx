'use client';
import * as React from 'react';
import Link from 'next/link';
import { CalendarDays, GraduationCap, MessageSquareDashed, Pencil, ShieldAlert, UserX } from 'lucide-react';
import type { PublicUser } from '@college-junction/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EmptyState } from '@/components/empty-state';
import { PostFeed } from '@/components/posts/post-feed';
import { profileApi } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';
import { RequestError } from '@/lib/api';

export function ProfileView({ username }: { username: string }) {
  const { user: me } = useAuth();
  const [data, setData] = React.useState<{ user: PublicUser; stats: { posts: number; likesReceived: number } } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    profileApi.get(username).then(setData).catch((e) => setError(e instanceof RequestError && e.status === 404 ? 'not-found' : 'error'));
  }, [username]);

  if (error === 'not-found') return <EmptyState icon={UserX} title="User not found" description={`No one goes by @${username} here.`} action={<Button asChild><Link href="/dashboard">Back to feed</Link></Button>} />;
  if (error) return <EmptyState icon={ShieldAlert} title="Couldn’t load profile" action={<Button onClick={() => location.reload()}>Retry</Button>} />;
  if (!data) return <div className="space-y-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-32 w-full" /></div>;

  const { user: u, stats } = data;
  const isMe = me?.id === u.id;
  const academics = [u.course, u.branch, u.year && `Year ${u.year}`, u.semester && `Sem ${u.semester}`, u.session].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-24 bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--accent))_100%)]" />
        <CardContent className="relative p-5 pt-0">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-3">
            <Avatar name={u.fullName || u.username} className="h-20 w-20 text-2xl ring-4 ring-card" />
            <div className="flex gap-2">
              {isMe ? (
                <Button variant="outline" asChild><Link href="/profile/complete"><Pencil /> Edit profile</Link></Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild><Button variant="outline"><MessageSquareDashed /> Message</Button></DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader><DialogTitle>Direct messages — coming soon</DialogTitle><DialogDescription>We&apos;re building private messaging. For now, reply on one of {u.fullName?.split(' ')[0] || u.username}&apos;s posts.</DialogDescription></DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{u.fullName || u.username}</h1>
              {u.role === 'admin' && <Badge>Admin</Badge>}
              {u.isRestricted && me?.role === 'admin' && <Badge variant="destructive">Restricted</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">@{u.username}</p>
            {u.college && <p className="mt-2 inline-flex items-center gap-1.5 text-sm"><GraduationCap className="h-4 w-4 text-primary" /> {u.college}</p>}
            {academics.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{academics.map((a) => <Badge key={a} variant="accent">{a}</Badge>)}</div>}
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" /> Joined {new Date(u.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-xs">
            <div className="rounded-lg border p-3 text-center"><p className="text-xl font-bold">{stats.posts}</p><p className="text-xs text-muted-foreground">Posts</p></div>
            <div className="rounded-lg border p-3 text-center"><p className="text-xl font-bold">{stats.likesReceived}</p><p className="text-xs text-muted-foreground">Likes received</p></div>
          </div>
        </CardContent>
      </Card>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Posts</h2>
        <PostFeed query={{ author: u.username }} emptyTitle={isMe ? 'You haven’t posted yet' : `${u.fullName?.split(' ')[0] || u.username} hasn’t posted yet`} emptyDescription={isMe ? 'Head to the dashboard to share your first notes.' : 'Check back later.'} />
      </section>
    </div>
  );
}
