export interface FlowStep {
  label: string;
  detail?: string;
}

export function ProcessFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-foreground"
          >
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="rounded-md border border-border bg-popover px-4 py-3">
              <p className="text-sm font-medium text-foreground">{step.label}</p>
              {step.detail ? (
                <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
