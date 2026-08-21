import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionFoundation } from "@/components/solutions/SolutionFoundation";
import { SolutionsGrid } from "@/components/solutions/SolutionsGrid";
import { ProblemExplorer } from "@/components/solutions/ProblemExplorer";
import { SolutionsCTA } from "@/components/solutions/SolutionsCTA";

export const metadata: Metadata = {
  title: "Solutions | Daniel Trujillo",
  description:
    "Practical approaches to data, systems, and operational challenges in industrial engineering, business systems, analytics, automation, and process improvement.",
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero subtitle="Practical approaches to data, systems and operational challenges." />

      <Container className="py-12 md:py-16">
        <SolutionFoundation />
      </Container>

      <Container className="py-12 md:py-16">
        <SolutionsGrid />
      </Container>

      <Container className="py-12 md:py-16">
        <ProblemExplorer />
      </Container>

      <Container className="py-12 md:py-16">
        <SolutionsCTA />
      </Container>
    </>
  );
}
