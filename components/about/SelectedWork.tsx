"use client";
import { useState } from "react";
import { professionalWork, portfolioEvidence } from "@/data/project-inventory";
import { professionalFacts } from "@/data/professional-facts";

const classificationLabels: Record<string, string> = {
  "professional-program": "Professional Program",
  "professional-work": "Professional Work",
  "advisory-project": "Advisory Project",
  "academic-project": "Academic Project",
  "teaching-automation": "Teaching Automation",
  "portfolio-case-study": "Portfolio Case Study",
  "portfolio-reconstruction": "Portfolio Reconstruction",
  "independent-project": "Portfolio Case Study",
};

function getExperienceOrg(id: string): string {
  const exp = professionalFacts.employment.find((e) => e.id === id);
  return exp ? exp.organization : "";
}

export function SelectedWork() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggle = (id: string) => { setExpandedId(expandedId === id ? null : id); };

  return (
    <section id="work" className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Selected Work
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          A curated selection of professional initiatives and portfolio
          evidence across systems, analytics, automation, and business.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-5xl px-6 md:px-0">
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6">Professional Work</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {professionalWork.map((work) => {
              const isExpanded = expandedId === work.id;
              const hasDetails = (work.capabilities?.length ?? 0) > 0 || (work.tools?.length ?? 0) > 0;
              return (
                <article key={work.id} className="flex flex-col rounded-lg border border-border bg-popover p-5">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground">{work.title}</h4>
                    {work.organization && (
                      <p className="mt-1 text-sm text-muted-foreground/80">{work.organization}</p>
                    )}
                    <span className="mt-1 inline-block text-xs font-medium uppercase tracking-wider text-accent">
                      {classificationLabels[work.classification] || work.classification}
                    </span>
                    <p className="mt-2 text-sm text-muted-foreground">{work.shortDescription}</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {(work.capabilities || []).slice(0, 3).map((cap) => (
                        <li key={cap} className="text-xs text-muted-foreground">{cap}</li>
                      ))}
                      {(work.capabilities || []).length > 3 && (
                        <li className="text-xs text-muted-foreground/60">+{(work.capabilities || []).length - 3} more</li>
                      )}
                    </ul>
                  </div>
                  {work.relatedPortfolioSlugs && work.relatedPortfolioSlugs.length > 0 && (
                    <a href={"/projects/" + work.relatedPortfolioSlugs[0]} className="mt-3 text-sm font-medium text-accent hover:underline">
                      View case study →
                    </a>
                  )}
                  {hasDetails && (
                    <button
                      type="button"
                      onClick={() => toggle(work.id)}
                      aria-expanded={isExpanded}
                      aria-controls={"work-detail-" + work.id}
                      className="mt-3 text-left text-xs font-medium text-accent hover:underline focus-visible:outline-none focus-visible:underline"
                    >
                      {isExpanded ? "Show less " + String.fromCharCode(8593) + "" : "Explore work " + String.fromCharCode(8594)}
                    </button>
                  )}
                  {isExpanded && (
                    <div
                      id={"work-detail-" + work.id}
                      className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground"
                    >
                      {work.tools && work.tools.length > 0 && (
                        <div className="mb-2">
                          <span className="font-medium text-foreground">Tools:</span>{" "}{work.tools.join(", ")}
                        </div>
                      )}
                      {work.relatedExperienceId && (
                        <div>
                          <span className="font-medium text-foreground">Related experience:</span>{" "}
                          {getExperienceOrg(work.relatedExperienceId) || "N/A"}
                        </div>
                      )}
                      {work.impact && work.impact.length > 0 && (
                        <div className="mt-2">
                          <span className="font-medium text-foreground">Outcome:</span>
                          <ul className="mt-1 list-disc list-inside">
                            {work.impact.map((i) => (
                              <li key={i.statement}>{i.statement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {work.relatedPortfolioSlugs && work.relatedPortfolioSlugs.length > 0 && (
                        <div className="mt-2">
                          <span className="font-medium text-foreground">Related portfolio evidence:</span>
                          <ul className="mt-1 list-disc list-inside">
                            {work.relatedPortfolioSlugs.map((slug) => (
                              <li key={slug}>
                                <a href={"/projects/" + slug} className="text-accent hover:underline">{slug.replace("-", " ")}→</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-foreground mb-6">Portfolio Case Studies</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioEvidence.map((work) => (
              <article key={work.id} className="flex flex-col rounded-lg border border-border bg-popover p-5">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground">{work.title}</h4>
                  {work.organization && (
                    <p className="mt-1 text-sm text-muted-foreground/80">{work.organization}</p>
                  )}
                  <span className="mt-1 inline-block text-xs font-medium uppercase tracking-wider text-accent">
                    {classificationLabels[work.classification] || work.classification}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">{work.shortDescription}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {(work.capabilities || []).slice(0, 3).map((cap) => (
                      <li key={cap} className="text-xs text-muted-foreground">{cap}</li>
                    ))}
                  </ul>
                </div>
                {work.relatedPortfolioSlugs && work.relatedPortfolioSlugs.length > 0 && (
                  <a href={"/projects/" + work.relatedPortfolioSlugs[0]} className="mt-3 text-sm font-medium text-accent hover:underline">
                    View case study →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
