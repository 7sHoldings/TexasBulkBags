import { features } from "@/lib/site";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-brand-50/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Why buyers choose Texas Bulk Bags
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            We pair industrial-grade product with the responsiveness of a
            local supplier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-black/5 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-ink-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-ink-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
