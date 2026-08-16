"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { professionalFacts, type EmploymentFact } from "@/data/professional-facts";

export function CareerJourney() {
  const [selectedStageId, setSelectedStageId] = useState<string | null>("operational-intelligence");
  const stages = professionalFacts.careerStages;

  const selectedStage = stages.find((s) => s.id === selectedStageId);

  const relatedEmployment = selectedStage?.employmentIds
    ? selectedStage.employmentIds
        .map((id) =>
          professionalFacts.employment.find((e) => e.id === id),
        )
        .filter((e): e is EmploymentFact => e !== undefined)
    : [];

  const relatedWorkIds = new Set<string>();
  for (const emp of relatedEmployment) {
    if (emp.relatedWorkIds) {
      for (const wid of emp.relatedWorkIds) {
        relatedWorkIds.add(wid);
      }
    }
  }

  const relatedWork = Array.from(relatedWorkIds)
    .map((id) => professionalFacts.selectedWork.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => w !== undefined);

  const isCurrentStage = (stage: (typeof stages)[number]) =>
    stage.isCurrentDirection === true;

  const isHighlighted = (stage: (typeof stages)[number]) =>
    stage.highlight === true;

  const isStageSelected = (stageId: string) => stageId === selectedStageId;

  return (
    <section
      id="journey"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Career Journey
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Seven stages of professional evolution — from engineering foundations
          to architecting data-driven operations and intelligent enterprise
          systems.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl px-6 md:px-0">
        {/* Desktop: Horizontal timeline */}
        <div
          className="hidden md:block"
          aria-label="Career stages timeline"
        >
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />

            {/* Stage nodes */}
            <div className="relative flex justify-between">
              {stages.map((stage, index) => {
                const isSelected = isStageSelected(stage.id);
                const isHighlightedStage = isHighlighted(stage);
                const isCurrent = isCurrentStage(stage);

                return (
                  <div
                    key={stage.id}
                    className="flex flex-col items-center"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedStageId(stage.id)}
                      aria-current={isSelected ? "step" : undefined}
                      aria-label={`Stage ${index + 1}: ${stage.title}, ${stage.period}`}
                      className={cn(
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isSelected
                          ? "h-11 w-11 border-2 border-accent bg-accent text-accent-foreground ring-1 ring-accent/30"
                          : isHighlightedStage || isCurrent
                            ? "border-2 border-accent/40 bg-accent text-accent-foreground"
                            : "border-2 border-border bg-secondary text-muted-foreground hover:border-border/60",
                      )}
                    >
                      {index + 1}
                    </button>

                    <span
                      className="mt-2 block text-center text-xs text-muted-foreground"
                      aria-hidden="true"
                    >
                      {stage.period}
                    </span>

                    <span
                      className={cn(
                        "mt-1 block text-center text-sm font-semibold",
                        isSelected
                          ? "text-accent"
                          : isHighlightedStage || isCurrent
                          ? "text-accent"
                          : "text-foreground",
                      )}
                    >
                      {stage.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div
          className="relative block md:hidden"
          aria-label="Career stages timeline"
        >
          <div className="absolute top-0 bottom-0 left-4 w-px bg-border" />

          <div className="space-y-4">
            {stages.map((stage, index) => {
              const isSelected = isStageSelected(stage.id);
              const isHighlightedStage = isHighlighted(stage);
              const isCurrent = isCurrentStage(stage);

              return (
                <div key={stage.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    aria-current={isSelected ? "step" : undefined}
                    aria-label={`Stage ${index + 1}: ${stage.title}, ${stage.period}`}
                    className={cn(
                      "relative flex items-center gap-3 rounded-md border-2 bg-popover px-3 py-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isSelected
                        ? "border-accent ring-1 ring-accent/30"
                        : isHighlightedStage || isCurrent
                        ? "border-accent/40"
                        : "border-border hover:border-border/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : isHighlightedStage || isCurrent
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-muted-foreground",
                      )}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-xs font-medium",
                          isSelected || isHighlightedStage || isCurrent
                            ? "text-accent"
                            : "text-muted-foreground",
                        )}
                      >
                        {stage.period}
                      </p>
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          isSelected
                            ? "text-accent"
                            : isHighlightedStage || isCurrent
                            ? "text-accent"
                            : "text-foreground",
                        )}
                      >
                        {stage.title}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected stage detail card */}
        {selectedStage && (
          <div
            id={`stage-detail-${selectedStage.id}`}
            className="mt-12 rounded-lg border border-border bg-popover p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    isHighlighted(selectedStage) || isCurrentStage(selectedStage)
                      ? "bg-accent text-accent-foreground ring-1 ring-accent/30"
                      : "bg-secondary text-muted-foreground",
                  )}
                  aria-hidden="true"
                >
                  {stages.indexOf(selectedStage) + 1}
                </span>
                <div>
                  <h3
                    className={cn(
                      "text-xl font-bold",
                      isHighlighted(selectedStage) || isCurrentStage(selectedStage)
                        ? "text-accent"
                        : "text-foreground",
                    )}
                  >
                    {selectedStage.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedStage.period}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStageId(null)}
                aria-label="Collapse stage detail"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Show less ↑
              </button>
            </div>

            <p className="mt-3 text-sm italic text-muted-foreground">
              {selectedStage.theme}
            </p>

            {selectedStage.evolution && (
              <p className="mt-3 text-sm text-muted-foreground/70">
                Evolution: {selectedStage.evolution}
              </p>
            )}

            {selectedStage.domains.length > 0 && (
              <div className="mt-4">
                <p className="font-medium text-foreground">
                  Key domains
                </p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {selectedStage.domains.map((domain) => (
                    <li
                      key={domain}
                      className="text-xs text-muted-foreground"
                    >
                      {domain}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedStage.focus && selectedStage.focus.length > 0 && (
              <div className="mt-4">
                <p className="font-medium text-foreground">
                  Current focus areas
                </p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {selectedStage.focus.map((focusItem) => (
                    <li
                      key={focusItem}
                      className="text-xs text-muted-foreground"
                    >
                      {focusItem}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedEmployment.length > 0 && (
              <div className="mt-4">
                <p className="font-medium text-foreground">
                  Related professional experience
                </p>
                <ul className="mt-1 space-y-2 text-sm text-muted-foreground">
                  {relatedEmployment.map((emp) => (
                    <li key={emp.id}>
                      {emp.role} — {emp.organization}
                      <span className="text-xs text-muted-foreground/60">
                        {" "}
                        ({emp.periodStart} – {emp.periodEnd})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedWork.length > 0 && (
              <div className="mt-4">
                <p className="font-medium text-foreground">
                  Related professional work
                </p>
                <ul className="mt-1 space-y-1 text-sm">
                  {relatedWork.map((work) => (
                    <li key={work.id} className="text-muted-foreground">
                      {work.title}
                      {work.workType === "reconstruction" && (
                        <span className="ml-1 text-xs text-muted-foreground/60">
                          (Portfolio reconstruction)
                        </span>
                      )}
                      {work.relatedProjectSlug && (
                        <a
                          href={`/projects/${work.relatedProjectSlug}`}
                          className="ml-2 text-xs text-accent underline"
                        >
                          (portfolio →)
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-4 text-xs text-muted-foreground/60">
              Evidence:{" "}
              <strong className="text-muted-foreground">
                {selectedStage.evidence}
              </strong>
            </p>
          </div>
        )}

        {!selectedStage && (
          <div className="mt-12 rounded-lg border border-border bg-popover p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Select a stage on the timeline above to view details.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
