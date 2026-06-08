type SendArgs = {
  subject: string;
  /** Plain-text body. Rendered as <pre> in the HTML email. */
  text: string;
  /** Optional reply-to (e.g. the customer's email). */
  replyTo?: string;
};

/**
 * Sends a notification email to the company inbox.
 *
 * Transport priority:
 *   1. SMTP (e.g. Namecheap Private Email) when SMTP_HOST/USER/PASS are set.
 *   2. Resend REST API when RESEND_API_KEY is set.
 *   3. Otherwise the message is logged to the server so submissions are never
 *      silently lost before a provider is configured.
 *
 * See docs/EMAIL-SETUP.md for setup with Namecheap or Resend.
 */
export async function sendLeadEmail({
  subject,
  text,
  replyTo,
}: SendArgs): Promise<{ delivered: boolean }> {
  const to = process.env.LEAD_INBOX ?? "texasbulkbags@gmail.com";
  // LEAD_INBOX may be a comma-separated list of addresses.
  const recipients = to
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // 1) SMTP (Namecheap Private Email, Gmail, etc.)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendViaSmtp({ recipients, subject, text, replyTo });
  }

  // 2) Resend
  if (process.env.RESEND_API_KEY) {
    return sendViaResend({ recipients, subject, text, replyTo });
  }

  // 3) Fallback: log
  console.info(
    `[email] (not configured) → ${recipients.join(", ")}\nSubject: ${subject}\n${text}`,
  );
  return { delivered: false };
}

async function sendViaSmtp({
  recipients,
  subject,
  text,
  replyTo,
}: SendArgs & { recipients: string[] }): Promise<{ delivered: boolean }> {
  try {
    const nodemailer = (await import("nodemailer")).default;
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = SSL, 587 = STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Most SMTP hosts (incl. Namecheap) require From to be the authenticated mailbox.
    const from =
      process.env.EMAIL_FROM ??
      `Texas Bulk Bags <${process.env.SMTP_USER}>`;

    await transporter.sendMail({
      from,
      to: recipients,
      replyTo,
      subject,
      text,
      html: `<pre style="font-family:ui-monospace,monospace;font-size:14px;white-space:pre-wrap">${escapeHtml(
        text,
      )}</pre>`,
    });
    return { delivered: true };
  } catch (err) {
    console.error("[email] SMTP send failed:", err);
    return { delivered: false };
  }
}

async function sendViaResend({
  recipients,
  subject,
  text,
  replyTo,
}: SendArgs & { recipients: string[] }): Promise<{ delivered: boolean }> {
  const from =
    process.env.EMAIL_FROM ?? "Texas Bulk Bags <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject,
        reply_to: replyTo,
        html: `<pre style="font-family:ui-monospace,monospace;font-size:14px;white-space:pre-wrap">${escapeHtml(
          text,
        )}</pre>`,
      }),
    });
    if (!res.ok) {
      console.error(`[email] Resend error ${res.status}: ${await res.text()}`);
      return { delivered: false };
    }
    return { delivered: true };
  } catch (err) {
    console.error("[email] Resend send failed:", err);
    return { delivered: false };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
