import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional background and role history.",
};

export default function ExperiencePage() {
  return (
    <Container className="py-16 md:py-24">
      <section className="mx-auto max-w-3xl">
        <SectionHeading
          level={1}
          title="Experience"
          description="Professional background and role history will be documented here."
          align="center"
        />
      </section>
    </Container>
  );
}
