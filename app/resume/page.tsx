import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Resume",
  description: "A printable résumé and professional background.",
};

export default function ResumePage() {
  return (
    <Container className="py-16 md:py-24">
      <section className="mx-auto max-w-3xl">
        <SectionHeading
          level={1}
          title="Resume"
          description="A printable résumé and professional background will be available here."
          align="center"
        />
      </section>
    </Container>
  );
}
