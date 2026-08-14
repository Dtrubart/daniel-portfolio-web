"use client";

import { freeAvailable } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

export function PartsView({
  state,
  dispatch,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
}) {
  void dispatch;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Master parts catalog. Free stock = on-hand minus quantities reserved on
        open work orders.
      </p>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Warehouse
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Unit
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-right font-semibold text-foreground"
              >
                On Hand
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-right font-semibold text-foreground"
              >
                Free
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-popover">
            {state.parts.map((p) => (
              <tr key={p.id}>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  {p.id}
                </td>
                <td className="px-3 py-2 text-foreground">{p.description}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.warehouse}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.unit}</td>
                <td className="px-3 py-2 text-right text-foreground">{p.available}</td>
                <td className="px-3 py-2 text-right text-muted-foreground">
                  {freeAvailable(p.id, state)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
