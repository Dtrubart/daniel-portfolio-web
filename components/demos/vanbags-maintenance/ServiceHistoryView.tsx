"use client";

import { StatusBadge } from "./shared";
import type { ServiceHistoryEvent } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

const TONE: Record<ServiceHistoryEvent["type"], "open" | "closed" | "neutral" | "scheduled"> =
  {
    "PM Service": "scheduled",
    "Corrective Repair": "open",
    "Tire Rotation": "scheduled",
    "Component Replacement": "open",
    "Work Order Completion": "closed",
    "Tire Install": "scheduled",
    "Tire Remove": "open",
    "Tire Rotate": "scheduled",
    "Tire Repair": "open",
    "Tire Scrap": "neutral",
  };

export function ServiceHistoryView({
  state,
  dispatch,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
}) {
  void dispatch;
  const history = state.serviceHistory
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (history.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No service history yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary">
          <tr>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Equipment
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Summary
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Ref
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-popover">
          {history.map((h) => (
            <tr key={h.id}>
              <td className="px-3 py-2 text-muted-foreground">{h.date}</td>
              <td className="px-3 py-2">
                <StatusBadge value={h.type} tone={TONE[h.type] ?? "neutral"} />
              </td>
              <td className="px-3 py-2 text-muted-foreground">{h.equipmentId}</td>
              <td className="px-3 py-2 text-foreground">{h.summary}</td>
              <td className="px-3 py-2 text-muted-foreground">
                {h.workOrderId ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
