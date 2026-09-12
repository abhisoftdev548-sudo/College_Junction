import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { PostDetail } from './post-detail';

const API = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const r = await fetch(`${API}/api/posts/${params.id}`, { next: { revalidate: 60 } });
    if (!r.ok) return { title: 'Post' };
    const { data } = await r.json();
    // Cloudinary renders page 1 of a PDF when delivered with a .jpg extension.
    const ogImage = data.post.fileType === 'image' && data.post.fileUrl
      ? data.post.fileUrl
      : data.post.fileType === 'pdf' && typeof data.post.fileUrl === 'string' && data.post.fileUrl.startsWith('https://res.cloudinary.com/')
        ? data.post.fileUrl.replace(/\.pdf$/, '.jpg')
        : undefined;
    return { title: data.post.title, description: String(data.post.description).slice(0, 160), openGraph: { title: data.post.title, description: String(data.post.description).slice(0, 160), images: ogImage ? [ogImage] : undefined } };
  } catch { return { title: 'Post' }; }
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main className="container max-w-2xl py-6"><PostDetail id={params.id} /></main>
    </>
  );
}
