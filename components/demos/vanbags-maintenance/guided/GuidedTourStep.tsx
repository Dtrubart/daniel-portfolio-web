"use client";

import type { ReactNode } from "react";

import type { GuidedTourStep, SimulationState, SimulationAction } from "@/data/demos/vanbags-maintenance-sim";
import { formatKm } from "@/data/demos/vanbags-maintenance-guided";
import { technicians } from "@/data/demos/vanbags-maintenance-sim";

interface Props {
  state: SimulationState;
  dispatch: (action: SimulationAction) => void;
  step: GuidedTourStep;
  actionComplete: boolean;
}

function Badge({ status }: { status: string }) {
  const tone = status === "Due" ? "text-destructive" :
    status === "Due Soon" || status === "In Progress" ? "text-amber-600" :
    status === "Completed" ? "text-green-600" :
    status === "Shortage" ? "text-destructive" :
    "text-muted-foreground";
  return (
    <span className={"inline-flex items-center rounded px-2 py-0.5 text-xs font-medium " + tone}>
      {status}
    </span>
  );
}

function StepHeader({ title, description }: { title: string; description: string }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
    </>
  );
}

function Btn({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: ReactNode }) {
  const cls = disabled
    ? "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium bg-accent/50"
    : "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90";
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function GuidedTourStep({ step, state, dispatch, actionComplete: _actionComplete }: Props) {
  if (!step) {
    return (
      <div>
        <StepHeader title="Tour Complete" description="You completed the guided tour." />
        <p className="text-sm text-muted-foreground mt-4">Review completed capabilities or explore the system freely.</p>
      </div>
    );
  }
  return (
    <div className="max-w-2xl">
      <StepHeader title={step.title} description={step.description} />
      {stepContent(step.id, state, dispatch)}
    </div>
  );
}

function stepContent(stepId: string, state: SimulationState, dispatch: (action: SimulationAction) => void): ReactNode {
  switch (stepId) {
    case "register":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Equipment: <strong>{state.vehicle.id}</strong> ({state.vehicle.brand} {state.vehicle.model})
          </p>
          <p className="text-sm text-muted-foreground">
            Year: {state.vehicle.year} | Axles: {state.vehicle.axles} | Positions: {state.vehicle.tirePositions}
          </p>
          <p className="text-sm text-muted-foreground">
            Location: {state.vehicle.location} | Counter: {formatKm(state.vehicle.currentOdometer)}
          </p>
          {!state.flags.equipmentRegistered ? (
            <Btn onClick={() => dispatch({ type: "CREATE_EQUIPMENT" })}>
              Create Equipment
            </Btn>
          ) : (
            <p className="text-sm text-green-600 font-medium">Equipment registered.</p>
          )}
        </div>
      );

    case "templates":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">
            Templates define WHAT maintenance contains:
          </p>
          {state.maintenanceTemplates.map((t) => (
            <div key={t.id} className="border border-border rounded-md p-3">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-foreground">{t.code}: {t.name}</span>
                <span className="text-xs text-muted-foreground">{formatKm(t.intervalKm)} interval</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Activities: {t.activities.join(", ")}
              </div>
            </div>
          ))}
          {!state.flags.templatesConfigured ? (
            <Btn onClick={() => dispatch({ type: "SAVE_TEMPLATES" })}>
              Save Templates
            </Btn>
          ) : (
            <p className="text-sm text-green-600 font-medium">Templates saved.</p>
          )}
        </div>
      );

    case "plan":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">
            Plan defines WHEN maintenance occurs:
          </p>
          <div className="border border-border rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-3 py-2 text-left">Reading</th>
                  <th className="px-3 py-2 text-left">Template</th>
                  <th className="px-3 py-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {state.maintenancePlan.map((entry, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-3 py-2">{formatKm(entry.reading)}</td>
                    <td className="px-3 py-2">{entry.templateId}</td>
                    <td className="px-3 py-2">{entry.maintenanceType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!state.flags.planAssigned ? (
            <Btn onClick={() => dispatch({ type: "ASSIGN_PM_PLAN" })}>
              Assign Plan to Vehicle
            </Btn>
          ) : (
            <p className="text-sm text-green-600 font-medium">
              PM plan assigned to {state.vehicle.id}.
            </p>
          )}
        </div>
      );

    case "tires": {
      const installedTires = state.tires.filter((t) => t.status === "In Service");
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {state.tirePositions.length} tire positions across {state.vehicle.axles} axles.
            {installedTires.length} tires installed and in service.
          </p>
          <p className="text-sm text-muted-foreground">
            Tires track accumulated km per position.
          </p>
          {!state.flags.tiresInstalled ? (
            <Btn onClick={() => dispatch({ type: "INSTALL_TIRE_SET" })}>
              Install Initial Tire Set
            </Btn>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {state.tirePositions
                .filter((p) => p.tireId !== null)
                .map((p) => (
                  <div key={p.code} className="flex justify-between">
                    <span className="text-muted-foreground">{p.code}:</span>
                    <span className="font-mono text-foreground">{p.tireId}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      );
    }

    case "operation":
      return (
        <div className="space-y-3">
          <div className="bg-secondary rounded-md p-3">
            <p className="text-sm font-medium text-foreground">
              Current Odometer: {formatKm(state.odometer)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Simulating: 0 km to 1,000 to 2,000 to 3,000 to 4,000 to 4,500
          </p>
          {state.odometer >= 4500 ? (
            <p className="text-sm text-amber-600 font-medium">
              Vehicle at 4,500 km. PM trigger approaching at 5,000 km.
            </p>
          ) : (
            <Btn onClick={() => dispatch({ type: "ADVANCE_ODOMETER", payload: { deltaKm: 4500 } })}>
              Advance Odometer to 4,500 km
            </Btn>
          )}
        </div>
      );

    case "alerts":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">
            One vehicle odometer updates three systems:
            <span className="font-medium text-foreground"> Preventive Maintenance,</span>
            <span className="font-medium text-foreground"> Tire Management,</span>
            <span className="font-medium text-foreground"> Component Counters.</span>
          </p>
          <p className="text-sm text-muted-foreground">
            The odometer drives PM triggers, tire mileage tracking, and component counters simultaneously.
          </p>
          {state.alerts.map((a) => (
            <div key={a.id} className="border border-border rounded-md p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">
                  Maintenance Alert: {a.maintenanceName}
                </span>
                <Badge status={a.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Due at {formatKm(a.dueReading)} ({a.remaining} km remaining)
              </p>
            </div>
          ))}
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase text-accent mb-2">
              Component Counters
            </p>
            {state.componentCounters.map((c) => (
              <div key={c.id} className="flex justify-between text-sm py-1 border-t border-border">
                <span className="text-muted-foreground">{c.name}</span>
                <span>
                  <span className="text-foreground">{c.current} {c.unit}</span>
                  {" "}
                  <Badge status={c.status} />
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "tire-inspection":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Guiding to TIRE-DEMO-003 at position RL1-O.
          </p>
          {!state.tireInspections.some((i) => i.tireId === "TIRE-DEMO-003") ? (
            <Btn
              onClick={() =>
                dispatch({
                  type: "CREATE_TIRE_INSPECTION",
                  payload: {
                    tireId: "TIRE-DEMO-003",
                    position: "RL1-O",
                    outerTread: 9.2,
                    centerTread: 11.0,
                    innerTread: 12.0,
                    pressure: "102 PSI",
                  },
                })
              }
            >
              Record Tire Inspection
            </Btn>
          ) : (
            <div className="space-y-2">
              {state.tireInspections
                .filter((i) => i.tireId === "TIRE-DEMO-003")
                .map((insp) => {
                  const tire = state.tires.find((t) => t.id === insp.tireId);
                  return (
                    <div key={insp.id} className="border border-border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">{insp.tireId}</span>
                        <Badge status={insp.status} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-muted-foreground">Position:</span> <span className="text-foreground">{insp.position}</span></div>
                        <div><span className="text-muted-foreground">Odometer:</span> <span className="text-foreground">{formatKm(insp.odometer)}</span></div>
                        <div><span className="text-muted-foreground">Outer Tread:</span> <span className="text-foreground">{insp.treadOuter} mm</span></div>
                        <div><span className="text-muted-foreground">Center Tread:</span> <span className="text-foreground">{insp.treadCenter} mm</span></div>
                        <div><span className="text-muted-foreground">Inner Tread:</span> <span className="text-foreground">{insp.treadInner} mm</span></div>
                        <div><span className="text-muted-foreground">Pressure:</span> <span className="text-foreground">{insp.pressure}</span></div>
                        <div><span className="text-muted-foreground">Accumulated:</span> <span className="text-foreground">{formatKm(tire?.accumulatedKm ?? 0)}</span></div>
                      </div>
                      {insp.suggestedAction && (
                        <p className="text-xs text-amber-600 mt-2">
                          System recommends: {insp.suggestedAction}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Uneven wear detected. Rotation recommended (available in Chapter 2).
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      );

    case "pm-trigger":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Vehicle at {formatKm(state.vehicle.currentOdometer)}. M1 preventive maintenance is DUE.
          </p>
          <p className="text-sm text-muted-foreground">
            PM engine compares odometer against the maintenance plan.
          </p>
          {state.odometer < 5000 ? (
            <Btn onClick={() => dispatch({ type: "ADVANCE_ODOMETER", payload: { deltaKm: 500 } })}>
              Advance to 5,000 km
            </Btn>
          ) : (
            <div className="space-y-1">
              {state.alerts
                .filter((a) => a.status === "Due")
                .map((a) => (
                  <p key={a.id} className="text-sm text-destructive font-medium">
                    {a.maintenanceName} = DUE at {formatKm(a.dueReading)}
                  </p>
                ))}
            </div>
          )}
        </div>
      );

    case "work-order": {
      const wo = state.workOrders[0];
      return (
        <div className="space-y-3">
          {!wo ? (
            <Btn onClick={() => dispatch({ type: "GENERATE_PM_WORK_ORDER" })}>
              Generate Work Order
            </Btn>
          ) : (
            <div className="space-y-3">
              <div className="border border-border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-muted-foreground">{wo.id}</span>
                  <Badge status={wo.status} />
                </div>
                <p className="font-medium text-foreground mb-2">{wo.maintenanceType} service</p>
                <p className="text-xs text-muted-foreground">
                  Bay: {wo.bay} | Supervisor: {wo.supervisor} | Odometer: {formatKm(wo.vehicleOdometer)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-accent mb-2">Activities</p>
                <div className="border border-border rounded-md overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="px-3 py-2 text-left">Activity</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wo.activities.map((a) => (
                        <tr key={a.id} className="border-t border-border">
                          <td className="px-3 py-2 text-foreground">{a.description}</td>
                          <td className="px-3 py-2"><Badge status={a.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-accent mb-2">Parts</p>
                <div className="border border-border rounded-md overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="px-3 py-2 text-left">Part</th>
                        <th className="px-3 py-2 text-right">Req.</th>
                        <th className="px-3 py-2 text-right">Issued</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wo.partRequirements.map((p) => (
                        <tr key={p.partId} className="border-t border-border">
                          <td className="px-3 py-2 text-foreground">{p.description}</td>
                          <td className="px-3 py-2 text-right text-muted-foreground">{p.required}</td>
                          <td className="px-3 py-2 text-right text-muted-foreground">{p.issued}</td>
                          <td className="px-3 py-2"><Badge status={p.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-accent mb-2">Component Counters</p>
                {state.componentCounters.map((c) => (
                  <div key={c.id} className="flex justify-between text-sm py-1 border-t border-border">
                    <span className="text-muted-foreground">{c.name}</span>
                    <Badge status={c.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    case "execution": {
      const wo = state.workOrders[0];
      if (!wo) {
        return <p className="text-sm text-muted-foreground">Generating work order...</p>;
      }
      const firstAct = wo.activities[0];

      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">
            Guide through tabs in order: General, Activities, Parts, Component Counters.
          </p>

          <div>
            <p className="text-xs font-semibold uppercase text-accent mb-2">Tab: General</p>
            <div className="border border-border rounded-md p-3">
              <p className="text-sm"><strong>Work Order:</strong> {wo.id}</p>
              <p className="text-sm"><strong>Status:</strong> {wo.status}</p>
              <p className="text-sm"><strong>Bay:</strong> {wo.bay} | <strong>Supervisor:</strong> {wo.supervisor}</p>
              {wo.status === "Scheduled" && (
                <Btn onClick={() => dispatch({ type: "START_WORK_ORDER", payload: { woId: wo.id } })}>
                  Start Work Order
                </Btn>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-accent mb-2">Tab: Activities</p>
            <div className="border border-border rounded-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-3 py-2 text-left">Activity</th>
                    <th className="px-3 py-2 text-left">Tech</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {wo.activities.map((a) => {
                    const isFirst = a.id === firstAct?.id;
                    return (
                      <tr key={a.id}>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground">{a.description}</span>
                            {isFirst && a.technician && a.startTime && a.status === "Completed" && (
                              <span className="text-xs text-green-600 font-medium">Complete</span>
                            )}
                            {isFirst && (!a.technician || !a.startTime) && a.status === "Pending" && (
                              <span className="text-xs text-amber-600 font-medium">Next action</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          {!a.technician ? (
                            <select
                              onChange={(e) =>
                                dispatch({
                                  type: "ASSIGN_TECHNICIAN",
                                  payload: { woId: wo.id, activityId: a.id, tech: e.target.value },
                                })
                              }
                              className="text-xs rounded border border-border bg-popover px-1 py-0.5"
                              defaultValue=""
                            >
                              <option value="" disabled>Assign technician</option>
                              {technicians.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-foreground">{a.technician}</span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <Badge status={a.status} />
                          {a.startTime && <span className="text-xs text-muted-foreground ml-2">Started: {new Date(a.startTime).toISOString().slice(0, 10)}</span>}
                          {a.endTime && <span className="text-xs text-muted-foreground ml-2">Completed: {new Date(a.endTime).toISOString().slice(0, 10)}</span>}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {!a.startTime ? (
                            <button
                              type="button"
                              onClick={() => dispatch({ type: "START_ACTIVITY", payload: { woId: wo.id, activityId: a.id } })}
                              disabled={!a.technician || wo.status !== "In Progress"}
                              className="text-xs font-medium text-accent hover:underline disabled:opacity-50"
                            >
                              Start Now
                            </button>
                          ) : a.status !== "Completed" ? (
                            <button
                              type="button"
                              onClick={() => dispatch({ type: "COMPLETE_ACTIVITY", payload: { woId: wo.id, activityId: a.id } })}
                              className="text-xs font-medium text-accent hover:underline"
                            >
                              Finish Now
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground">Done</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-accent mb-2">Tab: Parts</p>
            <div className="border border-border rounded-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-3 py-2 text-left">Part</th>
                    <th className="px-3 py-2 text-right">Req.</th>
                    <th className="px-3 py-2 text-right">Avail.</th>
                    <th className="px-3 py-2 text-right">Reserved</th>
                    <th className="px-3 py-2 text-right">Issued</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {wo.partRequirements.map((p) => {
                    const canReserve = p.reserved < p.required;
                    const canIssue = p.issued < p.reserved;
                    return (
                      <tr key={p.partId}>
                        <td className="px-3 py-2 text-foreground">{p.description}</td>
                        <td className="px-3 py-2 text-right text-muted-foreground">{p.required}</td>
                        <td className="px-3 py-2 text-right text-muted-foreground">{p.available}</td>
                        <td className="px-3 py-2 text-right text-muted-foreground">{p.reserved}</td>
                        <td className="px-3 py-2 text-right text-muted-foreground">{p.issued}</td>
                        <td className="px-3 py-2"><Badge status={p.status} /></td>
                        <td className="px-3 py-2 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => dispatch({ type: "RESERVE_PART", payload: { woId: wo.id, partId: p.partId } })}
                            disabled={!canReserve}
                            className="text-xs font-medium text-accent hover:underline disabled:opacity-50"
                          >
                            Reserve
                          </button>
                          <button
                            type="button"
                            onClick={() => dispatch({ type: "ISSUE_PART", payload: { woId: wo.id, partId: p.partId } })}
                            disabled={!canIssue}
                            className="text-xs font-medium text-accent hover:underline disabled:opacity-50"
                          >
                            Issue
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-accent mb-2">Tab: Component Counters</p>
            {state.componentCounters.map((c) => (
              <div key={c.id} className="flex justify-between text-sm py-1 border-t border-border">
                <span className="text-muted-foreground">{c.name}</span>
                <span>
                  <span className="text-foreground">{c.current} {c.unit}</span>
                  {" "}
                  <Badge status={c.status} />
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "backlog": {
      const wo = state.workOrders[0];
      if (!wo) return <p className="text-sm text-muted-foreground">No work order.</p>;
      const part = wo.partRequirements[0];
      const hasBacklog = state.backlog.length > 0;

      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Shortage scenario: Part {part?.description ? <strong>{part.description}</strong> : "unknown"} has {part?.required} required, {part?.available ?? 0} available.
          </p>
          <p className="text-sm text-muted-foreground">
            Required: {part?.required} | Available: {part?.available ?? 0}
          </p>
          {!hasBacklog ? (
            <Btn
              onClick={() =>
                dispatch({
                  type: "SEND_ACTIVITY_TO_BACKLOG",
                  payload: {
                    woId: wo.id,
                    activityId: wo.activities[0]?.id ?? "",
                    reason: "Spare Part Unavailable",
                    priority: "High",
                  },
                })
              }
            >
              Send Activity to Backlog
            </Btn>
          ) : (
            <div className="border border-border rounded-md p-3">
              <p className="text-sm text-destructive font-medium mb-2">
                Activity sent to backlog.
              </p>
              {state.backlog.map((b) => (
                <div key={b.id} className="text-sm">
                  <div><strong>Activity:</strong> {b.activityDescription}</div>
                  <div><strong>Reason:</strong> {b.reason}</div>
                  <div><strong>Priority:</strong> {b.priority}</div>
                  {b.requiredPart && (
                    <div><strong>Part shortage:</strong> {b.requiredPart.description} - {b.requiredPart.required} required</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    case "follow-up": {
      const openBacklog = state.backlog.filter((b) => b.status === "Open");
      return (
        <div className="space-y-3">
          {!state.flags.followUpCreated ? (
            <Btn
              disabled={openBacklog.length === 0}
              onClick={() => {
                if (openBacklog.length > 0) {
                  dispatch({ type: "CREATE_FOLLOWUP_WO", payload: { backlogId: openBacklog[0].id } });
                }
              }}
            >
              Create Follow-Up Work Order
            </Btn>
          ) : (
            <div className="border border-border rounded-md p-3">
              <p className="text-sm text-green-600 font-medium mb-2">
                Follow-up work order created.
              </p>
              {state.workOrders
                .filter((w) => w.generatedFrom === "Follow-Up")
                .map((w) => (
                  <div key={w.id} className="text-sm">
                    <div><strong>WO ID:</strong> {w.id}</div>
                    <div><strong>Maintenance:</strong> {w.maintenanceType}</div>
                    <div><strong>Status:</strong> {w.status}</div>
                    {w.partRequirements.map((p) => (
                      <div key={p.partId} className="text-xs">
                        Part: {p.description} - <span className="text-destructive">{p.status}</span> ({p.issued}/{p.required} issued)
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}
          {openBacklog.length > 0 && !state.flags.followUpCreated && (
            <p className="text-xs text-muted-foreground">
              Preloaded from backlog item: {openBacklog[0].activityDescription}
            </p>
          )}
        </div>
      );
    }

    case "tire-lifecycle": {
      const tire = state.tires.find((t) => t.id === "TIRE-DEMO-004");
      const batches = state.retreadBatches;
      const returnedBatch = batches.find((b) => b.status === "Returned");

      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">
            Chapter 2: Tire Lifecycle - Following {tire?.id || "TIRE-DEMO-004"}
          </p>

          <div className="border border-border rounded-md p-3">
            <p className="text-xs font-semibold uppercase text-accent mb-1">Phase 1: Overview</p>
            <p className="text-sm text-muted-foreground">
              Status: {tire?.status ?? "Unknown"} | Position: {tire?.position ?? "None"} | Retreads: {tire?.retreadCount ?? 0}/{tire?.retreadLimit ?? 2}
            </p>
            <p className="text-sm text-muted-foreground">
              Accumulated km: {formatKm(tire?.accumulatedKm ?? 0)}
            </p>
          </div>

          <div className="border border-border rounded-md p-3">
            <p className="text-xs font-semibold uppercase text-accent mb-1">Phase 2: Retread Batch</p>
            {batches.length === 0 ? (
              <Btn
                onClick={() => {
                  if (tire) dispatch({ type: "CREATE_RETREAD_BATCH", payload: { tireId: tire.id } });
                }}
              >
                Create Retread Batch
              </Btn>
            ) : (
              <div className="space-y-2">
                {batches.map((b) => (
                  <div key={b.id} className="text-sm">
                    <div>Vendor: {b.vendor}</div>
                    <div>Status: {b.status}</div>
                    {b.sendDate && <div>Sent: {b.sendDate}</div>}
                    {b.actualReturn && <div>Returned: {b.actualReturn}</div>}
                  </div>
                ))}
                {!returnedBatch && batches.some((b) => b.status === "In Transit") && (
                  <Btn onClick={() => dispatch({ type: "RETURN_RETREAD_BATCH", payload: { batchId: batches.find((b) => b.status === "In Transit")!.id } })}>
                    Return Batch
                  </Btn>
                )}
                {!returnedBatch && !batches.some((b) => b.status === "In Transit") && batches.length > 0 && (
                  <Btn onClick={() => dispatch({ type: "SEND_RETREAD_BATCH", payload: { batchId: batches[0].id } })}>
                    Send Batch
                  </Btn>
                )}
              </div>
            )}
          </div>

          <div className="border border-border rounded-md p-3">
            <p className="text-xs font-semibold uppercase text-accent mb-1">Phase 3: Return & Reinstall</p>
            {returnedBatch && tire && tire.status === "In Stock" ? (
              <Btn onClick={() => dispatch({ type: "INSTALL_TIRE", payload: { tireId: tire.id, positionCode: "RL1-I" } })}>
                Reinstall TIRE-DEMO-004
              </Btn>
            ) : (
              <p className="text-sm text-muted-foreground">
                {returnedBatch ? "Batch returned. Reinstall tire to continue." : "Waiting for batch return."}
              </p>
            )}
          </div>

          <div className="border border-border rounded-md p-3">
            <p className="text-xs font-semibold uppercase text-accent mb-1">Phase 4: Terminal Outcome</p>
            {tire && tire.retreadCount >= tire.retreadLimit ? (
              <Btn onClick={() => dispatch({ type: "SCRAP_TIRE", payload: { tireId: tire.id } })}>
                Scrap Tire (retread limit reached)
              </Btn>
            ) : (
              <p className="text-sm text-muted-foreground">
                Retreads: {tire?.retreadCount ?? 0}/{tire?.retreadLimit ?? 2}. Complete lifecycle to reach limit.
              </p>
            )}
          </div>
        </div>
      );
    }

    default:
      return <p className="text-sm text-muted-foreground">Step configuration pending.</p>;
  }
}
