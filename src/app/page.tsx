import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ui/ProductImage";
import { certifications, site } from "@/lib/site";
import { products } from "@/lib/products";
import { industries } from "@/lib/industries";

export default function Home() {
  const bestSellers = products.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden border-b border-industrial-gray bg-surface-container-lowest">
        <div className="industrial-grid absolute inset-0 opacity-70" />
        <div className="container relative z-10 mx-auto grid grid-cols-12 gap-6 px-margin-mobile py-20 md:px-8">
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
      <section className="border-b-4 border-secondary bg-primary-container py-12">
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
      <section className="bg-surface-container-lowest py-16">
        <div className="container mx-auto px-margin-mobile md:px-8">
          <SectionHeading
            title="Core Configurations"
            subtitle="Optimized for every material-handling requirement."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 md:h-[600px]">
            <Link
              href="/products"
              className="group relative flex flex-col justify-end overflow-hidden border border-industrial-gray bg-surface-container p-8 hard-shadow md:col-span-8 md:row-span-2"
            >
              <ProductImage className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
              <div className="relative z-10">
                <span className="mb-4 inline-block bg-secondary px-2 py-1 text-[10px] font-bold uppercase text-on-secondary">
                  Bestseller
                </span>
                <h3 className="mb-2 font-display text-headline-md text-primary">
                  STANDARD U-PANEL
                </h3>
                <p className="mb-4 max-w-md text-on-surface-variant">
                  The industry standard for high-capacity storage. 2,200lb –
                  4,000lb SWL options available.
                </p>
                <span className="flex items-center gap-2 text-label-bold font-bold uppercase text-secondary">
                  Explore Specs <Icon name="arrow_forward" className="text-sm" />
                </span>
              </div>
            </Link>

            <Link
              href="/products"
              className="flex flex-col justify-between border border-industrial-gray bg-white p-6 hard-shadow md:col-span-4"
            >
              <div>
                <Icon
                  name="settings_input_component"
                  className="mb-4 text-3xl text-secondary"
                />
                <h3 className="font-display text-headline-sm text-primary">
                  CIRCULAR BAGS
                </h3>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                Seamless tubular design for fine powders and leak prevention.
              </p>
            </Link>

            <Link
              href="/custom-quote"
              className="flex flex-col justify-between bg-slate-dark p-6 text-white md:col-span-4"
            >
              <div>
                <Icon name="tune" className="mb-4 text-3xl text-secondary-fixed" />
                <h3 className="font-display text-headline-sm">
                  CUSTOM & SPECIALTY
                </h3>
              </div>
              <p className="text-body-sm opacity-70">
                Conductive, UN-rated, and food-grade solutions for sensitive
                cargo.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-surface py-16">
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
      <section className="border-y border-industrial-gray bg-surface-container-lowest py-16">
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
      <section className="border-y border-industrial-gray bg-surface-container-highest py-16">
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
