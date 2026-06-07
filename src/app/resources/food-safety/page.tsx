import type { Metadata } from "next";
import Link from "next/link";
import { foodSafetyGuide } from "@/lib/resources";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Food Safety Guide for Bulk Bags",
  description:
    "How food-grade FIBC bulk bags protect product purity — clean-room manufacturing, liners and barriers, certifications, and safe handling practices.",
};

export default function FoodSafetyPage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <nav className="mb-6 flex items-center gap-2 text-body-sm text-on-surface-variant">
        <Link href="/resources" className="hover:text-secondary">
          Resources
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <span className="font-bold text-primary">Food Safety Guide</span>
      </nav>

      <div className="mb-10 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Food Safety Guide
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          What makes a bulk bag food-grade, and how to keep food and ingredient
          products safe from production through transport.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        {foodSafetyGuide.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-headline-md uppercase text-primary">
              {section.heading}
            </h2>
            <p className="mt-3 text-body-lg text-on-surface-variant">
              {section.body}
            </p>
            {section.points && (
              <ul className="mt-4 space-y-2">
                {section.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-body-md text-on-surface-variant"
                  >
                    <Icon name="check" className="mt-1 text-base text-secondary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="flex flex-col items-start justify-between gap-4 border border-industrial-gray bg-surface-container-highest p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-headline-sm uppercase text-primary">
              Need food-grade bags?
            </h2>
            <p className="mt-1 text-body-md text-on-surface-variant">
              We&apos;ll spec a clean-room manufactured bag with the right liner
              for your ingredient.
            </p>
          </div>
          <ButtonLink href="/custom-quote">Request a Quote</ButtonLink>
        </div>
      </div>
    </div>
  );
}
