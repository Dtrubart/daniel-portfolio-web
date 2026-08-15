"use client";

import { fleetSnapshot } from "@/data/demos/fleet-intelligence";
import type { FleetIntelligenceState, FleetIntelligenceAction } from "./state";

export function FleetOverviewView({
  state,
  dispatch,
}: {
  state: FleetIntelligenceState;
  dispatch: (action: FleetIntelligenceAction) => void;
}) {
  void state;
  void dispatch;

  const kpis = [
    { label: "Active Vehicles", value: fleetSnapshot.activeVehicles },
    { label: "Vehicles Requiring Attention", value: fleetSnapshot.vehiclesRequiringAttention },
    { label: "Fuel Alerts", value: fleetSnapshot.fuelAlerts },
    { label: "Maintenance Due Soon", value: fleetSnapshot.maintenanceDueSoon },
    { label: "Maintenance Overdue", value: fleetSnapshot.maintenanceOverdue },
    { label: "Average Driver Score", value: fleetSnapshot.averageDriverScore },
    { label: "Average Team Score", value: fleetSnapshot.averageTeamScore },
  ];

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Operational Overview
        </h3>

        {/* Summary KPIs */}
        <div className="flex flex-wrap gap-4 items-center">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-primary/20 text-sm rounded-lg border border-border px-3 py-2 text-left">
              <span className="rounded-full px-2 py-1 text-primary-700">
                {kpi.label}
              </span>
              <span className="font-medium text-primary-600">
                {kpi.value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-modal rounded-lg shadow-sm p-4">
          <h4 className="text-xs font-medium text-secondary-600 mb-2">
            Fleet Summary
          </h4>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-600">•</span> {fleetSnapshot.activeVehicles} active vehicles
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-600">•</span> Incidents requiring attention:{" "}
            {fleetSnapshot.vehiclesRequiringAttention}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-600">•</span> Fuel alarms: {fleetSnapshot.fuelAlerts}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-600">•</span> Maintenance:{" "}
            {fleetSnapshot.maintenanceDueSoon} due soon, {fleetSnapshot.maintenanceOverdue} overdue
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-600">•</span> Average driver score: {fleetSnapshot.averageDriverScore.toFixed(1)}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-600">•</span> Average team score: {fleetSnapshot.averageTeamScore.toFixed(1)}
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-popover p-4">
          <h4 className="text-xs text-secondary-700 font-medium mb-2">
            Synthetic Benchmarks
          </h4>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li><span className="font-medium text-primary-600">Average Driver Score:</span>
              {fleetSnapshot.averageDriverScore.toFixed(0)}/100</li>
            <li><span className="font-medium text-primary-600">Synthetic Benchmark:</span>
              {fleetSnapshot.averageTeamScore.toFixed(0)}/100</li>
            <li><span className="font-medium text-primary-600">Alerts Confirmed:</span>
              {fleetSnapshot.fuelAlerts}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
