/**
 * Seed (or promote) an admin account against MONGODB_URI.
 * Usage:  ADMIN_USERNAME=admin ADMIN_EMAIL=admin@x.com ADMIN_PASSWORD='Passw0rd!' npm run seed:admin
 * (For the in-memory dev DB, set BOOTSTRAP_ADMIN=true + the same vars in .env instead — the server seeds on boot.)
 */
import { connectDB, disconnectDB } from '../config/db';
import { ensureAdminFromEnv } from '../services/admin.bootstrap';

async function main() {
  await connectDB();
  const result = await ensureAdminFromEnv();
  console.log(`✅ Admin "${process.env.ADMIN_USERNAME}": ${result}`);
  await disconnectDB();
}
main().catch((e) => { console.error(e); process.exit(1); });
