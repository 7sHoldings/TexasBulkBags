export type Industry = {
  slug: string;
  name: string;
  icon: string; // Material Symbols name
  summary: string;
  bags: string[];
  uses: string[];
};

export const industries: Industry[] = [
  {
    slug: "agriculture",
    name: "Agriculture",
    icon: "agriculture",
    summary:
      "Bulk handling for seeds, grain, feed, fertilizer, and dried produce with food-safe options.",
    bags: ["U-Panel Duffle Top", "Circular Duffle Top", "Food-Grade FIBC"],
    uses: ["Seed & grain storage", "Fertilizer transport", "Feed handling"],
  },
  {
    slug: "construction",
    name: "Construction & Mining",
    icon: "construction",
    summary:
      "Rugged, UV-stabilized bags for aggregates, sand, soil, and jobsite debris.",
    bags: ["Open Top / Flat Bottom", "U-Panel Spout Top", "Baffle Q-Bag"],
    uses: ["Sand & aggregates", "Debris removal", "Soil & mulch"],
  },
  {
    slug: "chemical",
    name: "Chemical Manufacturing",
    icon: "science",
    summary:
      "Coated, conductive, and UN-rated bags engineered for powders and regulated materials.",
    bags: ["Type C Conductive FIBC", "UN-Certified HAZMAT Bag", "Circular Duffle Top"],
    uses: ["Combustible powders", "HAZMAT transport", "Resin & pellets"],
  },
  {
    slug: "food",
    name: "Food & Ingredients",
    icon: "restaurant",
    summary:
      "Clean-room manufactured, FDA-compliant bags with liners for ingredient handling.",
    bags: ["Food-Grade Clean-Room FIBC", "Circular Duffle Top"],
    uses: ["Sugar & flour", "Grains & starches", "Food additives"],
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    icon: "oil_barrel",
    summary:
      "High-capacity bags for proppants, drilling minerals, and field material handling.",
    bags: ["U-Panel Spout Top", "Baffle Q-Bag", "UN-Certified HAZMAT Bag"],
    uses: ["Frac sand & proppants", "Drilling minerals", "Cuttings disposal"],
  },
  {
    slug: "waste",
    name: "Waste Management",
    icon: "recycling",
    summary:
      "Heavy-duty containment for recyclables, contaminated soil, and bulk waste.",
    bags: ["Open Top / Flat Bottom", "U-Panel Duffle Top"],
    uses: ["Recyclables", "Contaminated soil", "Industrial waste"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
