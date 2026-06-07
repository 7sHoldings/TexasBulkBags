# Texas Bulk Bags — Application Requirements (Draft for Review)

> **Status:** Draft v1 — for your review. Nothing in here is built yet beyond the
> initial site scaffold. Please review, edit, and tell me what to change or
> approve before I proceed with implementation.

---

## 1. Overview

Texas Bulk Bags is a Texas-based supplier of FIBC bulk bags ("super sacks") for
agriculture, construction, oil & gas, food, and general industrial use. This
project delivers the company's website: a **product catalog + lead-generation
site**, with an optional path to full **online ordering (e-commerce)**.

The site is modeled on these reference suppliers:

| Reference | What we're taking from it |
| --- | --- |
| shoptough.com (Standard FIBC collection) | Filterable product catalog, clean collection pages, Shopify-style PDP |
| bulkbagdepot.com | Category structure, "bulk bags" taxonomy, quote-driven catalog |
| southernpackaginglp.com | Broad packaging-supplier positioning, industries served |
| nilkanthpoly.com | Manufacturer presentation, product specs, capabilities |
| nationalbulkbag.com | "Shop by category / industry / dimension", 75+ stocked SKUs, resources/blog, quote + cart |

### Business details (confirmed)

- **Company:** Texas Bulk Bags
- **Address:** 1001 NW 2nd St, Kerens, TX 75144
- **Phone:** 313-960-9187
- **Email:** info@texasbulkbags.com

---

## 2. Goals & success metrics

**Primary goal:** Generate qualified quote requests and phone/email inquiries.

| Goal | Success metric |
| --- | --- |
| Capture leads | Quote-request form submissions per month |
| Be found | Organic search ranking for "bulk bags Texas", "FIBC", "super sacks" |
| Educate buyers | Product pages with complete specs; resource/blog reads |
| Look credible | Fast, mobile-friendly, professional design |
| (Phase 2) Sell online | Online orders / checkout conversion |

---

## 3. Target users

1. **Procurement buyer** (farm co-op, construction, manufacturer) — needs specs,
   capacity, and a fast quote on pallet/truckload quantities.
2. **Operations / plant manager** — needs the right bag for a material (static
   type, food grade, UN-rated) and reliable lead times.
3. **Small-volume buyer** — wants to buy a small quantity quickly, ideally online.
4. **Custom-spec buyer** — needs a non-standard size, liner, print, or
   certification quoted.

---

## 4. Scope & phasing

To keep delivery incremental and let you launch fast, I propose **three phases**.
You decide how far to go.

### Phase 1 — Marketing + Catalog + Quote (recommended first launch)
- Full site: home, products (catalog + filters), product detail pages, industries,
  about, resources/blog, contact.
- Quote-request and contact forms that email leads to `info@texasbulkbags.com`.
- No payments. Buyers request a quote instead of checking out.
- Content managed in code or a lightweight CMS (see §10).

### Phase 2 — E-commerce (optional)
- Shopping cart, checkout, online payments (Stripe), order confirmation emails.
- Inventory/stock status, shipping/freight estimation.
- Customer accounts & order history.

### Phase 3 — Enhancements (optional)
- Customer portal, reorder, saved quotes, net-terms accounts.
- Live chat, CRM integration, advanced analytics.
- Multi-language (e.g., Spanish) if useful for the Texas market.

> **Decision needed (D1):** Confirm we start with **Phase 1 only**, or that you
> want Phase 2 e-commerce included in the first build.

---

## 5. Information architecture (sitemap)

```
Home (/)
├── Products (/products)                      ← catalog with filters
│   ├── By bag style
│   │   ├── Standard / U-Panel / Circular / 4-Panel
│   │   ├── Duffle top / Spout top / Open top / Flap top
│   │   ├── Spout bottom / Flat bottom / Full-open (discharge) bottom
│   │   └── Baffle (Q-bags)
│   ├── By type (static)  → Type A / B / C / D
│   ├── By use            → Food grade, UN-certified (HAZMAT), Conductive
│   ├── Liners & accessories
│   └── Product detail page (/products/[slug])
├── Industries (/industries)                  ← Agriculture, Construction,
│   └── Industry page (/industries/[slug])      Chemical, Food, Oil & Gas, Mining,
│                                               Sand & Aggregates, Waste
├── Custom Bags (/custom)                     ← spec-it form
├── Resources (/resources)                    ← blog / guides / FAQ
│   └── Article (/resources/[slug])
├── About (/about)
├── Contact (/contact)
├── Request a Quote (/quote)                  ← primary CTA, also embedded site-wide
└── (Phase 2) Cart, Checkout, Account
```

> **Decision needed (D2):** Confirm the product taxonomy above matches how you
> want customers to browse (by style vs. by industry vs. by dimension). I can
> support multiple browse paths.

---

## 6. Product catalog — data model

Each product (SKU) carries:

| Field | Example | Notes |
| --- | --- | --- |
| Name | "35×35×45 Duffle Top, Spout Bottom" | |
| Slug | `35x35x45-duffle-top-spout-bottom` | URL |
| Dimensions (L×W×H, in) | 35 × 35 × 45 | filterable |
| Safe Working Load (SWL) | 3,000 lb | filterable |
| Safety factor | 5:1 / 6:1 | |
| Bag construction | U-panel / circular / 4-panel | filter |
| Top style | Duffle / spout / open / flap | filter |
| Bottom style | Spout / flat / full-open | filter |
| Static type | A / B / C / D | filter |
| Fabric | Coated / uncoated, fabric weight (gsm) | filter |
| Baffle | Yes / No | filter |
| Liner | None / PE / form-fit | |
| Food grade | Yes / No | filter |
| UN certified | Yes / No | filter |
| Lift loops | Corner / cross-corner / stevedore | |
| FILL/SAFE/CAUTION printing | standard | |
| Stock status | In stock / made-to-order | |
| Min. order qty | e.g., 1 bale / pallet | |
| Price or "Request quote" | depends on phase | |
| Images | gallery | |
| Spec sheet (PDF) | optional download | |
| SEO meta | title, description | |

**Catalog filtering / sorting (collection page):**
Filter by dimension, capacity, top, bottom, static type, baffle, food grade,
UN, coated/uncoated; sort by capacity, dimension, newest. Search by keyword/size.

> **Decision needed (D3):** Do you have an actual product list / SKU spreadsheet
> (sizes, capacities, prices)? If yes, send it and I'll model the real catalog.
> If not, I'll seed realistic sample SKUs you can edit later.

---

## 7. Functional requirements by feature

### 7.1 Home page
- Hero with value prop + primary "Request a Quote" CTA.
- Featured product categories / "Shop by" tiles.
- Industries served strip.
- Why-choose-us (Texas-based, fast shipping, volume pricing, certified quality).
- Social proof (logos/testimonials — optional, pending content).
- Quote/contact CTA band with phone + email.

### 7.2 Products — collection page
- Grid of product cards (image, name, key spec, price or "Request quote").
- Sidebar/toolbar filters and sort (per §6).
- Pagination or infinite scroll.
- Empty/again states and result counts.

### 7.3 Product detail page (PDP)
- Image gallery, full spec table, capacity, certifications.
- "Request a quote for this product" (pre-fills product) + quantity field.
- (Phase 2) Add to cart, quantity, stock status, price.
- Related products, downloadable spec sheet.
- SEO: product schema (JSON-LD), unique meta.

### 7.4 Industries pages
- One page per industry: typical bags used, use cases, CTA.

### 7.5 Custom bags
- Spec-it form: dimensions, capacity, top/bottom, static type, liner, print,
  certifications, quantity, target date, contact info, file upload (drawing/spec).

### 7.6 Quote request (primary conversion)
- Fields: name, company, email, phone, product(s) of interest, quantity,
  timeline, message, optional file upload.
- Server-side validation + spam protection (honeypot + rate limit; optional
  reCAPTCHA/Turnstile).
- On submit: email the lead to `info@texasbulkbags.com`, send the customer a
  confirmation email, store/log the submission.
- Success and error states.

### 7.7 Contact page
- Address, phone (click-to-call), email, hours, embedded map (Kerens, TX),
  contact form.

### 7.8 Resources / blog
- List + article pages (FIBC guides, how-to-choose, safety, FAQ).
- Good for SEO. Authored in Markdown/CMS.

### 7.9 Global
- Responsive header w/ mobile nav, sticky "Request a Quote".
- Footer with contact, nav, certifications, legal links.
- 404 page, sitemap.xml, robots.txt.

### 7.10 Phase 2 — e-commerce (if approved)
- Cart, checkout, Stripe payments, order emails, tax (TX), shipping/freight,
  inventory, customer accounts/order history, admin order view.

---

## 8. Non-functional requirements

- **Responsive:** mobile-first; works on phone/tablet/desktop.
- **Performance:** Core Web Vitals "good"; optimized images; static where possible.
- **SEO:** semantic HTML, metadata, Open Graph, JSON-LD (Organization, Product,
  Breadcrumb), sitemap, robots, clean URLs.
- **Accessibility:** WCAG 2.1 AA — labels, contrast, keyboard nav, alt text.
- **Security:** input validation, spam/bot protection, HTTPS, secrets in env vars,
  PCI handled by Stripe (Phase 2).
- **Analytics:** Google Analytics 4 (or Plausible) + conversion tracking on quote
  submissions.
- **Browser support:** current Chrome, Safari, Edge, Firefox; iOS/Android.
- **Maintainability:** content (products, copy) editable without redeploys where
  practical (see CMS decision).

---

## 9. Proposed technology stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js (App Router) + TypeScript** | Already scaffolded; great SEO/perf |
| Styling | **Tailwind CSS** | Already in place; fast, consistent |
| Forms/email | Server route + **Resend** (or SendGrid) | Reliable lead delivery + confirmations |
| Spam protection | Honeypot + Cloudflare Turnstile | Low-friction bot defense |
| Content/products | **MDX/file-based** now → optional **Sanity/Contentful** | Start simple, add CMS if you want self-serve editing |
| Analytics | GA4 or Plausible | Conversion tracking |
| Hosting | **Vercel** (or any Node host) | Zero-config Next.js deploys |
| (Phase 2) Payments | **Stripe** | Standard, secure |
| (Phase 2) Commerce | Stripe + custom, or **Shopify** headless | shoptough.com runs on Shopify; viable alternative |

> **Decision needed (D4):** For Phase 2, do you prefer **Shopify (headless or
> hosted)** like shoptough.com, or a **custom Stripe-based** store? This affects
> Phase 1 data modeling.

> **Decision needed (D5):** Do you want a **CMS** so non-developers can edit
> products/blog, or is developer-managed content fine to start?

---

## 10. Integrations & accounts needed (from you, later)

- Domain name (e.g., texasbulkbags.com) + DNS access.
- Email-sending account (Resend/SendGrid) or willingness to set one up.
- Google Analytics property (or Plausible).
- Logo and brand colors (if any); product photos.
- (Phase 2) Stripe account; tax/shipping rules; or Shopify store.
- Google Business Profile for the map/contact (Kerens, TX).

---

## 11. Content checklist (needed to fill the site)

- [ ] Logo (SVG/PNG) and brand colors
- [ ] Product list with specs, capacities, and (if selling) prices
- [ ] Product photos / or use category placeholders to start
- [ ] Company "About" story, years in business, certifications
- [ ] Industries you serve + any case studies/testimonials
- [ ] Shipping/lead-time policy text
- [ ] Any certifications to display (ISO, food-grade/BRC, UN)
- [ ] Blog/resource topics (or I can draft starter articles)

---

## 12. Open decisions (summary — please answer in your review)

| # | Decision |
| --- | --- |
| D1 | Phase 1 only, or include Phase 2 e-commerce now? |
| D2 | Confirm product browse taxonomy (style / industry / dimension). |
| D3 | Do you have a real SKU/price list, or seed sample products? |
| D4 | Phase 2 commerce: Shopify vs. custom Stripe? |
| D5 | CMS for self-serve editing, or developer-managed content? |
| D6 | Brand assets available (logo/colors), or should I design a placeholder brand? |
| D7 | Pricing shown publicly, or quote-only (hide prices)? |

---

## 13. Proposed delivery milestones (Phase 1)

1. **Foundation & design system** — layout, header/footer, brand tokens, home page.
2. **Catalog** — products data model, collection page with filters, PDP.
3. **Lead capture** — quote form + contact form with email delivery & spam protection.
4. **Industries + Resources/blog** — content pages and article system.
5. **SEO, analytics, polish** — metadata, JSON-LD, sitemap, GA4, accessibility pass.
6. **Launch prep** — domain, deploy, QA on devices, handoff docs.

*(Phase 2 milestones defined after D1/D4 are decided.)*

---

**Next step:** Review this document, answer the open decisions in §12 (even rough
answers are fine), and tell me what to change. Once you approve, I'll start with
Milestone 1.
