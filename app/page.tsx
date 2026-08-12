import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function Home() {
  return (
    <Container className="py-24 md:py-32 lg:py-48">
      <section className="mx-auto max-w-3xl">
        <SectionHeading
          level={1}
          title="Daniel Trujillo"
          description="Industrial Engineer building data-driven systems that connect operations, enterprise technology, automation, and decision-making."
          align="center"
        />

        <div className="mt-12 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:justify-center">
          <ButtonLink href="/projects" variant="primary">
            View projects
          </ButtonLink>
          <ButtonLink href="/about" variant="ghost">
            About
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
