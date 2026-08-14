"use client";

import { StatusBadge, PriorityPill } from "./shared";
import type { MaintenanceRequest } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import { Button } from "@/components/ui/Button";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

function requestTone(
  status: MaintenanceRequest["status"],
): "open" | "closed" | "neutral" {
  return status === "Converted" || status === "Closed" ? "closed" : "open";
}

export function RequestsView({
  state,
  dispatch,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
}) {
  const open = state.requests.filter(
    (r) => r.status === "New" || r.status === "In Review",
  );
  const history = state.requests.filter(
    (r) => r.status === "Converted" || r.status === "Closed",
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Open requests can be converted into a Work Order.
      </p>

      {open.length === 0 && history.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No maintenance requests yet. Report a problem from the Equipment view.
        </p>
      ) : null}

      {open.length > 0 ? (
        <>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
            Open
          </h3>
          <RequestTable
            requests={open}
            onConvert={(id) => dispatch({ type: "CONVERT_TO_WO", requestId: id })}
          />
        </>
      ) : null}

      {history.length > 0 ? (
        <>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
            Converted
          </h3>
          <RequestTable requests={history} onConvert={null} />
        </>
      ) : null}
    </div>
  );
}

function RequestTable({
  requests,
  onConvert,
}: {
  requests: MaintenanceRequest[];
  onConvert: ((id: string) => void) | null;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary">
          <tr>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Equipment
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Issue
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Priority
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-semibold text-foreground"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-right font-semibold text-foreground"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-popover">
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                {r.id}
              </td>
              <td className="px-3 py-2 text-muted-foreground">{r.equipmentId}</td>
              <td className="px-3 py-2 text-foreground">{r.issue}</td>
              <td className="px-3 py-2">
                <PriorityPill priority={r.priority} />
              </td>
              <td className="px-3 py-2">
                <StatusBadge value={r.status} tone={requestTone(r.status)} />
              </td>
              <td className="px-3 py-2 text-right">
                {onConvert &&
                (r.status === "New" || r.status === "In Review") ? (
                  <Button size="sm" onClick={() => onConvert(r.id)}>
                    Convert to WO
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
