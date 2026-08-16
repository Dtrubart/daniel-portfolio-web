"use client";

import { Button } from "@/components/ui/Button";
import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import { ProcessFlow } from "@/components/projects/ProcessFlow";
import { qualityGates } from "@/data/demos/personal-portfolio-platform";

export function DevelopmentPipeline({ onBack }: { onBack: () => void }) {
  const pipelineSteps = [
    { label: "Specification", detail: "docs/portfolio-spec.md" },
    { label: "Milestone Scope", detail: "reviewable work units" },
    { label: "Implementation", detail: "TypeScript + Tailwind" },
    { label: "Lint + Type-check", detail: "npm run lint" },
    { label: "Production Build", detail: "npm run build (static-first)" },
    { label: "Runtime Smoke Test", detail: "all routes return 200" },
    { label: "Manual Review", detail: "uncommitted until reviewed" },
    { label: "Git Commit", detail: "per-milestone commits" },
    { label: "GitHub", detail: "single repository" },
    { label: "Vercel", detail: "static deployment" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">
          Development Pipeline
        </h3>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Overview
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        The portfolio is developed through a milestone-driven workflow. Each
        milestone is validated through multiple quality gates before being
        committed.
      </p>

      <ConfigurationPanel title="Pipeline">
        <ProcessFlow steps={pipelineSteps} />
      </ConfigurationPanel>

      <ConfigurationPanel title="Quality Gates">
        <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-muted-foreground">
          {qualityGates.map((gate) => (
            <li key={gate.id}>
              <span className="font-medium text-foreground">{gate.label}</span>
              <span className="text-muted-foreground"> — </span>
              <span className="text-muted-foreground">{gate.description}</span>
            </li>
          ))}
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel
        title="Important Validation Note"
        note="Build success ≠ runtime readiness"
      >
        <p className="text-sm text-muted-foreground">
          Build success alone is not treated as sufficient for interactive
          applications. Runtime validation — verifying all routes and demo
          interactions return expected results — is an additional quality gate that
          evolved from the Fleet Intelligence stabilization work.
        </p>
      </ConfigurationPanel>
    </div>
  );
}
