import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const commentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    text: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

commentSchema.index({ post: 1, _id: 1 });

export type CommentSchemaType = InferSchemaType<typeof commentSchema>;
export type CommentDoc = HydratedDocument<CommentSchemaType>;
export const Comment = model('Comment', commentSchema);
