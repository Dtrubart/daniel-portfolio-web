"use client";

import { useReducer } from "react";

import { Button } from "@/components/ui/Button";
import {
  architectureLayers,
  architectureDecisions,
  dataFlows,
  repositoryTree,
  projectArchitectureExamples,
  qualityGates,
  roadmapCapabilities,
} from "@/data/demos/personal-portfolio-platform";
import type { ArchitectureLayerKey } from "@/data/demos/personal-portfolio-platform";
import {
  reducer,
  getInitialState,
  type ExplorerView,
} from "./state";
import { ArchitectureOverview } from "./ArchitectureOverview";
import { LayerDetail } from "./LayerDetail";
import { DataFlowExplorer } from "./DataFlowExplorer";
import { RepositoryExplorer } from "./RepositoryExplorer";
import { ArchitectureDecisions } from "./ArchitectureDecisions";
import { ProjectArchitecture } from "./ProjectArchitecture";
import { DevelopmentPipeline } from "./DevelopmentPipeline";
import { ArchitectureRoadmap } from "./ArchitectureRoadmap";
import { ExplorerTabs } from "./ExplorerTabs";

export function ArchitectureExplorer() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  const renderContent = () => {
    switch (state.activeView) {
      case "overview":
        return <ArchitectureOverview onSelectLayer={(layer) => dispatch({ type: "SELECT_LAYER", layer })} />;
      case "layer":
        if (!state.selectedLayer) {
          return <ArchitectureOverview onSelectLayer={(layer) => dispatch({ type: "SELECT_LAYER", layer })} />;
        }
        return (
          <LayerDetail
            layer={state.selectedLayer}
            onBack={() => dispatch({ type: "SHOW_OVERVIEW" })}
            onSelectFlow={(flowId) => dispatch({ type: "SELECT_FLOW", flowId })}
          />
        );
      case "flow":
        if (!state.selectedFlow) {
          return <ArchitectureOverview onSelectLayer={(layer) => dispatch({ type: "SELECT_LAYER", layer })} />;
        }
        return (
          <DataFlowExplorer
            flow={state.selectedFlow}
            onBack={() => dispatch({ type: "SHOW_OVERVIEW" })}
          />
        );
      case "repository":
        return (
          <RepositoryExplorer
            expandedNodes={state.expandedRepoNodes}
            onToggleNode={(nodeId) => dispatch({ type: "TOGGLE_REPO_NODE", nodeId })}
            onBack={() => dispatch({ type: "SHOW_OVERVIEW" })}
          />
        );
      case "decisions":
        return (
          <ArchitectureDecisions
            expandedDecisions={state.expandedDecisions}
            onToggleDecision={(decisionId) => dispatch({ type: "TOGGLE_DECISION", decisionId })}
            onBack={() => dispatch({ type: "SHOW_OVERVIEW" })}
          />
        );
      case "projects":
        return (
          <ProjectArchitecture
            selectedProject={state.selectedProject}
            onSelectProject={(slug) => dispatch({ type: "SELECT_PROJECT", slug })}
            onBack={() => dispatch({ type: "SHOW_OVERVIEW" })}
          />
        );
      case "pipeline":
        return (
          <DevelopmentPipeline
            onBack={() => dispatch({ type: "SHOW_OVERVIEW" })}
          />
        );
      case "roadmap":
        return (
          <ArchitectureRoadmap
            onBack={() => dispatch({ type: "SHOW_OVERVIEW" })}
          />
        );
      default:
        return <ArchitectureOverview onSelectLayer={(layer) => dispatch({ type: "SELECT_LAYER", layer })} />;
    }
  };

  return (
    <div className="rounded-lg border border-border bg-popover">
      <div className="flex items-center justify-between border-b border-border px-5 pt-4 pb-3">
        <h2 className="text-lg font-semibold text-foreground">
          Interactive Architecture Explorer
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "RESET" })}
          aria-label="Reset explorer to overview"
        >
          Reset Explorer
        </Button>
      </div>

      <nav
        aria-label="Architecture explorer navigation"
        className="border-b border-border px-5"
      >
        <ExplorerTabs
          activeView={state.activeView}
          onViewChange={(view) => dispatch({ type: "SET_VIEW", view })}
        />
      </nav>

      <div className="px-4 py-5 sm:px-5">
        {renderContent()}
      </div>
    </div>
  );
}

export type { ExplorerView, ArchitectureLayerKey };
export {
  architectureLayers,
  architectureDecisions,
  dataFlows,
  repositoryTree,
  projectArchitectureExamples,
  qualityGates,
  roadmapCapabilities,
};
