"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/ui/Icon";

export function PdpActions({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(50);
  const [added, setAdded] = useState(false);

  const step = 10;

  function handleAdd() {
    add(
      {
        slug: product.slug,
        sku: product.sku,
        name: product.name,
        priceFrom: product.priceFrom,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-end gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase text-on-surface-variant">
            Price per unit
          </p>
          <p className="font-display text-headline-xl text-secondary">
            ${product.priceFrom.toFixed(2)}
          </p>
        </div>
        <span
          className={`mb-2 flex items-center gap-1 text-label-bold font-bold uppercase ${
            product.inStock ? "text-success-green" : "text-warning-amber"
          }`}
        >
          <Icon
            name={product.inStock ? "check_circle" : "schedule"}
            className="text-base"
            filled
          />
          {product.inStock ? "In Stock — Ready to Ship" : "Made to Order"}
        </span>
      </div>

      <div className="flex items-stretch gap-3">
        <div className="flex items-center border border-industrial-gray">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(step, q - step))}
            className="px-4 py-3 text-primary hover:bg-surface-container-low"
          >
            <Icon name="remove" />
          </button>
          <input
            type="number"
            min={step}
            step={step}
            value={qty}
            onChange={(e) => setQty(Math.max(step, Number(e.target.value) || step))}
            className="w-16 border-x border-industrial-gray py-3 text-center font-sans text-mono-spec outline-none"
            aria-label="Quantity"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + step)}
            className="px-4 py-3 text-primary hover:bg-surface-container-low"
          >
            <Icon name="add" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 bg-secondary px-6 py-3 font-display text-label-bold uppercase tracking-widest text-on-secondary transition-colors hover:bg-secondary-container"
        >
          <Icon name={added ? "check" : "add_shopping_cart"} />
          {added ? "Added to Quote List" : "Add to Quote List"}
        </button>
      </div>

      <button
        type="button"
        onClick={() =>
          router.push(`/custom-quote?product=${encodeURIComponent(product.slug)}`)
        }
        className="flex w-full items-center justify-center gap-2 border-2 border-primary px-6 py-3 font-display text-label-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary"
      >
        <Icon name="request_quote" /> Request Bulk Quote
      </button>

      <p className="text-body-sm text-on-surface-variant">
        Volume pricing available. Add bags to your quote list, then submit for a
        formal proposal within 24 business hours.
      </p>
    </div>
  );
}
