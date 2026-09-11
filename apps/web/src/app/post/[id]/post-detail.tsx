'use client';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import type { PostDTO } from '@college-junction/types';
import { PostCard, PostCardSkeleton } from '@/components/posts/post-card';
import { Comments } from '@/components/posts/comments';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { postsApi } from '@/lib/queries';
import { RequestError } from '@/lib/api';

export function PostDetail({ id }: { id: string }) {
  const router = useRouter();
  const [post, setPost] = React.useState<PostDTO | null>(null);
  const [error, setError] = React.useState<{ status: number; message: string } | null>(null);

  React.useEffect(() => {
    postsApi.get(id).then(({ post }) => setPost(post)).catch((e) => setError({ status: e instanceof RequestError ? e.status : 0, message: e instanceof RequestError ? e.message : 'Failed to load' }));
  }, [id]);

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => (history.length > 1 ? router.back() : router.push('/dashboard'))}><ArrowLeft /> Back</Button>
      {error ? (
        <EmptyState icon={FileQuestion} title={error.status === 404 || error.status === 400 ? 'Post not found' : 'Couldn’t load post'} description={error.status === 404 ? 'It may have been deleted or expired.' : error.message} action={<Button asChild><Link href="/dashboard">Go to feed</Link></Button>} />
      ) : !post ? (
        <PostCardSkeleton />
      ) : (
        <>
          <PostCard post={post} detail onChange={(patch) => setPost((p) => (p ? { ...p, ...patch } : p))} onDelete={() => router.push('/dashboard')} />
          <Comments postId={post.id} onCountChange={(delta) => setPost((p) => (p ? { ...p, commentsCount: Math.max(0, p.commentsCount + delta) } : p))} />
        </>
      )}
    </div>
  );
}
