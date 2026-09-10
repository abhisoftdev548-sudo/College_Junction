import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { sendError } from '../utils/response';
import { isProd } from '../config/env';

export function notFoundHandler(req: Request, res: Response) {
  sendError(res, 404, `Route ${req.method} ${req.originalUrl} not found`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return sendError(res, err.statusCode, err.message, err.errors);
  }

  // Mongo duplicate key
  if (typeof err === 'object' && err && (err as { code?: number }).code === 11000) {
    const keyValue = (err as { keyValue?: Record<string, unknown> }).keyValue ?? {};
    const field = Object.keys(keyValue)[0] ?? 'field';
    return sendError(res, 409, `${field} already in use`, { [field]: `This ${field} is already taken` });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string> = {};
    for (const [k, v] of Object.entries(err.errors)) errors[k] = v.message;
    return sendError(res, 400, 'Validation failed', errors);
  }

  if (err instanceof mongoose.Error.CastError) {
    return sendError(res, 400, 'Invalid identifier');
  }

  // CORS rejection
  if (err instanceof Error && err.message.startsWith('CORS:')) {
    return sendError(res, 403, err.message);
  }

  // body-parser JSON errors
  if (typeof err === 'object' && err && (err as { type?: string }).type === 'entity.parse.failed') {
    return sendError(res, 400, 'Malformed JSON body');
  }

  console.error('Unhandled error:', err);
  return sendError(res, 500, isProd ? 'Internal server error' : (err as Error)?.message ?? 'Internal server error');
}
