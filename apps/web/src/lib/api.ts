import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiError, ApiResponse } from '@college-junction/types';

/** Single axios instance used everywhere (spec §1.1): credentials + CSRF header. */
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api`,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 20_000,
});

/**
 * Direct-to-API base for FILE UPLOADS only. Empty by default → uploads go through
 * the same-origin /api proxy like every other request. Set NEXT_PUBLIC_UPLOADS_URL
 * to bypass the Next.js server for multipart POSTs on hosts that cap request
 * bodies (e.g. Vercel serverless ≈4.5 MB). It must be same-site with the web app
 * (e.g. web on collegejunction.com, API on api.collegejunction.com) so the
 * SameSite=Lax auth cookies are still sent — otherwise keep it empty.
 */
const UPLOADS_BASE = (process.env.NEXT_PUBLIC_UPLOADS_URL || process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

/** Separate instance for uploads: longer timeout (10 MB on a slow connection adds up). */
export const uploadApi = axios.create({
  baseURL: `${UPLOADS_BASE}/api`,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 120_000,
});

let refreshing: Promise<void> | null = null;
const noRetry = new Set(['/auth/refresh', '/auth/login', '/auth/signup', '/auth/logout']);

/** On 401 (expired access token) refresh once and retry the original request (spec §1.2). */
function attachRefreshRetry(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (r) => r,
    async (error: AxiosError<ApiError>) => {
      const original = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
      const url = original?.url ?? '';
      if (error.response?.status !== 401 || !original || original._retry || noRetry.has(url)) {
        return Promise.reject(error);
      }
      original._retry = true;
      try {
        refreshing ??= api.post('/auth/refresh').then(() => undefined).finally(() => { refreshing = null; });
        await refreshing;
        return instance(original);
      } catch {
        return Promise.reject(error);
      }
    },
  );
}
attachRefreshRetry(api);
attachRefreshRetry(uploadApi);

export class RequestError extends Error {
  constructor(message: string, public status: number, public errors?: Record<string, string>) {
    super(message);
  }
}

/** Unwraps the `{ success, data }` envelope or throws a RequestError with the server message. */
function unwrap<T>(res: AxiosResponse<ApiResponse<T>>): T {
  if (!res.data.success) throw new RequestError(res.data.message, res.status, res.data.errors);
  return res.data.data;
}

function toRequestError(e: unknown): RequestError {
  if (e instanceof RequestError) return e;
  const err = e as AxiosError<ApiError>;
  const body = err.response?.data;
  return new RequestError(body?.message ?? (err.code === 'ERR_NETWORK' ? 'Cannot reach the server' : err.message), err.response?.status ?? 0, body?.errors);
}

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    return unwrap<T>(await api.request<ApiResponse<T>>(config));
  } catch (e) {
    throw toRequestError(e);
  }
}

export const get = <T>(url: string, params?: Record<string, unknown>) => request<T>({ method: 'GET', url, params });
export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => request<T>({ method: 'POST', url, data, ...config });
export const put = <T>(url: string, data?: unknown) => request<T>({ method: 'PUT', url, data });
export const patch = <T>(url: string, data?: unknown) => request<T>({ method: 'PATCH', url, data });
export const del = <T>(url: string) => request<T>({ method: 'DELETE', url });

/**
 * Multipart POST that may bypass the /api proxy (see UPLOADS_BASE above).
 * The Content-Type header is left to the browser so the multipart boundary is set.
 */
export async function postForm<T>(url: string, fd: FormData): Promise<T> {
  try {
    return unwrap<T>(await uploadApi.post<ApiResponse<T>>(url, fd));
  } catch (e) {
    throw toRequestError(e);
  }
}
