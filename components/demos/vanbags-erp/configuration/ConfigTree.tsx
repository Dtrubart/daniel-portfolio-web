"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { TreeNode } from "@/data/demos/vanbags-erp";

export function ConfigTree({ nodes }: { nodes: TreeNode[] }) {
  return (
    <ul role="tree" className="space-y-1 text-sm text-muted-foreground">
      {nodes.map((node, index) => (
        <ConfigTreeNode key={`${node.label}-${index}`} node={node} />
      ))}
    </ul>
  );
}

function ConfigTreeNode({ node }: { node: TreeNode }) {
  const [open, setOpen] = useState(true);
  const treeId = useId();
  const children = node.children ?? [];
  const hasChildren = children.length > 0;

  return (
    <li>
      <div className="flex items-center gap-1">
        {hasChildren ? (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={treeId}
              onClick={() => setOpen(!open)}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded text-sm",
                "text-muted-foreground hover:bg-secondary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
              aria-label={open ? `Collapse ${node.label}` : `Expand ${node.label}`}
            >
              {open ? "−" : "+"}
            </button>
            <span className="font-medium text-foreground">{node.label}</span>
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="block h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
            />
            <span>{node.label}</span>
          </>
        )}
      </div>

      {hasChildren && open && (
        <ul
          id={treeId}
          role="group"
          className="ml-5 mt-1 space-y-1 border-l border-border pl-3"
        >
          {children.map((child, index) => (
            <ConfigTreeNode
              key={`${child.label}-${index}`}
              node={child}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
