"use client";

import { cn } from "@/lib/utils";
import {
  SCENARIOS,
  SCENARIO_IDS,
  computeShipped,
  fmt,
  type ScenarioId,
} from "@/data/demos/vanbags-erp";

export function ScenarioSelector({
  value,
  onChange,
}: {
  value: ScenarioId;
  onChange: (value: ScenarioId) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Select a business scenario"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {SCENARIO_IDS.map((scenarioId) => {
        const scenario = SCENARIOS[scenarioId];
        const selected = value === scenarioId;
        const shipped = computeShipped(scenario);
        return (
          <label
            key={scenarioId}
            className={cn(
              "block cursor-pointer rounded-md border p-4 text-sm",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              selected
                ? "border-accent bg-secondary/40"
                : "border-border bg-popover hover:border-accent",
            )}
          >
            <input
              type="radio"
              name="scenario"
              value={scenarioId}
              checked={selected}
              onChange={() => onChange(scenarioId)}
              className="sr-only"
              aria-label={`Select scenario ${scenario.name}`}
            />
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">{scenario.name}</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {scenario.description}
                </p>
              </div>
              {selected ? (
                <span className="text-xs font-medium text-accent">
                  Selected
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Committed {fmt(scenario.committedQuantity)} · Shipped {fmt(shipped)}
            </p>
          </label>
        );
      })}
    </div>
  );
}
