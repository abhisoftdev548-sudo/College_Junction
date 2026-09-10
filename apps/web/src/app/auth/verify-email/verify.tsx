'use client';
import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, MailWarning } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';
import { RequestError } from '@/lib/api';

export function VerifyEmail() {
  const token = useSearchParams().get('token');
  const { user, setUser } = useAuth();
  const [state, setState] = React.useState<'idle' | 'loading' | 'ok' | 'error'>(token ? 'loading' : 'idle');
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    if (!token) return;
    authApi.verifyEmail(token)
      .then(({ user }) => { setUser(user); setState('ok'); })
      .catch((e) => { setState('error'); setMessage(e instanceof RequestError ? e.message : 'Verification failed'); });
  }, [token, setUser]);

  async function resend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try { await authApi.resendVerification(email || user?.email || ''); toast.success('If that email is unverified, a new link is on its way.'); }
    catch (err) { toast.error(err instanceof RequestError ? err.message : 'Failed'); }
    finally { setSending(false); }
  }

  if (state === 'loading') return <div className="flex flex-col items-center gap-3 text-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Verifying your email…</p></div>;
  if (state === 'ok') return (
    <div className="flex flex-col items-center gap-3 text-center">
      <CheckCircle2 className="h-10 w-10 text-primary" />
      <h1 className="text-xl font-bold">Email verified!</h1>
      <p className="text-sm text-muted-foreground">You can now post notes and problems.</p>
      <Button asChild className="mt-2"><Link href={user?.isProfileComplete ? '/dashboard' : '/profile/complete'}>Continue</Link></Button>
    </div>
  );
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <MailWarning className="h-10 w-10 text-primary" />
        <h1 className="text-xl font-bold">{state === 'error' ? 'Link invalid or expired' : 'Verify your email'}</h1>
        <p className="text-sm text-muted-foreground">{state === 'error' ? message : 'Enter your email to receive a new verification link.'}</p>
      </div>
      <form onSubmit={resend} className="space-y-3">
        <Input type="email" required placeholder="you@college.edu" value={email || user?.email || ''} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" className="w-full" loading={sending}>Resend verification link</Button>
      </form>
    </div>
  );
}
