import { signupSchema } from '@college-junction/types';
import { User } from '../models/User';

/**
 * Ensure an admin exists from env (ADMIN_USERNAME / ADMIN_EMAIL / ADMIN_PASSWORD).
 * Used by the seed script and by server startup when BOOTSTRAP_ADMIN=true.
 * No public admin signup route exists (spec §1.3).
 */
export async function ensureAdminFromEnv(): Promise<'created' | 'promoted' | 'skipped'> {
  const parsed = signupSchema.safeParse({
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });
  if (!parsed.success) {
    throw new Error(`Invalid ADMIN_* env vars: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`);
  }
  const { username, email, password } = parsed.data;
  const existing = await User.findOne({ $or: [{ email }, { username }] }).collation({ locale: 'en', strength: 2 });
  if (existing) {
    if (existing.role === 'admin') return 'skipped';
    existing.role = 'admin';
    existing.isEmailVerified = true;
    await existing.save();
    return 'promoted';
  }
  await User.create({
    username, email, password, role: 'admin', isEmailVerified: true, isProfileComplete: true,
    fullName: 'Administrator', college: 'College Junction', course: 'N/A', branch: 'N/A', year: 'N/A', semester: 'N/A', session: 'N/A',
  });
  return 'created';
}
