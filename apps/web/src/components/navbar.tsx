'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, Shield, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from '@/lib/auth-context';

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  async function onLogout() {
    await logout();
    toast.success('Signed out');
    router.push('/');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b glass">
      <div className="container flex h-14 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {loading ? (
            <Skeleton className="h-9 w-9 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Account menu">
                  <Avatar name={user.fullName || user.username} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-2 py-1.5">
                  <p className="truncate text-sm font-medium">{user.fullName || user.username}</p>
                  <p className="truncate text-xs text-muted-foreground">@{user.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard"><LayoutDashboard /> Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href={`/profile/${user.username}`}><UserIcon /> My profile</Link></DropdownMenuItem>
                {user.role === 'admin' && <DropdownMenuItem asChild><Link href="/admin"><Shield /> Admin</Link></DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={onLogout} className="text-destructive focus:text-destructive"><LogOut /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex"><Link href="/auth/signin">Sign in</Link></Button>
              <Button asChild><Link href="/auth/signup">Get started</Link></Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
