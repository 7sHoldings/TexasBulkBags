import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type QuotePayload = {
  name?: string;
  email?: string;
  // Honeypot — should always be empty for real users.
  website?: string;
  [key: string]: unknown;
};

function formatLead(lead: Record<string, unknown>): string {
  return Object.entries(lead)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
      const printed =
        value && typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : String(value ?? "—");
      return `${label}: ${printed}`;
    })
    .join("\n");
}

export async function POST(request: Request) {
  let payload: QuotePayload;

  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Spam honeypot: silently accept but drop.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  const { website: _omit, ...rest } = payload;
  void _omit;
  const lead = { ...rest, name, email, receivedAt: new Date().toISOString() };
  const kind = String(payload.type ?? "quote");

  const text = formatLead(lead);
  console.info(`[quote] New ${kind} lead:\n${text}`);
  await sendLeadEmail({
    subject: `New ${kind} request — ${name}`,
    text,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
