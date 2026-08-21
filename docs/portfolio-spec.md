

## 17# Daniel Trujillo — Portfolio Specification

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

- Solutions (optional route — `/solutions`, not in primary navigation pending review)
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
- **Milestone 8D** — Contact form (production contact page with internal form, server-side email delivery via Resend, hidden destination email, LinkedIn/GitHub public channels, honeypot anti-spam, client-side validation, and responsive layout)
- **Milestone 9A** — Personal Portfolio Platform Case Study (case study content, navigation, architecture documentation)
- **Milestone 9B** — Personal Portfolio Platform Interactive Architecture Explorer (interactive layer visualization)
- **Milestone 10A** — Solutions Foundation (`/solutions` route: four solution areas, Industrial Engineering foundation, interactive Problem Explorer, project cross-references; not in primary navbar pending review)
- **Milestone 10B** — ERPNext Logistics Case Study
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

### Guided Tour Mode (V2-A)

A Guided Tour mode provides a 13-step walkthrough of the Maintenance System
key workflows at /projects/vanbags-maintenance/demo?mode=guided. The tour covers:

1. Register Equipment - vehicle TRK-DEMO-017 (HT-500, 3 axles, 10 tire positions)
2. Configure Maintenance Templates - M1, M2, M3 service definitions
3. Build Maintenance Plan - PM schedule at 5k, 20k, 35k, 50k, 65k, 80k km
4. Configure Tire Layout - initial tire installation on 10 positions
5. Simulate Fleet Operation - advance odometer to 4,500 km
6. Respond to Alerts - maintenance and tire inspections
7. Perform Tire Inspection - at 4,500 km (Normal and Abnormal findings)
8. Reach PM Trigger - M1 due at 5,000 km
9. Generate Preventive Work Order - WO-PM-DEMO-001 from PM plan
10. Execute Activities & Parts - technician assignment, part reservation/issue
11. Send Activity to Backlog - brake component shortage (BACKLOG-DEMO-001)
12. Create Follow-Up Work Order - WO-FU-DEMO-002 with part shortage
13. Tire Lifecycle - trace tire through Warehouse to Installed to Rotation to Retread

The guided tour uses the same synthetic data and enforces the same business
rules as the interactive workspace. A MaintenanceDemoContainer client component
manages mode switching via a tab selector, with URL parameter ?mode=guided
for deep-linking.

### V2 Roadmap

| Milestone | Focus | Status |
| --- | --- | --- |
| V2-A | Guided Experience & Unified Domain Architecture | Implemented |
| V2-B | Unified Simulation Engine | Coming Soon |
| V2-C | Guided Maintenance Journey | Coming Soon |
| V2-D | Free Exploration Mode Expansion | Coming Soon |
| V2-E | Reporting & Final Integration | Coming Soon |


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


## 19. Solutions Section (Milestone 10A)

### Purpose

Solutions extends the portfolio from a career-only presentation toward a professional platform capable of supporting both career opportunities and selected project-based collaboration. It answers: "What kinds of business and operational problems can Daniel help solve using his professional capabilities?"

### Positioning

PROFESSIONAL-FIRST. CONSULTING-CAPABLE-SECOND. Solutions reinforces Daniel's professional positioning rather than competing with it. No titles such as "Freelancer", "Consultant", "Founder", "CEO", "Agency". No "Hire me", "Book a call", "Pricing", "Packages", "Hourly rates", "Free consultation".

### Architecture

**Platform structure:**

```
Professional Identity
│
├── About
├── Resume
│
├── Evidence
│   └── Projects
│
├── Problem / Capability Translation
│   └── Solutions
│
└── Connection
    └── Contact
```

### Four Solution Areas

1. **Operational Intelligence** — Data, KPIs, analytics & decision support.
   Related evidence: Fleet Intelligence.

2. **Business Systems & ERP** — Processes, requirements, workflows & system design.
   Related evidence: VanBags ERP Transformation, VanBags Maintenance System.

3. **Workflow Automation** — Manual work, structured workflows, automation & traceability.
   Related evidence: Fleet Intelligence.

4. **Operational Excellence** — Process improvement, standardization & continuous improvement.
   Related evidence: VanBags ERP Transformation, Fleet Intelligence.

### Interactive Problem Explorer

Visitors select from four problem statements. Selecting a problem reveals the corresponding Solution Area with challenges, approach steps, capabilities, tools, and related portfolio projects. All interactive controls are keyboard accessible with aria-expanded and focus states.

### Industrial Engineering Foundation

A CSS/SVG diagram shows the four Solution Areas converging on Industrial Engineering as the shared methodological foundation.

### Contact Integration

The Solutions page ends with a subtle CTA: "Have a related challenge?" linking to `/contact`. No email is exposed. No contact form is restored.

### Navigation Decision

The `/solutions` route is not added to the primary navbar after M10A. It is available directly via URL for manual review.

### Future Consulting Evolution

The Solutions architecture is intended to support future evolution (Professional Portfolio → Professional + Projects → Independent Consulting → Future Practice) but no UI for these stages is created in M10A.

### Professional Positioning Check

- PROFESSIONAL-FIRST POSITIONING PRESERVED
- NO FREELANCER TITLE
- NO PRICING/PACKAGES
- NO UNSUPPORTED CONSULTING CLAIMS

### Bidirectional Integration (M10B)

A canonical projectSolutionLinks mapping in data/solutions.ts defines Project-to-Solution relationships with primary/secondary distinction. Both directions are derived programmatically:

- getProjectsForSolution(solutionId) returns projects for a solution
- getSolutionsForProject(slug) returns solution links for a project

The /projects page includes a SolutionFilter for capability-based exploration. Project cards show subtle solution tags. Project case studies include a Capabilities Demonstrated section linking back to /solutions#anchor. Personal Portfolio Platform has no solution mapping (empty array).

## 46. Contact Architecture (Milestone 8D)

### Overview

The `contact` page provides a production-quality contact experience
featuring LinkedIn and GitHub as public channels with QR codes. Visitors
can connect via these verified professional channels. Server-side email
delivery infrastructure (POST /api/contact, Resend integration, validation,
anti-spam) is fully implemented but NOT rendered to visitors in the current
release. The implementation is preserved as dormant code for future activation.
No `mailto:` is used.

### Public Contact Experience

The public Contact page renders ONLY:

- Intro / "Let's connect" heading with professional interests
- LinkedIn card with QR code + "Connect on LinkedIn" link
- GitHub card with QR code + "Explore my GitHub" link
- Verified public location (Burnaby, BC / Metro Vancouver, Canada)

### Public Contact Channels

LinkedIn: `https://www.linkedin.com/in/daniel-trujillo-barthe/`
GitHub: `https://github.com/Dtrubart`

### Architecture (Implemented, Current Release Hidden)

Visitor
   ->
Contact Form (Client Component) [dormant, not rendered in current release]
   ->
POST /api/contact (Next.js App Router Route Handler)
   ->
Server-side validation + anti-spam checks
   ->
Resend email delivery
   ->
Private destination inbox

### Privacy Principle

The private destination email must never be displayed publicly.
The Contact page currently exposes NO email address to visitors — only
LinkedIn and GitHub are shown. Server-side email delivery infrastructure is
implemented but dormant.

Public contact configuration lives in `data/contact.ts` (LinkedIn, GitHub,
location, professional interests only). Email credentials and destination
address live in server-only environment variables.

### Anti-Spam Approach

Implemented (dormant until form is activated):

- Honeypot field: A hidden `website` field; if populated, the submission is
  silently rejected (returns generic success without sending).
- Submission timing: A `startedAt` timestamp is tracked client-side;
  submissions completed impossibly fast are silently rejected.
- Input limits: Character limits enforced server-side and client-side
  (name 2-100, email <=254, company <=120, subject 3-160, message 10-5000).
- Reason validation: Only the approved ContactReason enum values are
  accepted.

No CAPTCHA is used in V1. CAPTCHA / Turnstile documented as a future
escalation option if spam becomes a real problem.

### Server-side Validation

The API route (`app/api/contact/route.ts`) validates all incoming data:

- Rejects missing required fields, invalid email, invalid reason, overly long
  payloads, malformed JSON, and unexpected field types.
- Returns `400` for validation errors, `200` for success, `500` for
  provider failures, `429` for rate limiting (if implemented).
- Never exposes internal provider errors, API keys, destination email, or
  stack traces to the visitor.

### Email Delivery

Implemented (dormant until form is activated):

- Provider: Resend (`npm install resend`)
- From: CONTACT_FROM_EMAIL (configured sender identity)
- Reply-To: Visitor's submitted email (enables direct reply)
- Destination: CONTACT_TO_EMAIL (read from server env var only)
- Both HTML and plain-text email bodies are generated.
- User content is HTML-escaped before embedding in the email body.

### Environment Variables

Server-only (never prefixed with NEXT_PUBLIC_):

- RESEND_API_KEY -- Resend API key
- CONTACT_TO_EMAIL -- Private destination inbox
- CONTACT_FROM_EMAIL -- Verified sender email/domain
- CONTACT_FROM_NAME -- Sender display name (optional)

See .env.example for the canonical list. Only required if/when email
delivery is activated.
## Project Inventory / Evidence Architecture

### Overview

The portfolio uses a canonical **Project Inventory** as the single source of truth for all professional work and portfolio evidence:

- **Experience** (data/professional-facts.ts, data/professional-profile.ts) -- employment records
- **Project Inventory** (data/project-inventory.ts) -- canonical project/work records
- **Capabilities** (data/professional-facts.ts, data/professional-profile.ts) -- capability domains
- **Portfolio Evidence** (content/projects/, data/projects.ts) -- public case study routes

### Professional Work vs Portfolio Evidence

**Professional Work** includes real employer, advisory, and academic initiatives. These are actual work performed during employment or professional engagements.

**Portfolio Case Studies / Reconstructions** are independent demonstrations and reconstructions. They use synthetic data, generic organizations, and original code. They may be *inspired by* professional experience but are NOT the employer production systems.

The website MUST NOT imply that a portfolio case study equals the production system deployed at an employer.

### Classifications

| Classification | Visitor badge | Status |
|---|---|---|
| professional-program | Professional Program | implemented |
| professional-work | Professional Work | implemented / operational |
| advisory-project | Advisory Project | proposal / business-case |
| academic-project | Academic Project | implemented |
| teaching-automation | Teaching Automation | implemented |
| portfolio-case-study | Portfolio Case Study | portfolio-demo |
| portfolio-reconstruction | Portfolio Reconstruction | reconstruction |
| independent-project | Portfolio Case Study | portfolio-demo |
### Data Architecture
The Project Inventory (data/project-inventory.ts) is the canonical typed source for all selected work items. SelectedWork.tsx derives its professional work and portfolio evidence sections from this inventory. Professional facts (professional-facts.ts, professional-profile.ts) provide experience context and capability domains.