# Image Assets Checklist — Texas Bulk Bags

Drop files into the paths below and the app picks them up. Photos use
`next/image` (auto‑optimized). Prefer **WebP or JPG** for photos, **SVG** for the
logo, **PNG** for icons/social. Shoot/export product photos on a **white or light
background** to match the industrial look.

Display sizes are small, but supply the larger "supply" dimensions so images stay
crisp on retina screens.

---

## 1. Brand — REQUIRED

| Asset | File (place in `/public/`) | Size | Format | Used |
| --- | --- | --- | --- | --- |
| Logo (primary, dark) | `logo.svg` | vector (≈ 400×100, 4:1) | SVG (or PNG, transparent) | Header on white |
| Logo (white/reverse) | `logo-white.svg` | vector | SVG/PNG transparent | Footer (navy background) |
| Favicon | `favicon.ico` | 16/32/48 multi‑size | ICO | Browser tab (a default exists — replace) |
| App icon (touch) | `icon.png` | 512×512 | PNG | Home‑screen / PWA / Google |
| Apple touch icon | `apple-icon.png` | 180×180 | PNG | iOS home screen |
| Social share (Open Graph) | `opengraph-image.jpg` | 1200×630 | JPG/PNG | Link previews (FB, LinkedIn, iMessage, X) |

> Logo: if you only have a raster file, send the highest‑resolution PNG with a
> transparent background and I'll handle the rest.

---

## 2. Product photos — REQUIRED (1 each), 8 total

Square masters work everywhere (catalog card = square, PDP = 4:3 cropped, thumbs
= square). Place in `/public/products/`.

| Product | Filename | Size | Format |
| --- | --- | --- | --- |
| U‑Panel Spout Top (TBB‑UP‑35) | `tbb-up-35-upanel-spout.jpg` | 1200×1200 | JPG/WebP |
| U‑Panel Duffle Top (TBB‑UP‑40) | `tbb-up-40-duffle-spout.jpg` | 1200×1200 | JPG/WebP |
| Circular Duffle Top (TBB‑CIRC‑42) | `tbb-circ-42-duffle.jpg` | 1200×1200 | JPG/WebP |
| Baffle Q‑Bag (TBB‑BAF‑38) | `tbb-baf-38-baffle.jpg` | 1200×1200 | JPG/WebP |
| Food‑Grade Clean‑Room (TBB‑FG‑35) | `tbb-fg-35-foodgrade.jpg` | 1200×1200 | JPG/WebP |
| UN‑Certified HAZMAT (TBB‑UN‑37) | `tbb-un-37-hazmat.jpg` | 1200×1200 | JPG/WebP |
| Type C Conductive (TBB‑C‑39) | `tbb-c-39-conductive.jpg` | 1200×1200 | JPG/WebP |
| Open Top / Flat Bottom (TBB‑OT‑44) | `tbb-ot-44-opentop-flat.jpg` | 1200×1200 | JPG/WebP |

**Optional extra angles** (for the PDP gallery — needs a small code change to
enable): `tbb-up-35-upanel-spout-2.jpg`, `-3.jpg`, etc. 2–3 per product.

> Until a file exists for a product, it shows the bulk‑bag illustration
> placeholder automatically — no broken images.

---

## 3. Home & marketing — RECOMMENDED

| Asset | File | Size | Format | Used |
| --- | --- | --- | --- | --- |
| Hero background | `/public/hero.jpg` | 1920×1080 (16:9) | JPG/WebP | Home hero (warehouse / bags on pallets; we overlay it) |
| "Standard U‑Panel" feature tile | `/public/home/feature-upanel.jpg` | 1200×900 (4:3) | JPG/WebP | Home "Core Configurations" large tile |
| Inventory spotlight | reuses a product photo | — | — | Custom‑quote sidebar |

---

## 4. Industries — OPTIONAL (6), enhances industry pages

Place in `/public/industries/`. 4:3 landscape. Falls back to icons today.

| Industry | Filename | Size |
| --- | --- | --- |
| Agriculture | `agriculture.jpg` | 800×600 |
| Construction & Mining | `construction.jpg` | 800×600 |
| Chemical Manufacturing | `chemical.jpg` | 800×600 |
| Food & Ingredients | `food.jpg` | 800×600 |
| Oil & Gas | `oil-gas.jpg` | 800×600 |
| Waste Management | `waste.jpg` | 800×600 |

---

## 5. Resources / blog — OPTIONAL (3)

Place in `/public/resources/`. Used as article hero / card thumbnail.

| Article | Filename | Size |
| --- | --- | --- |
| How to Choose an FIBC | `how-to-choose.jpg` | 1200×630 |
| Static Types A–D | `static-types.jpg` | 1200×630 |
| Safe Handling | `safe-handling.jpg` | 1200×630 |

---

## 6. About — OPTIONAL

| Asset | File | Size | Used |
| --- | --- | --- | --- |
| Facility / team photo | `/public/about/facility.jpg` | 1200×800 (3:2) | About page |

---

## Summary counts

- **Must‑have to launch well:** 6 brand assets + 8 product photos = **14 images**.
- **Recommended:** + hero + 1 feature tile = **2 more**.
- **Nice‑to‑have:** + 6 industries + 3 articles + 1 about = **10 more**.

## How to deliver

Send a zip (or links). For licensing, use **your own photos, supplier‑provided
images, or licensed stock** — not competitor/Google images. I'll place them,
wire each product's `image`, set the favicon/OG/logo, and (for any externally
hosted images) whitelist the domain in `next.config.ts`.
