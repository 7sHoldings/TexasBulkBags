import type { Metadata } from "next";
import Image from "next/image";
import { certifications, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Texas Bulk Bags",
  description:
    "Texas Bulk Bags is a Kerens, TX supplier of heavy-duty FIBC bulk bags for agriculture, construction, and industrial use. Stock and custom solutions, engineered for precision.",
};

const stats = [
  { value: "10M+", label: "Bags shipped" },
  { value: "500+", label: "Customers served" },
  { value: "75+", label: "Stock configurations" },
  { value: "24 hr", label: "Quote turnaround" },
];

export default function AboutPage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <div className="mb-10 border-l-8 border-secondary pl-6">
        <span className="text-label-bold font-bold uppercase tracking-widest text-secondary">
          {site.established}
        </span>
        <h1 className="mt-2 font-display text-headline-xl uppercase text-primary">
          A Texas Supplier That Knows Bulk Handling
        </h1>
      </div>

      <div className="mb-12 flex items-center justify-center border border-industrial-gray bg-white p-8 hard-shadow sm:p-12">
        <Image
          src="/logo-full.jpg"
          alt="Texas Bulk Bags logo"
          width={1280}
          height={853}
          className="h-auto w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-body-lg text-on-surface-variant">
          <p>
            Texas Bulk Bags supplies durable FIBC bulk bags — &ldquo;super
            sacks&rdquo; — to producers and contractors across agriculture,
            construction, chemical, and energy industries. We started in Kerens,
            Texas to give regional operations a dependable source for industrial
            bags without the long lead times and high minimums of importing
            direct.
          </p>
          <p>
            Today we warehouse a deep catalog of stock bags and work hand-in-hand
            with manufacturers to engineer custom solutions. Whether you move
            grain, frac sand, cement, or food ingredients, we&apos;ll help you
            choose a bag that&apos;s safe, compliant, and priced right for your
            volume.
          </p>
          <p>
            Every bag we supply is manufactured to recognized international
            standards, load-tested, and documented — so your team can handle
            material with confidence.
          </p>
          <ButtonLink href="/custom-quote" size="lg" className="mt-2">
            Work With Us
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border border-industrial-gray bg-white p-6 text-center hard-shadow"
            >
              <div className="font-display text-headline-lg text-secondary">
                {s.value}
              </div>
              <div className="mt-1 text-body-sm text-on-surface-variant">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-industrial-gray bg-industrial-gray md:grid-cols-4">
        {certifications.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-3 bg-primary-container p-6 text-on-primary-container"
          >
            <Icon name={c.icon} className="text-3xl text-secondary-fixed" filled />
            <span className="text-label-bold font-bold uppercase">{c.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="border border-industrial-gray bg-white p-6 hard-shadow">
          <Icon name="location_on" className="text-2xl text-secondary" />
          <h2 className="mt-2 font-display text-headline-sm uppercase text-primary">
            Visit / Ship
          </h2>
          <p className="mt-1 text-body-md text-on-surface-variant">{site.address}</p>
        </div>
        <a
          href={site.phoneHref}
          className="border border-industrial-gray bg-white p-6 hard-shadow hover:border-secondary"
        >
          <Icon name="call" className="text-2xl text-secondary" />
          <h2 className="mt-2 font-display text-headline-sm uppercase text-primary">
            Call
          </h2>
          <p className="mt-1 text-body-md text-on-surface-variant">{site.phone}</p>
        </a>
        <a
          href={site.emailHref}
          className="border border-industrial-gray bg-white p-6 hard-shadow hover:border-secondary"
        >
          <Icon name="mail" className="text-2xl text-secondary" />
          <h2 className="mt-2 font-display text-headline-sm uppercase text-primary">
            Email
          </h2>
          <p className="mt-1 text-body-md text-on-surface-variant">{site.email}</p>
        </a>
      </div>
    </div>
  );
}
