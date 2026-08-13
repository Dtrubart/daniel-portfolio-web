import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="border-b border-border py-20 md:py-28 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium tracking-wider text-accent uppercase">
            Industrial Engineer
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Daniel Trujillo
          </h1>

          <p className="mt-4 text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            Building systems that connect operations, data, and enterprise
            technology.
          </p>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            I build data-driven systems that connect operations, enterprise
            technology, automation, and decision-making.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Data Analytics · ERP & Business Systems · Automation · Process
            Improvement
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
            <ButtonLink href="/projects" variant="primary">
              Explore projects
            </ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              View resume
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
