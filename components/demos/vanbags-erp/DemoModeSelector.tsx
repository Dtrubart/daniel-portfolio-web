"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import type { DemoMode } from "./ERPWorkflowDemo";

const MODES: { id: DemoMode; label: string }[] = [
  { id: "business", label: "Business Process" },
  { id: "configuration", label: "ERP Configuration" },
];

export function DemoModeSelector({
  mode,
  onChange,
}: {
  mode: DemoMode;
  onChange: (mode: DemoMode) => void;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const order = MODES.map((tab) => tab.id);
    const index = order.indexOf(mode);
    let next = index;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % order.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + order.length) % order.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = order.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextMode = order[next];
    onChange(nextMode);
    refs.current[nextMode]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Demo mode"
      className="-mx-5 -mb-px flex flex-wrap border-b border-border"
    >
      {MODES.map((tab) => {
        const isActive = mode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            ref={(element) => {
              refs.current[tab.id] = element;
            }}
            onClick={() => onChange(tab.id)}
            onKeyDown={onKeyDown}
            className={cn(
              "border-b-2 px-5 py-2.5 text-sm font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
