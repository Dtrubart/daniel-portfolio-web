import type { ReactNode } from "react";

export function ConfigurationPanel({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-popover p-5">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {note ? (
        <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      ) : null}
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
