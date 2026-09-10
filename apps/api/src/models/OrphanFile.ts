import { Schema, model } from 'mongoose';

/**
 * Queue of Cloudinary assets whose parent post may be gone.
 * Mongo TTL deletion doesn't fire hooks, so when an admin sets a timer we
 * enqueue the file here and a cron reconciles it after deleteAt (spec §1.4).
 */
const orphanFileSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, required: true, index: true },
    publicId: { type: String, required: true },
    resourceType: { type: String, default: 'image' },
    /** Earliest time the cron may check/cleanup this asset. */
    checkAfter: { type: Date, required: true, index: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true },
);

orphanFileSchema.index({ post: 1, publicId: 1 }, { unique: true });

export const OrphanFile = model('OrphanFile', orphanFileSchema);
