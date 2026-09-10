'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { passwordSchema } from '@college-junction/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/form-field';
import { applyServerError } from '@/components/forms/use-server-errors';
import { authApi } from '@/lib/queries';

const schema = z.object({ password: passwordSchema, confirm: z.string() }).refine((d) => d.password === d.confirm, { path: ['confirm'], message: 'Passwords do not match' });
type Values = z.infer<typeof schema>;

export function ResetForm() {
  const token = useSearchParams().get('token');
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  if (!token) return <div className="text-center"><h1 className="text-xl font-bold">Invalid link</h1><p className="mt-2 text-sm text-muted-foreground">This reset link is missing its token.</p><Button className="mt-4" asChild><Link href="/auth/forgot-password">Request a new one</Link></Button></div>;

  async function onSubmit(v: Values) {
    try {
      await authApi.resetPassword(token!, v.password);
      toast.success('Password updated. Please sign in.');
      router.replace('/auth/signin');
    } catch (e) { applyServerError(e, setError); }
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Choose a new password</h1><p className="mt-1 text-sm text-muted-foreground">You&apos;ll be signed out of all devices.</p></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="New password" htmlFor="password" error={errors.password?.message} hint="Min 8 chars, 1 uppercase, 1 number"><Input id="password" type="password" autoComplete="new-password" {...register('password')} /></FormField>
        <FormField label="Confirm password" htmlFor="confirm" error={errors.confirm?.message}><Input id="confirm" type="password" autoComplete="new-password" {...register('confirm')} /></FormField>
        <Button type="submit" className="w-full" loading={isSubmitting}>Update password</Button>
      </form>
    </div>
  );
}
