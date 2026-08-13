"use client";

import type { ERPScenario, TraceabilityEvent } from "@/data/demos/vanbags-erp";

export function TraceabilityPanel({ scenario }: { scenario: ERPScenario }) {
  const events = scenario.events;

  if (events.length === 0) {
    return (
      <p
        aria-live="polite"
        className="text-sm text-muted-foreground"
      >
        No traceability events recorded for this scenario.
      </p>
    );
  }

  return (
    <ol className="space-y-4">
      {events.map((event, index) => (
        <EventRow key={`${event.timestamp}-${event.event}-${index}`} event={event} />
      ))}
    </ol>
  );
}

function EventRow({ event }: { event: TraceabilityEvent }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 block h-2 w-2 shrink-0 rounded-full bg-muted-foreground"
      />
      <div className="min-w-0">
        <p className="text-sm">
          <span className="font-medium text-foreground">{event.event}</span>
          <span className="text-muted-foreground">
            {" "}
            ({event.timestamp})
          </span>
        </p>
        {event.document ? (
          <p className="mt-0.5 text-xs text-muted-foreground">
            Document: {event.document}
          </p>
        ) : null}
        {event.previousValue !== undefined || event.newValue !== undefined ? (
          <p className="mt-0.5 text-xs text-muted-foreground">
            Previous: {event.previousValue ?? "—"} → New:{" "}
            {event.newValue ?? "—"}
          </p>
        ) : null}
        {event.status ? (
          <p className="mt-1 text-xs font-medium text-amber-800 dark:text-amber-300">
            {event.status}
          </p>
        ) : null}
      </div>
    </li>
  );
}
