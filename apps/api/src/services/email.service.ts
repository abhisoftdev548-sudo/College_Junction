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
    });
  }
  return transporter;
}

interface Mail { to: string; subject: string; html: string; text: string }

async function send(mail: Mail): Promise<void> {
  const t = getTransporter();
  if (!t) {
    // Dev fallback: no SMTP configured → log the email so links are usable locally.
    console.log(`\n📧 [email:dev] To: ${mail.to}\nSubject: ${mail.subject}\n${mail.text}\n`);
    return;
  }
  await t.sendMail({ from: env.EMAIL_FROM, ...mail });
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
