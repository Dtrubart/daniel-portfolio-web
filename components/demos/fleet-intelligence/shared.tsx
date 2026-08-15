"use client";

import { cn } from "@/lib/utils";

const TONES: Record<string, string> = {
  open: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  closed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  neutral: "border-border bg-secondary text-muted-foreground",
  urgent: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  scheduled: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
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

export function SeverityBadge({ severity }: { severity: string }) {
  const severityTone: Record<string, keyof typeof TONES> = {
    Info: "neutral",
    Attention: "open",
    High: "urgent",
    Critical: "urgent",
  };
  return <StatusBadge value={severity} tone={severityTone[severity] ?? "neutral"} />;
}

export function AlertTypeBadge({ type }: { type: string }) {
  const typeColors: Record<string, string> = {
    "Potential Fuel Theft Alert": "urgent",
    "Fuel-Level Anomaly": "open",
    "Elevated Idle": "neutral",
    "Elevated Over-Rev": "neutral",
    "Elevated Braking Rate": "neutral",
    "Elevated Harsh Acceleration Rate": "neutral",
    "Maintenance Due Soon": "scheduled",
    "Maintenance Overdue": "closed",
  };
  return <StatusBadge value={type} tone={typeColors[type] ?? "neutral"} />;
}

export function ScoreBadge({ score }: { score: number }) {
  const tone = score >= 80 ? "closed" : score >= 60 ? "scheduled" : "urgent";
  return <StatusBadge value={`${score}%`} tone={tone} />;
}