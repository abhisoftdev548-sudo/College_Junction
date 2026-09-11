'use client';
import * as React from 'react';
import Link from 'next/link';
import { CornerDownRight, MessageSquare, Send, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { CommentDTO } from '@college-junction/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/auth-context';
import { postsApi } from '@/lib/queries';
import { RequestError } from '@/lib/api';
import { timeAgo } from '@/lib/utils';

export function Comments({ postId, onCountChange }: { postId: string; onCountChange?: (delta: number) => void }) {
  const { user } = useAuth();
  const [items, setItems] = React.useState<CommentDTO[]>([]);
  const [cursor, setCursor] = React.useState<string | null>(null);
  const [hasMore, setHasMore] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [text, setText] = React.useState('');
  const [replyTo, setReplyTo] = React.useState<CommentDTO | null>(null);
  const [sending, setSending] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const load = React.useCallback(async (c?: string) => {
    setLoading(true);
    try {
      const page = await postsApi.comments(postId, c);
      setItems((p) => (c ? [...p, ...page.items] : page.items));
      setCursor(page.nextCursor); setHasMore(page.hasMore);
    } catch { toast.error('Failed to load comments'); }
    finally { setLoading(false); }
  }, [postId]);
  React.useEffect(() => { void load(); }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      const { comment } = await postsApi.addComment(postId, text.trim(), replyTo?.id ?? null);
      setItems((p) => [...p, comment]); onCountChange?.(1);
      setText(''); setReplyTo(null);
    } catch (err) {
      if (err instanceof RequestError && err.errors?.code === 'PROFILE_INCOMPLETE') toast.error('Complete your profile to comment');
      else toast.error(err instanceof RequestError ? err.message : 'Failed to comment');
    } finally { setSending(false); }
  }

  async function remove(c: CommentDTO) {
    if (!confirm('Delete this comment?')) return;
    try {
      const { deleted } = await postsApi.deleteComment(postId, c.id);
      setItems((p) => p.filter((x) => x.id !== c.id && x.parentComment !== c.id)); onCountChange?.(-deleted);
    } catch (err) { toast.error(err instanceof RequestError ? err.message : 'Failed'); }
  }

  // Group replies under parents (one level, per spec's parentComment field).
  const roots = items.filter((c) => !c.parentComment);
  const replies = new Map<string, CommentDTO[]>();
  for (const c of items) if (c.parentComment) replies.set(c.parentComment, [...(replies.get(c.parentComment) ?? []), c]);

  const Item = ({ c, isReply = false }: { c: CommentDTO; isReply?: boolean }) => (
    <div className={isReply ? 'ml-8 mt-3 flex gap-3 sm:ml-11' : 'flex gap-3'}>
      <Avatar name={c.author?.fullName || c.author?.username} className="h-8 w-8 text-[10px]" />
      <div className="min-w-0 flex-1">
        <div className="rounded-lg bg-muted/60 px-3 py-2">
          <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
            {c.author ? <Link href={`/profile/${c.author.username}`} className="font-semibold text-foreground hover:underline">{c.author.fullName || c.author.username}</Link> : <span className="font-semibold italic text-muted-foreground">[deleted]</span>}
            <time className="text-muted-foreground">{timeAgo(c.createdAt)}</time>
          </div>
          <p className="mt-1 whitespace-pre-wrap text-sm">{c.text}</p>
        </div>
        <div className="mt-1 flex gap-3 px-1 text-xs text-muted-foreground">
          {user && !isReply && <button className="hover:text-foreground" onClick={() => { setReplyTo(c); inputRef.current?.focus(); }}>Reply</button>}
          {user && (user.id === c.author?.id || user.role === 'admin') && <button className="inline-flex items-center gap-1 hover:text-destructive" onClick={() => remove(c)}><Trash2 className="h-3 w-3" /> Delete</button>}
        </div>
        {replies.get(c.id)?.map((r) => <Item key={r.id} c={r} isReply />)}
      </div>
    </div>
  );

  return (
    <Card id="comments">
      <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-base"><MessageSquare className="h-4 w-4" /> Comments</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        {user ? (
          <form onSubmit={submit} className="space-y-2">
            {replyTo && <div className="flex items-center justify-between rounded-md bg-accent/60 px-3 py-1.5 text-xs"><span className="inline-flex items-center gap-1"><CornerDownRight className="h-3 w-3" /> Replying to <b>{replyTo.author?.username ?? 'comment'}</b></span><button type="button" onClick={() => setReplyTo(null)} className="text-muted-foreground hover:text-foreground">Cancel</button></div>}
            <div className="flex gap-2">
              <Textarea ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} rows={2} maxLength={1000} placeholder="Add a helpful comment…" className="min-h-0" onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') void submit(e); }} />
              <Button type="submit" size="icon" className="h-auto" loading={sending} aria-label="Send"><Send /></Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-muted-foreground"><Link href="/auth/signin" className="text-primary underline">Sign in</Link> to join the discussion.</p>
        )}
        {loading && items.length === 0 ? (
          <div className="space-y-3">{[0, 1].map((i) => <div key={i} className="flex gap-3"><Skeleton className="h-8 w-8 rounded-full" /><Skeleton className="h-14 flex-1" /></div>)}</div>
        ) : roots.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">No comments yet. Start the conversation!</p>
        ) : (
          <div className="space-y-4">{roots.map((c) => <Item key={c.id} c={c} />)}</div>
        )}
        {hasMore && <Button variant="outline" size="sm" className="w-full" loading={loading} onClick={() => load(cursor ?? undefined)}>Load more comments</Button>}
      </CardContent>
    </Card>
  );
}
