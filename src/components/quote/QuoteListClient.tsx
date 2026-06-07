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

  const estimate = items.reduce((sum, i) => sum + i.priceFrom * i.qty, 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd.entries()),
      type: "quote-list",
      lineItems: items.map((i) => ({
        sku: i.sku,
        name: i.name,
        qty: i.qty,
        priceFrom: i.priceFrom,
      })),
      estimate,
    };
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      clear();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  if (status === "success") {
    return (
      <div className="px-margin-mobile py-16 md:px-8">
        <div className="mx-auto max-w-xl border border-industrial-gray bg-white p-12 text-center hard-shadow">
          <div className="mx-auto flex h-16 w-16 items-center justify-center bg-secondary">
            <Icon name="check" className="text-4xl text-white" />
          </div>
          <h1 className="mt-6 font-display text-headline-lg uppercase text-primary">
            Quote Request Sent
          </h1>
          <p className="mt-3 text-body-md text-on-surface-variant">
            We&apos;ll get back to you with volume pricing within 24 business
            hours.
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
          Your Quote List
        </h1>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Add bags from the catalog, set quantities, and submit for a formal
          volume quote.
        </p>
      </div>

      {count === 0 ? (
        <div className="border border-industrial-gray bg-white p-12 text-center hard-shadow">
          <Icon name="shopping_cart" className="text-5xl text-outline" />
          <p className="mt-4 text-body-lg text-on-surface-variant">
            Your quote list is empty.
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
                  className="flex items-center gap-4 border-b border-industrial-gray p-4 last:border-b-0"
                >
                  <div className="flex-1">
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
              <Icon name="info" className="text-warning-amber text-base" />
              Listed prices are starting unit prices. Final volume pricing is
              confirmed in your quote.
            </p>
          </div>

          {/* Submit form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border border-industrial-gray bg-white p-6 hard-shadow"
          >
            <div className="flex items-center justify-between border-b border-industrial-gray pb-4">
              <span className="text-label-bold font-bold uppercase text-on-surface-variant">
                Estimated Total
              </span>
              <span className="font-display text-headline-md text-secondary">
                ${estimate.toFixed(2)}
              </span>
            </div>
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
            <textarea
              name="message"
              rows={3}
              placeholder="Delivery details or notes…"
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
              {status === "submitting" ? "Sending…" : "Request Volume Quote"}
              <Icon name="send" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
