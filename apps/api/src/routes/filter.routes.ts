import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { filterOptions } from '../controllers/filter.controller';

const r = Router();
r.get('/options', asyncHandler(filterOptions));
export default r;
