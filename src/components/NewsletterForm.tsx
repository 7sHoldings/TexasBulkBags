"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="flex items-center gap-2 text-body-sm text-secondary-fixed">
        <Icon name="check_circle" className="text-base" />
        Thanks — you&apos;re subscribed.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Email Address"
        className="w-full border-none bg-slate-dark p-3 text-white outline-none placeholder:text-on-primary-container/50 focus:ring-1 focus:ring-secondary"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="bg-secondary px-4 text-on-secondary hover:bg-secondary-container"
      >
        <Icon name="send" />
      </button>
    </form>
  );
}
