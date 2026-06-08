import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/industries";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "FIBC bulk bag solutions for agriculture, construction, chemical, food, oil & gas, and waste management. Find the right bag for your material.",
};

export default function IndustriesPage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <div className="mb-10 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Industries We Serve
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          From limestone to sensitive chemicals, we engineer the right container
          for the material — and the regulations — you work with.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {industries.map((ind) => (
          <section
            key={ind.slug}
            id={ind.slug}
            className="scroll-mt-24 border border-industrial-gray bg-white p-6 hard-shadow"
          >
            <div className="flex items-center gap-4 border-b border-industrial-gray pb-4">
              <span className="flex h-12 w-12 items-center justify-center bg-primary text-on-primary">
                <Icon name={ind.icon} className="text-2xl" />
              </span>
              <h2 className="font-display text-headline-md uppercase text-primary">
                {ind.name}
              </h2>
            </div>
            <p className="mt-4 text-body-md text-on-surface-variant">
              {ind.summary}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-label-bold font-bold uppercase text-on-surface-variant">
                  Common Uses
                </h3>
                <ul className="space-y-1">
                  {ind.uses.map((use) => (
                    <li
                      key={use}
                      className="flex items-center gap-2 text-body-sm text-primary"
                    >
                      <Icon name="check" className="text-sm text-secondary" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-label-bold font-bold uppercase text-on-surface-variant">
                  Recommended Bags
                </h3>
                <ul className="space-y-1">
                  {ind.bags.map((bag) => (
                    <li
                      key={bag}
                      className="flex items-center gap-2 text-body-sm text-primary"
                    >
                      <Icon name="shopping_bag" className="text-sm text-secondary" />
                      {bag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/products"
              className="mt-6 flex items-center gap-2 text-label-bold font-bold uppercase tracking-widest text-secondary hover:underline"
            >
              Shop Bags <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-4 border border-industrial-gray bg-surface-container-highest p-6 sm:p-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-headline-md uppercase text-primary">
            Don&apos;t see your application?
          </h2>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Our engineering team can spec a bag for almost any material.
          </p>
        </div>
        <ButtonLink href="/custom-quote" size="lg">
          Request a Custom Quote
        </ButtonLink>
      </div>
    </div>
  );
}
