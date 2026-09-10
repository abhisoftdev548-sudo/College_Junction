import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const authorSnapshotSchema = new Schema(
  {
    username: { type: String, required: true },
    fullName: String,
    college: String,
    course: String,
    branch: String,
    year: String,
    session: String,
  },
  { _id: false },
);

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    /** Immutable academic snapshot copied at creation (spec §1.6). */
    authorSnapshot: { type: authorSnapshotSchema, required: true, immutable: true },
    type: { type: String, enum: ['problem', 'notes'], required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, required: true, maxlength: 5000 },
    fileUrl: { type: String, default: null },
    filePublicId: { type: String, default: null },
    fileResourceType: { type: String, default: null }, // cloudinary resource_type for deletion
    fileType: { type: String, enum: ['pdf', 'image', null], default: null },
    externalLinks: { type: [String], default: [] },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    savedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    commentsCount: { type: Number, default: 0, min: 0 },
    /** Auto-deletion via TTL index (spec §1.4). null = never. */
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// TTL index — docs are removed when deleteAt is reached. Docs with null deleteAt are ignored by Mongo TTL.
postSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });
// Filters query the snapshot (spec §1.8).
postSchema.index({
  'authorSnapshot.course': 1,
  'authorSnapshot.branch': 1,
  'authorSnapshot.year': 1,
  'authorSnapshot.session': 1,
});
postSchema.index({ createdAt: -1, _id: -1 });
postSchema.index({ title: 'text', description: 'text' });
postSchema.index({ likedBy: 1 });
postSchema.index({ savedBy: 1 });

export type PostSchemaType = InferSchemaType<typeof postSchema>;
export type PostDoc = HydratedDocument<PostSchemaType>;
export const Post = model('Post', postSchema);
