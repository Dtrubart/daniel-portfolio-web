import Link from "next/link";

import type { Project } from "@/data/projects";

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="scroll-mt-24">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/projects" className="transition-colors hover:text-foreground">
          Projects
        </Link>
        <span aria-hidden="true">›</span>
        <span className="font-medium text-foreground">{project.title}</span>
      </nav>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">
        {project.category}
      </p>

      <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
        {project.title}
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
          >
            {technology}
          </li>
        ))}
      </ul>
    </header>
  );
}
