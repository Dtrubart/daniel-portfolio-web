import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ERPWorkflowDemo } from "@/components/demos/vanbags-erp/ERPWorkflowDemo";
import { MaintenanceDemoContainer } from "@/components/demos/vanbags-maintenance/MaintenanceDemoContainer";
import { FleetIntelligenceDemo } from "@/components/demos/fleet-intelligence/FleetIntelligenceDemo";
import { ArchitectureExplorer } from "@/components/demos/personal-portfolio-platform/ArchitectureExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";

import { Container } from "@/components/ui/Container";
import { projects, type Project } from "@/data/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { slug: "vanbags-erp" },
    { slug: "vanbags-maintenance" },
    { slug: "fleet-intelligence" },
    { slug: "personal-portfolio-platform" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Demo not found" };
  }

  const kind =
    project.slug === "vanbags-erp" ? "ERP" :
    project.slug === "vanbags-maintenance" ? "Maintenance" :
    project.slug === "fleet-intelligence" ? "Dashboard" :
    "Architecture Explorer";

  return {
    title: project.title + " — Interactive " + kind + " Simulation",
    description: project.description,
  };
}

function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
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
        <div className="rounded-lg border border-border bg-popover">
          <div className="flex items-center justify-between border-b border-border px-5 pt-4 pb-3">
            <h2 className="text-lg font-semibold text-foreground">
              Interactive workspace - {project.title} Simulation
            </h2>
            <ButtonLink
              href={"/projects/" + project.slug}
              variant="ghost"
              size="sm"
            >
              {"Back to case study"}
            </ButtonLink>
          </div>

          {slug === "vanbags-erp" && (
            <div>
              <ERPWorkflowDemo />
            </div>
          )}

          {slug === "vanbags-maintenance" && <MaintenanceDemoContainer />}

          {slug === "fleet-intelligence" && (
            <div>
              <FleetIntelligenceDemo />
            </div>
          )}

          {slug === "personal-portfolio-platform" && (
            <div>
              <ArchitectureExplorer />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
