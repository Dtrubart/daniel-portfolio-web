import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies covering ERP transformation, data analytics, and automation.",
};

export default function ProjectsPage() {
  return (
    <Container className="py-16 md:py-24">
      <section className="mx-auto max-w-3xl">
        <SectionHeading
          level={1}
          title="Projects"
          description="Case studies covering ERP transformation, data analytics, and automation will appear here."
          align="center"
        />
      </section>
    </Container>
  );
}
