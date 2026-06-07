import type { Metadata } from "next";
import { DimensionCalculator } from "@/components/calculator/DimensionCalculator";

export const metadata: Metadata = {
  title: "FIBC Dimension Calculator",
  description:
    "Calculate the required bulk bag height and volume from your material density and target payload. Engineered for industrial precision and safe handling.",
};

export default function CalculatorPage() {
  return (
    <>
      <section className="border-b border-industrial-gray bg-white px-margin-mobile py-10 md:px-8">
        <h1 className="font-display text-headline-xl leading-tight text-primary">
          FIBC Dimension Calculator
        </h1>
        <p className="mt-2 max-w-4xl text-body-lg text-on-surface-variant">
          Calculate the exact height and volume requirements for your bulk bag
          based on material density and required payload. Engineered for
          industrial precision and safe handling.
        </p>
      </section>
      <DimensionCalculator />
    </>
  );
}
