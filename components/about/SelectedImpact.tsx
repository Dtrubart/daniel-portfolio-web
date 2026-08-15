"use client";

import { useState } from "react";

import { professionalFacts } from "@/data/professional-facts";

export function SelectedImpact() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="impact"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Selected Impact
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Evidence-aware outcomes. Each metric is contextualized with its
          operational setting; attribution is stated conservatively.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl px-6 md:px-0">
        <div className="grid gap-6 sm:grid-cols-2">
          {professionalFacts.selectedImpact.map((impact) => {
            const isExpanded = expandedId === impact.id;

            return (
              <div
                key={impact.id}
                className="rounded-lg border border-border bg-popover p-5"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-2xl font-bold text-accent">
                      {impact.metric}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {impact.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggle(impact.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`impact-detail-${impact.id}`}
                    className="inline-flex items-center self-start rounded-md px-3 py-1.5 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {isExpanded ? "Show less ↑" : "View context →"}
                  </button>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {impact.context}
                </p>

                {isExpanded && (
                  <div
                    id={`impact-detail-${impact.id}`}
                    className="mt-4 rounded-md border border-border bg-secondary/50 p-4"
                  >
                    <p className="text-xs text-muted-foreground/60">
                      Safe attribution:{" "}
                      <span className="font-medium text-foreground">
                        {impact.safeWording}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}