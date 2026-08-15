"use client";

import { cn } from "@/lib/utils";
import { StatusBadge } from "./shared";
import {
  type FleetIntelligenceState,
  type FleetIntelligenceAction,
  alerts,
  drivers,
} from "./state";

interface AlertsViewProps {
  state: FleetIntelligenceState;
  dispatch: (action: FleetIntelligenceAction) => void;
}

export const AlertsView = ({ state, dispatch }: AlertsViewProps) => {
  const { selectedAlertId, selectedVehicleId, selectedDriverId, selectedTeamId } = state;

  // Filter alerts based on context
  let filteredAlerts = alerts;
  if (selectedAlertId) {
    filteredAlerts = alerts.filter((a) => a.id === selectedAlertId);
  } else if (selectedVehicleId) {
    filteredAlerts = alerts.filter((a) => a.vehicleId === selectedVehicleId);
  } else if (selectedDriverId) {
    const driver = drivers.find((d) => d.id === selectedDriverId);
    if (driver) {
      filteredAlerts = alerts.filter((a) => a.vehicleId === driver.vehicleId);
    }
  } else if (selectedTeamId) {
    const teamDrivers = drivers.filter((d) => d.team === selectedTeamId);
    const teamVehicleIds = teamDrivers.map((d) => d.vehicleId);
    filteredAlerts = alerts.filter((a) => teamVehicleIds.includes(a.vehicleId));
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return "urgent";
      case "Attention":
        return "scheduled";
      default:
        return "neutral";
    }
  };

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Operational Alerts
        </h3>

        {/* Alert Summary */}
        <div className="flex flex-wrap gap-3">
          <div className="px-3 py-1.5 rounded-md bg-secondary border border-border text-sm font-medium">
            {alerts.length} Total Alerts
          </div>
          <div className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 text-sm font-medium text-red-800">
            {alerts.filter((a) => a.severity === "High").length} High Severity
          </div>
          <div className="px-3 py-1.5 rounded-md bg-yellow-50 border border-yellow-200 text-sm font-medium text-yellow-800">
            {alerts.filter((a) => a.severity === "Attention").length} Attention
          </div>
          <div className="px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-sm font-medium text-blue-800">
            {alerts.filter((a) => a.severity === "Info").length} Info
          </div>
        </div>

        {/* Alerts Table */}
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full table-auto text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Severity</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Driver</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Message</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-popover">
              {filteredAlerts.map((alert) => {
                const driver = drivers.find((d) => d.vehicleId === alert.vehicleId);

                return (
                  <tr
                    key={alert.id}
                    className={cn(
                      "align-middle hover:bg-secondary/30 transition-colors cursor-pointer",
                      selectedAlertId === alert.id && "bg-accent/10",
                    )}
                    onClick={() => dispatch({ type: "SELECT_ALERT", id: alert.id })}
                  >
                    <td className="px-4 py-2">
                      <StatusBadge value={alert.severity} tone={getSeverityBadge(alert.severity)} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge value={alert.type} />
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{alert.vehicleId}</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {driver?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-foreground">{alert.message}</td>
                    <td className="px-4 py-2 text-muted-foreground text-sm">
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Alert Detail Panel */}
        {selectedAlertId && (
          <div className="mt-4 py-3 border-t border-border">
            {(() => {
              const alert = alerts.find((a) => a.id === selectedAlertId);
              if (!alert) return null;
              const driver = drivers.find((d) => d.vehicleId === alert.vehicleId);

              return (
                <div className="bg-secondary/30 rounded-lg border border-border p-4">
                  <h4 className="font-semibold text-foreground mb-3">Alert Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="font-medium text-muted-foreground w-24">Type:</span>
                      <StatusBadge value={alert.type} />
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-muted-foreground w-24">Severity:</span>
                      <StatusBadge value={alert.severity} tone={getSeverityBadge(alert.severity)} />
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-muted-foreground w-24">Vehicle:</span>
                      <span className="text-foreground">{alert.vehicleId}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-muted-foreground w-24">Driver:</span>
                      <span className="text-foreground">{driver?.name || "Unassigned"}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-muted-foreground w-24">Condition:</span>
                      <span className="text-muted-foreground">{alert.message}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-muted-foreground w-24">Time:</span>
                      <span className="text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-border text-xs text-muted-foreground italic">
                      This alert represents an investigative signal only.
                      No automated corrective action is implied.
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};