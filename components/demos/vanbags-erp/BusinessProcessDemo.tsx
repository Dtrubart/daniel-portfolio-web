"use client";

import { useState } from "react";
import {
  DEFAULT_SCENARIO_ID,
  SCENARIOS,
  type ScenarioId,
} from "@/data/demos/vanbags-erp";
import { ScenarioSelector } from "./ScenarioSelector";
import { OrderSummary } from "./OrderSummary";
import { WorkflowVisualization } from "./WorkflowVisualization";
import { TraceabilityPanel } from "./TraceabilityPanel";

export function BusinessProcessDemo() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>(
    DEFAULT_SCENARIO_ID,
  );
  const scenario = SCENARIOS[scenarioId];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Scenario</h3>
        <p className="text-sm text-muted-foreground">
          Select a predefined business scenario to explore how committed
          quantities flow through production, packaging, shipment, and delivery.
        </p>
        <ScenarioSelector value={scenarioId} onChange={setScenarioId} />
      </section>

      <div className="rounded-lg border border-border bg-secondary/40 p-5">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Scenario context
        </h3>
        <p className="mt-1 text-sm text-foreground">
          {scenario.description}
          {scenario.customerReference
            ? ` Customer reference: ${scenario.customerReference}.`
            : null}
        </p>
        {scenario.note ? (
          <p className="mt-2 text-sm italic text-muted-foreground">
            {scenario.note}
          </p>
        ) : null}
      </div>

      <OrderSummary scenario={scenario} />

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Order-to-Delivery Workflow
        </h3>
        <p className="text-sm text-muted-foreground">
          Stage statuses are derived from the scenario quantities.
        </p>
        <WorkflowVisualization scenario={scenario} />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Simulated Traceability
        </h3>
        <p className="text-sm text-muted-foreground">
          Simulated event history. Not an actual ERP audit log.
        </p>
        <TraceabilityPanel scenario={scenario} />
      </section>
    </div>
  );
}
