export type ArchitectureLayerKey =
  | "presentation"
  | "content"
  | "professional-data"
  | "project-framework"
  | "interactive-demos"
  | "platform-delivery";

export interface ArchitectureLayer {
  id: ArchitectureLayerKey;
  title: string;
  shortDescription: string;
  longDescription: string;
  modules: string[];
  responsibility: string;
  decisions: string[];
  evidence: string[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "presentation",
    title: "Presentation",
    shortDescription: "Public-facing UI surfaces for portfolio visitors.",
    longDescription:
      "Presentation components consume content and data but never become independent sources of professional facts. All facts originate in the data layer.",
    modules: [
      "app/page.tsx — Homepage composition",
      "app/about/page.tsx — Professional profile pages",
      "app/projects/page.tsx — Project catalogue",
      "app/projects/[slug]/page.tsx — Dynamic project pages",
      "app/resume/page.tsx — Resume foundation",
      "app/contact/page.tsx — Contact placeholder",
      "components/layout/Navbar.tsx — Navigation (Client Component, mobile toggle)",
      "components/layout/Footer.tsx — Footer navigation",
      "components/ui/Container.tsx — Responsive max-width wrapper",
      "components/ui/Button.tsx — Interactive button primitives",
      "components/ui/ButtonLink.tsx — Anchor/Link button primitives",
      "components/ui/SectionHeading.tsx — Section typography",
      "components/about/* — Interactive About presentation components",
      "components/home/* — Homepage sections (Hero, Featured Projects, etc.)",
    ],
    responsibility:
      "Render public pages and reusable layout/UI primitives. Present facts from the data layer without duplicating them.",
    decisions: [
      "Static-first: pages are pre-rendered at build time",
      "Client Components only where interaction is required (Navbar mobile toggle, demos)",
      "Shared UI primitives avoid per-project styling duplication",
    ],
    evidence: [
      "app/layout.tsx — root layout with skip-link and semantic structure",
      "app/page.tsx — homepage composition",
      "components/layout/Navbar.tsx — accessible mobile menu toggle",
    ],
  },
  {
    id: "content",
    title: "Content",
    shortDescription: "Long-form case studies and structured narrative content.",
    longDescription:
      "Rich case-study content lives here, separate from catalogue metadata. Each project that has a detailed case study gets a dedicated module.",
    modules: [
      "content/projects/vanbags-erp.tsx — 14-section case study",
      "content/projects/vanbags-maintenance.tsx — maintenance domain case study",
      "content/projects/fleet-intelligence.tsx — fleet analytics case study",
      "content/projects/personal-portfolio-platform.tsx — portfolio platform case study",
    ],
    responsibility:
      "Store project-specific storytelling content. Dispatch is handled by lib/projectContent.tsx.",
    decisions: [
      "Case studies are separate modules, not embedded in catalogue data",
      "Each module exports its own navigation and section definitions",
      "Light scaffold bodies are used for projects without dedicated case studies",
    ],
    evidence: [
      "lib/projectContent.tsx — content router dispatching to dedicated modules",
      "content/projects/*.tsx — dedicated case-study files",
    ],
  },
  {
    id: "professional-data",
    title: "Professional Data",
    shortDescription: "Canonical professional facts and presentation model.",
    longDescription:
      "Professional information and demo simulation data are strictly separated. Professional facts never mix with synthetic demo records.",
    modules: [
      "data/professional-facts.ts — factual source of truth",
      "data/professional-profile.ts — presentation model and narrative composition",
      "data/experience.ts — professional experience entries",
      "data/capabilities.ts — capability domain definitions",
      "data/certifications.ts — certification records",
      "data/current-work.ts — current work focus",
      "data/projects.ts — project catalogue metadata",
    ],
    responsibility:
      "Provide the single source of truth for professional information. Feed About, Resume, Experience, and Contact without duplication.",
    decisions: [
      "Facts are TypeScript modules, not a CMS — version-controlled and type-checked",
      "Presentation model separates narrative from raw facts",
      "Synthetic demo data lives in data/demos/ — never in professional fact files",
    ],
    evidence: [
      "data/professional-facts.ts — canonical employment, education, certifications",
      "data/professional-profile.ts — About page narrative composition",
      "data/projects.ts — project catalogue with feature flags",
      "data/demos/vanbags-erp.ts — synthetic ERP data (separate from professional facts)",
    ],
  },
  {
    id: "project-framework",
    title: "Project Framework",
    shortDescription: "Reusable routing, content dispatch, and section rendering.",
    longDescription:
      "A common project framework allows each project to have a project-specific case study while sharing routing, navigation, and section rendering.",
    modules: [
      "data/projects.ts — catalogue metadata (slug, status, categories, flags)",
      "lib/projectContent.tsx — router dispatching to dedicated content modules",
      "app/projects/[slug]/page.tsx — dynamic case-study page",
      "app/projects/[slug]/demo/page.tsx — dynamic demo page",
      "components/projects/ProjectHeader.tsx — breadcrumb and project metadata",
      "components/projects/ProjectNavigation.tsx — sticky scroll-spy TOC",
      "components/projects/ProjectSection.tsx — section wrapper with id anchor",
      "components/projects/ProjectCard.tsx — catalogue card",
      "components/projects/DemoPreview.tsx — typed demo preview",
      "components/projects/ConfigurationPanel.tsx — titled configuration display",
      "components/projects/ProcessFlow.tsx — process flow diagram",
      "components/projects/UATTable.tsx — scenario validation table",
      "components/projects/RepositoryNote.tsx — pending/private repository notice",
    ],
    responsibility:
      "Provide reusable project rendering without forcing every project into the same content.",
    decisions: [
      "generateStaticParams returns all project slugs for prerendering",
      "dynamicParams = false ensures undefined slugs return 404",
      "Sections render only when model flags enable them",
    ],
    evidence: [
      "app/projects/[slug]/page.tsx — static params and metadata generation",
      "lib/projectContent.tsx — light scaffold + dedicated module dispatch",
    ],
  },
  {
    id: "interactive-demos",
    title: "Interactive Demos",
    shortDescription:
      "Client-side simulations using synthetic data with isolated state.",
    longDescription:
      "Each demo is a Server-rendered route loading an isolated Client Component. State is local — React useState or useReducer — with no global state library.",
    modules: [
      "app/projects/[slug]/demo/page.tsx — shared demo routing",
      "components/demos/vanbags-erp/ — ERP workflow + configuration simulator",
      "components/demos/vanbags-maintenance/ — Maintenance + Tire Management simulator",
      "components/demos/fleet-intelligence/ — Fleet analytics dashboard",
      "components/demos/personal-portfolio-platform/ — Architecture Explorer",
      "data/demos/vanbags-erp.ts — synthetic ERP dataset",
      "data/demos/vanbags-maintenance.ts — synthetic maintenance dataset",
      "data/demos/fleet-intelligence.ts — synthetic fleet dataset",
    ],
    responsibility:
      "Provide interactive, resettable, deterministic simulations using synthetic data only.",
    decisions: [
      "Static-first: demos are prerendered routes with Client Components",
      "Local state only — no global state library or backend",
      "Synthetic datasets are typed and clearly separated from professional facts",
    ],
    evidence: [
      "app/projects/[slug]/demo/page.tsx — shared demo route with per-slug dispatch",
      "components/demos/vanbags-erp/ERPWorkflowDemo.tsx — useReducer state pattern",
      "components/demos/fleet-intelligence/FleetIntelligenceDemo.tsx — useReducer state pattern",
      "components/demos/vanbags-maintenance/MaintenanceDemo.tsx — useReducer state pattern",
    ],
  },
  {
    id: "platform-delivery",
    title: "Platform & Delivery",
    shortDescription:
      "Build tooling, version control, and deployment infrastructure.",
    longDescription:
      "The portfolio uses a static-first Next.js stack deployed to Vercel through GitHub. No database, authentication, or backend is required for V1.",
    modules: [
      "package.json — Next.js 16, React 19, TypeScript, Tailwind CSS 4",
      ".eslintrc — lint configuration",
      "next.config.ts — Next.js configuration",
      ".github/ — GitHub repository",
      "docs/portfolio-spec.md — product specification",
    ],
    responsibility:
      "Provide the toolchain, validation, and deployment pipeline.",
    decisions: [
      "Static-first architecture — no backend required for V1",
      "Typed content modules — no CMS, no database",
      "Vercel-compatible deployment",
      "Environment configuration via NEXT_PUBLIC_SITE_URL",
    ],
    evidence: [
      "package.json — dependency manifest",
      "docs/portfolio-spec.md — §8 V1 Technical Requirements",
      "next.config.ts — static export-compatible configuration",
    ],
  },
];

export interface DataFlow {
  id: string;
  title: string;
  shortDescription: string;
  steps: { label: string; detail?: string }[];
  purpose: string;
}

export const dataFlows: DataFlow[] = [
  {
    id: "professional-data",
    title: "Professional Data Flow",
    shortDescription:
      "Canonical facts flow through a presentation model to public pages.",
    purpose:
      "Ensures date drift, title drift, inconsistent claims, and duplicated facts are prevented.",
    steps: [
      {
        label: "Professional Sources",
        detail: "employment, education, certifications, approved work",
      },
      { label: "Canonical Facts", detail: "data/professional-facts.ts" },
      {
        label: "Presentation Model",
        detail: "data/professional-profile.ts",
      },
      {
        label: "Presentation",
        detail: "About / Resume / Experience / Contact",
      },
    ],
  },
  {
    id: "project-flow",
    title: "Project Catalogue Flow",
    shortDescription:
      "Catalogue metadata drives dynamic routing to dedicated case-study content.",
    purpose:
      "Reusable routing while preserving project-specific storytelling.",
    steps: [
      { label: "Project Metadata", detail: "data/projects.ts" },
      { label: "Slug", detail: "project.slug" },
      { label: "Dynamic Route", detail: "app/projects/[slug]" },
      { label: "Content Router", detail: "lib/projectContent.tsx" },
      { label: "Case Study Module", detail: "content/projects/<project>.tsx" },
      { label: "Case Study Page", detail: "ProjectSection renders content" },
    ],
  },
  {
    id: "demo-flow",
    title: "Interactive Demo Flow",
    shortDescription:
      "Static project pages navigate to isolated Client Component simulations.",
    purpose:
      "Interactivity without forcing the entire site into client rendering.",
    steps: [
      { label: "Static Project Page", detail: "server-rendered, SEO-ready" },
      { label: "Launch Demo", detail: "navigation to /demo route" },
      { label: "Server-rendered Demo Route", detail: "prerendered, dynamicParams=false" },
      { label: "Isolated Client Component", detail: "local React state only" },
      { label: "Typed Synthetic Dataset", detail: "no private data" },
      { label: "Interactive Views", detail: "visual components" },
    ],
  },
  {
    id: "deployment-flow",
    title: "Deployment Flow",
    shortDescription:
      "Source code flows through Git to GitHub and deploys on Vercel.",
    purpose:
      "Reproducible, version-controlled, static deployment.",
    steps: [
      { label: "Local Development", detail: "npm run dev" },
      { label: "Lint + Build", detail: "npm run lint, npm run build" },
      { label: "Git", detail: "per-milestone commits on master" },
      { label: "GitHub Repository", detail: "single portfolio repository" },
      { label: "Vercel", detail: "static deployment" },
      { label: "Production Portfolio", detail: "custom domain (planned)" },
    ],
  },
];

export interface RepositoryNode {
  path: string;
  name: string;
  type: "folder" | "file";
  responsibility: string;
  children?: RepositoryNode[];
}

export const repositoryTree: RepositoryNode[] = [
  {
    path: "app",
    name: "app/",
    type: "folder",
    responsibility: "Routing and page composition (Next.js App Router)",
    children: [
      { path: "app/about", name: "about/ — professional profile pages", type: "folder", responsibility: "About page with career journey, capabilities, experience" },
      { path: "app/projects", name: "projects/ — project catalogue and dynamic routes", type: "folder", responsibility: "[slug]/page.tsx (case study), [slug]/demo/page.tsx (interactive demos)" },
      { path: "app/resume", name: "resume/ — resume foundation (planned full PDF M8C)", type: "folder", responsibility: "Resume preview" },
      { path: "app/contact", name: "contact/ — contact placeholder", type: "folder", responsibility: "Contact call-to-action" },
    ],
  },
  {
    path: "components",
    name: "components/",
    type: "folder",
    responsibility: "Reusable presentation and interaction components",
    children: [
      { path: "components/about", name: "about/ — interactive About presentation", type: "folder", responsibility: "Career journey, capability explorer, experience list" },
      { path: "components/demos", name: "demos/ — shared interactive demo components", type: "folder", responsibility: "ERP, Maintenance, Fleet, Architecture Explorer demos" },
      { path: "components/layout", name: "layout/ — Navbar, Footer", type: "folder", responsibility: "Global navigation and footer" },
      { path: "components/projects", name: "projects/ — project framework components", type: "folder", responsibility: "ProjectHeader, ProjectNavigation, DemoPreview, etc." },
      { path: "components/ui", name: "ui/ — Button, ButtonLink, Container", type: "folder", responsibility: "UI primitives and layout helpers" },
      { path: "components/home", name: "home/ — homepage sections", type: "folder", responsibility: "Hero, Featured Projects, Capabilities, etc." },
    ],
  },
  {
    path: "content",
    name: "content/",
    type: "folder",
    responsibility: "Long-form case-study content modules",
    children: [
      { path: "content/projects", name: "projects/ — dedicated case-study modules", type: "folder", responsibility: "One .tsx per project with navigation and sections" },
    ],
  },
  {
    path: "data",
    name: "data/",
    type: "folder",
    responsibility: "Structured facts, metadata, and synthetic datasets",
    children: [
      { path: "data/demos", name: "demos/ — synthetic simulation datasets", type: "folder", responsibility: "Typed data for ERP, Maintenance, and Fleet demos" },
      { path: "data/professional-facts.ts", name: "professional-facts.ts — canonical professional facts", type: "file", responsibility: "Source of truth for employment, education, certifications" },
      { path: "data/professional-profile.ts", name: "professional-profile.ts — presentation model", type: "file", responsibility: "Narrative composition for About page" },
      { path: "data/projects.ts", name: "projects.ts — project catalogue", type: "file", responsibility: "6 projects with status, categories, feature flags" },
      { path: "data/capabilities.ts", name: "capabilities.ts — capability domains", type: "file", responsibility: "Data & Analytics, ERP, Automation, etc." },
    ],
  },
  {
    path: "docs",
    name: "docs/",
    type: "folder",
    responsibility: "Product specification and architecture governance",
    children: [
      { path: "docs/portfolio-spec.md", name: "portfolio-spec.md", type: "file", responsibility: "Master specification — purpose, IA, architecture, roadmap" },
    ],
  },
  {
    path: "lib",
    name: "lib/",
    type: "folder",
    responsibility: "Shared routing/content utilities and logic",
    children: [
      { path: "lib/projectContent.tsx", name: "projectContent.tsx — project content router", type: "file", responsibility: "Dispatches to dedicated case-study modules" },
      { path: "lib/site.ts", name: "site.ts — site configuration", type: "file", responsibility: "Site name, description, navigation" },
      { path: "lib/utils.ts", name: "utils.ts — cn() class helper", type: "file", responsibility: "Conditional class name merging" },
    ],
  },
];

export interface ArchitectureDecision {
  id: string;
  title: string;
  status: "implemented" | "planned";
  problem: string;
  decision: string;
  tradeOff: string;
  futureReconsideration: string;
}

export const architectureDecisions: ArchitectureDecision[] = [
  {
    id: "static-first",
    title: "Static-first architecture",
    status: "implemented",
    problem:
      "The portfolio must be performant, secure, and low-cost to operate.",
    decision:
      "All pages and demo routes are statically generated at build time using Next.js SSG.",
    tradeOff:
      "Content changes require a new build and deployment cycle rather than live editing.",
    futureReconsideration:
      "If content update frequency grows, a headless CMS may be evaluated.",
  },
  {
    id: "dynamic-routing",
    title: "Dynamic project routes with static params",
    status: "implemented",
    problem:
      "Each project needs its own case-study page without duplicate routing logic.",
    decision:
      "app/projects/[slug] uses generateStaticParams for all catalogue slugs with dynamicParams = false.",
    tradeOff:
      "A newly added project requires a rebuild to generate its route.",
    futureReconsideration:
      "If projects are added at very high frequency, incremental static regeneration may be considered.",
  },
  {
    id: "content-separation",
    title: "Dedicated content modules",
    status: "implemented",
    problem:
      "Rich case-study content should not be embedded in catalogue metadata.",
    decision:
      "Each project case study lives in content/projects/*.tsx, dispatched by lib/projectContent.tsx.",
    tradeOff:
      "Projects without dedicated content use a lightweight scaffold.",
    futureReconsideration:
      "The scaffold pattern can evolve into a richer default as more projects are added.",
  },
  {
    id: "client-isolation",
    title: "Isolated Client Components for interactivity",
    status: "implemented",
    problem:
      "Interactive demos must not force the entire site into client rendering.",
    decision:
      "Only demo routes and interactive UI elements (Navbar toggle) are Client Components.",
    tradeOff:
      "Each demo manages its own state independently.",
    futureReconsideration:
      "If cross-demo state sharing becomes necessary, a minimal shared store may be evaluated.",
  },
  {
    id: "synthetic-data",
    title: "Synthetic demo datasets",
    status: "implemented",
    problem:
      "Interactive demos need realistic data without exposing employer or customer information.",
    decision:
      "Each demo uses a typed synthetic dataset defined in data/demos/.",
    tradeOff:
      "Data is not connected to live systems.",
    futureReconsideration:
      "Datasets may be expanded to cover additional scenarios.",
  },
  {
    id: "no-global-state",
    title: "No global state library",
    status: "implemented",
    problem:
      "The portfolio does not require server-synchronized application state.",
    decision:
      "Interactivity uses React useState or useReducer local to each demo.",
    tradeOff:
      "No shared state between demos.",
    futureReconsideration:
      "If a portfolio-wide interactive feature emerges, state management may be reconsidered.",
  },
  {
    id: "no-cms",
    title: "No CMS for V1",
    status: "implemented",
    problem:
      "Content scope remains manageable but must be version-controlled and type-checked.",
    decision:
      "Content lives in typed TypeScript modules under data/ and content/.",
    tradeOff:
      "Content updates require development workflow.",
    futureReconsideration:
      "A headless CMS may be introduced if content management needs grow.",
  },
  {
    id: "internationalization",
    title: "Internationalization (M9C — planned)",
    status: "planned",
    problem:
      "The portfolio currently serves English only.",
    decision:
      "Deferred to Milestone 9C. Future locale-aware routes (/en, /es) with shared canonical facts and localized narrative.",
    tradeOff:
      "Not implemented in M9B; EN-only for now.",
    futureReconsideration:
      "Implement EN/ES with locale routing, language switcher, hreflang, and localized metadata.",
  },
];

export interface ProjectArchitectureExample {
  slug: string;
  title: string;
  projectType: string;
  caseStudy: boolean;
  demo: { enabled: boolean; type: string };
  interactiveRoute: string | null;
  architecturePattern: string;
  status: string;
}

export const projectArchitectureExamples: ProjectArchitectureExample[] = [
  {
    slug: "vanbags-erp",
    title: "VanBags ERP Transformation",
    projectType: "ERP Consulting",
    caseStudy: true,
    demo: { enabled: true, type: "workflow" },
    interactiveRoute: "/projects/vanbags-erp/demo",
    architecturePattern: "Business process + configuration simulator (useState)",
    status: "active",
  },
  {
    slug: "vanbags-maintenance",
    title: "VanBags Maintenance System",
    projectType: "Enterprise Maintenance Application",
    caseStudy: true,
    demo: { enabled: true, type: "software" },
    interactiveRoute: "/projects/vanbags-maintenance/demo",
    architecturePattern: "Workflow simulation (useReducer)",
    status: "active",
  },
  {
    slug: "fleet-intelligence",
    title: "Fleet Intelligence Platform",
    projectType: "Data Analytics Dashboard",
    caseStudy: true,
    demo: { enabled: true, type: "dashboard" },
    interactiveRoute: "/projects/fleet-intelligence/demo",
    architecturePattern: "Dashboard with navigation state (useReducer)",
    status: "active",
  },
  {
    slug: "personal-portfolio-platform",
    title: "Personal Portfolio Platform",
    projectType: "Software Architecture / Product Design",
    caseStudy: true,
    demo: { enabled: true, type: "software" },
    interactiveRoute: "/projects/personal-portfolio-platform/demo",
    architecturePattern: "Interactive architecture explorer (useReducer)",
    status: "active",
  },
];

export interface QualityGate {
  id: string;
  label: string;
  description: string;
}

export const qualityGates: QualityGate[] = [
  {
    id: "eslint",
    label: "ESLint",
    description: "0 errors, 0 warnings",
  },
  {
    id: "typescript",
    label: "TypeScript compilation",
    description: "No type errors",
  },
  {
    id: "build",
    label: "Next.js production build",
    description: "Static-first build succeeds",
  },
  {
    id: "static-routes",
    label: "Static route generation",
    description: "All routes prerendered at build time",
  },
  {
    id: "runtime-smoke",
    label: "Runtime smoke testing",
    description: "All routes return HTTP 200 (404 for disabled demos)",
  },
  {
    id: "responsive",
    label: "Responsive QA",
    description: "Validated at 390px, 768px, 1024px, 1440px",
  },
  {
    id: "accessibility",
    label: "Accessibility review",
    description: "Keyboard nav, focus states, aria-expanded, prefers-reduced-motion",
  },
  {
    id: "git-review",
    label: "Git diff review",
    description: "Uncommitted until manual review completes",
  },
];

export interface RoadmapCapability {
  id: string;
  label: string;
  status: "implemented" | "planned";
  milestone: string;
}

export const roadmapCapabilities: RoadmapCapability[] = [
  { id: "static-foundation", label: "Static portfolio foundation", status: "implemented", milestone: "M1" },
  { id: "dynamic-routes", label: "Dynamic project framework", status: "implemented", milestone: "M3-M4A" },
  { id: "case-studies", label: "Dedicated case studies", status: "implemented", milestone: "M4B, M6A" },
  { id: "interactive-demos", label: "Interactive simulations", status: "implemented", milestone: "M5, M6B, M7B" },
  { id: "professional-profile", label: "Professional profile architecture", status: "implemented", milestone: "M8A, M8B" },
  { id: "architecture-explorer", label: "Interactive Architecture Explorer", status: "implemented", milestone: "M9B" },
  { id: "resume-integration", label: "Resume PDF integration", status: "planned", milestone: "M8C" },
  { id: "contact-redesign", label: "Contact consolidation", status: "planned", milestone: "M8D" },
  { id: "internationalization", label: "English / Spanish (M9C)", status: "planned", milestone: "M9C" },
  { id: "custom-domain", label: "Custom domain", status: "planned", milestone: "M15" },
  { id: "seo-refinement", label: "SEO refinement (M15)", status: "planned", milestone: "M15" },
  { id: "remaining-case-studies", label: "Remaining project case studies", status: "planned", milestone: "M10A, M10B" },
];
