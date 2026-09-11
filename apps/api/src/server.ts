import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { env, allowedOrigins, cookieSecure, cloudinaryConfigured, smtpConfigured } from './config/env';
import { ensureAdminFromEnv } from './services/admin.bootstrap';
import { startOrphanCleanupJob, stopOrphanCleanupJob } from './jobs/orphanCleanup';

async function main() {
  await connectDB();
  if (env.BOOTSTRAP_ADMIN) {
    const r = await ensureAdminFromEnv();
    console.log(`👑 Admin bootstrap (${process.env.ADMIN_USERNAME}): ${r}`);
  }
  const app = createApp();
  const server = app.listen(env.PORT, '0.0.0.0', () => {
    console.log(`🚀 API listening on http://0.0.0.0:${env.PORT} [${env.NODE_ENV}]`);
    console.log(`   CORS origins: ${allowedOrigins.join(', ')}`);
    console.log(`   Cookies: secure=${cookieSecure} sameSite=${cookieSecure ? 'none' : 'lax'}`);
    console.log(`   Cloudinary: ${cloudinaryConfigured ? 'configured' : 'NOT configured (uploads disabled)'}`);
    console.log(`   SMTP: ${smtpConfigured ? 'configured' : 'NOT configured (emails logged to console)'}`);
  });
  startOrphanCleanupJob();

  const shutdown = async (sig: string) => {
    console.log(`\n${sig} received, shutting down…`);
    stopOrphanCleanupJob();
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref(); // shutdown safety only — not scheduling
  };
  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

main().catch((e) => {
  console.error('Fatal startup error:', e);
  process.exit(1);
});
