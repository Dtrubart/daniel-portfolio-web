import { Project } from "@/data/projects";

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl">
      <h3 className="text-lg font-semibold text-foreground">
        Related portfolio evidence
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        These projects demonstrate capabilities related to this solution area.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-popover p-4 text-left transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-accent">
              {project.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {project.category}
            </p>
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
              {project.description}
            </p>
            <span className="mt-3 text-xs font-medium text-accent">
              Explore case study →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}