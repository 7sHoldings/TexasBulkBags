# Texas Bulk Bags

Marketing / lead-generation website for **Texas Bulk Bags**, a Texas-based
supplier of FIBC bulk bags (super sacks) for agriculture, construction, and
industrial use.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, and
Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the local development server   |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
src/
├── app/
│   ├── api/quote/route.ts   # Quote-request form handler
│   ├── layout.tsx           # Root layout, header/footer, SEO metadata
│   ├── page.tsx             # Home page (assembles sections)
│   └── globals.css          # Tailwind + brand design tokens
├── components/              # Header, Footer, Hero, Products, Features,
│                            # About, QuoteForm
└── lib/site.ts              # Central site content (nav, products, contact)
```

## Editing content

Most site copy — navigation, products, features, and contact details — lives in
[`src/lib/site.ts`](src/lib/site.ts). Update that file to change what appears on
the page without touching component markup.

## Quote form

The "Request a Quote" form posts to `POST /api/quote`. The handler validates the
submission and currently logs the lead to the server console. To deliver leads,
integrate an email or CRM provider (e.g. Resend, SendGrid, or HubSpot) where the
`TODO` is marked in [`src/app/api/quote/route.ts`](src/app/api/quote/route.ts).

## Deployment

This app deploys cleanly to any Node.js host or to
[Vercel](https://vercel.com). Run `npm run build` to verify a production build
before deploying.
