"use client";

export interface FleetIntelligenceState {
  navView: NavView;
  selectedVehicleId: string | null;
  selectedDriverId: string | null;
  selectedTeamId: string | null;
  selectedRouteId: string | null;
  selectedAlertId: string | null;
  dateWindow: {
    start: string;
    end: string;
  };
  comparisonMode: "actual" | "expected";
}

export type NavView =
  | "overview"
  | "fuel"
  | "rpm"
  | "maintenance"
  | "routes"
  | "drivers"
  | "teams"
  | "alerts";

export type FleetIntelligenceAction =
  | { type: "RESET" }
  | { type: "SET_NAV"; view: NavView }
  | { type: "SELECT_VEHICLE"; id: string | null }
  | { type: "SELECT_DRIVER"; id: string | null }
  | { type: "SELECT_TEAM"; id: string | null }
  | { type: "SELECT_ROUTE"; id: string | null }
  | { type: "SELECT_ALERT"; id: string | null }
  | { type: "SET_DATE_WINDOW"; start: string; end: string }
  | { type: "TOGGLE_COMPARISON_MODE" };

export const initialState: FleetIntelligenceState = {
  navView: "overview",
  selectedVehicleId: null,
  selectedDriverId: null,
  selectedTeamId: null,
  selectedRouteId: null,
  selectedAlertId: null,
  dateWindow: {
    start: "2026-01-01",
    end: "2026-12-31",
  },
  comparisonMode: "actual",
};

// Re-export data types from the data layer
export {
  vehicles,
  drivers,
  teams,
  routes,
  maintenanceRecords,
  fuelEvents,
  alerts,
  fleetSnapshot,
  type VehicleTelemetry,
  type Driver,
  type Team,
  type Route,
  type MaintenanceRecord,
  type FuelEvent,
  type Alert,
  type FleetSnapshot,
} from "@/data/demos/fleet-intelligence";