# Source International

Corporate website for **Source International** — a supplier of stationery,
office essentials, computer accessories and procurement solutions based in
Urdu Bazar, Lahore.

Six pages, a searchable 72-product catalog, and a fully static build. There is
no backend, no database and no server to maintain — all content is compiled
into the site, so it can be hosted anywhere that serves files.

---

## Contents

- [Tech stack](#tech-stack)
- [Features](#features)
- [Quick start](#quick-start)
- [Pages](#pages)
- [Catalog](#catalog)
- [Editing content](#editing-content)
- [Contact handling](#contact-handling)
- [Commands](#commands)
- [Project structure](#project-structure)
- [Deployment](#deployment)
- [Before going live](#before-going-live)

---

## Tech stack

| | |
| --- | --- |
| Framework | React 19 + [TanStack Start](https://tanstack.com/start) (SSR) |
| Routing | TanStack Router — file-based |
| Styling | Tailwind CSS v4 with custom brand tokens |
| Animation | Framer Motion |
| Icons | Lucide |
| Build | Vite 8 |
| Language | TypeScript (strict) |

**Requires Node.js `^20.19.0` or `>=22.12.0`** — Vite 8 will not run on older
versions.

---

## Features

- **Server-side rendered** — pages arrive as complete HTML, so the catalog and
  company details are visible to search engines without running JavaScript.
- **Searchable catalog** — filter 72 products by free text (name, SKU, brand or
  description) or by category, with pagination and a quick-view detail popup.
- **Single-source content** — products and company details each live in one
  file; category counts and contact links derive from them automatically.
- **Responsive** — mobile navigation drawer, adaptive grids, tested from phone
  to desktop.
- **Light & dark theme tokens** defined in `styles.css`.
- **Custom 404 and error boundaries** rather than a blank screen on failure.

---

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:8080**.

> First time setting up, or hitting a problem? **[SETUP.md](SETUP.md)** has
> prerequisites, step-by-step instructions, content-editing guidance and
> troubleshooting.

---

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, animated stats, category grid, industries, partners, testimonials |
| `/about` | Story, mission & values, 2020–2025 timeline, achievements |
| `/products` | Catalog — search, category filter, grid/list toggle, pagination, quick view |
| `/services` | Seven service offerings and the four-stage engagement process |
| `/team` | Leadership profiles with contact details |
| `/contact` | Address, phone, email, hours and inquiry email links |

---

## Catalog

72 products across nine categories:

| Category | Products | SKU prefix |
| --- | ---: | --- |
| Office Stationery | 12 | `STA-` |
| Computer Accessories | 10 | `CMP-` |
| Paper Products | 9 | `PAP-` |
| Cleaning Supplies | 8 | `CLN-` |
| School Supplies | 7 | `SCH-` |
| Office Equipment | 7 | `EQP-` |
| Office Furniture | 7 | `FUR-` |
| Printer Supplies | 6 | `PRN-` |
| Packaging Materials | 6 | `PKG-` |
| **Total** | **72** | |

---

## Editing content

Everything is in two files. No component changes needed.

| What | File |
| --- | --- |
| Products, SKUs, categories | `frontend/src/data/products.ts` |
| Company details, services, leadership | `frontend/src/data/company.ts` |

### Adding a product

Add a row to the `gen([...])` block for its category. Each row is
`[name, sku, description, brand]`:

```ts
["Sticky Notes 3x3\" (Pack of 12)", "PAP-010", "Repositionable adhesive notes.", "Post-it"],
```

The **SKU is the product's unique id** — never reuse one. Category counts on
the home page and catalog sidebar recalculate automatically; you never edit
them by hand.

### Changing company details

`BRAND` in `company.ts` holds the name, address, phone, email, fax and hours.
Edit it once and the footer, contact page and every quote link across the site
update together. Leaving `fax` as an empty string hides that contact card.

`SERVICES` and `LEADERSHIP` in the same file drive the Services and Team pages.

### Images

Files in `frontend/src/assets/`:

| File | Used for |
| --- | --- |
| `hero-bg.jpg` | Home page hero background |
| `about-warehouse.jpg` | About page photo |
| `team-imran.png` | Muhammad Imran portrait |
| `team-nadeem.png` | Muhammad Nadeem portrait |

Overwrite a file to change the picture, **keeping the same filename and
extension** — otherwise update the matching `import` at the top of the page.
Portraits display at 768×896; compress large photos (e.g. with
[Squoosh](https://squoosh.app)) before adding them.

Service icons are components, not data — they're matched to service titles in
`SERVICE_ICONS` at the top of `routes/services.tsx`.

---

## Contact handling

There is no form submission and nothing is stored. The contact page and the
"Corporate Inquiry" button on every product open the visitor's email client,
pre-addressed to **sandhsourceint@gmail.com** with a structured template
covering name, organization, phone, products required and delivery timeline.

To change the destination address, edit `BRAND.email` in `company.ts` — every
link updates.

---

## Commands

Run from the `frontend/` directory.

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with hot reload on port 8080 |
| `npm run build` | Production build into `.output/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-format all source files |
| `npx tsc --noEmit` | TypeScript typecheck |

---

## Project structure

```
S and H source International/
├── README.md                    This file
├── SETUP.md                     Installation & troubleshooting guide
│
└── frontend/
    ├── src/
    │   ├── routes/              One file per page (file-based routing)
    │   │   ├── __root.tsx       App shell: meta, nav, footer, error boundary
    │   │   ├── index.tsx        Home
    │   │   ├── about.tsx        About
    │   │   ├── products.tsx     Catalog
    │   │   ├── services.tsx     Services
    │   │   ├── team.tsx         Leadership
    │   │   └── contact.tsx      Contact
    │   ├── component/site/      Navbar, Footer, AnimatedBackground, Counter
    │   ├── data/
    │   │   ├── products.ts      ← product catalog (edit here)
    │   │   └── company.ts       ← company details (edit here)
    │   ├── lib/                 Utilities + error handling
    │   ├── assets/              Images
    │   └── styles.css           Tailwind theme + brand tokens
    └── package.json
```

`src/routeTree.gen.ts` is generated automatically — never edit it by hand.

---

## Deployment

The output is a static site, so it works on any host with no configuration:

| Host | Build command | Publish directory |
| --- | --- | --- |
| Netlify | `npm run build` | `.output/public` |
| Vercel | auto-detected | auto-detected |
| Cloudflare Pages | `npm run build` | `.output/public` |
| Traditional host | `npm run build` | upload `.output/public` via FTP |

Always run `npm run preview` and click through all six pages before deploying —
it serves the real production build rather than the dev server.

---

## Before going live

- [ ] Replace the placeholder email and phone for Muhammad Imran in
      `company.ts` (`imran@sourceintl.com`, `+92 300 000 0001`).
- [ ] Confirm office hours in `BRAND.hours`.
- [ ] Replace the placeholder partner names and testimonials in
      `routes/index.tsx` with real ones, or remove those sections.
- [ ] Compress the team portraits — they are several MB each.
- [ ] Add a `favicon.ico` to a `public/` folder; the page links to one that
      doesn't exist yet.
- [ ] The project has both `package-lock.json` and `bun.lock` — delete
      whichever package manager you don't use.
