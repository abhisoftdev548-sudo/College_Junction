'use client';
import * as React from 'react';
import { Inbox, RefreshCw } from 'lucide-react';
import type { ListPostsQuery, PostDTO } from '@college-junction/types';
import { PostCard, PostCardSkeleton } from './post-card';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { useInfinitePosts, useIntersection } from '@/hooks/use-infinite-posts';

export interface PostFeedHandle { prepend: (p: PostDTO) => void; refresh: () => void }

export const PostFeed = React.forwardRef<PostFeedHandle, { query: Partial<ListPostsQuery>; emptyTitle?: string; emptyDescription?: string; emptyAction?: React.ReactNode }>(
  function PostFeed({ query, emptyTitle = 'No posts yet', emptyDescription = 'Be the first to share something with your batch.', emptyAction }, ref) {
    const feed = useInfinitePosts(query);
    React.useImperativeHandle(ref, () => ({ prepend: feed.prepend, refresh: () => void feed.refresh() }), [feed]);
    const sentinel = useIntersection(feed.loadMore, feed.hasMore && !feed.loading);

    if (feed.initialLoading) return <div className="space-y-4">{[0, 1, 2].map((i) => <PostCardSkeleton key={i} />)}</div>;
    if (feed.error && feed.items.length === 0) return <EmptyState icon={RefreshCw} title="Couldn’t load the feed" description={feed.error} action={<Button onClick={() => feed.refresh()}>Retry</Button>} />;
    if (feed.items.length === 0) return <EmptyState icon={Inbox} title={emptyTitle} description={emptyDescription} action={emptyAction} />;

    return (
      <div className="space-y-4">
        {feed.items.map((p) => <PostCard key={p.id} post={p} onChange={(patch) => feed.update(p.id, patch)} onDelete={() => feed.remove(p.id)} />)}
        <div ref={sentinel} aria-hidden />
        {feed.loading && <PostCardSkeleton />}
        {!feed.hasMore && feed.items.length > 5 && <p className="py-6 text-center text-xs text-muted-foreground">You’re all caught up 🎉</p>}
      </div>
    );
  },
);
