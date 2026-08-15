export interface VehicleTelemetry {
  id: string;
  timestamp: string;
  odometer: number;
  speed: number;
  rpm: number;
  fuelLevel: number;
  ignitionState: string;
  location: string;
  drivingEvents: {
    harshBraking: boolean;
    harshAcceleration: boolean;
    idling: boolean;
  };
}

export interface FuelEvent {
  id: string;
  vehicleId: string;
  timestamp: string;
  type: "refuel" | "anomaly" | "theft";
  amount?: number;
  authorized: boolean;
}

export interface MaintenanceRecord {
  vehicleId: string;
  component: string;
  lastServiceOdometer: number;
  interval: number;
  currentOdometer: number;
  remainingDistance: number;
  status: "OK" | "Due Soon" | "Overdue";
}

export interface Driver {
  id: string;
  name: string;
  team: string;
  vehicleId: string;
  fuelPerformance: number;
  idlePercentage: number;
  overRevPercentage: number;
  brakingEventsPerKm: number;
  harshAccelerationEventsPerKm: number;
  driverScore: number;
}

export interface Team {
  id: string;
  name: string;
  drivers: string[]; // driver IDs
  meanDriverScore: number;
  lowestDriverScore: number;
  teamScore: number;
}

export interface Route {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  expectedEfficiency: number; // km/L benchmark
}

export interface FleetSnapshot {
  activeVehicles: number;
  vehiclesRequiringAttention: number;
  fuelAlerts: number;
  maintenanceDueSoon: number;
  maintenanceOverdue: number;
  averageDriverScore: number;
  averageTeamScore: number;
}

export interface Alert {
  id: string;
  type: string;
  severity: "Info" | "Attention" | "High";
  vehicleId: string;
  driverId?: string;
  message: string;
  timestamp: string;
}

// ============================================================
// VEHICLE DATA: 12 vehicles across multiple brands
// ============================================================
export const vehicles: VehicleTelemetry[] = [
  {
    id: "TRK-DEMO-001",
    brand: "Volvo",
    model: "FH16",
    type: "Tractor",
    odometer: 423000,
    fuelLevel: 68,
    ignitionState: "OFF",
    location: "Vancouver",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: false,
      idling: true,
    },
  },
  {
    id: "TRK-DEMO-002",
    brand: "Freightliner",
    model: "Cascadia",
    type: "Tractor",
    odometer: 389000,
    fuelLevel: 45,
    ignitionState: "ON",
    location: "Surrey",
    drivingEvents: {
      harshBraking: true,
      harshAcceleration: false,
      idling: false,
    },
  },
  {
    id: "TRK-DEMO-003",
    brand: "Kenworth",
    model: "T680",
    type: "Tractor",
    odometer: 298000,
    fuelLevel: 82,
    ignitionState: "ON",
    location: "Abbotsford",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: true,
      idling: false,
    },
  },
  {
    id: "TRK-DEMO-004",
    brand: "International",
    model: "RH Series",
    type: "Straight Truck",
    odometer: 156000,
    fuelLevel: 33,
    ignitionState: "OFF",
    location: "Richmond",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: false,
      idling: true,
    },
  },
  {
    id: "TRK-DEMO-005",
    brand: "Mercedes-Benz",
    model: "Actros",
    type: "Tractor",
    odometer: 512000,
    fuelLevel: 21,
    ignitionState: "ON",
    location: "Kamloops",
    drivingEvents: {
      harshBraking: true,
      harshAcceleration: true,
      idling: false,
    },
  },
  {
    id: "TRK-DEMO-006",
    brand: "Hino",
    model: "338",
    type: "Straight Truck",
    odometer: 87000,
    fuelLevel: 76,
    ignitionState: "OFF",
    location: "Toronto",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: false,
      idling: true,
    },
  },
  {
    id: "TRK-DEMO-007",
    brand: "Isuzu",
    model: "NQR",
    type: "Delivery Truck",
    odometer: 62000,
    fuelLevel: 54,
    ignitionState: "ON",
    location: "Mississauga",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: false,
      idling: false,
    },
  },
  {
    id: "TRK-DEMO-008",
    brand: "Volvo",
    model: "FH16",
    type: "Tractor",
    odometer: 334000,
    fuelLevel: 91,
    ignitionState: "OFF",
    location: "Seattle",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: false,
      idling: true,
    },
  },
  {
    id: "TRK-DEMO-009",
    brand: "Freightliner",
    model: "Cascadia",
    type: "Tractor",
    odometer: 276000,
    fuelLevel: 18,
    ignitionState: "ON",
    location: "Vancouver",
    drivingEvents: {
      harshBraking: true,
      harshAcceleration: false,
      idling: false,
    },
  },
  {
    id: "TRK-DEMO-010",
    brand: "Kenworth",
    model: "T680",
    type: "Tractor",
    odometer: 445000,
    fuelLevel: 57,
    ignitionState: "OFF",
    location: "Abbotsford",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: true,
      idling: true,
    },
  },
  {
    id: "TRK-DEMO-011",
    brand: "International",
    model: "RH Series",
    type: "Straight Truck",
    odometer: 112000,
    fuelLevel: 42,
    ignitionState: "ON",
    location: "Richmond",
    drivingEvents: {
      harshBraking: true,
      harshAcceleration: false,
      idling: false,
    },
  },
  {
    id: "TRK-DEMO-012",
    brand: "Hino",
    model: "338",
    type: "Straight Truck",
    odometer: 73000,
    fuelLevel: 63,
    ignitionState: "OFF",
    location: "Toronto",
    drivingEvents: {
      harshBraking: false,
      harshAcceleration: false,
      idling: true,
    },
  },
];

// ============================================================
// DRIVER DATA: 10 synthetic drivers across 3 teams
// ============================================================
export const drivers: Driver[] = [
  {
    id: "DRV-DEMO-001",
    name: "Morgan Avery",
    team: "Team Pacific",
    vehicleId: "TRK-DEMO-001",
    fuelPerformance: 87,
    idlePercentage: 12,
    overRevPercentage: 3,
    brakingEventsPerKm: 0.06,
    harshAccelerationEventsPerKm: 0.05,
    driverScore: 74,
  },
  {
    id: "DRV-DEMO-002",
    name: "Taylor Morgan",
    team: "Team Pacific",
    vehicleId: "TRK-DEMO-002",
    fuelPerformance: 72,
    idlePercentage: 18,
    overRevPercentage: 6,
    brakingEventsPerKm: 0.09,
    harshAccelerationEventsPerKm: 0.08,
    driverScore: 64,
  },
  {
    id: "DRV-DEMO-003",
    name: "Casey Nguyen",
    team: "Team Metro",
    vehicleId: "TRK-DEMO-003",
    fuelPerformance: 91,
    idlePercentage: 8,
    overRevPercentage: 2,
    brakingEventsPerKm: 0.04,
    harshAccelerationEventsPerKm: 0.03,
    driverScore: 82,
  },
  {
    id: "DRV-DEMO-004",
    name: "Riley Chambers",
    team: "Team Metro",
    vehicleId: "TRK-DEMO-004",
    fuelPerformance: 68,
    idlePercentage: 22,
    overRevPercentage: 8,
    brakingEventsPerKm: 0.11,
    harshAccelerationEventsPerKm: 0.10,
    driverScore: 58,
  },
  {
    id: "DRV-DEMO-005",
    name: "Alexis Patel",
    team: "Team Mountain",
    vehicleId: "TRK-DEMO-005",
    fuelPerformance: 79,
    idlePercentage: 15,
    overRevPercentage: 4,
    brakingEventsPerKm: 0.07,
    harshAccelerationEventsPerKm: 0.06,
    driverScore: 68,
  },
  {
    id: "DRV-DEMO-006",
    name: "Jamie Wilkins",
    team: "Team Mountain",
    vehicleId: "TRK-DEMO-006",
    fuelPerformance: 84,
    idlePercentage: 10,
    overRevPercentage: 1,
    brakingEventsPerKm: 0.05,
    harshAccelerationEventsPerKm: 0.04,
    driverScore: 78,
  },
  {
    id: "DRV-DEMO-007",
    name: "Drew Sinclair",
    team: "Team Pacific",
    vehicleId: "TRK-DEMO-007",
    fuelPerformance: 76,
    idlePercentage: 14,
    overRevPercentage: 5,
    brakingEventsPerKm: 0.08,
    harshAccelerationEventsPerKm: 0.07,
    driverScore: 66,
  },
  {
    id: "DRV-DEMO-008",
    name: "Skyler Brooks",
    team: "Team Metro",
    vehicleId: "TRK-DEMO-008",
    fuelPerformance: 93,
    idlePercentage: 6,
    overRevPercentage: 1,
    brakingEventsPerKm: 0.03,
    harshAccelerationEventsPerKm: 0.02,
    driverScore: 84,
  },
  {
    id: "DRV-DEMO-009",
    name: "Quinn Ellis",
    team: "Team Mountain",
    vehicleId: "TRK-DEMO-009",
    fuelPerformance: 62,
    idlePercentage: 28,
    overRevPercentage: 9,
    brakingEventsPerKm: 0.13,
    harshAccelerationEventsPerKm: 0.12,
    driverScore: 52,
  },
  {
    id: "DRV-DEMO-010",
    name: "Reese Rivera",
    team: "Team Pacific",
    vehicleId: "TRK-DEMO-010",
    fuelPerformance: 81,
    idlePercentage: 16,
    overRevPercentage: 4,
    brakingEventsPerKm: 0.07,
    harshAccelerationEventsPerKm: 0.05,
    driverScore: 70,
  },
];

// ============================================================
// TEAM DATA: 3 teams with driver assignments
// ============================================================
export const teams: Team[] = [
  {
    id: "TEAM-001",
    name: "Team Pacific",
    drivers: ["DRV-DEMO-001", "DRV-DEMO-002", "DRV-DEMO-007", "DRV-DEMO-010"],
    meanDriverScore: 73.75,
    lowestDriverScore: 64,
    teamScore: 73.75 * 0.7 + 64 * 0.3,
  },
  {
    id: "TEAM-002",
    name: "Team Metro",
    drivers: ["DRV-DEMO-003", "DRV-DEMO-004", "DRV-DEMO-008", "DRV-DEMO-009"],
    meanDriverScore: 68.75,
    lowestDriverScore: 52,
    teamScore: 68.75 * 0.7 + 52 * 0.3,
  },
  {
    id: "TEAM-003",
    name: "Team Mountain",
    drivers: ["DRV-DEMO-005", "DRV-DEMO-006", "DRV-DEMO-010", "DRV-DEMO-001"],
    meanDriverScore: 74.5,
    lowestDriverScore: 52,
    teamScore: 74.5 * 0.7 + 52 * 0.3,
  },
];

// ============================================================
// ROUTE DATA: 6 synthetic routes
// ============================================================
export const routes: Route[] = [
  {
    id: "ROUTE-001",
    origin: "Vancouver",
    destination: "Surrey",
    distanceKm: 38,
    expectedEfficiency: 3.1,
  },
  {
    id: "ROUTE-002",
    origin: "Vancouver",
    destination: "Abbotsford",
    distanceKm: 75,
    expectedEfficiency: 3.4,
  },
  {
    id: "ROUTE-003",
    origin: "Burnaby",
    destination: "Richmond",
    distanceKm: 12,
    expectedEfficiency: 2.9,
  },
  {
    id: "ROUTE-004",
    origin: "Vancouver",
    destination: "Kamloops",
    distanceKm: 340,
    expectedEfficiency: 3.6,
  },
  {
    id: "ROUTE-005",
    origin: "Toronto",
    destination: "Mississauga",
    distanceKm: 25,
    expectedEfficiency: 3.0,
  },
  {
    id: "ROUTE-006",
    origin: "Seattle",
    destination: "Tacoma",
    distanceKm: 45,
    expectedEfficiency: 3.3,
  },
];

// ============================================================
// MAINTENANCE RECORDS: component intervals per vehicle
// ============================================================
export const maintenanceRecords: MaintenanceRecord[] = [
  {
    vehicleId: "TRK-DEMO-001",
    component: "Engine Oil",
    lastServiceOdometer: 418000,
    interval: 15000,
    currentOdometer: 423000,
    remainingDistance: 7000,
    status: "OK",
  },
  {
    vehicleId: "TRK-DEMO-002",
    component: "Engine Oil",
    lastServiceOdometer: 385000,
    interval: 15000,
    currentOdometer: 389000,
    remainingDistance: 46000,
    status: "Due Soon",
  },
  {
    vehicleId: "TRK-DEMO-003",
    component: "Fuel Filter",
    lastServiceOdometer: 295000,
    interval: 20000,
    currentOdometer: 298000,
    remainingDistance: 2000,
    status: "Overdue",
  },
  {
    vehicleId: "TRK-DEMO-004",
    component: "Oil Filter",
    lastServiceOdometer: 152000,
    interval: 16000,
    currentOdometer: 156000,
    remainingDistance: 4000,
    status: "Due Soon",
  },
  {
    vehicleId: "TRK-DEMO-005",
    component: "Transmission",
    lastServiceOdometer: 388000,
    interval: 60000,
    currentOdometer: 512000,
    remainingDistance: 8000,
    status: "Overdue",
  },
  {
    vehicleId: "TRK-DEMO-006",
    component: "Brake Inspection",
    lastServiceOdometer: 85000,
    interval: 10000,
    currentOdometer: 87000,
    remainingDistance: 3000,
    status: "Due Soon",
  },
  {
    vehicleId: "TRK-DEMO-007",
    component: "Engine Oil",
    lastServiceOdometer: 615000,
    interval: 15000,
    currentOdometer: 620000,
    remainingDistance: 5000,
    status: "Due Soon",
  },
  {
    vehicleId: "TRK-DEMO-008",
    component: "Fuel Filter",
    lastServiceOdometer: 274000,
    interval: 20000,
    currentOdometer: 276000,
    remainingDistance: 4000,
    status: "OK",
  },
  {
    vehicleId: "TRK-DEMO-009",
    component: "Oil Filter",
    lastServiceOdometer: 381000,
    interval: 16000,
    currentOdometer: 389000,
    remainingDistance: 7000,
    status: "OK",
  },
  {
    vehicleId: "TRK-DEMO-010",
    component: "Fuel Filter",
    lastServiceOdometer: 442000,
    interval: 20000,
    currentOdometer: 445000,
    remainingDistance: 3000,
    status: "Overdue",
  },
  {
    vehicleId: "TRK-DEMO-011",
    component: "Transmission",
    lastServiceOdometer: 379000,
    interval: 60000,
    currentOdometer: 389000,
    remainingDistance: 11000,
    status: "Due Soon",
  },
  {
    vehicleId: "TRK-DEMO-012",
    component: "Brake Inspection",
    lastServiceOdometer: 71000,
    interval: 10000,
    currentOdometer: 73000,
    remainingDistance: 4000,
    status: "Due Soon",
  },
];

// ============================================================
// FUEL EVENTS: synthetic events
// ============================================================
export const fuelEvents: FuelEvent[] = [
  {
    id: "FUEL-001",
    vehicleId: "TRK-DEMO-001",
    timestamp: "2026-07-15T08:30:00Z",
    type: "refuel",
    amount: 150,
    authorized: true,
  },
  {
    id: "FUEL-002",
    vehicleId: "TRK-DEMO-002",
    timestamp: "2026-07-15T09:15:00Z",
    type: "refuel",
    amount: 120,
    authorized: true,
  },
  {
    id: "FUEL-003",
    vehicleId: "TRK-DEMO-005",
    timestamp: "2026-07-16T07:45:00Z",
    type: "anomaly",
    amount: undefined,
    authorized: false,
  },
  {
    id: "FUEL-004",
    vehicleId: "TRK-DEMO-009",
    timestamp: "2026-07-16T14:20:00Z",
    type: "theft",
    amount: undefined,
    authorized: false,
  },
  {
    id: "FUEL-005",
    vehicleId: "TRK-DEMO-003",
    timestamp: "2026-07-17T11:10:00Z",
    type: "refuel",
    amount: 130,
    authorized: true,
  },
  {
    id: "FUEL-006",
    vehicleId: "TRK-DEMO-007",
    timestamp: "2026-07-17T16:55:00Z",
    type: "anomaly",
    amount: undefined,
    authorized: false,
  },
];

// ============================================================
// ALERTS: current operational alerts
// ============================================================
export const alerts: Alert[] = [
  {
    id: "ALT-001",
    type: "Potential Fuel Theft Alert",
    severity: "High",
    vehicleId: "TRK-DEMO-005",
    message:
      "Unexpected fuel-level decrease while vehicle stationary, ignition OFF, no authorized fuel event logged.",
    timestamp: "2026-07-16T07:45:00Z",
  },
  {
    id: "ALT-002",
    type: "Elevated Idle",
    severity: "Attention",
    vehicleId: "TRK-DEMO-009",
    message: "Idle % of 28% exceeds synthetic demo benchmark of 35% (poor).",
    timestamp: "2026-07-17T10:30:00Z",
  },
  {
    id: "ALT-003",
    type: "Elevated Over-Rev",
    severity: "Attention",
    vehicleId: "TRK-DEMO-002",
    message: "Over-Rev % of 6% exceeds synthetic demo benchmark of 10% (poor).",
    timestamp: "2026-07-15T14:20:00Z",
  },
  {
    id: "ALT-004",
    type: "Elevated Braking Rate",
    severity: "Attention",
    vehicleId: "TRK-DEMO-005",
    message: "Braking events of 0.07/km exceed synthetic demo poor threshold of 0.30/km.",
    timestamp: "2026-07-17T16:55:00Z",
  },
  {
    id: "ALT-005",
    type: "Maintenance Overdue",
    severity: "Critical",
    vehicleId: "TRK-DEMO-010",
    message: "Fuel Filter overdue at 3000 km remaining (threshold: 2,500 km).",
    timestamp: "2026-07-17T08:00:00Z",
  },
  {
    id: "ALT-006",
    type: "Maintenance Due Soon",
    severity: "Info",
    vehicleId: "TRK-DEMO-002",
    message: "Engine Oil Due Soon at 4,600 km remaining (threshold: 2,500 km).",
    timestamp: "2026-07-16T09:15:00Z",
  },
];

// ============================================================
// FLEET SNAPSHOT: derived summary values
// ============================================================
export const fleetSnapshot: FleetSnapshot = {
  activeVehicles: vehicles.length,
  vehiclesRequiringAttention:
    maintenanceRecords.filter((r) => r.status !== "OK").length +
    alerts.filter((a) => a.severity === "High").length,
  fuelAlerts: alerts.filter((a) => a.type.includes("Fuel")).length,
  maintenanceDueSoon: maintenanceRecords.filter((r) => r.status === "Due Soon").length,
  maintenanceOverdue: maintenanceRecords.filter((r) => r.status === "Overdue").length,
  averageDriverScore:
    drivers.reduce((sum, d) => sum + d.driverScore, 0) / drivers.length,
  averageTeamScore:
    teams.reduce((sum, t) => sum + t.teamScore, 0) / teams.length,
};