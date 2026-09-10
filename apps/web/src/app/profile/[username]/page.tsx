import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { ProfileView } from './profile-view';
export function generateMetadata({ params }: { params: { username: string } }): Metadata { return { title: `@${params.username}` }; }
export default function Page({ params }: { params: { username: string } }) {
  return (
    <>
      <Navbar />
      <main className="container max-w-3xl py-6"><ProfileView username={params.username} /></main>
    </>
  );
}
