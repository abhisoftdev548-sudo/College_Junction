'use client';
import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@college-junction/types';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/form-field';
import { applyServerError } from '@/components/forms/use-server-errors';
import { authApi } from '@/lib/queries';

type Values = z.infer<typeof forgotPasswordSchema>;

export function ForgotForm() {
  const [sent, setSent] = React.useState(false);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(v: Values) {
    try { await authApi.forgotPassword(v.email); setSent(true); } catch (e) { applyServerError(e, setError); }
  }

  if (sent) return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Check your inbox</h1>
      <p className="text-sm text-muted-foreground">If that email is registered, we&apos;ve sent a reset link. It expires in 30 minutes.</p>
      <Button variant="outline" asChild><Link href="/auth/signin">Back to sign in</Link></Button>
    </div>
  );
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Reset your password</h1><p className="mt-1 text-sm text-muted-foreground">We&apos;ll email you a secure link.</p></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}><Input id="email" type="email" autoComplete="email" {...register('email')} /></FormField>
        <Button type="submit" className="w-full" loading={isSubmitting}>Send reset link</Button>
      </form>
      <p className="text-center text-sm"><Link href="/auth/signin" className="text-primary hover:underline">Back to sign in</Link></p>
    </div>
  );
}
