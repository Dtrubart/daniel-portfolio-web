import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { Container } from "@/components/ui/Container";
import { getSectionBody, sectionLabel, type ProjectSectionBody } from "@/lib/projectContent";
import { projects, type Project } from "@/data/projects";

export const dynamicParams = false;

const sectionOrder: ProjectSectionBody[] = [
  "casestudy",
  "architecture",
  "demo",
  "repository",
];

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

function getProject(slug: string): Project {
  const project = projects.find((project) => project.slug === slug);
  if (!project) {
    notFound();
  }
  return project;
}

function isSectionEnabled(project: Project, sectionId: ProjectSectionBody) {
  switch (sectionId) {
    case "casestudy":
      return project.caseStudy.enabled;
    case "architecture":
      return project.architecture?.enabled ?? false;
    case "demo":
      return project.demo?.enabled ?? false;
    case "repository":
      return project.repository?.enabled ?? false;
    default:
      return false;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const enabledSections = sectionOrder
    .filter((sectionId) => isSectionEnabled(project, sectionId))
    .map((sectionId) => ({ id: sectionId, title: sectionLabel(sectionId) }));

  return (
    <section className="py-16 md:py-24">
      <Container>
        <ProjectHeader project={project} />

        <div className="mt-16 lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-12 xl:gap-16">
          <ProjectNavigation sections={enabledSections} />

          <article className="space-y-16">
            {enabledSections.map((section) => (
              <ProjectSection
                key={section.id}
                id={section.id}
                title={section.title}
              >
                {getSectionBody(project, section.id)}
              </ProjectSection>
            ))}
          </article>
        </div>
      </Container>
    </section>
  );
}
