import { SolutionData } from "@/data/solutions";

interface SolutionApproachProps {
  solution: SolutionData;
}

export function SolutionApproach({ solution }: SolutionApproachProps) {
  return (
    <section className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {solution.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {solution.descriptor}
      </p>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground">
          Typical challenges
        </h3>
        <ul className="mt-3 list-disc list-outside space-y-2 text-sm text-muted-foreground pl-5">
          {solution.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground">My approach</h3>
        <ol className="mt-4 space-y-3">
          {solution.approach.map((step) => (
            <li key={step.label} className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-bold text-foreground">
                {solution.approach.indexOf(step) + 1}
              </div>
              <div>
                <span className="font-medium text-foreground">
                  {step.label}
                </span>
                {step.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground">
          Related capabilities
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {solution.capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground">Tools</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {solution.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}