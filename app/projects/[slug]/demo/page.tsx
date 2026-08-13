import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ERPWorkflowDemo } from "@/components/demos/vanbags-erp/ERPWorkflowDemo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { projects, type Project } from "@/data/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ slug: "vanbags-erp" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const project = projects.find((project) => project.slug === "vanbags-erp");

  if (!project) {
    return { title: "Demo not found" };
  }

  return {
    title: `${project.title} — Interactive ERP Simulation`,
    description:
      "Interactive ERP consulting simulation for the VanBags ERP Transformation.",
  };
}

function getProject(slug: string): Project {
  const project = projects.find((project) => project.slug === slug);
  if (!project || !project.demo?.enabled) {
    notFound();
  }
  return project;
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <nav aria-label="Demo navigation" className="mb-6">
          <ButtonLink
            href={`/projects/${project.slug}#demo`}
            variant="ghost"
            size="sm"
          >
            ← Back to case study
          </ButtonLink>
        </nav>

        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {project.category}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
            {project.title} — Interactive ERP Simulation
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            An interactive ERP consulting simulation. Navigate the business
            process workflow or explore the underlying ERP configuration.
            All data is synthetic and illustrative. This is a portfolio
            simulation, not a live production ERP.
          </p>
        </header>

        <ERPWorkflowDemo />
      </Container>
    </section>
  );
}
