import type { Project } from "@/data/projects";

export function RepositoryNote({ project }: { project: Project }) {
  const repository = project.repository;

  if (repository?.enabled && repository.url) {
    return (
      <p className="text-muted-foreground">
        The source code and supporting documentation are publicly available at{" "}
        <a
          href={repository.url}
          className="text-accent underline decoration-accent underline-offset-2 hover:text-accent-hover"
        >
          {repository.url}
        </a>
        .
      </p>
    );
  }

  return (
    <p className="text-muted-foreground">
      The repository for this project is private during the public-project
      review window. The source link will be published here once the work is
      cleared for public sharing.
    </p>
  );
}
