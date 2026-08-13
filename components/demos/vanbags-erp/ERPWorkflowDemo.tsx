"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BusinessProcessDemo } from "./BusinessProcessDemo";
import { ERPConfigurationDemo } from "./ERPConfigurationDemo";
import { DemoModeSelector } from "./DemoModeSelector";

export type DemoMode = "business" | "configuration";

export function ERPWorkflowDemo() {
  const [mode, setMode] = useState<DemoMode>("business");
  const [resetKey, setResetKey] = useState(0);

  const reset = () => {
    setMode("business");
    setResetKey((previous) => previous + 1);
  };

  const modeLabel = mode === "business" ? "Business Process" : "ERP Configuration";
  const panelId = `panel-${mode}`;

  return (
    <div className="rounded-lg border border-border bg-popover">
      <div className="flex items-center justify-between border-b border-border px-5 pt-4 pb-3">
        <h2 className="text-lg font-semibold text-foreground">
          Interactive workspace — {modeLabel}
        </h2>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset Demo
        </Button>
      </div>

      <DemoModeSelector mode={mode} onChange={setMode} />

      <div id={panelId} className="px-5 py-5">
        {mode === "business" ? (
          <BusinessProcessDemo key={resetKey} />
        ) : (
          <ERPConfigurationDemo key={resetKey} />
        )}
      </div>
    </div>
  );
}
