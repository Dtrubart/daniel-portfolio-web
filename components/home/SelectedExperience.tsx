import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function SelectedExperience() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <SectionHeading
          level={2}
          title="Selected Experience"
          description="Highlights from operational, analytics, and enterprise-system roles."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-4xl space-y-8">
          {experience.map((entry) => (
            <article key={entry.company} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {entry.company}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {entry.role}
                </p>
              </div>

              <ul className="mt-1 flex flex-wrap gap-1.5">
                {entry.themes.map((theme) => (
                  <li
                    key={theme}
                    className="text-xs text-muted-foreground"
                  >
                    {theme}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground">
                {entry.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/about#experience" variant="ghost">
            View full experience
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
