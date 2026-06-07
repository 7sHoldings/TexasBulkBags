export type TopStyle = "Duffle Top" | "Spout Top" | "Open Top";
export type BottomStyle = "Spout Bottom" | "Flat Bottom" | "Full-Open Bottom";
export type Construction = "U-Panel" | "Circular" | "4-Panel" | "Baffled (Q-Bag)";
export type StaticType = "Type A" | "Type B" | "Type C" | "Type D";

export type Product = {
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  badge?: "In Stock" | "Best Seller" | "Made to Order";
  inStock: boolean;
  dimensions: string; // L x W x H, inches
  baseFootprint: number; // inches (width/depth)
  swl: number; // safe working load, lbs
  safetyFactor: "5:1" | "6:1" | "8:1";
  construction: Construction;
  topStyle: TopStyle;
  bottomStyle: BottomStyle;
  staticType: StaticType;
  fabric: string;
  coated: boolean;
  baffled: boolean;
  foodGrade: boolean;
  unCertified: boolean;
  liftLoops: string;
  uvProtection: string;
  priceFrom: number; // per unit USD
  /** Optional real photo (e.g. "/products/tbb-up-35.jpg"). Falls back to an
   *  illustrated placeholder when omitted. */
  image?: string;
};

export const products: Product[] = [
  {
    slug: "tbb-up-35-upanel-spout",
    sku: "TBB-UP-35",
    name: "U-Panel Spout Top",
    shortDescription:
      "The industry-standard bulk bag with a discharge spout and 5:1 safety factor.",
    description:
      "Premium grade industrial bulk bag designed for high-capacity material handling. Featuring a reinforced U-panel construction for maximum structural integrity and a dual spout configuration for controlled filling and discharging.",
    badge: "Best Seller",
    inStock: true,
    dimensions: '35" × 35" × 50"',
    baseFootprint: 35,
    swl: 3000,
    safetyFactor: "5:1",
    construction: "U-Panel",
    topStyle: "Spout Top",
    bottomStyle: "Spout Bottom",
    staticType: "Type A",
    fabric: "160+ GSM woven polypropylene",
    coated: false,
    baffled: false,
    foodGrade: false,
    unCertified: false,
    liftLoops: "Cross-corner, 4-loop",
    uvProtection: "1,200 hours",
    priceFrom: 18.45,
  },
  {
    slug: "tbb-up-40-duffle-spout",
    sku: "TBB-UP-40",
    name: "U-Panel Duffle Top",
    shortDescription:
      "High-capacity U-panel bag with an easy-fill duffle top and discharge spout.",
    description:
      "A workhorse U-panel bulk bag pairing a full duffle top for fast, open filling with a discharge spout for controlled emptying. Ideal for aggregates, grains, and bulk minerals.",
    badge: "In Stock",
    inStock: true,
    dimensions: '40" × 40" × 60"',
    baseFootprint: 40,
    swl: 3300,
    safetyFactor: "5:1",
    construction: "U-Panel",
    topStyle: "Duffle Top",
    bottomStyle: "Spout Bottom",
    staticType: "Type A",
    fabric: "170 GSM woven polypropylene",
    coated: true,
    baffled: false,
    foodGrade: false,
    unCertified: false,
    liftLoops: "Cross-corner, 4-loop",
    uvProtection: "1,500 hours",
    priceFrom: 21.9,
  },
  {
    slug: "tbb-circ-42-duffle",
    sku: "TBB-CIRC-42",
    name: "Circular Duffle Top",
    shortDescription:
      "Seamless tubular construction reduces seam stress — ideal for fine powders.",
    description:
      "Circular (tubular) woven construction eliminates vertical side seams, reducing stress points and minimizing sift. The preferred choice for fine powders, cement, and leak-sensitive materials.",
    badge: "In Stock",
    inStock: true,
    dimensions: '42" × 42" × 45"',
    baseFootprint: 42,
    swl: 2200,
    safetyFactor: "5:1",
    construction: "Circular",
    topStyle: "Duffle Top",
    bottomStyle: "Flat Bottom",
    staticType: "Type A",
    fabric: "155 GSM tubular polypropylene",
    coated: true,
    baffled: false,
    foodGrade: false,
    unCertified: false,
    liftLoops: "Corner, 4-loop",
    uvProtection: "1,200 hours",
    priceFrom: 13.75,
  },
  {
    slug: "tbb-baf-38-baffle",
    sku: "TBB-BAF-38",
    name: "Baffle Q-Bag",
    shortDescription:
      "Internal baffles hold a square shape and add up to 30% more volume per footprint.",
    description:
      "Baffle (Q-bag) construction sews fabric panels across each corner so the bag retains a square shape when filled — saving warehouse and container space while increasing usable volume by up to 30%.",
    badge: "In Stock",
    inStock: true,
    dimensions: '38" × 38" × 42"',
    baseFootprint: 38,
    swl: 3000,
    safetyFactor: "5:1",
    construction: "Baffled (Q-Bag)",
    topStyle: "Duffle Top",
    bottomStyle: "Spout Bottom",
    staticType: "Type A",
    fabric: "165 GSM woven polypropylene",
    coated: false,
    baffled: true,
    foodGrade: false,
    unCertified: false,
    liftLoops: "Cross-corner, 4-loop",
    uvProtection: "1,200 hours",
    priceFrom: 19.95,
  },
  {
    slug: "tbb-fg-35-foodgrade",
    sku: "TBB-FG-35",
    name: "Food-Grade Clean-Room FIBC",
    shortDescription:
      "Clean-room manufactured for food, grain, and ingredient handling.",
    description:
      "Manufactured in a certified clean room to prevent contamination from thread, insects, and particulates. FDA-compliant fabric with optional PE liners for sugar, flour, grains, and food ingredients.",
    badge: "Made to Order",
    inStock: false,
    dimensions: '35" × 35" × 47"',
    baseFootprint: 35,
    swl: 2200,
    safetyFactor: "6:1",
    construction: "U-Panel",
    topStyle: "Spout Top",
    bottomStyle: "Spout Bottom",
    staticType: "Type A",
    fabric: "Food-grade virgin polypropylene",
    coated: false,
    baffled: false,
    foodGrade: true,
    unCertified: false,
    liftLoops: "Cross-corner, 4-loop",
    uvProtection: "800 hours",
    priceFrom: 24.5,
  },
  {
    slug: "tbb-un-37-hazmat",
    sku: "TBB-UN-37",
    name: "UN-Certified HAZMAT Bag",
    shortDescription:
      "UN-rated and tested for transport of regulated hazardous materials.",
    description:
      "Certified and documented for the transport of UN-rated hazardous materials worldwide. Supplied with test reports and custom HAZMAT labeling on request.",
    badge: "Made to Order",
    inStock: false,
    dimensions: '37" × 37" × 47"',
    baseFootprint: 37,
    swl: 4000,
    safetyFactor: "6:1",
    construction: "U-Panel",
    topStyle: "Spout Top",
    bottomStyle: "Spout Bottom",
    staticType: "Type A",
    fabric: "200 GSM coated polypropylene",
    coated: true,
    baffled: false,
    foodGrade: false,
    unCertified: true,
    liftLoops: "Cross-corner, 4-loop",
    uvProtection: "1,500 hours",
    priceFrom: 32.0,
  },
  {
    slug: "tbb-c-39-conductive",
    sku: "TBB-C-39",
    name: "Type C Conductive FIBC",
    shortDescription:
      "Groundable Type C bag for combustible powders and flammable environments.",
    description:
      "Type C conductive (groundable) FIBC interwoven with a grid of conductive yarns. Engineered to safely dissipate static charge when grounded — essential for combustible powders and flammable atmospheres.",
    badge: "Made to Order",
    inStock: false,
    dimensions: '39" × 39" × 51"',
    baseFootprint: 39,
    swl: 3300,
    safetyFactor: "6:1",
    construction: "U-Panel",
    topStyle: "Duffle Top",
    bottomStyle: "Spout Bottom",
    staticType: "Type C",
    fabric: "180 GSM conductive-grid polypropylene",
    coated: true,
    baffled: false,
    foodGrade: false,
    unCertified: false,
    liftLoops: "Cross-corner, 4-loop",
    uvProtection: "1,200 hours",
    priceFrom: 36.75,
  },
  {
    slug: "tbb-ot-44-opentop-flat",
    sku: "TBB-OT-44",
    name: "Open Top / Flat Bottom",
    shortDescription:
      "Open-top, flat-bottom bag for fast filling of construction debris and soil.",
    description:
      "An open-top, flat-bottom builder bag for rapid filling of soil, mulch, debris, and jobsite material. UV-stabilized for outdoor storage and rated for crane or forklift handling.",
    badge: "In Stock",
    inStock: true,
    dimensions: '36" × 36" × 36"',
    baseFootprint: 36,
    swl: 2200,
    safetyFactor: "5:1",
    construction: "4-Panel",
    topStyle: "Open Top",
    bottomStyle: "Flat Bottom",
    staticType: "Type A",
    fabric: "160 GSM woven polypropylene",
    coated: false,
    baffled: false,
    foodGrade: false,
    unCertified: false,
    liftLoops: "Corner, 4-loop",
    uvProtection: "1,800 hours",
    priceFrom: 13.0,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}

// Facet option lists used by the catalog filters.
export const facets = {
  topStyle: ["Duffle Top", "Spout Top", "Open Top"] as TopStyle[],
  construction: [
    "U-Panel",
    "Circular",
    "4-Panel",
    "Baffled (Q-Bag)",
  ] as Construction[],
  swl: [2200, 3000, 4000] as number[],
  use: ["Food Grade", "UN Certified", "Conductive"] as const,
};
