"use client";

import { StatusBadge } from "./shared";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { Tire } from "@/data/demos/vanbags-maintenance";
import type { TireMovement } from "@/data/demos/vanbags-maintenance";

const TIRE_TONE: Record<Tire["status"], "open" | "closed" | "neutral" | "scheduled" | "urgent"> =
  {
    Warehouse: "neutral",
    "In Service": "scheduled",
    Repair: "open",
    Removed: "open",
    Scrapped: "urgent",
  };

export function TireDetail({
  tire,
  state,
}: {
  tire: Tire;
  state: MaintenanceState;
}) {
  const movements = (state.tireMovements as TireMovement[])
    .filter((m) => m.tireId === tire.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="rounded-md border border-border bg-secondary p-4">
      <h3 className="text-sm font-semibold text-foreground">
        Tire {tire.id}
      </h3>
      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
        <dt className="text-muted-foreground">Brand</dt>
        <dd className="text-foreground">{tire.brand}</dd>
        <dt className="text-muted-foreground">Model</dt>
        <dd className="text-foreground">{tire.model}</dd>
        <dt className="text-muted-foreground">Status</dt>
        <dd>
          <StatusBadge value={tire.status} tone={TIRE_TONE[tire.status]} />
        </dd>
        <dt className="text-muted-foreground">Vehicle</dt>
        <dd className="text-foreground">{tire.vehicleId ?? "—"}</dd>
        <dt className="text-muted-foreground">Position</dt>
        <dd className="text-foreground">{tire.positionCode ?? "—"}</dd>
        <dt className="text-muted-foreground">Odometer</dt>
        <dd className="text-foreground">{tire.odometer} km</dd>
        <dt className="text-muted-foreground">Tread depth</dt>
        <dd className="text-foreground">{tire.treadDepth}</dd>
      </dl>

      <h4 className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent">
        Movement history
      </h4>
      {movements.length === 0 ? (
        <p className="mt-1 text-xs text-muted-foreground">No movements recorded.</p>
      ) : (
        <table className="mt-1 min-w-full text-xs">
          <thead className="bg-popover">
            <tr>
              <th scope="col" className="px-2 py-1 text-left font-semibold text-foreground">Date</th>
              <th scope="col" className="px-2 py-1 text-left font-semibold text-foreground">From</th>
              <th scope="col" className="px-2 py-1 text-left font-semibold text-foreground">To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {movements.map((m) => (
              <tr key={m.id}>
                <td className="px-2 py-1 text-muted-foreground">{m.date}</td>
                <td className="px-2 py-1 text-muted-foreground">{m.from}</td>
                <td className="px-2 py-1 text-foreground">{m.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
