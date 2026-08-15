"use client";

import { cn } from "@/lib/utils";
import {
  type FleetIntelligenceState,
  type FleetIntelligenceAction,
} from "./state";

export function FleetIntelligenceDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const renderView = () => {
    switch (state.navView) {
      case "overview":
        return <DashboardView state={state} dispatch={dispatch} />;
      case "fuel":
        return <FuelAnalyticsView state={state} dispatch={dispatch} />;
      case "rpm":
        return <RPMAnalyticsView state={state} dispatch={dispatch} />;
      case "maintenance":
        return <MaintenanceView state={state} dispatch={dispatch} />;
      case "routes":
        return <RoutesView state={state} dispatch={dispatch} />;
      case "drivers":
        return <DriversView state={state} dispatch={dispatch} />;
      case "teams":
        return <TeamsView state={state} dispatch={dispatch} />;
      case "alerts":
        return <AlertsView state={state} dispatch={dispatch} />;
      default:
        return <DashboardView state={state} dispatch={dispatch} />;
    }
  };

  return (
    <div className="rounded-lg border border-border bg-popover">
      <div className="flex items-center justify-between border-b border-border px-5 pt-4 pb-3">
        <h2 className="text-lg font-semibold text-foreground">
          Fleet Intelligence Dashboard
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset Demo
        </Button>
      </div>

      <nav aria-label="Fleet Intelligence navigation" className="border-b border-border">
        <DemoNavigation
          view={state.navView}
          onChange={(view) => dispatch({ type: "SET_NAV", view })}
        />
      </nav>

      <div className="px-5 py-5">{renderView()}</div>
    </div>
  );
}