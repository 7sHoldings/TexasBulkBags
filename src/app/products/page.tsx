import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories, productsInCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Bulk Bags Catalog — FIBC Super Sacks",
  description:
    "Browse Texas Bulk Bags FIBC categories: Standard FIBC bulk bags, Baffle Q-Bags, and Food-Grade Clean Room FIBC. Multiple sizes, configurations, and volume pricing.",
};

export default function ProductsPage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <div className="mb-8 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Bulk Bag Catalog
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          FIBC super sacks for every industry — choose a category, then a size.
          Custom configurations available on every bag.
        </p>
      </div>

      {/* Category quick-nav */}
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            className="border border-industrial-gray bg-white px-4 py-2 text-label-bold font-bold uppercase tracking-widest text-primary transition-colors hover:border-secondary hover:text-secondary"
          >
            {c.name}
          </a>
        ))}
      </div>

      <div className="space-y-16">
        {categories.map((cat) => {
          const items = productsInCategory(cat.slug);
          return (
            <section key={cat.slug} id={cat.slug} className="scroll-mt-24">
              {/* Flyer banner */}
              <div className="overflow-hidden border border-industrial-gray hard-shadow">
                <Image
                  src={cat.flyer}
                  alt={`${cat.name} specification sheet`}
                  width={1280}
                  height={1000}
                  className="h-auto w-full"
                />
              </div>

              {/* Header */}
              <div className="mt-6 flex flex-col items-start justify-between gap-4 border-b-2 border-primary pb-5 md:flex-row md:items-end">
                <div>
                  <h2 className="font-display text-headline-lg uppercase text-primary">
                    {cat.name}
                  </h2>
                  <p className="text-body-md text-on-surface-variant">
                    {cat.tagline} {cat.blurb}
                  </p>
                </div>
                <div className="shrink-0">
                  <p className="text-label-bold font-bold uppercase text-on-surface-variant">
                    Price Range
                  </p>
                  <p className="font-display text-headline-md text-secondary">
                    ${cat.priceMin.toFixed(2)} – ${cat.priceMax.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Materials */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-label-bold font-bold uppercase text-on-surface-variant">
                  Ideal for:
                </span>
                {cat.materials.map((m) => (
                  <span
                    key={m}
                    className="border border-industrial-gray bg-white px-3 py-1 text-body-sm text-on-surface-variant"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Size grid */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Custom CTA */}
      <div className="mt-16 flex flex-col items-start justify-between gap-4 border border-industrial-gray bg-surface-container-highest p-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-headline-md uppercase text-primary">
            Need a custom size or configuration?
          </h2>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Custom sizes, SWL, liners, and printing available on request.
          </p>
        </div>
        <Link
          href="/custom-quote"
          className="inline-flex items-center gap-2 bg-secondary px-6 py-3 font-display text-label-bold uppercase tracking-widest text-on-secondary hover:bg-secondary-container"
        >
          Request a Quote <Icon name="arrow_forward" className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
