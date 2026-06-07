import type { Metadata } from "next";
import Link from "next/link";
import { glossary } from "@/lib/resources";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "FIBC Terminology Glossary",
  description:
    "Plain-language definitions of FIBC bulk bag terms — U-panel, circular, baffle, SWL, safety factor, static types, liners, and more.",
};

export default function GlossaryPage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <nav className="mb-6 flex items-center gap-2 text-body-sm text-on-surface-variant">
        <Link href="/resources" className="hover:text-secondary">
          Resources
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <span className="font-bold text-primary">Glossary</span>
      </nav>

      <div className="mb-10 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          FIBC Terminology
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          The bulk bag vocabulary, in plain language — so you can spec with
          confidence.
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-px overflow-hidden border border-industrial-gray bg-industrial-gray md:grid-cols-2">
        {glossary.map((g) => (
          <div key={g.term} className="bg-white p-6">
            <dt className="font-display text-headline-sm uppercase text-primary">
              {g.term}
            </dt>
            <dd className="mt-2 text-body-md text-on-surface-variant">
              {g.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
