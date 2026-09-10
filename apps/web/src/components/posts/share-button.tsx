'use client';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SITE_URL } from '@/lib/utils';

/** Native share on mobile, clipboard fallback on desktop (spec §1.13). */
export function ShareButton({ postId, title, size = 'sm' }: { postId: string; title: string; size?: 'sm' | 'default' }) {
  async function share() {
    const url = `${SITE_URL}/post/${postId}`;
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success('Link copied');
    } catch (e) {
      if ((e as Error).name !== 'AbortError') toast.error('Could not share');
    }
  }
  return <Button variant="ghost" size={size} onClick={share} aria-label="Share"><Share2 /> <span className="hidden sm:inline">Share</span></Button>;
}
