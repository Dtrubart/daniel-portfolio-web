import type { ReactNode } from "react";

import { DemoPreview } from "@/components/projects/DemoPreview";
import { RepositoryNote } from "@/components/projects/RepositoryNote";
import { vanbagsErpNav, vanbagsErpSections } from "@/content/projects/vanbags-erp";
import {
  vanbagsMaintenanceNav,
  vanbagsMaintenanceSections,
} from "@/content/projects/vanbags-maintenance";
import type { Project } from "@/data/projects";

export interface ProjectSectionDef {
  id: string;
  title: string;
  body: ReactNode;
}

export interface NavItem {
  id: string;
  label: string;
}

export function getProjectSections(project: Project): ProjectSectionDef[] {
  if (project.slug === "vanbags-erp") {
    return vanbagsErpSections(project);
  }
  if (project.slug === "vanbags-maintenance") {
    return vanbagsMaintenanceSections(project);
  }
  return lightSections(project);
}

export function getProjectNav(project: Project): NavItem[] {
  if (project.slug === "vanbags-erp") {
    return vanbagsErpNav();
  }
  if (project.slug === "vanbags-maintenance") {
    return vanbagsMaintenanceNav();
  }
  return lightSections(project).map((section) => ({
    id: section.id,
    label: section.title,
  }));
}

interface LightSection {
  id: string;
  title: string;
  body: ReactNode;
  enabled: boolean;
}

function lightSections(project: Project): ProjectSectionDef[] {
  const sections: LightSection[] = [
    {
      id: "casestudy",
      title: "Case Study",
      body: <CaseStudyBody project={project} />,
      enabled: project.caseStudy.enabled,
    },
    {
      id: "architecture",
      title: "Architecture",
      body: <ArchitectureBody />,
      enabled: project.architecture?.enabled ?? false,
    },
    {
      id: "demo",
      title: "Interactive Demo",
      body: <DemoPreview project={project} />,
      enabled: project.demo?.enabled ?? false,
    },
    {
      id: "technical-evidence",
      title: "Technical Evidence",
      body: <RepositoryNote project={project} />,
      enabled: project.repository?.enabled ?? false,
    },
  ];

  return sections
    .filter((section) => section.enabled)
    .map((section) => ({ id: section.id, title: section.title, body: section.body }));
}

function CaseStudyBody({ project }: { project: Project }): ReactNode {
  return (
    <>
      {project.objective ? (
        <p className="text-base text-muted-foreground">{project.objective}</p>
      ) : null}
      <p className="text-sm italic text-muted-foreground">
        This page is part of the interactive project framework. The detailed
        case study and interactive demo for this project will be implemented in
        a later milestone per the portfolio roadmap.
      </p>
    </>
  );
}

function ArchitectureBody(): ReactNode {
  return (
    <p className="text-sm italic text-muted-foreground">
      The system and data-architecture overview is part of the interactive
      project framework and will be completed in a later milestone.
    </p>
  );
}
