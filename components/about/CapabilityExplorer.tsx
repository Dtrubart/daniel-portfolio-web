"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  professionalFacts,
  type EmploymentFact,
  type SelectedWorkFact,
} from "@/data/professional-facts";

export function CapabilityExplorer() {
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const domains = professionalFacts.capabilities;

  const selectedDomain = selectedCapability
    ? domains.find((d) => d.id === selectedCapability)
    : null;

  return (
    <section
      id="capabilities"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Capabilities
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Six capability domains spanning skills, experience, and applied
          project work. Select a domain to explore related experience and work.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl px-6 md:px-0">
        <div className="mb-8 flex flex-wrap gap-2">
          {domains.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelectedCapability(domain.id)}
              aria-pressed={selectedCapability === domain.id}
              className={cn(
                "rounded-md border-2 px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedCapability === domain.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-popover text-muted-foreground hover:border-border/60 hover:text-foreground",
              )}
            >
              {domain.title}
            </button>
          ))}

          {selectedCapability && (
            <button
              type="button"
              onClick={() => setSelectedCapability(null)}
              className="rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Clear selection
            </button>
          )}
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => {
            const isSelected = selectedCapability === domain.id;
            const showAll = !selectedCapability;
            const isDimmed = selectedCapability && !isSelected;

            if (!showAll && !isSelected) {
              return (
                <div
                  key={domain.id}
                  className="rounded-lg border border-border bg-popover/30 p-5 grayscale opacity-60"
                >
                  <h3 className="text-lg font-semibold text-muted-foreground">
                    {domain.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedCapability(domain.id)}
                    className="mt-2 text-xs font-medium text-muted-foreground underline"
                  >
                    Explore capability →
                  </button>
                </div>
              );
            }

            return (
              <div
                key={domain.id}
                className={cn(
                  "rounded-lg border border-border bg-popover p-5 transition-all",
                  isSelected && "ring-1 ring-accent/30",
                  isDimmed && "opacity-60 grayscale",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={cn(
                      "text-lg font-semibold",
                      isSelected ? "text-accent" : "text-foreground",
                    )}
                  >
                    {domain.title}
                  </h3>
                  {isSelected && (
                    <span className="text-xs text-muted-foreground/60">
                      Selected
                    </span>
                  )}
                </div>

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {domain.coreAreas.map((area) => (
                    <li
                      key={area}
                      className="text-xs text-muted-foreground"
                    >
                      {area}
                    </li>
                  ))}
                </ul>

                {!isSelected && showAll && (
                  <button
                    type="button"
                    onClick={() => setSelectedCapability(domain.id)}
                    className="mt-3 text-xs font-medium text-accent underline"
                  >
                    Explore capability →
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {selectedDomain && (
          <div className="mt-12 rounded-lg border border-border bg-popover p-6">
            <h3 className="text-xl font-semibold text-accent">
              {selectedDomain.title} — Connections
            </h3>

            {selectedDomain.relatedExperienceIds &&
              selectedDomain.relatedExperienceIds.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-foreground">
                    Related experience
                  </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {selectedDomain.relatedExperienceIds
                        .map((expId) =>
                          professionalFacts.employment.find(
                            (e) => e.id === expId,
                          ),
                        )
                        .filter((e): e is EmploymentFact => e !== undefined)
                        .map((emp) => (
                          <li key={emp.id}>
                            {emp.role} — {emp.organization}
                          </li>
                        ))}
                    </ul>
                </div>
              )}

            {selectedDomain.relatedWorkIds &&
              selectedDomain.relatedWorkIds.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-foreground">
                    Related work
                  </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {selectedDomain.relatedWorkIds
                        .map((workId) =>
                          professionalFacts.selectedWork.find(
                            (w) => w.id === workId,
                          ),
                        )
                        .filter((w): w is SelectedWorkFact => w !== undefined)
                        .map((work) => (
                          <li key={work.id}>
                            {work.title} ({work.workType})
                          </li>
                        ))}
                    </ul>
                </div>
              )}

            {selectedDomain.relatedProjectSlugs &&
              selectedDomain.relatedProjectSlugs.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-foreground">
                    Related portfolio projects
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {selectedDomain.relatedProjectSlugs.map((slug) => (
                      <li key={slug}>
                        <a
                          href={`/projects/${slug}`}
                          className="text-accent hover:underline"
                        >
                          /projects/{slug}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            <p className="mt-4 text-xs text-muted-foreground/60">
              Evidence: <strong>{selectedDomain.evidence}</strong>
            </p>
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-foreground">
            Cross-Cutting Methods
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {professionalFacts.crossCuttingCapabilities.map((cap) => (
              <li key={cap.id} className="flex items-start gap-2">
                <span
                  className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>{cap.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}