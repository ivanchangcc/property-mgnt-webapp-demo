# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run typecheck    # TypeScript check (tsc --noEmit)
npm run lint         # ESLint
npm run format       # Prettier (all .ts/.tsx files)
```

Add Shadcn components: `npx shadcn@latest add <component-name>`

## Architecture

Property management web app for UK property managers. Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS 4 + Shadcn/ui (radix-lyra style, mist base color).

### Layout Structure

- `app/layout.tsx` — Root layout: fonts (Montserrat headings, Figtree body, Geist Mono), ThemeProvider (dark mode), TooltipProvider
- `app/(portal)/layout.tsx` — Portal layout: Shadcn SidebarProvider + collapsible sidebar + main content area. All portal pages live under this route group
- `app/page.tsx` — Redirects to `/dashboard`

### Data Layer

**v1 uses mock data only — no database, no auth.** The data layer is designed as a pseudo-data-access-layer so future DB migration only requires rewriting `lib/mock-data/`.

- `lib/types.ts` — All TypeScript interfaces (Landlord, Property, Tenant, Issue, Certificate, Worker)
- `lib/mock-data/index.ts` — Re-exports all data arrays + lookup helpers (`getLandlordById`, `getPropertyById`, `getIssuesByProperty`, `getCertificatesByProperty`, `getExpiringCertificates`, etc.)
- `lib/mock-data/*.ts` — Individual entity data files
- `lib/helpers/` — Pure functions for certificates (expiry status), issues (open filter), formatting (dates, addresses, names)
- `lib/constants.ts` — Status/priority color mappings, certificate type labels, threshold defaults

**All pages import from `@/lib/mock-data` — never directly from individual data files.**

### Key Domain Relationships

- 1 Landlord → N Properties (via `landlordId` on Property)
- 1 Property → N Tenants (embedded `TenantAssignment[]` with `isLeadTenant` flag)
- 1 Property → N Issues, N Certificates (via `propertyId`)
- 1 Issue → N Workers (via `assignedWorkerIds`)
- Issue statuses: open → assigned → in-progress → reviewing → completed → closed
- Certificate "expiring soon" threshold: 30 days default, configurable per cert via `expiryThresholdDays`

### Component Patterns

- `components/glass-card.tsx` — Glassmorphism card wrapper (backdrop-blur, semi-transparent). Used throughout for the frosted-glass UI style. Three intensity levels: light/medium/strong.
- `components/stat-card.tsx`, `status-badge.tsx`, `priority-badge.tsx`, `cert-status-indicator.tsx` — Domain-specific display components built on Shadcn Badge/Card
- `components/ui/` — Shadcn components (do not modify directly; add new ones via `npx shadcn@latest add`)
- `components/page-header.tsx` — Consistent page header with SidebarTrigger for mobile
- `components/sidebar-nav.tsx` — App sidebar navigation (client component)

### Server vs Client Components

- List pages and dashboard are **Client Components** (search/filter state via `useState`)
- Static detail pages (landlord, property) use `generateStaticParams` for **SSG**
- Issue detail (`/issues/[id]`) is a **Client Component** with ephemeral state for status changes, worker assignment, and comments (mutations don't persist across page loads)

## Code Style

- No semicolons, double quotes, 2-space indent, trailing commas (es5)
- Prettier with tailwind plugin sorts classes; use `cn()` from `lib/utils` for conditional classes
- Path alias: `@/*` maps to project root
