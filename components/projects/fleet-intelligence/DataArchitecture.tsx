import { ProcessFlow, type FlowStep } from "@/components/projects/ProcessFlow";

export function DataArchitecture({
  sources,
  stages,
}: {
  sources: string[];
  stages: FlowStep[];
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-3">
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Source Systems
        </p>
        <ul className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <li key={source}>
              <span className="inline-flex items-center rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-foreground">
                {source}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="flex justify-center py-1 text-muted-foreground"
        aria-hidden="true"
        role="img"
        aria-label="Data flows downward through the integration pipeline"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 18l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <ProcessFlow steps={stages} />
    </div>
  );
}
