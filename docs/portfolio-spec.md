# Daniel Trujillo — Portfolio Specification

## 1. Purpose

Create a professional portfolio demonstrating Daniel Trujillo's ability
to connect operations, data, enterprise systems, automation, and
business decision-making.

The website is intended primarily for:

1. Recruiters
2. Hiring managers
3. Technical managers
4. Professional contacts
5. Future consulting prospects

## 2. Professional Positioning

Primary positioning:

Industrial Engineer | Data, ERP & Business Systems

Supporting capabilities:

- Data Analytics
- ERP & Business Systems
- Automation
- Process Improvement
- Operations Analytics
- Enterprise Technology

Core narrative:

"I build data-driven systems that connect operations, enterprise
technology, automation, and decision-making."

## 3. Information Architecture

### Primary Navigation

- Home
- Projects
- Experience
- About
- Resume
- Contact

### Future

- Writing

## 4. Homepage

Sections:

1. Navigation
2. Hero
3. Featured Projects
4. Capabilities
5. Selected Experience
6. Certifications
7. Current Work
8. Contact CTA
9. Footer

## 5. Initial Featured Projects

### VanBags ERP Transformation

Focus:
- ERP
- Business Analysis
- Process Design
- Implementation

### VanBags Maintenance System

Focus:
- ERPNext
- Frappe
- Python
- Enterprise Application Development

### Fleet Intelligence Platform

Focus:
- Power BI
- Telemetry
- ERP
- Operations Analytics

## 6. Capabilities

### Data & Analytics

- Power BI
- SQL
- Python
- Power Query
- Excel
- Data Modeling

### ERP & Business Systems

- ERPNext
- Frappe
- Business Analysis
- Requirements
- Process Design
- UAT

### Automation

- Power Automate
- Google Apps Script
- Python
- Workflow Automation

### Process Improvement

- Process Mapping
- KPI Design
- Root Cause Analysis
- Continuous Improvement

## 7. Case Study Structure

Each flagship case study may include:

- Overview
- Business Problem
- Context
- Role
- Requirements
- Current State
- Future State
- Solution Architecture
- Implementation
- Data / System Architecture
- Testing and Validation
- Results
- Lessons Learned
- Next Steps
- GitHub Repository

Not every project requires every section.

## 8. V1 Technical Requirements

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Responsive
- Accessible
- SEO-ready
- Static-first
- Vercel compatible

No database.

No authentication.

No CMS.

No contact backend.

## 9. V1 Definition of Done

V1 is complete when:

- Homepage is production quality
- Projects page exists
- Three flagship case studies exist
- Experience page exists
- About page exists
- Resume page exists
- Contact page exists
- Mobile and desktop layouts are polished
- Metadata is configured
- Sitemap exists
- robots.txt exists
- Open Graph metadata exists
- Production build passes
- Website is deployed to Vercel

## 10. Interactive Project Pages

Each project gets a dedicated, statically-generated page at `/projects/[slug]`
driven by the single source of truth in `data/projects.ts`.

### Route generation

- `generateStaticParams` returns all project slugs, so every project is prerendered.
- `dynamicParams = false` ensures only defined slugs resolve; undefined slugs return a 404.
- `notFound()` provides a defensive guard for any slug missing from the catalogue.
- `generateMetadata` produces per-project `<title>`, description, and Open Graph metadata.

### Page structure

1. `ProjectHeader` — breadcrumb, category, title, description, technology tags.
2. `ProjectNavigation` — sticky anchor table of contents (Client Component) with scroll-spy; lists only enabled sections.
3. `ProjectSection` — reusable section wrapper exposing an `id` anchor.
   4. Four section types, each rendered only when the project model enables it:
      - **Case Study** — the project's professional objective plus a note that the detailed case study is planned.
      - **Architecture** — system and data-architecture overview (scaffolded).
      - **Interactive Demo** — `DemoPreview` renders a type-specific preview (software, dashboard, workflow, analytics).
      - **Technical Evidence** — `RepositoryNote` defers links until public review.

      In Milestone 4A these bodies are intentionally lightweight scaffolding; no invented case-study content is published. VanBags ERP Transformation (Milestone 4B) now provides a dedicated 14-section case study from `content/projects/vanbags-erp.tsx`, while the remaining four projects stay on this lightweight scaffold. Detailed case-study content and interactive demos are implemented in later milestones.

### Catalogue cards

Catalogue cards link to `/projects/[slug]`. Published (`active`) projects additionally expose a "View case study" CTA; the previous "Case study coming soon" placeholder has been removed. VanBags ERP Transformation is now `active` (Milestone 4B); the other four projects remain `case-study-coming-soon`.

## 11. Interactive Demo Principles

### Static-first

The portfolio remains static-first. Interactive demos may use Client Components where required. Do not convert whole project pages into Client Components unless necessary.

### Synthetic / approved data

Demos must use synthetic data or explicitly approved portfolio data. Never expose employer confidential information, production data, credentials, secrets, private customer data, proprietary datasets, or private repositories.

### Demo isolation

Future interactive components should conceptually live under `components/demos/`. Project-specific demo data should conceptually live under `data/demos/`. Do not create empty directories merely for documentation purposes; create them only when implementation requires them.

### Golden path

Functional demos should reproduce important business workflows rather than entire enterprise applications. A demo should answer: "What is the minimum interactive experience required to demonstrate the underlying system design and business logic?"

### State

Future demos may use React state and `localStorage` where justified. No database is required for V1.

### Reset

Stateful functional demos should eventually support "Reset Demo" where appropriate.

### Demo types

Supported demo types remain: `workflow`, `software`, `dashboard`, `analytics`.

## 12. Project Differentiation

The five projects must not feel like the same project repeated. Each has a different professional purpose:

- **VanBags ERP Transformation** — design and configure the enterprise system.
- **VanBags Maintenance System** — build an enterprise maintenance module.
- **Fleet Intelligence Platform** — analyze and optimize fleet operations.
- **Data Analyst Portfolio** — demonstrate multi-tool analytical problem solving.
- **ERPNext Logistics Demo** — demonstrate ERP transactional logistics logic.
- **Personal Portfolio Platform** — software architecture / product-development case study for this portfolio website itself.

Avoid unnecessary functional duplication between projects.

## 13. Master Implementation Roadmap

- **Milestone 4A** — Interactive Project Framework
- **Milestone 4B** — VanBags ERP Transformation Case Study
- **Milestone 5** — VanBags ERP Workflow & Configuration Simulator
- **Milestone 6A** — VanBags Maintenance Case Study
- **Milestone 6B** — VanBags Maintenance Functional Demo (work orders, logistics integration, graphical tire module)
- **Milestone 7A** — Fleet Intelligence Case Study
- **Milestone 7B** — Fleet Intelligence Interactive Dashboard (telemetry, fuel, RPM, theft alerts, flexible maintenance, routes, driver ranking, team ranking, radar chart)
- **Milestone 8A** — Professional Profile Foundation (`/about` transformation: Professional Profile, Career Journey, Capability Explorer, Experience, Selected Work, Impact, Education, Resume preview)
- **Milestone 8B** — Interactive Professional Profile (interactive career journey timeline, capability network explorer, evidence chains)
- **Milestone 8C** — Resume Integration (`/resume` page derived from `data/professional-facts.ts`; print-friendly layout; About → Resume CTA)
- **Milestone 8D** — Contact redesign (interest areas, public location, pending verification contact details, data-safety compliant)
- **Milestone 9A** — Personal Portfolio Platform Case Study (case study content, navigation, architecture documentation)
- **Milestone 9B** — Personal Portfolio Platform Interactive Architecture Explorer (interactive layer visualization)
- **Milestone 10A** — ERPNext Logistics Case Study
- **Milestone 10B** — ERPNext Logistics Functional Demo (Items, Warehouses, Material Receipt, Material Issue, Material Transfer, Stock Balance, Stock Ledger)
- **Milestone 11** — Shared Demo Components
- **Milestone 12** — Cross-Project Visual and Responsive Polish
- **Milestone 13** — Experience / About / Resume / Contact consolidation
- **Milestone 14** — GitHub / Technical Evidence Integration
- **Milestone 15** — SEO / Metadata / Structured Discoverability
- **Milestone 16** — Production Deployment

## 14. VanBags ERP Interactive Simulation (Milestone 5)

Implemented scope for the route `/projects/vanbags-erp/demo`:

- **Business Process** mode: six predefined scenarios (Standard Order, PO Modification, Split Shipment, Partial Shipment, Packaging Delay, Consolidated Container) with a derived order-to-delivery workflow, KPI quantities, and simulated traceability.
- **ERP Configuration** mode: six explorable views (Company Setup, Chart of Accounts, Accounting Mappings, Cost Centers, Warehouses, Item Groups) plus an accounting consequence preview.
- Static-first: React state only. No backend, database, authentication, or external services.
- Data is entirely synthetic and illustrative.

## 15. VanBags Maintenance System Case Study (Milestone 6A)

Implemented scope for the route `/projects/vanbags-maintenance`:

- Case study authored in `content/projects/vanbags-maintenance.tsx`, grouped into navigation anchors: Overview, Domain, Work Orders, Logistics, Preventive Maintenance & History, Tire Management, Architecture, and Demo & Evidence.
- Domain model (equipment/vehicle, maintenance requests, work orders, activities, parts, downtime, service history, tire positions) documented conceptually with reusable presentational components under `components/projects/vanbags-maintenance/`.
- Work Order structure with activity-level execution (multi-technician, per-activity status traceability).
- Maintenance ↔ Logistics integration: parts requirements, warehouse availability, reservation, issue/consumption, and a material-availability/shortage visualization.
- Preventive maintenance scheduling, downtime capture, and a service-history timeline.
- Tire management: graphical vehicle axle/position layout, unique tire identity, tire detail, lifecycle states, and tire movement history.
- Layered solution architecture, ERPNext/Frappe architecture, conceptual entity architecture, modeled business rules, and UAT scenarios. A distinction is drawn between designed module rules and Frappe-native framework behavior.
- Interactive simulation deferred to Milestone 6B (see §16); this milestone (6A) contains no `/projects/vanbags-maintenance/demo` route.
- Static-first, synthetic data, no backend/database.

## 16. VanBags Maintenance Interactive Simulation (Milestone 6B)

Implemented scope for the route `/projects/vanbags-maintenance/demo`:

- A shared demo route (`app/projects/[slug]/demo/page.tsx`) dispatches both the ERP (Milestone 5) and Maintenance (Milestone 6B) simulations; `generateStaticParams` prerenders both slugs with `dynamicParams = false`.
- Corrective workflow: report a problem on an asset → creates a Maintenance Request → converts to a Work Order → executes activity-level steps (assign technicians, start/complete activities) → reserve and issue required parts against on-hand stock → complete the Work Order, which preserves a service-history record and returns the asset to operational status.
- Preventive workflow: a due PM plan generates a planned Work Order and advances the next-due context.
- Parts logistics: availability, reservation, and issue/consumption are enforced against warehouse stock; outstanding shortages block Work Order completion.
- Tire lifecycle: graphical vehicle axle/position layout with individually traceable tires; install, rotate, remove, repair, return to warehouse, and scrap actions each enforce position-uniqueness and valid state transitions, with full movement history.
- A dashboard summarizes open requests, open work orders, PM due, part shortages, and vehicles under maintenance; a Reset control returns the workspace to its initial synthetic state.
- Business rules prevent invalid transitions: completing a Work Order before all activities are complete and all required parts are issued; installing a tire onto an occupied position; rotating a tire to its current position; assigning two tires to one position; issuing unreserved stock.
- Static-first, React state only. No backend, database, authentication, or external services. Data is entirely synthetic and illustrative.

## 17. Professional Profile Architecture (Milestone 8A)

`/about` is transformed into a production-quality professional profile for Daniel Trujillo, positioned as an Industrial Engineer specializing in Data, Business Systems & Operations.

### Information Architecture

The About page is composed of 10 sections with semantic anchor navigation:

1. **Professional Profile** — identity, headline, supporting narrative
2. **Career Journey** — 7-stage capability evolution (timeline visualization)
3. **Capability Explorer** — 6 primary domains + cross-cutting methods
4. **Professional Experience** — roles across employers with expandable details
5. **Selected Work** — curated portfolio of systems, analytics, automation, finance projects
6. **Selected Impact** — evidence-aware metrics with conservative attribution
7. **How I Work** — 4 professional principles
8. **Education & Development** — formal education, certifications, current learning
9. **Resume Preview** — foundation with View Resume link to `/resume` (M8C)
10. **Contact CTA**

### Data Model

A single structured data layer lives in `data/professional-profile.ts` containing:
- Professional identity (name, headline, supporting line, summary, domain tags)
- 7 career stages with title, period, theme, domains, evolution
- 6 capability domains with core areas
- 6 cross-cutting capabilities (business analysis, systems thinking, etc.)
- 7 professional experiences with organization, role, period, context, contributions, capabilities, technologies (including Able Group)
- 12 selected work items with evidence levels (verified/supported/contextual)
- 4 selected impact items with conservative metrics
- 4 professional principles
- Education, certifications, and current development items

Evidence levels ("verified", "supported", "contextual") are used internally to prevent unsupported claims. No private achievements are included in public-facing arrays.

### Component Architecture

Components live under `components/about/`:
- `AboutNavigation.tsx` — semantic anchor links
- `ProfessionalProfile.tsx` — opening identity section
- `CareerJourney.tsx` — 7-stage timeline using CSS/Tailwind only (no timeline library)
- `CapabilityExplorer.tsx` — domain cards + cross-cutting methods
- `ExperienceList.tsx` — expandable details/summary pattern
- `SelectedWork.tsx` — project cards linking to portfolio case studies
- `SelectedImpact.tsx` — evidence-aware impact metrics
- `ProfessionalPrinciples.tsx` — How I Work section
- `EducationDevelopment.tsx` — education, certifications, current focus
- `ResumePreview.tsx` — placeholder foundation
- `ContactCTA.tsx` — contact call-to-action

### Content Safeguards

- Financing impact states "Financing process supported" — not "Raised $22.5M"
- All metrics qualified with operational context
- No fabricated employers, dates, achievements, or financial results
- Employer-related projects summarized/reconstructed safely

## 18. Personal Portfolio Platform Case Study (Milestone 9A)

The portfolio website itself is a project case study demonstrating:

- Solution architecture (Next.js App Router, static generation)
- Information architecture (content/data/presentation separation)
- Repository architecture (app/, components/, content/, data/, lib/, docs/)
- Component architecture (interactive demos, project framework)
- Data/content separation (professional facts, project metadata, synthetic demo data)
- Interactive demo architecture (Client Components, React state, no backend)
- Dynamic project routing (`/projects/[slug]`, `/projects/[slug]/demo`)
- Static generation strategy (`generateStaticParams`, `dynamicParams = false`)
- State isolation (per-demo React state)
- Synthetic-data architecture (portfolio data layer)
- Reusable component design
- Development workflow (lint, build, type-check)
- Validation strategy (manual visual QA across breakpoints)
- Git/GitHub workflow (uncommitted milestones for review)
- Deployment architecture (Vercel)

### Architecture Explorer Demo (Milestone 9B)

The Personal Portfolio Platform case study now includes an interactive
Architecture Explorer demo at `/projects/personal-portfolio-platform/demo`.

The explorer allows visitors to select from six architecture layers
(Presentation, Content, Professional Data, Project Framework, Interactive Demos,
Platform & Delivery) and inspect:

- Layer purpose, modules, responsibilities, and decisions
- Professional data flow (facts → presentation model → pages)
- Project framework routing (catalogue → dynamic route → content module)
- Repository structure with expandable folder tree
- Architecture decisions (expandable ADR-style cards)
- Project architecture examples (actual demos and patterns)
- Development pipeline and quality gates
- Evolution roadmap (implemented vs. planned)

The M9A case-study Architecture Explorer preview section has been updated with
a live **Launch Architecture Explorer** CTA.

#### M9C Internationalization Extension (Planned)

Internationalization remains a planned M9C extension. The future concept:

```
Locale Layer
        ↓
EN / ES presentation content
        ↓
Shared canonical professional facts
```

Routes: `/en/...` and `/es/...`
Language switcher, hreflang tags, and localized metadata are future work.
Not implemented in M9B.

### Approved Architecture Model

Portfolio Platform

Presentation Layer
- Home · About · Contact · Projects Catalogue · Project Pages

Content Layer
- Professional Profile · Career Journey · Experience · Capabilities · Selected Work · Project Case Studies

Interactive Applications
- VanBags ERP Simulator · VanBags Maintenance Demo · Fleet Intelligence Dashboard · Architecture Explorer · Future project demos

Data Layer
- Professional Facts · Professional Profile Data · Project Metadata · Synthetic Demo Data · Configuration Data

Platform / Delivery
- Next.js · React · TypeScript · Tailwind CSS · Git · GitHub · Vercel

### Case Study Structure (Implemented in Milestone 9A)

1. Overview
2. Information Architecture
3. Solution Architecture
4. Repository Architecture
5. Data & Professional Facts Architecture
6. Project Framework
7. Interactive Demo Architecture
8. Component Architecture
9. Development & Quality
10. Deployment Architecture
11. Evolution Roadmap
12. Technical Evidence
13. Architecture Explorer Preview

### Interactive Architecture Explorer (Milestone 9B — Deferred)

The Interactive Architecture Explorer is now implemented in Milestone 9B at
`/projects/personal-portfolio-platform/demo`. The M9A case-study preview section
has been updated to a live **Launch Architecture Explorer** CTA. Users can select
from six layers — Presentation, Content, Professional Data, Project Framework,
Interactive Demos, and Platform & Delivery — and inspect repository structure,
data flows, architecture decisions, project examples, and the development
pipeline. M9C Internationalization remains planned for a future milestone.

