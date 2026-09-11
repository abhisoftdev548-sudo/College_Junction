import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Lightweight CSRF mitigation for SameSite=None cookies (spec §1.2):
 * browsers cannot attach custom headers cross-site without a CORS preflight,
 * and our CORS only allows the configured client origins.
 */
export function csrfHeaderCheck(req: Request, _res: Response, next: NextFunction) {
  if (SAFE_METHODS.has(req.method)) return next();
  const header = req.get('X-Requested-With');
  if (header !== 'XMLHttpRequest') {
    return next(ApiError.forbidden('Missing X-Requested-With header'));
  }
  next();
}
