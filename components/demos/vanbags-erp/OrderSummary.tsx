"use client";

import type { ERPScenario } from "@/data/demos/vanbags-erp";
import { computeKPIs } from "@/data/demos/vanbags-erp";

export function OrderSummary({ scenario }: { scenario: ERPScenario }) {
  const kpis = computeKPIs(scenario);

  return (
    <section
      aria-labelledby="order-summary-heading"
      className="space-y-3"
    >
      <h3 id="order-summary-heading" className="text-lg font-semibold text-foreground">
        Order Summary
      </h3>
      <p className="text-sm text-muted-foreground">
        Operational quantities for the selected scenario. These are not
        performance metrics.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-md border border-border bg-popover px-4 py-3 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {kpi.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">{kpi.value}</p>
            {kpi.hint ? (
              <p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
