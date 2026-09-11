'use client';
import { Toaster } from 'sonner';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from '@/lib/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        {children}
        <Toaster richColors position="bottom-right" closeButton />
      </AuthProvider>
    </ThemeProvider>
  );
}
