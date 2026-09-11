'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Skeleton } from './ui/skeleton';

/**
 * Client-side gate layered on top of middleware.ts: waits for /auth/me, then
 * enforces sign-in, profile completion, and (optionally) admin role.
 */
export function AuthGuard({ children, requireProfile = true, requireAdmin = false }: { children: React.ReactNode; requireProfile?: boolean; requireAdmin?: boolean }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (loading) return;
    if (!user) router.replace(`/auth/signin?next=${encodeURIComponent(pathname)}`);
    else if (requireAdmin && user.role !== 'admin') router.replace('/dashboard');
    else if (requireProfile && !user.isProfileComplete && pathname !== '/profile/complete') router.replace('/profile/complete');
  }, [user, loading, router, pathname, requireProfile, requireAdmin]);

  if (loading || !user || (requireAdmin && user.role !== 'admin') || (requireProfile && !user.isProfileComplete && pathname !== '/profile/complete')) {
    return (
      <div className="container max-w-3xl space-y-4 py-10">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  return <>{children}</>;
}
