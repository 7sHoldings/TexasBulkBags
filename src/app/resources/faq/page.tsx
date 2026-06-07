import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/resources";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about FIBC bulk bags — safe working load, safety factors, custom sizes, shipping, food-grade options, and reuse.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 flex items-center gap-2 text-body-sm text-on-surface-variant">
        <Link href="/resources" className="hover:text-secondary">
          Resources
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <span className="font-bold text-primary">FAQ</span>
      </nav>

      <div className="mb-10 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          Quick answers to the questions we hear most about bulk bags.
        </p>
      </div>

      <div className="mx-auto max-w-3xl divide-y divide-industrial-gray border border-industrial-gray bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-surface-container-low">
              <span className="font-display text-headline-sm text-primary">
                {f.q}
              </span>
              <Icon
                name="chevron_right"
                className="text-xl text-secondary transition-transform group-open:rotate-90"
              />
            </summary>
            <p className="px-5 pb-5 text-body-md text-on-surface-variant">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-start justify-between gap-4 border border-industrial-gray bg-surface-container-highest p-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-headline-sm uppercase text-primary">
            Still have a question?
          </h2>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Our Texas team is happy to help you spec the right bag.
          </p>
        </div>
        <ButtonLink href="/contact">Contact Us</ButtonLink>
      </div>
    </div>
  );
}
