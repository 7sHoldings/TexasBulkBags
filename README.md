# Texas Bulk Bags

Industrial FIBC bulk-bag catalog and lead-generation site for **Texas Bulk
Bags** (Kerens, TX). Built with **Next.js (App Router) + TypeScript + Tailwind
CSS v4**, implementing the **"Industrial Integrity"** design system (navy +
safety-red, Hanken Grotesk / Inter, Material Symbols).

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the local development server   |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Pages

| Route                | Description                                              |
| -------------------- | ------------------------------------------------------- |
| `/`                  | Home — hero, trust bar, core configurations, best sellers, industries, custom-quote CTA |
| `/products`          | Catalog with faceted filters (top style, construction, SWL, specialty), sort, active chips |
| `/products/[slug]`   | Product detail — gallery, spec table, add-to-quote-list, request bulk quote (SSG, JSON-LD) |
| `/industries`        | Industries served with recommended bags                 |
| `/calculator`        | FIBC dimension calculator (live height/volume from density + payload) |
| `/custom-quote`      | Multi-section custom quote request form (prefills from a product) |
| `/quote-list`        | Saved bags → submit a consolidated volume-quote request |
| `/about`             | Company story, stats, certifications, contact           |
| `/api/quote`         | Validates and captures all quote/contact submissions     |

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Fonts, header/footer, cart provider, SEO
│   ├── globals.css           # Design tokens (Industrial Integrity) + utilities
│   ├── page.tsx              # Home
│   ├── products/             # Catalog + [slug] detail
│   ├── industries/ about/ calculator/ custom-quote/ quote-list/
│   └── api/quote/route.ts    # Lead handler (honeypot + validation)
├── components/
│   ├── Header / Footer / NewsletterForm / ProductCard / CartProvider
│   ├── ui/                   # Button, Icon, ProductImage, SectionHeading
│   ├── catalog/ product/ quote/ calculator/
└── lib/
    ├── site.ts               # Company info, nav, certifications
    ├── products.ts           # Catalog data model + facets
    └── industries.ts         # Industries data
```

## Content & data

- **Company info / nav** — `src/lib/site.ts`
- **Products (SKUs, specs, prices)** — `src/lib/products.ts` (currently realistic
  sample data; replace with the real SKU/price list)
- **Industries** — `src/lib/industries.ts`

## Quote handling

All forms (custom quote, quote-list, contact) POST to `/api/quote`, which
validates name + email, drops honeypot spam, and logs the lead. **To deliver
leads to `info@texasbulkbags.com`**, wire an email/CRM provider (Resend,
SendGrid, HubSpot) where the `TODO` is marked in
`src/app/api/quote/route.ts`.

## Not yet wired (next steps)

- Real product photography (placeholders are in place)
- Logo asset (currently a wordmark)
- Email/CRM delivery for leads
- Online payments / checkout (Phase 2 — see `docs/REQUIREMENTS.md`)

See [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) for full scope and phasing.
