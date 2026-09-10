'use client';
import * as React from 'react';
import type { PublicUser } from '@college-junction/types';
import { authApi } from './queries';

interface AuthCtx {
  user: PublicUser | null;
  loading: boolean;
  setUser: (u: PublicUser | null) => void;
  refresh: () => Promise<PublicUser | null>;
  logout: () => Promise<void>;
}
const Ctx = React.createContext<AuthCtx | null>(null);

export function AuthProvider({ children, initialUser = null }: { children: React.ReactNode; initialUser?: PublicUser | null }) {
  const [user, setUser] = React.useState<PublicUser | null>(initialUser);
  const [loading, setLoading] = React.useState(!initialUser);

  const refresh = React.useCallback(async () => {
    try {
      const { user } = await authApi.me();
      setUser(user);
      return user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!initialUser) void refresh();
  }, [initialUser, refresh]);

  const logout = React.useCallback(async () => {
    try { await authApi.logout(); } finally { setUser(null); }
  }, []);

  return <Ctx.Provider value={{ user, loading, setUser, refresh, logout }}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const c = React.useContext(Ctx);
  if (!c) throw new Error('useAuth must be used inside AuthProvider');
  return c;
}
