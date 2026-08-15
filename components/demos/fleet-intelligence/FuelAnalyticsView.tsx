"use client";

import { useState } from "react";
import { type FleetIntelligenceState, type FleetIntelligenceAction } from "./state";
import { VehicleTelemetry as BaseVehicle } from "@/data/demos/fleet-intelligence";
import { CNPJView } from "./CNPJView";
import { AlertWarning } from "@/components/ui/AlertWarning";
import { StatusBadge } from "./shared";

type Vehicle = BaseVehicle & {
  brand?: string;
  model?: string;
  type?: string;
};

type FuelEvent = {
  id: string;
  vehicleId: string;
  timestamp: string;
  type: "refuel" | "anomaly" | "theft";
  amount?: number;
  authorized: boolean;
};

export interface FuelAnalyticsViewProps {
  state: {
    navView: string;
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
  };
  dispatch: React.Dispatch<any>;
}

export function FuelAnalyticsView({
  state,
  dispatch,
}: FuelAnalyticsViewProps & { driverId: string | null }) {
  const { selectedVehicleId, selectedDriverId, selectedTeamId, selectedRouteId, dateWindow } = state;
  const { comparisonMode } = state;

  // Determine target vehicles - include driver's vehicle if no explicit selection
  const targetVehicleIds = selectedVehicleId
    ? [selectedVehicleId]
    : selectedDriverId
    ? [drivers.find((d) => d.id === selectedDriverId)?.vehicleId || ""]
    : [selectedTeamId ? drivers.find((d) => d.team === selectedTeamId)!.vehicleId : ""];
  
  const targetVehicles = targetVehicleIds.filter(Boolean).map((id) => 
    vehicles.find((v) => v.id === id)
  );

  // Filter events by date range
  const startEvent = new Date(dateWindow.start);
  const endEvent = new Date(dateWindow.end);
  
  const filteredFuelEvents = targetVehicles
    .map((vehicle) => 
      fuelEvents.filter((event) => {
        const eventTime = new Date(event.timestamp);
        return eventTime >= startEvent && eventTime <= endEvent;
      })
    )
    .flat();

  // Calculate fuel efficiency for demonstration
  const calculateFuelEfficiency = (v: Vehicle): number => {
    // Simulated calculation - actual efficiency would come from telemetry
    const baseEfficiency = v.telematics?.fuelEfficiency || 
                         routes.find((r) => r.id.includes(v.id))?.expectedEfficiency || 
                         3.2; // default benchmark
    
    // Apply synthetic benchmark rules
    const efficiencyRatio = (baseEfficiency / 3.0); // 3.0 is our demo benchmark
    return efficiencyRatio;
  };

  // Calculate scores based on synthetic benchmarking
  const calculateFuelPerformanceScore = (vehicle: Vehicle): number => {
    const efficiencyRatio = calculateFuelEfficiency(vehicle);
    if (efficiencyRatio <= 0.75) return 0;
    if (efficiencyRatio >= 1.05) return 100;
    return Math.round(((efficiencyRatio - 0.75) / (1.05 - 0.75)) * 100);
  };

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Fuel Analytics
        </h3>
        
        {/* Vehicle Selector */}
        <div className="flex items-center space-x-2">
          <label className="font-medium text-muted-foreground">
            Monitor Vehicle:
            <select
              className="bg-popover rounded-md p-1 border-b-px border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              onChange={e => dispatch({ type: "SELECT_VEHICLE", id: e.target.value }) }
            >
              <option value="">All</option>
              {targetVehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model}
                </option>
              ))}
            </select>
          </label>
          
          <div className="p-2 rounded-m-sm px-3 py-2 border border-border justify-end">
            <button
              className={cn(
                "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-accent",
                selectedVehicleId && "p-2 text-sm font-medium bg-primary/40"
              )}
              onClick={() => dispatch({ type: "SET_DATE_WINDOW", 
                start: "2026-01-01", end: "2026-12-31" })}
              >Change Analysis Period</button>
          </div>
        </div>

        {/* Fuel Performance Score */}
        {targetVehicles[0] && (
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <div className="flex items-center gap-x-2">
                <div className="flex-1 bg-progress rounded-md overflow-hidden h-3">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${calculateFuelPerformanceScore(targetVehicles[0])}%` }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Fuel Performance Score
                  </p>
                  <p className="text-lgi font-bold text-emerald-600">
                    {calculateFuelPerformanceScore(targetVehicles[0])}%
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {calculateFuelPerformanceScore(targetVehicles[0]) >= 80 ? (
                  "Performance meets synthetic benchmark"
                ) : (
                  "Consider route optimization and load management"
                )}
              </p>
            </div>
          </div>
        )}

        {/* Fuel Efficiency Summary */}
        <div className="flex items-center gap-x-6 py-3">
          <div className="rounded-full bg-primary/30 p-2 flex items-center justify-center">
            <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7L12 14l-7 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Avg Fuel Efficiency:{" "}
              {targetVehicles.length > 0 ? 
                Math.round(
                  (vehicles.reduce((sum, v) => sum + 
                    (v.telematics?.fuelEfficiency || 
                     routes.find(r => r.id.includes(v.id))?.expectedEfficiency || 3.2), 0) / 
                    vehicles.length)
                : 0)}
                km/L
            </p>
            <p className="text-sm text-muted-foreground">
              Synthetic Baseline: 3.0 km/L (±5% tolerance)
            </p>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Synthetic Benchmarks
                </p>
                <div className="flex flex-col space-y-1">
                  <p className="text-xs text-midnight-blue-400">
                    • ≤0.75 ratio → Score 0
                    • ≥1.05 ratio → Score 100
                    • Linear interpolation between
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    Core synthetic benchmark: 1.0 ratio = 100-score
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-primary-600">
                {targetVehicles.length > 0 ? 
                  `Current Ratio: ${calculateFuelPerformanceScore(targetVehicles[0]).toFixed(1)}` : 
                  "Current Ratio: N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Potential Fuel Theft Alerts */}
        <div className="mt-4 sj">
          <h4 className="text-lg font-semibold text-foreground">Detected Fuel Anomalies</h4>
          <div className="rounded-lg border border-border bg-popover p-3">
            {filteredFuelEvents.length > 0 ? (
              <div className="scroll-y-1 h-32 rounded-md">
                {filteredFuelEvents.map((event, index) => (
                  <AlertWarning 
                    severity={event.type === "theft" ? "High" : event.type === "anomaly" ? "Attention" : "Info"}
                    message="Fuel-level anomaly detected"
                    context={
                      event.type === "theft" 
                        ? "Vehicle stationary, ignition OFF, unauthorized event"
                        : "Unauthorized fuel drop without refuel record"
                    }
                  />
                ))}
              </div>
            ) : (
              <AlertWarning severity="Info" message="No fuel anomalies detected" />
            )}
          </div>
        </div>

        {/* Efficiency Visualization */}
        <div className="mt-6 bg-secondary/5 rounded-lg border border-border p-4 border-primary">
          <div className="fx-fluid-measure w-full h-6 rounded-md overflow-hidden bg-white">
            <div style={{ width: "100%" }}>
              <div className="flex-1 bg-emerald-500 transition-width duration-1000" 
                style={{ width: `${100-(targetVehicles.length * 2)}%` }}
              />
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground flex items-center justify-center">
            <svg className="mr-1" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <circle className="stroke-2 stroke-currentColor opacity-70" cx="12" cy="12" r="10" />
            </svg>
            <span>Fuel Consumption Efficiency</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function AlertWarning({ severity, message, context }: {
  severity: string;
  message: string;
  context?: string;
}): JSX.Element {
  const severityMap: Record<string, string> = {
    High: "border-primary",
    Attention: "border-amber-500",
    Info: "border-blue-500",
  };
  
  return (
    <div
      className={cn(
        "border-l-4 border-red-500 bg-red-50 p-3 rounded-sm",
        severityMap[severity] || severityMap.Info,
        "p-2",
        "rounded-sm",
        "font-sm",
        "font-medium",
      )}
    >
      <p className="font-semibold text-emergency-pigment">
        {severity} ALERT
      </p>
      <p className="mt-1 text-muted-foreground">{message}</p>
      {context && (
        <p className="mt-1 italic text-muted-foreground">
          Reason: {context}
        </p>
      )}
    </div>
  );
}