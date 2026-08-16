"use client";

import { professionalFacts } from "@/data/professional-facts";

const flowSteps = [
  { id: "understand", step: 1, title: "Understand", subtitle: "Understand the operation first" },
  { id: "structure", step: 2, title: "Structure", subtitle: "Make information actionable" },
  { id: "improve", step: 3, title: "Improve", subtitle: "Design before automating" },
  { id: "adopt", step: 4, title: "Adopt", subtitle: "Build for adoption" },
];

export function ProfessionalPrinciples() {
  return (
    <section
      id="principles"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          How I Work
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Four guiding principles for connecting operations, data, and systems.
        </p>
      </div>

      {/* Visual problem-solving flow */}
      <div className="mx-auto mt-10 max-w-3xl px-6 md:px-0">
        <div className="hidden sm:block" aria-label="Problem-solving workflow">
          <div className="relative flex items-center justify-between">
            {flowSteps.map((step, index) => {
              const isLast = index === flowSteps.length - 1;
              return (
                <div key={step.id} className="flex flex-1 flex-col items-center">
                  <div className="relative flex flex-col items-center">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent text-accent-foreground text-sm font-bold"
                      aria-hidden="true"
                    >
                      {step.step}
                    </span>
                    <div className="mt-2 text-center">
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  {!isLast && (
                    <div
                      className="absolute top-5 left-1/2 -z-10 w-full"
                      aria-hidden="true"
                    >
                      <div className="border-t-2 border-dashed border-border" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 space-y-4">
            {professionalFacts.principles.map((principle) => (
              <div
                key={principle.id}
                className="rounded-lg border border-border bg-popover p-5"
              >
                <h4 className="text-sm font-semibold text-foreground">
                  {principle.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stacked flow */}
        <div className="sm:hidden" aria-label="Problem-solving workflow">
          <div className="relative ml-5 mt-4 border-l-2 border-dashed border-border">
            {flowSteps.map((step) => (
              <div key={step.id} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-accent text-accent-foreground text-xs font-bold">
                  {step.step}
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {step.title} — {step.subtitle}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {professionalFacts.principles.map((principle) => (
              <div
                key={principle.id}
                className="rounded-lg border border-border bg-popover p-5"
              >
                <h4 className="text-sm font-semibold text-foreground">
                  {principle.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
