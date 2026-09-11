import type { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { getFilterOptions } from '../services/filterCache.service';

export async function filterOptions(_req: Request, res: Response) {
  const options = await getFilterOptions();
  return sendSuccess(res, options);
}
