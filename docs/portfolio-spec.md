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

Avoid unnecessary functional duplication between projects.

## 13. Master Implementation Roadmap

- **Milestone 4A** — Interactive Project Framework
- **Milestone 4B** — VanBags ERP Transformation Case Study
- **Milestone 5** — VanBags ERP Workflow & Configuration Simulator
- **Milestone 6A** — VanBags Maintenance Case Study
- **Milestone 6B** — VanBags Maintenance Functional Demo (work orders, logistics integration, graphical tire module)
- **Milestone 7A** — Fleet Intelligence Case Study
- **Milestone 7B** — Fleet Intelligence Interactive Dashboard (telemetry, fuel, RPM, theft alerts, flexible maintenance, routes, driver ranking, team ranking, radar chart)
- **Milestone 8A** — Data Analyst Portfolio Case Study
- **Milestone 8B** — Data Analyst Interactive Lab (Org Chart Overhaul, Flatten the Stack)
- **Milestone 9A** — ERPNext Logistics Case Study
- **Milestone 9B** — ERPNext Logistics Functional Demo (Items, Warehouses, Material Receipt, Material Issue, Material Transfer, Stock Balance, Stock Ledger)
- **Milestone 10** — Shared Demo Components
- **Milestone 11** — Cross-Project Visual and Responsive Polish
- **Milestone 12** — Experience / About / Resume / Contact
- **Milestone 13** — GitHub / Technical Evidence Integration
- **Milestone 14** — SEO / Metadata / Structured Discoverability
- **Milestone 15** — Production Deployment

## 14. VanBags ERP Interactive Simulation (Milestone 5)

Implemented scope for the route `/projects/vanbags-erp/demo`:

- **Business Process** mode: six predefined scenarios (Standard Order, PO Modification, Split Shipment, Partial Shipment, Packaging Delay, Consolidated Container) with a derived order-to-delivery workflow, KPI quantities, and simulated traceability.
- **ERP Configuration** mode: six explorable views (Company Setup, Chart of Accounts, Accounting Mappings, Cost Centers, Warehouses, Item Groups) plus an accounting consequence preview.
- Static-first: React state only. No backend, database, authentication, or external services.
- Data is entirely synthetic and illustrative.

