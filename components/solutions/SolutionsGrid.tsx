import type { ReactElement } from "react";

import {
  SolutionAreaId,
  SolutionData,
  allSolutionAreaIds,
  getSolution,
  getSolutionAnchor,
  getProjectsForSolution,
} from "@/data/solutions";
import { projects } from "@/data/projects";

const solutionIcons: Record<SolutionAreaId, ReactElement> = {
  "operational-intelligence": (
    <path
      fill="currentColor"
      d="M3 3v18h18V3H3zm16 16H5V5h14v14zM9 7h2v10H9V7zm4 0h2v10h-2V7z"
    />
  ),
  "business-systems-erp": (
    <path
      fill="currentColor"
      d="M2 7h20v2H2V7zm2 4h16v10H4V11zm16 10v-8H4v8h14zM6 3h12v2H6V3z"
    />
  ),
  "workflow-automation": (
    <path
      fill="currentColor"
      d="M2 5v14h20V5l-10-3L2 5zm18 14H4v-2h16v2zm0-4H4v-2h16v2zm0-4H4V7h16v2z"
    />
  ),
  "operational-excellence": (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-7 7z"
    />
  ),
};

export function SolutionsGrid() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="grid gap-6 sm:grid-cols-2">
        {allSolutionAreaIds.map((id) => {
          const solution = getSolution(id)!;
          const relatedProjects = getProjectsForSolution(id, projects);
          return (
            <SolutionGridCard
              key={id}
              id={id}
              solution={solution}
              relatedCount={relatedProjects.length}
            />
          );
        })}
      </div>
    </section>
  );
}

interface SolutionGridCardProps {
  id: SolutionAreaId;
  solution: SolutionData;
  relatedCount: number;
}

function SolutionGridCard({ id, solution, relatedCount }: SolutionGridCardProps) {
  const anchor = getSolutionAnchor(id);
  return (
    <a
      id={anchor}
      href={"/solutions#" + anchor}
      className="group flex flex-col rounded-lg border border-border bg-popover p-6 text-left transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="mb-3 flex items-center gap-3">
        <svg
          className="h-6 w-6 text-accent shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {solutionIcons[id]}
        </svg>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
          {solution.title}
        </h3>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {solution.descriptor}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {solution.tools.slice(0, 3).map((tool) => (
          <span
            key={tool}
            className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tool}
          </span>
        ))}
        {solution.tools.length > 3 && (
          <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            +{solution.tools.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {relatedCount} related project{relatedCount === 1 ? "" : "s"}
        </span>
        <span className="text-accent group-hover:text-accent-hover">
          Read approach &rarr;
        </span>
      </div>
    </a>
  );
}