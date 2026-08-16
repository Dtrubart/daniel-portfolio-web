"use client";

import { cn } from "@/lib/utils";
import type { ArchitectureLayerKey } from "@/data/demos/personal-portfolio-platform";
import { architectureLayers } from "@/data/demos/personal-portfolio-platform";

const layerIcons: Record<ArchitectureLayerKey, string> = {
  presentation: "🏠",
  content: "📄",
  "professional-data": "📊",
  "project-framework": "⚙️",
  "interactive-demos": "🎮",
  "platform-delivery": "🚀",
};

export function ArchitectureOverview({
  onSelectLayer,
}: {
  onSelectLayer: (layer: ArchitectureLayerKey) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Explore the portfolio platform by layer. Select a layer to inspect its
        purpose, modules, responsibilities, and architecture decisions.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {architectureLayers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => onSelectLayer(layer.id)}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border border-border bg-secondary p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-secondary/80",
            )}
          >
            <span className="text-2xl" aria-hidden="true">
              {layerIcons[layer.id]}
            </span>
            <h3 className="text-base font-semibold text-foreground">
              {layer.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {layer.shortDescription}
            </p>
            <span className="text-xs text-muted-foreground/60">
              Click to explore {layer.title.toLowerCase()} →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
