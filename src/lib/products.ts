export type TopStyle = "Duffle Top" | "Spout Top" | "Open Top";
export type BottomStyle = "Spout Bottom" | "Flat Bottom" | "Full-Open Bottom";
export type Construction = "U-Panel" | "Circular" | "4-Panel" | "Baffled (Q-Bag)";
export type StaticType = "Type A" | "Type B" | "Type C" | "Type D";

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  badge?: "In Stock" | "Best Seller" | "Made to Order";
  inStock: boolean;
  dimensions: string; // L x W x H, inches
  baseFootprint: number; // inches (width/depth)
  swl: number; // safe working load @ 5:1, lbs
  swl6?: number; // safe working load @ 6:1, lbs
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
  priceFrom: number; // per unit USD
  /** Optional real photo (e.g. "/products/standard-fibc-35x35x39.jpg").
   *  Falls back to an illustrated placeholder when omitted. */
  image?: string;
};

/** Shared option lists for the Standard FIBC Bulk Bag line. */
export const standardFibc = {
  tagline: "Versatile. Strong. Reliable.",
  priceMin: 10.95,
  priceMax: 21.95,
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
  linerOptions: [
    "No Liner",
    "Loose PE Liner",
    "Form-Fit Liner",
    "Aluminized Liner",
  ],
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
};

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

// Real Standard FIBC size chart (price range $10.95–$21.95).
const sizes: SizeRow[] = [
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

export const products: Product[] = sizes.map((s) => {
  const dims = `${s.l}" × ${s.w}" × ${s.h}"`;
  return {
    slug: `standard-fibc-${s.l}x${s.w}x${s.h}`,
    sku: `TBB-${s.l}${s.w}-${s.h}`,
    name: `Standard FIBC ${s.l}×${s.w}×${s.h}"`,
    category: "Standard FIBC Bulk Bags",
    shortDescription: `${dims} U-panel bulk bag — ${s.swl.toLocaleString()} lb SWL (5:1), ${s.ft3} ft³.`,
    description:
      "Versatile, strong, and reliable 100% virgin polypropylene FIBC built for a wide range of industries and materials. UV-treated for long-lasting strength, with multiple top, bottom, loop, liner, and printing options available. Tested to a 5:1 safety factor (6:1 heavy-duty available).",
    badge: s.badge,
    inStock: true,
    dimensions: dims,
    baseFootprint: s.w,
    swl: s.swl,
    swl6: s.swl6,
    volumeFt3: s.ft3,
    volumeM3: s.m3,
    safetyFactor: "5:1",
    construction: "U-Panel",
    topStyle: "Duffle Top",
    bottomStyle: "Spout Bottom",
    staticType: "Type A",
    fabric: "100% virgin woven polypropylene (coated or uncoated)",
    coated: false,
    baffled: false,
    foodGrade: false,
    unCertified: false,
    liftLoops: "Cross-corner (corner, U-panel, sleeve & tunnel available)",
    uvProtection: "UV-treated",
    priceFrom: s.price,
  };
});

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}

// Facet option lists.
export const facets = {
  // Minimum Safe Working Load (5:1) thresholds.
  capacity: [2200, 3300, 4400] as number[],
  // Bag width / footprint (inches).
  footprint: [35, 39, 42, 44, 45, 48] as number[],
  // Used by the custom quote form.
  construction: [
    "U-Panel",
    "Circular",
    "4-Panel",
    "Baffled (Q-Bag)",
  ] as Construction[],
};
