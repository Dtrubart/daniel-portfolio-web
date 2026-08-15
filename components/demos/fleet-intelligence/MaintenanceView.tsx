"use client";

import { cn } from "@/lib/utils";
import { StatusBadge } from "./shared";
import {
  type FleetIntelligenceState,
  type FleetIntelligenceAction,
  vehicles,
  drivers,
  maintenanceRecords,
} from "./state";

interface MaintenanceViewProps {
  state: FleetIntelligenceState;
  dispatch: (action: FleetIntelligenceAction) => void;
}

export const MaintenanceView = ({ state, dispatch }: MaintenanceViewProps) => {
  const { selectedVehicleId, selectedDriverId, selectedTeamId, selectedRouteId } = state;

  // Filter maintenance records based on state
  const maintenanceData = maintenanceRecords.filter((record) => {
    if (selectedVehicleId && record.vehicleId !== selectedVehicleId) return false;
    if (selectedDriverId) {
      const driver = drivers.find((d) => d.id === selectedDriverId);
      if (!driver || record.vehicleId !== driver.vehicleId) return false;
    }
    if (selectedTeamId) {
      const teamDrivers = drivers.filter((d) => d.team === selectedTeamId);
      const teamVehicleIds = teamDrivers.map((d) => d.vehicleId);
      if (!teamVehicleIds.includes(record.vehicleId)) return false;
    }
    if (selectedRouteId) {
      const vehicleOnRoute = vehicles.find(
        (v) => v.id === record.vehicleId && v.routeId === selectedRouteId
      );
      if (!vehicleOnRoute) return false;
    }
    return true;
  });

  const handleSelectVehicle = (id: string | null) => {
    dispatch({ type: "SET_NAV", view: "maintenance" });
    dispatch({ type: "SELECT_VEHICLE", id });
  };

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Flexible Maintenance Tracking
        </h3>

        {/* Maintenance Summary */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 border-r border-border/50">
            <span className="font-medium">Total Components Tracked</span>
            <p className="text-lg font-semibold">{maintenanceData.length}</p>
          </div>
          <div className="flex-1 border-r border-border/50">
            <span className="font-medium">Due Soon</span>
            <p className="text-lg font-semibold">
              {maintenanceData.filter((m) => m.status === "Due Soon").length}
            </p>
          </div>
          <div className="flex-1">
            <span className="font-medium">Overdue</span>
            <p className="text-lg font-semibold">
              {maintenanceData.filter((m) => m.status === "Overdue").length}
            </p>
          </div>
        </div>

        {/* Maintenance Table */}
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full table-auto text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Vehicle</th>
                <th className="px-4 py-2 text-left font-semibold">Component</th>
                <th className="px-4 py-2 text-left font-semibold">Last Service</th>
                <th className="px-4 py-2 text-left font-semibold">Interval</th>
                <th className="px-4 py-2 text-left font-semibold">Current Odo</th>
                <th className="px-4 py-2 text-left font-semibold">Remaining</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-popover">
              {maintenanceData.map((record) => {
                const vehicle = vehicles.find((v) => v.id === record.vehicleId);
                const driver = drivers.find((d) => d.vehicleId === record.vehicleId);

                return (
                  <tr key={`${record.vehicleId}-${record.component}`}>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 text-sm">
                          {vehicle?.brand} {vehicle?.model}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: {record.vehicleId}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{record.component}</span>
                        <span className="text-xs text-muted-foreground">
                          Maintenance Item
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {record.lastServiceOdometer.toLocaleString()} km
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {record.interval.toLocaleString()} km
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {record.currentOdometer.toLocaleString()} km
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 transition-all duration-300"
                            style={{
                              width: `${Math.max(0, Math.min(100, (record.remainingDistance / (record.interval || 1)) * 100))}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {record.remainingDistance.toLocaleString()} km
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge
                        value={record.status}
                        tone={
                          record.status === "Overdue" ? "urgent" :
                          record.status === "Due Soon" ? "scheduled" :
                          "closed"
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleSelectVehicle(vehicle?.id || null)}
                        className={cn(
                          "rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/80 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-accent",
                          selectedVehicleId === vehicle?.id && "p-2 text-sm font-medium bg-primary/40"
                        )}
                        disabled={!vehicle}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Maintenance Calculations Section */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Maintenance Calculation Logic
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-secondary/50 p-3 rounded-lg border border-border">
              <h5 className="text-xs font-medium text-foreground mb-1">
                Next Due Calculation
              </h5>
              <p className="font-mono text-xs">
                Next Due = Last Service Odometer + Component Interval
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Example: 40,000 km + 15,000 km = 55,000 km
              </p>
            </div>
            <div className="bg-secondary/50 p-3 rounded-lg border border-border">
              <h5 className="text-xs font-medium text-foreground mb-1">
                Remaining Distance
              </h5>
              <p className="font-mono text-xs">
                Remaining Distance = Next Due - Current Odometer
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Example: 55,000 km - 42,000 km = 13,000 km
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-secondary/50 rounded-lg border border-border">
            <h5 className="text-xs font-medium text-foreground mb-1">
              Status Thresholds (Synthetic)
            </h5>
            <p className="text-xs text-muted-foreground">
              • OK: Remaining Distance &gt; 2,500 km
              • Due Soon: 0 &lt; Remaining Distance ≤ 2,500 km
              • Overdue: Remaining Distance ≤ 0 km
            </p>
            <p className="text-xs text-muted-foreground mt-1 italic">
              Thresholds are synthetic portfolio examples only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};