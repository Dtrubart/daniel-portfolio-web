import { professionalFacts } from "@/data/professional-facts";

export function ProfessionalPrinciples() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          How I Work
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Four guiding principles for connecting operations, data, and systems.
        </p>

        <div className="mt-10 space-y-6">
          {professionalFacts.principles.map((principle, index) => (
            <div
              key={principle.id}
              className="flex gap-4 rounded-lg border border-border bg-popover p-5"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}