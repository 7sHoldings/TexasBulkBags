export type TopStyle = "Duffle Top" | "Spout Top" | "Open Top";
export type BottomStyle = "Spout Bottom" | "Flat Bottom" | "Full-Open Bottom";
export type Construction = "U-Panel" | "Circular" | "4-Panel" | "Baffled (Q-Bag)";
export type StaticType = "Type A" | "Type B" | "Type C" | "Type D";

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: string; // category slug
  shortDescription: string;
  description: string;
  badge?: "In Stock" | "Best Seller" | "Made to Order";
  inStock: boolean;
  dimensions: string;
  baseFootprint: number;
  swl: number; // SWL @ 5:1
  swl6?: number; // SWL @ 6:1
  volumeFt3?: number;
  volumeM3?: number;
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
  priceFrom: number;
  image?: string;
};

/** Configuration options shared across all bag categories. */
export const bagOptions = {
  topOptions: ["Open Top", "Duffle Top", "Spout Top", "Fill Spout Top"],
  bottomOptions: [
    "Flat Bottom",
    "Discharge Spout",
    "Conical Bottom",
    "Discharge Spout with Flap",
  ],
  loopOptions: [
    "Corner Loops",
    "Cross-Corner Loops",
    "U-Panel Loops",
    "Sleeve Lift",
    "Tunnel Lift",
  ],
  linerOptions: ["No Liner", "Loose PE Liner", "Form-Fit Liner", "Aluminized Liner"],
  printingOptions: [
    "Unprinted",
    "1 Color Print",
    "2 Color Print",
    "Full Color Print",
  ],
  fabricOptions: [
    "100% Virgin Polypropylene",
    "Coated / Uncoated",
    "UV Treated",
    "Anti-Slip Available",
  ],
  safetyFactors: ["5:1 Standard", "6:1 Heavy Duty"],
};

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  blurb: string;
  priceMin: number;
  priceMax: number;
  priceUnit?: string; // e.g. "/ bag"
  flyer: string;
  skuPrefix: string;
  construction: Construction;
  foodGrade: boolean;
  baffled: boolean;
  staticType?: StaticType;
  unCertified?: boolean;
  safetyFactor?: "5:1" | "6:1";
  materials: string[];
  benefits: { title: string; description: string }[];
  /** "fibc" = sized SKUs with the standard size grid; "woven" = spec-to-quote. */
  productType?: "fibc" | "woven";
  /** When true, products use real photos at /products/<slug>.png. */
  hasPhotos?: boolean;
  /** For woven/spec-to-quote categories. */
  specs?: { label: string; value: string }[];
  widthOptions?: string[];
};

export const categories: Category[] = [
  {
    slug: "standard-fibc",
    name: "Standard FIBC Bulk Bags",
    shortName: "Standard FIBC",
    tagline: "Versatile. Strong. Reliable.",
    blurb:
      "Designed for a wide range of industries and materials. Available in multiple configurations, sizes, and options to meet your every need.",
    priceMin: 10.95,
    priceMax: 21.95,
    flyer: "/categories/standard-fibc.jpg",
    skuPrefix: "STD",
    hasPhotos: true,
    construction: "U-Panel",
    foodGrade: false,
    baffled: false,
    materials: [
      "Sand",
      "Gravel",
      "Cement",
      "Soil",
      "Minerals",
      "Fertilizer",
      "Plastic Resin",
      "Chemicals",
      "Grains",
      "Powders",
      "Feed",
    ],
    benefits: [
      { title: "High-Quality Polypropylene", description: "UV-treated for long-lasting strength." },
      { title: "Safe & Reliable", description: "SWL tested to a 5:1 (6:1 heavy-duty) safety factor." },
      { title: "Customizable", description: "Multiple sizes, loops, liners, and printing options." },
      { title: "Cost Efficient", description: "Durable design for repeated use and lower cost." },
    ],
  },
  {
    slug: "baffle-q-bags",
    name: "Baffle Q-Bags",
    shortName: "Baffle Q-Bag",
    tagline: "Maximize Volume. Reduce Costs.",
    blurb:
      "Internal baffles keep the bag square during filling and transport — up to 30% more volume per footprint, better stacking, and greater pallet efficiency.",
    priceMin: 15.95,
    priceMax: 21.95,
    flyer: "/categories/baffle-q-bags.jpg",
    skuPrefix: "BAF",
    hasPhotos: true,
    construction: "Baffled (Q-Bag)",
    foodGrade: false,
    baffled: true,
    materials: ["Chemicals", "Plastics Resin", "Powders", "Food Ingredients", "Agricultural Products"],
    benefits: [
      { title: "Maintains Square Shape", description: "Internal baffles maximize space utilization." },
      { title: "Up to 30% More Volume", description: "More volume per footprint reduces cost per bag." },
      { title: "Better Stacking", description: "Enhanced stability for safer stacking and handling." },
      { title: "Strong & Durable", description: "High-quality polypropylene built for heavy loads." },
    ],
  },
  {
    slug: "food-grade-clean-room-fibc",
    name: "Food Grade Clean Room FIBC",
    shortName: "Food-Grade FIBC",
    tagline: "Clean. Safe. Certified.",
    blurb:
      "Manufactured in a clean-room environment to ensure the highest level of purity and safety for food, grain, feed, and other sensitive products. Food-contact safe, compliant with FDA standards.",
    priceMin: 17.95,
    priceMax: 27.95,
    flyer: "/categories/food-grade-clean-room-fibc.jpg",
    skuPrefix: "FG",
    hasPhotos: true,
    construction: "U-Panel",
    foodGrade: true,
    baffled: false,
    materials: ["Food", "Grain", "Feed", "Ingredients", "Flour / Rice", "Sugar / Salt"],
    benefits: [
      { title: "Food Grade & Safe", description: "100% virgin polypropylene, safe for direct food contact." },
      { title: "Clean Room Manufactured", description: "Produced in a controlled environment to minimize contamination." },
      { title: "High Purity & Hygiene", description: "Low-lint, dust-free, and non-contaminating." },
      { title: "Available with Liners", description: "PE, aluminum, and form-fit liners for extra protection." },
    ],
  },
  {
    slug: "type-c-conductive-fibc",
    name: "Type C Conductive FIBC",
    shortName: "Type C Conductive",
    tagline: "Static Protection. Safe Handling.",
    blurb:
      "Conductive yarns woven into the fabric allow charge to dissipate when the bag is properly grounded — ideal for handling and transporting combustible powders in environments where static control is critical.",
    priceMin: 24.95,
    priceMax: 34.95,
    flyer: "/categories/type-c-conductive-fibc.jpg",
    skuPrefix: "TC",
    hasPhotos: true,
    construction: "U-Panel",
    foodGrade: false,
    baffled: false,
    staticType: "Type C",
    safetyFactor: "5:1",
    materials: [
      "Chemicals",
      "Pharmaceutical Ingredients",
      "Plastic Resins",
      "Powder Processing",
      "Pigments",
      "Food Ingredients",
    ],
    benefits: [
      { title: "Groundable Type C FIBC", description: "Designed to safely dissipate electrostatic charges." },
      { title: "Conductive Yarns", description: "A grid of conductive threads woven into the fabric." },
      { title: "For Combustible Powders", description: "Built for flammable and explosive atmospheres when grounded." },
      { title: "Strong & Durable", description: "High-quality polypropylene for heavy loads and repeated use." },
    ],
  },
  {
    slug: "un-certified-hazmat-bags",
    name: "UN-Certified Hazmat Bags",
    shortName: "UN-Certified Hazmat",
    tagline: "Safe Transport. Trusted Protection.",
    blurb:
      "Rigorously tested and manufactured to meet UN performance standards for the safe transport and storage of hazardous materials. Reliable, durable, and compliant.",
    priceMin: 21.95,
    priceMax: 34.95,
    flyer: "/categories/un-certified-hazmat-bags.jpg",
    skuPrefix: "UN",
    hasPhotos: true,
    construction: "U-Panel",
    foodGrade: false,
    baffled: false,
    unCertified: true,
    safetyFactor: "6:1",
    materials: [
      "Hazardous Waste",
      "Chemical Powders",
      "Contaminated Soil",
      "Industrial Byproducts",
      "Paint & Coatings",
      "Environmental Remediation",
    ],
    benefits: [
      { title: "UN Certified & Tested", description: "Manufactured and tested to UN performance standards." },
      { title: "6:1 Safety Factor", description: "Rated for maximum safety and reliability." },
      { title: "Leak-Resistant Options", description: "PE liners and coatings prevent leaks and contamination." },
      { title: "Hazardous Material Compliant", description: "Designed for hazardous and regulated materials." },
    ],
  },
  {
    slug: "pp-woven-bags",
    name: "PP / HDPE Woven & Laminated Bags",
    shortName: "PP Woven Bag",
    tagline: "Strong. Reliable. Cost Effective.",
    blurb:
      "Highly durable, versatile woven polypropylene bags and sacks for immense packaging applications. Tear-resistant, high tensile strength, with superior barrier properties when laminated.",
    priceMin: 0.18,
    priceMax: 1.2,
    priceUnit: "/ bag",
    flyer: "/categories/pp-woven-bags.jpg",
    skuPrefix: "PPW",
    construction: "U-Panel",
    foodGrade: false,
    baffled: false,
    productType: "woven",
    materials: [
      "Animal Feed",
      "Chemical & Fertilizer",
      "Flour",
      "Sand",
      "Seed",
      "Sugar",
      "Spices",
    ],
    benefits: [
      { title: "Highly Durable & Versatile", description: "Premium woven polypropylene for long-lasting performance." },
      { title: "Tear Resistant", description: "Resistant to tears and punctures to reduce losses." },
      { title: "High Tensile Strength", description: "Engineered for strength and durability under heavy loads." },
      { title: "Superior Barrier (Laminated)", description: "Lamination options for moisture and dust protection." },
    ],
    specs: [
      { label: "Width", value: '16" – 36" (40–90 cm)' },
      { label: "GSM", value: "40 – 100" },
      { label: "Mesh", value: "8×8 to 15×15" },
      { label: "Denier", value: "400D – 1100D" },
      { label: "Color", value: "As per requirement" },
      { label: "UV Stabilized", value: "As per requirement" },
      { label: "Lamination", value: "None / single-side / both-side" },
    ],
    widthOptions: ['16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"', '34"', '36"'],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

type SizeRow = {
  l: number;
  w: number;
  h: number;
  swl: number;
  swl6: number;
  ft3: number;
  m3: number;
  price: number;
  badge?: Product["badge"];
};

const standardSizes: SizeRow[] = [
  { l: 35, w: 35, h: 39, swl: 2200, swl6: 2600, ft3: 28, m3: 0.79, price: 10.95, badge: "In Stock" },
  { l: 35, w: 35, h: 47, swl: 2600, swl6: 3100, ft3: 33, m3: 0.93, price: 11.95, badge: "Best Seller" },
  { l: 39, w: 39, h: 39, swl: 2650, swl6: 3200, ft3: 35, m3: 0.99, price: 12.5 },
  { l: 35, w: 35, h: 59, swl: 3300, swl6: 4000, ft3: 41, m3: 1.16, price: 13.5 },
  { l: 39, w: 39, h: 51, swl: 3300, swl6: 4000, ft3: 46, m3: 1.3, price: 14.5 },
  { l: 42, w: 42, h: 42, swl: 3300, swl6: 4000, ft3: 48, m3: 1.36, price: 14.95, badge: "Best Seller" },
  { l: 35, w: 35, h: 78, swl: 3300, swl6: 4000, ft3: 55, m3: 1.56, price: 15.95 },
  { l: 44, w: 44, h: 44, swl: 4000, swl6: 4800, ft3: 57, m3: 1.61, price: 16.95 },
  { l: 42, w: 42, h: 54, swl: 4400, swl6: 5300, ft3: 63, m3: 1.78, price: 18.5 },
  { l: 45, w: 45, h: 45, swl: 4400, swl6: 5300, ft3: 65, m3: 1.84, price: 18.95 },
  { l: 48, w: 48, h: 48, swl: 5000, swl6: 6000, ft3: 80, m3: 2.26, price: 21.95 },
];

const baffleSizes: SizeRow[] = [
  { l: 35, w: 35, h: 39, swl: 2200, swl6: 2600, ft3: 28, m3: 0.79, price: 15.95, badge: "Best Seller" },
  { l: 35, w: 35, h: 47, swl: 2600, swl6: 3100, ft3: 33, m3: 0.93, price: 16.95 },
  { l: 39, w: 39, h: 51, swl: 3300, swl6: 4000, ft3: 46, m3: 1.3, price: 18.5 },
  { l: 42, w: 42, h: 42, swl: 3300, swl6: 4000, ft3: 48, m3: 1.36, price: 18.95 },
  { l: 42, w: 42, h: 54, swl: 4400, swl6: 5300, ft3: 63, m3: 1.78, price: 20.5 },
  { l: 48, w: 48, h: 48, swl: 5000, swl6: 6000, ft3: 80, m3: 2.26, price: 21.95 },
];

const foodGradeSizes: SizeRow[] = [
  { l: 35, w: 35, h: 39, swl: 2200, swl6: 2600, ft3: 28, m3: 0.79, price: 17.95, badge: "Best Seller" },
  { l: 35, w: 35, h: 47, swl: 2600, swl6: 3100, ft3: 33, m3: 0.93, price: 19.95 },
  { l: 39, w: 39, h: 51, swl: 3300, swl6: 4000, ft3: 46, m3: 1.3, price: 22.95 },
  { l: 42, w: 42, h: 42, swl: 3300, swl6: 4000, ft3: 48, m3: 1.36, price: 23.95 },
  { l: 42, w: 42, h: 54, swl: 4400, swl6: 5300, ft3: 63, m3: 1.78, price: 25.95 },
  { l: 48, w: 48, h: 48, swl: 5000, swl6: 6000, ft3: 80, m3: 2.26, price: 27.95 },
];

const typeCSizes: SizeRow[] = [
  { l: 35, w: 35, h: 39, swl: 2200, swl6: 2600, ft3: 28, m3: 0.79, price: 24.95, badge: "Best Seller" },
  { l: 35, w: 35, h: 47, swl: 2600, swl6: 3100, ft3: 33, m3: 0.93, price: 26.95 },
  { l: 39, w: 39, h: 51, swl: 3300, swl6: 4000, ft3: 46, m3: 1.3, price: 28.95 },
  { l: 42, w: 42, h: 42, swl: 3300, swl6: 4000, ft3: 48, m3: 1.36, price: 30.95 },
  { l: 42, w: 42, h: 54, swl: 4400, swl6: 5300, ft3: 63, m3: 1.78, price: 32.95 },
  { l: 48, w: 48, h: 48, swl: 5000, swl6: 6000, ft3: 80, m3: 2.26, price: 34.95 },
];

const unSizes: SizeRow[] = [
  { l: 35, w: 35, h: 39, swl: 2200, swl6: 2600, ft3: 28, m3: 0.79, price: 21.95, badge: "Best Seller" },
  { l: 35, w: 35, h: 47, swl: 2600, swl6: 3100, ft3: 33, m3: 0.93, price: 24.95 },
  { l: 39, w: 39, h: 51, swl: 3300, swl6: 4000, ft3: 46, m3: 1.3, price: 27.95 },
  { l: 42, w: 42, h: 42, swl: 3300, swl6: 4000, ft3: 48, m3: 1.36, price: 29.95 },
  { l: 42, w: 42, h: 54, swl: 4400, swl6: 5300, ft3: 63, m3: 1.78, price: 32.95 },
  { l: 48, w: 48, h: 48, swl: 5000, swl6: 6000, ft3: 80, m3: 2.26, price: 34.95 },
];

function buildProducts(cat: Category, sizes: SizeRow[]): Product[] {
  return sizes.map((s) => {
    const dims = `${s.l}" × ${s.w}" × ${s.h}"`;
    const slug = `${cat.slug}-${s.l}x${s.w}x${s.h}`;
    return {
      slug,
      image: cat.hasPhotos ? `/products/${slug}.png` : undefined,
      sku: `TBB-${cat.skuPrefix}-${s.l}${s.w}-${s.h}`,
      name: `${cat.shortName} ${s.l}×${s.w}×${s.h}"`,
      category: cat.slug,
      shortDescription: `${dims} ${cat.shortName} — ${s.swl.toLocaleString()} lb SWL (5:1), ${s.ft3} ft³.`,
      description: cat.blurb,
      badge: s.badge,
      inStock: true,
      dimensions: dims,
      baseFootprint: s.w,
      swl: s.swl,
      swl6: s.swl6,
      volumeFt3: s.ft3,
      volumeM3: s.m3,
      safetyFactor: cat.safetyFactor ?? "5:1",
      construction: cat.construction,
      topStyle: "Duffle Top",
      bottomStyle: "Spout Bottom",
      staticType: cat.staticType ?? "Type A",
      fabric: cat.foodGrade
        ? "100% virgin food-grade polypropylene (clean-room)"
        : cat.staticType === "Type C"
          ? "100% virgin polypropylene with conductive yarns"
          : "100% virgin woven polypropylene (coated or uncoated)",
      coated: false,
      baffled: cat.baffled,
      foodGrade: cat.foodGrade,
      unCertified: cat.unCertified ?? false,
      liftLoops: "Cross-corner (corner, U-panel, sleeve & tunnel available)",
      uvProtection: "UV-treated",
      priceFrom: s.price,
    };
  });
}

export const products: Product[] = [
  ...buildProducts(categories[0], standardSizes),
  ...buildProducts(categories[1], baffleSizes),
  ...buildProducts(categories[2], foodGradeSizes),
  ...buildProducts(categories[3], typeCSizes),
  ...buildProducts(categories[4], unSizes),
  // categories[5] (PP woven) is spec-to-quote — no size SKUs.
];

export function productsInCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 4): Product[] {
  const current = getProduct(slug);
  const sameCat = products.filter(
    (p) => p.slug !== slug && p.category === current?.category,
  );
  const others = products.filter(
    (p) => p.slug !== slug && p.category !== current?.category,
  );
  return [...sameCat, ...others].slice(0, count);
}

// Used by the custom quote form.
export const facets = {
  construction: ["U-Panel", "Circular", "4-Panel", "Baffled (Q-Bag)"] as Construction[],
};
