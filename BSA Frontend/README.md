# Aabharan — Jewellery storefront + business management

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Two apps in one
codebase: a public storefront and an `/admin` business-management console
for the local shop (inventory, orders, customers, appointments).

## Stack

- **Next.js 16** — App Router, Server Components by default, route groups
- **TypeScript** — strict mode on
- **Tailwind CSS v4** — CSS-first theme in `src/app/globals.css` (no
  `tailwind.config.ts` needed)
- **Zod** — form/schema validation
- **lucide-react** — icons
- **clsx + tailwind-merge** — the `cn()` helper for conditional classNames
- **Prettier** (+ `prettier-plugin-tailwindcss`) — formatting and class
  sorting
- **ESLint** — `eslint-config-next`

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Storefront: `http://localhost:3000`
Admin console: `http://localhost:3000/admin`

## Folder structure

```
src/
  app/
    (storefront)/        # public site — route group, own layout (header/footer)
      page.tsx            # home
      collections/
      product/[slug]/
      about/
      contact/            # appointment booking form
      cart/
    admin/                # business management console — own layout (sidebar)
      page.tsx             # dashboard / KPIs
      inventory/
      orders/
      customers/
      appointments/
    layout.tsx            # root layout: fonts, metadata
    globals.css           # design tokens (Tailwind v4 @theme)

  components/
    ui/                   # primitives: Button, Card, Badge, Container
    layout/               # SiteHeader, SiteFooter, AdminSidebar, AdminTopbar
    storefront/            # ProductCard, Hero, AppointmentForm
    admin/                 # StatCard, OrderStatusBadge

  data/                   # mock data layer — swap for real DB/API calls
  types/                  # domain types (Product, Order, Customer, Appointment)
  lib/
    utils.ts               # cn(), formatCurrency(), formatDate(), slugify()
    validations/            # Zod schemas
  config/
    site.ts                 # site metadata, nav links, business info
```

## Conventions

- **Route groups** separate the storefront and admin shells so each gets
  its own layout without leaking nav/chrome into the other.
- **Data layer is isolated** in `src/data/*` behind small query functions
  (`getFeaturedProducts()`, `getProductBySlug()`, etc.) so swapping mock
  arrays for a real database or API later only touches that folder, not the
  pages.
- **Server Components by default.** Only files that need interactivity
  (the appointment form, the admin sidebar's active-link state) are marked
  `"use client"`.
- **Design tokens** live in `globals.css` under `@theme inline` — colors,
  fonts. Update the palette in one place rather than hunting for hex codes
  in components.
- Path alias `@/*` maps to `src/*`.

## Next steps (not yet wired up)

- Swap `src/data/*` for a real database (Postgres/Prisma, Supabase, etc.)
  and turn the query functions into real fetches.
- Add auth for `/admin` (e.g. NextAuth or Clerk) — it currently has no
  access control.
- Wire the appointment form's `onSubmit` to a real `/api/appointments`
  route instead of just validating client-side.
- Add a cart/checkout flow and a payment provider (Razorpay is common for
  India-based shops).
- Add product images (currently placeholder icons) — likely via a CDN or
  `next/image` with a real image source.

## Scripts

```bash
npm run dev           # start dev server
npm run build          # production build
npm run start           # run production build
npm run lint            # ESLint
npm run format           # Prettier — write
npm run format:check      # Prettier — check only
```
