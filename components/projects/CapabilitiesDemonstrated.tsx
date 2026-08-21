import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import {
  getSolutionsForProject,
  getSolution,
  solutionAreaConfig,
  SolutionAreaId,
} from "@/data/solutions";

const capabilityBlurb: Record<SolutionAreaId, string> = {
  "operational-intelligence": "KPI design, analytical modeling, data validation, and decision-support visualization.",
  "business-systems-erp": "Process and system requirements translated into structured ERP workflows and data models.",
  "workflow-automation": "Structured workflow design, validation controls, and reconciliation automation.",
  "operational-excellence": "Operational processes mapped into controlled future-state workflows with root-cause analysis.",
};

export function CapabilitiesDemonstrated(project: Project): ReactNode {
  const links = getSolutionsForProject(project.slug);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Capabilities demonstrated
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        This project demonstrates capabilities in the following Solution Areas.
      </p>

      <div className="mt-6 space-y-6">
        {links.map((link) => {
          const solution = getSolution(link.solutionId);
          if (!solution) return null;
          const config = solutionAreaConfig[link.solutionId];
          const isPrimary = link.relationship === "primary";

          return (
            <div
              key={link.solutionId}
              className={
                "rounded-lg border border-border bg-popover p-5 " +
                (isPrimary ? "border-accent/20" : "border-border")
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {config.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground/60">
                    {link.relationship === "primary" ? "Primary" : "Related"}
                  </p>
                </div>
                <a
                  href={"/solutions#" + "solution-" + link.solutionId}
                  className="text-xs font-medium text-accent hover:text-accent-hover"
                >
                  Explore {config.title.split(" ")[0]} &rarr;
                </a>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {capabilityBlurb[link.solutionId]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
