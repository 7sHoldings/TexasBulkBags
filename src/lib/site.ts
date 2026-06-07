export const site = {
  name: "Texas Bulk Bags",
  tagline: "Heavy-duty FIBC bulk bags, built for Texas industry.",
  phone: "(800) 555-0199",
  phoneHref: "tel:+18005550199",
  email: "sales@texasbulkbags.com",
  emailHref: "mailto:sales@texasbulkbags.com",
  address: "Houston, Texas",
  hours: "Mon–Fri, 8am–6pm CT",
};

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Get a Quote", href: "#quote" },
];

export type Product = {
  name: string;
  description: string;
  specs: string[];
};

export const products: Product[] = [
  {
    name: "Standard FIBC Bulk Bags",
    description:
      "Workhorse 1,000–4,000 lb bags for sand, gravel, grain, and aggregates. Available with duffel top, spout bottom, and lift loops.",
    specs: ["1,000–4,000 lb SWL", "U-panel & circular", "Spout or flat bottom"],
  },
  {
    name: "Food-Grade Bulk Bags",
    description:
      "Certified clean-room manufactured bags for grains, sugar, flour, and food ingredients with optional liners.",
    specs: ["FDA-compliant fabric", "Inner PE liners", "5:1 & 6:1 safety factor"],
  },
  {
    name: "UN-Certified / Hazmat Bags",
    description:
      "Tested and certified bulk bags for shipping hazardous and regulated materials in compliance with UN standards.",
    specs: ["UN-rated", "Documented testing", "Custom labeling"],
  },
  {
    name: "Conductive & Anti-Static",
    description:
      "Type C and Type D bags for combustible powders and flammable environments where static control is critical.",
    specs: ["Type C (grounded)", "Type D (dissipative)", "Powder-safe"],
  },
  {
    name: "Construction & Builder Bags",
    description:
      "Open-top, easy-fill bags for debris, soil, mulch, and jobsite material handling. UV-treated for outdoor storage.",
    specs: ["UV-stabilized", "Open top / duffel", "Crane & forklift loops"],
  },
  {
    name: "Custom Printed Bags",
    description:
      "Brand your bags with multi-color printing, custom sizes, and private labeling. Low minimums on stock styles.",
    specs: ["Up to 4-color print", "Custom dimensions", "Branded labeling"],
  },
];

export const features = [
  {
    title: "Texas-Based, Fast Shipping",
    description:
      "Warehoused in Houston with stock ready to ship. Most in-stock orders leave within 1–2 business days.",
  },
  {
    title: "Volume Pricing",
    description:
      "Direct sourcing and large inventory mean better per-bag pricing on pallet and truckload quantities.",
  },
  {
    title: "Certified Quality",
    description:
      "ISO-manufactured bags with documented safe working loads and safety factors you can trust.",
  },
  {
    title: "Custom Specs Welcome",
    description:
      "Need a non-standard size, liner, or print? Our team will spec and quote a bag built for your material.",
  },
];
