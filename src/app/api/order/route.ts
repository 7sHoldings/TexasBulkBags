import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LineItem = { sku: string; name: string; qty: number; priceFrom: number };

type OrderPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  shippingAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
  poNumber?: string;
  deliveryDate?: string;
  notes?: string;
  website?: string; // honeypot
  lineItems?: LineItem[];
};

function reference(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TBB-${stamp}-${rand}`;
}

export async function POST(request: Request) {
  let payload: OrderPayload;
  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true, reference: reference() });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const items = payload.lineItems ?? [];

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (items.length === 0) {
    return NextResponse.json(
      { error: "Your order has no items." },
      { status: 400 },
    );
  }

  const ref = reference();
  const estimate = items.reduce((sum, i) => sum + i.priceFrom * i.qty, 0);

  const lines = items
    .map((i) => `  • ${i.qty} × ${i.name} (${i.sku}) @ $${i.priceFrom.toFixed(2)}`)
    .join("\n");

  const text = [
    `Order reference: ${ref}`,
    `Estimated total: $${estimate.toFixed(2)}`,
    "",
    "Contact",
    `  Name: ${name}`,
    `  Company: ${payload.company ?? "—"}`,
    `  Email: ${email}`,
    `  Phone: ${payload.phone ?? "—"}`,
    "",
    "Ship to",
    `  ${payload.shippingAddress ?? "—"}`,
    `  ${payload.city ?? ""} ${payload.state ?? ""} ${payload.zip ?? ""}`.trim(),
    `  PO #: ${payload.poNumber ?? "—"}`,
    `  Requested delivery: ${payload.deliveryDate ?? "—"}`,
    "",
    "Items",
    lines,
    "",
    `Notes: ${payload.notes ?? "—"}`,
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  console.info(`[order] New order ${ref}:\n${text}`);
  await sendLeadEmail({
    subject: `New order request ${ref} — ${name}`,
    text,
    replyTo: email,
  });

  return NextResponse.json({ ok: true, reference: ref });
}
