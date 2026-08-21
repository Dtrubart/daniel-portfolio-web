import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          level={2}
          title="Projects"
          description="Selected case studies in ERP transformation, data analytics, and automation."
          align="center"
        />

        <ul className="mx-auto mt-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/projects" variant="ghost">
            View all projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
