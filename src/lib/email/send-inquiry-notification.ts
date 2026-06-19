import nodemailer from "nodemailer";

type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
};

function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.NOTIFY_EMAIL,
  );
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendInquiryNotification(inquiry: InquiryPayload): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn("[email] SMTP not configured — skipping inquiry notification");
    return false;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const to = process.env.NOTIFY_EMAIL!;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #a51e22;">New Contact Inquiry — NEBCO</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${escapeHtml(inquiry.name)}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a></td></tr>
        ${inquiry.phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${escapeHtml(inquiry.phone)}</td></tr>` : ""}
        ${inquiry.organization ? `<tr><td style="padding: 8px 0; color: #666;">Organization</td><td style="padding: 8px 0;">${escapeHtml(inquiry.organization)}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #666;">Subject</td><td style="padding: 8px 0;">${escapeHtml(inquiry.subject)}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
        <p style="margin: 0 0 8px; color: #666; font-size: 12px; text-transform: uppercase;">Message</p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(inquiry.message)}</p>
      </div>
      <p style="margin-top: 24px; font-size: 13px; color: #888;">
        <a href="${siteUrl}/admin/inquiries" style="color: #a51e22;">View in Admin Panel →</a>
      </p>
    </div>
  `;

  try {
    await createTransporter().sendMail({
      from: `"NEBCO Website" <${from}>`,
      to,
      replyTo: inquiry.email,
      subject: `[NEBCO Inquiry] ${inquiry.subject} — ${inquiry.name}`,
      html,
      text: [
        `New inquiry from ${inquiry.name}`,
        `Email: ${inquiry.email}`,
        inquiry.phone ? `Phone: ${inquiry.phone}` : "",
        inquiry.organization ? `Organization: ${inquiry.organization}` : "",
        `Subject: ${inquiry.subject}`,
        "",
        inquiry.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return true;
  } catch (err) {
    console.error("[email] Failed to send inquiry notification:", err);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
