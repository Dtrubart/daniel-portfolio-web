"use client";

import { useState } from "react";

import { professionalFacts } from "@/data/professional-facts";

export function ExperienceList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      className="border-t border-border py-16 md:py-24 scroll-mt-20"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Professional Experience
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Roles spanning operations, finance, ERP, analytics, automation, and
          enterprise systems.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-6 px-6 md:px-0">
        {professionalFacts.employment.map((exp) => {
          const isExpanded = expandedId === exp.id;
          const hasDetails =
            exp.supportedAreas.length > 0 ||
            exp.capabilities.length > 0 ||
            exp.technologies.length > 0;

          return (
            <article
              key={exp.id}
              className="rounded-lg border border-border bg-popover"
            >
              <div className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.organization}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {exp.role}
                  </p>
                </div>

                <p className="mt-1 text-xs italic text-muted-foreground">
                  {exp.periodStart && exp.periodEnd
                    ? `${exp.periodStart} – ${exp.periodEnd}`
                    : exp.periodStart || ""}
                  {exp.employmentType && ` · ${exp.employmentType}`}
                </p>

                {exp.area && (
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {exp.area}
                  </p>
                )}

                {exp.businessContext && (
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {exp.businessContext}
                  </p>
                )}

                {exp.notes && (
                  <p className="mt-2 text-xs text-muted-foreground/60">
                    {exp.notes}
                  </p>
                )}

                {hasDetails && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => toggle(exp.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`exp-detail-${exp.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:underline"
                    >
                      {isExpanded ? (
                        <>Show less ↑</>
                      ) : (
                        <>View experience details +</>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isExpanded && hasDetails && (
                <div
                  id={`exp-detail-${exp.id}`}
                  className="border-t border-border px-5 py-4"
                >
                  {exp.supportedAreas.length > 0 && (
                    <div className="mb-4">
                      <p className="font-medium text-foreground">
                        Supported areas
                      </p>
                      <ul className="mt-1 list-disc list-outside space-y-1 pl-5 text-sm text-muted-foreground">
                        {exp.supportedAreas.map((area, i) => (
                          <li key={`area-${i}`}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.capabilities.length > 0 && (
                    <div className="mb-4">
                      <p className="font-medium text-foreground">
                        Capabilities
                      </p>
                      <ul className="mt-1 flex flex-wrap gap-1.5">
                        {exp.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="text-xs text-muted-foreground"
                          >
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.technologies.length > 0 && (
                    <div>
                      <p className="font-medium text-foreground">
                        Technologies
                      </p>
                      <ul className="mt-1 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="text-xs text-muted-foreground"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.relatedWorkIds && exp.relatedWorkIds.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-foreground">
                        Related work
                      </p>
                      <ul className="mt-1 list-disc list-outside space-y-1 pl-5 text-sm text-muted-foreground">
                        {exp.relatedWorkIds.map((workId) => {
                          const work = professionalFacts.selectedWork.find(
                            (w) => w.id === workId,
                          );
                          return work ? (
                            <li key={work.id}>
                              {work.title}
                              {work.relatedProjectSlug && (
                                <a
                                  href={`/projects/${work.relatedProjectSlug}`}
                                  className="ml-2 text-xs text-accent hover:underline"
                                >
                                  (portfolio →)
                                </a>
                              )}
                            </li>
                          ) : (
                            <li key={workId}>{workId}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}