import type { Request, Response, NextFunction } from 'express';
import type { ZodTypeAny } from 'zod';
import { ApiError } from '../utils/ApiError';

type Source = 'body' | 'query' | 'params';

/** Zod validation middleware — every route must use this before its controller (spec §1.10). */
export function validate(schema: ZodTypeAny, source: Source = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join('.') || source;
        if (!errors[key]) errors[key] = issue.message;
      }
      return next(ApiError.badRequest('Validation failed', errors));
    }
    // Express 4: req.query is a plain object we can replace; store parsed values.
    if (source === 'query') {
      (req as Request & { validatedQuery: unknown }).validatedQuery = result.data;
    } else {
      (req as Record<Source, unknown>)[source] = result.data;
    }
    next();
  };
}

export function getQuery<T>(req: Request): T {
  return ((req as Request & { validatedQuery?: T }).validatedQuery ?? req.query) as T;
}
