// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { BacklogItem, ComponentCounter, MaintenanceAlert, MaintenancePlanEntry, MaintenanceTemplateDef, RetreadBatch, TireAlert, TireInspectionRecord, GuidedActivity, GuidedPartLine, GuidedTire, GuidedTirePosition, GuidedVehicle, GuidedWorkOrder } from "@/data/demos/vanbags-maintenance-guided";
export type WOStatus = "Scheduled" | "Open" | "In Progress" | "Pending Approval" | "Closed";
export type Priority = "Low" | "Medium" | "High";
export type TireAction = "install" | "remove" | "rotate" | "scrapped" | "retread-sent" | "retread-returned";
export interface ActivityTimeline extends GuidedActivity {
  startTime: string | null;
  endTime: string | null;
  comment: string | null;
  backlogReason: string | null;
  originalWoId: string | null;
}
export interface WorkOrderExt extends Omit<GuidedWorkOrder, "activities"> {
  activities: ActivityTimeline[];
  partRequirements: GuidedPartLine[];
  status: WOStatus;
  priority: Priority;
  generatedFrom: "Immediate" | "Preventive Maintenance" | "Follow-Up";
  closedAt: string | null;
}
export interface PartCatalogEntry {
  id: string; description: string; unit: string;
  available: number; reserved: number; location: string;
}
export interface TireMovement {
  id: string; tireId: string; vehicleId: string;
  fromPosition: string | null; toPosition: string | null;
  startOdometer: number; endOdometer: number | null;
  action: TireAction; timestamp: string;
}
export interface SimulationEvent {
  id: string; timestamp: string; stepId: string | null;
  action: string; description: string;
}
export interface SimulationFlags {
  equipmentRegistered: boolean;
  templatesConfigured: boolean;
  planAssigned: boolean;
  tiresInstalled: boolean;
  pmTriggered: boolean;
  workOrderGenerated: boolean;
  followUpCreated: boolean;
}
export interface SimulationState {
  currentStep: number;
  vehicle: GuidedVehicle;
  odometer: number;
  flags: SimulationFlags;
  maintenanceTemplates: MaintenanceTemplateDef[];
  maintenancePlan: MaintenancePlanEntry[];
  workOrders: WorkOrderExt[];
  partsCatalog: PartCatalogEntry[];
  backlog: BacklogItem[];
  tires: GuidedTire[];
  tirePositions: GuidedTirePosition[];
  tireInspections: TireInspectionRecord[];
  tireMovements: TireMovement[];
  retreadBatches: RetreadBatch[];
  componentCounters: ComponentCounter[];
  alerts: MaintenanceAlert[];
  tireAlerts: TireAlert[];
  history: SimulationEvent[];
}
export type SimulationAction =
  | { type: "SET_STEP"; payload: { step: number } }
  | { type: "RESET_DEMO" }
  | { type: "CREATE_EQUIPMENT" }
  | { type: "SAVE_TEMPLATES" }
  | { type: "ASSIGN_PM_PLAN" }
   | { type: "INSTALL_TIRE_SET" }
   | { type: "INSTALL_TIRE"; payload: { tireId: string; positionCode: string } }
   | { type: "ADVANCE_ODOMETER"; payload: { deltaKm: number } }
  | { type: "CREATE_TIRE_INSPECTION"; payload: { tireId: string; position: string; outerTread: number; centerTread: number; innerTread: number; pressure: string } }
  | { type: "ROTATE_TIRE"; payload: { fromPosition: string; toPosition: string } }
  | { type: "GENERATE_PM_WORK_ORDER" }
  | { type: "START_WORK_ORDER"; payload: { woId: string } }
  | { type: "ASSIGN_TECHNICIAN"; payload: { woId: string; activityId: string; tech: string } }
  | { type: "START_ACTIVITY"; payload: { woId: string; activityId: string } }
  | { type: "COMPLETE_ACTIVITY"; payload: { woId: string; activityId: string } }
  | { type: "RESERVE_PART"; payload: { woId: string; partId: string } }
  | { type: "ISSUE_PART"; payload: { woId: string; partId: string } }
  | { type: "SEND_ACTIVITY_TO_BACKLOG"; payload: { woId: string; activityId: string; reason: string; priority: string } }
  | { type: "CREATE_FOLLOWUP_WO"; payload: { backlogId: string } }
  | { type: "CLOSE_WORK_ORDER"; payload: { woId: string } }
  | { type: "CREATE_RETREAD_BATCH"; payload: { tireId: string } }
  | { type: "SEND_RETREAD_BATCH"; payload: { batchId: string } }
  | { type: "RETURN_RETREAD_BATCH"; payload: { batchId: string } }
  | { type: "SCRAP_TIRE"; payload: { tireId: string } };

import { useReducer } from "react";
import {
  guidedVehicle, maintenanceTemplateDefs, maintenancePlanEntries,
  guidedTireSet, guidedTireLayout, componentCounters,
} from "@/data/demos/vanbags-maintenance-guided";

export const partsCatalog: PartCatalogEntry[] = [
  { id: "PART-001", description: "Engine Oil", unit: "L", available: 8, reserved: 0, location: "WH-A" },
  { id: "PART-003", description: "Coolant", unit: "L", available: 12, reserved: 0, location: "WH-A" },
  { id: "PART-004", description: "Transmission Fluid", unit: "L", available: 5, reserved: 0, location: "WH-A" },
  { id: "PART-005", description: "Containment Ring", unit: "each", available: 1, reserved: 0, location: "WH-B" },
];

export const technicians: string[] = ["Alex Morgan", "Jordan Lee", "Sam Patel"];

function now(): string { return new Date().toISOString(); }
function genId(prefix: string): string {
  return prefix + String(Date.now()).slice(-8);
}

export function initialSimulationState(): SimulationState {
  return {
    currentStep: 0,
    vehicle: Object.assign({}, guidedVehicle),
    odometer: 0,
    flags: {
      equipmentRegistered: false,
      templatesConfigured: false,
      planAssigned: false,
      tiresInstalled: false,
      pmTriggered: false,
      workOrderGenerated: false,
      followUpCreated: false,
    },
    maintenanceTemplates: maintenanceTemplateDefs.map(function(t) { return Object.assign({}, t); }),
    maintenancePlan: maintenancePlanEntries.map(function(e) { return Object.assign({}, e); }),
    workOrders: [],
    partsCatalog: partsCatalog.map(function(p) { return Object.assign({}, p); }),
    backlog: [],
    tires: guidedTireSet.map(function(t) { return Object.assign({}, t); }),
    tirePositions: guidedTireLayout.map(function(p) { return Object.assign({}, p); }),
    tireInspections: [],
    tireMovements: [],
    retreadBatches: [],
    componentCounters: componentCounters.map(function(c) { return Object.assign({}, c); }),
    alerts: [],
    tireAlerts: [],
    history: [],
  };
}

export function simulationReducer(state: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case "SET_STEP":
      return Object.assign({}, state, { currentStep: action.payload.step });
    case "RESET_DEMO":
      return initialSimulationState();
    case "CREATE_EQUIPMENT":
      return Object.assign({}, state, {
        flags: Object.assign({}, state.flags, { equipmentRegistered: true }),
        history: state.history.concat([{
          id: genId("EVT-"), timestamp: now(),
          stepId: null, action: "CREATE_EQUIPMENT",
          description: "Equipment registered.",
        }]),
      });
    case "SAVE_TEMPLATES":
      if (state.flags.templatesConfigured) return state;
      return Object.assign({}, state, {
        flags: Object.assign({}, state.flags, { templatesConfigured: true }),
        history: state.history.concat([{
          id: genId("EVT-"), timestamp: now(),
          stepId: null, action: "SAVE_TEMPLATES",

          description: "Templates saved.",

        }]),
      });

    case "ASSIGN_PM_PLAN": {
      if (state.flags.planAssigned) return state;
      return Object.assign({}, state, {
        flags: Object.assign({}, state.flags, { planAssigned: true }),
        history: state.history.concat([{
          id: genId("EVT-"), timestamp: now(),
          stepId: null, action: "ASSIGN_PM_PLAN",
          description: "PM plan assigned to TRK-DEMO-017.",
        }]),
      });
    }
    case "INSTALL_TIRE_SET": {
      if (state.flags.tiresInstalled) return state;
      const movements = [];
      const positions = state.tirePositions.map(function(p) { return Object.assign({}, p); });
      const tires = state.tires.map(function(t) {
        if (t.status === "Warehouse") {
          const posIdx = positions.findIndex(function(p) { return p.tireId === null; });
          if (posIdx >= 0) {
            const pos = positions[posIdx];
            movements.push({
              id: genId("MOV-"), tireId: t.id, vehicleId: state.vehicle.id,
              fromPosition: null, toPosition: pos.code,
              startOdometer: state.odometer, endOdometer: null,
              action: "install", timestamp: now(),
            });
            positions[posIdx] = Object.assign({}, pos, { tireId: t.id });
            return Object.assign({}, t, {
              status: "In Service",
              vehicleId: state.vehicle.id,
              position: pos.code,
              installedAtKm: state.odometer,
            });
          }
        }
        return t;
      });
      return Object.assign({}, state, {
        flags: Object.assign({}, state.flags, { tiresInstalled: true }),
        tires: tires,
        tirePositions: positions,
        tireMovements: state.tireMovements.concat(movements),
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "INSTALL_TIRE_SET"
,
          description: "Initial tire set installed on " + state.vehicle.id + ".",
        }]),
      });
    }
    case "INSTALL_TIRE": {
      const itTire = state.tires.find(function(t) { return t.id === action.payload.tireId; });
      if (!itTire) return state;
      if (itTire.status !== "In Stock" && itTire.status !== "Warehouse") return state;
      const itPos = state.tirePositions.find(function(p) { return p.code === action.payload.positionCode; });
      if (!itPos || itPos.tireId !== null) return state;
      const itMovements = [{
        id: genId("MOV-"), tireId: itTire.id, vehicleId: state.vehicle.id,
        fromPosition: itTire.status === "Warehouse" ? null : "In Stock",
        toPosition: action.payload.positionCode,
        startOdometer: state.odometer, endOdometer: null,
        action: "install", timestamp: now(),
      }];
      const itNewTires = state.tires.map(function(t) {
        if (t.id === itTire.id) {
          return Object.assign({}, t, {
            status: "In Service", vehicleId: state.vehicle.id,
            position: action.payload.positionCode,
            installedAtKm: state.odometer,
          });
        }
        return t;
      });
      const itNewPositions = state.tirePositions.map(function(p) {
        if (p.code === action.payload.positionCode) {
          return Object.assign({}, p, { tireId: action.payload.tireId });
        }
        return p;
      });
      return Object.assign({}, state, {
        tires: itNewTires,
        tirePositions: itNewPositions,
        tireMovements: state.tireMovements.concat(itMovements),
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "INSTALL_TIRE"
,
          description: "Tire " + itTire.id + " installed at " + action.payload.positionCode + ".",
        }]),
     });
    }
    case "ADVANCE_ODOMETER": {
      const delta = action.payload.deltaKm;
      const newOdo = state.odometer + delta;
      const newTires = state.tires.map(function(t) {
        if (t.status === "In Service" && t.position) {
          return Object.assign({}, t, { accumulatedKm: t.accumulatedKm + delta });
        }
        return t;
      });
      const newAlerts: MaintenanceAlert[] = [];
      state.maintenancePlan.forEach(function(entry) {
        const remaining = entry.reading - newOdo;
        let aStatus = "Scheduled";
        if (newOdo >= entry.reading) aStatus = "Due";
        else if (remaining <= 500) aStatus = "Due Soon";
        else if (remaining <= 1000) aStatus = "Due Soon";
        if (aStatus != "Scheduled") {
          newAlerts.push({
            id: "ALERT-" + entry.templateId + "-" + entry.reading,
            equipmentId: state.vehicle.id,
            currentReading: newOdo, dueReading: entry.reading,
            remaining: remaining, maintenanceName: entry.templateId,
            status: aStatus,
          });
        }
      });
      const newCounters = state.componentCounters.map(function(c) {
        if (c.unit === "km") {
          const cr = c.threshold - newOdo;
          let cs = "Normal";
          if (newOdo >= c.threshold) cs = "Overdue";
          else if (cr < 1000) cs = "Due Soon";
          return Object.assign({}, c, { status: cs, current: newOdo });
        }
        return c;
      });
      return Object.assign({}, state, {
        odometer: newOdo,
        vehicle: Object.assign({}, state.vehicle, { currentOdometer: newOdo }),
        tires: newTires, alerts: newAlerts,
        componentCounters: newCounters,
        history: state.history.concat([{
          id: genId("EVT-"), timestamp: now(),
          stepId: null, action: "ADVANCE_ODOMETER",
          description: "Odometer advanced to " + newOdo + " km."
        }]),
      });
    }
    case "CREATE_TIRE_INSPECTION": {
      const inp = action.payload;
      const insp = {
        id: genId("INSP-"), vehicleId: state.vehicle.id,
        date: now().slice(0,10), odometer: state.odometer,
        tireId: inp.tireId, position: inp.position,
        treadOuter: inp.outerTread, treadCenter: inp.centerTread,
        treadInner: inp.innerTread, pressure: inp.pressure,
        condition: "Recorded", status: "Normal", suggestedAction: null,
      };
      if (inp.outerTread < 8 || inp.outerTread < inp.centerTread || inp.innerTread < inp.outerTread) {
        insp.status = "Abnormal" ; insp.suggestedAction = "Rotation recommended";
      }
      return Object.assign({}, state, {
        tireInspections: state.tireInspections.concat([insp]),
        history: state.history.concat([{
          id: genId("EVT-"), timestamp: now(),
          stepId: null, action: "CREATE_TIRE_INSPECTION",
          description: "Inspection recorded for " + inp.tireId + "."
        }]),
      });
    }
    case "ROTATE_TIRE": {
      const fromPos = action.payload.fromPosition;
      const toPos = action.payload.toPosition;
      const newPositions = state.tirePositions.map(function(p) {
        if (p.code === fromPos || p.code === toPos) {
          const tire = state.tires.find(function(t) { return t.position === p.code; });
          return Object.assign({}, p, { tireId: tire ? tire.id : null });
        }
        return p;
      });
      const newTires = state.tires.map(function(t) {
        if (t.position === fromPos && t.status === "In Service"
) {
          return Object.assign({}, t, {
            position: toPos,
            installedAtKm: state.odometer,
            accumulatedKm: t.accumulatedKm,
          });
        }
        if (t.position === toPos && t.status === "In Service"
) {
          return Object.assign({}, t, {
            position: fromPos,
            installedAtKm: state.odometer,
            accumulatedKm: t.accumulatedKm,
          });
        }
        return t;
      });
      return Object.assign({}, state, {
        tires: newTires,
        tirePositions: newPositions,
        history: state.history.concat([{
          id: genId("EVT-"
), timestamp: now(),
          stepId: null, action: "ROTATE_TIRE"
,
          description: "Rotated from " + fromPos + " to " + toPos + "."
,

        }]),
      });
    }    case "GENERATE_PM_WORK_ORDER": {
      if (state.flags.workOrderGenerated) return state;
      const dueAlert = state.alerts.find(function(a) { return a.status === "Due"; });
      if (!dueAlert) return state;
      const tmpl = state.maintenanceTemplates.find(function(t) { return t.id === dueAlert.maintenanceName; });
      if (!tmpl) return state;
      const newId = genId("WO-PM-"
);
      const partReqs = tmpl.standardParts.map(function(p) {
        const cat = state.partsCatalog.find(function(c) { return c.id === p.id; });
        return {
          partId: p.id, description: p.description,
          required: 1, available: cat ? cat.available : 0,
          reserved: 0, issued: 0, status: "Available"
,
        };
      });
      const activities = tmpl.activities.map(function(a) {
        return { id: genId("A-"
), description: a, technician: null,
          status: "Pending"
, startTime: null, endTime: null,
          comment: null, backlogReason: null, originalWoId: null };
      });
      const newWo = {
        id: newId, source: "Preventive Maintenance"
,
        equipmentId: state.vehicle.id, vehicleId: state.vehicle.id,
        vehicleOdometer: state.odometer, maintenanceType: tmpl.code,
        bay: "Bay 03"
, supervisor: "Dana Reeves"
,
        startDate: null, endDate: null,
        activities: activities, partRequirements: partReqs,
        notes: ""
, status: "Scheduled"
,
        priority: "Medium"
, generatedFrom: "Preventive Maintenance"
,
        closedAt: null,
      };
      return Object.assign({}, state, {
        workOrders: state.workOrders.concat([newWo]),
        flags: Object.assign({}, state.flags, { workOrderGenerated: true }),
        history: state.history.concat([{
          id: genId("EVT-"
), timestamp: now(),
          stepId: null, action: "GENERATE_PM_WORK_ORDER"
,
          description: "WO " + newId + " generated from PM plan."
,

        }]),
      });
    }
    case "START_WORK_ORDER": {
      const woList = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          return Object.assign({}, w, {
            status: "In Progress"
, startDate: now().slice(0,10),
          });
        }
        return w;
      });
      return Object.assign({}, state, {
        workOrders: woList,
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "START_WORK_ORDER"
,
          description: "Work order " + action.payload.woId + " started.",
        }]),
      });
    }
    case "ASSIGN_TECHNICIAN": {
      const woList2 = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          const acts = w.activities.map(function(a) {
            if (a.id === action.payload.activityId) {
              return Object.assign({}, a, { technician: action.payload.tech });
            }
            return a;
          });
          return Object.assign({}, w, { activities: acts });
        }
        return w;
      });
      return Object.assign({}, state, {
        workOrders: woList2,
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "ASSIGN_TECHNICIAN"
,
          description: "Technician " + action.payload.tech + " assigned to " + action.payload.woId + ".",
        }]),
      });
    }
    case "START_ACTIVITY": {
      const woList3 = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          const acts = w.activities.map(function(a) {
            if (a.id === action.payload.activityId) {
              return Object.assign({}, a, {
                status: "In Progress"
, startTime: now(),
              });
            }
            return a;
          });
          return Object.assign({}, w, { activities: acts });
        }
        return w;
      });
      return Object.assign({}, state, {
        workOrders: woList3,
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "START_ACTIVITY"
,
          description: "Activity " + action.payload.activityId + " started on " + action.payload.woId + ".",
        }]),
      });
    }
    case "COMPLETE_ACTIVITY": {
      const woList4 = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          const acts = w.activities.map(function(a) {
            if (a.id === action.payload.activityId) {
              return Object.assign({}, a, {
                status: "Completed"
, endTime: now(),
              });
            }
            return a;
          });
          return Object.assign({}, w, { activities: acts });
        }
        return w;
      });
      return Object.assign({}, state, {
        workOrders: woList4,
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "COMPLETE_ACTIVITY"
,
          description: "Activity " + action.payload.activityId + " completed.",
        }]),
      });
    }
    case "RESERVE_PART": {
      const catIdx = state.partsCatalog.findIndex(function(p) { return p.id === action.payload.partId; });
      if (catIdx < 0) return state;
      const part = state.partsCatalog[catIdx];
      if (part.reserved + 1 > part.available) return state;
      const newCatalog = state.partsCatalog.slice();
      newCatalog[catIdx] = Object.assign({}, part, { reserved: part.reserved + 1 });
      const newWO = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          const parts = w.partRequirements.map(function(p) {
            if (p.partId === action.payload.partId) {
              const st = p.available - p.reserved > 0 ? "Reserved" : "Shortage";
              return Object.assign({}, p, { reserved: p.reserved + 1, status: st });
            }
            return p;
          });
          return Object.assign({}, w, { partRequirements: parts });
        }
        return w;
      });
      return Object.assign({}, state, {
        partsCatalog: newCatalog, workOrders: newWO,
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "RESERVE_PART"
,
          description: "Reserved 1 " + part.description + " for " + action.payload.woId + ".",
        }]),
      });
    }
    case "ISSUE_PART": {
      const catIdx2 = state.partsCatalog.findIndex(function(p) { return p.id === action.payload.partId; });
      if (catIdx2 < 0) return state;
      const part2 = state.partsCatalog[catIdx2];
      if (part2.reserved < 1) return state;
      const newCatalog2 = state.partsCatalog.slice();
      newCatalog2[catIdx2] = Object.assign({}, part2, { reserved: part2.reserved - 1 });
      const newWO2 = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          const parts = w.partRequirements.map(function(p) {
            if (p.partId === action.payload.partId) {
              return Object.assign({}, p, { issued: p.issued + 1, status: "Issued" });
            }
            return p;
          });
          return Object.assign({}, w, { partRequirements: parts });
        }
        return w;
      });
      return Object.assign({}, state, {
        partsCatalog: newCatalog2, workOrders: newWO2,
        history: state.history.concat([{
          id: genId("EVT-")
, timestamp: now(),
          stepId: null, action: "ISSUE_PART"
,
          description: "Issued 1 " + part2.description + " to " + action.payload.woId + ".",
        }]),
      });
    }
    case "SEND_ACTIVITY_TO_BACKLOG": {
      const bWoList = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          const acts = w.activities.map(function(a) {
            if (a.id === action.payload.activityId) {
              return Object.assign({}, a, { status: "Backlog", backlogReason: action.payload.reason });
            }
            return a;
          });
          return Object.assign({}, w, { activities: acts });
        }
        return w;
      });
      const origWo = state.workOrders.find(function(w) { return w.id === action.payload.woId; });
      const origAct = origWo ? origWo.activities.find(function(a) { return a.id === action.payload.activityId; }) : null;
      const partLine = origWo && origWo.partRequirements && origWo.partRequirements.length > 0 ? origWo.partRequirements[0] : null;
      const newBacklog = {
        id: genId("BACKLOG-"), equipmentId: state.vehicle.id,
        originalWoId: action.payload.woId, activityId: action.payload.activityId,
        activityDescription: origAct ? origAct.description : "Activity",
        reason: action.payload.reason,
        priority: action.payload.priority,
        requiredPart: partLine ? { partId: partLine.partId, description: partLine.description, required: partLine.required } : null,
        createdDate: now().slice(0,10), status: "Open",
      };
      return Object.assign({}, state, {
        workOrders: bWoList,
        backlog: state.backlog.concat([newBacklog]),
        history: state.history.concat([{
          id: genId("EVT-"
), timestamp: now(),
          stepId: null, action: "SEND_ACTIVITY_TO_BACKLOG"
,
          description: "Activity sent to backlog."
,

        }]),
      });
    }
    case "CREATE_FOLLOWUP_WO"
: {
      const bItem = state.backlog.find(function(b) { return b.id === action.payload.backlogId; });
      if (!bItem) return state;
      const fWoId = genId("WO-FU-"
);
      const fWo = {
        id: fWoId, source: "Immediate"
,
        equipmentId: bItem.equipmentId, vehicleId: state.vehicle.id,
        vehicleOdometer: state.odometer, maintenanceType: "Follow-Up"
,
        bay: "Bay 03"
, supervisor: "Dana Reeves"
,
        startDate: null, endDate: null,
        activities: [{
          id: genId("A-"
), description: bItem.activityDescription,
          technician: null, status: "Pending"
,
          startTime: null, endTime: null,
          comment: null, backlogReason: bItem.reason,

          originalWoId: bItem.originalWoId,
        }],
        partRequirements: bItem.requiredPart ? [{
          partId: bItem.requiredPart.partId,
          description: bItem.requiredPart.description,
          required: bItem.requiredPart.required, available: 0, reserved: 0, issued: 0, status: "Shortage"
,
        }] : [],
        notes: "Follow-up from backlog " + bItem.id,
        status: "Scheduled"
,
        priority: bItem.priority,
        generatedFrom: "Follow-Up"
, closedAt: null,
      };
      return Object.assign({}, state, {
        workOrders: state.workOrders.concat([fWo]),
        flags: Object.assign({}, state.flags, { followUpCreated: true }),
        history: state.history.concat([{
          id: genId("EVT-"
), timestamp: now(),
          stepId: null, action: "CREATE_FOLLOWUP_WO"
,
          description: "Follow-up WO created from backlog."
,

        }]),
      });
    }
    case "CLOSE_WORK_ORDER"
: {
      const coWo = state.workOrders.find(function(w) { return w.id === action.payload.woId; });
      if (!coWo) return state;
      const allDone = coWo.activities.every(function(a) {
        return a.status === "Completed" || a.status === "Backlog";
      });
      const allPartsIssued = coWo.partRequirements.every(function(p) {
        return p.issued >= p.required || p.status === "Shortage";
      });
      if (!allDone || !allPartsIssued) return state;
      const newCoWoList = state.workOrders.map(function(w) {
        if (w.id === action.payload.woId) {
          return Object.assign({}, w, { status: "Closed", endDate: now().slice(0,10), closedAt: now() });
        }
        return w;
      });
      return Object.assign({}, state, {
        workOrders: newCoWoList,
        history: state.history.concat([{
          id: genId("EVT-"
), timestamp: now(),
          stepId: null, action: "CLOSE_WORK_ORDER"
,
          description: "Work order " + action.payload.woId + " closed."
,

        }]),
      });
    }
    case "CREATE_RETREAD_BATCH": {
      const rbId = genId("RB-"
);
      const rbTire = state.tires.find(function(t) { return t.id === action.payload.tireId; });
      if (!rbTire) return state;
      if (rbTire.retreadCount >= rbTire.retreadLimit) {
        return Object.assign({}, state, {
          tireAlerts: state.tireAlerts.concat([{
            id: genId("ALERT-TIRE-"
), tireId: action.payload.tireId,
            type: "Retread Limit"
,
            message: "Max retreads reached for " + action.payload.tireId,
            status: "OVERDUE"
,
          }]),
          history: state.history.concat([{
            id: genId("EVT-"
), timestamp: now(),
            stepId: null, action: "RETREAD_LIMIT"
,
            description: "Retread limit reached for " + action.payload.tireId + "."
,

          }]),
        });
      }
      const rbBatch = {
        id: rbId, vendor: "Pacific Retread Ltd.",

        sendDate: now().slice(0,10), expectedReturn: "",

        actualReturn: null, status: "Queued",

        invoiceReference: null,
        lines: [{ tireId: action.payload.tireId, outgoingTread: "3 mm", returnedTread: "", result: "", retreadCount: ""}],
      };
      const rbNewTires = state.tires.map(function(t) {
        if (t.id === action.payload.tireId) {
          return Object.assign({}, t, { status: "In Stock", position: null, vehicleId: null });
        }
        return t;
      });
      const rbNewPositions = state.tirePositions.map(function(p) {
        if (p.tireId === action.payload.tireId) {
          return Object.assign({}, p, { tireId: null });
        }
        return p;
      });
      return Object.assign({}, state, {
        retreadBatches: state.retreadBatches.concat([rbBatch]),
        tires: rbNewTires,
        tirePositions: rbNewPositions,
        history: state.history.concat([{
          id: genId("EVT-"
), timestamp: now(),
          stepId: null, action: "CREATE_RETREAD_BATCH"
,
          description: "Retread batch " + rbId + " created."
,

        }]),
      });
    }
    case "SEND_RETREAD_BATCH": {
      const sbtBatch = state.retreadBatches.find(function(b) { return b.id === action.payload.batchId; });
      if (!sbtBatch) return state;
      const sbtNewRB = state.retreadBatches.map(function(b) {
        if (b.id === action.payload.batchId) {
          return Object.assign({}, b, { status: "In Transit" });
        }
        return b;
      });
      return Object.assign({}, state, {
        retreadBatches: sbtNewRB,
        history: state.history.concat([{
          id: genId("EVT-"
), timestamp: now(),
          stepId: null, action: "SEND_RETREAD_BATCH"
,
          description: "Retread batch sent for processing.",

        }]),
      });
    }
    case "RETURN_RETREAD_BATCH": {
      const rtbBatch = state.retreadBatches.find(function(b) { return b.id === action.payload.batchId; });
      if (!rtbBatch) return state;
      const rtbNewRB = state.retreadBatches.map(function(b) {
        if (b.id === action.payload.batchId) {
          return Object.assign({}, b, {
            status: "Returned", actualReturn: now().slice(0,10),
            returnedTread: "16 mm",
            result: "Accepted",
          });
        }
        return b;
      });
      const rtbTireIds = rtbBatch.lines.map(function(l) { return l.tireId; });
      const rtbTires = state.tires.map(function(t) {
        if (rtbTireIds.indexOf(t.id) >= 0) {
          if (t.retreadCount >= t.retreadLimit) return t;
          return Object.assign({}, t, { retreadCount: t.retreadCount + 1, status: "In Stock" });
        }
        return t;
      });
      return Object.assign({}, state, {
        retreadBatches: rtbNewRB,
        tires: rtbTires,
        history: state.history.concat([{
          id: genId("EVT-"), timestamp: now(),
          stepId: null, action: "RETURN_RETREAD_BATCH",
          description: "Retread batch returned and accepted.",
        }]),
      });
    }

    case "SCRAP_TIRE": {
      const scTire = state.tires.find(function(t) { return t.id === action.payload.tireId; });
      if (!scTire) return state;
      if (scTire.status !== "In Service" && scTire.status !== "In Stock") return state;
      const scNewTires = state.tires.map(function(t) {
        if (t.id === action.payload.tireId) {
          return Object.assign({}, t, { status: "Scrapped", position: null, vehicleId: null });
        }
        return t;
      });
      return Object.assign({}, state, {
        tires: scNewTires,
        history: state.history.concat([{
          id: genId("EVT-"), timestamp: now(),
          stepId: null, action: "SCRAP_TIRE",
          description: "Tire " + action.payload.tireId + ".",

        }]),
      });
    }
    default:
      return state;
  }
}

export function getCurrentPMStatus(state: SimulationState, entry: MaintenancePlanEntry): string {
  const remaining = entry.reading - state.odometer;
  if (state.odometer >= entry.reading) return "Due";
  if (remaining <= 500) return "Due Soon";
  if (remaining <= 1000) return "Due Soon";
  return "Scheduled";
}

export function getNextMaintenance(state: SimulationState): MaintenancePlanEntry | null {
  const entries = state.maintenancePlan.filter(function(e) {
    return state.odometer < e.reading;
  });
  if (entries.length === 0) return null;
  return entries.sort(function(a, b) { return a.reading - b.reading; })[0];
}

export function getActiveAlerts(state: SimulationState): MaintenanceAlert[] {
  return state.maintenancePlan
    .filter(function(e) { return state.odometer >= e.reading || e.reading - state.odometer <= 1000; })
    .map(function(e) {
      const rem = e.reading - state.odometer;
      const st = state.odometer >= e.reading ? "Due" : "Due Soon";
      return {
        id: "ALERT-" + e.templateId,
        equipmentId: state.vehicle.id,
        currentReading: state.odometer, dueReading: e.reading,
        remaining: rem, maintenanceName: e.templateId,
        status: st,
      };
    });
}

export function getTireCurrentMileage(state: SimulationState, tireId: string): number {
  const tire = state.tires.find(function(t) { return t.id === tireId; });
  if (!tire) return 0;
  if (tire.status === "In Service" && tire.installedAtKm != null) {
    return state.odometer - tire.installedAtKm;
  }
  return 0;
}

export function getTireStatus(state: SimulationState, tireId: string): string {
  const tire = state.tires.find(function(t) { return t.id === tireId; });
  if (!tire) return "Unknown";
  if (tire.status === "In Service" && tire.installedAtKm != null) {
    const total = tire.accumulatedKm + (state.odometer - tire.installedAtKm);
    if (total > 100000) return "Replace";
    if (state.odometer - tire.installedAtKm > 10000) return "Inspect";
    return "OK";
  }
  return tire.status;
}

export function getOpenBacklog(state: SimulationState): BacklogItem[] {
  return state.backlog.filter(function(b) { return b.status === "Open"; });
}

export function getVehicleMaintenanceHistory(state: SimulationState): SimulationEvent[] {
  return state.history.filter(function(e) {
    return e.action.indexOf("ALERT") >= 0 || e.action.indexOf("WO") >= 0;
  });
}

export const resetSimulation = (): SimulationState => initialSimulationState();

export function useSimulation() {
  return useReducer(simulationReducer, undefined, initialSimulationState);
}

export {
  guidedVehicle, maintenanceTemplateDefs, maintenancePlanEntries,
  guidedTireSet, guidedTireLayout, componentCounters,
  maintenanceAlerts, tireAlerts, guidedInspections,
  guidedWorkOrder, guidedFollowUpWorkOrder, backlogItems,
  retreadBatches,
  formatKm, chapter1Steps, chapter2Steps, guidedTourSteps, stepById, nextStepId,
  type GuidedTourStep,
} from "@/data/demos/vanbags-maintenance-guided";



