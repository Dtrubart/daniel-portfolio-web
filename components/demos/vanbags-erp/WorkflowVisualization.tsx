"use client";

import { cn } from "@/lib/utils";
import {
  computeWorkflow,
  type ERPScenario,
  type StageStatus,
} from "@/data/demos/vanbags-erp";

const statusText: Record<StageStatus, string> = {
  completed: "Completed",
  active: "In progress",
  pending: "Pending",
  exception: "Exception",
};

const statusPill: Record<StageStatus, string> = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  active: "bg-accent text-accent-foreground",
  pending: "bg-secondary text-secondary-foreground",
  exception: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const statusCircle: Record<StageStatus, string> = {
  completed: "bg-green-600",
  active: "bg-accent",
  pending: "bg-muted-foreground",
  exception: "bg-red-600",
};

const statusGlyph: Record<StageStatus, string> = {
  completed: "✓",
  active: "●",
  pending: "○",
  exception: "⚠",
};

export function WorkflowVisualization({
  scenario,
}: {
  scenario: ERPScenario;
}) {
  const stages = computeWorkflow(scenario);

  return (
    <ol className="space-y-5">
      {stages.map((stage, index) => {
        const isFirst = index === 0;
        return (
          <li key={stage.id} className="flex items-start gap-4">
            {!isFirst ? (
              <div
                aria-hidden="true"
                className="-ml-6 -mt-1 h-6 w-px -translate-y-1/2 self-stretch bg-border"
              />
            ) : null}
            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 rounded-full",
                  statusCircle[stage.status],
                )}
              />
              <span className="relative z-10 text-xs font-bold text-white">
                {index + 1}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground">
                  {stage.label}
                </span>
                <span
                  aria-label={`Status: ${statusText[stage.status]}`}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusPill[stage.status],
                  )}
                >
                  <span aria-hidden="true">{statusGlyph[stage.status]}</span>
                  {statusText[stage.status]}
                </span>
              </div>
              {stage.note ? (
                <p className="mt-1 text-xs text-muted-foreground">{stage.note}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
