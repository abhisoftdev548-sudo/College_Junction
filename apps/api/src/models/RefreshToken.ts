import { Schema, model, Types } from 'mongoose';

const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    family: { type: String, required: true, index: true },
    revoked: { type: Boolean, default: false },
    /** Set when this token was rotated — presenting it again = reuse. */
    replacedBy: { type: String, default: null },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String },
    ip: { type: String },
  },
  { timestamps: true },
);

// TTL: Mongo purges expired refresh tokens automatically.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export interface RefreshTokenDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  tokenHash: string;
  family: string;
  revoked: boolean;
  replacedBy: string | null;
  expiresAt: Date;
}

export const RefreshToken = model('RefreshToken', refreshTokenSchema);
