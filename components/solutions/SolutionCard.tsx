import { SolutionData, visitorProblems } from "@/data/solutions";
import type { ReactElement } from "react";

interface SolutionCardProps {
  solution: SolutionData;
}

const solutionIcons: Record<string, ReactElement> = {
  "operational-intelligence": <Icon name="analytics" />,
  "business-systems-erp": <Icon name="systems" />,
  "workflow-automation": <Icon name="automation" />,
  "operational-excellence": <Icon name="improvement" />,
};

const iconPaths: Record<string, ReactElement> = {
  analytics: (
    <path
      fill="currentColor"
      d="M3 3v18h18V3H3zm16 16H5V5h14v14zM9 7h2v10H9V7zm4 0h2v10h-2V7z"
    />
  ),
  systems: (
    <path
      fill="currentColor"
      d="M2 7h20v2H2V7zm2 4h16v10H4V11zm16 10v-8H4v8h14zM6 3h12v2H6V3z"
    />
  ),
  automation: (
    <path
      fill="currentColor"
      d="M2 5v14h20V5l-10-3L2 5zm18 14H4v-2h16v2zm0-4H4v-2h16v2zm0-4H4V7h16v2z"
    />
  ),
  improvement: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-7 7z"
    />
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg
      className="h-6 w-6 text-accent"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {iconPaths[name] || iconPaths["analytics"]}
    </svg>
  );
}

export function SolutionCard({ solution }: SolutionCardProps) {
  const problem = visitorProblems.find((p) => p.solutionAreaId === solution.id);

  return (
    <div className="flex flex-col rounded-lg border border-border bg-popover p-6 shadow-sm sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        {solutionIcons[solution.id]}
        <h3 className="text-lg font-semibold text-foreground">
          {solution.title}
        </h3>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {solution.descriptor}
      </p>

      {problem && (
        <blockquote className="mt-2 border-l-2 border-accent pl-3 italic text-sm text-muted-foreground">
          &ldquo;{problem.text}&rdquo;
        </blockquote>
      )}

      <div className="mt-4 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Approach
        </h4>
        <p className="text-sm text-muted-foreground">
          {solution.approach.map((s) => s.label).join(" → ")}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Tools
        </h4>
        <p className="mt-1 text-sm text-muted-foreground">
          {solution.tools.join(", ")}
        </p>
      </div>

      <div className="mt-auto pt-4">
        <a
          href={`/solutions#problem-${solution.id}`}
          className="text-sm font-medium text-accent hover:text-accent-hover"
        >
          Explore approach →
        </a>
      </div>
    </div>
  );
}