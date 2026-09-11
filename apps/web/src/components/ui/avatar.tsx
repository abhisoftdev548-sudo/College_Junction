import { cn, initials } from '@/lib/utils';
export function Avatar({ name, className }: { name?: string; className?: string }) {
  return (
    <div className={cn('flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground ring-1 ring-border', className)}>
      {initials(name)}
    </div>
  );
}
