export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            A Texas supplier that knows bulk handling
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            We started Texas Bulk Bags to give regional producers and
            contractors a dependable source for FIBC bags — without the long
            lead times and minimums of importing direct.
          </p>
          <p className="mt-4 text-ink-700">
            Today we warehouse a deep catalog of stock bags and work hand-in-hand
            with manufacturers to spec custom solutions. Whether you move grain,
            sand, chemicals, or finished product, we&apos;ll help you choose a bag
            that&apos;s safe, compliant, and priced right.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 self-center">
          {[
            { value: "10M+", label: "Bags shipped" },
            { value: "500+", label: "Customers served" },
            { value: "50+", label: "Stock configurations" },
            { value: "100%", label: "Texas-based support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-brand-50 p-6 text-center"
            >
              <div className="text-3xl font-bold text-brand-600">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-ink-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
