"use client";

import { Button } from "@/components/ui/Button";
import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import { ProcessFlow } from "@/components/projects/ProcessFlow";
import type { DataFlow } from "@/data/demos/personal-portfolio-platform";
import { dataFlows } from "@/data/demos/personal-portfolio-platform";

export function DataFlowExplorer({
  flow,
  onBack,
}: {
  flow: DataFlow["id"];
  onBack: () => void;
}) {
  const flowData = dataFlows.find((f) => f.id === flow);

  if (!flowData) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {flowData.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {flowData.shortDescription}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Overview
        </Button>
      </div>

      <ConfigurationPanel title="Purpose">
        <p className="text-sm text-muted-foreground">{flowData.purpose}</p>
      </ConfigurationPanel>

      <ConfigurationPanel title="Data Flow">
        <ProcessFlow
          steps={flowData.steps.map((s) => ({ label: s.label, detail: s.detail }))}
        />
      </ConfigurationPanel>
    </div>
  );
}
