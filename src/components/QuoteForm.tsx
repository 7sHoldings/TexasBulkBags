"use client";

import { useState } from "react";
import { products, site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

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

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  return (
    <section id="quote" className="scroll-mt-20 bg-ink-900 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Request a quote
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Tell us what you need and our team will get back to you within one
            business day with pricing and availability.
          </p>
          <ul className="mt-8 space-y-3 text-white/80">
            <li>
              <span className="font-semibold text-white">Call: </span>
              <a href={site.phoneHref} className="hover:text-brand-200">
                {site.phone}
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">Email: </span>
              <a href={site.emailHref} className="hover:text-brand-200">
                {site.email}
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">Hours: </span>
              {site.hours}
            </li>
          </ul>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-start justify-center rounded-xl bg-white/5 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Thanks — we got it.</h3>
            <p className="mt-2 text-white/80">
              A member of our team will reach out shortly with your quote.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-md border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-white/5 p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Company" name="company" />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
            </div>

            <div className="mt-4">
              <label
                htmlFor="product"
                className="mb-1.5 block text-sm font-medium text-white/90"
              >
                Product of interest
              </label>
              <select
                id="product"
                name="product"
                defaultValue=""
                className="w-full rounded-md border border-white/15 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-400"
              >
                <option value="" disabled>
                  Select a product…
                </option>
                {products.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Not sure / other">Not sure / other</option>
              </select>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Estimated quantity"
                name="quantity"
                placeholder="e.g. 500 bags"
              />
              <Field
                label="Needed by"
                name="timeline"
                placeholder="e.g. within 2 weeks"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-white/90"
              >
                Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Material, dimensions, safe working load, liner needs, printing…"
                className="w-full rounded-md border border-white/15 bg-ink-800 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-brand-400"
              />
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 w-full rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send request"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-white/90"
      >
        {label}
        {required && <span className="text-brand-300"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/15 bg-ink-800 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-brand-400"
      />
    </div>
  );
}
