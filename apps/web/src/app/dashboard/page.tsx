import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { AuthGuard } from '@/components/auth-guard';
import { Dashboard } from './dashboard';
export const metadata: Metadata = { title: 'Dashboard' };
export default function Page() {
  return (
    <>
      <Navbar />
      <AuthGuard><Dashboard /></AuthGuard>
    </>
  );
}
