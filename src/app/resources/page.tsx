import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Resources & FIBC Guides",
  description:
    "Buying guides, safety references, and operational best practices for FIBC bulk bags from the Texas Bulk Bags team.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResourcesPage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <div className="mb-10 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Resources & Guides
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          Practical guidance on selecting, handling, and getting the most from
          your FIBC bulk bags.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/resources/${a.slug}`}
            className="group flex flex-col border border-industrial-gray bg-white p-6 hard-shadow transition-colors hover:border-secondary"
          >
            <span className="text-label-bold font-bold uppercase tracking-widest text-secondary">
              {a.category}
            </span>
            <h2 className="mt-2 font-display text-headline-sm uppercase text-primary group-hover:text-secondary">
              {a.title}
            </h2>
            <p className="mt-2 flex-1 text-body-sm text-on-surface-variant">
              {a.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 border-t border-industrial-gray pt-4 text-body-sm text-on-surface-variant">
              <span>{formatDate(a.date)}</span>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1">
                <Icon name="schedule" className="text-sm" /> {a.readMinutes} min
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
