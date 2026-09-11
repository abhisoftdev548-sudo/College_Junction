import type { Response } from 'express';
import type { ApiSuccess, ApiError as ApiErrorShape } from '@college-junction/types';

/** Single place that produces the standard envelope (spec §1.15). */
export function sendSuccess<T>(res: Response, data: T, message = 'OK', status = 200): Response {
  const body: ApiSuccess<T> = { success: true, message, data };
  return res.status(status).json(body);
}

export function sendError(res: Response, status: number, message: string, errors?: Record<string, string>): Response {
  const body: ApiErrorShape = { success: false, message, ...(errors ? { errors } : {}) };
  return res.status(status).json(body);
}
