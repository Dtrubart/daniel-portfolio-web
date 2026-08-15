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
├── about/                    # M8A: Professional profile components (uncommitted)
│   ├── AboutNavigation.tsx       # Anchor navigation for About sections
│   ├── ProfessionalProfile.tsx     # Identity, headline, narrative
│   ├── CareerJourney.tsx          # 7-stage capability evolution
│   ├── CapabilityExplorer.tsx     # 6-domain capability model
│   ├── ExperienceList.tsx         # Professional experience with details/summary
│   ├── SelectedWork.tsx           # Curated professional work
│   ├── SelectedImpact.tsx         # Evidence-aware impact metrics
│   ├── ProfessionalPrinciples.tsx # How I Work
│   ├── EducationDevelopment.tsx   # Education, certifications, current focus
│   ├── ResumePreview.tsx          # Resume foundation (PDF deferred to M8C)
│   └── ContactCTA.tsx            # Contact call-to-action
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
        ├── vanbags-erp.tsx            # VanBags ERP case study (14 sections)
        └── vanbags-maintenance.tsx    # VanBags Maintenance case study

data/
├── projects.ts           # Strongly-typed project catalogue (single source of truth)
├── professional-profile.ts  # M8A: Professional profile data model (uncommitted)
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

> Status as of: 2026-08-15 · Milestones 1–6B, 7A & 7B committed (M8A in progress)

### Milestones

- **Milestone 1 (foundational structure)** — complete and committed (`04329e4`).
- **Milestone 2 (homepage implementation)** — complete and committed (`c7a3680`).
- **Milestone 3 (projects architecture)** — complete and committed (`ba6266a`).
- **Milestone 4A (interactive project framework)** — complete and committed (`0197e74`).
- **Milestone 4B (VanBags ERP case study)** — complete and committed (`b73c004`).
- **Milestone 5 (VanBags ERP simulator)** — complete and committed (`3d4dfe6`).
- **Milestone 6A (VanBags Maintenance case study)** — implemented, validated, and committed.
- **Milestone 6B (VanBags Maintenance interactive demo)** — implemented, validated, and committed. Functional Maintenance + Tire Management simulation at `/projects/vanbags-maintenance/demo`.
- **Milestone 7A (Fleet Intelligence case study)** — implemented, validated, and committed.
- **Milestone 7B (Fleet Intelligence interactive dashboard)** — implementation in progress; committed with pending fixes.
- **Milestone 8A (Professional Profile Foundation)** — implemented and validated locally but **not committed**. Professional Profile, Career Journey (7 stages), Capability Explorer (6 domains), Experience, Selected Work, Selected Impact, Education & Development, and Resume preview foundation now available at `/about`.

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
| VanBags Maintenance case study | M6A | Done | Production-quality case study in `content/projects/vanbags-maintenance.tsx`; domain, work orders, activity execution, logistics, PM, downtime, tire management, architecture, UAT |
| VanBags Maintenance demo | 6B | Done | Functional Maintenance + Tire Management simulation at `/projects/vanbags-maintenance/demo`; shared demo route supports both ERP and Maintenance |
| VanBags Maintenance project status | M6A | Done | `active` (second published case study); remaining three remain `case-study-coming-soon` |
| Reusable case-study components | M4B | Done | `ProcessFlow`, `UATTable`, `ConfigurationPanel` |
| ESLint | M4A | Passing | `npm run lint` clean |
| Production build | M4A | Passing | `npm run build` succeeds (static-first); 16 static routes prerendered incl. 5 project pages |

### Routes

| Route | Status | Source |
| --- | --- | --- |
| `/` | Done | `app/page.tsx` |
| `/projects` | Done | `app/projects/page.tsx` |
| `/projects/vanbags-erp` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/vanbags-erp/demo` | Done | `app/projects/[slug]/demo/page.tsx` |
| `/projects/vanbags-maintenance` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/vanbags-maintenance/demo` | Done | `app/projects/[slug]/demo/page.tsx` |
| `/projects/fleet-intelligence` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/data-analytics-portfolio` | Done | `app/projects/[slug]/page.tsx` |
| `/projects/inventory-management-system` | Done | `app/projects/[slug]/page.tsx` |
| `/experience` | Placeholder | `app/experience/page.tsx` |
| `/about` | M8A (uncommitted) | `app/about/page.tsx` |
| `/resume` | Placeholder | `app/resume/page.tsx` |
| `/contact` | Placeholder | `app/contact/page.tsx` |

### Interactive project framework

`/projects/[slug]` renders a dedicated page per project (VanBags ERP Transformation, VanBags Maintenance System, Fleet Intelligence Platform, Data Analyst Portfolio, ERPNext Logistics Demo) — three flagship and two supporting. Sections render only when the matching model flag (`caseStudy`, `architecture`, `demo`, or `repository`) is enabled, so the table of contents and rendered sections always match the data. The page exposes a breadcrumb + project header, a sticky anchor table of contents with scroll-spy, and reusable components (`ProjectSection`, `ProjectHeader`, `ProjectNavigation`, `DemoPreview`, `RepositoryNote`). In Milestone 4A the section bodies for the four non-VanBags projects are intentionally lightweight scaffolding; no invented case-study detail is published. VanBags ERP Transformation now uses a dedicated case-study content module (`content/projects/vanbags-erp.tsx`) with 14 sections. Detailed case-study content rolls out per the roadmap; the VanBags ERP Transformation interactive demo (Milestone 5) is implemented and available, and is a Business Process scenario simulator and ERP Configuration explorer using synthetic data with no backend or database. VanBags Maintenance System is now the second active case study (Milestone 6A, case study only); its interactive Maintenance and Tire Management demo is implemented in Milestone 6B and available at `/projects/vanbags-maintenance/demo`. The shared demo route (`app/projects/[slug]/demo/page.tsx`) dispatches both the ERP (M5) and Maintenance (M6B) simulations.

### Project catalogue

`/projects` renders five projects (three flagship, two supporting) from `data/projects.ts` — VanBags ERP Transformation, VanBags Maintenance System, Fleet Intelligence Platform, Data Analyst Portfolio, and ERPNext Logistics Demo. The homepage surfaces the three flagship projects. Every card links to its `/projects/<slug>` page; VanBags ERP Transformation (`active`, Milestone 4B) and VanBags Maintenance System (`active`, Milestone 6A) are now published, each exposing a "View case study" CTA; Fleet Intelligence, Data Analyst Portfolio, and ERPNext Logistics Demo remain `case-study-coming-soon`. Private repository links are omitted until public-project review.

### Placeholder routes

The `/experience`, `/resume`, and `/contact` routes remain functional placeholders with minimal, non-factual content. The `/about` route has been transformed into a production-quality professional profile (Milestone 8A, uncommitted) featuring a 7-stage career journey, 6-domain capability explorer, professional experience, selected work, selected impact, and education/development sections.

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
