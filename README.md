# Daniel Trujillo — Professional Portfolio

Source code for the professional portfolio of **Daniel Trujillo**, an Industrial Engineer whose work sits at the intersection of data & analytics, ERP & business systems, automation, process improvement, operations, and enterprise technology.

> I build data-driven systems that connect operations, enterprise technology, automation, and decision-making.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **ESLint**
- **npm**

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

The production build is entirely static (no client-side data fetching, no databases).

## Project Structure

```text
app/
├── layout.tsx            # Root layout, metadata, skip-link, Navbar, Footer
├── globals.css
├── page.tsx              # Homepage (minimal)
├── projects/page.tsx
├── experience/page.tsx
├── about/page.tsx
├── resume/page.tsx
└── contact/page.tsx

components/
├── layout/
│   ├── Navbar.tsx        # Client Component (mobile menu toggle)
│   └── Footer.tsx
└── ui/
    ├── Container.tsx     # Responsive max-width wrapper
    ├── SectionHeading.tsx
    ├── Button.tsx        # <button> variants
    └── ButtonLink.tsx    # <a> / Next.js Link variants

lib/
├── site.ts               # Site name, description, nav configuration
└── utils.ts              # cn() class helper
```

## Current Status Snapshot

> Status as of: 2026-08-12

**Milestone 1 (foundational structure) — implemented and validated.**

| Area | Status | Notes |
| --- | --- | --- |
| Global layout | Done | Sticky-footer flex layout, `id="main"`, skip-to-content link |
| Navbar | Done | Desktop nav + accessible mobile menu (Client Component) |
| Footer | Done | Internal navigation + copyright |
| Container | Done | Responsive `max-w-7xl` wrapper |
| SectionHeading | Done | Reusable title/description, configurable heading level |
| Button / ButtonLink | Done | Primary / secondary / ghost variants |
| Global styles | Done | Professional color system, OS light/dark, focus states |
| Metadata foundation | Done | Title template, description, Open Graph, robots, `metadataBase` |
| Routes | Done | `/`, `/projects`, `/experience`, `/about`, `/resume`, `/contact` |
| Placeholder pages | Done | Per-page metadata + minimal non-factual placeholder text |
| Responsiveness | Done | Mobile → desktop |
| Accessibility | Done | Semantic landmarks, heading hierarchy, focus-visible |
| ESLint | Passing | `npm run lint` clean |
| Production build | Passing | `npm run build` — 9 static routes prerendered |

### Placeholder routes

The `/projects`, `/experience`, `/about`, `/resume`, and `/contact` routes are functional placeholders with minimal, non-factual content. Project details, experience history, resume links, and contact information will be supplied in a later milestone.

### Configuration

`metadataBase` is derived from `NEXT_PUBLIC_SITE_URL` with an `http://localhost:3000` fallback for local development. Set this variable in the hosting environment for a production domain.

## Project Rules & Specification

- `AGENTS.md` defines the implementation rules for this repository.
- `docs/portfolio-spec.md` defines the product specification (purpose, positioning, information architecture, capabilities, case-study structure, and V1 definition of done).

## Milestones

- **Milestone 1 (foundational structure)** — complete. Global layout, responsive Navbar/Footer, reusable UI primitives, metadata foundation, and placeholder routes are implemented, lint-clean, and passing the production build.
- **Milestone 2 (homepage implementation)** — next up.
