"use client";

import { cn } from "@/lib/utils";
import { StatusBadge } from "./shared";

interface RPMAnalyticsViewProps {
  state: any;
  dispatch: any;
}

export const RPMAnalyticsView = ({ state, dispatch }: RPMAnalyticsViewProps) => {
  const { selectedVehicleId } = state;
  const vehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          RPM & Engine Behavior Analysis
        </h3>

        {/* Vehicle Selector */}
        <div className="flex items-center space-x-2">
          <label className="font-medium text-muted-foreground">
            Vehicle:
            <select
              className="bg-popover rounded-md p-1 border-b-px border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              onChange={(e) => dispatch({ type: "SELECT_VEHICLE", id: e.target.value })}
              value={selectedVehicleId || ""}
              disabled={!vehicles}
            >
              <option value="" disabled>
                Select Vehicle
              </option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* RPM Thresholds as Summary Table */}
        <div className="space-y-2 border-lg border-flex flex flex-col">
          {vehicles.map((v) => {
            const isSelected = v.id === selectedVehicleId;
            const colorBg = isSelected ? "bg-primary/20" : "bg-secondary/50";
            const colorText = isSelected ? "text-foreground" : "text-muted-foreground";

            // Synthetic RPM thresholds per vehicle type
            const thresholds = {
              idleRangeMax: 1000,
              overRevThreshold: 2200,
            };

            const activeStyle = isSelected
              ? "bg-white rounded-md border border-border border-accent"
              : "bg-white rounded-md bg-secondary rounded-sm shadow-sm";

            return (
              <div key={v.id} className={cn("rounded-md bg-secondary", isSelected && "border-accent bg-primary/10 transition-colors", "p-3 text-sm")}>
                <div className="flex items-center space-between">
                  <span className="font-medium text-primary-700 capitalize">{v.brand} {v.model}</span>
                  <span className={colorText}>{v.telematics?.rpm || 0} RPM current</span>
                </div>

                <div className={activeStyle}>
                  <div className="flex items-center space-between">
                    <span className="font-medium text-primary-600">Idle Threshold</span>
                    
                    <div className="rounded-full flex items-center space-x-2 bg-secondary/50 p-1">
                      <span>{thresholds.idleRangeMax} RPM /</span>
                      <span className={isSelected ? "text-green-600" : "text-muted-foreground"}>
                        {(v.telematics?.idling ? "↑" : "↓")} {
                          (v.telematics?.idling && v.telematics?.rpm > 1500) ? "Elevated" : "Normal"
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-between">
                      <span className="font-medium text-primary-600">Over-Rev Threshold</span>
                      
                      <div className="rounded-full flex items-center space-x-2 bg-secondary/50 p-1">
                        <span>{thresholds.overRevThreshold} RPM /</span>
                        <span className={isSelected ? "text-green-600" : "text-muted-foreground"}>
                          {(v.telematics?.rpm > 1800) ? "Elevated" : "Within Plan"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sample Rate Graph */}
        <div className="mt-5 py-3">
          <h4 className="text-xs font-medium text-secondary-600">RPM Distribution (Sample)</h4>
          <div className="overflow-x-auto rounded-md bg-modal rounded-lg shadow-sm p-2">
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                fill="none"
                d="M3 7l9 9 9-9"
              />
            </svg>
          </div>
        </div>

        {/* Fuel Behavior Summary */}
        <div className="mt-6 py-3 rounded-lg border border-border bg-indigo-50 p-4">
          <h4 className="text-sm text-secondary-700 font-medium mb-2">
            Fuel Behavior Patterns
          </h4>
          <div className="space-y-2 flex flex-col">
            <p className="text-sm text-muted-foreground">
              • {vehicles.length} Vehicles analyzed
            </p>
            <div className="flex flex-wrap gap-2 items-center space-x-3">
              <div className="flex-1">
                <p className="text-sm text-primary-600">
                  Enhanced fuel tracking enabled for comprehensive monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}