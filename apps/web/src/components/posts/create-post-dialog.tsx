'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileUp, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { createPostSchema, type PostDTO } from '@college-junction/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormField } from '@/components/forms/form-field';
import { applyServerError } from '@/components/forms/use-server-errors';
import { postsApi } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';
import { RequestError } from '@/lib/api';

const ALLOWED = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
const MAX = 10 * 1024 * 1024;
// Form-side schema: links as a textarea (one per line) → parsed to array.
const formSchema = createPostSchema.omit({ externalLinks: true }).extend({ links: z.string().max(4000).optional() });
type Values = z.infer<typeof formSchema>;

export function CreatePostDialog({ onCreated, trigger }: { onCreated?: (p: PostDTO) => void; trigger?: React.ReactNode }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setError, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(formSchema), defaultValues: { type: 'notes', title: '', description: '', links: '' } });
  const type = watch('type');

  function pickFile(f: File | null) {
    if (!f) return setFile(null);
    if (!ALLOWED.includes(f.type)) return toast.error('Only PDF, PNG, JPEG or WEBP files are allowed');
    if (f.size > MAX) return toast.error('File must be 10 MB or smaller');
    setFile(f);
  }

  async function onSubmit(v: Values) {
    const links = (v.links ?? '').split(/\n|,/).map((s) => s.trim()).filter(Boolean);
    const parsed = createPostSchema.safeParse({ ...v, externalLinks: links });
    if (!parsed.success) { setError('links', { message: 'One of the links is not a valid URL (include https://)' }); return; }
    const fd = new FormData();
    fd.append('type', v.type); fd.append('title', v.title); fd.append('description', v.description);
    fd.append('externalLinks', JSON.stringify(links));
    if (file) fd.append('file', file);
    try {
      const { post } = await postsApi.create(fd);
      toast.success('Posted!');
      onCreated?.(post);
      reset(); setFile(null); setOpen(false);
    } catch (e) {
      if (e instanceof RequestError && e.errors?.code === 'PROFILE_INCOMPLETE') { toast.error('Complete your profile first'); return; }
      applyServerError(e, setError);
    }
  }

  if (!user) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? <Button><Plus /> New post</Button>}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Share with your batch</DialogTitle>
          <DialogDescription>Tagged automatically with {[user.course, user.branch, user.year && `Year ${user.year}`, user.session].filter(Boolean).join(' · ') || 'your profile'}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Tabs value={type} onValueChange={(v) => setValue('type', v as 'notes' | 'problem')}>
            <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="notes">📚 Notes</TabsTrigger><TabsTrigger value="problem">❓ Problem</TabsTrigger></TabsList>
          </Tabs>
          <FormField label="Title" htmlFor="title" error={errors.title?.message}>
            <Input id="title" placeholder={type === 'notes' ? 'e.g. Unit 3 — Operating Systems handwritten notes' : 'e.g. Stuck on Fourier series Q3 (Unit 2)'} maxLength={140} {...register('title')} />
          </FormField>
          <FormField label="Description" htmlFor="description" error={errors.description?.message}>
            <Textarea id="description" rows={5} placeholder={type === 'notes' ? 'What do these notes cover? Any tips?' : 'Describe the problem and what you have tried…'} {...register('description')} />
          </FormField>
          <FormField label="Attachment (optional)" htmlFor="file" hint="PDF, PNG, JPEG or WEBP · max 10 MB">
            <input ref={fileRef} id="file" type="file" accept={ALLOWED.join(',')} className="hidden" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
            {file ? (
              <div className="flex items-center justify-between rounded-md border bg-accent/40 px-3 py-2 text-sm">
                <span className="truncate">{file.name} <span className="text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span></span>
                <Button type="button" variant="ghost" size="icon" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }} aria-label="Remove file"><X /></Button>
              </div>
            ) : (
              <Button type="button" variant="outline" className="w-full border-dashed" onClick={() => fileRef.current?.click()}><FileUp /> Choose file</Button>
            )}
          </FormField>
          <FormField label="External links (optional)" htmlFor="links" error={errors.links?.message} hint="One per line, up to 5">
            <Textarea id="links" rows={2} placeholder="https://drive.google.com/…" {...register('links')} />
          </FormField>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting}>Publish</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
