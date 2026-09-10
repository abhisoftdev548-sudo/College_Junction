import cron, { type ScheduledTask } from 'node-cron';
import { OrphanFile } from '../models/OrphanFile';
import { Post } from '../models/Post';
import { deleteAsset } from '../services/cloudinary.service';
import { invalidateFilterCache } from '../services/filterCache.service';

/**
 * Every 10 minutes: for queued assets whose checkAfter has passed, if the parent
 * post no longer exists (TTL-deleted), remove the Cloudinary asset (spec §1.4).
 * Also purges comments left behind by TTL-deleted posts.
 */
export async function runOrphanCleanup(): Promise<{ checked: number; deleted: number }> {
  const due = await OrphanFile.find({ checkAfter: { $lte: new Date() }, attempts: { $lt: 5 } }).limit(100).lean();
  let deleted = 0;
  for (const item of due) {
    const stillExists = await Post.exists({ _id: item.post });
    if (stillExists) {
      // Post survived (timer was cleared between enqueue and now) — drop the queue entry.
      await OrphanFile.deleteOne({ _id: item._id });
      continue;
    }
    try {
      await deleteAsset(item.publicId, item.resourceType ?? 'image');
      await OrphanFile.deleteOne({ _id: item._id });
      deleted++;
    } catch {
      await OrphanFile.updateOne({ _id: item._id }, { $inc: { attempts: 1 } });
    }
  }
  if (due.length) invalidateFilterCache();
  return { checked: due.length, deleted };
}

/** Removes comments whose post was TTL-deleted. */
export async function purgeDanglingComments(): Promise<number> {
  const { Comment } = await import('../models/Comment');
  const postIds = await Comment.distinct('post');
  if (!postIds.length) return 0;
  const existing = new Set((await Post.find({ _id: { $in: postIds } }).select('_id').lean()).map((p) => String(p._id)));
  const dangling = postIds.filter((id) => !existing.has(String(id)));
  if (!dangling.length) return 0;
  const r = await Comment.deleteMany({ post: { $in: dangling } });
  return r.deletedCount;
}

let task: ScheduledTask | null = null;
export function startOrphanCleanupJob(): void {
  if (task) return;
  task = cron.schedule('*/10 * * * *', async () => {
    try {
      const r = await runOrphanCleanup();
      const purged = await purgeDanglingComments();
      if (r.checked || purged) console.log(`🧹 cleanup: checked=${r.checked} deletedAssets=${r.deleted} purgedComments=${purged}`);
    } catch (e) {
      console.error('cleanup job failed', e);
    }
  });
}
export function stopOrphanCleanupJob(): void {
  task?.stop();
  task = null;
}
