import { cn } from "@/lib/utils";

export type MaintenanceStatus = "OK" | "Due Soon" | "Overdue";

export interface ComponentInterval {
  component: string;
  lastService: number;
  interval: number;
  currentOdometer: number;
  status: MaintenanceStatus;
}

const statusClass: Record<MaintenanceStatus, string> = {
  OK: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Due Soon":
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Overdue:
    "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function MaintenanceIntervalPreview({
  components,
}: {
  components: ComponentInterval[];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="min-w-full table-fixed text-sm">
        <thead className="bg-secondary">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-foreground"
            >
              Component
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-right font-semibold text-foreground"
            >
              Last Service
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-right font-semibold text-foreground"
            >
              Interval
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-right font-semibold text-foreground"
            >
              Next Due
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-right font-semibold text-foreground"
            >
              Current Odometer
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-right font-semibold text-foreground"
            >
              Remaining
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-foreground"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-popover">
          {components.map((c) => {
            const nextDue = c.lastService + c.interval;
            const remaining = nextDue - c.currentOdometer;
            return (
              <tr key={c.component} className="align-top">
                <td className="px-4 py-2 text-foreground">{c.component}</td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {c.lastService.toLocaleString()} km
                </td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {c.interval.toLocaleString()} km
                </td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {nextDue.toLocaleString()} km
                </td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {c.currentOdometer.toLocaleString()} km
                </td>
                <td className="px-4 py-2 text-right text-muted-foreground">
                  {remaining > 0 ? `${remaining.toLocaleString()} km` : "—"}
                </td>
                <td className="px-4 py-2">
                  <MaintenanceStatusPill value={c.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MaintenanceStatusPill({ value }: { value: MaintenanceStatus }) {
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
