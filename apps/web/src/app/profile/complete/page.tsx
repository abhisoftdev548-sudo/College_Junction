import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { AuthGuard } from '@/components/auth-guard';
import { CompleteProfileForm } from './complete-form';
export const metadata: Metadata = { title: 'Complete your profile' };
export default function Page() {
  return (
    <>
      <Navbar />
      <AuthGuard requireProfile={false}>
        <main className="container max-w-2xl py-10"><CompleteProfileForm /></main>
      </AuthGuard>
    </>
  );
}
