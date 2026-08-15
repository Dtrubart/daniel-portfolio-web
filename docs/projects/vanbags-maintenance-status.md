# VanBags Maintenance System — Deep Status Report

**Last updated:** 2026-08-14  
**Project slug:** `vanbags-maintenance`  
**Status in catalogue:** `active`  
**Featured:** `true`  
**Category:** Enterprise Application Development  
**Technologies:** ERPNext, Frappe, Python, Maintenance Management  
**Milestones completed:** M6A (Case Study), M6B (Interactive Maintenance + Tire Demo)

---

## 1. Project Overview

The **second flagship case study** and the second active project. It is an ERPNext/Frappe maintenance-management application designed around equipment records, preventive and corrective maintenance workflows, technician activities, spare parts, downtime, service history, and tire lifecycle management.

**Professional positioning:**  
"Demonstrate enterprise application development on ERPNext/Frappe for maintenance operations, work-order management, and logistics integration."

---

## 2. Milestone History & Implementation Status

| Milestone | Scope | Status | Commit |
|-----------|-------|--------|--------|
| M6A | VanBags Maintenance Case Study | Done | 7bb009e |
| M6B | VanBags Maintenance Interactive Demo | Done | 5418827 |

---

## 3. Content Architecture (`content/projects/vanbags-maintenance.tsx`)

### Navigation Anchors (8 total — all map 1:1 to sections)
```typescript
vanbagsMaintenanceNav() → NavItem[]
- overview
- domain
- work-orders
- logistics
- preventive
- tires
- architecture
- demo-evidence
```

### Sections Rendered (8 total — exact 1:1 nav mapping)
| Section ID | Title | Content Functions |
|------------|-------|-------------------|
| overview | Overview | `Overview` — tech list + sectionNote disclaimer |
| domain | Domain | `BusinessProblem`, `DomainModelSection`, `MaintenanceLifecycle` |
| work-orders | Work Orders | `WorkOrderManagement`, `ActivityExecution`, `DowntimeAndHistory` |
| logistics | Logistics | `LogisticsIntegration` (PartsIntegration) |
| preventive | Preventive Maintenance & History | `PreventiveMaintenance` (PM flow) |
| tires | Tire Management | `TireManagement` (TireLayout, TireDetail, TireLifecycle, TireMovement) |
| architecture | Architecture | `SolutionArchitecture`, `FrappeArchitecture`, `DataArchitecture`, `BusinessRules`, `TestingUAT` |
| demo-evidence | Demo & Evidence | `DemoPreviewSection`, `FutureM6B`, `TechnicalEvidence` |

### Key Content Patterns
- **`sectionNote` disclaimer** at top of Overview: explicitly states the model is "designed," not "production deployment," no real financial/customer data.
- **Domain model tree:** Recursive `DomainModel` component showing Equipment → MR → WO → Activities/Parts/Downtime.
- **Lifecycle flow:** ProcessFlow showing Requirement → MR → WO → Parts Check → Tech Exec → Completion → History.
- **Work order preview:** Interactive `WorkOrderPreview` with activity table (multi-technician, per-activity status).
- **Parts integration:** `PartsIntegration` table with availability + shortage blocking logic.
- **Tire management:** Graphical axle/position `TireLayout`, detailed `TireRecord` (DL), lifecycle states, movement history.
- **Business rules:** 10 "Designed" rules with explicit "Designed" badge (not asserted as implemented).
- **Frappe architecture:** ProcessFlow showing custom Frappe app on ERPNext.
- **UAT scenarios:** 9 scenarios covering corrective, parts, shortage, multi-tech, PM, downtime, tire install/rotation/invalid position.

---

## 4. Interactive Demo (`/projects/vanbags-maintenance/demo`)

### Route & Generation
- **Route:** `/projects/vanbags-maintenance/demo`
- **Prerendered:** Yes — included in `generateStaticParams` in shared demo route
- **Demo component:** `MaintenanceDemo` (imported from `components/demos/vanbags-maintenance/MaintenanceDemo`)

### Demo Features (M6B — Maintenance + Tire Management)
- **Corrective workflow:** Report → MR → WO → activity execution (assign technicians, start/complete) → reserve/issue parts → complete WO → service history.
- **Preventive workflow:** PM plan → scheduled maintenance → WO → next-due context update.
- **Parts logistics:** Availability + reservation enforced against warehouse stock; shortages block WO completion.
- **Tire lifecycle:** Graphical vehicle axle/position layout; install, rotate, remove, repair, return to warehouse, scrap — each enforcing position-uniqueness and valid state transitions.
- **Dashboard:** Open requests, open WOs, PM due, part shortages, vehicles under maintenance.
- **Reset control:** Returns workspace to initial synthetic state.

### Business Rules Enforced in Demo
1. WO completion requires all activities complete AND all required parts issued.
2. Tire position uniqueness — cannot install on occupied position.
3. Cannot assign two tires to one position.
4. Cannot issue unreserved / unavailable stock.
5. Invalid state transitions rejected.

### Demo Component Inventory (`components/demos/vanbags-maintenance/`)
| File | Purpose |
|------|---------|
| MaintenanceDemo.tsx | Root demo dispatcher with tab navigation |
| DashboardView.tsx | Summary cards (open requests, WOs, PM due, shortages, under-maintenance) |
| EquipmentView.tsx | Asset/equipment list |
| RequestsView.tsx | Maintenance request list |
| WorkOrdersView.tsx | Work order list |
| WorkOrderDetail.tsx | WO detail with activities |
| PartsView.tsx | Parts availability + reservation + issue |
| PreventiveMaintenanceView.tsx | PM plans + scheduling |
| ServiceHistoryView.tsx | Asset/service history timeline |
| TireManagementView.tsx | Tire module navigation |
| TireVehicleLayout.tsx | Graphical axle/position layout |
| TireDetail.tsx | Individual tire record (DL) |
| TireActions.tsx | Tire lifecycle actions (install/rotate/remove/etc.) |
| shared.tsx | Shared types, state, helpers |

---

## 5. Project-Specific Components (`components/projects/vanbags-maintenance/`)
These are presentational (non-interactive) design/documentation components used in the case study (distinct from the interactive `components/demos/` components).

| Component | Purpose | Props |
|-----------|---------|-------|
| `DomainModel.tsx` | Recursive domain model tree | `{ nodes: DomainNode[] }` |
| `PartsIntegration.tsx` | Parts flow + availability table + shortage | `{ flow, parts, availability }` |
| `TireLayout.tsx` | Graphical vehicle axle/position tire layout | `{ vehicle, axles }` |
| `TireHistory.tsx` | Tire movement history | `{ tire, movements }` |
| `WorkOrderPreview.tsx` | Illustrative WO card + activity table | `{ workOrder }` |

---

## 6. Reusable Components Consumed

| Component | Usage |
|-----------|-------|
| ProjectHeader | Breadcrumb + category + title + tags |
| ProjectNavigation | 8-item TOC with scroll-spy |
| ProjectSection | 8 section wrappers |
| ProcessFlow | Lifecycle, parts flow, PM flow, service history, Frappe flow, golden paths |
| ConfigurationPanel | Architecture layer grids (2×3), data architecture entity groups |
| UATTable | 9 validation scenarios |
| DemoPreview | Dashboard-type demo preview SVG |
| RepositoryNote | Private-repo notice |
| ButtonLink | "Launch Interactive Demo" CTA → `/projects/vanbags-maintenance/demo` |
| TireLayout, WorkOrderPreview, PartsIntegration, DomainModel, TireHistory | Project-specific |

---

## 7. Shared Demo Route Design (`app/projects/[slug]/demo/page.tsx`)

A single shared route dispatches both ERP (M5) and Maintenance (M6B) simulations:
```typescript
export const dynamicParams = false;
export async function generateStaticParams() {
  return [
    { slug: "vanbags-erp" },
    { slug: "vanbags-maintenance" },
  ];
}
// getProject(): notFound() if !project.demo?.enabled
// Default branch: MaintenanceDemo (else ERPWorkflowDemo)
```

**Critical note:** The demo route currently uses a **defaulting branch** (`else MaintenanceDemo`) rather than an explicit slug check on the main component render. It checks slug for metadata/title only. `getProject()` calls `notFound()` if `demo.enabled` is false. This works because only two slugs are statically generated, but it's a fragile pattern — if a fleet-intelligence demo were ever added, the default branch would render `MaintenanceDemo`. Future projects should add an explicit dispatch.

---

## 8. Route Health

| Route | Status | Notes |
|-------|--------|-------|
| `/projects/vanbags-maintenance` | 200 OK | Case study |
| `/projects/vanbags-maintenance/demo` | 200 OK | Live interactive simulation |

---

## 9. Known Gaps & Improvement Opportunities

### Architecture / Routing
1. **Shared demo route dispatch fragility** — Default `else` branch renders `MaintenanceDemo`. Should use an explicit `{slug}` → component map for extensibility (important before Fleet M7B adds a dashboard demo).
2. **Demo section title "Demo & Evidence" combines future+live demo + evidence** — Could be split into clearer sub-anchors.

### Content
3. **No Results / Lessons Learned sections** — Per portfolio spec §7, these are optional but would strengthen the case study.
4. **Tire positioning uses fixed 2/4 axle layout** — `AxleRow` hardcodes front (2 positions) vs rear (4 positions). Not extensible to different vehicle configurations.
5. **Parts table lacks inline editing in case study** — Only a static preview; the interactive version handles editing.

### Demo
6. **No "Reset" on case-study page** — Reset exists only in the live demo route.
7. **DashboardView** is summary-only; no trend/time-series views.
8. **PreventiveMaintenanceView** — described as planned in spec; verify full functionality.

### Technical
9. **Color tokens** — Project-specific components use raw Tailwind palette classes (emerald, amber, rose, blue, indigo, slate) rather than semantic CSS variables. Consistent with existing codebase but not themable.
10. **No dark-mode-specific contrast tuning** for color-coded status pills (relies on Tailwind `dark:` variants — works but could be validated).

---

## 10. Dependencies & Build Impact
- **No new dependencies.** Uses Next.js, React, Tailwind only.
- **Build passes:** `npm run build` — 16 static routes prerendered.
- **Lint passes:** `npm run lint` clean.

---

## 11. File Inventory

| File | Lines | Status |
|------|-------|--------|
| `content/projects/vanbags-maintenance.tsx` | 1045 | Committed |
| `components/projects/vanbags-maintenance/*.tsx` | 5 files | Committed |
| `components/demos/vanbags-maintenance/*.tsx` | 14 files | Committed |
| `app/projects/[slug]/demo/page.tsx` | 97 | Committed |

---

## 12. Summary Assessment
**Grade: A−** — Production-quality interactive case study with 8-section navigation, full domain model documentation, and a rich live simulation covering maintenance + tire lifecycle + parts logistics. The primary improvement opportunity is the **shared demo route's dispatch logic**, which should be refactored to an explicit slug→component map before Fleet M7B adds its own dashboard demo. Otherwise complete and production-grade.