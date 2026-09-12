import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { env, allowedOrigins, cookieSecure, cookieSameSite, cloudinaryConfigured, smtpConfigured } from './config/env';
import { ensureAdminFromEnv } from './services/admin.bootstrap';
import { verifySmtp } from './services/email.service';
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
    console.log(`   Cookies: secure=${cookieSecure} sameSite=${cookieSameSite}${env.COOKIE_DOMAIN ? ` domain=${env.COOKIE_DOMAIN}` : ''}`);
    console.log(`   Cloudinary: ${cloudinaryConfigured ? 'configured' : 'NOT configured (uploads disabled)'}`);
    console.log(`   SMTP: ${smtpConfigured ? 'configured — checking connection…' : 'NOT configured (emails logged to console)'}`);
  });
  startOrphanCleanupJob();

  // Startup check: verify the SMTP connection in the background so a slow or
  // unreachable mail server can't delay boot. Misconfig is loud in the logs but
  // non-fatal — email failures are then reported per-send.
  if (smtpConfigured) {
    void verifySmtp().then((r) => {
      console.log(r.ok
        ? `   SMTP: ✅ ${r.detail}`
        : `   SMTP: ⚠️  ${r.detail} — email sends will fail until this is fixed`);
    });
  }

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
