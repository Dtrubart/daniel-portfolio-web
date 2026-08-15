"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { professionalFacts, type EmploymentFact } from "@/data/professional-facts";

export function CareerJourney() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const stages = professionalFacts.careerStages;

  const selectedStageData = selectedStage
    ? stages.find((s) => s.id === selectedStage)
    : null;

  const relatedEmployment = selectedStageData?.employmentIds
    ? selectedStageData.employmentIds
        .map((id) =>
          professionalFacts.employment.find((e) => e.id === id),
        )
        .filter((e): e is EmploymentFact => e !== undefined)
    : [];

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

      <div className="mx-auto mt-12 max-w-4xl">
        <ul className="space-y-6">
          {stages.map((stage, index) => {
            const isSelected = selectedStage === stage.id;
            const isStage4 = stage.highlight;

            return (
              <li key={stage.id}>
                <div
                  className={cn(
                    "rounded-lg border-2 bg-popover p-5 transition-all",
                    isSelected
                      ? "border-accent ring-1 ring-accent/30"
                      : "border-border hover:border-border/60",
                    isStage4 && !isSelected && "border-accent/20",
                  )}
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                          isStage4
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground",
                          isSelected && "ring-2 ring-accent ring-offset-2",
                        )}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-bold",
                            isStage4 ? "text-accent" : "text-foreground",
                            isSelected && "text-accent",
                          )}
                        >
                          {stage.title}
                          {stage.isCurrentDirection ? " →" : ""}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {stage.period}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedStage(isSelected ? null : stage.id)
                      }
                      aria-expanded={isSelected}
                      aria-controls={`stage-detail-${stage.id}`}
                      className={cn(
                        "inline-flex items-center gap-1 self-start rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isStage4
                          ? "text-accent hover:bg-accent/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      )}
                    >
                      {isSelected ? (
                        <>
                          <span>Show less ↑</span>
                        </>
                      ) : (
                        <>
                          <span>Explore this stage →</span>
                        </>
                      )}
                    </button>
                  </div>

                  {!isSelected && stage.highlight && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                      Key stage
                    </span>
                  )}
                </div>

                {isSelected && selectedStageData && (
                  <div
                    id={`stage-detail-${stage.id}`}
                    className="mt-4 rounded-lg border border-border bg-popover p-6"
                  >
                    <p className="mt-1 text-sm italic text-muted-foreground">
                      {stage.theme}
                    </p>

                    {stage.evolution && (
                      <p className="mt-3 text-sm text-muted-foreground/70">
                        {stage.evolution}
                      </p>
                    )}

                    {stage.domains.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium text-foreground">
                          Key domains
                        </p>
                        <ul className="mt-1 flex flex-wrap gap-1.5">
                          {stage.domains.map((domain) => (
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

                    {stage.focus && stage.focus.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium text-foreground">
                          Current focus areas
                        </p>
                        <ul className="mt-1 flex flex-wrap gap-1.5">
                          {stage.focus.map((focusItem) => (
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
                        <ul className="mt-1 space-y-2">
                          {relatedEmployment.map((emp) => (
                            <li
                              key={emp.id}
                              className="text-sm text-muted-foreground"
                            >
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
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}