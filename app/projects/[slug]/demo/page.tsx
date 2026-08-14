import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ERPWorkflowDemo } from "@/components/demos/vanbags-erp/ERPWorkflowDemo";
import { MaintenanceDemo } from "@/components/demos/vanbags-maintenance/MaintenanceDemo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { projects, type Project } from "@/data/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { slug: "vanbags-erp" },
    { slug: "vanbags-maintenance" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return { title: "Demo not found" };
  }

  const kind = project.slug === "vanbags-erp" ? "ERP" : "Maintenance";
  return {
    title: `${project.title} — Interactive ${kind} Simulation`,
    description:
      project.slug === "vanbags-erp"
        ? "Interactive ERP consulting simulation for the VanBags ERP Transformation."
        : "Interactive maintenance-operations simulation for the VanBags Maintenance System. Manage work orders, technicians, parts, preventive plans, and tire logistics.",
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
  const kind = project.slug === "vanbags-erp" ? "ERP" : "Maintenance";

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
            {project.title} — Interactive {kind} Simulation
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {project.slug === "vanbags-erp"
              ? "An interactive ERP consulting simulation. Navigate the business process workflow or explore the underlying ERP configuration."
              : "An interactive maintenance-operations simulation. Execute corrective and preventive workflows, assign technicians, reserve and issue parts, and manage tire installation and rotation."}
            <span className="block mt-1">
              All data is synthetic and illustrative. This is a portfolio
              simulation, not a live production system.
            </span>
          </p>
        </header>

        {project.slug === "vanbags-erp" ? (
          <ERPWorkflowDemo />
        ) : (
          <MaintenanceDemo />
        )}
      </Container>
    </section>
  );
}
