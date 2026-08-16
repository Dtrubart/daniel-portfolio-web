import { professionalFacts } from "@/data/professional-facts";
import { professionalProfile } from "@/data/professional-profile";
import { projects } from "@/data/projects";

const resumeBullets: Record<string, string[]> = {
  "universidad-de-lima": [
    "Supported manufacturing and engineering laboratory sessions for 31 student groups.",
    "Provided technical instruction and safety guidance in a manufacturing / metalworking lab environment.",
    "Maintained equipment and documented technical procedures.",
  ],
  "genesis-sac": [
    "Advised on financial structuring for real-estate development projects.",
    "Modeled project costs and evaluated operational feasibility.",
    "Produced As-Is / To-Be process documentation connecting field operations to financial outcomes.",
  ],
  "sol-del-pacifico-intern": [
    "Built financial models with sensitivity analysis and pricing / costing frameworks.",
    "Collected and analyzed operational data to inform ERP and telemetry requirements.",
    "Mapped processes linking operational data to strategic and financial analysis.",
  ],
  "municipality-la-molina": [
    "Led innovation and entrepreneurship initiatives across municipal operations.",
    "Coordinated cross-functional stakeholder initiatives and public-facing events.",
    "Designed administrative workflows and reporting controls for economic-development programs.",
  ],
  "sol-del-pacifico-coordinator": [
    "Coordinated ERP implementation: process mapping, data migration, UAT, and reporting standardization.",
    "Built telemetry analytics in Power BI covering fleet, maintenance, fuel, and driver performance.",
    "Telemetry-driven initiative contributed to 65% reduction in speeding incidents and 3-5% fuel efficiency improvement.",
  ],
  "publicis-global-delivery": [
    "Automated invoice reconciliation across 160+ monthly supplier accounts using Power Automate, Power Query, and SQL logic.",
    "Built ETL, validation, and reporting pipelines reducing monthly cycle time from 28+ hours to ~2 hours (~26 hours saved per cycle).",
    "Designed exception-handling and alerting controls to ensure data quality.",
  ],
  "universidad-de-lima-2025": [
    "Served as Jefe de Práctica (teaching faculty support) for Industrial Engineering students.",
    "Provided instruction in Manufacturing Processes, Mechanics, Industrial Automation, and Programming Fundamentals.",
  ],
  "ag-group": [
    "Built Power BI / Power Query reporting and inventory-visibility views across inbound shipments, orders, inventory, and warehouse allocation.",
    "Maintained operational trackers covering multi-warehouse inventory, B2B orders, and inbound logistics.",
    "Designed validation and exception controls for multi-source operational information.",
    "Documented workflows, SOPs, ownership, and exception-handling processes across supply chain, procurement, warehouse, and operations.",
  ],
};

const technologyGroups: { label: string; items: string[] }[] = [
  {
    label: "Analytics",
    items: ["Power BI", "SQL", "Python", "Power Query", "Excel", "Data Modeling", "KPI Design"],
  },
  {
    label: "ERP & Business Systems",
    items: ["ERP", "ERPNext", "Frappe", "Business Analysis", "Requirements", "Configuration", "Master Data", "UAT"],
  },
  {
    label: "Automation",
    items: ["Power Automate", "Google Apps Script", "Python", "Workflow Automation"],
  },
  {
    label: "Operations",
    items: ["Inventory", "Logistics", "Warehousing", "Fleet", "Maintenance", "Order Management"],
  },
];

function periodLabel(periodStart: string, periodEnd: string, isOngoing?: boolean): string {
  const fmt = (p: string) => {
    const [y, m] = p.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(m) - 1]} ${y}`;
  };
  const start = fmt(periodStart);
  const end = isOngoing ? "Present" : fmt(periodEnd);
  return `${start} – ${end}`;
}

export function ResumeContent() {
  const { identity, employment, selectedImpact, certifications, education } = professionalFacts;
  const { capabilityDomains, currentDevelopment } = professionalProfile;

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {identity.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{identity.headline}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {identity.supportingLine}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Location: Burnaby, BC / Metro Vancouver
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Professional Summary</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Industrial Engineer with a multidisciplinary background across
          operations, enterprise systems, data analytics, automation, finance, and
          process improvement. Career evolved from understanding how physical and
          financial operations work to designing the systems, analytical models,
          workflows, and controls that make those operations visible and
          manageable. Strongest focus: connecting business operations, systems
          and data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Core Capabilities</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {capabilityDomains.map((domain) => (
            <div
              key={domain.id}
              className="rounded-md border border-border bg-secondary p-3"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {domain.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {domain.coreAreas.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Professional Experience</h2>
        <div className="mt-6 space-y-8">
          {employment
            .slice()
            .reverse()
            .map((job) => {
              const bullets = resumeBullets[job.id] ?? [];
              return (
                <div
                  key={job.id}
                  className="print-break-inside-avoid"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {job.role}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {job.organization}
                      </p>
                    </div>
                    <time className="text-sm text-muted-foreground/60">
                      {periodLabel(job.periodStart, job.periodEnd, job.isOngoing)}
                    </time>
                  </div>
                  {job.area ? (
                    <p className="mt-1 text-xs text-muted-foreground/60">
                      {job.area}
                    </p>
                  ) : null}
                  {bullets.length > 0 ? (
                    <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
                      {bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Selected Impact</h2>
        <div className="mt-4 space-y-3">
          {selectedImpact.map((impact) => (
            <div
              key={impact.id}
              className="flex items-baseline justify-between gap-4 rounded-md border border-border bg-secondary px-4 py-3"
            >
              <div>
                <p className="text-sm text-muted-foreground">{impact.description}</p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  {impact.context}
                </p>
              </div>
              <span className="text-right text-lg font-semibold text-foreground">
                {impact.metric}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground/60">
          Attribution is evidence-aware. Where outcomes are attributed, they
          reflect contributing involvement rather than sole ownership.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Selected Projects</h2>
        <div className="mt-4 space-y-4">
          {projects
            .filter((p) => p.status === "active")
            .map((p) => (
              <div
                key={p.slug}
                className="print-break-inside-avoid"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <span className="text-xs text-muted-foreground/60">
                    {p.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  {p.technologies.join(" · ")}
                </p>
                <a
                  href={`/projects/${p.slug}`}
                  className="mt-1 text-xs font-medium text-accent hover:underline"
                >
                  View case study →
                </a>
              </div>
            ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Education & Certifications</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">
              Education
            </h3>
            <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
              {education.map((e) => (
                <li key={e.id}>
                  {e.title} — {e.institution}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">
              Certifications
            </h3>
              <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
              {certifications.map((c) => (
                <li key={c.id}>{c.name}</li>
              ))}
            </ul>
          </div>
          {currentDevelopment.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">
                Current Development
              </h3>
              <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
                {currentDevelopment.map((d) => (
                  <li key={d.id}>{d.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Technologies</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {technologyGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-md border border-border bg-secondary p-3"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {group.label}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {group.items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border pt-6 text-sm text-muted-foreground/60">
        <p>
          This resume is derived from the same canonical professional facts used
          by the About page. No separate fact store is maintained.
        </p>
      </footer>
    </div>
  );
}
