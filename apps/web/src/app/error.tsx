'use client';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <AlertTriangle className="mb-3 h-10 w-10 text-destructive" />
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{error.message || 'An unexpected error occurred.'}</p>
      <Button className="mt-5" onClick={reset}>Try again</Button>
    </div>
  );
}
