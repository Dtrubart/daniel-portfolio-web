"use client";

import { cn } from "@/lib/utils";
import {
  type FleetIntelligenceState,
  type FleetIntelligenceAction,
  vehicles,
  drivers,
  routes,
} from "./state";

interface RoutesViewProps {
  state: FleetIntelligenceState;
  dispatch: (action: FleetIntelligenceAction) => void;
}

export const RoutesView = ({ state, dispatch }: RoutesViewProps) => {
  const { selectedRouteId, selectedVehicleId, selectedDriverId, selectedTeamId } = state;

  const targetRoute = selectedRouteId
    ? routes.find((r) => r.id === selectedRouteId)
    : routes[0];

  const targetVehicles = selectedRouteId
    ? vehicles.filter((v) => v.routeId === selectedRouteId)
    : vehicles;

  const targetDrivers = targetVehicles.reduce((acc, v) => {
    const driver = drivers.find((d) => d.vehicleId === v.id);
    if (driver) acc.push(driver);
    return acc;
  }, [] as typeof drivers);

  const getRouteMetrics = (route: typeof routes[0]) => {
    const routeVehicles = vehicles.filter((v) => v.routeId === route.id);
    const routeDrivers = routeVehicles.reduce((acc, v) => {
      const d = drivers.find((driver) => driver.vehicleId === v.id);
      if (d) acc.push(d);
      return acc;
    }, [] as typeof drivers);

    const avgEfficiency =
      routeVehicles.length > 0
        ? routeVehicles.reduce(
            (s, v) => s + (v.telematics?.fuelEfficiency || route.expectedEfficiency),
            0,
          ) / routeVehicles.length
        : route.expectedEfficiency;

    const avgIdle =
      routeDrivers.length > 0
        ? routeDrivers.reduce((s, d) => s + d.idlePercentage, 0) / routeDrivers.length
        : 0;

    const avgBraking =
      routeDrivers.length > 0
        ? routeDrivers.reduce((s, d) => s + d.brakingEventsPerKm, 0) / routeDrivers.length
        : 0;

    const avgHarshAccel =
      routeDrivers.length > 0
        ? routeDrivers.reduce((s, d) => s + d.harshAccelerationEventsPerKm, 0) / routeDrivers.length
        : 0;

    const avgDriverScore =
      routeDrivers.length > 0
        ? routeDrivers.reduce((s, d) => s + d.driverScore, 0) / routeDrivers.length
        : 0;

    return {
      distanceKm: route.distanceKm,
      avgEfficiency,
      avgIdle,
      avgBraking,
      avgHarshAccel,
      avgDriverScore,
    };
  };

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Route Intelligence
        </h3>

        {/* Route Selector */}
        <div className="flex items-center space-x-2">
          <label className="font-medium text-muted-foreground">
            Route:
            <select
              className="bg-popover rounded-md p-1 border-b-px border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              onChange={(e) => dispatch({ type: "SELECT_ROUTE", id: e.target.value })}
              value={selectedRouteId || ""}
            >
              <option value="">All Routes</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.origin} → {r.destination}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Route Metrics */}
        {targetRoute && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 py-4 pr-4">
            <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground">Distance</div>
              <div className="text-xl font-bold text-primary-700">{targetRoute.distanceKm} km</div>
            </div>
            <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground">Fuel Efficiency</div>
              <div className="text-xl font-bold text-emerald-600">
                {getRouteMetrics(targetRoute).avgEfficiency.toFixed(2)} km/L
              </div>
            </div>
            <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground">Idle %</div>
              <div className="text-xl font-bold text-amber-600">
                {getRouteMetrics(targetRoute).avgIdle.toFixed(1)}%
              </div>
            </div>
            <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground">Braking /km</div>
              <div className="text-xl font-bold text-rose-600">
                {getRouteMetrics(targetRoute).avgBraking.toFixed(3)}
              </div>
            </div>
            <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground">Avg Driver Score</div>
              <div className="text-xl font-bold text-indigo-600">
                {getRouteMetrics(targetRoute).avgDriverScore.toFixed(1)}
              </div>
            </div>
          </div>
        )}

        {/* Route Context Warning */}
        <div className="mt-4 rounded-lg border border-border p-3 bg-secondary/30">
          <p className="text-xs text-muted-foreground">
            <strong>Route Context Notice:</strong> Fuel efficiency benchmarks vary significantly based on route length. Urban routes typically have lower efficiency due to frequent stops. Compare performance within the same route type for accurate analysis.
          </p>
        </div>

        {/* All Routes Comparison */}
        {!selectedRouteId && (
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full table-auto text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Route</th>
                  <th className="px-4 py-2 text-right font-semibold text-xs uppercase tracking-wider">Distance (km)</th>
                  <th className="px-4 py-2 text-right font-semibold text-xs uppercase tracking-wider">Expected Efficiency (km/L)</th>
                  <th className="px-4 py-2 text-right font-semibold text-xs uppercase tracking-wider">Avg Driver Score</th>
                  <th className="px-4 py-2 text-center font-semibold text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-popover">
                {routes.map((r) => {
                  const metrics = getRouteMetrics(r);
                  const status = metrics.avgEfficiency >= r.expectedEfficiency ? "On Target" : "Needs Review";
                  const statusTone = metrics.avgEfficiency >= r.expectedEfficiency ? "closed" : "scheduled";
                  return (
                    <tr
                      key={r.id}
                      className={cn(
                        "cursor-pointer hover:bg-secondary/30 transition-colors",
                        selectedRouteId === r.id && "bg-accent/10",
                      )}
                      onClick={() => dispatch({ type: "SELECT_ROUTE", id: r.id })}
                    >
                      <td className="px-4 py-2 text-left font-medium text-foreground">
                        {r.origin} → {r.destination}
                      </td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {r.distanceKm.toFixed(1)}
                      </td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {metrics.avgEfficiency.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {metrics.avgDriverScore.toFixed(1)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <StatusBadge value={status} tone={statusTone} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};