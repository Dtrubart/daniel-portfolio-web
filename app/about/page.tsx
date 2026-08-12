import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "Background and systems-thinking approach.",
};

export default function AboutPage() {
  return (
    <Container className="py-16 md:py-24">
      <section className="mx-auto max-w-3xl">
        <SectionHeading
          level={1}
          title="About"
          description="A profile of Daniel Trujillo's engineering background and systems-thinking approach will be documented here."
          align="center"
        />
      </section>
    </Container>
  );
}
