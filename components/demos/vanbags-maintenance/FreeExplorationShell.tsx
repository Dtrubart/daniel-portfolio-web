"use client";

import { useReducer, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  simulationReducer,
  initialSimulationState,
  type SimulationAction,
  type SimulationState,
} from "@/data/demos/vanbags-maintenance-sim";
import { formatKm } from "@/data/demos/vanbags-maintenance-guided";

type ModuleView =
  | "maintenance-dashboard"
  | "maintenance-master"
  | "maintenance-wos"
  | "maintenance-backlog"
  | "maintenance-reports"
  | "pm-dashboard"
  | "pm-master"
  | "pm-templates"
  | "pm-plans"
  | "pm-fleet"
  | "pm-alerts"
  | "pm-reports"
  | "tires-dashboard"
  | "tires-master"
  | "tires-inventory"
  | "tires-wo"
  | "tires-layout"
  | "tires-inspections"
  | "tires-retreading"
  | "tires-history"
  | "tires-reports"
  | "vehicle-history"
  | "reports";

const moduleNav = [
  { id: "maintenance-dashboard", label: "Maintenance", views: ["maintenance-dashboard", "maintenance-master", "maintenance-wos", "maintenance-backlog", "maintenance-reports"] },
  { id: "pm-dashboard", label: "Preventive Maintenance", views: ["pm-dashboard", "pm-master", "pm-templates", "pm-plans", "pm-fleet", "pm-alerts", "pm-reports"] },
  { id: "tires-dashboard", label: "Tire Management", views: ["tires-dashboard", "tires-master", "tires-inventory", "tires-wo", "tires-layout", "tires-inspections", "tires-retreading", "tires-history", "tires-reports"] },
  { id: "vehicle-history", label: "Vehicle History", views: ["vehicle-history"] },
  { id: "reports", label: "All Reports", views: ["reports"] },
] as const;

const subNavLabels: Record<string, string> = {
  "maintenance-dashboard": "Dashboard",
  "maintenance-master": "Master Data",
  "maintenance-wos": "Work Orders",
  "maintenance-backlog": "Backlog",
  "maintenance-reports": "Reports",
  "pm-dashboard": "Dashboard",
  "pm-master": "Master Data",
  "pm-templates": "Templates",
  "pm-plans": "Plans",
  "pm-fleet": "Fleet Schedule",
  "pm-alerts": "Alerts",
  "pm-reports": "Reports",
  "tires-dashboard": "Dashboard",
  "tires-master": "Master Data",
  "tires-inventory": "Tire Inventory",
  "tires-wo": "Work Orders",
  "tires-layout": "Vehicle Layout",
  "tires-inspections": "Inspections",
  "tires-retreading": "Retreading",
  "tires-history": "Tire History",
  "tires-reports": "Reports",
};

const activeModule = (view: ModuleView): string => {
  for (const m of moduleNav) {
    if (m.views.some((v) => v === view)) return m.id;
  }
  return "maintenance-dashboard";
};

export function FreeExplorationShell() {
  const [state, dispatch] = useReducer(simulationReducer, undefined, initialSimulationState);
  const [view, setView] = useState<ModuleView>("maintenance-dashboard");

  const handleReset = () => {
    dispatch({ type: "RESET_DEMO" });
    setView("maintenance-dashboard");
  };

  return (
    <div className="rounded-lg border border-border bg-popover">
      <div className="flex items-center justify-between border-b border-border px-5 pt-4 pb-3">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            VanBags Maintenance System
          </h2>
          <span className="text-xs text-muted-foreground">
            Vehicle: {state.vehicle.id} ({state.vehicle.brand} {state.vehicle.model})
          </span>
          <span className="text-xs text-muted-foreground">
            Odometer: {formatKm(state.vehicle.currentOdometer)}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset Demo
        </Button>
      </div>

      <nav aria-label="Module navigation" className="border-b border-border bg-secondary/30">
        <div className="flex flex-wrap gap-1 px-3">
          {moduleNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.views[0])}
              className={
                activeModule(view) === item.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {view !== "reports" && view !== "vehicle-history" && itemHasSubNav(view) && (
        <nav aria-label="Sub-navigation" className="border-b border-border bg-secondary/20">
          <div className="flex flex-wrap gap-1 px-5">
            {moduleNav.find((m) => m.views.some((v) => v === view))?.views.map((subView) => (
              <button
                key={subView}
                type="button"
                onClick={() => setView(subView as ModuleView)}
                className={
                  view === subView
                    ? "border-b-2 border-accent px-3 py-2 text-sm font-medium text-foreground"
                    : "border-transparent px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                }
              >
                {subNavLabels[subView]}
              </button>
            ))}
          </div>
        </nav>
      )}

      <div className="px-5 py-5">
        <FreeExplorationContent view={view} state={state} dispatch={dispatch} setView={setView} />
      </div>
    </div>
  );
}

function itemHasSubNav(view: ModuleView): boolean {
  return !["reports", "vehicle-history"].includes(view);
}

function FreeExplorationContent({
  view,
  state,
  dispatch,
  setView,
}: {
  view: ModuleView;
  state: SimulationState;
  dispatch: (action: SimulationAction) => void;
  setView: (view: ModuleView) => void;
}) {
  switch (view) {
    case "maintenance-dashboard":
      return <MaintenanceDashboard state={state} dispatch={dispatch} setView={setView} />;
    case "maintenance-master":
      return <EquipmentMaster state={state} />;
    case "maintenance-wos":
      return <MaintenanceWorkOrders state={state} />;
    case "maintenance-backlog":
      return <MaintenanceBacklog state={state} dispatch={dispatch} />;
    case "maintenance-reports":
      return <MaintenanceReports state={state} />;
    case "pm-dashboard":
      return <PMDashboard state={state} dispatch={dispatch} setView={setView} />;
    case "pm-master":
      return <PMMaster state={state} />;
    case "pm-templates":
      return <PMTemplates state={state} />;
    case "pm-plans":
      return <PMPlans state={state} />;
    case "pm-fleet":
      return <PMFleetSchedule state={state} />;
    case "pm-alerts":
      return <PMAlerts state={state} />;
    case "pm-reports":
      return <PMReports state={state} />;
    case "tires-dashboard":
      return <TiresDashboard state={state} dispatch={dispatch} setView={setView} />;
    case "tires-master":
      return <TireMaster state={state} />;
    case "tires-inventory":
      return <TiresInventory state={state} />;
    case "tires-wo":
      return <TiresWorkOrders state={state} />;
    case "tires-layout":
      return <TireVehicleLayout state={state} />;
    case "tires-inspections":
      return <TiresInspections state={state} />;
    case "tires-retreading":
      return <TiresRetreading state={state} dispatch={dispatch} />;
    case "tires-history":
      return <TireHistory state={state} />;
    case "tires-reports":
      return <TireReports state={state} />;
    case "reports":
      return <ReportsHub state={state} dispatch={dispatch} />;
    case "vehicle-history":
      return <VehicleHistory state={state} />;
    default:
      return <p className="text-sm text-muted-foreground">Select a module to get started.</p>;
  }
}

// --- Maintenance Module Components ---

function MaintenanceDashboard({
  state,
  dispatch,
  setView,
}: {
  state: SimulationState;
  dispatch: (action: SimulationAction) => void;
  setView: (view: ModuleView) => void;
}) {
  const dueAlerts = state.alerts.filter((a) => a.status === "Due");
  const inProgressWO = state.workOrders.filter((w) => w.status === "In Progress");
  const openBacklog = state.backlog.filter((b) => b.status === "Open");

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Maintenance Dashboard</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-border rounded-md p-3">
          <p className="text-xs font-semibold uppercase text-accent">Due Maintenance</p>
          <p className="text-2xl font-bold text-destructive">{dueAlerts.length}</p>
          {dueAlerts.map((a) => (
            <p key={a.id} className="text-xs text-muted-foreground">{a.maintenanceName}</p>
          ))}
        </div>
        <div className="border border-border rounded-md p-3">
          <p className="text-xs font-semibold uppercase text-accent">Work Orders</p>
          <p className="text-2xl font-bold text-foreground">{state.workOrders.length}</p>
          <p className="text-xs text-muted-foreground">{inProgressWO.length} in progress</p>
          <button
            type="button"
            onClick={() => setView("maintenance-wos")}
            className="text-xs text-accent hover:underline mt-1"
          >
            View work orders →
          </button>
        </div>
        <div className="border border-border rounded-md p-3">
          <p className="text-xs font-semibold uppercase text-accent">Backlog</p>
          <p className="text-2xl font-bold text-destructive">{openBacklog.length}</p>
          <p className="text-xs text-muted-foreground">{state.backlog.length} total</p>
          <button
            type="button"
            onClick={() => setView("maintenance-backlog")}
            className="text-xs text-accent hover:underline mt-1"
          >
            View backlog →
          </button>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-xs font-semibold uppercase text-accent mb-2">Recent History</p>
        <div className="space-y-1">
          {state.history.slice(-5).reverse().map((h) => (
            <div key={h.id} className="text-xs text-muted-foreground border-t border-border pt-1">
              {h.action}: {h.description}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-2">
        <p className="text-xs font-semibold uppercase text-accent mb-2">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          {!state.flags.equipmentRegistered && (
            <Button size="sm" onClick={() => dispatch({ type: "CREATE_EQUIPMENT" })}>
              Register Equipment
            </Button>
          )}
          {!state.flags.templatesConfigured && (
            <Button size="sm" onClick={() => dispatch({ type: "SAVE_TEMPLATES" })}>
              Configure Templates
            </Button>
          )}
          {!state.flags.planAssigned && (
            <Button size="sm" onClick={() => dispatch({ type: "ASSIGN_PM_PLAN" })}>
              Assign PM Plan
            </Button>
          )}
          {state.flags.workOrderGenerated && state.workOrders[0]?.status === "Scheduled" && (
            <Button size="sm" onClick={() => dispatch({ type: "START_WORK_ORDER", payload: { woId: state.workOrders[0].id } })}>
              Start Work Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function MaintenanceWorkOrders({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Work Orders</h3>
      {state.workOrders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No work orders yet.</p>
      ) : (
        <div className="space-y-3">
          {state.workOrders.map((wo) => (
            <div key={wo.id} className="border border-border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs text-muted-foreground">{wo.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  wo.status === "In Progress" ? "bg-amber-600/10 text-amber-600"
                  : wo.status === "Scheduled" ? "bg-blue-600/10 text-blue-600"
                  : wo.status === "Closed" ? "bg-green-600/10 text-green-600"
                  : "bg-secondary text-muted-foreground"
                }`}>{wo.status}</span>
              </div>
              <p className="font-medium text-foreground">{wo.maintenanceType} service</p>
              <p className="text-xs text-muted-foreground">
                Bay: {wo.bay} | Supervisor: {wo.supervisor} | Odometer: {formatKm(wo.vehicleOdometer)}
              </p>
              <div className="mt-2">
                <p className="text-xs font-semibold uppercase text-accent">Activities</p>
                <table className="w-full text-xs">
                  <thead>
                    <tr><th>Activity</th><th>Technician</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {wo.activities.map((a) => (
                      <tr key={a.id}>
                        <td>{a.description}</td>
                        <td>{a.technician ?? "Unassigned"}</td>
                        <td>{a.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2">
                <p className="text-xs font-semibold uppercase text-accent">Parts</p>
                <table className="w-full text-xs">
                  <thead>
                    <tr><th>Part</th><th>Req</th><th>Issued</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {wo.partRequirements.map((p) => (
                      <tr key={p.partId}>
                        <td>{p.description}</td>
                        <td>{p.required}</td>
                        <td>{p.issued}</td>
                        <td>{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MaintenanceBacklog({
  state,
  dispatch,
}: {
  state: SimulationState;
  dispatch: (action: SimulationAction) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Active Backlog</h3>
      {state.backlog.length === 0 ? (
        <p className="text-sm text-muted-foreground">No backlog items.</p>
      ) : (
        <div className="space-y-3">
          {state.backlog.map((b) => (
            <div key={b.id} className="border border-border rounded-md p-3">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                <span className="text-xs text-destructive">{b.priority} Priority</span>
              </div>
              <p className="font-medium">{b.activityDescription}</p>
              <p className="text-xs text-muted-foreground">Reason: {b.reason}</p>
              {b.requiredPart && (
                <p className="text-xs text-muted-foreground mt-1">
                  Part shortage: {b.requiredPart.description} - {b.requiredPart.required} required
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "CREATE_FOLLOWUP_WO", payload: { backlogId: b.id } })}
                  className="text-xs text-accent hover:underline"
                >
                  Create Follow-Up WO
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- PM Module Components ---

function PMDashboard({
  state,
  dispatch: _dispatch,
  setView: _setView,
}: {
  state: SimulationState;
  dispatch: (action: SimulationAction) => void;
  setView: (view: ModuleView) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Preventive Maintenance Dashboard</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-border rounded-md p-3">
          <p className="text-xs font-semibold uppercase text-accent">Due Now</p>
          <p className="text-2xl font-bold text-destructive">
            {state.alerts.filter((a) => a.status === "Due").length}
          </p>
        </div>
        <div className="border border-border rounded-md p-3">
          <p className="text-xs font-semibold uppercase text-accent">Due Soon</p>
          <p className="text-2xl font-bold text-amber-600">
            {state.alerts.filter((a) => a.status === "Due Soon").length}
          </p>
        </div>
        <div className="border border-border rounded-md p-3">
          <p className="text-xs font-semibold uppercase text-accent">Scheduled</p>
          <p className="text-2xl font-bold text-green-600">
            {state.alerts.filter((a) => a.status === "Scheduled").length}
          </p>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-xs font-semibold uppercase text-accent mb-2">Maintenance Schedule</p>
        <table className="w-full text-sm">
          <thead>
            <tr><th>Reading</th><th>Template</th><th>Type</th><th>Status</th></tr>
          </thead>
          <tbody>
            {state.maintenancePlan.map((e, i) => (
              <tr key={i} className="border-t">
                <td>{formatKm(e.reading)}</td>
                <td>{e.templateId}</td>
                <td>{e.maintenanceType}</td>
                <td>
                  {e.reading <= state.vehicle.currentOdometer ? (
                    <span className="text-destructive">Due</span>
                  ) : e.reading - state.vehicle.currentOdometer <= 500 ? (
                    <span className="text-amber-600">Due Soon</span>
                  ) : (
                    <span className="text-muted-foreground">Scheduled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground pt-2">
        Odometer: {formatKm(state.vehicle.currentOdometer)} | Next PM trigger at 5,000 km.
      </p>
    </div>
  );
}

function PMAlerts({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">PM Alerts</h3>
      {state.alerts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No alerts.</p>
      ) : (
        <div className="space-y-2">
          {state.alerts.map((a) => (
            <div key={a.id} className="border border-border rounded-md p-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{a.maintenanceName}</p>
                <p className="text-xs text-muted-foreground">
                  Due at {formatKm(a.dueReading)} ({a.remaining} km remaining)
                </p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${
                a.status === "Due" ? "bg-destructive/10 text-destructive"
                : a.status === "Due Soon" ? "bg-amber-600/10 text-amber-600"
                : "bg-green-600/10 text-green-600"
              }`}>{a.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Tire Management Module Components ---

function TiresDashboard({
  state,
  dispatch: _dispatch,
  setView,
}: {
  state: SimulationState;
  dispatch: (action: SimulationAction) => void;
  setView: (view: ModuleView) => void;
}) {
  const inService = state.tires.filter((t) => t.status === "In Service");
  const inStock = state.tires.filter((t) => t.status === "In Stock" || t.status === "Warehouse");
  const scrapped = state.tires.filter((t) => t.status === "Scrapped");

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire Management Dashboard</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="border border-border rounded-md p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{state.tires.length}</p>
          <p className="text-xs text-muted-foreground">Total Tires</p>
        </div>
        <div className="border border-border rounded-md p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{inService.length}</p>
          <p className="text-xs text-muted-foreground">In Service</p>
        </div>
        <div className="border border-border rounded-md p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">{inStock.length}</p>
          <p className="text-xs text-muted-foreground">In Stock</p>
        </div>
        <div className="border border-border rounded-md p-3 text-center">
          <p className="text-2xl font-bold text-destructive">{scrapped.length}</p>
          <p className="text-xs text-muted-foreground">Scrapped</p>
        </div>
      </div>
      {state.tireAlerts.length > 0 && (
        <div className="pt-2">
          <p className="text-xs font-semibold uppercase text-accent mb-2">Tire Alerts</p>
          {state.tireAlerts.map((alert) => (
            <div key={alert.id} className="border border-border rounded-md p-2 text-sm">
              {alert.tireId}: {alert.message}
            </div>
          ))}
        </div>
      )}
      <div className="pt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setView("tires-inventory")}
          className="text-xs text-accent hover:underline text-left"
        >
          View tire inventory →
        </button>
        <button
          type="button"
          onClick={() => setView("tires-inspections")}
          className="text-xs text-accent hover:underline text-left"
        >
          View inspections →
        </button>
      </div>
    </div>
  );
}

function TiresInventory({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire Inventory</h3>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th>Tire ID</th><th>Brand</th><th>Size</th><th>Status</th><th>Position</th><th>Accumulated</th><th>Retread Count</th>
            </tr>
          </thead>
          <tbody>
            {state.tires.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="font-mono text-xs">{t.id}</td>
                <td>{t.brand}</td>
                <td>{t.size}</td>
                <td>{t.status}</td>
                <td>{t.position ?? "-"}</td>
                <td>{formatKm(t.accumulatedKm)}</td>
                <td>{t.retreadCount}/{t.retreadLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-2">
        <p className="text-xs font-semibold uppercase text-accent mb-2">Tire Layout</p>
        {state.tirePositions.map((p) => (
          <div key={p.code} className="flex justify-between text-sm py-1 border-t">
            <span className="text-muted-foreground">{p.code}</span>
            <span className="font-mono">{p.tireId ?? "Unassigned"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TiresInspections({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire Inspections</h3>
      {state.tireInspections.length === 0 ? (
        <p className="text-sm text-muted-foreground">No inspections recorded.</p>
      ) : (
        <div className="space-y-3">
          {state.tireInspections.map((insp) => (
            <div key={insp.id} className="border border-border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-foreground">{insp.tireId}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  insp.status === "Normal" ? "bg-green-600/10 text-green-600" : "bg-destructive/10 text-destructive"
                }`}>{insp.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Position:</span> {insp.position}</div>
                <div><span className="text-muted-foreground">Odometer:</span> {formatKm(insp.odometer)}</div>
                <div><span className="text-muted-foreground">Outer Tread:</span> {insp.treadOuter} mm</div>
                <div><span className="text-muted-foreground">Center Tread:</span> {insp.treadCenter} mm</div>
                <div><span className="text-muted-foreground">Inner Tread:</span> {insp.treadInner} mm</div>
                <div><span className="text-muted-foreground">Pressure:</span> {insp.pressure}</div>
                <div><span className="text-muted-foreground">Condition:</span> {insp.condition}</div>
                <div><span className="text-muted-foreground">Date:</span> {insp.date}</div>
              </div>
              {insp.suggestedAction && (
                <p className="text-xs text-amber-600 mt-2">Recommendation: {insp.suggestedAction}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TiresRetreading({ state, dispatch }: { state: SimulationState; dispatch: (action: SimulationAction) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire Retreading</h3>
      {state.retreadBatches.length === 0 ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">No retread batches.</p>
          <Button size="sm" onClick={() => {
            const tire = state.tires.find((t) => t.id === "TIRE-DEMO-004");
            if (tire) dispatch({ type: "CREATE_RETREAD_BATCH", payload: { tireId: tire.id } });
          }}>
            Create Retread Batch
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {state.retreadBatches.map((b) => (
            <div key={b.id} className="border border-border rounded-md p-3">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  b.status === "Returned" ? "bg-green-600/10 text-green-600"
                  : b.status === "In Transit" ? "bg-blue-600/10 text-blue-600"
                  : "bg-amber-600/10 text-amber-600"
                }`}>{b.status}</span>
              </div>
              <p className="text-sm"><span className="text-muted-foreground">Vendor:</span> {b.vendor}</p>
              <p className="text-sm"><span className="text-muted-foreground">Sent:</span> {b.sendDate}</p>
              {b.actualReturn && <p className="text-sm"><span className="text-muted-foreground">Returned:</span> {b.actualReturn}</p>}
              {b.returnedTread && <p className="text-sm"><span className="text-muted-foreground">Returned Tread:</span> {b.returnedTread}</p>}
              {b.result && <p className="text-sm"><span className="text-muted-foreground">Result:</span> {b.result}</p>}
              <div className="mt-2 text-xs text-muted-foreground">
                {b.lines.map((line) => (
                  <div key={line.tireId}>Tire: {line.tireId} | Outgoing: {line.outgoingTread}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Reports Components ---

function ReportsHub({ state, dispatch }: { state: SimulationState; dispatch: (action: SimulationAction) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ReportCard title="Work Order Report" description="All work orders with status, activities, and parts." content={<WOReport state={state} />} />
        <ReportCard title="Spare Parts Report" description="Parts inventory with usage statistics." content={<PartsReport state={state} />} />
        <ReportCard title="Backlog Report" description="Open backlog items requiring follow-up." content={<BacklogReport state={state} dispatch={dispatch} />} />
        <ReportCard title="Component Counters" description="Current counter readings and status." content={<CountersReport state={state} />} />
        <ReportCard title="Tire Inventory Report" description="All tires with status, position, and retread history." content={<TireInventoryReport state={state} />} />
        <ReportCard title="Tire Inspection Report" description="Inspection records with tread measurements." content={<InspectionReport state={state} />} />
        <ReportCard title="Retread Report" description="Retread batch history and status." content={<RetreadReport state={state} />} />
      </div>
    </div>
  );
}

function ReportCard({ title, description, content }: { title: string; description: string; content: React.ReactNode }) {
  return (
    <div className="border border-border rounded-md p-4">
      <h4 className="font-medium text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      {content}
    </div>
  );
}

function WOReport({ state }: { state: SimulationState }) {
  const total = state.workOrders.length;
  const inProgress = state.workOrders.filter((w) => w.status === "In Progress").length;
  const completed = state.workOrders.filter((w) => w.status === "Closed").length;
  const totalActivities = state.workOrders.reduce((sum, wo) => sum + wo.activities.length, 0);
  const completedActivities = state.workOrders.reduce(
    (sum, wo) => sum + wo.activities.filter((a) => a.status === "Completed").length, 0
  );
  const totalParts = state.workOrders.reduce((sum, wo) => sum + wo.partRequirements.length, 0);
  const issuedParts = state.workOrders.reduce((sum, wo) => sum + wo.partRequirements.reduce((p, r) => p + r.issued, 0), 0);

  return (
    <div className="text-xs space-y-1">
      <div className="flex justify-between"><span>Total WOs:</span><span>{total}</span></div>
      <div className="flex justify-between"><span>In Progress:</span><span>{inProgress}</span></div>
      <div className="flex justify-between"><span>Completed:</span><span>{completed}</span></div>
      <div className="flex justify-between"><span>Activities ({completedActivities}/{totalActivities}):</span><span></span></div>
      <div className="flex justify-between"><span>Parts Issued ({issuedParts}/{totalParts}):</span><span></span></div>
    </div>
  );
}

function PartsReport({ state }: { state: SimulationState }) {
  return (
    <div className="text-xs space-y-1">
      {state.partsCatalog.map((p) => (
        <div key={p.id} className="flex justify-between">
          <span>{p.id} - {p.description}</span>
          <span>Available: {p.available} | Reserved: {p.reserved}</span>
        </div>
      ))}
    </div>
  );
}

function BacklogReport({ state, dispatch }: { state: SimulationState; dispatch: (action: SimulationAction) => void }) {
  return (
    <div className="text-xs space-y-2">
      {state.backlog.length === 0 ? (
        <p className="text-muted-foreground">No backlog items.</p>
      ) : (
        state.backlog.map((b) => (
          <div key={b.id} className="border border-border rounded p-2">
            <div className="font-mono">{b.id}</div>
            <div>{b.activityDescription}</div>
            <div className="text-muted-foreground">Reason: {b.reason} | Priority: {b.priority}</div>
            <button
              type="button"
              onClick={() => dispatch({ type: "CREATE_FOLLOWUP_WO", payload: { backlogId: b.id } })}
              className="text-accent hover:underline mt-1"
            >
              Create Follow-Up WO →
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function CountersReport({ state }: { state: SimulationState }) {
  return (
    <div className="text-xs space-y-1">
      {state.componentCounters.map((c) => (
        <div key={c.id} className="flex justify-between">
          <span>{c.name}</span>
          <span>{c.current} {c.unit} - {c.status}</span>
        </div>
      ))}
    </div>
  );
}

function TireInventoryReport({ state }: { state: SimulationState }) {
  return (
    <div className="text-xs space-y-1">
      {state.tires.map((t) => (
        <div key={t.id} className="flex justify-between">
          <span className="font-mono">{t.id}</span>
          <span>{t.status} | Retreads: {t.retreadCount}/{t.retreadLimit}</span>
        </div>
      ))}
    </div>
  );
}

function InspectionReport({ state }: { state: SimulationState }) {
  return (
    <div className="text-xs space-y-1">
      {state.tireInspections.length === 0 ? (
        <p className="text-muted-foreground">No inspections.</p>
      ) : (
        state.tireInspections.map((i) => (
          <div key={i.id} className="flex justify-between">
            <span>{i.tireId}</span>
            <span>{i.status} | Outer: {i.treadOuter}mm</span>
          </div>
        ))
      )}
    </div>
  );
}

function RetreadReport({ state }: { state: SimulationState }) {
  return (
    <div className="text-xs space-y-1">
      {state.retreadBatches.length === 0 ? (
        <p className="text-muted-foreground">No retread batches.</p>
      ) : (
        state.retreadBatches.map((b) => (
          <div key={b.id} className="flex justify-between">
            <span className="font-mono">{b.id}</span>
            <span>{b.vendor} | {b.status}</span>
          </div>
        ))
      )}
    </div>
  );
}

// --- Missing Maintenance Components ---

function EquipmentMaster({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Equipment Master Data</h3>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr><th>Equipment ID</th><th>Type</th><th>Brand</th><th>Model</th><th>Odometer</th><th>Location</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="font-mono text-xs">{state.vehicle.id}</td>
              <td>{state.vehicle.equipmentType}</td>
              <td>{state.vehicle.brand}</td>
              <td>{state.vehicle.model} ({state.vehicle.year})</td>
              <td>{formatKm(state.vehicle.currentOdometer)}</td>
              <td>{state.vehicle.location}</td>
              <td>Operational</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pt-3">
        <h4 className="text-sm font-medium text-foreground mb-2">Counter Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {state.componentCounters.map((c) => (
            <div key={c.id} className="border border-border rounded-md p-3">
              <p className="text-xs text-muted-foreground uppercase">{c.name}</p>
              <p className="text-xl font-bold">{c.current} {c.unit}</p>
              <p className="text-xs text-muted-foreground">
                Threshold: {c.threshold} {c.unit} | {c.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaintenanceReports({ state }: { state: SimulationState }) {
  const totalWO = state.workOrders.length;
  const inProgressWO = state.workOrders.filter((w) => w.status === "In Progress").length;
  const closedWO = state.workOrders.filter((w) => w.status === "Closed").length;
  const scheduledWO = state.workOrders.filter((w) => w.status === "Scheduled").length;
  const totalActivities = state.workOrders.reduce((sum, wo) => sum + wo.activities.length, 0);
  const completedActivities = state.workOrders.reduce(
    (sum, wo) => sum + wo.activities.filter((a) => a.status === "Completed").length, 0
  );
  const totalPartsRequired = state.workOrders.reduce((sum, wo) => sum + wo.partRequirements.reduce((p, r) => p + r.required, 0), 0);
  const totalPartsIssued = state.workOrders.reduce((sum, wo) => sum + wo.partRequirements.reduce((p, r) => p + r.issued, 0), 0);
  const openBacklog = state.backlog.filter((b) => b.status === "Open").length;
  const totalSpareParts = state.partsCatalog.length;
  const totalAvailableSpare = state.partsCatalog.reduce((sum, p) => sum + p.available, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Maintenance Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReportCard title="Work Orders" description="All work orders by status" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total:</span><span>{totalWO}</span></div>
            <div className="flex justify-between"><span>Scheduled:</span><span>{scheduledWO}</span></div>
            <div className="flex justify-between"><span>In Progress:</span><span>{inProgressWO}</span></div>
            <div className="flex justify-between"><span>Completed:</span><span>{closedWO}</span></div>
          </div>
        } />
        <ReportCard title="Activities" description="Activity completion" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total:</span><span>{totalActivities}</span></div>
            <div className="flex justify-between"><span>Completed:</span><span>{completedActivities}</span></div>
            <div className="w-full bg-secondary rounded-full h-2 mt-1">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0}%` }}></div>
            </div>
          </div>
        } />
        <ReportCard title="Spare Parts" description="Parts catalog inventory" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total Items:</span><span>{totalSpareParts}</span></div>
            <div className="flex justify-between"><span>Total Available:</span><span>{totalAvailableSpare}</span></div>
            {state.partsCatalog.map((p) => (
              <div key={p.id} className="flex justify-between text-muted-foreground">
                <span>{p.id}</span>
                <span>{p.available}/{p.available + p.reserved}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Backlog" description="Open backlog items" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Open Items:</span><span>{openBacklog}</span></div>
            <div className="flex justify-between"><span>Total:</span><span>{state.backlog.length}</span></div>
            {state.backlog.slice(-3).reverse().map((b) => (
              <div key={b.id} className="text-muted-foreground">
                <span className="font-mono">{b.id}:</span> {b.activityDescription.substring(0, 30)}...
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Component Counters" description="Current counter status" content={
          <div className="text-xs space-y-1">
            {state.componentCounters.map((c) => (
              <div key={c.id} className="flex justify-between">
                <span>{c.name}</span>
                <span>{c.current} {c.unit} | {c.status}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Parts Usage" description="WO parts issuance" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Required:</span><span>{totalPartsRequired}</span></div>
            <div className="flex justify-between"><span>Issued:</span><span>{totalPartsIssued}</span></div>
            <div className="flex justify-between"><span>Reserved:</span><span>{state.partsCatalog.reduce((sum, p) => sum + p.reserved, 0)}</span></div>
          </div>
        } />
      </div>
    </div>
  );
}

// --- PM Module Components ---

function PMMaster({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">PM Master Data</h3>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr><th>Equipment</th><th>Brand/Style</th><th>Odometer</th><th>Location</th><th>Counter</th></tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="font-mono text-xs">{state.vehicle.id}</td>
              <td>{state.vehicle.brand} {state.vehicle.model}</td>
              <td>{formatKm(state.vehicle.currentOdometer)}</td>
              <td>{state.vehicle.location}</td>
              <td>Kilometers</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PMTemplates({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Maintenance Templates</h3>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr><th>Code</th><th>Name</th><th>Interval (km)</th><th>Activities</th><th>Standard Parts</th></tr>
          </thead>
          <tbody>
            {state.maintenanceTemplates.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="font-mono text-xs">{t.code}</td>
                <td>{t.name}</td>
                <td>{t.intervalKm.toLocaleString()}</td>
                <td>{t.activities.join(", ")}</td>
                <td>{t.standardParts.map((p) => p.description).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PMPlans({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Maintenance Plans</h3>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr><th>Reading</th><th>Template</th><th>Type</th><th>Status</th></tr>
          </thead>
          <tbody>
            {state.maintenancePlan.map((e, i) => (
              <tr key={i} className="border-t">
                <td>{formatKm(e.reading)}</td>
                <td>{e.templateId}</td>
                <td>{e.maintenanceType}</td>
                <td>
                  {e.reading <= state.vehicle.currentOdometer ? (
                    <span className="text-destructive font-medium">Due</span>
                  ) : e.reading - state.vehicle.currentOdometer <= 500 ? (
                    <span className="text-amber-600 font-medium">Due Soon</span>
                  ) : (
                    <span className="text-green-600">Scheduled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PMFleetSchedule({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Fleet Schedule</h3>
      <p className="text-sm text-muted-foreground">
        Vehicle: {state.vehicle.id} ({state.vehicle.brand} {state.vehicle.model})
      </p>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr><th>Reading (km)</th><th>Template</th><th>Type</th><th>Days Remaining</th><th>Status</th></tr>
          </thead>
          <tbody>
            {state.maintenancePlan.map((e, i) => {
              const remaining = e.reading - state.vehicle.currentOdometer;
              return (
                <tr key={i} className="border-t">
                  <td>{formatKm(e.reading)}</td>
                  <td>{e.templateId}</td>
                  <td>{e.maintenanceType}</td>
                  <td>{remaining > 0 ? `${remaining.toLocaleString()} km` : "Overdue"}</td>
                  <td>
                    {remaining <= 0 ? <span className="text-destructive">Overdue</span>
                    : remaining <= 500 ? <span className="text-amber-600">Due Soon</span>
                    : <span className="text-muted-foreground">Scheduled</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PMReports({ state }: { state: SimulationState }) {
  const dueNow = state.alerts.filter((a) => a.status === "Due");
  const dueSoon = state.alerts.filter((a) => a.status === "Due Soon");
  const scheduled = state.alerts.filter((a) => a.status === "Scheduled");
  const overdue = state.maintenancePlan.filter((e) => e.reading <= state.vehicle.currentOdometer);
  const upcoming = state.maintenancePlan.filter(
    (e) => e.reading > state.vehicle.currentOdometer && e.reading - state.vehicle.currentOdometer <= 5000
  );

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">PM Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReportCard title="Upcoming Maintenance" description="Scheduled within next 5,000 km" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total:</span><span>{upcoming.length}</span></div>
            {upcoming.map((e, i) => (
              <div key={i} className="flex justify-between text-muted-foreground">
                <span>{e.templateId}</span>
                <span>Due at {formatKm(e.reading)}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Due Soon" description="Due within 500 km" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total:</span><span>{dueSoon.length}</span></div>
            {dueSoon.map((a) => (
              <div key={a.id} className="flex justify-between text-muted-foreground">
                <span>{a.maintenanceName}</span>
                <span>{a.remaining} km</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Overdue" description="Past due date" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total:</span><span>{overdue.length}</span></div>
            {overdue.map((e, i) => (
              <div key={i} className="flex justify-between text-destructive">
                <span>{e.templateId}</span>
                <span>{e.maintenanceType}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Scheduled Work" description="Planned maintenance" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total:</span><span>{scheduled.length}</span></div>
            {scheduled.map((a) => (
              <div key={a.id} className="flex justify-between text-muted-foreground">
                <span>{a.maintenanceName}</span>
                <span>Due at {formatKm(a.dueReading)}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Due Now" description="Immediate maintenance required" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Total:</span><span>{dueNow.length}</span></div>
            {dueNow.map((a) => (
              <div key={a.id} className="flex justify-between text-destructive">
                <span>{a.maintenanceName}</span>
                <span>{a.remaining} km</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Vehicle Plan Status" description="Current plan completion" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Current Odometer:</span><span>{formatKm(state.vehicle.currentOdometer)}</span></div>
            <div className="flex justify-between"><span>Initial Odometer:</span><span>{formatKm(state.vehicle.initialOdometer)}</span></div>
            <div className="flex justify-between"><span>Templates:</span><span>{state.maintenanceTemplates.length}</span></div>
            <div className="flex justify-between"><span>Total Plan Entries:</span><span>{state.maintenancePlan.length}</span></div>
          </div>
        } />
      </div>
    </div>
  );
}

// --- Tire Module Components ---

function TireMaster({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire Master Data</h3>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr><th>Tire ID</th><th>Brand</th><th>Model</th><th>Size</th><th>Initial Tread</th><th>Retread Limit</th><th>Status</th></tr>
          </thead>
          <tbody>
            {state.tires.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="font-mono text-xs">{t.id}</td>
                <td>{t.brand}</td>
                <td>{t.model}</td>
                <td>{t.size}</td>
                <td>{t.initialTread}</td>
                <td>{t.retreadLimit}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TiresWorkOrders({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire Work Orders</h3>
      {state.workOrders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No work orders yet.</p>
      ) : (
        <div className="border border-border rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr><th>WO ID</th><th>Mileage</th><th>Bay</th><th>Type</th><th>Status</th><th>Generated From</th></tr>
            </thead>
            <tbody>
              {state.workOrders.map((wo) => (
                <tr key={wo.id} className="border-t">
                  <td className="font-mono text-xs">{wo.id}</td>
                  <td>{formatKm(wo.vehicleOdometer)}</td>
                  <td>{wo.bay}</td>
                  <td>{wo.maintenanceType}</td>
                  <td>{wo.status}</td>
                  <td>{wo.generatedFrom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TireVehicleLayout({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Vehicle Layout</h3>
      <p className="text-sm text-muted-foreground">
        {state.vehicle.id} | {state.vehicle.brand} {state.vehicle.model} | Axles: {state.vehicle.axles} | Positions: {state.vehicle.tirePositions}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {state.tirePositions.map((pos) => {
          const tire = state.tires.find((t) => t.position === pos.code && t.status === "In Service");
          return (
            <div key={pos.code} className="border border-border rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-xs text-muted-foreground">{pos.label}</span>
                <span className="text-xs text-muted-foreground">{pos.side} | {pos.location}</span>
              </div>
              {tire ? (
                <div>
                  <p className="font-mono text-xs">{tire.id}</p>
                  <p className="text-xs">{tire.brand} {tire.size}</p>
                  <p className="text-xs text-muted-foreground">Tread: {tire.currentTread} mm</p>
                  <p className="text-xs text-muted-foreground">Retreads: {tire.retreadCount}/{tire.retreadLimit}</p>
                  <p className="text-xs text-muted-foreground">Km: {formatKm(tire.accumulatedKm)}</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Unassigned</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TireHistory({ state }: { state: SimulationState }) {
  const tireMoves = state.tireMovements;
  const inspectionEvents = state.tireInspections;

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire History</h3>
      <div className="border border-border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr><th>Date</th><th>Tire</th><th>Action</th><th>From</th><th>To</th><th>Odometer</th></tr>
          </thead>
          <tbody>
            {tireMoves.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-muted-foreground py-4">No tire movements recorded.</td></tr>
            ) : (
              tireMoves.slice().reverse().map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="text-xs text-muted-foreground">{m.timestamp.slice(0, 10)}</td>
                  <td className="font-mono text-xs">{m.tireId}</td>
                  <td>{m.action}</td>
                  <td>{m.fromPosition ?? "-"}</td>
                  <td>{m.toPosition ?? "-"}</td>
                  <td>{formatKm(m.endOdometer ?? m.startOdometer)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {inspectionEvents.length > 0 && (
        <div className="pt-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Inspection History</h4>
          <div className="border border-border rounded-md overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr><th>Date</th><th>Tire</th><th>Position</th><th>Tread (Outer/Center/Inner)</th><th>Status</th></tr>
              </thead>
              <tbody>
                {inspectionEvents.map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="text-xs text-muted-foreground">{i.date}</td>
                    <td className="font-mono text-xs">{i.tireId}</td>
                    <td>{i.position}</td>
                    <td>{i.treadOuter}/{i.treadCenter}/{i.treadInner} mm</td>
                    <td>{i.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function TireReports({ state }: { state: SimulationState }) {
  const inService = state.tires.filter((t) => t.status === "In Service");
  const inStock = state.tires.filter((t) => t.status === "In Stock" || t.status === "Warehouse");
  const scrapped = state.tires.filter((t) => t.status === "Scrapped");
  const inspectionDue = state.tires.filter((t) => {
    const lastInsp = state.tireInspections.filter((i) => i.tireId === t.id).pop();
    if (!lastInsp) return t.accumulatedKm >= 10000;
    return t.accumulatedKm - lastInsp.odometer >= 10000;
  });
  const rotationRecommended = inService.filter(
    (t) => t.accumulatedKm >= t.installedAtKm! && t.accumulatedKm - t.installedAtKm! >= 5000
  );
  const retreadStatus = state.retreadBatches;
  const retreadCountAlerts = state.tires.filter(
    (t) => t.retreadCount >= t.retreadLimit - 1
  );
  const mileageAlerts = state.tires.filter(
    (t) => t.accumulatedKm % 5000 === 0 || t.accumulatedKm >= 30000
  );
  const treadAlerts = state.tires.filter((t) => {
    const outerOk = parseTread(t.currentTread) >= 4;
    return !outerOk;
  });

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Tire Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReportCard title="Tire Inventory" description="Tire count by status" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>In Service:</span><span>{inService.length}</span></div>
            <div className="flex justify-between"><span>In Stock:</span><span>{inStock.length}</span></div>
            <div className="flex justify-between"><span>Scrapped:</span><span>{scrapped.length}</span></div>
            <div className="flex justify-between"><span>Total:</span><span>{state.tires.length}</span></div>
          </div>
        } />
        <ReportCard title="Installed Tires" description="Tires currently in service" content={
          <div className="text-xs space-y-1">
            {inService.map((t) => (
              <div key={t.id} className="flex justify-between text-muted-foreground">
                <span className="font-mono">{t.id}</span>
                <span>{t.position}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Inspection Due" description="Tires needing inspection" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Count:</span><span>{inspectionDue.length}</span></div>
            {inspectionDue.map((t) => (
              <div key={t.id} className="flex justify-between text-muted-foreground">
                <span className="font-mono">{t.id}</span>
                <span>{formatKm(t.accumulatedKm)}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Rotation Recommended" description="Tires due for rotation" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Count:</span><span>{rotationRecommended.length}</span></div>
            {rotationRecommended.map((t) => (
              <div key={t.id} className="flex justify-between text-muted-foreground">
                <span className="font-mono">{t.id}</span>
                <span>{t.position}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Retread Status" description="Retread batches" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Batches:</span><span>{retreadStatus.length}</span></div>
            {retreadStatus.map((b) => (
              <div key={b.id} className="flex justify-between text-muted-foreground">
                <span className="font-mono">{b.id}</span>
                <span>{b.status}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Retread Count Alerts" description="Tires nearing retread limit" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Count:</span><span>{retreadCountAlerts.length}</span></div>
            {retreadCountAlerts.map((t) => (
              <div key={t.id} className="flex justify-between text-destructive">
                <span className="font-mono">{t.id}</span>
                <span>{t.retreadCount}/{t.retreadLimit}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Mileage Alerts" description="High-mileage tires" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Count:</span><span>{mileageAlerts.length}</span></div>
            {mileageAlerts.map((t) => (
              <div key={t.id} className="flex justify-between text-muted-foreground">
                <span className="font-mono">{t.id}</span>
                <span>{formatKm(t.accumulatedKm)}</span>
              </div>
            ))}
          </div>
        } />
        <ReportCard title="Tread Alerts" description="Low tread depth tires" content={
          <div className="text-xs space-y-1">
            <div className="flex justify-between"><span>Count:</span><span>{treadAlerts.length}</span></div>
            {treadAlerts.map((t) => (
              <div key={t.id} className="flex justify-between text-destructive">
                <span className="font-mono">{t.id}</span>
                <span>{t.currentTread}</span>
              </div>
            ))}
          </div>
        } />
      </div>
    </div>
  );
}

function parseTread(tread: string): number {
  const num = parseFloat(tread);
  return isNaN(num) ? 0 : num;
}

// --- Cross-Module History ---

function VehicleHistory({ state }: { state: SimulationState }) {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold text-foreground">Vehicle Maintenance History</h3>
      <div className="border border-border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {state.history.length === 0 ? (
              <tr><td colSpan={3} className="text-center text-muted-foreground py-4">No history yet.</td></tr>
            ) : (
              state.history.slice().reverse().map((h) => (
                <tr key={h.id} className="border-t">
                  <td className="text-xs text-muted-foreground">{new Date(h.timestamp).toLocaleString()}</td>
                  <td className="text-xs text-muted-foreground">{h.action}</td>
                  <td>{h.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
