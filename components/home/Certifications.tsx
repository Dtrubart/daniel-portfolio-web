import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section className="border-t border-border py-12 md:py-16">
      <Container>
        <SectionHeading
          level={2}
          title="Certifications"
          description="Verified technical credentials."
          align="center"
        />

        <ul className="mx-auto mt-8 flex flex-wrap justify-center gap-2.5">
          {certifications.map((certification) => (
            <li
              key={certification}
              className="rounded-md border border-border px-3.5 py-1.5 text-sm text-foreground"
            >
              {certification}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
