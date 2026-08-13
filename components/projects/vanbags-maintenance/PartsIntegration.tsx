import { FlowStep, ProcessFlow } from "@/components/projects/ProcessFlow";
import { cn } from "@/lib/utils";

export type PartStatus =
  | "Available"
  | "Reserved"
  | "Issued"
  | "Consumed"
  | "Shortage";

export interface PartRequirement {
  part: string;
  required: number;
  available: number;
  reserved: number;
  status: PartStatus;
}

export interface MaterialAvailability {
  part: string;
  required: number;
  available: number;
  reserved: number;
}

const statusClass: Record<PartStatus, string> = {
  Available:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Reserved:
    "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Issued:
    "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  Consumed:
    "border-slate-400/30 bg-slate-400/10 text-slate-600 dark:text-slate-400",
  Shortage:
    "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function PartsIntegration({
  flow,
  parts,
  availability,
}: {
  flow: FlowStep[];
  parts: PartRequirement[];
  availability: MaterialAvailability;
}) {
  return (
    <div className="space-y-6">
      <ProcessFlow steps={flow} />

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-semibold text-foreground">
                Part
              </th>
              <th scope="col" className="px-4 py-2 text-right font-semibold text-foreground">
                Required
              </th>
              <th scope="col" className="px-4 py-2 text-right font-semibold text-foreground">
                Available
              </th>
              <th scope="col" className="px-4 py-2 text-right font-semibold text-foreground">
                Reserved
              </th>
              <th scope="col" className="px-4 py-2 text-left font-semibold text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-popover">
            {parts.map((part) => (
              <tr key={part.part} className="align-top">
                <td className="px-4 py-2 text-muted-foreground">{part.part}</td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {part.required}
                </td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {part.available}
                </td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {part.reserved}
                </td>
                <td className="px-4 py-2">
                  <PartStatusPill value={part.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MaterialAvailability availability={availability} />
    </div>
  );
}

function PartStatusPill({ value }: { value: PartStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusClass[value],
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
      />
      <span>{value}</span>
    </span>
  );
}

function MaterialAvailability({
  availability,
}: {
  availability: MaterialAvailability;
}) {
  const shortage =
    availability.required - availability.available - availability.reserved;
  return (
    <div className="rounded-md border border-border bg-popover p-4">
      <h4 className="text-sm font-semibold text-foreground">
        {availability.part} — Material Availability
      </h4>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Required
          </dt>
          <dd className="text-muted-foreground">{availability.required}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Available
          </dt>
          <dd className="text-muted-foreground">{availability.available}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Reserved
          </dt>
          <dd className="text-muted-foreground">{availability.reserved}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Shortage
          </dt>
          <dd
            className={cn(
              "text-muted-foreground",
              shortage > 0
                ? "text-rose-600 dark:text-rose-400 font-medium"
                : "",
            )}
          >
            {shortage > 0 ? `-${shortage}` : String(shortage)}
          </dd>
        </div>
      </dl>
      {shortage > 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">
          A shortage blocks the work order until replenishment arrives. This
          example shows a short position that must be resolved before issue.
        </p>
      ) : null}
    </div>
  );
}
