import type { ReactNode } from "react";

import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import { ProcessFlow, type FlowStep } from "@/components/projects/ProcessFlow";
import { RepositoryNote } from "@/components/projects/RepositoryNote";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { NavItem, ProjectSectionDef } from "@/lib/projectContent";
import type { Project } from "@/data/projects";

export function personalPortfolioPlatformNav(): NavItem[] {
  return [
    { id: "overview", label: "Overview" },
    { id: "information-architecture", label: "Information Architecture" },
    { id: "solution-architecture", label: "Solution Architecture" },
    { id: "repository-architecture", label: "Repository Architecture" },
    { id: "data-architecture", label: "Data Architecture" },
    { id: "project-framework", label: "Project Framework" },
    { id: "interactive-demos", label: "Interactive Demos" },
    { id: "component-architecture", label: "Component Architecture" },
    { id: "development-quality", label: "Development & Quality" },
    { id: "deployment", label: "Deployment" },
    { id: "evolution", label: "Evolution" },
    { id: "evidence", label: "Technical Evidence" },
  ];
}

const evidenceTypes = [
  "Repository structure (app/, components/, content/, data/, lib/, docs/)",
  "Project catalogue and dynamic routing (data/projects.ts, app/projects/[slug]/)",
  "Professional data architecture (facts vs. presentation model)",
  "Static generation strategy (generateStaticParams, dynamicParams = false)",
  "Case-study content modules (content/projects/*.tsx)",
  "Interactive demo state isolation (Client Component + synthetic data)",
  "Production specification (docs/portfolio-spec.md)",
  "Milestone-driven development and Git workflow",
];

const deliveryPipeline: FlowStep[] = [
  { label: "Specification", detail: "docs/portfolio-spec.md" },
  { label: "Milestone Scope", detail: "focused, reviewable work units" },
  { label: "Implementation", detail: "TypeScript + Tailwind components" },
  { label: "Lint + Type-check", detail: "npm run lint" },
  { label: "Production Build", detail: "npm run build (static-first)" },
  { label: "Runtime Smoke Test", detail: "all routes return 200" },
  { label: "Manual Review", detail: "uncommitted until reviewed" },
  { label: "Git Commit", detail: "per-milestone commits on master" },
  { label: "GitHub", detail: "single repository" },
  { label: "Vercel", detail: "static deployment" },
];

const demoPipeline: FlowStep[] = [
  { label: "Static Project Page", detail: "server-rendered, SEO-ready" },
  { label: "Launch Demo", detail: "navigation to /demo route" },
  { label: "Client Simulation", detail: "isolated React state" },
  { label: "Synthetic Dataset", detail: "typed, no private data" },
  { label: "Interactive Views", detail: "visual components" },
];

function Overview(project: Project): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">
          {project.title}
        </span>{" "}
        is a modular professional portfolio platform that integrates career
        information, interactive business case studies, functional simulations,
        and technical evidence within a scalable Next.js architecture.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Rather than a simple personal website, this platform is a designed system
        that connects professional profile data, career evolution, capabilities,
        and interactive evidence into one coherent structure. It demonstrates
        full-stack software architecture and product-development practice:
        information architecture, component design, data-content separation,
        dynamic routing, static-first delivery, and reproducible simulation
        behavior.
      </p>
      <ProcessFlow steps={deliveryPipeline} />
      <p className="mt-4 text-sm italic text-muted-foreground">
        The interactive Architecture Explorer (Milestone 9B) will allow visitors
        to explore each platform layer and its relationships.
      </p>
    </>
  );
}

function InformationArchitecture(): ReactNode {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <ConfigurationPanel title="Page Hierarchy">
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Home</li>
            <li>About (Profile, Journey, Capabilities, Experience, Work, Impact)</li>
            <li>Projects (Catalogue, Case Studies, Interactive Demos)</li>
            <li>Resume</li>
            <li>Contact</li>
          </ul>
        </ConfigurationPanel>
        <ConfigurationPanel title="Navigation Flow">
          <ProcessFlow
            steps={[
              { label: "Projects Catalogue" },
              { label: "→ Project Case Study" },
              { label: "→ Interactive Demo" },
              { label: "→ Technical Evidence" },
            ]}
          />
        </ConfigurationPanel>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        The architecture separates presentation, content, and data so that
        professional facts can feed the About page, Resume, Experience, and
        individual case studies without duplication.
      </p>
    </>
  );
}

function SolutionArchitecture(): ReactNode {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ConfigurationPanel title="Presentation Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Resume</li>
          <li>Contact</li>
        </ul>
      </ConfigurationPanel>
      <ConfigurationPanel title="Content Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Professional Profile</li>
          <li>Career Journey</li>
          <li>Experience</li>
          <li>Capabilities</li>
          <li>Selected Work</li>
          <li>Case Studies</li>
        </ul>
      </ConfigurationPanel>
      <ConfigurationPanel title="Interactive Application Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>VanBags ERP Simulator</li>
          <li>VanBags Maintenance Demo</li>
          <li>Fleet Intelligence Dashboard</li>
          <li>Future interactive demos</li>
        </ul>
      </ConfigurationPanel>
      <ConfigurationPanel title="Data Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Professional Facts</li>
          <li>Professional Profile Data</li>
          <li>Project Metadata</li>
          <li>Synthetic Demo Data</li>
          <li>Configuration Data</li>
        </ul>
      </ConfigurationPanel>
      <ConfigurationPanel title="Platform / Delivery Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Next.js (App Router)</li>
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Git</li>
          <li>GitHub</li>
          <li>Vercel</li>
        </ul>
      </ConfigurationPanel>
    </div>
  );
}

function RepositoryArchitecture(): ReactNode {
  return (
    <>
      <ConfigurationPanel title="Repository Structure">
        <pre className="overflow-x-auto text-xs text-muted-foreground">
{`app/
├── about/
├── contact/
├── projects/
│   └── [slug]/
│       ├── page.tsx          # case-study page
│       └── demo/
│           └── page.tsx      # interactive simulation route
├── resume/
└── layout.tsx

components/
├── about/
├── demos/
├── projects/
├── layout/
└── ui/

content/
└── projects/

data/
├── demos/
├── professional-facts.ts
├── professional-profile.ts
└── projects.ts

docs/
└── portfolio-spec.md

lib/
├── projectContent.tsx
├── site.ts
└── ...
`}
        </pre>
      </ConfigurationPanel>
      <p className="mt-4 text-sm text-muted-foreground">
        <strong>app/</strong> — routing and page composition.{" "}
        <strong>components/</strong> — reusable presentation and interaction.{" "}
        <strong>content/</strong> — long-form case-study content.{" "}
        <strong>data/</strong> — structured facts, metadata, and synthetic datasets.{" "}
        <strong>lib/</strong> — routing/content utilities and shared logic.{" "}
        <strong>docs/</strong> — product specification and governance.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Generated directories such as <code>.next/</code> and <code>node_modules/</code>{" "}
        are excluded from the architecture. Kilo worktrees are internal development
        artifacts and are not part of the deployed repository.
      </p>
    </>
  );
}

function DataArchitecture(): ReactNode {
  return (
    <>
      <ConfigurationPanel title="Data Architecture Flow">
        <ProcessFlow
          steps={[
            { label: "Professional Sources", detail: "employment, education, certs" },
            { label: "Canonical Facts", detail: "data/professional-facts.ts" },
            { label: "Presentation Model", detail: "data/professional-profile.ts" },
            {
              label: "Presentation",
              detail: "About / Resume / Experience / Contact",
            },
          ]}
        />
      </ConfigurationPanel>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <ConfigurationPanel title="Professional Fact Data">
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Employment history</li>
            <li>Education</li>
            <li>Certifications</li>
            <li>Selected work</li>
            <li>Selected impact</li>
            <li>Capabilities</li>
            <li>Career stages</li>
          </ul>
        </ConfigurationPanel>
        <ConfigurationPanel title="Synthetic Demo Data">
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>ERP orders</li>
            <li>Maintenance work orders</li>
            <li>Vehicle records</li>
            <li>Driver records</li>
            <li>Fuel events</li>
            <li>Tire records</li>
          </ul>
        </ConfigurationPanel>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        These two data domains are strictly separated. Professional facts never
        mix with synthetic demo records, preventing the platform from
        accidentally treating simulation data as real employment evidence.
      </p>
    </>
  );
}

function ProjectFramework(): ReactNode {
  return (
    <>
      <ProcessFlow steps={deliveryPipeline} />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <ConfigurationPanel title="Project Catalogue">
          <p className="text-sm text-muted-foreground">
            <code>data/projects.ts</code> stores metadata for every project. Each
            project exposes slug, category, status, and feature flags
            (caseStudy, architecture, demo, repository).
          </p>
        </ConfigurationPanel>
        <ConfigurationPanel title="Case Study Content">
          <p className="text-sm text-muted-foreground">
            <code>content/projects/*.tsx</code> stores rich case-study modules
            per project. Content is routed through <code>lib/projectContent.tsx</code>,
            which dispatches to dedicated content modules and returns navigation.
          </p>
        </ConfigurationPanel>
        <ConfigurationPanel title="Dynamic Routing">
          <p className="text-sm text-muted-foreground">
            <code>app/projects/[slug]/page.tsx</code> prerenders every project via{" "}
            <code>generateStaticParams</code> with <code>dynamicParams = false</code>,
            ensuring undefined slugs return 404.
          </p>
        </ConfigurationPanel>
        <ConfigurationPanel title="Demo Routing">
          <p className="text-sm text-muted-foreground">
            <code>app/projects/[slug]/demo/</code> hosts interactive simulations.
            Each demo is an isolated Client Component with local React state.
          </p>
        </ConfigurationPanel>
      </div>
    </>
  );
}

function InteractiveDemos(): ReactNode {
  return (
    <>
      <ConfigurationPanel title="Demo Architecture Pattern">
        <ProcessFlow steps={demoPipeline} />
      </ConfigurationPanel>
      <p className="mt-4 text-sm text-muted-foreground">
        Interactive demos are implemented as Server-rendered demo routes that load
        an isolated Client Component. State is managed locally with React{" "}
        <code>useState</code> or <code>useReducer</code>. Demo data is entirely
        synthetic and typed. No backend, database, or API is required.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ConfigurationPanel title="Implemented Demos">
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>VanBags ERP Simulator (workflow)</li>
            <li>VanBags Maintenance Demo (software)</li>
            <li>Fleet Intelligence Dashboard (dashboard)</li>
            <li>Portfolio Platform Architecture Explorer (software)</li>
          </ul>
        </ConfigurationPanel>
        <ConfigurationPanel title="Future Demos">
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Data Analyst Lab</li>
            <li>ERPNext Logistics Demo</li>
          </ul>
        </ConfigurationPanel>
      </div>

      <p className="mt-4 text-sm italic text-muted-foreground">
        This project now includes the interactive Architecture Explorer demo
        route (Milestone 9B), built using the same static-first, Client Component,
        useReducer state pattern.
      </p>
    </>
  );
}

function ComponentArchitecture(): ReactNode {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ConfigurationPanel title="Global Components">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Navbar (Client Component, mobile toggle)</li>
          <li>Footer</li>
          <li>Container (responsive max-width)</li>
        </ul>
      </ConfigurationPanel>
      <ConfigurationPanel title="UI Primitives">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Button, ButtonLink</li>
          <li>SectionHeading</li>
        </ul>
      </ConfigurationPanel>
      <ConfigurationPanel title="Project Framework">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>ProjectHeader</li>
          <li>ProjectNavigation (scroll-spy)</li>
          <li>ProjectSection</li>
          <li>ProcessFlow</li>
          <li>ConfigurationPanel</li>
          <li>DemoPreview</li>
          <li>RepositoryNote</li>
        </ul>
      </ConfigurationPanel>
      <ConfigurationPanel title="Domain Components">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>components/about/ — interactive About presentation</li>
          <li>components/projects/vanbags-erp/ — ERP demo visuals</li>
          <li>components/projects/vanbags-maintenance/ — maintenance demo visuals</li>
          <li>components/projects/fleet-intelligence/ — dashboard views</li>
          <li>components/demos/ — shared interactive demo components</li>
        </ul>
      </ConfigurationPanel>
    </div>
  );
}

function DevelopmentQuality(): ReactNode {
  return (
    <>
      <ConfigurationPanel title="Quality Gates">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>ESLint — 0 errors, 0 warnings</li>
          <li>TypeScript compilation</li>
          <li>Next.js production build (static-first)</li>
          <li>Static route generation</li>
          <li>Runtime smoke testing (HTTP 200)</li>
          <li>Responsive QA (390px–1440px)</li>
          <li>Accessibility checks</li>
          <li>Git diff review</li>
        </ul>
      </ConfigurationPanel>

      <p className="mt-4 text-sm text-muted-foreground">
        Build success alone is not treated as sufficient for interactive demos.
        Runtime validation — verifying all routes and demo interactions return
        expected results — is an additional quality gate that evolved from the
        Fleet Intelligence stabilization work.
      </p>

      <ConfigurationPanel title="Milestone-Driven Workflow">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Specification defines scope and data model before implementation</li>
          <li>Each milestone is kept isolated and reviewable</li>
          <li>Changes are validated locally before being committed</li>
          <li>Milestones remain uncommitted until manual review completes</li>
        </ul>
      </ConfigurationPanel>

      <p className="mt-4 text-sm text-muted-foreground">
        AI-assisted development was used within a specification-driven workflow
        with manual architecture decisions, validation, review, and Git
        checkpoints. Internal reasoning and prompts are not reproduced here.
      </p>
    </>
  );
}

function DeploymentArchitecture(): ReactNode {
  return (
    <>
      <ConfigurationPanel title="Deployment Flow">
        <ProcessFlow
          steps={[
            { label: "Local Development", detail: "npm run dev" },
            { label: "Git", detail: "per-milestone commits" },
            { label: "GitHub Repository", detail: "single portfolio repo" },
            { label: "Vercel", detail: "static deployment" },
            { label: "Production Portfolio", detail: "future custom domain" },
          ]}
        />
      </ConfigurationPanel>
      <p className="mt-4 text-sm text-muted-foreground">
        The platform is statically generated and Vercel-compatible. No database,
        authentication, or backend is required for the portfolio. Environment
        configuration via <code>NEXT_PUBLIC_SITE_URL</code> supports production
        metadata and Open Graph URLs.
      </p>
    </>
  );
}

function EvolutionRoadmap(): ReactNode {
  return (
    <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
      <li>Resume integration (M8C)</li>
      <li>Contact consolidation (M8D)</li>
      <li>Remaining project case studies (Data Analyst Portfolio, ERPNext Logistics)</li>
      <li>Architecture Explorer (M9B)</li>
      <li>Custom domain configuration</li>
      <li>SEO refinement and structured discoverability (M14)</li>
      <li>Additional technical evidence and writing section</li>
    </ul>
  );
}

function TechnicalEvidence(project: Project): ReactNode {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Evidence available in the portfolio repository:
      </p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {evidenceTypes.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
      <RepositoryNote project={project} />
    </>
  );
}

function ArchitectureExplorerPreview(): ReactNode {
  return (
    <>
      <div className="rounded-lg border border-border bg-popover p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground">
          Interactive Architecture Explorer
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          The Architecture Explorer is an interactive demo that allows visitors to
          explore the portfolio platform by layer:
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["Presentation", "Content", "Professional Data", "Projects", "Demos", "Platform"].map((layer) => (
            <span
              key={layer}
              className="text-xs text-muted-foreground/60"
            >
              {layer}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/projects/personal-portfolio-platform/demo"
            variant="primary"
          >
            Launch Architecture Explorer
          </ButtonLink>
          <span className="text-xs text-muted-foreground/60">
            Interactive · No backend required · Built with React useReducer
          </span>
        </div>
      </div>
    </>
  );
}

export function personalPortfolioPlatformSections(
  project: Project,
): ProjectSectionDef[] {
  return [
    { id: "overview", title: "Overview", body: Overview(project) },
    {
      id: "information-architecture",
      title: "Information Architecture",
      body: InformationArchitecture(),
    },
    {
      id: "solution-architecture",
      title: "Solution Architecture",
      body: SolutionArchitecture(),
    },
    {
      id: "repository-architecture",
      title: "Repository Architecture",
      body: RepositoryArchitecture(),
    },
    {
      id: "data-architecture",
      title: "Data & Professional Facts Architecture",
      body: DataArchitecture(),
    },
    {
      id: "project-framework",
      title: "Project Framework",
      body: ProjectFramework(),
    },
    {
      id: "interactive-demos",
      title: "Interactive Demo Architecture",
      body: InteractiveDemos(),
    },
    {
      id: "component-architecture",
      title: "Component Architecture",
      body: ComponentArchitecture(),
    },
    {
      id: "development-quality",
      title: "Development & Quality",
      body: DevelopmentQuality(),
    },
    {
      id: "deployment",
      title: "Deployment Architecture",
      body: DeploymentArchitecture(),
    },
    {
      id: "evolution",
      title: "Evolution Roadmap",
      body: EvolutionRoadmap(),
    },
    {
      id: "evidence",
      title: "Technical Evidence",
      body: TechnicalEvidence(project),
    },
    {
      id: "architecture-explorer",
      title: "Architecture Explorer",
      body: ArchitectureExplorerPreview(),
    },
  ];
}
