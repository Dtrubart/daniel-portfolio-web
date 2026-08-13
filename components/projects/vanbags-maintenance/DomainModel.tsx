import type { ReactNode } from "react";

export interface DomainNode {
  label: string;
  detail?: string;
  children?: DomainNode[];
}

export function DomainModel({ nodes }: { nodes: DomainNode[] }) {
  return <DomainTree nodes={nodes} />;
}

function DomainTree({ nodes }: { nodes: DomainNode[] }): ReactNode {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {nodes.map((node) => (
        <li key={node.label} className="list-none">
          <div className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-foreground/40"
            />
            <div className="min-w-0 flex-1">
              <span className="font-medium text-foreground">{node.label}</span>
              {node.detail ? (
                <p className="mt-0.5 text-muted-foreground">{node.detail}</p>
              ) : null}
              {node.children ? (
                <div className="mt-2 ml-3 border-l border-border pl-4">
                  <DomainTree nodes={node.children} />
                </div>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
