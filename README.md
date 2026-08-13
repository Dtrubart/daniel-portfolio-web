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
├── page.tsx              # Homepage composition
├── projects/
│   ├── page.tsx         # Project catalogue
│   └── [slug]/
│       └── page.tsx     # Dynamic project pages (5 static routes)
├── experience/page.tsx
├── about/page.tsx
├── resume/page.tsx
└── contact/page.tsx

components/
├── home/
│   ├── Hero.tsx
│   ├── FeaturedProjects.tsx
│   ├── Capabilities.tsx
│   ├── SelectedExperience.tsx
│   ├── Certifications.tsx
│   ├── CurrentWork.tsx
│   └── ContactCTA.tsx
├── layout/
│   ├── Navbar.tsx        # Client Component (mobile menu toggle)
│   └── Footer.tsx
├── projects/
│   ├── ProjectCard.tsx     # Catalogue card (links to /projects/[slug])
│   ├── ProjectHeader.tsx   # Breadcrumb + category + title + tags
│   ├── ProjectNavigation.tsx  # Sticky anchor TOC with scroll-spy
│   ├── ProjectSection.tsx     # Reusable section wrapper
│   ├── DemoPreview.tsx        # Typed preview (software/dashboard/workflow/analytics)
│   ├── RepositoryNote.tsx     # Pending/private-repository notice
│   ├── ProcessFlow.tsx        # Reusable process-flow diagram
│   ├── UATTable.tsx           # Scenario validation table
│   └── ConfigurationPanel.tsx # Titled configuration block
└── ui/
    ├── Container.tsx     # Responsive max-width wrapper
    ├── SectionHeading.tsx
    ├── Button.tsx        # <button> variants
    └── ButtonLink.tsx    # <a> / Next.js Link variants

content/
└── projects/
    └── vanbags-erp.tsx   # VanBags ERP case study (14 sections)

data/
├── projects.ts           # Strongly-typed project catalogue (single source of truth)
├── capabilities.ts
├── experience.ts
├── certifications.ts
└── current-work.ts

docs/
└── portfolio-spec.md     # Product specification

lib/
├── site.ts               # Site name, description, nav configuration
├── utils.ts              # cn() class helper
└── projectContent.tsx    # Project-aware section router (light scaffold + VanBags case study)

public/
└── favicon.ico
```

## Current Status Snapshot

> Status as of: 2026-08-13 · Milestones 1–4B committed; Milestone 5 implemented and validated (uncommitted, ready for review)

### Milestones

- **Milestone 1 (foundational structure)** — complete and committed (`04329e4`).
- **Milestone 2 (homepage implementation)** — complete and committed (`c7a3680`).
- **Milestone 3 (projects architecture)** — complete and committed (`ba6266a`).
- **Milestone 4A (interactive project framework)** — complete and committed (`0197e74`).
- **Milestone 4B (VanBags ERP case study)** — complete and committed (`b73c004`).
- **Milestone 5 (in progress)** — VanBags ERP Workflow & Configuration Simulator; implemented and validated, uncommitted, ready for manual review.

### Deliverables status

| Area | Milestone | Status | Notes |
| --- | --- | --- | --- |
| Global layout | M1 | Done | Sticky-footer flex layout; `<main id="main">`; skip-link |
| Navbar | M1 | Done | Desktop links + accessible mobile menu (Client Component) |
| Footer | M1 | Done | Internal navigation + copyright |
| UI primitives | M1 | Done | `Container`, `SectionHeading`, `Button`, `ButtonLink` |
| Color system | M1 | Done | Professional palette; OS light/dark; focus rings |
| Metadata foundation | M1 | Done | Title template, Open Graph, robots, `metadataBase` |
| Homepage | M2 | Done | Hero, Featured Projects, Capabilities, Experience, Certifications, Current Work, Contact CTA |
| Data catalogue | M3 | Done | `data/projects.ts` strongly-typed; 5 projects |
| Projects list | M3 | Done | `/projects` (3 featured, 2 supporting) |
| ProjectCard | M3 | Done | Hover styles, tech tags, featured/supporting styling |
| `Project` model | M4A | Done | Added `objective`, `caseStudy`, `architecture`, `demo` (with type), `repository` |
| Dynamic project routes | M4A | Done | `app/projects/[slug]/page.tsx` — 5 static routes |
| Per-project metadata | M4A | Done | `generateStaticParams` + `generateMetadata`; `notFound()` for invalid slugs; `dynamicParams = false` |
| ProjectHeader | M4A | Done | Breadcrumb, category, title, description, tech tags |
| ProjectNavigation | M4A | Done | Sticky anchor TOC with scroll-spy (Client Component) |
| ProjectSection | M4A | Done | Reusable section wrapper |
| DemoPreview | M4A | Done | Typed inline previews (software/dashboard/workflow/analytics) |
| RepositoryNote | M4A | Done | Pending link / private-repository notice |
| Section content | M4A | Done | Lightweight per-project scaffolding (Case Study / Architecture / Interactive Demo / Technical Evidence); no invented case-study detail |
| Card CTAs | M4A | Done | "Explore project" link for all cards; "View case study" CTA for published (`active`) projects; "Case study coming soon" placeholder removed |
| VanBags case study | M4B | Done | 14 sections in a dedicated `content/projects/vanbags-erp.tsx` module |
| VanBags ERP interactive demo | M5 | Done | Business Process simulator and ERP Configuration explorer; static-first, synthetic data, no backend/database |
| VanBags project status | M4B | Done | `active` (first published case study); other four remain `case-study-coming-soon` |
| Reusable case-study components | M4B | Done | `ProcessFlow`, `UATTable`, `ConfigurationPanel` |
| ESLint | M4A | Passing | `npm run lint` clean |
| Production build | M4A | Passing | `npm run build` succeeds (static-first); 14 static routes prerendered incl. 5 project pages |

### Routes

| Route | Status | Source |
| --- | --- | --- |
| `/` | Done | `app/page.tsx` |
| `/projects` | Done | `app/projects/page.tsx` |
| `/projects/vanbags-erp` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/vanbags-erp/demo` | Done | `app/projects/[slug]/demo/page.tsx` |
| `/projects/vanbags-maintenance` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/fleet-intelligence` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/data-analytics-portfolio` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/inventory-management-system` | Done | `app/projects/[slug]/page.tsx` |
| `/experience` | Placeholder | `app/experience/page.tsx` |
| `/about` | Placeholder | `app/about/page.tsx` |
| `/resume` | Placeholder | `app/resume/page.tsx` |
| `/contact` | Placeholder | `app/contact/page.tsx` |

### Interactive project framework

`/projects/[slug]` renders a dedicated page per project (VanBags ERP Transformation, VanBags Maintenance System, Fleet Intelligence Platform, Data Analyst Portfolio, ERPNext Logistics Demo) — three flagship and two supporting. Sections render only when the matching model flag (`caseStudy`, `architecture`, `demo`, or `repository`) is enabled, so the table of contents and rendered sections always match the data. The page exposes a breadcrumb + project header, a sticky anchor table of contents with scroll-spy, and reusable components (`ProjectSection`, `ProjectHeader`, `ProjectNavigation`, `DemoPreview`, `RepositoryNote`). In Milestone 4A the section bodies for the four non-VanBags projects are intentionally lightweight scaffolding; no invented case-study detail is published. VanBags ERP Transformation now uses a dedicated case-study content module (`content/projects/vanbags-erp.tsx`) with 14 sections. Detailed case-study content rolls out per the roadmap; the VanBags ERP Transformation interactive demo (Milestone 5) is implemented and available, and is a Business Process scenario simulator and ERP Configuration explorer using synthetic data with no backend or database.

### Project catalogue

`/projects` renders five projects (three flagship, two supporting) from `data/projects.ts` — VanBags ERP Transformation, VanBags Maintenance System, Fleet Intelligence Platform, Data Analyst Portfolio, and ERPNext Logistics Demo. The homepage surfaces the three flagship projects. Every card links to its `/projects/<slug>` page; VanBags ERP Transformation is now `active` and exposes a "View case study" CTA, while the remaining four remain `case-study-coming-soon`. Private repository links are omitted until public-project review.

### Placeholder routes

The `/experience`, `/about`, `/resume`, and `/contact` routes remain functional placeholders with minimal, non-factual content. Experience history, professional details, resume links, and contact information will be supplied in a later milestone.

### Configuration

`metadataBase` is derived from `NEXT_PUBLIC_SITE_URL` with an `http://localhost:3000` fallback for local development. Set this variable in the hosting environment for a production domain.

## Project Rules & Specification

- `AGENTS.md` defines the implementation rules for this repository.
- `docs/portfolio-spec.md` defines the product specification (purpose, positioning, information architecture, capabilities, case-study structure, and V1 definition of done).

## Live Preview

```bash
npm run dev
```

Open http://localhost:3000
