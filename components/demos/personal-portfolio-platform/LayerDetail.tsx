"use client";

import { Button } from "@/components/ui/Button";
import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import type { ArchitectureLayerKey } from "@/data/demos/personal-portfolio-platform";
import { architectureLayers } from "@/data/demos/personal-portfolio-platform";
import type { DataFlow } from "@/data/demos/personal-portfolio-platform";

export function LayerDetail({
  layer,
  onBack,
  onSelectFlow,
}: {
  layer: ArchitectureLayerKey;
  onBack: () => void;
  onSelectFlow: (flowId: DataFlow["id"]) => void;
}) {
  const layerData = architectureLayers.find((l) => l.id === layer);

  if (!layerData) {
    return null;
  }

  const flowMap: Partial<Record<ArchitectureLayerKey, DataFlow["id"]>> = {
    "professional-data": "professional-data",
    "project-framework": "project-flow",
    "interactive-demos": "demo-flow",
    "platform-delivery": "deployment-flow",
  };

  const relatedFlow = flowMap[layer];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {layerData.title} Layer
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {layerData.longDescription}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Overview
        </Button>
      </div>

      <ConfigurationPanel title="Purpose">
        <p className="text-sm text-muted-foreground">
          {layerData.responsibility}
        </p>
      </ConfigurationPanel>

      <ConfigurationPanel title="Key Modules">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          {layerData.modules.map((mod) => (
            <li key={mod}>{mod}</li>
          ))}
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Architecture Decisions">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          {layerData.decisions.map((dec) => (
            <li key={dec}>{dec}</li>
          ))}
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Evidence">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          {layerData.evidence.map((ev) => (
            <li key={ev}>{ev}</li>
          ))}
        </ul>
      </ConfigurationPanel>

      {relatedFlow ? (
        <div className="pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelectFlow(relatedFlow!)}
          >
            Explore {layerData.title.toLowerCase()} data flow →
          </Button>
        </div>
      ) : null}
    </div>
  );
}
