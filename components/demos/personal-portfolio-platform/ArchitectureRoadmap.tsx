"use client";

import { Button } from "@/components/ui/Button";
import { roadmapCapabilities } from "@/data/demos/personal-portfolio-platform";

const statusColors = {
  implemented: "text-green-600",
  planned: "text-amber-600",
};

const badgeColors = {
  implemented: "bg-green-500/10 text-green-600",
  planned: "bg-amber-500/10 text-amber-600",
};

export function ArchitectureRoadmap({ onBack }: { onBack: () => void }) {
  const implemented = roadmapCapabilities.filter((c) => c.status === "implemented");
  const planned = roadmapCapabilities.filter((c) => c.status === "planned");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">
          Evolution Roadmap
        </h3>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Overview
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-base font-semibold text-foreground">
            Implemented
          </h4>
          <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            {implemented.map((cap) => (
              <li key={cap.id}>
                {cap.label} <span className={`text-xs font-medium ${statusColors[cap.status]}`}>({cap.milestone})</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold text-foreground">
            Planned
          </h4>
          <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            {planned.map((cap) => (
              <li key={cap.id}>
                {cap.label}
                <span className={`ml-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${badgeColors[cap.status]}`}>
                  {cap.milestone}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
