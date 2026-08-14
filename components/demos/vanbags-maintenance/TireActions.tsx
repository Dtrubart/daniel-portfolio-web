"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import {
  availablePositions,
  findTireAt,
  type Tire,
} from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

export function TireActions({
  tire,
  state,
  dispatch,
  targetVehicleId,
  installable,
  repairable,
  removable,
  rotatable,
  scrappable,
  returnable,
}: {
  tire: Tire;
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
  targetVehicleId: string;
  installable: boolean;
  repairable: boolean;
  removable: boolean;
  rotatable: boolean;
  scrappable: boolean;
  returnable: boolean;
}) {
  const [installPosition, setInstallPosition] = useState("");
  const [rotateTarget, setRotateTarget] = useState("");

  const installLayout = state.vehicleLayouts[targetVehicleId];
  const installPositions = installLayout
    ? availablePositions(installLayout, state.tires, targetVehicleId)
    : [];

  const rotateVehicleId = tire.vehicleId ?? "";
  const rotateLayout =
    rotatable && rotateVehicleId ? state.vehicleLayouts[rotateVehicleId] : null;
  const rotatePositions =
    rotateLayout && tire.positionCode
      ? rotateLayout.positions.filter(
          (p) =>
            p.code !== tire.positionCode &&
            !findTireAt(state.tires, rotateVehicleId, p.code),
        )
      : [];

  const fire = (action: "install" | "remove" | "rotate" | "repair" | "toWarehouse" | "scrap") => {
    if (action === "install" && !installPosition) return;
    if (action === "rotate" && !rotateTarget) return;
    const resolvedTargetVehicle =
      action === "install"
        ? targetVehicleId
        : action === "rotate"
          ? tire.vehicleId ?? null
          : null;
    dispatch({
      type: "TIRE_ACTION",
      action,
      tireId: tire.id,
      targetVehicleId: resolvedTargetVehicle ?? undefined,
      targetPositionCode:
        action === "install"
          ? installPosition
          : action === "rotate"
            ? rotateTarget
            : undefined,
    });
    setInstallPosition("");
    setRotateTarget("");
  };

  return (
    <div className="rounded-md border border-border bg-secondary p-4">
      <h3 className="text-sm font-semibold text-foreground">Tire actions</h3>

      {tire.status === "Scrapped" ? (
        <p className="mt-2 text-xs text-muted-foreground">
          This tire has been scrapped. No further actions are available.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {installable ? (
            <ActionBlock label="Install onto vehicle">
              <select
                value={installPosition}
                onChange={(e) => setInstallPosition(e.target.value)}
                className="w-full rounded-md border border-border bg-popover px-2 py-1 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select position</option>
                {installPositions.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code} ({p.side} {p.innerOuter})
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                onClick={() => fire("install")}
                disabled={!installPosition}
              >
                Install
              </Button>
            </ActionBlock>
          ) : null}

          {rotatable ? (
            <ActionBlock label={`Rotate (${tire.positionCode} → new)`}>
              <select
                value={rotateTarget}
                onChange={(e) => setRotateTarget(e.target.value)}
                className="w-full rounded-md border border-border bg-popover px-2 py-1 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select target position</option>
                {rotatePositions.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code} ({p.side} {p.innerOuter})
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                onClick={() => fire("rotate")}
                disabled={!rotateTarget}
              >
                Rotate
              </Button>
            </ActionBlock>
          ) : null}

          {removable ? (
            <Button size="sm" variant="secondary" onClick={() => fire("remove")}>
              Remove from vehicle
            </Button>
          ) : null}

          {repairable ? (
            <Button size="sm" variant="secondary" onClick={() => fire("repair")}>
              Send to repair
            </Button>
          ) : null}

          {returnable ? (
            <Button size="sm" variant="secondary" onClick={() => fire("toWarehouse")}>
              Return to warehouse
            </Button>
          ) : null}

          {scrappable ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => fire("scrap")}
              className="text-rose-500 hover:bg-rose-500/10 hover:text-rose-500"
            >
              Scrap tire
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function ActionBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      {children}
    </div>
  );
}
