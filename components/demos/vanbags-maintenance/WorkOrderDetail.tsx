"use client";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "./shared";
import { PriorityPill } from "./shared";
import {
  canCompleteWorkOrder,
  computePartLine,
  type ActivityStatus,
  type WorkOrder,
} from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

type PartStatus = "Available" | "Reserved" | "Issued" | "Consumed" | "Shortage";
type Tone = "open" | "closed" | "neutral" | "scheduled" | "urgent";

const ACTIVITY_TONE: Record<ActivityStatus, Tone> = {
  Pending: "neutral",
  "In Progress": "open",
  Complete: "closed",
};

const PART_TONE: Record<PartStatus, Tone> = {
  Available: "neutral",
  Reserved: "scheduled",
  Issued: "closed",
  Consumed: "closed",
  Shortage: "urgent",
};

export function WorkOrderDetail({
  state,
  dispatch,
  wo,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
  wo: WorkOrder;
}) {
  const completeable = canCompleteWorkOrder(state, wo.id);

  return (
    <div className="rounded-md border border-border bg-secondary p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="font-mono text-xs text-muted-foreground">
              {wo.id}
            </span>
            <StatusBadge
              value={wo.status}
              tone={wo.status === "Completed" ? "closed" : "open"}
            />
            <PriorityPill priority={wo.priority} />
          </div>
          <h3 className="font-medium text-foreground">{wo.title}</h3>
          <p className="text-xs text-muted-foreground">
            Equipment: {wo.equipmentId} · Location: {wo.location}
          </p>
        </div>

        {wo.downtime ? (
          <span className="text-xs text-muted-foreground">
            Downtime: {wo.downtime.duration}
            {" "}
            ({wo.downtime.start} → {wo.downtime.end})
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
            Activities
          </h4>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-popover">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                    Activity
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                    Technician
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {wo.activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-3 py-2 text-foreground">
                      {activity.description}
                    </td>
                    <td className="px-3 py-2">
                      <TechnicianSelect
                        state={state}
                        dispatch={dispatch}
                        woId={wo.id}
                        activityId={activity.id}
                        value={activity.technicianId ?? ""}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge
                        value={activity.status}
                        tone={ACTIVITY_TONE[activity.status]}
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      {activity.status === "Pending" ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_ACTIVITY",
                              woId: wo.id,
                              activityId: activity.id,
                              status: "In Progress",
                            })
                          }
                        >
                          Start
                        </Button>
                      ) : activity.status === "In Progress" ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_ACTIVITY",
                              woId: wo.id,
                              activityId: activity.id,
                              status: "Complete",
                            })
                          }
                        >
                          Complete
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Done
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
            Parts issued
          </h4>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-popover">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold text-foreground">
                    Part
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Req.
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Avail.
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Res.
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Issued
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold text-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {wo.partRequirements.map((req) => {
                  const line = computePartLine(state, wo.id, req.partId);
                  if (!line) return null;
                  const canReserve =
                    req.reserved < req.required && line.available > 0;
                  const canIssue = req.issued < req.reserved;
                  return (
                    <tr key={req.partId}>
                      <td className="px-3 py-2 text-foreground">
                        {line.part.description}
                      </td>
                      <td className="px-3 py-2 text-right text-muted-foreground">
                        {line.required}
                      </td>
                      <td className="px-3 py-2 text-right text-muted-foreground">
                        {line.available}
                      </td>
                      <td className="px-3 py-2 text-right text-muted-foreground">
                        {line.reserved}
                      </td>
                      <td className="px-3 py-2 text-right text-foreground">
                        {line.issued}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <StatusBadge value={line.status} tone={PART_TONE[line.status]} />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            dispatch({
                              type: "RESERVE_PART",
                              woId: wo.id,
                              partId: req.partId,
                            })
                          }
                          disabled={!canReserve}
                        >
                          Reserve
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            dispatch({
                              type: "ISSUE_PART",
                              woId: wo.id,
                              partId: req.partId,
                            })
                          }
                          disabled={!canIssue}
                        >
                          Issue
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
            Completion notes
          </h4>
          <textarea
            value={wo.completionNotes}
            onChange={(e) =>
              dispatch({
                type: "SET_WO_NOTES",
                woId: wo.id,
                notes: e.target.value,
              })
            }
            placeholder="Record observations and work performed"
            rows={3}
            className="mt-2 w-full max-w-lg rounded-md border border-border bg-popover px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="pt-2">
          {wo.status === "Completed" ? (
            <StatusBadge value="Work Order Completed" tone="closed" />
          ) : (
            <Button
              onClick={() => dispatch({ type: "COMPLETE_WO", woId: wo.id })}
              disabled={!completeable}
              title={
                completeable
                  ? undefined
                  : "Complete all activities and issue all required parts first"
              }
            >
              Complete Work Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function TechnicianSelect({
  state,
  dispatch,
  woId,
  activityId,
  value,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
  woId: string;
  activityId: string;
  value: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        dispatch({
          type: "ASSIGN_TECHNICIAN",
          woId,
          activityId,
          technicianId: e.target.value,
        })
      }
      className="rounded-md border border-border bg-popover px-2 py-1 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <option value="">Unassigned</option>
      {state.technicians.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name} ({t.skill})
        </option>
      ))}
    </select>
  );
}
