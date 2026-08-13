"use client";

import { useState } from "react";
import {
  CONFIG_VIEWS,
  DEFAULT_CONFIG_VIEW,
  type ConfigViewId,
} from "@/data/demos/vanbags-erp";
import { cn } from "@/lib/utils";
import {
  AccountingConsequencePreview,
  ConfigurationViews,
} from "./configuration/ConfigurationViews";

export function ERPConfigurationDemo() {
  const [view, setView] = useState<ConfigViewId>(DEFAULT_CONFIG_VIEW);

  return (
    <div className="space-y-8">
      <nav aria-label="Configuration navigation">
        <ul className="flex flex-wrap -mb-px gap-1 border-b border-border">
          {CONFIG_VIEWS.map((configView) => {
            const isActive = view === configView.id;
            return (
              <li key={configView.id}>
                <button
                  type="button"
                  onClick={() => setView(configView.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "border-b-2 px-4 py-2.5 text-sm font-medium",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {configView.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <ConfigurationViews view={view} />
      <AccountingConsequencePreview />
    </div>
  );
}
