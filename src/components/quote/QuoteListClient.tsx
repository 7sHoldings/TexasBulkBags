"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-industrial-gray bg-white px-3 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export function QuoteListClient() {
  const { items, setQty, remove, clear, count } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const estimate = items.reduce((sum, i) => sum + i.priceFrom * i.qty, 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd.entries()),
      lineItems: items.map((i) => ({
        sku: i.sku,
        name: i.name,
        qty: i.qty,
        priceFrom: i.priceFrom,
      })),
    };
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setReference(body?.reference ?? null);
      clear();
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  if (status === "success") {
    return (
      <div className="px-margin-mobile py-16 md:px-8">
        <div className="mx-auto max-w-xl border border-industrial-gray bg-white p-8 text-center hard-shadow sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center bg-secondary">
            <Icon name="check" className="text-4xl text-white" />
          </div>
          <h1 className="mt-6 font-display text-headline-lg uppercase text-primary">
            Order Request Received
          </h1>
          {reference && (
            <p className="mt-4 inline-block border border-industrial-gray bg-surface-container-low px-4 py-2 font-sans text-mono-spec text-primary">
              Reference: <strong>{reference}</strong>
            </p>
          )}
          <p className="mt-4 text-body-md text-on-surface-variant">
            Our team will confirm availability, freight, and volume pricing — then
            send a formal order confirmation within 24 business hours. Keep your
            reference number for follow-up.
          </p>
          <ButtonLink href="/products" className="mt-6">
            Continue Browsing
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <div className="mb-8 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Your Order Request
        </h1>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Review your bags, add shipping details, and submit. We confirm pricing
          and freight before anything is finalized — no payment is taken online.
        </p>
      </div>

      {count === 0 ? (
        <div className="border border-industrial-gray bg-white p-12 text-center hard-shadow">
          <Icon name="shopping_cart" className="text-5xl text-outline" />
          <p className="mt-4 text-body-lg text-on-surface-variant">
            Your order request is empty.
          </p>
          <ButtonLink href="/products" className="mt-4">
            Browse Catalog
          </ButtonLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="border border-industrial-gray bg-white">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex flex-wrap items-center gap-4 border-b border-industrial-gray p-4 last:border-b-0"
                >
                  <div className="min-w-40 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-display text-headline-sm uppercase text-primary hover:text-secondary"
                    >
                      {item.name}
                    </Link>
                    <p className="font-sans text-mono-spec text-on-surface-variant">
                      {item.sku} · ${item.priceFrom.toFixed(2)}/ea
                    </p>
                  </div>
                  <div className="flex items-center border border-industrial-gray">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => setQty(item.slug, item.qty - 10)}
                      className="px-3 py-2 hover:bg-surface-container-low"
                    >
                      <Icon name="remove" className="text-base" />
                    </button>
                    <input
                      type="number"
                      value={item.qty}
                      min={1}
                      onChange={(e) => setQty(item.slug, Number(e.target.value))}
                      className="w-14 border-x border-industrial-gray py-2 text-center font-sans text-mono-spec outline-none"
                      aria-label={`Quantity for ${item.name}`}
                    />
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => setQty(item.slug, item.qty + 10)}
                      className="px-3 py-2 hover:bg-surface-container-low"
                    >
                      <Icon name="add" className="text-base" />
                    </button>
                  </div>
                  <div className="w-24 text-right font-display text-headline-sm text-primary">
                    ${(item.priceFrom * item.qty).toFixed(2)}
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => remove(item.slug)}
                    className="text-outline hover:text-secondary"
                  >
                    <Icon name="delete" />
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-2 text-body-sm text-on-surface-variant">
              <Icon name="info" className="text-base text-warning-amber" />
              Listed prices are starting unit prices. Final volume and freight
              pricing is confirmed in your order.
            </p>
          </div>

          {/* Order details form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border border-industrial-gray bg-white p-6 hard-shadow"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between border-b border-industrial-gray pb-4">
              <span className="text-label-bold font-bold uppercase text-on-surface-variant">
                Estimated Total
              </span>
              <span className="font-display text-headline-md text-secondary">
                ${estimate.toFixed(2)}
              </span>
            </div>

            <h2 className="text-label-bold font-bold uppercase text-primary">
              Contact
            </h2>
            <input name="name" required placeholder="Full name *" className={inputClass} />
            <input name="company" placeholder="Company" className={inputClass} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email *"
              className={inputClass}
            />
            <input name="phone" type="tel" placeholder="Phone" className={inputClass} />

            <h2 className="pt-2 text-label-bold font-bold uppercase text-primary">
              Shipping
            </h2>
            <input
              name="shippingAddress"
              placeholder="Street address"
              className={inputClass}
            />
            <div className="grid grid-cols-3 gap-2">
              <input name="city" placeholder="City" className={inputClass} />
              <input name="state" placeholder="State" className={inputClass} />
              <input name="zip" placeholder="ZIP" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-on-surface-variant">
                  PO Number
                </label>
                <input name="poNumber" placeholder="Optional" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-on-surface-variant">
                  Needed By
                </label>
                <input name="deliveryDate" type="date" className={inputClass} />
              </div>
            </div>
            <textarea
              name="notes"
              rows={2}
              placeholder="Delivery notes (dock, liftgate, etc.)"
              className={inputClass}
            />

            {error && (
              <p className="text-body-sm text-error-red" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 bg-secondary py-4 font-display text-label-bold uppercase tracking-widest text-on-secondary hover:bg-secondary-container disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit Order Request"}
              <Icon name="send" />
            </button>
            <p className="text-center text-body-sm text-on-surface-variant">
              No payment is taken now. We confirm pricing &amp; freight first.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
