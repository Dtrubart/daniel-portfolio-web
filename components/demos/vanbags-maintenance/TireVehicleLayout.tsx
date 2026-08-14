"use client";

import { cn } from "@/lib/utils";
import {
  findTireAt,
  positionAxleGroups,
  type TirePositionDef,
} from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

export function TireVehicleLayout({
  state,
  dispatch,
  vehicleId,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
  vehicleId: string;
}) {
  const layout = state.vehicleLayouts[vehicleId];
  if (!layout) {
    return (
      <p className="text-sm text-muted-foreground">
        No tire layout configured for this vehicle.
      </p>
    );
  }

  const groups = positionAxleGroups(layout);
  const axleColumns = (positions: TirePositionDef[]) =>
    positions.length <= 3 ? "grid-cols-3" : "grid-cols-5";

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">
        {layout.name} · {layout.plate}
      </h3>
      {groups.map((group) => (
        <div key={group.label} className="space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            {group.label}
          </div>
          <div
            className={cn(
              "grid gap-2",
              axleColumns(group.positions),
            )}
          >
            {group.positions.map((pos) => {
              const tire = findTireAt(
                state.tires,
                vehicleId,
                pos.code,
              );
              const occupied = Boolean(tire);
              return (
                <button
                  key={pos.code}
                  type="button"
                  disabled={!occupied}
                  onClick={() => {
                    if (tire)
                      dispatch({ type: "SELECT_TIRE", id: tire.id });
                  }}
                  className={cn(
                    "flex h-16 w-full flex-col items-center justify-center gap-0.5 rounded-md border text-center",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    occupied
                      ? "cursor-pointer border-accent/40 bg-accent/10 hover:bg-accent/20"
                      : "cursor-not-allowed border-border opacity-60",
                  )}
                >
                  <span className="text-[10px] uppercase text-muted-foreground">
                    {pos.code} · {pos.side} {pos.innerOuter}
                  </span>
                  {occupied ? (
                    <span className="font-mono text-xs text-foreground">
                      {tire!.id}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">Empty</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
