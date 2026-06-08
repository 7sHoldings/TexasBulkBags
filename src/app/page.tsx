import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ui/ProductImage";
import { certifications, site } from "@/lib/site";
import {
  categories,
  categoryCardImage,
  products,
} from "@/lib/products";
import { industries } from "@/lib/industries";

export default function Home() {
  const bestSellers = products.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[440px] items-center sm:min-h-[560px] overflow-hidden border-b border-industrial-gray bg-surface-container-lowest">
        <div className="industrial-grid absolute inset-0 opacity-70" />
        <div className="container relative z-10 mx-auto grid grid-cols-12 gap-6 px-margin-mobile py-14 sm:py-20 md:px-8">
          <div className="col-span-12 lg:col-span-8">
            <span className="mb-6 inline-block bg-primary px-3 py-1 text-label-bold font-bold uppercase tracking-widest text-on-primary">
              {site.established}
            </span>
            <h1 className="mb-6 max-w-3xl font-display text-headline-xl uppercase leading-[1.1] text-primary">
              Heavy-Duty FIBC Solutions for Global Industry
            </h1>
            <p className="mb-10 max-w-xl text-body-lg text-on-surface-variant">
              Precision-engineered bulk bags built for maximum safety and
              efficiency. Certified for agriculture, chemical, and construction
              sectors — stocked and shipped from Kerens, Texas.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/products" size="lg">
                View Catalog
              </ButtonLink>
              <ButtonLink href="/calculator" variant="outline" size="lg">
                Sizing Calculator
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b-4 border-secondary bg-primary-container py-8 sm:py-12">
        <div className="container mx-auto grid grid-cols-2 items-center gap-8 px-margin-mobile md:grid-cols-4 md:px-8">
          {certifications.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-3 text-on-primary-container"
            >
              <Icon name={c.icon} className="text-4xl" filled />
              <span className="text-label-bold font-bold uppercase">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Core configurations / category grid */}
      <section className="bg-surface-container-lowest py-12 sm:py-16">
        <div className="container mx-auto px-margin-mobile md:px-8">
          <SectionHeading
            title="Shop by Category"
            subtitle="FIBC bulk bags and woven packaging for every industry and material."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products#${cat.slug}`}
                className="group flex flex-col overflow-hidden border border-industrial-gray bg-white transition-shadow hover:shadow-[4px_4px_0px_0px_rgba(10,26,47,0.08)]"
              >
                <ProductImage
                  src={categoryCardImage(cat)}
                  alt={cat.name}
                  className="aspect-[4/3]"
                  cover={cat.productType === "woven"}
                  position="top"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-headline-sm uppercase text-primary group-hover:text-secondary">
                    {cat.name}
                  </h3>
                  <p className="mt-1 flex-1 text-body-sm text-on-surface-variant">
                    {cat.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-industrial-gray pt-4">
                    <span className="font-display text-headline-sm text-secondary">
                      ${cat.priceMin.toFixed(2)} – ${cat.priceMax.toFixed(2)}
                      {cat.priceUnit && (
                        <span className="ml-1 text-body-sm font-normal text-on-surface-variant">
                          {cat.priceUnit}
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1 text-label-bold font-bold uppercase tracking-widest text-secondary">
                      View <Icon name="arrow_forward" className="text-sm" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-surface py-12 sm:py-16">
        <div className="container mx-auto px-margin-mobile md:px-8">
          <SectionHeading
            title="Best-Selling Configurations"
            subtitle="Precision-engineered for reliability. Every bag undergoes rigorous quality control and load testing."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/products" variant="secondary">
              View Full Catalog
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-y border-industrial-gray bg-surface-container-lowest py-12 sm:py-16">
        <div className="container mx-auto px-margin-mobile md:px-8">
          <SectionHeading
            title="Built for Your Industry"
            subtitle="Whether you're moving limestone, fertilizer, or sensitive chemicals, we have the right container for the job."
          />
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-industrial-gray bg-industrial-gray sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries#${ind.slug}`}
                className="group flex items-start gap-4 bg-white p-6 transition-colors hover:bg-surface-container-low"
              >
                <Icon name={ind.icon} className="text-3xl text-secondary" />
                <div>
                  <h3 className="font-display text-headline-sm text-primary">
                    {ind.name}
                  </h3>
                  <p className="mt-1 text-body-sm text-on-surface-variant">
                    {ind.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom quote CTA */}
      <section className="border-y border-industrial-gray bg-surface-container-highest py-12 sm:py-16">
        <div className="container mx-auto grid grid-cols-12 items-center gap-6 px-margin-mobile md:px-8">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="mb-4 font-display text-headline-lg uppercase text-primary">
              Need a Custom Configuration?
            </h2>
            <p className="mb-8 max-w-xl text-body-md text-on-surface-variant">
              Need a specific size or high-volume wholesale pricing? Our team in
              Kerens will spec a bag to your exact requirements and respond within
              one business day.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/custom-quote" size="lg">
                Request a Quote
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 px-2 py-4 font-display text-label-bold uppercase tracking-widest text-primary hover:text-secondary"
              >
                <Icon name="call" /> {site.phone}
              </a>
            </div>
          </div>
          <div className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-5">
            <div className="border border-industrial-gray bg-white p-6 hard-shadow">
              <Icon name="support_agent" className="mb-2 text-2xl text-secondary" />
              <h3 className="mb-1 text-label-bold font-bold uppercase text-primary">
                Direct Consultation
              </h3>
              <p className="text-body-sm text-on-surface-variant">
                Talk to a bag specialist at {site.phone}.
              </p>
            </div>
            <div className="border border-industrial-gray bg-white p-6 hard-shadow">
              <Icon name="lab_profile" className="mb-2 text-2xl text-secondary" />
              <h3 className="mb-1 text-label-bold font-bold uppercase text-primary">
                Safety Data
              </h3>
              <p className="text-body-sm text-on-surface-variant">
                Request technical COA and load-test reports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
