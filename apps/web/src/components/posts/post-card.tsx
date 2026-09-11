'use client';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, ExternalLink, FileText, Heart, ImageIcon, MessageCircle, MoreHorizontal, Timer, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { PostDTO } from '@college-junction/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ShareButton } from './share-button';
import { useAuth } from '@/lib/auth-context';
import { postsApi } from '@/lib/queries';
import { RequestError } from '@/lib/api';
import { cn, timeAgo } from '@/lib/utils';

interface Props {
  post: PostDTO;
  onChange?: (patch: Partial<PostDTO>) => void;
  onDelete?: () => void;
  detail?: boolean;
}

export function PostCard({ post, onChange, onDelete, detail = false }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = React.useState<'like' | 'save' | null>(null);
  const s = post.authorSnapshot;
  const canDelete = user && (user.id === post.author || user.role === 'admin');

  function requireAuth(): boolean {
    if (user) return true;
    toast('Sign in to interact', { action: { label: 'Sign in', onClick: () => router.push('/auth/signin') } });
    return false;
  }

  async function toggleLike() {
    if (!requireAuth() || busy) return;
    setBusy('like');
    const wasLiked = post.likedByMe;
    onChange?.({ likedByMe: !wasLiked, likesCount: post.likesCount + (wasLiked ? -1 : 1) }); // optimistic
    try {
      const r = wasLiked ? await postsApi.unlike(post.id) : await postsApi.like(post.id);
      onChange?.({ likedByMe: r.liked, likesCount: r.likesCount });
    } catch (e) {
      onChange?.({ likedByMe: wasLiked, likesCount: post.likesCount });
      toast.error(e instanceof RequestError ? e.message : 'Failed');
    } finally { setBusy(null); }
  }

  async function toggleSave() {
    if (!requireAuth() || busy) return;
    setBusy('save');
    try {
      const r = await postsApi.save(post.id);
      onChange?.({ savedByMe: r.saved, savesCount: r.savesCount });
      toast.success(r.saved ? 'Saved to your bookmarks' : 'Removed from bookmarks');
    } catch (e) { toast.error(e instanceof RequestError ? e.message : 'Failed'); }
    finally { setBusy(null); }
  }

  async function remove() {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    try {
      await postsApi.remove(post.id);
      toast.success('Post deleted');
      onDelete?.();
    } catch (e) { toast.error(e instanceof RequestError ? e.message : 'Failed'); }
  }

  const tags = [s.course, s.branch, s.year && `Year ${s.year}`, s.session].filter(Boolean) as string[];

  return (
    <Card className="overflow-hidden animate-fade-up">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <Link href={`/profile/${s.username}`}><Avatar name={s.fullName || s.username} /></Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
              <Link href={`/profile/${s.username}`} className="font-semibold hover:underline">{s.fullName || s.username}</Link>
              <span className="text-muted-foreground">@{s.username}</span>
              <span className="text-muted-foreground">·</span>
              <time className="text-muted-foreground" dateTime={post.createdAt}>{timeAgo(post.createdAt)}</time>
            </div>
            {s.college && <p className="truncate text-xs text-muted-foreground">{s.college}</p>}
          </div>
          <div className="flex items-center gap-1">
            <Badge variant={post.type === 'notes' ? 'accent' : 'secondary'} className="capitalize">{post.type}</Badge>
            {(canDelete || post.deleteAt) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {post.deleteAt && <DropdownMenuItem disabled><Timer /> Auto-deletes {timeAgo(post.deleteAt).replace(' ago', '')}</DropdownMenuItem>}
                  {canDelete && <DropdownMenuItem onSelect={remove} className="text-destructive focus:text-destructive"><Trash2 /> Delete post</DropdownMenuItem>}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="mt-4">
          {detail ? <h1 className="text-xl font-bold leading-snug">{post.title}</h1> : <Link href={`/post/${post.id}`} className="text-lg font-semibold leading-snug hover:text-primary">{post.title}</Link>}
          <p className={cn('mt-1.5 whitespace-pre-wrap text-sm text-foreground/90', !detail && 'line-clamp-4')}>{post.description}</p>
        </div>

        {post.fileUrl && (
          post.fileType === 'image' ? (
            <a href={post.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.fileUrl} alt={post.title} className={cn('w-full object-cover', detail ? 'max-h-[70vh] object-contain bg-muted' : 'max-h-80')} loading="lazy" />
            </a>
          ) : (
            <a href={post.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-3 rounded-lg border bg-accent/40 p-3 text-sm transition-colors hover:bg-accent">
              <FileText className="h-8 w-8 text-primary" />
              <div className="min-w-0 flex-1"><p className="font-medium">Attached PDF</p><p className="truncate text-xs text-muted-foreground">Tap to open / download</p></div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          )
        )}

        {post.externalLinks.length > 0 && (
          <ul className="mt-3 space-y-1">
            {post.externalLinks.map((l) => (
              <li key={l}><a href={l} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex max-w-full items-center gap-1 truncate text-xs text-primary hover:underline"><ExternalLink className="h-3 w-3 shrink-0" />{l}</a></li>
            ))}
          </ul>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">{tags.map((t) => <Badge key={t} variant="outline" className="font-normal text-muted-foreground">{t}</Badge>)}</div>
        )}
      </div>

      <div className="flex items-center justify-between border-t bg-muted/30 px-2 py-1.5">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={toggleLike} aria-pressed={post.likedByMe} className={cn(post.likedByMe && 'text-destructive hover:text-destructive')}>
            <Heart className={cn(post.likedByMe && 'fill-current')} /> {post.likesCount}
          </Button>
          <Button variant="ghost" size="sm" asChild><Link href={`/post/${post.id}#comments`}><MessageCircle /> {post.commentsCount}</Link></Button>
          <ShareButton postId={post.id} title={post.title} />
        </div>
        <Button variant="ghost" size="sm" onClick={toggleSave} aria-pressed={post.savedByMe} className={cn(post.savedByMe && 'text-primary hover:text-primary')}>
          <Bookmark className={cn(post.savedByMe && 'fill-current')} /> <span className="hidden sm:inline">{post.savedByMe ? 'Saved' : 'Save'}</span>
        </Button>
      </div>
    </Card>
  );
}

export function PostCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3"><div className="h-9 w-9 animate-pulse rounded-full bg-muted" /><div className="flex-1 space-y-2"><div className="h-3 w-40 animate-pulse rounded bg-muted" /><div className="h-3 w-24 animate-pulse rounded bg-muted" /></div></div>
      <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-2 space-y-1.5"><div className="h-3 w-full animate-pulse rounded bg-muted" /><div className="h-3 w-5/6 animate-pulse rounded bg-muted" /></div>
      <div className="mt-4 flex gap-2"><div className="h-5 w-16 animate-pulse rounded-full bg-muted" /><div className="h-5 w-12 animate-pulse rounded-full bg-muted" /></div>
    </Card>
  );
}
