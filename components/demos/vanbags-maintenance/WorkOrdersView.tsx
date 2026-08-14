"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "./shared";
import { PriorityPill } from "./shared";
import { WorkOrderDetail } from "./WorkOrderDetail";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { WorkOrder } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

const OPEN: WorkOrder["status"][] = ["Draft", "In Progress"];

export function WorkOrdersView({
  state,
  dispatch,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
}) {
  const openWOs = state.workOrders.filter((wo) => OPEN.includes(wo.status));

  useEffect(() => {
    if (state.selectedWoId || openWOs.length === 0) return;
    const first = openWOs[0];
    if (first) dispatch({ type: "SELECT_WO", id: first.id });
  }, [openWOs, state.selectedWoId, dispatch]);

  const selected =
    state.selectedWoId && state.workOrders.find((w) => w.id === state.selectedWoId);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {openWOs.length > 0
          ? "Work orders in progress. Select a row to execute activities and complete the order."
          : "No open work orders. Convert a request from the Requests view to create one."}
      </p>

      {openWOs.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="min-w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">ID</th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">Equipment</th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">Title</th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">Priority</th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">Status</th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">Techs</th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">Activities</th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-popover">
                {openWOs.map((wo) => (
                  <tr
                    key={wo.id}
                    className={state.selectedWoId === wo.id ? "bg-secondary/50" : undefined}
                  >
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{wo.id}</td>
                    <td className="px-3 py-2 text-muted-foreground">{wo.equipmentId}</td>
                    <td className="px-3 py-2 text-foreground">{wo.title}</td>
                    <td className="px-3 py-2"><PriorityPill priority={wo.priority} /></td>
                    <td className="px-3 py-2"><StatusBadge value={wo.status} tone="open" /></td>
                    <td className="px-3 py-2 text-muted-foreground">{wo.technicianIds.length || "—"}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {countComplete(wo)}/{wo.activities.length}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Button
                        size="sm"
                        onClick={() => dispatch({ type: "SELECT_WO", id: wo.id })}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected ? (
            <WorkOrderDetail state={state} dispatch={dispatch} wo={selected} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function countComplete(wo: WorkOrder): number {
  return wo.activities.filter((a) => a.status === "Complete").length;
}
