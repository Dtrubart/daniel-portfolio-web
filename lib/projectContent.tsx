import type { ReactNode } from "react";

import { DemoPreview } from "@/components/projects/DemoPreview";
import { RepositoryNote } from "@/components/projects/RepositoryNote";
import type { Project } from "@/data/projects";

export type ProjectSectionBody =
  | "casestudy"
  | "architecture"
  | "demo"
  | "repository";

export function sectionLabel(sectionId: ProjectSectionBody): string {
  return {
    casestudy: "Case Study",
    architecture: "Architecture",
    demo: "Interactive Demo",
    repository: "Technical Evidence",
  }[sectionId];
}

export function getSectionBody(
  project: Project,
  sectionId: ProjectSectionBody,
): ReactNode {
  switch (sectionId) {
    case "casestudy":
      return <CaseStudyBody project={project} />;
    case "architecture":
      return <ArchitectureBody />;
    case "demo":
      return project.demo?.enabled ? (
        <DemoPreview project={project} />
      ) : null;
    case "repository":
      return project.repository?.enabled ? (
        <RepositoryNote project={project} />
      ) : null;
    default:
      return null;
  }
}

function CaseStudyBody({ project }: { project: Project }) {
  return (
    <>
      {project.objective ? (
        <p className="text-base text-muted-foreground">{project.objective}</p>
      ) : null}
      <p className="text-sm italic text-muted-foreground">
        The detailed case study and interactive demo for this project will be
        implemented in a later milestone per the portfolio roadmap.
      </p>
    </>
  );
}

function ArchitectureBody() {
  return (
    <p className="text-sm italic text-muted-foreground">
      The system and data-architecture overview is part of the interactive
      project framework and will be completed in a later milestone.
    </p>
  );
}
