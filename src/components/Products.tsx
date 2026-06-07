import { products } from "@/lib/site";

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Bulk bags for every job
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            From aggregates to food ingredients to hazardous materials, we stock
            and source the right FIBC for your operation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="flex flex-col rounded-xl border border-black/5 bg-brand-50/40 p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-ink-900">
                {product.name}
              </h3>
              <p className="mt-2 flex-1 text-sm text-ink-700">
                {product.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-2 text-sm text-ink-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-600"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {spec}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
