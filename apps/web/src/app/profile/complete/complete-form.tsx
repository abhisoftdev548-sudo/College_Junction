'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeProfileSchema, type CompleteProfileInput } from '@college-junction/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/forms/form-field';
import { applyServerError } from '@/components/forms/use-server-errors';
import { profileApi } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';

const COURSES = ['B.Tech', 'B.E.', 'BCA', 'MCA', 'B.Sc', 'M.Sc', 'BBA', 'MBA', 'B.Com', 'B.Pharm', 'Diploma', 'Other'];
const YEARS = ['1', '2', '3', '4', '5'];
const SEMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const thisYear = new Date().getFullYear();
const SESSIONS = Array.from({ length: 6 }, (_, i) => `${thisYear - 3 + i}-${String(thisYear - 2 + i).slice(2)}`);

export function CompleteProfileForm() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<CompleteProfileInput>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: { fullName: user?.fullName ?? '', college: user?.college ?? '', course: user?.course ?? '', branch: user?.branch ?? '', year: user?.year ?? '', semester: user?.semester ?? '', session: user?.session ?? '' },
  });

  async function onSubmit(v: CompleteProfileInput) {
    try {
      const { user } = await profileApi.complete(v);
      setUser(user);
      toast.success('Profile saved!');
      router.replace('/dashboard');
    } catch (e) { applyServerError(e, setError); }
  }

  const editing = user?.isProfileComplete;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{editing ? 'Edit your profile' : 'Complete your profile'}</CardTitle>
        <CardDescription>{editing ? 'Existing posts keep the academic details they were created with.' : 'Your posts will be tagged with these details so classmates can find them.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2" noValidate>
          <div className="sm:col-span-2"><FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message}><Input id="fullName" autoComplete="name" placeholder="Asha Verma" {...register('fullName')} /></FormField></div>
          <div className="sm:col-span-2"><FormField label="College" htmlFor="college" error={errors.college?.message}><Input id="college" placeholder="Jabalpur Engineering College" {...register('college')} /></FormField></div>
          <FormField label="Course" htmlFor="course" error={errors.course?.message}>
            <Select id="course" {...register('course')}><option value="">Select course</option>{COURSES.map((c) => <option key={c}>{c}</option>)}</Select>
          </FormField>
          <FormField label="Branch" htmlFor="branch" error={errors.branch?.message}><Input id="branch" placeholder="CSE, ECE, Mechanical…" {...register('branch')} /></FormField>
          <FormField label="Year" htmlFor="year" error={errors.year?.message}>
            <Select id="year" {...register('year')}><option value="">Select year</option>{YEARS.map((y) => <option key={y} value={y}>Year {y}</option>)}</Select>
          </FormField>
          <FormField label="Semester" htmlFor="semester" error={errors.semester?.message}>
            <Select id="semester" {...register('semester')}><option value="">Select semester</option>{SEMS.map((s) => <option key={s} value={s}>Semester {s}</option>)}</Select>
          </FormField>
          <div className="sm:col-span-2"><FormField label="Session" htmlFor="session" error={errors.session?.message}>
            <Select id="session" {...register('session')}><option value="">Select session</option>{SESSIONS.map((s) => <option key={s}>{s}</option>)}</Select>
          </FormField></div>
          <div className="sm:col-span-2 pt-2"><Button type="submit" className="w-full sm:w-auto" loading={isSubmitting}>{editing ? 'Save changes' : 'Save & continue'}</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
