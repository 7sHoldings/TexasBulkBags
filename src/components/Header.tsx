"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-industrial-gray bg-surface-container-lowest px-margin-mobile md:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-secondary md:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="text-3xl" />
        </button>
        <Logo />
      </div>

      <nav className="hidden h-full items-center gap-8 md:flex">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex h-full items-center text-label-bold font-bold uppercase tracking-widest transition-colors ${
              isActive(item.href)
                ? "border-b-2 border-secondary text-secondary"
                : "text-on-surface-variant hover:text-secondary"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/quote-list"
          aria-label="Quote list"
          className="relative flex items-center text-primary hover:text-secondary"
        >
          <Icon name="shopping_cart" className="text-2xl" />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[11px] font-bold text-on-secondary">
              {count}
            </span>
          )}
        </Link>
        <Link
          href="/custom-quote"
          className="bg-secondary px-6 py-3 font-display text-label-bold uppercase tracking-widest text-on-secondary transition-colors hover:bg-secondary-container"
        >
          Get a Quote
        </Link>
      </div>

      {open && (
        <nav className="absolute left-0 top-20 w-full border-b border-industrial-gray bg-surface-container-lowest md:hidden">
          <div className="flex flex-col px-margin-mobile py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-label-bold font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
