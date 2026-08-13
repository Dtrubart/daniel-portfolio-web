import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { currentWork } from "@/data/current-work";

export function CurrentWork() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <SectionHeading
          level={2}
          title="Currently Building"
          description="Ongoing work at the intersection of enterprise technology and data systems."
          align="center"
        />

        <ul className="mx-auto mt-10 max-w-3xl space-y-3 text-center sm:space-y-0 sm:text-left">
          {currentWork.map((topic) => (
            <li
              key={topic}
              className="rounded-md border border-border px-4 py-3 text-sm text-muted-foreground"
            >
              {topic}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
