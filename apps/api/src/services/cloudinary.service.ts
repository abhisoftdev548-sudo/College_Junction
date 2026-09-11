import { cloudinary, cloudinaryConfigured } from '../config/cloudinary';
import { ApiError } from '../utils/ApiError';
import { MAX_FILE_BYTES } from '../middleware/upload';
import type { PostType, FileType } from '@college-junction/types';

export interface UploadedAsset { url: string; publicId: string; resourceType: string; fileType: FileType }

export function fileTypeFromMime(mime: string): FileType {
  return mime === 'application/pdf' ? 'pdf' : 'image';
}

export async function uploadPostFile(buffer: Buffer, mime: string, postType: PostType): Promise<UploadedAsset> {
  if (!cloudinaryConfigured) {
    throw new ApiError(503, 'File uploads are not configured on this server (missing Cloudinary credentials)');
  }
  if (buffer.length > MAX_FILE_BYTES) throw ApiError.badRequest('File too large. Max size is 10MB');

  const folder = `college-junction/${postType === 'notes' ? 'notes' : 'problems'}`;
  const fileType = fileTypeFromMime(mime);

  const result = await new Promise<{ secure_url: string; public_id: string; resource_type: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        // PDFs must be delivered as raw/image; 'auto' picks image for pdf (page rendering) which is fine for preview.
        use_filename: false,
        unique_filename: true,
        overwrite: false,
      },
      (err, res) => (err || !res ? reject(err ?? new Error('Upload failed')) : resolve(res)),
    );
    stream.end(buffer);
  });

  return { url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type, fileType };
}

export async function deleteAsset(publicId: string, resourceType = 'image'): Promise<void> {
  if (!cloudinaryConfigured) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
  } catch (e) {
    console.error(`Cloudinary delete failed for ${publicId}:`, (e as Error).message);
  }
}
