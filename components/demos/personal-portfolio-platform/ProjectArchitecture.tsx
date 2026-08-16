"use client";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";
import type { ProjectArchitectureExample } from "@/data/demos/personal-portfolio-platform";
import { projectArchitectureExamples } from "@/data/demos/personal-portfolio-platform";

export function ProjectArchitecture({
  selectedProject,
  onSelectProject,
  onBack,
}: {
  selectedProject: ProjectArchitectureExample["slug"] | null;
  onSelectProject: (slug: ProjectArchitectureExample["slug"]) => void;
  onBack: () => void;
}) {
  const project = selectedProject
    ? projectArchitectureExamples.find((p) => p.slug === selectedProject)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {project ? project.title : "Project Architecture Examples"}
          </h3>
          {project ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {project.architecturePattern}
            </p>
          ) : null}
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Overview
        </Button>
      </div>

      {project ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ProjectDetailCard label="Project Type" value={project.projectType} />
            <ProjectDetailCard label="Status" value={project.status} />
            <ProjectDetailCard
              label="Demo Type"
              value={project.demo.enabled ? project.demo.type : "No demo"}
            />
            {project.interactiveRoute ? (
              <ProjectDetailCard label="Interactive Route" value={project.interactiveRoute} />
            ) : null}
            <ProjectDetailCard label="Case Study" value={project.caseStudy ? "Yes" : "No"} />
          </div>
          <ButtonLink
            href={project.interactiveRoute!}
            variant="secondary"
            size="sm"
          >
            Launch {project.title} demo →
          </ButtonLink>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Select a project to inspect its architecture pattern and demo type.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projectArchitectureExamples.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => onSelectProject(p.slug)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border border-border bg-secondary p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-secondary/80",
                )}
              >
                <h4 className="text-base font-semibold text-foreground">
                  {p.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {p.projectType}
                </p>
                <p className="text-xs text-muted-foreground/60">
                  {p.demo.enabled ? `${p.demo.type} demo available` : "No demo"}
                </p>
                <span className="text-xs text-muted-foreground/60">
                  Click to explore →
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectDetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border bg-popover p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
