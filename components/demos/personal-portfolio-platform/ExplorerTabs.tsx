"use client";

import { cn } from "@/lib/utils";
import type { ExplorerView } from "./state";

const tabs: { id: ExplorerView; label: string; hint?: string }[] = [
  { id: "overview", label: "Architecture Overview" },
  { id: "layer", label: "Layer Detail" },
  { id: "flow", label: "Data Flow" },
  { id: "repository", label: "Repository Explorer" },
  { id: "decisions", label: "Architecture Decisions" },
  { id: "projects", label: "Project Examples" },
  { id: "pipeline", label: "Development Pipeline" },
  { id: "roadmap", label: "Evolution Roadmap" },
];

export function ExplorerTabs({
  activeView,
  onViewChange,
}: {
  activeView: ExplorerView;
  onViewChange: (view: ExplorerView) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 -mx-5 px-5 border-t border-border">
      {tabs.map((tab) => {
        const isActive = activeView === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onViewChange(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "border-b-2 border-accent text-foreground"
                : "text-muted-foreground/60 hover:text-muted-foreground hover:border-b-2 hover:border-border",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
