"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ArchitectureDecision } from "@/data/demos/personal-portfolio-platform";
import { architectureDecisions } from "@/data/demos/personal-portfolio-platform";

const statusBadge: Record<ArchitectureDecision["status"], string> = {
  implemented: "Implemented",
  planned: "Planned",
};

export function ArchitectureDecisions({
  expandedDecisions,
  onToggleDecision,
  onBack,
}: {
  expandedDecisions: Record<string, boolean>;
  onToggleDecision: (decisionId: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">
          Architecture Decisions
        </h3>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Overview
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Click to expand a decision and see the problem, decision, trade-off, and
        future reconsideration trigger.
      </p>

      <div className="space-y-3">
        {architectureDecisions.map((decision) => {
          const isExpanded = expandedDecisions[decision.id] ?? false;
          const statusClass =
            decision.status === "implemented"
              ? "bg-green-500/10 text-green-600"
              : "bg-amber-500/10 text-amber-600";
          return (
            <div
              key={decision.id}
              className="rounded-lg border border-border bg-secondary"
            >
              <button
                type="button"
                onClick={() => onToggleDecision(decision.id)}
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="font-medium text-foreground">
                  {decision.title}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold",
                    statusClass,
                  )}
                >
                  {statusBadge[decision.status]}
                </span>
              </button>

              {isExpanded ? (
                <div className="border-t border-border px-4 py-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground/60">
                      Problem
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {decision.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground/60">
                      Decision
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {decision.decision}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground/60">
                      Trade-off
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {decision.tradeOff}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground/60">
                      Future reconsideration trigger
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {decision.futureReconsideration}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
