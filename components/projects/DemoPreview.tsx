import type { ReactNode } from "react";

import type { DemoType, Project } from "@/data/projects";

const demoLabel: Record<DemoType, string> = {
  software: "Software demo",
  dashboard: "Dashboard demo",
  workflow: "Workflow demo",
  analytics: "Analytics demo",
};

export function DemoPreview({ project }: { project: Project }) {
  if (!project.demo?.enabled) return null;

  const demo = project.demo;
  const type = demo.type;

  return (
    <div className="rounded-lg border border-border bg-popover p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {demoLabel[type]}
        </p>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
          Interactive preview
        </span>
      </div>

      <div className="mb-3 flex items-center justify-center rounded-md bg-secondary/40 p-4">
        {demoCanvas[type]}
      </div>

      <p className="text-sm text-muted-foreground">{demoCaption[type]}</p>
    </div>
  );
}

const demoCanvas: Record<DemoType, ReactNode> = {
  software: (
    <svg
      width="280"
      height="180"
      viewBox="0 0 280 180"
      aria-label="Software application preview"
    >
      <rect x="20" y="10" width="240" height="160" rx="16" fill="#0f172a" />
      <rect x="36" y="34" width="208" height="24" rx="4" fill="#1e293b" />
      <rect x="36" y="72" width="96" height="64" rx="6" fill="#334159" />
      <rect x="140" y="72" width="96" height="28" rx="6" fill="#334159" />
      <rect x="140" y="110" width="96" height="26" rx="6" fill="#334159" />
    </svg>
  ),
  dashboard: (
    <svg
      width="280"
      height="180"
      viewBox="0 0 280 180"
      aria-label="Dashboard preview"
    >
      <rect x="20" y="30" width="240" height="20" rx="4" fill="#1e293b" />
      <rect x="20" y="62" width="96" height="88" rx="6" fill="#0f172a" />
      <rect x="128" y="62" width="132" height="36" rx="6" fill="#1e293b" />
      <rect x="128" y="108" width="132" height="42" rx="6" fill="#1e293b" />
      <rect x="20" y="162" width="240" height="8" rx="4" fill="#334159" />
    </svg>
  ),
  workflow: (
    <svg
      width="280"
      height="160"
      viewBox="0 0 280 160"
      aria-label="Workflow preview"
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0 10 3 0 6" fill="#94a3b8" />
        </marker>
      </defs>
      <rect x="12" y="44" width="66" height="32" rx="8" fill="#0f172a" />
      <rect x="106" y="44" width="66" height="32" rx="8" fill="#0f172a" />
      <rect x="200" y="44" width="66" height="32" rx="8" fill="#0f172a" />
      <path
        d="M78 60 L94 60"
        stroke="#94a3b8"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <path
        d="M172 60 L188 60"
        stroke="#94a3b8"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
    </svg>
  ),
  analytics: (
    <svg
      width="280"
      height="160"
      viewBox="0 0 280 160"
      aria-label="Analytics chart preview"
    >
      <line x1="28" x2="28" y1="24" y2="136" stroke="#475569" strokeWidth="2" />
      <line x1="28" x2="272" y1="136" y2="136" stroke="#475569" strokeWidth="2" />
      <polyline
        points="48,116 80,80 112,96 148,56 184,88 224,44 256,88"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="116" r="4" fill="#3b82f6" />
      <circle cx="256" cy="88" r="4" fill="#3b82f6" />
    </svg>
  ),
};

const demoCaption: Record<DemoType, string> = {
  software:
    "A screen-level preview of the application surface. Open the live case study to explore the full interaction.",
  dashboard:
    "A representative layout of the operational dashboard. Key metrics are linked from the full case study.",
  workflow:
    "The end-to-end process flow, from requirements through go-live and operational adoption.",
  analytics:
    "A sample of the analytics pipeline and the visual insights driving operational decisions.",
};
