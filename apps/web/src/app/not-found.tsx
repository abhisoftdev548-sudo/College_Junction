import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-6xl font-black text-primary">404</p>
        <h2 className="mt-2 text-xl font-semibold">Page not found</h2>
        <p className="mt-1 text-sm text-muted-foreground">The page you’re looking for doesn’t exist or has been removed.</p>
        <Button className="mt-5" asChild><Link href="/">Go home</Link></Button>
      </div>
    </>
  );
}
