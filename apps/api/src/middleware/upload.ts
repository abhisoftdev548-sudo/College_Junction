import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import FileType from 'file-type';
import { ApiError } from '../utils/ApiError';

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB (spec §1.9)
export const ALLOWED_MIME = new Set(['application/pdf', 'image/png', 'image/jpeg', 'image/webp']);

const storage = multer.memoryStorage();

export const uploadSingle = multer({
  storage,
  limits: { fileSize: MAX_FILE_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    // First-pass filter on the declared mimetype; real check is done on the buffer below.
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new ApiError(400, 'Unsupported file type. Allowed: PDF, PNG, JPEG, WEBP'));
    }
    cb(null, true);
  },
}).single('file');

/** Wraps multer so its errors go through our standard error envelope. */
export function handleUpload(req: Request, res: Response, next: NextFunction) {
  uploadSingle(req, res, (err: unknown) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') return next(ApiError.badRequest('File too large. Max size is 10MB'));
      return next(ApiError.badRequest(`Upload error: ${err.message}`));
    }
    next(err);
  });
}

/**
 * Sniffs the magic bytes of the uploaded buffer — never trust extension or declared mimetype (spec §1.9).
 * Sets req.detectedMime for the controller.
 */
export async function verifyFileMagic(req: Request, _res: Response, next: NextFunction) {
  try {
    if (!req.file) return next();
    const detected = await FileType.fromBuffer(req.file.buffer);
    const mime = detected?.mime;
    if (!mime || !ALLOWED_MIME.has(mime)) {
      throw ApiError.badRequest('File content does not match an allowed type (PDF, PNG, JPEG, WEBP)');
    }
    // Normalise declared mimetype to what we actually detected.
    req.file.mimetype = mime;
    next();
  } catch (e) {
    next(e);
  }
}
