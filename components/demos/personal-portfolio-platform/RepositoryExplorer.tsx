"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { RepoNodeId } from "./state";
import type { RepositoryNode } from "@/data/demos/personal-portfolio-platform";
import { repositoryTree } from "@/data/demos/personal-portfolio-platform";

export function RepositoryExplorer({
  expandedNodes,
  onToggleNode,
  onBack,
}: {
  expandedNodes: Record<RepoNodeId, boolean>;
  onToggleNode: (nodeId: RepoNodeId) => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">
          Repository Explorer
        </h3>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Overview
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Click to expand a folder and explore its contents and responsibilities.
        Only the conceptual architecture structure is shown.
      </p>

      <div className="space-y-2">
        {repositoryTree.map((node) => (
          <RepositoryTreeNode
            key={node.path}
            node={node}
            depth={0}
            expandedNodes={expandedNodes}
            onToggleNode={onToggleNode}
          />
        ))}
      </div>
    </div>
  );
}

function RepositoryTreeNode({
  node,
  depth,
  expandedNodes,
  onToggleNode,
}: {
  node: RepositoryNode;
  depth: number;
  expandedNodes: Record<RepoNodeId, boolean>;
  onToggleNode: (nodeId: RepoNodeId) => void;
}) {
  const isExpanded = expandedNodes[node.path] ?? false;
  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = Math.max(depth * 1.25, 0.5);

  return (
    <div>
      <div
        className={cn(
          "flex items-start gap-2 py-1",
          "focus-within:bg-secondary/50",
        )}
        style={{ paddingLeft: `${paddingLeft}rem` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggleNode(node.path)}
            aria-expanded={isExpanded}
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground focus-visible:outline-none"
          >
            <span aria-hidden="true">
              {isExpanded ? "▼" : "▶"}
            </span>{" "}
            <span className="font-mono">{node.name}</span>
          </button>
        ) : (
          <>
            <span
              className="text-xs text-muted-foreground/60"
              aria-hidden="true"
            >
              •
            </span>{" "}
            <span className="font-mono text-xs text-muted-foreground">
              {node.name}
            </span>
          </>
        )}
      </div>

      {node.responsibility ? (
        <div
          className="text-xs text-muted-foreground"
          style={{ paddingLeft: `${paddingLeft + 1}rem` }}
        >
          {node.responsibility}
        </div>
      ) : null}

      {hasChildren && isExpanded
        ? node.children!.map((child) => (
            <RepositoryTreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              expandedNodes={expandedNodes}
              onToggleNode={onToggleNode}
            />
          ))
        : null}
    </div>
  );
}
