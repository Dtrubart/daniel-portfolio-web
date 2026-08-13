import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "ERP, analytics, automation, and enterprise systems projects by Industrial Engineer Daniel Trujillo.",
};

const featured = projects.filter((project) => project.featured);
const supporting = projects.filter((project) => !project.featured);

export default function ProjectsPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          level={1}
          title="Projects"
          description="Systems, analytics, and automation work."
          align="center"
        />

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">
            Featured work
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">
            Additional projects
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supporting.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
