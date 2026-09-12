import nodemailer, { type Transporter } from 'nodemailer';
import { env, smtpConfigured } from '../config/env';

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!smtpConfigured) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE ?? env.SMTP_PORT === 465,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
      // Fail fast instead of hanging the request / startup check on a dead mail server.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

function withTimeout<T>(p: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    p.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}

/**
 * Startup check: opens (and closes) a real SMTP connection so misconfiguration
 * shows up in the boot logs instead of surfacing later as per-request failures.
 * Never throws — the API still boots; failed sends are logged when they happen.
 */
export async function verifySmtp(): Promise<{ ok: boolean; detail: string }> {
  const t = getTransporter();
  if (!t) return { ok: true, detail: 'not configured (emails are logged to the console)' };
  try {
    await withTimeout(t.verify(), 8_000, `no response from ${env.SMTP_HOST}:${env.SMTP_PORT} within 8s`);
    return { ok: true, detail: `connected to ${env.SMTP_HOST}:${env.SMTP_PORT}${env.SMTP_USER ? ` as ${env.SMTP_USER}` : ''}` };
  } catch (e) {
    return { ok: false, detail: (e as Error).message };
  }
}

interface Mail { to: string; subject: string; html: string; text: string }

async function send(mail: Mail): Promise<void> {
  const t = getTransporter();
  if (!t) {
    // Dev fallback: no SMTP configured → log the email so links are usable locally.
    const line = '─'.repeat(74);
    console.log(`\n${line}\n📧 [email:dev] SMTP not configured — printing instead of sending\n  To:      ${mail.to}\n  Subject: ${mail.subject}\n${line}\n${mail.text}\n${line}\n`);
    return;
  }
  try {
    const info = await t.sendMail({ from: env.EMAIL_FROM, ...mail });
    console.log(`📧 Email sent: "${mail.subject}" → ${mail.to} (id ${info.messageId})`);
  } catch (e) {
    console.error(`📧 Email FAILED: "${mail.subject}" → ${mail.to} — ${(e as Error).message}`);
    throw e;
  }
}

const layout = (title: string, body: string, cta: { href: string; label: string }) => `
<div style="font-family:Inter,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#ffffff;color:#0f172a">
  <h2 style="color:#059669;margin:0 0 16px">College Junction</h2>
  <h3 style="margin:0 0 12px">${title}</h3>
  <p style="line-height:1.6;color:#334155">${body}</p>
  <p style="margin:24px 0"><a href="${cta.href}" style="background:#059669;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block">${cta.label}</a></p>
  <p style="font-size:12px;color:#64748b">If the button doesn't work, paste this link in your browser:<br/>${cta.href}</p>
</div>`;

export async function sendVerificationEmail(to: string, username: string, token: string): Promise<void> {
  const href = `${env.CLIENT_URL}/auth/verify-email?token=${encodeURIComponent(token)}`;
  await send({
    to,
    subject: 'Verify your College Junction email',
    text: `Hi ${username}, verify your email: ${href} (valid 24h)`,
    html: layout('Verify your email', `Hi <b>${username}</b>, welcome aboard! Confirm your email to start sharing notes and problems. This link is valid for 24 hours.`, { href, label: 'Verify email' }),
  });
}

export async function sendPasswordResetEmail(to: string, username: string, token: string): Promise<void> {
  const href = `${env.CLIENT_URL}/auth/reset-password?token=${encodeURIComponent(token)}`;
  await send({
    to,
    subject: 'Reset your College Junction password',
    text: `Hi ${username}, reset your password: ${href} (valid 30 minutes). If you didn't request this, ignore this email.`,
    html: layout('Reset your password', `Hi <b>${username}</b>, we received a request to reset your password. This link is valid for 30 minutes. If you didn't request this, you can safely ignore it.`, { href, label: 'Reset password' }),
  });
}
