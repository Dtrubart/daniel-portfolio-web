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

export function reducer(
  state: FleetIntelligenceState,
  action: FleetIntelligenceAction
): FleetIntelligenceState {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SET_NAV":
      return { ...state, navView: action.view };
    case "SELECT_VEHICLE":
      return { ...state, selectedVehicleId: action.id };
    case "SELECT_DRIVER":
      return { ...state, selectedDriverId: action.id };
    case "SELECT_TEAM":
      return { ...state, selectedTeamId: action.id };
    case "SELECT_ROUTE":
      return { ...state, selectedRouteId: action.id };
    case "SELECT_ALERT":
      return { ...state, selectedAlertId: action.id };
    case "SET_DATE_WINDOW":
      return { ...state, dateWindow: { start: action.start, end: action.end } };
    case "TOGGLE_COMPARISON_MODE":
      return {
        ...state,
        comparisonMode: state.comparisonMode === "actual" ? "expected" : "actual",
      };
    default:
      return state;
  }
}

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