import { cn } from "@/lib/utils";

export type ActivityStatus = "Complete" | "In Progress" | "Pending";

export interface WorkOrderActivity {
  id: string;
  label: string;
  technician: string;
  status: ActivityStatus;
}

export interface WorkOrder {
  id: string;
  vehicle: string;
  plate: string;
  issue: string;
  priority: string;
  location: string;
  technician: string;
  status: string;
  activities: WorkOrderActivity[];
}

const activityStatusClass: Record<ActivityStatus, string> = {
  Complete:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "In Progress":
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Pending:
    "border-slate-400/30 bg-slate-400/10 text-slate-600 dark:text-slate-400",
};

export function WorkOrderPreview({ workOrder }: { workOrder: WorkOrder }) {
  const {
    id,
    vehicle,
    plate,
    issue,
    priority,
    location,
    technician,
    status,
    activities,
  } = workOrder;

  return (
    <div className="rounded-lg border border-border bg-popover p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 className="font-mono text-sm font-semibold text-foreground">
          {id}
        </h4>
        <StatusPill value={status} />
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Vehicle
          </dt>
          <dd className="text-muted-foreground">{vehicle}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Plate
          </dt>
          <dd className="text-muted-foreground">{plate}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Issue
          </dt>
          <dd className="text-muted-foreground">{issue}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Priority
          </dt>
          <dd className="text-muted-foreground">{priority}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Location
          </dt>
          <dd className="text-muted-foreground">{location}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Technician
          </dt>
          <dd className="text-muted-foreground">{technician}</dd>
        </div>
      </dl>

      <ActivityList activities={activities} />
    </div>
  );
}

function ActivityList({ activities }: { activities: WorkOrderActivity[] }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        Activities
      </p>
      <table className="mt-2 w-full table-fixed text-left text-sm">
        <thead className="text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="pb-2">
              #
            </th>
            <th scope="col" className="pb-2">
              Activity
            </th>
            <th scope="col" className="pb-2">
              Technician
            </th>
            <th scope="col" className="pb-2">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {activities.map((activity) => (
            <tr key={activity.id} className="align-top">
              <td className="py-2 text-muted-foreground">{activity.id}</td>
              <td className="py-2 text-foreground">{activity.label}</td>
              <td className="py-2 text-muted-foreground">{activity.technician}</td>
              <td className="py-2">
                <StatusPill value={activity.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusPill({ value }: { value: string }) {
  const cls =
    value === "In Progress"
      ? activityStatusClass["In Progress"]
      : value === "Complete"
        ? activityStatusClass.Complete
        : activityStatusClass.Pending;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        cls,
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
