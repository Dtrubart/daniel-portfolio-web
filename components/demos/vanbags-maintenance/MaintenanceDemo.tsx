"use client";

import {useReducer } from "react";

import { Button } from "@/components/ui/Button";
import {
  initialState,
  nextId,
  freeAvailable,
  findTireAt,
  isInstallEligible,
  eligibleRepairTires,
  type ActivityStatus,
  type MaintenanceRequest,
  type MaintenanceState,
  type NavView,
  type Priority,
  type PreventivePlan,
  type ServiceHistoryEvent,
  type Tire,
  type TireMovement,
  type WorkOrder,
  type WorkOrderActivity,
  type WorkOrderPartRequirement,
} from "@/data/demos/vanbags-maintenance";
import { DashboardView } from "./DashboardView";
import { DemoNavigation } from "./DemoNavigation";
import { EquipmentView } from "./EquipmentView";
import { PartsView } from "./PartsView";
import { PreventiveMaintenanceView } from "./PreventiveMaintenanceView";
import { RequestsView } from "./RequestsView";
import { ServiceHistoryView } from "./ServiceHistoryView";
import { TireManagementView } from "./TireManagementView";
import { WorkOrdersView } from "./WorkOrdersView";

export type TireActionName =
  | "install"
  | "remove"
  | "rotate"
  | "repair"
  | "toWarehouse"
  | "scrap";

export type MaintenanceAction =
  | { type: "RESET" }
  | { type: "SET_NAV"; view: NavView }
  | { type: "SELECT_EQUIPMENT"; id: string | null }
  | { type: "SELECT_WO"; id: string | null }
  | { type: "SELECT_TIRE"; id: string | null }
  | {
      type: "REPORT_REQUEST";
      equipmentId: string;
      issue: string;
      priority: Priority;
    }
  | { type: "CONVERT_TO_WO"; requestId: string }
  | {
      type: "ASSIGN_TECHNICIAN";
      woId: string;
      activityId: string;
      technicianId: string;
    }
  | {
      type: "UPDATE_ACTIVITY";
      woId: string;
      activityId: string;
      status: ActivityStatus;
    }
  | { type: "RESERVE_PART"; woId: string; partId: string }
  | { type: "ISSUE_PART"; woId: string; partId: string }
  | { type: "SET_WO_NOTES"; woId: string; notes: string }
  | { type: "COMPLETE_WO"; woId: string }
  | { type: "PM_GENERATE_WO"; planId: string }
  | {
      type: "TIRE_ACTION";
      action: TireActionName;
      tireId: string;
      targetVehicleId?: string;
      targetPositionCode?: string;
    };

export type MaintenanceDispatch = React.Dispatch<MaintenanceAction>;

const standardActivities = (issue: string): WorkOrderActivity[] => [
  { id: "A1", description: "Inspect reported issue", technicianId: null, status: "Pending" },
  { id: "A2", description: "Diagnose root cause", technicianId: null, status: "Pending" },
  { id: "A3", description: `Repair: ${issue}`, technicianId: null, status: "Pending" },
  { id: "A4", description: "Functional test", technicianId: null, status: "Pending" },
];

const defaultParts = (plan?: PreventivePlan): WorkOrderPartRequirement[] =>
  plan && plan.triggerType === "Kilometers"
    ? [{ partId: "PART-003", required: 1, reserved: 0, issued: 0 }]
    : [];

export function MaintenanceDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const viewContent = (() => {
    switch (state.navView) {
      case "dashboard":
        return <DashboardView state={state} />;
      case "equipment":
        return <EquipmentView state={state} dispatch={dispatch} />;
      case "requests":
        return <RequestsView state={state} dispatch={dispatch} />;
      case "workorders":
        return <WorkOrdersView state={state} dispatch={dispatch} />;
      case "pm":
        return <PreventiveMaintenanceView state={state} dispatch={dispatch} />;
      case "parts":
        return <PartsView state={state} dispatch={dispatch} />;
      case "history":
        return <ServiceHistoryView state={state} dispatch={dispatch} />;
      case "tires":
        return <TireManagementView state={state} dispatch={dispatch} />;
    }
  })();

  return (
    <div className="rounded-lg border border-border bg-popover">
      <div className="flex items-center justify-between border-b border-border px-5 pt-4 pb-3">
        <h2 className="text-lg font-semibold text-foreground">
          Interactive workspace — Maintenance Simulation
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset Demo
        </Button>
      </div>

      <nav aria-label="Maintenance navigation" className="border-b border-border">
        <DemoNavigation
          view={state.navView}
          onChange={(view) => dispatch({ type: "SET_NAV", view })}
        />
      </nav>

      <div className="px-5 py-5">{viewContent}</div>
    </div>
  );
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function reducer(state: MaintenanceState, action: MaintenanceAction): MaintenanceState {
  switch (action.type) {
    case "RESET":
      return { ...initialState };

    case "SET_NAV":
      return { ...state, navView: action.view };

    case "SELECT_EQUIPMENT":
      return {
        ...state,
        selectedEquipmentId: action.id,
        selectedWoId: null,
        selectedTireId: null,
      };

    case "SELECT_WO":
      return { ...state, selectedWoId: action.id, selectedTireId: null };

    case "SELECT_TIRE":
      return { ...state, selectedTireId: action.id };

    case "REPORT_REQUEST": {
      const request: MaintenanceRequest = {
        id: `REQ-${String(state.requests.length + 1).padStart(4, "0")}`,
        equipmentId: action.equipmentId,
        issue: action.issue,
        priority: action.priority,
        status: "New",
        createdAt: todayISO(),
      };
      return {
        ...state,
        requests: [...state.requests, request],
        selectedEquipmentId: action.equipmentId,
      };
    }

    case "CONVERT_TO_WO": {
      const request = state.requests.find((r) => r.id === action.requestId);
      if (!request) return state;
      const id = nextId("WO", state.woSequence);
      const equipment = state.equipment.find(
        (e) => e.id === request.equipmentId,
      );
      const wo: WorkOrder = {
        id,
        equipmentId: request.equipmentId,
        requestId: request.id,
        title: request.issue,
        priority: request.priority,
        status: "In Progress",
        location: equipment?.location ?? "",
        technicianIds: [],
        activities: standardActivities(request.issue),
        partRequirements: [
          { partId: "PART-001", required: 1, reserved: 0, issued: 0 },
          { partId: "PART-003", required: 1, reserved: 0, issued: 0 },
        ],
        downtime: null,
        completionNotes: "",
      };
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === request.id ? { ...r, status: "Converted" } : r,
        ),
        workOrders: [...state.workOrders, wo],
        woSequence: state.woSequence + 1,
        selectedWoId: wo.id,
        selectedEquipmentId: request.equipmentId,
      };
    }

    case "ASSIGN_TECHNICIAN":
      return {
        ...state,
        workOrders: state.workOrders.map((wo) =>
          wo.id === action.woId
            ? {
                ...wo,
                technicianIds: wo.technicianIds.includes(action.technicianId)
                  ? wo.technicianIds
                  : [...wo.technicianIds, action.technicianId],
                activities: wo.activities.map((a) =>
                  a.id === action.activityId
                    ? { ...a, technicianId: action.technicianId }
                    : a,
                ),
              }
            : wo,
        ),
      };

    case "UPDATE_ACTIVITY":
      return {
        ...state,
        workOrders: state.workOrders.map((wo) =>
          wo.id === action.woId
            ? {
                ...wo,
                activities: wo.activities.map((a) =>
                  a.id === action.activityId
                    ? { ...a, status: action.status }
                    : a,
                ),
              }
            : wo,
        ),
      };

    case "RESERVE_PART": {
      const wo = state.workOrders.find((w) => w.id === action.woId);
      if (!wo) return state;
      const requirement = wo.partRequirements.find(
        (r) => r.partId === action.partId,
      );
      if (!requirement) return state;
      const available = freeAvailable(action.partId, state);
      const reserveTo = Math.min(requirement.required, available);
      if (reserveTo <= requirement.reserved) return state;
      return {
        ...state,
        workOrders: state.workOrders.map((w) =>
          w.id === action.woId
            ? {
                ...w,
                partRequirements: w.partRequirements.map((r) =>
                  r.partId === action.partId
                    ? { ...r, reserved: reserveTo }
                    : r,
                ),
              }
            : w,
        ),
      };
    }

    case "ISSUE_PART": {
      const wo = state.workOrders.find((w) => w.id === action.woId);
      if (!wo) return state;
      const requirement = wo.partRequirements.find(
        (r) => r.partId === action.partId,
      );
      if (!requirement || requirement.issued >= requirement.reserved) {
        return state;
      }
      return {
        ...state,
        parts: state.parts.map((p) =>
          p.id === action.partId ? { ...p, available: p.available - 1 } : p,
        ),
        workOrders: state.workOrders.map((w) =>
          w.id === action.woId
            ? {
                ...w,
                partRequirements: w.partRequirements.map((r) =>
                  r.partId === action.partId
                    ? {
                        ...r,
                        reserved: r.reserved - 1,
                        issued: r.issued + 1,
                      }
                    : r,
                ),
              }
            : w,
        ),
      };
    }

    case "SET_WO_NOTES":
      return {
        ...state,
        workOrders: state.workOrders.map((wo) =>
          wo.id === action.woId ? { ...wo, completionNotes: action.notes } : wo,
        ),
      };

    case "COMPLETE_WO": {
      const wo = state.workOrders.find((w) => w.id === action.woId);
      if (!wo) return state;
      const historyId = nextId("HIST", state.historySequence);
      const event: ServiceHistoryEvent = {
        id: historyId,
        equipmentId: wo.equipmentId,
        date: todayISO(),
        type: "Work Order Completion",
        summary: `${wo.title} (${wo.id})`,
        workOrderId: wo.id,
      };
      return {
        ...state,
        workOrders: state.workOrders.map((w) =>
          w.id === wo.id ? { ...w, status: "Completed" } : w,
        ),
        serviceHistory: [...state.serviceHistory, event],
        historySequence: state.historySequence + 1,
      };
    }

    case "PM_GENERATE_WO": {
      const plan = state.pmPlans.find((p) => p.id === action.planId);
      if (!plan || plan.status !== "Due") return state;
      const id = nextId("WO", state.woSequence);
      const equipment = state.equipment.find((e) => e.id === plan.equipmentId);
      const wo: WorkOrder = {
        id,
        equipmentId: plan.equipmentId,
        requestId: null,
        title: `PM: ${plan.title}`,
        priority: "Medium",
        status: "In Progress",
        location: equipment?.location ?? "",
        technicianIds: [],
        activities: [
          { id: "A1", description: "Perform scheduled PM", technicianId: null, status: "Pending" },
          { id: "A2", description: "Inspect per plan", technicianId: null, status: "Pending" },
        ],
        partRequirements: defaultParts(plan),
        downtime: null,
        completionNotes: "",
      };
      return {
        ...state,
        workOrders: [...state.workOrders, wo],
        pmPlans: state.pmPlans.map((p) =>
          p.id === plan.id
            ? {
                ...p,
                lastDone: p.nextDue,
                nextDue: bumpDue(p),
                nextDueReading:
                  p.triggerType === "Kilometers"
                    ? p.nextDueReading + p.interval
                    : p.nextDueReading,
                status: "Scheduled",
              }
            : p,
        ),
        woSequence: state.woSequence + 1,
        selectedWoId: wo.id,
      };
    }

    case "TIRE_ACTION":
      return applyTireAction(state, action);

    default:
      return state;
  }
}

function bumpDue(plan: PreventivePlan): string {
  if (plan.triggerType === "Calendar") {
    const from = new Date(plan.nextDue);
    from.setMonth(from.getMonth() + plan.interval);
    return from.toISOString().slice(0, 10);
  }
  return plan.nextDue;
}

function applyTireAction(
  state: MaintenanceState,
  action: Extract<MaintenanceAction, { type: "TIRE_ACTION" }>,
): MaintenanceState {
  const tire = state.tires.find((t) => t.id === action.tireId);
  if (!tire) return state;
  const now = todayISO();
  const seq = nextId("MOV", state.movementSequence);

  if (action.action === "install") {
    if (!isInstallEligible(tire)) return state;
    if (!action.targetVehicleId || !action.targetPositionCode) return state;
    const layout = state.vehicleLayouts[action.targetVehicleId];
    if (!layout) return state;
    if (findTireAt(state.tires, action.targetVehicleId, action.targetPositionCode))
      return state;
    const from = tire.positionCode
      ? `${tire.vehicleId} / ${tire.positionCode}`
      : tire.status === "Removed"
        ? "Removed"
        : "Warehouse";
    const equipment = state.equipment.find((e) => e.id === action.targetVehicleId);
    const updated: Tire = {
      ...tire,
      status: "In Service",
      vehicleId: action.targetVehicleId,
      positionCode: action.targetPositionCode,
      odometer: equipment?.odometer ?? tire.odometer,
    };
    const movement: TireMovement = {
      id: seq,
      tireId: tire.id,
      from,
      to: `${action.targetVehicleId} / ${action.targetPositionCode}`,
      date: now,
    };
    return {
      ...state,
      tires: state.tires.map((t) => (t.id === tire.id ? updated : t)),
      tireMovements: [...state.tireMovements, movement],
      movementSequence: state.movementSequence + 1,
      selectedTireId: tire.id,
    };
  }

  if (action.action === "remove") {
    if (tire.status !== "In Service") return state;
    const from = tire.vehicleId
      ? `${tire.vehicleId} / ${tire.positionCode}`
      : "Unknown";
    const updated: Tire = {
      ...tire,
      status: "Removed",
      vehicleId: null,
      positionCode: null,
    };
    const movement: TireMovement = {
      id: seq,
      tireId: tire.id,
      from,
      to: "Removed",
      date: now,
    };
    return {
      ...state,
      tires: state.tires.map((t) => (t.id === tire.id ? updated : t)),
      tireMovements: [...state.tireMovements, movement],
      movementSequence: state.movementSequence + 1,
      selectedTireId: tire.id,
    };
  }

  if (action.action === "rotate") {
    if (tire.status !== "In Service") return state;
    if (
      !action.targetVehicleId ||
      !action.targetPositionCode ||
      tire.vehicleId !== action.targetVehicleId ||
      tire.positionCode === action.targetPositionCode
    )
      return state;
    if (findTireAt(state.tires, action.targetVehicleId, action.targetPositionCode))
      return state;
    const from = `${tire.vehicleId} / ${tire.positionCode}`;
    const updated: Tire = { ...tire, positionCode: action.targetPositionCode };
    const movement: TireMovement = {
      id: seq,
      tireId: tire.id,
      from,
      to: `${action.targetVehicleId} / ${action.targetPositionCode}`,
      date: now,
    };
    return {
      ...state,
      tires: state.tires.map((t) => (t.id === tire.id ? updated : t)),
      tireMovements: [...state.tireMovements, movement],
      movementSequence: state.movementSequence + 1,
      selectedTireId: tire.id,
    };
  }

  if (action.action === "repair") {
    if (!eligibleRepairTires([tire]).length) return state;
    const from =
      tire.status === "In Service" && tire.vehicleId
        ? `${tire.vehicleId} / ${tire.positionCode}`
        : "Warehouse";
    const updated: Tire = {
      ...tire,
      status: "Repair",
      vehicleId: null,
      positionCode: null,
    };
    const movement: TireMovement = {
      id: seq,
      tireId: tire.id,
      from,
      to: "Repair",
      date: now,
    };
    return {
      ...state,
      tires: state.tires.map((t) => (t.id === tire.id ? updated : t)),
      tireMovements: [...state.tireMovements, movement],
      movementSequence: state.movementSequence + 1,
      selectedTireId: tire.id,
    };
  }

  if (action.action === "toWarehouse") {
    if (tire.status !== "Repair") return state;
    const updated: Tire = { ...tire, status: "Warehouse", vehicleId: null, positionCode: null };
    const movement: TireMovement = {
      id: seq,
      tireId: tire.id,
      from: "Repair",
      to: "Warehouse",
      date: now,
    };
    return {
      ...state,
      tires: state.tires.map((t) => (t.id === tire.id ? updated : t)),
      tireMovements: [...state.tireMovements, movement],
      movementSequence: state.movementSequence + 1,
      selectedTireId: tire.id,
    };
  }

    if (action.action === "scrap") {
      if (tire.status === "In Service" || tire.status === "Scrapped") return state;
      const from =
        tire.status === "Repair"
          ? "Repair"
          : tire.status === "Removed"
            ? "Removed"
            : "Warehouse";
    const updated: Tire = { ...tire, status: "Scrapped", vehicleId: null, positionCode: null };
    const movement: TireMovement = {
      id: seq,
      tireId: tire.id,
      from,
      to: "Scrap",
      date: now,
    };
    return {
      ...state,
      tires: state.tires.map((t) => (t.id === tire.id ? updated : t)),
      tireMovements: [...state.tireMovements, movement],
      movementSequence: state.movementSequence + 1,
      selectedTireId: tire.id,
    };
  }

  return state;
}
