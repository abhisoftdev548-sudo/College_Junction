import { Schema, model, type HydratedDocument, type Model, type Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { USERNAME_REGEX } from '@college-junction/types';

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  isEmailVerified: boolean;
  isProfileComplete: boolean;
  isRestricted: boolean;
  fullName?: string;
  college?: string;
  course?: string;
  branch?: string;
  year?: string;
  semester?: string;
  session?: string;
  /** Incremented on password reset to invalidate outstanding email tokens. */
  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

type UserModel = Model<IUser, object, UserMethods>;
export type UserDoc = HydratedDocument<IUser, UserMethods>;

const userSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    username: { type: String, required: true, trim: true, match: [USERNAME_REGEX, 'Invalid username'] },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    isEmailVerified: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },
    isRestricted: { type: Boolean, default: false },
    fullName: { type: String, trim: true },
    college: { type: String, trim: true },
    course: { type: String, trim: true },
    branch: { type: String, trim: true },
    year: { type: String, trim: true },
    semester: { type: String, trim: true },
    session: { type: String, trim: true },
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Case-insensitive uniqueness for username lookups.
userSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.method('comparePassword', function (this: UserDoc, candidate: string) {
  return bcrypt.compare(candidate, this.password);
});

export const User = model<IUser, UserModel>('User', userSchema);
