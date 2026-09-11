import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ResetForm } from './reset-form';
export const metadata: Metadata = { title: 'Set new password' };
export default function Page() { return <Suspense><ResetForm /></Suspense>; }
