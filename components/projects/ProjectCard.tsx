import Link from "next/link";
import type { HTMLAttributes } from "react";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export interface ProjectCardProps
  extends HTMLAttributes<HTMLLIElement> {
  project: Project;
}

export function ProjectCard({
  project,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <li
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-popover p-6 shadow-xs transition-colors hover:bg-secondary",
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
        {project.focus.map((item) => (
          <li
            key={item}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>

      <Link
        href={project.href}
        className="mt-5 text-sm font-medium text-accent hover:text-accent-hover focus-visible:underline"
      >
        View project
      </Link>
    </li>
  );
}
