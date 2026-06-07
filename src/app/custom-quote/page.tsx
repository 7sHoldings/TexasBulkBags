import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CustomQuoteForm } from "@/components/quote/CustomQuoteForm";
import { Icon } from "@/components/ui/Icon";
import { ProductImage } from "@/components/ui/ProductImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Quote Request",
  description:
    "Request a custom FIBC bulk bag quote. Specify construction, dimensions, load rating, liners, and certifications — our engineering team responds within 24 hours.",
};

export default function CustomQuotePage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <div className="mb-10 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Custom Quote Request
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          Provide your specific requirements below. Our engineering team will
          review your specifications and provide a formal proposal within 24
          business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="p-8">Loading form…</div>}>
            <CustomQuoteForm />
          </Suspense>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-primary-container p-6 text-white">
            <h2 className="flex items-center gap-2 font-display text-headline-sm uppercase">
              <Icon name="verified_user" className="text-secondary-fixed" />
              Quality Assurance
            </h2>
            <p className="mt-3 text-body-sm text-on-primary-container">
              All bags manufactured by Texas Bulk Bags meet or exceed rigorous
              international standards for safety and material integrity.
            </p>
            <ul className="mt-4 space-y-2">
              {["FIBCA Member", "UN Rated Ready", "ISO 9001:2015"].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 bg-white/5 px-3 py-2 text-label-bold font-bold uppercase"
                >
                  <Icon name="check_circle" className="text-base text-secondary-fixed" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-industrial-gray bg-white p-6 hard-shadow">
            <h2 className="font-display text-headline-sm uppercase text-primary">
              Need Assistance?
            </h2>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Our specialists are available to help you configure the perfect bag
              for your material handling needs.
            </p>
            <div className="mt-4 space-y-2 text-body-md">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 font-bold text-primary hover:text-secondary"
              >
                <Icon name="call" className="text-secondary" /> {site.phone}
              </a>
              <p className="flex items-center gap-2 text-on-surface-variant">
                <Icon name="schedule" className="text-secondary" /> {site.hours}
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="block border border-industrial-gray bg-white hard-shadow"
          >
            <ProductImage className="aspect-video" />
            <div className="p-6">
              <span className="text-[10px] font-bold uppercase text-secondary">
                Inventory Spotlight
              </span>
              <h3 className="mt-1 font-display text-headline-sm text-primary">
                Standard U-Panel Bags
              </h3>
              <p className="mt-1 text-body-sm text-on-surface-variant">
                Don&apos;t need custom? Browse our standard inventory for immediate
                dispatch from our Texas facility.
              </p>
              <span className="mt-3 flex items-center gap-2 text-label-bold font-bold uppercase text-secondary">
                View Stock Catalog <Icon name="arrow_forward" className="text-sm" />
              </span>
            </div>
          </Link>
        </aside>
      </div>
    </div>
  );
}
