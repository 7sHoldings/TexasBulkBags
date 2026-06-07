"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-industrial-gray bg-white px-3 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      type: "contact",
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
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start border border-industrial-gray bg-white p-8 hard-shadow">
        <div className="flex h-12 w-12 items-center justify-center bg-secondary">
          <Icon name="check" className="text-3xl text-white" />
        </div>
        <h3 className="mt-4 font-display text-headline-sm uppercase text-primary">
          Message Sent
        </h3>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Thanks for reaching out — we&apos;ll get back to you within one business
          day.
        </p>
      </div>
    );
  }

  return (
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
      <textarea
        name="message"
        rows={5}
        required
        placeholder="How can we help?"
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
        {status === "submitting" ? "Sending…" : "Send Message"}
        <Icon name="send" />
      </button>
    </form>
  );
}
