import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function ContactCTA() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-foreground">
            Interested in working together or discussing a project?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Contact me to explore opportunities and connections.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <ButtonLink href="/contact" variant="primary">
              Contact
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View projects
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
