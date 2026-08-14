"use client";

import { cn } from "@/lib/utils";
import type { Priority } from "@/data/demos/vanbags-maintenance";

const TONES: Record<string, string> = {
  open: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  closed:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  neutral: "border-border bg-secondary text-muted-foreground",
  urgent: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  scheduled:
    "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export function StatusBadge({
  value,
  tone = "neutral",
}: {
  value: string;
  tone?: keyof typeof TONES;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONES[tone] ?? TONES.neutral,
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
      />
      {value}
    </span>
  );
}

const PRIORITY_TONE: Record<Priority, keyof typeof TONES> = {
  Low: "neutral",
  Medium: "open",
  High: "urgent",
};

export function PriorityPill({ priority }: { priority: Priority }) {
  return <StatusBadge value={priority} tone={PRIORITY_TONE[priority]} />;
}
