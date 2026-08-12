import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Professional inquiries and connection details.",
};

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <section className="mx-auto max-w-3xl">
        <SectionHeading
          level={1}
          title="Contact"
          description="Professional inquiries and connection details will be available here."
          align="center"
        />
      </section>
    </Container>
  );
}
