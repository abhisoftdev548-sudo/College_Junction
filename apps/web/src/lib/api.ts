import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from '@college-junction/types';

/** Single axios instance used everywhere (spec §1.1): credentials + CSRF header. */
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api`,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 20_000,
});

let refreshing: Promise<void> | null = null;
const noRetry = new Set(['/auth/refresh', '/auth/login', '/auth/signup', '/auth/logout']);

/** On 401 (expired access token) refresh once and retry the original request (spec §1.2). */
api.interceptors.response.use(
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
      return api(original);
    } catch {
      return Promise.reject(error);
    }
  },
);

export class RequestError extends Error {
  constructor(message: string, public status: number, public errors?: Record<string, string>) {
    super(message);
  }
}

/** Unwraps the `{ success, data }` envelope or throws a RequestError with the server message. */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const res = await api.request<ApiResponse<T>>(config);
    if (!res.data.success) throw new RequestError(res.data.message, res.status, res.data.errors);
    return res.data.data;
  } catch (e) {
    if (e instanceof RequestError) throw e;
    const err = e as AxiosError<ApiError>;
    const body = err.response?.data;
    throw new RequestError(body?.message ?? (err.code === 'ERR_NETWORK' ? 'Cannot reach the server' : err.message), err.response?.status ?? 0, body?.errors);
  }
}

export const get = <T>(url: string, params?: Record<string, unknown>) => request<T>({ method: 'GET', url, params });
export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => request<T>({ method: 'POST', url, data, ...config });
export const put = <T>(url: string, data?: unknown) => request<T>({ method: 'PUT', url, data });
export const patch = <T>(url: string, data?: unknown) => request<T>({ method: 'PATCH', url, data });
export const del = <T>(url: string) => request<T>({ method: 'DELETE', url });
