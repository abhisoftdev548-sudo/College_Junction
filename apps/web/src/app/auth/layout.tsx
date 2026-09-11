import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo className="text-primary-foreground [&_span:first-child]:bg-primary-foreground [&_span:first-child]:text-primary [&_span.text-primary]:text-primary-foreground/70" />
        <div>
          <blockquote className="text-2xl font-semibold leading-snug">“Found last year’s DBMS notes two days before the exam. Lifesaver.”</blockquote>
          <p className="mt-4 text-sm opacity-80">— A very relieved 2nd-year student</p>
        </div>
        <p className="text-xs opacity-70">© {new Date().getFullYear()} College Junction</p>
      </aside>
      <main className="relative flex items-center justify-center p-6">
        <div className="absolute right-4 top-4 flex items-center gap-2"><div className="lg:hidden"><Logo compact /></div><ThemeToggle /></div>
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
