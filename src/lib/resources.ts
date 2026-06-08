export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "What is an FIBC bulk bag?",
    a: "An FIBC (Flexible Intermediate Bulk Container) — also called a bulk bag, super sack, or tote bag — is a large woven polypropylene bag used to store and transport dry, flowable products such as sand, grain, chemicals, and aggregates. Most hold between 1,000 and 4,000 lbs.",
  },
  {
    q: "What does Safe Working Load (SWL) mean?",
    a: "Safe Working Load is the maximum weight a bag is rated to carry safely. It is paired with a safety factor (for example 5:1 or 6:1), which is the ratio of the bag's tested break strength to its SWL. Always choose an SWL above your target payload.",
  },
  {
    q: "What is the difference between 5:1 and 6:1 safety factors?",
    a: "A 5:1 safety factor is rated for single-trip use, while 6:1 is rated for multi-trip use and is typically required for UN-certified bags carrying hazardous materials. The number is how many times the bag's break strength exceeds its rated load.",
  },
  {
    q: "Do you offer custom sizes and printing?",
    a: "Yes. We manufacture custom dimensions, construction styles, liners, certifications, and multi-color printing. Submit a custom quote with your specifications and our engineering team will respond within 24 business hours.",
  },
  {
    q: "How are bulk bags shipped?",
    a: "Bulk bags typically ship compressed in bales on pallets via LTL freight. In-stock items usually ship within 1–2 business days from our Kerens, Texas facility. Freight is quoted with your order based on quantity and destination.",
  },
  {
    q: "Can bulk bags be reused?",
    a: "Only bags rated for multi-trip use (6:1 safety factor) should be reused, and only after inspection for cuts, abrasion, and UV degradation. Single-trip (5:1) bags should not be reused.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Minimums vary by product. Many stock configurations are available by the pallet, while custom bags have per-run minimums. Contact us or request a quote for specifics on the bag you need.",
  },
  {
    q: "Are food-grade bulk bags available?",
    a: "Yes. Our food-grade FIBCs are manufactured in certified clean rooms from FDA-compliant fabric, with optional PE liners, for grains, sugar, flour, and food ingredients.",
  },
];

export type GlossaryTerm = { term: string; definition: string };

export const glossary: GlossaryTerm[] = [
  { term: "Baffle (Q-Bag)", definition: "Internal fabric panels sewn across each corner so the bag holds a square shape when filled, increasing usable volume by up to 30% per footprint." },
  { term: "Circular / Tubular", definition: "Fabric woven as a continuous tube with no vertical side seams, reducing stress points and product sift — ideal for fine powders." },
  { term: "Coated Fabric", definition: "Polypropylene laminated with a film coating to make the weave moisture- and sift-resistant for fine or hygroscopic materials." },
  { term: "Duffle Top", definition: "A skirt of fabric around the full top opening that is tied closed after filling — allows fast, open filling." },
  { term: "FIBC", definition: "Flexible Intermediate Bulk Container; the technical name for a bulk bag or super sack." },
  { term: "Lift Loops", definition: "Reinforced fabric loops at the corners used to lift the bag with a forklift or crane. Configurations include corner, cross-corner, and stevedore loops." },
  { term: "Liner", definition: "An inner bag (often polyethylene) that adds a moisture or contamination barrier, or a form-fit shape for fine powders." },
  { term: "Safe Working Load (SWL)", definition: "The maximum weight a bag is rated to carry safely under normal handling." },
  { term: "Safety Factor", definition: "The ratio of a bag's tested break strength to its SWL — typically 5:1 (single-trip) or 6:1 (multi-trip / UN-rated)." },
  { term: "Spout", definition: "A tubular fabric opening at the top (fill spout) or bottom (discharge spout) for controlled, dust-reduced filling or emptying." },
  { term: "Static Type (A/B/C/D)", definition: "Classification of a bag's static-control properties, from Type A (no protection) to Type C (groundable) and Type D (dissipative)." },
  { term: "U-Panel", definition: "Construction in which two fabric panels are sewn to a base panel, forming a U — the cost-effective industry standard." },
  { term: "UN Certified", definition: "A bag tested and certified to transport UN-rated hazardous materials, supplied with documented test reports." },
  { term: "Uncoated Fabric", definition: "Breathable woven polypropylene without a film coating, suited to coarse or granular products that benefit from ventilation." },
];

export type GuideSection = { heading: string; body: string; points?: string[] };

export const foodSafetyGuide: GuideSection[] = [
  {
    heading: "Why food-grade matters",
    body: "When bulk bags carry food, feed, or pharmaceutical ingredients, the container itself must not introduce contamination. Food-grade FIBCs are manufactured and handled to standards that protect product purity from production through transport.",
  },
  {
    heading: "Clean-room manufacturing",
    body: "Food-grade bags are produced in certified clean rooms that control airborne particulates, insects, and loose thread. Virgin (not recycled) polypropylene resin is used so no unknown materials contact your product.",
  },
  {
    heading: "Liners and barriers",
    body: "Many food applications add an inner liner for an extra contamination and moisture barrier.",
    points: [
      "Polyethylene (PE) liners for a basic moisture and sift barrier",
      "Foil / barrier liners for oxygen- and moisture-sensitive ingredients",
      "Form-fit liners that hold shape for free-flowing powders",
    ],
  },
  {
    heading: "Certifications to look for",
    body: "Reputable food-grade FIBC supply is backed by documented quality systems. Common standards include AIB, BRCGS, and ISO 9001 manufacturing, along with full traceability and certificates of analysis (COA) on request.",
  },
  {
    heading: "Safe handling for food products",
    body: "Maintaining food safety continues after manufacturing.",
    points: [
      "Store bags sealed and off the floor in a clean, dry area",
      "Keep tops closed and liners sealed until filling and after",
      "Inspect each bag and liner for damage before use",
      "Use single-trip bags once; never reuse food-grade bags across products",
    ],
  },
];
