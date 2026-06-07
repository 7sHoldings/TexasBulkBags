import { site } from "@/lib/site";

/** Organization + LocalBusiness structured data for the whole site. */
export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    description:
      "Supplier of heavy-duty FIBC bulk bags (super sacks) for agriculture, chemical, and construction industries.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1001 NW 2nd St",
      addressLocality: "Kerens",
      addressRegion: "TX",
      postalCode: "75144",
      addressCountry: "US",
    },
    areaServed: "US",
    openingHours: "Mo-Fr 08:00-17:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
