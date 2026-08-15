import { cn } from "@/lib/utils";

export interface KpiDef {
  name: string;
  purpose: string;
  formula: string;
  interpretation: string;
  direction?: "higher-better" | "lower-better";
}

const directionLabel: Record<"higher-better" | "lower-better", string> = {
  "higher-better": "Higher is better",
  "lower-better": "Lower raw value is better (inverted in scoring)",
};

export function KPIDefinitionGrid({ kpis }: { kpis: KpiDef[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-foreground"
            >
              KPI
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-foreground"
            >
              Purpose
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-foreground"
            >
              Conceptual Formula
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-foreground"
            >
              Interpretation
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-foreground"
            >
              Direction
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-popover">
          {kpis.map((kpi) => (
            <tr key={kpi.name} className="align-top">
              <td className="px-4 py-2 font-medium text-foreground">{kpi.name}</td>
              <td className="px-4 py-2 text-muted-foreground">{kpi.purpose}</td>
              <td className="px-4 py-2 font-mono text-muted-foreground">
                {kpi.formula}
              </td>
              <td className="px-4 py-2 text-muted-foreground">{kpi.interpretation}</td>
              <td className="px-4 py-2 text-muted-foreground">
                {kpi.direction ? directionLabel[kpi.direction] : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KpiDirectionBadge({
  value,
}: {
  value: "higher-better" | "lower-better";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        value === "higher-better"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
      />
      <span>{value === "higher-better" ? "Higher = better" : "Lower = better"}</span>
    </span>
  );
}
