import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            Texas-based · Ships nationwide
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Heavy-duty FIBC bulk bags, built for the work ahead.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-700">
            {site.name} supplies durable super sacks for agriculture,
            construction, and industrial operations. Stock sizes ready to ship,
            custom specs on request, and volume pricing that adds up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Request a Quote
            </a>
            <a
              href="#products"
              className="rounded-md border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Browse Products
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { value: "4,000 lb", label: "Max safe load" },
              { value: "1–2 days", label: "Stock ship time" },
              { value: "5:1+", label: "Safety factor" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-brand-600">
                  {stat.value}
                </dt>
                <dd className="text-sm text-ink-700">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="aspect-square w-full max-w-md rounded-2xl bg-gradient-to-br from-brand-200 to-brand-500 p-8 shadow-xl">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border-4 border-dashed border-white/60 text-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3h8l-1 4H9L8 3Z" />
                <path d="M9 7c-1.5 2-2 4-2 8a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4c0-4-.5-6-2-8" />
                <path d="M8 3 6 5M16 3l2 2" />
              </svg>
              <p className="mt-4 text-lg font-semibold">
                FIBC Super Sacks
              </p>
              <p className="text-sm text-white/80">
                Standard · Food-grade · UN-certified
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
