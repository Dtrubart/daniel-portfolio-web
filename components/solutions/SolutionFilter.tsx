"use client";

import { useState, useMemo } from "react";

import {
  SolutionAreaId,
  allSolutionAreaIds,
  solutionAreaConfig,
  getSolutionsForProject,
} from "@/data/solutions";
import { Project } from "@/data/projects";

interface SolutionFilterProps {
  projects: Project[];
}

export function SolutionFilter({ projects }: SolutionFilterProps) {
  const [activeFilter, setActiveFilter] = useState<SolutionAreaId | null>(null);

  const filtered = useMemo(() => {
    if (!activeFilter) return projects;
    return projects.filter((project) => {
      const links = getSolutionsForProject(project.slug);
      return links.some((link) => link.solutionId === activeFilter);
    });
  }, [projects, activeFilter]);

  const handleFilter = (id: SolutionAreaId | null) => {
    setActiveFilter(id);
  };

  return (
    <div className="mb-8">
      <p className="text-sm text-muted-foreground">
        Explore by solution area — see which projects demonstrate each area of
        applied capability.
      </p>

      <div
        role="group"
        aria-label="Filter projects by solution area"
        className="mt-4 flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => handleFilter(null)}
          aria-pressed={activeFilter === null}
          className={
            "rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
            (activeFilter === null
              ? "bg-accent text-accent-foreground ring-2 ring-accent"
              : "bg-secondary text-foreground hover:bg-secondary/80")
          }
        >
          All Projects
        </button>

        {allSolutionAreaIds.map((id) => {
          const config = solutionAreaConfig[id];
          const count = projects.filter((project) =>
            getSolutionsForProject(project.slug).some(
              (link) => link.solutionId === id,
            ),
          ).length;
          const hasProjects = count > 0;

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleFilter(id)}
              aria-pressed={activeFilter === id}
              className={
                "rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                (activeFilter === id
                  ? "bg-accent text-accent-foreground ring-2 ring-accent"
                  : "bg-secondary text-foreground hover:bg-secondary/80")
              }
            >
              {config.title}
              {hasProjects && (
                <span
                  className={
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold " +
                    (activeFilter === id
                      ? "bg-accent-foreground/20 text-accent-foreground"
                      : "bg-accent text-accent-foreground")
                  }
                  aria-label={count + " projects"}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeFilter && (
        <p className="mt-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {projects.length} projects filtered by &quot;
          {solutionAreaConfig[activeFilter].title}
          &quot;.
          <button
            type="button"
            onClick={() => handleFilter(null)}
            className="ml-1 text-accent underline hover:text-accent-hover"
          >
            Show all
          </button>
        </p>
      )}
    </div>
  );
}