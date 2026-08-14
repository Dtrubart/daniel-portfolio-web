export type EquipmentType = "equipment" | "vehicle";
export type EquipmentStatus = "Operational" | "Under Maintenance";
export type Priority = "Low" | "Medium" | "High";
export type RequestStatus = "New" | "In Review" | "Converted" | "Closed";
export type WorkOrderStatus = "Draft" | "In Progress" | "Completed" | "Closed";
export type ActivityStatus = "Pending" | "In Progress" | "Complete";
export type TriggerType = "Calendar" | "Operating Hours" | "Kilometers";
export type PMStatus = "Due" | "Due Soon" | "Scheduled";
export type HistoryEventType =
  | "PM Service"
  | "Corrective Repair"
  | "Tire Rotation"
  | "Component Replacement"
  | "Work Order Completion"
  | "Tire Install"
  | "Tire Remove"
  | "Tire Rotate"
  | "Tire Repair"
  | "Tire Scrap";

export interface Equipment {
  id: string;
  type: EquipmentType;
  name: string;
  plate: string | null;
  category: string;
  location: string;
  odometer: number;
  nextPMDue: string;
  nextPMReading: number;
}

export interface Technician {
  id: string;
  name: string;
  skill: string;
}

export interface Part {
  id: string;
  description: string;
  warehouse: string;
  unit: string;
  available: number;
}

export interface WorkOrderActivity {
  id: string;
  description: string;
  technicianId: string | null;
  status: ActivityStatus;
}

export interface WorkOrderPartRequirement {
  partId: string;
  required: number;
  reserved: number;
  issued: number;
}

export interface WorkOrder {
  id: string;
  equipmentId: string;
  requestId: string | null;
  title: string;
  priority: Priority;
  status: WorkOrderStatus;
  location: string;
  technicianIds: string[];
  activities: WorkOrderActivity[];
  partRequirements: WorkOrderPartRequirement[];
  downtime: { start: string; end: string; duration: string } | null;
  completionNotes: string;
}

export interface MaintenanceRequest {
  id: string;
  equipmentId: string;
  issue: string;
  priority: Priority;
  status: RequestStatus;
  createdAt: string;
}

export interface PreventivePlan {
  id: string;
  equipmentId: string;
  title: string;
  triggerType: TriggerType;
  interval: number;
  intervalUnit: string;
  currentReading: number;
  nextDue: string;
  nextDueReading: number;
  lastDone: string;
  status: PMStatus;
}

export interface ServiceHistoryEvent {
  id: string;
  equipmentId: string;
  date: string;
  type: HistoryEventType;
  summary: string;
  workOrderId: string | null;
}

export interface Tire {
  id: string;
  brand: string;
  model: string;
  status: "Warehouse" | "In Service" | "Repair" | "Removed" | "Scrapped";
  vehicleId: string | null;
  positionCode: string | null;
  odometer: number;
  pressure: string;
  treadDepth: string;
}

export interface TireMovement {
  id: string;
  tireId: string;
  from: string;
  to: string;
  date: string;
}

export interface TirePositionDef {
  code: string;
  side: "Left" | "Right";
  location: "Front" | "Rear";
  axle: number;
  innerOuter: "Outer" | "Inner";
}

export interface VehicleLayout {
  vehicleId: string;
  name: string;
  plate: string;
  positions: TirePositionDef[];
}

export type NavView =
  | "dashboard"
  | "equipment"
  | "requests"
  | "workorders"
  | "pm"
  | "parts"
  | "history"
  | "tires";

export interface MaintenanceState {
  equipment: Equipment[];
  technicians: Technician[];
  parts: Part[];
  requests: MaintenanceRequest[];
  workOrders: WorkOrder[];
  pmPlans: PreventivePlan[];
  serviceHistory: ServiceHistoryEvent[];
  tires: Tire[];
  tireMovements: TireMovement[];
  vehicleLayouts: Record<string, VehicleLayout>;
  navView: NavView;
  selectedEquipmentId: string | null;
  selectedWoId: string | null;
  selectedTireId: string | null;
  woSequence: number;
  historySequence: number;
  movementSequence: number;
}

export function fmt(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    value,
  );
}

function axleLabel(axle: number, location: "Front" | "Rear"): string {
  return location === "Front"
    ? `Axle ${axle} — Steer`
    : `Axle ${axle} — Drive`;
}

const vehicleLayouts: Record<string, VehicleLayout> = {
  "TRK-DEMO-017": {
    vehicleId: "TRK-DEMO-017",
    name: "TRK-DEMO-017",
    plate: "BC-DEMO-4827",
    positions: [
      { code: "FL-01", side: "Left", location: "Front", axle: 1, innerOuter: "Outer" },
      { code: "FR-01", side: "Right", location: "Front", axle: 1, innerOuter: "Outer" },
      { code: "RL1-O", side: "Left", location: "Rear", axle: 2, innerOuter: "Outer" },
      { code: "RL1-I", side: "Left", location: "Rear", axle: 2, innerOuter: "Inner" },
      { code: "RR1-O", side: "Right", location: "Rear", axle: 2, innerOuter: "Outer" },
      { code: "RR1-I", side: "Right", location: "Rear", axle: 2, innerOuter: "Inner" },
      { code: "RL2-O", side: "Left", location: "Rear", axle: 3, innerOuter: "Outer" },
      { code: "RL2-I", side: "Left", location: "Rear", axle: 3, innerOuter: "Inner" },
      { code: "RR2-O", side: "Right", location: "Rear", axle: 3, innerOuter: "Outer" },
      { code: "RR2-I", side: "Right", location: "Rear", axle: 3, innerOuter: "Inner" },
    ],
  },
  "TRK-DEMO-022": {
    vehicleId: "TRK-DEMO-022",
    name: "TRK-DEMO-022",
    plate: "BC-DEMO-2241",
    positions: [
      { code: "FL-01", side: "Left", location: "Front", axle: 1, innerOuter: "Outer" },
      { code: "FR-01", side: "Right", location: "Front", axle: 1, innerOuter: "Outer" },
      { code: "RL1-O", side: "Left", location: "Rear", axle: 2, innerOuter: "Outer" },
      { code: "RL1-I", side: "Left", location: "Rear", axle: 2, innerOuter: "Inner" },
      { code: "RR1-O", side: "Right", location: "Rear", axle: 2, innerOuter: "Outer" },
      { code: "RR1-I", side: "Right", location: "Rear", axle: 2, innerOuter: "Inner" },
    ],
  },
};

export const EQUIPMENT_CATALOG: Equipment[] = [
  {
    id: "EQ-DEMO-001",
    type: "equipment",
    name: "Air Compressor",
    plate: null,
    category: "Utility Equipment",
    location: "Vancouver Demo Warehouse",
    odometer: 0,
    nextPMDue: "2026-08-18",
    nextPMReading: 750,
  },
  {
    id: "EQ-DEMO-002",
    type: "equipment",
    name: "Packaging Machine",
    plate: null,
    category: "Production Equipment",
    location: "Vancouver Demo Warehouse",
    odometer: 0,
    nextPMDue: "2026-08-20",
    nextPMReading: 1200,
  },
  {
    id: "TRK-DEMO-017",
    type: "vehicle",
    name: "Heavy Truck",
    plate: "BC-DEMO-4827",
    category: "Fleet Vehicle",
    location: "Vancouver Demo Yard",
    odometer: 48200,
    nextPMDue: "2026-08-13",
    nextPMReading: 49000,
  },
  {
    id: "TRK-DEMO-022",
    type: "vehicle",
    name: "Delivery Truck",
    plate: "BC-DEMO-2241",
    category: "Fleet Vehicle",
    location: "Vancouver Demo Yard",
    odometer: 12600,
    nextPMDue: "2026-08-16",
    nextPMReading: 13000,
  },
];

export const TECHNICIANS: Technician[] = [
  { id: "TECH-001", name: "Alex Morgan", skill: "Mechanical" },
  { id: "TECH-002", name: "Jordan Lee", skill: "Tires" },
  { id: "TECH-003", name: "Taylor Chen", skill: "Electrical" },
];

export const PART_CATALOG: Part[] = [
  { id: "PART-001", description: "Bearing 6205", warehouse: "Vancouver FG", unit: "each", available: 4 },
  { id: "PART-002", description: "Seal Kit", warehouse: "Vancouver FG", unit: "each", available: 2 },
  { id: "PART-003", description: "Lubricant", warehouse: "Vancouver FG", unit: "ltr", available: 8 },
  { id: "PART-004", description: "Brake Pad Set", warehouse: "Vancouver FG", unit: "set", available: 3 },
  { id: "PART-005", description: "Containment Ring", warehouse: "Vancouver FG", unit: "each", available: 1 },
];

const initialWorkOrders: WorkOrder[] = [
  {
    id: "WO-DEMO-003",
    equipmentId: "TRK-DEMO-017",
    requestId: null,
    title: "Corrective Repair",
    priority: "High",
    status: "Completed",
    location: "Vancouver Demo Yard",
    technicianIds: ["TECH-001"],
    activities: [
      { id: "A1", description: "Inspect front axle", technicianId: "TECH-001", status: "Complete" },
      { id: "A2", description: "Replace brake pads", technicianId: "TECH-001", status: "Complete" },
    ],
    partRequirements: [
      { partId: "PART-004", required: 1, reserved: 0, issued: 1 },
      { partId: "PART-003", required: 1, reserved: 0, issued: 1 },
    ],
    downtime: { start: "2026-08-10 08:30", end: "2026-08-10 10:15", duration: "1h 45m" },
    completionNotes: "Front brake service completed.",
  },
];

const initialServiceHistory: ServiceHistoryEvent[] = [
  {
    id: "HIST-0001",
    equipmentId: "TRK-DEMO-017",
    date: "2026-08-10",
    type: "Work Order Completion",
    summary: "Front brake service (WO-DEMO-003)",
    workOrderId: "WO-DEMO-003",
  },
];

const initialTires: Tire[] = [
  { id: "TIRE-DEMO-0184", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "FL-01", odometer: 48300, pressure: "Illustrative", treadDepth: "12mm" },
  { id: "TIRE-DEMO-0210", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "FR-01", odometer: 48300, pressure: "Illustrative", treadDepth: "11mm" },
  { id: "TIRE-DEMO-0311", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "RL1-O", odometer: 48200, pressure: "Illustrative", treadDepth: "8mm" },
  { id: "TIRE-DEMO-0312", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "RL1-I", odometer: 48200, pressure: "Illustrative", treadDepth: "9mm" },
  { id: "TIRE-DEMO-0313", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "RR1-O", odometer: 48200, pressure: "Illustrative", treadDepth: "10mm" },
  { id: "TIRE-DEMO-0314", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "RR1-I", odometer: 48200, pressure: "Illustrative", treadDepth: "11mm" },
  { id: "TIRE-DEMO-0320", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "RL2-O", odometer: 48200, pressure: "Illustrative", treadDepth: "7mm" },
  { id: "TIRE-DEMO-0321", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-017", positionCode: "RR2-O", odometer: 48200, pressure: "Illustrative", treadDepth: "9mm" },
  { id: "TIRE-DEMO-0511", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-022", positionCode: "FL-01", odometer: 12650, pressure: "Illustrative", treadDepth: "14mm" },
  { id: "TIRE-DEMO-0512", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-022", positionCode: "FR-01", odometer: 12650, pressure: "Illustrative", treadDepth: "13mm" },
  { id: "TIRE-DEMO-0521", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-022", positionCode: "RL1-O", odometer: 12650, pressure: "Illustrative", treadDepth: "10mm" },
  { id: "TIRE-DEMO-0522", brand: "Demo Brand", model: "Commercial 300-24", status: "In Service", vehicleId: "TRK-DEMO-022", positionCode: "RR1-O", odometer: 12650, pressure: "Illustrative", treadDepth: "12mm" },
  { id: "TIRE-DEMO-0410", brand: "Demo Brand", model: "Commercial 300-24", status: "Warehouse", vehicleId: null, positionCode: null, odometer: 0, pressure: "N/A", treadDepth: "18mm" },
  { id: "TIRE-DEMO-0420", brand: "Demo Brand", model: "Commercial 300-24", status: "Warehouse", vehicleId: null, positionCode: null, odometer: 0, pressure: "N/A", treadDepth: "17mm" },
  { id: "TIRE-DEMO-0430", brand: "Demo Brand", model: "Heavy 425-24", status: "Warehouse", vehicleId: null, positionCode: null, odometer: 0, pressure: "N/A", treadDepth: "16mm" },
  { id: "TIRE-DEMO-0399", brand: "Demo Brand", model: "Commercial 300-24", status: "Scrapped", vehicleId: null, positionCode: null, odometer: 39200, pressure: "N/A", treadDepth: "2mm" },
];

const initialTireMovements: TireMovement[] = [
  {
    id: "MOV-0001",
    tireId: "TIRE-DEMO-0184",
    from: "Warehouse",
    to: "TRK-DEMO-017 / FL-01",
    date: "2026-07-20",
  },
];

export const PM_PLANS: PreventivePlan[] = [
  {
    id: "PM-001",
    equipmentId: "TRK-DEMO-017",
    title: "Engine Oil & Filter",
    triggerType: "Kilometers",
    interval: 5000,
    intervalUnit: "km",
    currentReading: 48200,
    nextDue: "2026-08-13",
    nextDueReading: 49000,
    lastDone: "2026-06-20",
    status: "Due",
  },
  {
    id: "PM-002",
    equipmentId: "TRK-DEMO-022",
    title: "Tire Inspection",
    triggerType: "Kilometers",
    interval: 5000,
    intervalUnit: "km",
    currentReading: 12600,
    nextDue: "2026-08-16",
    nextDueReading: 13000,
    lastDone: "2026-06-25",
    status: "Due Soon",
  },
  {
    id: "PM-003",
    equipmentId: "EQ-DEMO-001",
    title: "Monthly Preventive Maintenance",
    triggerType: "Calendar",
    interval: 1,
    intervalUnit: "month",
    currentReading: 0,
    nextDue: "2026-08-18",
    nextDueReading: 0,
    lastDone: "2026-07-18",
    status: "Scheduled",
  },
  {
    id: "PM-004",
    equipmentId: "EQ-DEMO-002",
    title: "Quarterly Service",
    triggerType: "Operating Hours",
    interval: 250,
    intervalUnit: "hours",
    currentReading: 210,
    nextDue: "2026-08-20",
    nextDueReading: 250,
    lastDone: "2026-05-15",
    status: "Scheduled",
  },
];

export const WO_SEQUENCE_START = 5;
export const HISTORY_SEQUENCE_START = 2;
export const MOVEMENT_SEQUENCE_START = 2;

export const initialState: MaintenanceState = {
  equipment: EQUIPMENT_CATALOG,
  technicians: TECHNICIANS,
  parts: PART_CATALOG,
  requests: [],
  workOrders: initialWorkOrders,
  pmPlans: PM_PLANS,
  serviceHistory: initialServiceHistory,
  tires: initialTires,
  tireMovements: initialTireMovements,
  vehicleLayouts: vehicleLayouts,
  navView: "dashboard",
  selectedEquipmentId: "TRK-DEMO-017",
  selectedWoId: null,
  selectedTireId: null,
  woSequence: WO_SEQUENCE_START,
  historySequence: HISTORY_SEQUENCE_START,
  movementSequence: MOVEMENT_SEQUENCE_START,
};

export function nextId(prefix: string, n: number): string {
  return `${prefix}-${String(n).padStart(4, "0")}`;
}

export function formatOdometer(km: number): string {
  return `${fmt(km)} km`;
}

export function openWorkOrderCount(
  equipmentId: string,
  workOrders: WorkOrder[],
): number {
  return workOrders.filter(
    (wo) =>
      wo.equipmentId === equipmentId &&
      (wo.status === "Draft" || wo.status === "In Progress"),
  ).length;
}

export function equipmentStatus(
  equipment: Equipment,
  workOrders: WorkOrder[],
): EquipmentStatus {
  return openWorkOrderCount(equipment.id, workOrders) > 0
    ? "Under Maintenance"
    : "Operational";
}

export function freeAvailable(partId: string, state: MaintenanceState): number {
  const part = state.parts.find((p) => p.id === partId);
  if (!part) return 0;
  const reserved = state.workOrders.reduce(
    (sum, wo) =>
      sum +
      wo.partRequirements
        .filter((r) => r.partId === partId)
        .reduce((s, r) => s + r.reserved, 0),
    0,
  );
  return part.available - reserved;
}

export interface PartLine {
  part: Part;
  required: number;
  available: number;
  reserved: number;
  issued: number;
  shortage: number;
  status: "Available" | "Reserved" | "Issued" | "Consumed" | "Shortage";
}

export function computePartLine(
  state: MaintenanceState,
  woId: string,
  partId: string,
): PartLine | null {
  const requirement = state.workOrders
    .find((wo) => wo.id === woId)
    ?.partRequirements.find((r) => r.partId === partId);
  if (!requirement) return null;
  const part = state.parts.find((p) => p.id === partId);
  if (!part) return null;
  const available = freeAvailable(partId, state);
  const shortage = Math.max(requirement.required - available, 0);
  const status =
    shortage > 0
      ? "Shortage"
      : requirement.issued > 0
        ? "Issued"
        : requirement.reserved > 0
          ? "Reserved"
          : requirement.required > 0
            ? "Available"
            : "Available";
  return {
    part,
    required: requirement.required,
    available,
    reserved: requirement.reserved,
    issued: requirement.issued,
    shortage,
    status,
  };
}

export function canCompleteWorkOrder(
  state: MaintenanceState,
  woId: string,
): boolean {
  const wo = state.workOrders.find((w) => w.id === woId);
  if (!wo) return false;
  const allActivitiesComplete = wo.activities.every((a) => a.status === "Complete");
  const noShortage = wo.partRequirements.every(
    (r) => r.required <= r.issued || r.required === 0,
  );
  return allActivitiesComplete && noShortage;
}

export function dashboardCounts(state: MaintenanceState) {
  const openRequests = state.requests.filter(
    (r) => r.status === "New" || r.status === "In Review",
  ).length;
  const openWorkOrders = state.workOrders.filter(
    (wo) => wo.status === "Draft" || wo.status === "In Progress",
  ).length;
  const pmDue = state.pmPlans.filter((p) => p.status === "Due").length;
  const shortages = state.workOrders
    .filter((wo) => wo.status === "In Progress")
    .reduce((sum, wo) => {
      return (
        sum +
        wo.partRequirements.filter(
          (r) => r.required > r.issued && freeAvailable(r.partId, state) < r.required,
        ).length
      );
    }, 0);
  const vehiclesUnderMaintenance = state.equipment.filter(
    (e) =>
      e.type === "vehicle" && equipmentStatus(e, state.workOrders) === "Under Maintenance",
  ).length;
  return {
    equipment: state.equipment.length,
    openRequests,
    openWorkOrders,
    pmDue,
    shortages,
    vehiclesUnderMaintenance,
  };
}

export function positionAxleGroups(
  layout: VehicleLayout,
): { label: string; positions: TirePositionDef[] }[] {
  const axles = new Map<number, { label: string; positions: TirePositionDef[] }>();
  for (const position of layout.positions) {
    if (!axles.has(position.axle)) {
      axles.set(position.axle, {
        label: axleLabel(position.axle, position.location),
        positions: [],
      });
    }
    axles.get(position.axle)!.positions.push(position);
  }
  return Array.from(axles.values());
}

export function findTireAt(
  tires: Tire[],
  vehicleId: string,
  positionCode: string,
): Tire | null {
  return (
    tires.find(
      (t) =>
        t.vehicleId === vehicleId &&
        t.positionCode === positionCode &&
        t.status === "In Service",
    ) ?? null
  );
}

export function isInstallEligible(tire: Tire): boolean {
  return tire.status === "Warehouse" || tire.status === "Removed";
}

export function eligibleRepairTires(tires: Tire[]): Tire[] {
  return tires.filter((t) => t.status === "Removed" || t.status === "Warehouse");
}

export function availablePositions(
  layout: VehicleLayout,
  tires: Tire[],
  vehicleId: string,
): TirePositionDef[] {
  return layout.positions.filter(
    (position) => !findTireAt(tires, vehicleId, position.code),
  );
}

export function maintenanceRequestsFor(
  state: MaintenanceState,
  equipmentId: string,
): MaintenanceRequest[] {
  return state.requests.filter((r) => r.equipmentId === equipmentId);
}

export function workOrdersFor(
  state: MaintenanceState,
  equipmentId: string,
): WorkOrder[] {
  return state.workOrders.filter((wo) => wo.equipmentId === equipmentId);
}
