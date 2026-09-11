'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupInput } from '@college-junction/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/form-field';
import { applyServerError } from '@/components/forms/use-server-errors';
import { authApi } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';

export function SignUpForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(values: SignupInput) {
    try {
      const { user } = await authApi.signup(values);
      setUser(user);
      toast.success('Account created! Check your inbox to verify your email.');
      router.replace('/profile/complete');
      router.refresh();
    } catch (e) {
      applyServerError(e, setError);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join your campus community in under a minute.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="Username" htmlFor="username" error={errors.username?.message} hint="3–20 chars: letters, numbers, underscore">
          <Input id="username" autoComplete="username" placeholder="asha_verma" {...register('username')} />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" placeholder="you@college.edu" {...register('email')} />
        </FormField>
        <FormField label="Password" htmlFor="password" error={errors.password?.message} hint="Min 8 chars, 1 uppercase, 1 number">
          <Input id="password" type="password" autoComplete="new-password" placeholder="••••••••" {...register('password')} />
        </FormField>
        <Button type="submit" className="w-full" loading={isSubmitting}>Create account</Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/auth/signin" className="font-medium text-primary hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
