"use client";

import { useState } from "react";

import {
  eligibleRepairTires,
  isInstallEligible,
} from "@/data/demos/vanbags-maintenance";
import { TireActions } from "./TireActions";
import { TireDetail } from "./TireDetail";
import { TireVehicleLayout } from "./TireVehicleLayout";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

export function TireManagementView({
  state,
  dispatch,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
}) {
  const [vehicleId, setVehicleId] = useState("TRK-DEMO-017");
  const selected = state.selectedTireId
    ? state.tires.find((t) => t.id === state.selectedTireId) ?? null
    : null;
  const installable = selected ? isInstallEligible(selected) : false;
  const repairable = selected ? eligibleRepairTires([selected]).length > 0 : false;

  const spares = state.tires.filter(
    (t) => t.status === "Warehouse" || t.status === "Removed",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-end justify-between gap-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Vehicle
            </span>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="mt-1 block w-full max-w-xs rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {Object.keys(state.vehicleLayouts).map((id) => {
                const v = state.equipment.find((e) => e.id === id);
                return (
                  <option key={id} value={id}>
                    {id} {v?.plate ? `(${v.plate})` : ""}
                  </option>
                );
              })}
            </select>
          </label>
          <span className="text-xs text-muted-foreground">
            Spares: {spares.length}
          </span>
        </div>

        <TireVehicleLayout
          state={state}
          dispatch={dispatch}
          vehicleId={vehicleId}
        />

        <div className="pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
            Spare / removed tires
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Click a tire to select it, then use the actions panel. Warehouse and
            removed tires can be installed onto the selected vehicle.
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                    Tire
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                    Tread
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-popover">
                {spares.map((t) => (
                  <tr key={t.id}>
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                      {t.id}
                    </td>
                    <td className="px-3 py-2 text-foreground">{t.status}</td>
                    <td className="px-3 py-2 text-muted-foreground">{t.treadDepth}</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "SELECT_TIRE", id: t.id })}
                        className="text-xs font-medium text-accent hover:underline"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {selected ? (
          <>
            <TireDetail tire={selected} state={state} />
            <TireActions
              tire={selected}
              state={state}
              dispatch={dispatch}
              targetVehicleId={vehicleId}
              installable={installable}
              repairable={repairable}
              removable={selected.status === "In Service"}
              rotatable={selected.status === "In Service"}
              scrappable={selected.status !== "In Service"}
              returnable={selected.status === "Repair"}
            />
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click a tire on the layout or a spare above to inspect it.
          </p>
        )}
      </div>
    </div>
  );
}
