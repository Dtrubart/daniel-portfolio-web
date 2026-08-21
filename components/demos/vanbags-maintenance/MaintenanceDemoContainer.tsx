"use client";

import { useState } from "react";

import { GuidedMaintenanceTour } from "./guided/GuidedMaintenanceTour";
import { FreeExplorationShell } from "./FreeExplorationShell";

type MaintenanceMode = "guided" | "explore";

const modes: { id: MaintenanceMode; label: string; desc: string }[] = [
  {
    id: "guided",
    label: "Guided Tour",
    desc: "Step-by-step walkthrough with action-gated advancement.",
  },
  {
    id: "explore",
    label: "Explore Freely",
    desc: "Navigate through modules and reports independently.",
  },
];

export function MaintenanceDemoContainer() {
  const [mode, setMode] = useState<MaintenanceMode>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode") === "guided" || params.get("mode") === "explore") {
        return params.get("mode") as MaintenanceMode;
      }
    }
    return "guided";
  });

  const selectedMode = modes.find((m) => m.id === mode) ?? modes[0];

  return (
    <div className="space-y-4">
      <div
        role="radiogroup"
        aria-label="Maintenance demo mode selector"
        className="flex flex-col sm:flex-row gap-3"
      >
        {modes.map((m) => {
          const isActive = mode === m.id;
          return (
            <label
              key={m.id}
              className={
                "flex-1 cursor-pointer rounded-lg border p-4 transition-all " +
                (isActive
                  ? "border-accent bg-accent/5 ring-2 ring-accent"
                  : "border-border hover:border-accent/50")
              }
            >
              <input
                type="radio"
                name="mode"
                value={m.id}
                checked={isActive}
                onChange={() => setMode(m.id)}
                className="sr-only"
                aria-label={m.label}
              />
              <div className="flex items-center gap-3">
                <div
                  className={
                    "w-2 h-2 rounded-full " +
                    (isActive ? "bg-accent" : "bg-muted-foreground/50")
                  }
                />
                <div>
                  <p className="font-medium text-foreground">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">
          {selectedMode.label === "Guided Tour"
            ? "Recommended for first-time visitors. Follow the guided walkthrough."
            : "Navigate directly through Maintenance, PM, and Tire Management modules."}
        </p>
        {mode === "guided" ? <GuidedMaintenanceTour /> : <FreeExplorationShell />}
      </div>
    </div>
  );
}
