import { site } from "@/lib/site";

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
 * Uses Resend's REST API when RESEND_API_KEY is configured (no SDK dependency).
 * When it isn't set, the message is logged to the server so submissions are
 * never silently lost in development or before the provider is wired up.
 */
export async function sendLeadEmail({
  subject,
  text,
  replyTo,
}: SendArgs): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_INBOX ?? site.email;
  const from = process.env.EMAIL_FROM ?? "Texas Bulk Bags <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(`[email] (not configured) → ${to}\nSubject: ${subject}\n${text}`);
    return { delivered: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        reply_to: replyTo,
        html: `<pre style="font-family:ui-monospace,monospace;font-size:14px;white-space:pre-wrap">${escapeHtml(
          text,
        )}</pre>`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[email] Resend error ${res.status}: ${body}`);
      return { delivered: false };
    }
    return { delivered: true };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { delivered: false };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
