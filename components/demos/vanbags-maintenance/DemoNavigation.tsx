"use client";

import { cn } from "@/lib/utils";
import type { NavView } from "@/data/demos/vanbags-maintenance";

const NAV_ITEMS: { view: NavView; label: string }[] = [
  { view: "dashboard", label: "Dashboard" },
  { view: "equipment", label: "Equipment" },
  { view: "requests", label: "Requests" },
  { view: "workorders", label: "Work Orders" },
  { view: "pm", label: "PM" },
  { view: "parts", label: "Parts" },
  { view: "history", label: "History" },
  { view: "tires", label: "Tires" },
];

export function DemoNavigation({
  view,
  onChange,
}: {
  view: NavView;
  onChange: (view: NavView) => void;
}) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1 overflow-x-auto px-2 py-1">
      {NAV_ITEMS.map((item) => {
        const active = view === item.view;
        return (
          <button
            key={item.view}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.view)}
            className={cn(
              "rounded-md px-3.5 py-2 text-sm font-medium whitespace-nowrap",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active
                ? "border-b-2 border-accent text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
