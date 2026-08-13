import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/data/capabilities";

export function Capabilities() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <SectionHeading
          level={2}
          title="Capabilities"
          description="Core areas of practice spanning data, enterprise systems, automation, and process improvement."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-secondary px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
