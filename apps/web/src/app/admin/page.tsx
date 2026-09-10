import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { AuthGuard } from '@/components/auth-guard';
import { AdminDashboard } from './admin-dashboard';
export const metadata: Metadata = { title: 'Admin' };
export default function Page() {
  return (
    <>
      <Navbar />
      <AuthGuard requireAdmin requireProfile={false}><AdminDashboard /></AuthGuard>
    </>
  );
}
