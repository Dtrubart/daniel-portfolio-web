"use client";

import { cn } from "@/lib/utils";
import {
  type FleetIntelligenceState,
  type FleetIntelligenceAction,
  drivers,
  vehicles,
  type Driver,
} from "./state";

interface DriversViewProps {
  state: FleetIntelligenceState;
  dispatch: (action: FleetIntelligenceAction) => void;
}

export const DriversView = ({ state, dispatch }: DriversViewProps) => {
  const { selectedDriverId, selectedTeamId, selectedRouteId } = state;

  // Determine which drivers to show
  let targetDrivers: Driver[] = [];
  if (selectedDriverId) {
    const d = drivers.find((driver) => driver.id === selectedDriverId);
    if (d) targetDrivers = [d];
  } else if (selectedTeamId) {
    targetDrivers = drivers.filter((d) => d.team === selectedTeamId);
  } else if (selectedRouteId) {
    targetDrivers = drivers.filter((d) => 
      d.vehicleId && vehicles.some((v) => v.id === d.vehicleId && v.routeId === selectedRouteId)
    );
  } else {
    targetDrivers = drivers;
  }

  // Sort by driver score (highest first)
  targetDrivers = targetDrivers.sort((a, b) => b.driverScore - a.driverScore);

  // Calculate normalized scores using the spec's negative-metric normalization
  const goodIdle = 10;
  const poorIdle = 35;
  const goodOverRev = 1;
  const poorOverRev = 10;
  const goodBraking = 0.05;
  const poorBraking = 0.30;
  const goodAccel = 0.04;
  const poorAccel = 0.25;

  const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  };

  const calculateIdleScore = (idle: number) => {
    return Math.round(clamp(((poorIdle - idle) / (poorIdle - goodIdle)) * 100, 0, 100));
  };

  const calculateOverRevScore = (overRev: number) => {
    return Math.round(clamp(((poorOverRev - overRev) / (poorOverRev - goodOverRev)) * 100, 0, 100));
  };

  const calculateBrakingScore = (braking: number) => {
    return Math.round(clamp(((poorBraking - braking) / (poorBraking - goodBraking)) * 100, 0, 100));
  };

  const calculateAccelScore = (accel: number) => {
    return Math.round(clamp(((poorAccel - accel) / (poorAccel - goodAccel)) * 100, 0, 100));
  };

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Driver Performance & Ranking
        </h3>

        {/* Driver Stats Summary */}
        <div className="flex flex-col sm:flex-row gap-2">
          {targetDrivers.map((d) => (
            <div
              key={d.id}
              className={cn(
                "flex-1 rounded-md bg-secondary border border-border p-3 text-center",
                "hover:bg-primary/10 transition-colors",
                selectedDriverId === d.id && "border-accent bg-accent/20",
              )}
              onClick={() => dispatch({ type: "SELECT_DRIVER", id: d.id })}
            >
              <div className="text-2xl font-bold text-foreground">{d.driverScore}</div>
              <div className="text-sm text-muted-foreground">{d.name}</div>
              <div className="text-xs text-muted-foreground">{d.team}</div>
            </div>
          ))}
        </div>

        {/* Five Dimensions Table */}
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full table-auto text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Rank</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Driver</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Team</th>
                <th className="px-4 py-2 text-right font-semibold text-xs uppercase tracking-wider">Score</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Idle %</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Over-Rev %</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Braking /km</th>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Harsh Accel /km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-popover">
              {targetDrivers.map((d, index) => (
                <tr key={d.id} className="align-middle">
                  <td className="px-4 py-2 font-medium text-foreground">{index + 1}</td>
                  <td className="px-4 py-2 font-medium text-foreground">{d.name}</td>
                  <td className="px-4 py-2 text-muted-foreground text-sm">{d.team}</td>
                  <td className="px-4 py-2 font-medium text-foreground text-right">{d.driverScore}</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">{d.idlePercentage}%</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">{d.overRevPercentage}%</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">{d.brakingEventsPerKm}</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">{d.harshAccelerationEventsPerKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Radar Chart Section */}
        <div className="mt-6 py-4 border-t border-border">
          <h4 className="mb-3 text-sm font-semibold text-foreground">Driver Performance Radar</h4>

          {targetDrivers.length > 0 && (
            <div className="flex items-center gap-8">
              {targetDrivers.map((d) => {
                const idleScore = calculateIdleScore(d.idlePercentage);
                const overRevScore = calculateOverRevScore(d.overRevPercentage);
                const brakingScore = calculateBrakingScore(d.brakingEventsPerKm);
                const accelScore = calculateAccelScore(d.harshAccelerationEventsPerKm);
                const fuelScore = Math.round(d.fuelPerformance);

                return (
                  <div
                    key={d.id}
                    className="flex-1 rounded-xl border border-border p-4 bg-secondary"
                  >
                    <h5 className="mb-3 font-medium text-primary-700">{d.name}</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Fuel</span>
                        <span>{fuelScore}%</span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(fuelScore, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Idle</span>
                        <span>{idleScore}%</span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(idleScore, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Over-Rev</span>
                        <span>{overRevScore}%</span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(overRevScore, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Braking</span>
                        <span>{brakingScore}%</span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(brakingScore, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Harsh Accel</span>
                        <span>{accelScore}%</span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(accelScore, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};