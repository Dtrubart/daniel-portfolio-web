"use client";

import { type GuidedTourStep } from "@/data/demos/vanbags-maintenance-guided";

interface Props {
  actionComplete: boolean;
  steps: GuidedTourStep[];
  currentStep: number;
}

export function GuidedTourProgress({ steps, currentStep, actionComplete }: Props) {
  const ch1 = steps.filter((s) => s.chapter === 1);
  const ch2 = steps.filter((s) => s.chapter === 2);

  const renderStep = (step: GuidedTourStep, index: number, isCurrent: boolean, done: boolean) => {
    const marker = done
      ? String.fromCharCode(10003)
      : isCurrent
        ? String.fromCharCode(9679)
        : String.fromCharCode(9675);
    const isActionComplete = isCurrent && actionComplete;
    return (
      <li
        key={step.id}
        className={
          "flex items-center gap-2 " +
          (isActionComplete ? "text-green-600" : isCurrent ? "text-amber-600" : "text-muted-foreground")
        }
      >
        <span className="text-sm" aria-current={isCurrent ? "step" : undefined}>
          {marker} {index + 1} {step.title}
        </span>
        {isActionComplete && (
          <span className="text-xs text-green-600 font-medium">Next action</span>
        )}
      </li>
    );
  };

  return (
    <nav aria-label="tour progress" className="mb-6">
      <p className="text-xs font-semibold uppercase text-accent mb-2">
        Guided Tour — Step {currentStep + 1} of {steps.length}
      </p>
      <ol className="space-y-1 text-sm">
        {ch1.map((step, index) => {
          const isCurrent = currentStep === index;
          const done = currentStep > index;
          return renderStep(step, index, isCurrent, done);
        })}
      </ol>
      {ch2.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <p className="text-xs font-semibold uppercase text-accent mb-2">
            Chapter 2: Tire Lifecycle
          </p>
          <ol className="space-y-1 text-sm">
            {ch2.map((step) => {
              const gi = steps.findIndex((s) => s.id === step.id);
              const isCurrent = currentStep === gi;
              const done = currentStep > gi;
              return renderStep(step, gi, isCurrent, done);
            })}
          </ol>
        </div>
      )}
    </nav>
  );
}
