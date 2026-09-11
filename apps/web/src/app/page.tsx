import Link from 'next/link';
import { ArrowRight, BookOpen, HelpCircle, Filter, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/logo';

const features = [
  { icon: BookOpen, title: 'Share notes', text: 'Upload PDFs or images of your class notes and tag them with course, branch, year and session automatically.' },
  { icon: HelpCircle, title: 'Ask problems', text: 'Stuck on a question? Post it, get answers from seniors and classmates in threaded comments.' },
  { icon: Filter, title: 'Smart filters', text: 'Find exactly what you need — filter the feed by course, branch, year and session in one click.' },
  { icon: Heart, title: 'Like & save', text: 'Bookmark the best material for exam week and show appreciation to helpful contributors.' },
  { icon: ShieldCheck, title: 'Moderated', text: 'Admins keep the feed clean with restrictions and auto-expiring posts.' },
  { icon: Zap, title: 'Fast & light', text: 'Infinite scrolling feed, dark mode, and a mobile-first UI that just works.' },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent))_0%,transparent_60%)]" />
          <div className="container flex flex-col items-center py-24 text-center sm:py-32">
            <Badge variant="accent" className="mb-5 animate-fade-up">Built for Indian campuses 🇮🇳</Badge>
            <h1 className="max-w-3xl animate-fade-up text-balance text-4xl font-extrabold tracking-tight sm:text-6xl [animation-delay:80ms]">
              Your campus, <span className="text-primary">one junction</span> for notes &amp; doubts.
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-balance text-lg text-muted-foreground [animation-delay:160ms]">
              Share semester notes, post problems you&apos;re stuck on, and learn together with students from your course, branch and batch.
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row [animation-delay:240ms]">
              <Button size="lg" asChild><Link href="/auth/signup">Create free account <ArrowRight /></Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/dashboard">Browse the feed</Link></Button>
            </div>
            <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4 text-sm">
              {[['PDF & images', 'up to 10 MB'], ['Cursor feed', 'infinite scroll'], ['Dark mode', 'system aware']].map(([a, b]) => (
                <div key={a} className="glass rounded-lg p-4"><p className="font-semibold">{a}</p><p className="text-muted-foreground">{b}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need for exam season</h2>
            <p className="mt-3 text-muted-foreground">No more scattered WhatsApp PDFs. A clean, searchable, moderated space owned by students.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground"><f.icon className="h-5 w-5" /></div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container pb-24">
          <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-16">
            <h2 className="text-3xl font-bold">Ready to help your batch?</h2>
            <p className="mx-auto mt-3 max-w-md opacity-90">Sign up in 30 seconds, complete your academic profile and start sharing.</p>
            <Button size="lg" variant="secondary" className="mt-8" asChild><Link href="/auth/signup">Join College Junction</Link></Button>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} College Junction. Made with ❤️ by students, for students.</p>
        </div>
      </footer>
    </>
  );
}
