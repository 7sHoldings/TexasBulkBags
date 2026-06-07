"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import { ProductImage } from "@/components/ui/ProductImage";
import { Icon } from "@/components/ui/Icon";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group flex flex-col border border-industrial-gray bg-white transition-shadow duration-300 hover:shadow-[4px_4px_0px_0px_rgba(10,26,47,0.08)]">
      <Link href={`/products/${product.slug}`} className="relative block">
        <ProductImage className="aspect-square" />
        {product.badge && (
          <span className="absolute right-4 top-4 bg-secondary px-3 py-1 text-label-bold font-bold uppercase text-white">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-slate-dark/90 py-4 text-label-bold font-bold uppercase text-white opacity-0 transition-opacity group-hover:opacity-100">
          <Icon name="visibility" /> Quick View
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-headline-sm uppercase text-primary">
            <Link href={`/products/${product.slug}`} className="hover:text-secondary">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 bg-primary px-2 py-1 font-sans text-mono-spec text-white">
            {product.swl.toLocaleString()} LB SWL
          </span>
        </div>
        <p className="mb-6 text-body-sm text-on-surface-variant">
          {product.shortDescription}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4 border-y border-industrial-gray py-4">
          <div>
            <p className="text-[10px] font-bold uppercase text-on-surface-variant">
              Dimensions
            </p>
            <p className="font-sans text-mono-spec text-primary">
              {product.dimensions}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-on-surface-variant">
              Safety Factor
            </p>
            <p className="font-sans text-mono-spec text-primary">
              {product.safetyFactor}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase text-on-surface-variant">
              Starting at
            </p>
            <p className="font-display text-headline-md text-secondary">
              ${product.priceFrom.toFixed(2)}
              <span className="ml-1 text-body-sm font-normal text-on-surface-variant">
                /ea
              </span>
            </p>
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to quote list`}
            onClick={() =>
              add({
                slug: product.slug,
                sku: product.sku,
                name: product.name,
                priceFrom: product.priceFrom,
              })
            }
            className="bg-primary p-3 text-white transition-colors hover:bg-secondary"
          >
            <Icon name="add_shopping_cart" />
          </button>
        </div>
      </div>
    </div>
  );
}
