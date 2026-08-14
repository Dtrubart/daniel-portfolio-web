"use client";

import { StatusBadge } from "./shared";
import { Button } from "@/components/ui/Button";
import type { PreventivePlan } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

const TONE: Record<PreventivePlan["status"], "open" | "closed" | "neutral" | "scheduled"> =
  {
    Due: "open",
    "Due Soon": "open",
    Scheduled: "scheduled",
  };

function dueLabel(plan: PreventivePlan): string {
  return plan.triggerType === "Calendar"
    ? plan.nextDue
    : `${plan.nextDue} / ${plan.nextDueReading}`;
}

export function PreventiveMaintenanceView({
  state,
  dispatch,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
}) {
  const openWos = new Set(
    state.workOrders
      .filter((wo) => wo.status === "In Progress" || wo.status === "Draft")
      .map((wo) => wo.equipmentId),
  );

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Preventive maintenance plans. Plans with status <strong>Due</strong> can
        generate a Work Order directly.
      </p>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                ID
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                Equipment
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                Title
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                Trigger
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                Due
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                Last Done
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                Status
              </th>
              <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-popover">
            {state.pmPlans.map((p) => {
              const equipment = state.equipment.find((e) => e.id === p.equipmentId);
              return (
                <tr key={p.id} className={openWos.has(p.equipmentId) ? "bg-secondary/50" : undefined}>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-3 py-2 text-foreground">{equipment?.name ?? p.equipmentId}</td>
                  <td className="px-3 py-2 text-foreground">{p.title}</td>
                  <td className="px-3 py-2 text-muted-foreground">{p.triggerType} — every {p.interval} {p.intervalUnit}</td>
                  <td className="px-3 py-2 text-muted-foreground">{dueLabel(p)}</td>
                  <td className="px-3 py-2 text-muted-foreground">{p.lastDone}</td>
                  <td className="px-3 py-2">
                    <StatusBadge value={p.status} tone={TONE[p.status] ?? "neutral"} />
                  </td>
                  <td className="px-3 py-2 text-right">
                    {p.status === "Due" ? (
                      <Button
                        size="sm"
                        onClick={() => dispatch({ type: "PM_GENERATE_WO", planId: p.id })}
                      >
                        Generate Work Order
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Open work order on asset:{" "}
        {[...openWos]
          .map((id) => state.equipment.find((e) => e.id === id)?.name)
          .filter(Boolean)
          .join(", ") || "none"}
      </p>
    </div>
  );
}
