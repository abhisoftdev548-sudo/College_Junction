import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'College Junction', template: '%s · College Junction' },
  description: 'Share notes, ask problems, and learn together with your campus.',
  openGraph: { title: 'College Junction', description: 'Campus notes & problem sharing.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is required by next-themes (spec §1.14)
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
