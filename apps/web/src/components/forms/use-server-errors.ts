import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { RequestError } from '@/lib/api';

/** Map `{ errors: { field: msg } }` from the API onto react-hook-form fields; toast the rest. */
export function applyServerError<T extends FieldValues>(e: unknown, setError?: UseFormSetError<T>) {
  if (e instanceof RequestError) {
    if (e.errors && setError) {
      let mapped = false;
      for (const [k, v] of Object.entries(e.errors)) {
        if (k === 'code') continue;
        setError(k as Path<T>, { message: v });
        mapped = true;
      }
      if (mapped) return;
    }
    toast.error(e.message);
    return;
  }
  toast.error('Something went wrong');
}
