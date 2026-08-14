"use client";

import { dashboardCounts } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";

const CARD_LABELS: { label: string; key: keyof ReturnType<typeof dashboardCounts> }[] =
  [
    { label: "Equipment / Vehicles", key: "equipment" },
    { label: "Open Requests", key: "openRequests" },
    { label: "Open Work Orders", key: "openWorkOrders" },
    { label: "PM Due", key: "pmDue" },
    { label: "Parts Shortages", key: "shortages" },
    { label: "Vehicles Under Maintenance", key: "vehiclesUnderMaintenance" },
  ];

export function DashboardView({ state }: { state: MaintenanceState }) {
  const counts = dashboardCounts(state);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CARD_LABELS.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-border bg-secondary p-4"
        >
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            {card.label}
          </dt>
          <dd className="mt-1 text-2xl font-bold text-foreground">
            {counts[card.key]}
          </dd>
        </div>
      ))}
    </div>
  );
}
