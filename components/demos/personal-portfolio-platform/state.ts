"use client";

import type {
  ArchitectureLayerKey,
  DataFlow,
  ProjectArchitectureExample,
} from "@/data/demos/personal-portfolio-platform";

export type ExplorerView =
  | "overview"
  | "layer"
  | "flow"
  | "repository"
  | "decisions"
  | "projects"
  | "pipeline"
  | "roadmap";

export type RepoNodeId = string;

export interface ExplorerState {
  activeView: ExplorerView;
  selectedLayer: ArchitectureLayerKey | null;
  selectedFlow: DataFlow["id"] | null;
  expandedRepoNodes: Record<RepoNodeId, boolean>;
  expandedDecisions: Record<string, boolean>;
  selectedProject: ProjectArchitectureExample["slug"] | null;
}

export type ExplorerAction =
  | { type: "RESET" }
  | { type: "SET_VIEW"; view: ExplorerView }
  | { type: "SELECT_LAYER"; layer: ArchitectureLayerKey }
  | { type: "SELECT_FLOW"; flowId: DataFlow["id"] }
  | { type: "TOGGLE_REPO_NODE"; nodeId: RepoNodeId }
  | { type: "TOGGLE_DECISION"; decisionId: string }
  | { type: "SELECT_PROJECT"; slug: ProjectArchitectureExample["slug"] }
  | { type: "SHOW_OVERVIEW" };

const DEFAULT_EXPANDED_REPOS: Record<string, boolean> = {
  app: true,
  components: true,
  content: true,
  data: true,
  docs: true,
  lib: true,
};

const DEFAULT_EXPANDED_DECISIONS: Record<string, boolean> = {
  "static-first": true,
  "dynamic-routing": false,
  "content-separation": false,
  "client-isolation": false,
  "synthetic-data": false,
  "no-global-state": false,
  "no-cms": false,
  internationalization: false,
};

export const initialState: ExplorerState = {
  activeView: "overview",
  selectedLayer: null,
  selectedFlow: null,
  expandedRepoNodes: DEFAULT_EXPANDED_REPOS,
  expandedDecisions: DEFAULT_EXPANDED_DECISIONS,
  selectedProject: null,
};

export function getInitialState(): ExplorerState {
  return {
    activeView: "overview",
    selectedLayer: null,
    selectedFlow: null,
    expandedRepoNodes: { ...DEFAULT_EXPANDED_REPOS },
    expandedDecisions: { ...DEFAULT_EXPANDED_DECISIONS },
    selectedProject: null,
  };
}

export function reducer(
  state: ExplorerState,
  action: ExplorerAction,
): ExplorerState {
  switch (action.type) {
    case "RESET":
      return getInitialState();
    case "SET_VIEW":
      return { ...state, activeView: action.view };
    case "SELECT_LAYER":
      return {
        ...state,
        activeView: "layer",
        selectedLayer: action.layer,
      };
    case "SELECT_FLOW":
      return {
        ...state,
        activeView: "flow",
        selectedFlow: action.flowId,
      };
    case "TOGGLE_REPO_NODE": {
      const current = state.expandedRepoNodes[action.nodeId] ?? false;
      return {
        ...state,
        activeView: "repository",
        expandedRepoNodes: {
          ...state.expandedRepoNodes,
          [action.nodeId]: !current,
        },
      };
    }
    case "TOGGLE_DECISION":
      return {
        ...state,
        activeView: "decisions",
        expandedDecisions: {
          ...state.expandedDecisions,
          [action.decisionId]: !(state.expandedDecisions[action.decisionId] ?? false),
        },
      };
    case "SELECT_PROJECT":
      return {
        ...state,
        activeView: "projects",
        selectedProject: action.slug,
      };
    case "SHOW_OVERVIEW":
      return getInitialState();
    default:
      return state;
  }
}
