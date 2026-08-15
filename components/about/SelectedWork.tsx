"use client";

import { useState } from "react";

import Link from "next/link";

import { professionalFacts } from "@/data/professional-facts";

type WorkCategory = "All" | "Systems" | "Analytics" | "Automation" | "Business / Finance";

const categories: WorkCategory[] = [
  "All",
  "Systems",
  "Analytics",
  "Automation",
  "Business / Finance",
];

export function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredWork = activeCategory === "All"
    ? professionalFacts.selectedWork
    : professionalFacts.selectedWork.filter((w) => w.category === activeCategory);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="work"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Selected Work
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          A curated selection of professional, reconstructed, and independent
          work across systems, analytics, automation, and business.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl px-6 md:px-0">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
              aria-pressed={activeCategory === cat}
              className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeCategory === cat
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-popover text-muted-foreground hover:border-border/60 hover:text-foreground"
              }}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWork.map((work) => {
            const isExpanded = expandedId === work.id;
            const hasDetails =
              work.capabilities.length > 0 ||
              (work.technologies && work.technologies.length > 0);

            return (
              <div
                key={work.id}
                className="flex flex-col rounded-lg border border-border bg-popover p-5"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {work.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground/80">
                    {work.organization}
                  </p>

                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-accent">
                    {work.category}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground/60">
                    {work.workType === "professional"
                      ? "Professional work"
                      : work.workType === "reconstruction"
                      ? "Portfolio reconstruction"
                      : "Independent portfolio project"}
                  </p>

                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {work.description}
                  </p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {work.capabilities.slice(0, 3).map((cap) => (
                      <li
                        key={cap}
                        className="text-xs text-muted-foreground"
                      >
                        {cap}
                      </li>
                    ))}
                    {work.capabilities.length > 3 && (
                      <li className="text-xs text-muted-foreground/60">
                        +{work.capabilities.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>

                {work.relatedProjectSlug && (
                  <Link
                    key={work.relatedProjectSlug}
                    href={`/projects/${work.relatedProjectSlug}`}
                    className="mt-4 text-sm font-medium text-accent hover:underline"
                  >
                    View project →
                  </Link>
                )}

                {hasDetails && (
                  <button
                    type="button"
                    onClick={() => toggle(work.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`work-detail-${work.id}`}
                    className="mt-3 text-left text-xs font-medium text-accent hover:underline focus-visible:outline-none focus-visible:underline"
                  >
                    {isExpanded ? "Show less ↑" : "Explore work →"}
                  </button>
                )}

                {isExpanded && (
                  <div
                    id={`work-detail-${work.id}`}
                    className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground"
                  >
                    {work.technologies && work.technologies.length > 0 && (
                      <div className="mb-2">
                        <span className="font-medium text-foreground">
                          Technologies:
                        </span>{" "}
                        {work.technologies.join(", ")}
                      </div>
                    )}

                    {work.relatedExperienceId && (
                      <div>
                        <span className="font-medium text-foreground">
                          Related experience:
                        </span>{" "}
                        {professionalFacts.employment.find(
                          (e) => e.id === work.relatedExperienceId,
                        )?.organization || "N/A"}
                      </div>
                    )}

                    {work.evidenceNote && (
                      <p className="mt-2 text-xs italic text-muted-foreground/60">
                        {work.evidenceNote}
                      </p>
                    )}
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
