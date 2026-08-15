import { cn } from "@/lib/utils";

export type AlertSeverity = "info" | "warning" | "critical";

export interface AlertItem {
  label: string;
  severity: AlertSeverity;
}

export interface AlertFamily {
  category: string;
  severity: AlertSeverity;
  alerts: AlertItem[];
}

const severityClass: Record<AlertSeverity, string> = {
  info: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  critical:
    "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function AlertLogic({ families }: { families: AlertFamily[] }) {
  return (
    <div className="space-y-5">
      {families.map((family) => (
        <div
          key={family.category}
          className="rounded-lg border border-border bg-popover p-4"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-current",
                severityClass[family.severity],
              )}
            />
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {family.category}
            </p>
            <SeverityPill value={family.severity} />
          </div>

          <ul className="list-disc list-outside ml-0 space-y-1 text-sm text-muted-foreground">
            {family.alerts.map((alert) => (
              <li key={alert.label} className="flex items-start gap-2">
                <SeverityPill value={alert.severity} />
                <span className="mt-3.5 -ml-1 break-words">{alert.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SeverityPill({ value }: { value: AlertSeverity }) {
  const label = value === "info" ? "Info" : value === "warning" ? "Warning" : "Critical";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        severityClass[value],
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
      />
      <span>{label}</span>
    </span>
  );
}
