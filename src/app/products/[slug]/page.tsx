import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  bagOptions,
  getCategory,
  getProduct,
  products,
  relatedProducts,
  type Product,
} from "@/lib/products";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { ProductImage } from "@/components/ui/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { PdpActions } from "@/components/product/PdpActions";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.dimensions}`,
    description: product.shortDescription,
  };
}

function specRows(p: Product) {
  return [
    { label: "Base Dimensions", value: p.dimensions },
    { label: "Construction", value: p.construction },
    {
      label: "Safe Working Load (5:1)",
      value: `${p.swl.toLocaleString()} lbs`,
    },
    p.swl6
      ? { label: "Safe Working Load (6:1)", value: `${p.swl6.toLocaleString()} lbs` }
      : null,
    p.volumeFt3
      ? {
          label: "Volume",
          value: `${p.volumeFt3} ft³ (${p.volumeM3} m³)`,
        }
      : null,
    { label: "Top Style", value: p.topStyle },
    { label: "Bottom Style", value: p.bottomStyle },
    { label: "Fabric", value: p.fabric },
    { label: "Lift Loops", value: p.liftLoops },
    { label: "UV Protection", value: p.uvProtection },
  ].filter((r): r is { label: string; value: string } => r !== null);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProducts(slug, 4);
  const attributes = [
    { icon: "dashboard", label: product.construction },
    { icon: "vertical_align_top", label: product.topStyle },
    { icon: "vertical_align_bottom", label: product.bottomStyle },
    { icon: product.coated ? "layers" : "grid_on", label: product.coated ? "Coated" : "Uncoated" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceFrom,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };

  return (
    <div className="px-margin-mobile py-8 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-body-sm text-on-surface-variant">
        <Link href="/" className="hover:text-secondary">
          Home
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <Link href="/products" className="hover:text-secondary">
          Bulk Bags
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <Link href={`/products#${product.category}`} className="hover:text-secondary">
          {category?.name ?? "Catalog"}
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <span className="font-bold text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative border border-industrial-gray bg-white">
            {product.badge && (
              <span className="absolute left-4 top-4 z-10 flex items-center gap-1 bg-success-green px-3 py-1 text-label-bold font-bold uppercase text-white">
                <Icon name="check_circle" className="text-sm" filled /> {product.badge}
              </span>
            )}
            <ProductImage
              className="aspect-[4/3]"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <ProductImage
                key={i}
                className="aspect-square border border-industrial-gray"
              />
            ))}
          </div>
        </div>

        {/* Summary + actions */}
        <div>
          <span className="text-label-bold font-bold uppercase tracking-widest text-secondary">
            {category?.name ?? "FIBC"} · {product.sku}
          </span>
          <h1 className="mt-2 font-display text-headline-xl leading-tight text-primary">
            {product.name}
          </h1>
          <p className="mt-3 text-body-lg text-on-surface-variant">
            {product.description}
          </p>

          <div className="my-6 grid grid-cols-4 gap-2 border-y border-industrial-gray py-4">
            {attributes.map((a) => (
              <div
                key={a.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <Icon name={a.icon} className="text-2xl text-primary" />
                <span className="text-[10px] font-bold uppercase text-on-surface-variant">
                  {a.label}
                </span>
              </div>
            ))}
          </div>

          <PdpActions product={product} />
        </div>
      </div>

      {/* Technical specifications */}
      <section className="mt-16">
        <div className="bg-primary px-6 py-4">
          <h2 className="font-display text-headline-sm uppercase tracking-wider text-on-primary">
            Technical Specifications
          </h2>
        </div>
        <table className="w-full border border-industrial-gray border-t-0 text-left">
          <tbody className="font-sans text-mono-spec">
            {specRows(product).map((row, i) => (
              <tr
                key={row.label}
                className={i % 2 === 0 ? "bg-white" : "bg-surface-container-low"}
              >
                <th className="w-1/2 border-b border-industrial-gray px-6 py-3 text-label-bold font-bold uppercase text-on-surface-variant">
                  {row.label}
                </th>
                <td className="border-b border-industrial-gray px-6 py-3 font-bold text-primary">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Configuration options */}
      <section className="mt-16">
        <div className="mb-8 border-l-8 border-secondary pl-6">
          <h2 className="font-display text-headline-lg uppercase text-primary">
            Configuration Options
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Every Standard FIBC can be built to your spec. Note your choices in
            the quote request.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Top Options", icon: "vertical_align_top", items: bagOptions.topOptions },
            { title: "Bottom Options", icon: "vertical_align_bottom", items: bagOptions.bottomOptions },
            { title: "Lifting Loops", icon: "drag_handle", items: bagOptions.loopOptions },
            { title: "Liner Options", icon: "layers", items: bagOptions.linerOptions },
            { title: "Printing", icon: "print", items: bagOptions.printingOptions },
            { title: "Fabric & Safety", icon: "shield", items: [...bagOptions.fabricOptions, ...bagOptions.safetyFactors] },
          ].map((group) => (
            <div
              key={group.title}
              className="border border-industrial-gray bg-white p-6 hard-shadow"
            >
              <h3 className="mb-3 flex items-center gap-2 text-label-bold font-bold uppercase text-secondary">
                <Icon name={group.icon} className="text-base" /> {group.title}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-body-sm text-on-surface-variant"
                  >
                    <Icon name="check" className="text-sm text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 border border-industrial-gray bg-surface-container-low p-6">
          <h3 className="mb-3 text-label-bold font-bold uppercase text-primary">
            Ideal for bulk materials
          </h3>
          <div className="flex flex-wrap gap-2">
            {(category?.materials ?? []).map((m) => (
              <span
                key={m}
                className="border border-industrial-gray bg-white px-3 py-1 text-body-sm text-on-surface-variant"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between border-l-8 border-secondary pl-6">
          <h2 className="font-display text-headline-lg uppercase text-primary">
            Related Bulk Solutions
          </h2>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-label-bold font-bold uppercase tracking-widest text-secondary hover:underline md:flex"
          >
            View Catalog <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
