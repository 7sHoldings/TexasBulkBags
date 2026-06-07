import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type QuotePayload = {
  name?: string;
  email?: string;
  // Honeypot — should always be empty for real users.
  website?: string;
  [key: string]: unknown;
};

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

  const lead = {
    ...payload,
    name,
    email,
    receivedAt: new Date().toISOString(),
  };

  // TODO: deliver to info@texasbulkbags.com via an email/CRM provider
  // (e.g. Resend, SendGrid, or HubSpot). Wire the API key via env vars and
  // replace this log. The submission is captured in server output for now.
  console.info("[quote] New lead:", JSON.stringify(lead, null, 2));

  return NextResponse.json({ ok: true });
}
