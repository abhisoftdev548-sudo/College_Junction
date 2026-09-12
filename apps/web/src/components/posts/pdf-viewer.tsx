'use client';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Adds a delivery transformation (e.g. fl_attachment) to a Cloudinary URL.
 * Returns other URLs untouched so non-Cloudinary hosts still work.
 *   https://res.cloudinary.com/<cloud>/image/upload/v1/abc.pdf
 * → https://res.cloudinary.com/<cloud>/image/upload/fl_attachment/v1/abc.pdf
 */
export function cloudinaryTransform(url: string, transform: string): string {
  try {
    const u = new URL(url);
    if (u.hostname !== 'res.cloudinary.com') return url;
    const m = u.pathname.match(/^(\/[^/]+\/upload)(\/.*)$/);
    if (!m) return url;
    return `${u.origin}${m[1]}/${transform}${m[2]}`;
  } catch {
    return url;
  }
}

/**
 * Inline PDF viewer for post attachments. Uses the browser's native PDF
 * renderer in an iframe (works on desktop Chrome/Firefox/Safari/Edge); mobile
 * browsers that can't embed PDFs get the fallback link below the frame.
 */
export function PdfViewer({ url, title }: { url: string; title: string }) {
  const downloadUrl = cloudinaryTransform(url, 'fl_attachment');
  return (
    <div className="mt-4 overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between gap-2 border-b bg-muted/50 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <FileText className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate font-medium">{title}</span>
          <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">PDF</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <a href={downloadUrl} rel="noopener noreferrer" aria-label={`Download ${title} (PDF)`}><Download /><span className="hidden sm:inline">Download</span></a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} in a new tab`}><ExternalLink /><span className="hidden sm:inline">Open</span></a>
          </Button>
        </div>
      </div>
      <iframe src={url} title={`PDF preview — ${title}`} className="h-[70vh] w-full bg-muted" loading="lazy" />
      <p className="border-t bg-muted/30 px-3 py-1.5 text-center text-xs text-muted-foreground">
        Preview not loading? <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Open the PDF in a new tab</a>.
      </p>
    </div>
  );
}
