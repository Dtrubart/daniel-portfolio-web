"use client";

import { useReducer, useState, useEffect } from "react";

import {
  simulationReducer,
  initialSimulationState,
} from "@/data/demos/vanbags-maintenance-sim";
import type { SimulationAction, SimulationState } from "@/data/demos/vanbags-maintenance-sim";
import { guidedTourSteps } from "@/data/demos/vanbags-maintenance-guided";
import { GuidedTourProgress } from "./GuidedTourProgress";
import { GuidedTourStep } from "./GuidedTourStep";
import { GuidedTourNavigation } from "./GuidedTourNavigation";

function isStepActionComplete(state: SimulationState, stepId: string): boolean {
  switch (stepId) {
    case "register":
      return state.flags.equipmentRegistered;
    case "templates":
      return state.flags.templatesConfigured;
    case "plan":
      return state.flags.planAssigned;
    case "tires":
      return state.flags.tiresInstalled;
    case "operation":
      return state.odometer >= 4500;
    case "alerts":
      return state.alerts.length > 0 || state.tireAlerts.length > 0 || state.componentCounters.some((c) => c.status !== "Normal");
    case "tire-inspection":
      return state.tireInspections.length > 0;
    case "pm-trigger":
      return state.odometer >= 5000;
    case "work-order":
      return state.flags.workOrderGenerated;
    case "execution": {
      const wo = state.workOrders[0];
      if (!wo) return false;
      const hasAssigned = wo.activities.some((a) => a.technician !== null);
      const hasStarted = wo.activities.some((a) => a.startTime !== null);
      const hasCompleted = wo.activities.some((a) => a.status === "Completed");
      const hasIssued = wo.partRequirements.some((p) => p.issued > 0);
      return hasAssigned && hasStarted && hasCompleted && hasIssued;
    }
    case "backlog":
      return state.backlog.length > 0;
    case "follow-up":
      return state.flags.followUpCreated;
    case "tire-lifecycle":
      return state.retreadBatches.some((b) => b.status === "Returned");
    default:
      return true;
  }
}

function dispatchStepActions(dispatch: (action: SimulationAction) => void, stepId: string, state: SimulationState) {
  switch (stepId) {
    case "register":
      if (!state.flags.equipmentRegistered) dispatch({ type: "CREATE_EQUIPMENT" });
      break;
    case "templates":
      if (!state.flags.templatesConfigured) dispatch({ type: "SAVE_TEMPLATES" });
      break;
    case "plan":
      if (!state.flags.planAssigned) dispatch({ type: "ASSIGN_PM_PLAN" });
      break;
    case "tires":
      if (!state.flags.tiresInstalled) dispatch({ type: "INSTALL_TIRE_SET" });
      break;
    case "operation":
      if (state.odometer < 4500) dispatch({ type: "ADVANCE_ODOMETER", payload: { deltaKm: 4500 } });
      break;
    case "alerts":
      break;
    case "tire-inspection":
      if (state.tireInspections.length === 0) {
        dispatch({
          type: "CREATE_TIRE_INSPECTION",
          payload: {
            tireId: "TIRE-DEMO-003", position: "RL1-O",
            outerTread: 9.2, centerTread: 11.0, innerTread: 12.0,
            pressure: "102 PSI",
          },
        });
      }
      break;
    case "pm-trigger":
      if (state.odometer < 5000) dispatch({ type: "ADVANCE_ODOMETER", payload: { deltaKm: 500 } });
      break;
    case "work-order":
      if (!state.flags.workOrderGenerated) dispatch({ type: "GENERATE_PM_WORK_ORDER" });
      break;
    case "execution": {
      const wo = state.workOrders[0];
      if (!wo) break;
      if (wo.status === "Scheduled") {
        dispatch({ type: "START_WORK_ORDER", payload: { woId: wo.id } });
      }
      const firstAct = wo.activities[0];
      if (firstAct && !firstAct.technician) {
        dispatch({
          type: "ASSIGN_TECHNICIAN",
          payload: { woId: wo.id, activityId: firstAct.id, tech: "Alex Morgan" },
        });
      }
      if (firstAct && !firstAct.startTime) {
        dispatch({ type: "START_ACTIVITY", payload: { woId: wo.id, activityId: firstAct.id } });
      }
      break;
    }
    case "backlog": {
      const wo = state.workOrders[0];
      if (!wo) break;
      const backlogged = wo.activities.find((a) => a.status === "Backlog");
      if (!backlogged) {
        dispatch({
          type: "SEND_ACTIVITY_TO_BACKLOG",
          payload: { woId: wo.id, activityId: wo.activities[0].id, reason: "Spare Part Unavailable", priority: "High" },
        });
      }
      break;
    }
    case "follow-up": {
      const openBacklog = state.backlog.filter((b) => b.status === "Open");
      if (openBacklog.length > 0 && !state.flags.followUpCreated) {
        dispatch({ type: "CREATE_FOLLOWUP_WO", payload: { backlogId: openBacklog[0].id } });
      }
      break;
    }
    case "tire-lifecycle": {
      const tire = state.tires.find((t) => t.id === "TIRE-DEMO-004");
      const batches = state.retreadBatches;
      const inTransit = batches.find((b) => b.status === "In Transit");
      if (batches.length === 0 && tire) {
        dispatch({ type: "CREATE_RETREAD_BATCH", payload: { tireId: tire.id } });
      } else if (batches.length > 0 && !inTransit && !batches.some((b) => b.status === "Returned")) {
        dispatch({ type: "SEND_RETREAD_BATCH", payload: { batchId: batches[0].id } });
      } else if (inTransit) {
        dispatch({ type: "RETURN_RETREAD_BATCH", payload: { batchId: inTransit.id } });
      }
      break;
    }
    default:
      break;
  }
}

export function GuidedMaintenanceTour() {
  const [state, dispatch] = useReducer(simulationReducer, undefined, initialSimulationState);
  const [currentStep, setCurrentStep] = useState(0);
  const [pendingAdvance, setPendingAdvance] = useState(false);

  const step = guidedTourSteps[currentStep];
  const totalSteps = guidedTourSteps.length;

  const actionComplete = step ? isStepActionComplete(state, step.id) : false;

  // When pendingAdvance is set and the action becomes complete, advance to next step
  useEffect(() => {
    if (pendingAdvance && actionComplete && currentStep < totalSteps - 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPendingAdvance(false);
      setCurrentStep(currentStep + 1);
    }
  }, [state, pendingAdvance, actionComplete, currentStep, totalSteps]);

  const handleNext = () => {
    if (step) dispatchStepActions(dispatch, step.id, state);
    if (actionComplete) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setPendingAdvance(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    dispatch({ type: "RESET_DEMO" });
    setCurrentStep(0);
    setPendingAdvance(false);
  };

  const nextStepIndex = currentStep + 1;
  const nextStep = nextStepIndex < totalSteps ? guidedTourSteps[nextStepIndex] : null;
  const nextLabel = nextStep ? "Next: " + nextStep.title : "Finish";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 lg:flex-shrink-0">
          <GuidedTourProgress
            steps={guidedTourSteps}
            currentStep={currentStep}
            actionComplete={actionComplete}
          />
        </div>
        <div className="flex-1">
          <GuidedTourStep
            step={step}
            state={state}
            dispatch={dispatch}
            actionComplete={actionComplete}
          />
        </div>
      </div>
      <GuidedTourNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        onExit={handleReset}
        nextLabel={nextLabel}
        actionComplete={actionComplete}
      />
    </div>
  );
}
