import { NextResponse } from "next/server";

type QuotePayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  product?: string;
  quantity?: string;
  timeline?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: QuotePayload;

  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  // TODO: integrate with email/CRM (e.g. Resend, SendGrid, HubSpot).
  // For now we log the lead so it is captured in server output.
  console.info("New quote request:", {
    name,
    email,
    company: payload.company?.trim() || null,
    phone: payload.phone?.trim() || null,
    product: payload.product?.trim() || null,
    quantity: payload.quantity?.trim() || null,
    timeline: payload.timeline?.trim() || null,
    message: payload.message?.trim() || null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
