"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { categories } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [bagsOpen, setBagsOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 z-50 flex h-24 w-full items-center justify-between border-b border-industrial-gray bg-surface-container-lowest px-margin-mobile md:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
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
        {nav.map((item) => {
          const linkClass = `flex h-full items-center gap-1 text-label-bold font-bold uppercase tracking-widest transition-colors ${
            isActive(item.href)
              ? "border-b-2 border-secondary text-secondary"
              : "text-on-surface-variant hover:text-secondary"
          }`;

          if (item.href === "/products") {
            return (
              <div
                key={item.href}
                className="relative flex h-full items-center"
                onMouseEnter={() => setBagsOpen(true)}
                onMouseLeave={() => setBagsOpen(false)}
              >
                <Link
                  href={item.href}
                  className={linkClass}
                  onClick={() => setBagsOpen(false)}
                >
                  {item.label}
                  <Icon
                    name="expand_more"
                    className={`text-base transition-transform ${
                      bagsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                {bagsOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 border border-industrial-gray bg-surface-container-lowest shadow-xl">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/products#${c.slug}`}
                        onClick={() => setBagsOpen(false)}
                        className="flex items-center justify-between gap-3 border-b border-industrial-gray px-5 py-3 transition-colors last:border-b-0 hover:bg-surface-container-low"
                      >
                        <span className="text-body-sm font-bold text-primary">
                          {c.name}
                        </span>
                        <span className="font-sans text-mono-spec text-secondary">
                          ${c.priceMin.toFixed(2)}
                          {c.priceUnit ? c.priceUnit : "+"}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          );
        })}
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
          className="whitespace-nowrap bg-secondary px-3 py-2.5 font-display text-label-bold uppercase tracking-widest text-on-secondary transition-colors hover:bg-secondary-container sm:px-6 sm:py-3"
        >
          <span className="sm:hidden">Quote</span>
          <span className="hidden sm:inline">Get a Quote</span>
        </Link>
      </div>

      {open && (
        <nav className="absolute left-0 top-24 w-full border-b border-industrial-gray bg-surface-container-lowest md:hidden">
          <div className="flex flex-col px-margin-mobile py-2">
            {nav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-label-bold font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary"
                >
                  {item.label}
                </Link>
                {item.href === "/products" && (
                  <div className="mb-2 flex flex-col border-l border-industrial-gray pl-4">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/products#${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="py-2 text-body-sm font-medium text-on-surface-variant hover:text-secondary"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
