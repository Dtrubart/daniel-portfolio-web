"use client";

import { Button } from "@/components/ui/Button";

interface Props {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onExit: () => void;
  nextLabel?: string;
  actionComplete: boolean;
}

export function GuidedTourNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onExit,
  nextLabel,
  actionComplete,
}: Props) {
  const isFirst = currentStep <= 0;
  const isLast = currentStep >= totalSteps - 1;
  return (
    <div className="flex items-center justify-between border-t border-border px-5 py-4">
      <Button variant="ghost" size="sm" onClick={onBack} disabled={isFirst}>
        {" Back"}
      </Button>
      <span className="text-sm text-muted-foreground">
        Step {currentStep + 1} of {totalSteps}
      </span>
      <Button variant="primary" size="sm" onClick={onNext}>
        {nextLabel ? nextLabel : "Next"}
      </Button>
      {!isLast && actionComplete && (
        <span className="text-xs text-green-600 font-medium">Ready to advance</span>
      )}
      <button type="button" onClick={onExit} className="text-xs hover:underline">
        Exit Guided Tour
      </button>
    </div>
  );
}
