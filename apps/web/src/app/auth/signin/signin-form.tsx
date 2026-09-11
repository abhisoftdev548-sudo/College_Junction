'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@college-junction/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/form-field';
import { applyServerError } from '@/components/forms/use-server-errors';
import { authApi } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useAuth();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginInput) {
    try {
      const { user } = await authApi.login(values.identifier, values.password);
      setUser(user);
      toast.success(`Welcome back, ${user.fullName?.split(' ')[0] || user.username}!`);
      const next = params.get('next');
      router.replace(!user.isProfileComplete ? '/profile/complete' : next && next.startsWith('/') ? next : '/dashboard');
      router.refresh();
    } catch (e) {
      applyServerError(e, setError);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in with your email or username.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="Email or username" htmlFor="identifier" error={errors.identifier?.message}>
          <Input id="identifier" autoComplete="username" placeholder="you@college.edu" {...register('identifier')} />
        </FormField>
        <FormField label="Password" htmlFor="password" error={errors.password?.message}>
          <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••" {...register('password')} />
        </FormField>
        <div className="text-right"><Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link></div>
        <Button type="submit" className="w-full" loading={isSubmitting}>Sign in</Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        New here? <Link href="/auth/signup" className="font-medium text-primary hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
