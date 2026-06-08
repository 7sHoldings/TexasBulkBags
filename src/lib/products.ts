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
  flyer: string;
  skuPrefix: string;
  construction: Construction;
  foodGrade: boolean;
  baffled: boolean;
  materials: string[];
  benefits: { title: string; description: string }[];
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

function buildProducts(cat: Category, sizes: SizeRow[]): Product[] {
  return sizes.map((s) => {
    const dims = `${s.l}" × ${s.w}" × ${s.h}"`;
    return {
      slug: `${cat.slug}-${s.l}x${s.w}x${s.h}`,
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
      safetyFactor: "5:1",
      construction: cat.construction,
      topStyle: "Duffle Top",
      bottomStyle: "Spout Bottom",
      staticType: "Type A",
      fabric: cat.foodGrade
        ? "100% virgin food-grade polypropylene (clean-room)"
        : "100% virgin woven polypropylene (coated or uncoated)",
      coated: false,
      baffled: cat.baffled,
      foodGrade: cat.foodGrade,
      unCertified: false,
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
