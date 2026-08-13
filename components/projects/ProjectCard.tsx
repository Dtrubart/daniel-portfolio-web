import type { HTMLAttributes } from "react";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps extends HTMLAttributes<HTMLLIElement> {
  project: Project;
}

export function ProjectCard({
  project,
  className,
  ...props
}: ProjectCardProps) {
  const status = project.status ?? "case-study-coming-soon";
  const isLive = status === "active";
  const href = "/projects/" + project.slug;
  const caseStudyHref = `${href}#${project.caseStudyAnchor ?? "casestudy"}`;

  return (
    <li
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-popover p-6 transition-colors hover:bg-secondary",
        !project.featured && "border-dashed opacity-90",
        className,
      )}
      {...props}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {project.category}
      </p>

      <h3 className="mt-2 text-xl font-bold text-foreground">
        {project.title}
      </h3>

      <p className="mt-3 text-sm text-muted-foreground flex-1">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 text-sm font-medium">
        <a
          href={href}
          className="text-accent hover:text-accent-hover focus-visible:underline"
        >
          Explore project
        </a>
        {isLive && (
          <a
            href={caseStudyHref}
            className="text-muted-foreground hover:text-foreground focus-visible:underline"
          >
            View case study
          </a>
        )}
      </div>
    </li>
  );
}
