export interface GuidedVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  equipmentType: string;
  counterType: string;
  currentOdometer: number;
  axles: number;
  tirePositions: number;
  location: string;
  initialOdometer: number;
}

export interface MaintenanceTemplateDef {
  id: string;
  code: string;
  name: string;
  description: string;
  activities: string[];
  standardParts: { id: string; description: string }[];
  intervalKm: number;
}


export interface MaintenancePlanEntry {
  reading: number;
  templateId: string;
  maintenanceType: string;
}


export interface GuidedTire {
  id: string;
  brand: string;
  model: string;
  size: string;
  initialTread: string;
  currentTread: string;
  retreadLimit: number;
  retreadCount: number;
  status: string;
  vehicleId: string | null;
  position: string | null;
  accumulatedKm: number;
  installedAtKm: number | null;
  removedAtKm: number | null;
}

export interface GuidedTirePosition {
  code: string;
  label: string;
  axle: number;
  side: "Left" | "Right";
  location: "Front" | "Rear";
  innerOuter: "Outer" | "Inner";
  tireId: string | null;
}


export interface TireInspectionRecord {
  id: string;
  tireId: string;
  vehicleId: string;
  position: string;
  date: string;
  odometer: number;
  treadOuter: number;
  treadCenter: number;
  treadInner: number;
  pressure: string;
  condition: string;
  status: "Normal" | "Abnormal";
  suggestedAction: string | null;
}

export interface GuidedActivity {
  id: string;
  description: string;
  technician: string | null;
  status: "Pending" | "In Progress" | "Completed" | "Backlog";
}

export interface GuidedPartLine {
  partId: string;
  description: string;
  required: number;
  available: number;
  reserved: number;
  issued: number;
  status: "Available" | "Reserved" | "Issued" | "Shortage";
}

export interface GuidedWorkOrder {
  id: string;
  source: string;
  equipmentId: string;
  vehicleId: string;
  vehicleOdometer: number;
  maintenanceType: string;
  bay: string;
  supervisor: string;
  startDate: string | null;
  endDate: string | null;
  activities: GuidedActivity[];
  partRequirements: GuidedPartLine[];
  notes: string;
}

export type BacklogReason = "Spare Part Unavailable" | "Insufficient Time" | "External Service Required" | "Additional Diagnosis" | "Other";

export interface BacklogItem {
  id: string;
  equipmentId: string;
  originalWoId: string;
  activityId: string;
  activityDescription: string;
  reason: BacklogReason;
  priority: "Low" | "Medium" | "High";
  requiredPart: { partId: string; description: string; required: number } | null;
  createdDate: string;
  status: "Open" | "In Progress" | "Resolved";
}

export interface ComponentCounter {
  id: string;
  name: string;
  current: number;
  unit: string;
  threshold: number;
  status: "Normal" | "Due Soon" | "Overdue" | "Critical";
}

export type GuidedAlertStatus = "Due" | "Due Soon" | "Scheduled";

export interface MaintenanceAlert {
  id: string;
  equipmentId: string;
  currentReading: number;
  dueReading: number;
  remaining: number;
  maintenanceName: string;
  status: GuidedAlertStatus;
}

export type TireAlertStatus = "INSPECTION DUE" | "TREAD WARNING" | "RECOMMENDED" | "OVERDUE";

export interface TireAlert {
  id: string;
  tireId: string;
  type: string;
  message: string;
  status: TireAlertStatus;
}

export interface RetreadBatchLine {
  tireId: string;
  outgoingTread: string;
  returnedTread: string;
  result: string;
  retreadCount: string;
}

export interface RetreadBatch {
  id: string;
  vendor: string;
  sendDate: string;
  expectedReturn: string;
  actualReturn: string | null;
  status: string;
  invoiceReference: string | null;
  returnedTread?: string | null;
  result?: string | null;
  lines: RetreadBatchLine[];
}

export interface GuidedTourStep {
  id: string;
  title: string;
  chapter: 1 | 2;
  orderInChapter: number;
  description: string;
  module: string;
}

export interface GuidedMaintenanceState {
  currentStep: number;
  vehicle: GuidedVehicle;
  odometer: number;
  maintenanceTemplates: MaintenanceTemplateDef[];
  maintenancePlan: MaintenancePlanEntry[];
  workOrders: GuidedWorkOrder[];
  backlog: BacklogItem[];
  tires: GuidedTire[];
  tirePositions: GuidedTirePosition[];
  retreadBatches: RetreadBatch[];
  alerts: MaintenanceAlert[];
  tireAlerts: TireAlert[];
}

export const guidedVehicle = {
  id: "TRK-DEMO-017",
  brand: "VB Heavy",
  model: "HT-500",
  year: 2026,
  equipmentType: "Heavy-Duty Truck",
  counterType: "Kilometres",
  currentOdometer: 0,
  axles: 3,
  tirePositions: 10,
  location: "Vancouver Demo Fleet",
  initialOdometer: 0,
};

export const maintenanceTemplateDefs = [
  { id: "M1", code: "M1", name: "Basic Preventive Service",
    intervalKm: 5000,
    description: "Routine service at 5,000 km intervals.",
    activities: ["Engine oil replacement", "Oil filter replacement", "Brake inspection"],
    standardParts: [{ id: "PART-001", description: "Engine Oil" }] },
  { id: "M2", code: "M2", name: "Intermediate Service", intervalKm: 15000,
    description: "Comprehensive inspection at 20,000 km.",
    activities: ["All M1 activities", "Brake pad inspection", "Air filter replacement"],
    standardParts: [{ id: "PART-003", description: "Coolant" }] },
  { id: "M3", code: "M3", name: "Major Overhaul Service", intervalKm: 60000,
    description: "Major service at 80,000 km.",
    activities: ["All M2 activities", "Transmission fluid replacement"],
    standardParts: [{ id: "PART-004", description: "Transmission Fluid" }] },
];

export const maintenancePlanEntries = [
  { reading: 5000, templateId: "M1", maintenanceType: "M1" },
  { reading: 20000, templateId: "M2", maintenanceType: "M2" },
  { reading: 35000, templateId: "M1", maintenanceType: "M1" },
  { reading: 50000, templateId: "M2", maintenanceType: "M2" },
  { reading: 65000, templateId: "M1", maintenanceType: "M1" },
  { reading: 80000, templateId: "M3", maintenanceType: "M3" },
];

export const guidedTireSet: GuidedTire[] = Array.from({ length: 10 }, function(_, i) {
  const num = String(i + 1).padStart(3, "0");
  return {
    id: "TIRE-DEMO-" + num,
    brand: "VB Tire Co",
    model: "HT-300 295/75R22.5",
    size: "295/75R22.5",
    initialTread: "28/32",
    currentTread: "26/32",
    retreadLimit: 2,
    retreadCount: 0,
    status: "Warehouse",
    vehicleId: null,
    position: null,
    accumulatedKm: 0,
    installedAtKm: null,
    removedAtKm: null,
  };
});

export const guidedTireLayout: GuidedTirePosition[] = [
  { code: "FL-01", label: "Front Left Outer", axle: 1, side: "Left", location: "Front", innerOuter: "Outer", tireId: null },
  { code: "FR-01", label: "Front Right Outer", axle: 1, side: "Right", location: "Front", innerOuter: "Outer", tireId: null },
  { code: "RL1-O", label: "Rear Left Outer", axle: 2, side: "Left", location: "Rear", innerOuter: "Outer", tireId: null },
  { code: "RL1-I", label: "Rear Left Inner", axle: 2, side: "Left", location: "Rear", innerOuter: "Inner", tireId: null },
  { code: "RR1-O", label: "Rear Right Outer", axle: 2, side: "Right", location: "Rear", innerOuter: "Outer", tireId: null },
  { code: "RR1-I", label: "Rear Right Inner", axle: 2, side: "Right", location: "Rear", innerOuter: "Inner", tireId: null },
  { code: "RL2-O", label: "Rear Left Outer", axle: 3, side: "Left", location: "Rear", innerOuter: "Outer", tireId: null },
  { code: "RL2-I", label: "Rear Left Inner", axle: 3, side: "Left", location: "Rear", innerOuter: "Inner", tireId: null },
  { code: "RR2-O", label: "Rear Right Outer", axle: 3, side: "Right", location: "Rear", innerOuter: "Outer", tireId: null },
  { code: "RR2-I", label: "Rear Right Inner", axle: 3, side: "Right", location: "Rear", innerOuter: "Inner", tireId: null },
];

export const guidedInspections: TireInspectionRecord[] = [
  { id: "INSP-001", tireId: "TIRE-DEMO-001", vehicleId: "TRK-DEMO-017",
    position: "FL-01", date: "2026-08-17", odometer: 4500,
    treadOuter: 11.8, treadCenter: 12.0, treadInner: 11.6,
    pressure: "105 PSI", condition: "Wear within expected range",
    status: "Normal", suggestedAction: null },
  { id: "INSP-002", tireId: "TIRE-DEMO-003", vehicleId: "TRK-DEMO-017",
    position: "RL1-O", date: "2026-08-17", odometer: 4500,
    treadOuter: 9.2, treadCenter: 11.0, treadInner: 12.0,
    pressure: "102 PSI", condition: "Uneven wear - outer edge faster",
    status: "Abnormal", suggestedAction: "Rotation recommended" },
];

export const componentCounters: ComponentCounter[] = [
  { id: "ENGINE", name: "Engine", current: 10420, unit: "h", threshold: 10000, status: "Overdue" },
  { id: "TRANS", name: "Transmission", current: 7800, unit: "h", threshold: 8000, status: "Due Soon" },
  { id: "DIFF", name: "Differential", current: 92400, unit: "km", threshold: 100000, status: "Normal" },
];

export const maintenanceAlerts: MaintenanceAlert[] = [
  { id: "ALERT-MAINT-001", equipmentId: "TRK-DEMO-017", currentReading: 4500,
    dueReading: 5000, remaining: 500, maintenanceName: "M1", status: "Due" },
];

export const tireAlerts: TireAlert[] = [
  { id: "ALERT-TIRE-001", tireId: "TIRE-DEMO-003", type: "Mileage",
    message: "Inspection due", status: "INSPECTION DUE" },
];

export const guidedWorkOrder: GuidedWorkOrder = {
  id: "WO-PM-DEMO-001", source: "Preventive Maintenance Generated",
  equipmentId: "TRK-DEMO-017", vehicleId: "TRK-DEMO-017",
  vehicleOdometer: 5000, maintenanceType: "M1",
  bay: "Bay 03", supervisor: "Dana Reeves",
  startDate: "2026-08-18", endDate: null,
  activities: [{ id: "A1", description: "Perform scheduled PM", technician: null, status: "Pending" }],
  partRequirements: [{ partId: "PART-001", description: "Engine Oil", required: 1, available: 8, reserved: 0, issued: 0, status: "Available" }],
  notes: "",
};

export const guidedFollowUpWorkOrder: GuidedWorkOrder = {
  id: "WO-FU-DEMO-002", source: "Immediate",


  equipmentId: "TRK-DEMO-017", vehicleId: "TRK-DEMO-017",
  vehicleOdometer: 5000, maintenanceType: "Follow-up",
  bay: "Bay 03", supervisor: "Dana Reeves",
  startDate: "2026-08-18", endDate: null,
  activities: [{ id: "A1", description: "Replace brake component", technician: null, status: "Pending" }],
  partRequirements: [{ partId: "PART-005", description: "Containment Ring", required: 2, available: 1, reserved: 0, issued: 0, status: "Shortage" }],
  notes: "",
};

export const backlogItems: BacklogItem[] = [
  { id: "BACKLOG-DEMO-001", equipmentId: "TRK-DEMO-017",
    originalWoId: "WO-PM-DEMO-001", activityId: "A1",
    activityDescription: "Brake Component Replacement",
    reason: "Spare Part Unavailable", priority: "High",
    requiredPart: { partId: "PART-005", description: "Containment Ring", required: 2 },
    createdDate: "2026-08-18", status: "Open" }
];

export const retreadBatches: RetreadBatch[] = [
  { id: "RB-DEMO-004", vendor: "Pacific Retread Ltd.",
    sendDate: "2026-08-05", expectedReturn: "2026-08-25",
    actualReturn: "2026-08-22", status: "Returned", invoiceReference: null,
    lines: [{ tireId: "TIRE-DEMO-004", outgoingTread: "3 mm", returnedTread: "16 mm",
    result: "Accepted", retreadCount: "R1" }]
  }
];

export const guidedTourSteps: GuidedTourStep[] = [
  { id: "register", title: "Register Equipment", chapter: 1, orderInChapter: 1, module: "maintenance",
    description: "Register the guided tour vehicle." },
  { id: "templates", title: "Configure Maintenance Templates", chapter: 1, orderInChapter: 2, module: "maintenance",
    description: "Define M1, M2, M3 templates." },
  { id: "plan", title: "Build Maintenance Plan", chapter: 1, orderInChapter: 3, module: "preventive",
    description: "Create the maintenance plan schedule." },
  { id: "tires", title: "Configure Tire Layout", chapter: 1, orderInChapter: 4, module: "tire",
    description: "Install initial tire set." },
  { id: "operation", title: "Simulate Fleet Operation", chapter: 1, orderInChapter: 5, module: "maintenance",
    description: "Advance the vehicle odometer." },
  { id: "alerts", title: "Respond to Alerts", chapter: 1, orderInChapter: 6, module: "maintenance",
    description: "Review maintenance and tire alerts." },
  { id: "tire-inspection", title: "Perform Tire Inspection", chapter: 1, orderInChapter: 7, module: "tire",
    description: "Conduct tire inspection at 4,500 km." },
  { id: "pm-trigger", title: "Reach PM Trigger", chapter: 1, orderInChapter: 8, module: "preventive",
    description: "Vehicle reaches 5,000 km. M1 is due." },
  { id: "work-order", title: "Generate Preventive Work Order", chapter: 1, orderInChapter: 9, module: "maintenance",
    description: "Create work order from PM plan." },
  { id: "execution", title: "Execute Activities & Parts", chapter: 1, orderInChapter: 10, module: "maintenance",
    description: "Assign technicians, reserve and issue parts." },
  { id: "backlog", title: "Send Activity to Backlog", chapter: 1, orderInChapter: 11, module: "maintenance",
    description: "Brake shortage sends to backlog." },
  { id: "follow-up", title: "Create Follow-Up Work Order", chapter: 1, orderInChapter: 12, module: "maintenance",
    description: "Generate follow-up work order." },
  { id: "tire-lifecycle", title: "Tire Lifecycle", chapter: 2, orderInChapter: 1, module: "tire",
    description: "Follow tire through lifecycle." },
];

export function chapter1Steps(): GuidedTourStep[] {
  return guidedTourSteps.filter(function(s) { return s.chapter === 1; });
}

export function chapter2Steps(): GuidedTourStep[] {
  return guidedTourSteps.filter(function(s) { return s.chapter === 2; });
}

export function stepById(id: string): GuidedTourStep | undefined {
  return guidedTourSteps.find(function(s) { return s.id === id; });
}

export function nextStepId(current: string | null): string | null {
  if (!current) return chapter1Steps()[0] ? chapter1Steps()[0].id : null;
  const idx = guidedTourSteps.findIndex(function(s) { return s.id === current; });
  if (idx < 0 || idx >= guidedTourSteps.length - 1) return null;
  return guidedTourSteps[idx + 1].id;
}

export function formatKm(km: number): string {
  return km.toLocaleString() + " km";
}

export function initialGuidedState(): GuidedMaintenanceState {
  const pos = guidedTireLayout.map(function(p) {
    const t = guidedTireSet.find(function(t) { return t.position === p.code; });
    return Object.assign({}, p, { tireId: t ? t.id : null });
  });

  const installedTires = guidedTireSet.map(function(t, i) {
    return Object.assign({}, t, {
      status: "In Service",
      vehicleId: "TRK-DEMO-017",
      position: guidedTireLayout[i] ? guidedTireLayout[i].code : null,
      accumulatedKm: i < 2 ? 4500 : 0,
      installedAtKm: 0, removedAtKm: null
    });
  });

  return {
    currentStep: 0, vehicle: guidedVehicle, odometer: 0,
    maintenanceTemplates: maintenanceTemplateDefs,
    maintenancePlan: maintenancePlanEntries,
    workOrders: [], backlog: [],
    tires: installedTires, tirePositions: pos,
    retreadBatches: retreadBatches,
    alerts: maintenanceAlerts,
    tireAlerts: tireAlerts
  };
}

