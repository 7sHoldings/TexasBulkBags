export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMinutes: number;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "how-to-choose-an-fibc-bulk-bag",
    title: "How to Choose the Right FIBC Bulk Bag",
    excerpt:
      "A practical buyer's guide to selecting the correct construction, top and bottom style, and safe working load for your material.",
    category: "Buying Guide",
    date: "2026-05-12",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "Choosing an FIBC (flexible intermediate bulk container) comes down to a handful of decisions: how the bag is built, how you fill and empty it, how much weight it must carry safely, and whether your material has special requirements like food-grade or static control.",
      },
      { type: "h2", text: "1. Construction style" },
      {
        type: "p",
        text: "Construction determines how the bag holds its shape and how it handles stress under load.",
      },
      {
        type: "ul",
        items: [
          "U-Panel: two fabric panels sewn to a base panel — the cost-effective industry standard.",
          "Circular (tubular): woven as a tube with no vertical seams, reducing sift for fine powders.",
          "4-Panel: four side panels for a square, stable shape that stacks well.",
          "Baffle (Q-bag): internal baffles keep the bag square and add up to 30% more volume per footprint.",
        ],
      },
      { type: "h2", text: "2. Top and bottom style" },
      {
        type: "p",
        text: "Match the openings to how you fill and discharge. Duffle tops fill fast; spout tops control dust. Spout bottoms meter discharge; flat bottoms suit one-time use; full-open bottoms dump quickly.",
      },
      { type: "h2", text: "3. Safe Working Load and safety factor" },
      {
        type: "p",
        text: "Safe Working Load (SWL) is the maximum weight the bag is rated to carry. The safety factor (e.g. 5:1 for single-trip, 6:1 for multi-trip or UN-rated) is the ratio of the bag's tested break strength to its SWL. Always size SWL above your target payload — use our dimension calculator to confirm height and volume.",
      },
      { type: "h2", text: "4. Material-specific requirements" },
      {
        type: "ul",
        items: [
          "Food or pharma: clean-room manufactured, food-grade fabric, optional liners.",
          "Combustible powders: Type C (groundable) or Type D (dissipative) static control.",
          "Hazardous materials: UN-certified bags with documented testing.",
          "Outdoor storage: UV-stabilized fabric to resist degradation.",
        ],
      },
      {
        type: "p",
        text: "Still unsure? Send us your material and target payload and our team will spec a bag for you.",
      },
    ],
  },
  {
    slug: "understanding-fibc-static-types",
    title: "FIBC Static Types A, B, C & D Explained",
    excerpt:
      "Handling powders or flammable atmospheres? Here's how the four FIBC static-control types differ and when to use each.",
    category: "Safety",
    date: "2026-04-03",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "Filling and emptying bulk bags generates static electricity. In the wrong environment, a static discharge can ignite combustible dust or flammable vapors. FIBCs are classified into four types based on how they manage that risk.",
      },
      { type: "h2", text: "Type A" },
      {
        type: "p",
        text: "Standard woven polypropylene with no static protection. Suitable only for non-flammable products in environments with no flammable solvents or dust present.",
      },
      { type: "h2", text: "Type B" },
      {
        type: "p",
        text: "Made from low-breakdown-voltage fabric that prevents dangerous propagating brush discharges. Type B bags can be used with combustible dusts, but not where flammable solvents or gases are present.",
      },
      { type: "h2", text: "Type C" },
      {
        type: "p",
        text: "Conductive (groundable) bags woven with a grid of conductive threads. They must be electrically connected to ground during filling and discharge. Safe for combustible dusts and flammable atmospheres — as long as the ground connection is verified every time.",
      },
      { type: "h2", text: "Type D" },
      {
        type: "p",
        text: "Antistatic / dissipative fabric that safely neutralizes static without a ground connection. Ideal where reliable grounding can't be guaranteed.",
      },
      {
        type: "ul",
        items: [
          "No flammables, non-combustible product → Type A",
          "Combustible dust, no flammable vapors → Type B",
          "Flammable atmosphere, grounding available → Type C",
          "Flammable atmosphere, grounding unreliable → Type D",
        ],
      },
    ],
  },
  {
    slug: "fibc-safe-handling-best-practices",
    title: "Safe Handling Best Practices for Bulk Bags",
    excerpt:
      "Lifting, filling, stacking, and storing FIBCs safely — the fundamentals every operation should follow.",
    category: "Operations",
    date: "2026-03-18",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "A bulk bag is only as safe as the way it's handled. These fundamentals protect both your team and your product.",
      },
      { type: "h2", text: "Lifting" },
      {
        type: "ul",
        items: [
          "Lift all loops simultaneously and keep them vertical.",
          "Never drag, swing, or lift a bag by a single loop.",
          "Use equipment rated above the bag's gross weight.",
          "Keep personnel clear from beneath a suspended bag.",
        ],
      },
      { type: "h2", text: "Filling" },
      {
        type: "p",
        text: "Fill on a level surface, keep the bag upright and square, and don't exceed the rated Safe Working Load. Leave appropriate freeboard so the top can be closed and the bag remains stable.",
      },
      { type: "h2", text: "Stacking and storage" },
      {
        type: "ul",
        items: [
          "Only stack bags rated and shaped for stacking (baffle bags stack best).",
          "Store out of direct sunlight unless the fabric is UV-stabilized.",
          "Inspect for cuts, abrasion, or UV degradation before reuse.",
          "Reuse only multi-trip bags rated with a 6:1 safety factor.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
