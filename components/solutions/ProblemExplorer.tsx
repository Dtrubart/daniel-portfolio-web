"use client";

import { useState } from "react";

import {
  SolutionData,
  VisitorProblem,
  visitorProblems,
  getSolution,
  getProjectsForSolution,
} from "@/data/solutions";
import { projects } from "@/data/projects";

export function ProblemExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProblem = visitorProblems.find((p) => p.id === selectedId);
  const selectedSolution = selectedProblem
    ? getSolution(selectedProblem.solutionAreaId)
    : null;

  return (
    <section className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        What are you trying to improve?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Select a challenge to explore how these capabilities apply.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {visitorProblems.map((problem) => {
          const isSelected = selectedId === problem.id;
          return (
            <button
              key={problem.id}
              type="button"
              onClick={() => setSelectedId(problem.id)}
              aria-expanded={isSelected}
              aria-controls={`problem-${problem.id}`}
              className={
                "rounded-lg border border-border bg-popover p-4 text-left text-sm font-medium transition-all hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                (isSelected
                  ? "border-accent bg-accent text-accent-foreground ring-2 ring-accent"
                  : "text-foreground hover:border-accent/50")
              }
            >
              <span className="block">{problem.text}</span>
              <span
                className={
                  "mt-1 inline-flex items-center text-xs " +
                  (isSelected
                    ? "text-accent-foreground/80"
                    : "text-muted-foreground")
                }
              >
                Explore solution
                <ArrowRightIcon className="ml-1 h-3 w-3" />
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="solution-detail"
        role="region"
        aria-live="polite"
        aria-atomic="true"
        className="mt-8 min-h-[200px]"
      >
        {selectedSolution && (
          <SolutionDetail
            solution={selectedSolution}
            problem={selectedProblem!}
            onClear={() => setSelectedId(null)}
          />
        )}
      </div>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H7"
      />
    </svg>
  );
}

interface SolutionDetailProps {
  solution: SolutionData;
  problem: VisitorProblem;
  onClear: () => void;
}

function SolutionDetail({ solution, problem, onClear }: SolutionDetailProps) {
  const relatedProjects = getProjectsForSolution(solution.id, projects).filter(Boolean);

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {solution.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {solution.descriptor}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          &larr; Select a different challenge
        </button>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        You asked about: &ldquo;{problem.text}&rdquo;
      </p>

      <ol className="space-y-3">
        {solution.approach.map((step) => (
          <li key={step.label} className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-bold text-foreground">
              {solution.approach.indexOf(step) + 1}
            </div>
            <div>
              <span className="font-medium text-foreground">
                {step.label}
              </span>
              {step.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-foreground">
          Typical challenges
        </h4>
        <ul className="mt-2 list-disc list-outside space-y-1 text-sm text-muted-foreground pl-5">
          {solution.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-foreground">
          Capabilities
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {solution.capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-foreground">Tools</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {solution.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {relatedProjects.length > 0 && (
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-foreground">
            Related portfolio evidence
          </h4>
          <p className="mt-2 text-xs text-muted-foreground">
            These projects demonstrate capabilities related to this solution area.
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {relatedProjects.map((project) => (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-center rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Explore {project.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}