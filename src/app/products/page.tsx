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

      <div className="space-y-12 sm:space-y-16">
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
                    {cat.priceUnit && (
                      <span className="ml-1 text-body-sm font-normal text-on-surface-variant">
                        {cat.priceUnit}
                      </span>
                    )}
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

              {cat.productType === "woven" ? (
                /* Spec-to-quote category */
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="border border-industrial-gray bg-white">
                    <div className="bg-primary px-6 py-3">
                      <h3 className="font-display text-headline-sm uppercase text-on-primary">
                        Technical Specification
                      </h3>
                    </div>
                    <table className="w-full text-left font-sans text-mono-spec">
                      <tbody>
                        {(cat.specs ?? []).map((s, i) => (
                          <tr
                            key={s.label}
                            className={i % 2 ? "bg-surface-container-low" : "bg-white"}
                          >
                            <th className="w-1/2 border-b border-industrial-gray px-4 py-3 text-label-bold font-bold uppercase text-on-surface-variant sm:px-6">
                              {s.label}
                            </th>
                            <td className="border-b border-industrial-gray px-4 py-3 font-bold text-primary sm:px-6">
                              {s.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="border border-industrial-gray bg-white p-6">
                      <h3 className="mb-3 text-label-bold font-bold uppercase text-primary">
                        Standard Widths
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(cat.widthOptions ?? []).map((w) => (
                          <span
                            key={w}
                            className="border border-industrial-gray bg-surface-container-low px-3 py-1 font-sans text-mono-spec text-primary"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-body-sm text-on-surface-variant">
                        Custom sizes, GSM, colors, and lamination available on
                        request.
                      </p>
                    </div>
                    <Link
                      href="/custom-quote"
                      className="inline-flex items-center justify-center gap-2 bg-secondary px-6 py-4 font-display text-label-bold uppercase tracking-widest text-on-secondary hover:bg-secondary-container"
                    >
                      Request a {cat.shortName} Quote{" "}
                      <Icon name="arrow_forward" className="text-sm" />
                    </Link>
                  </div>
                </div>
              ) : (
                /* Size grid */
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Custom CTA */}
      <div className="mt-16 flex flex-col items-start justify-between gap-4 border border-industrial-gray bg-surface-container-highest p-6 sm:p-8 md:flex-row md:items-center">
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
