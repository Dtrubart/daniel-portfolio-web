"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "./shared";
import {
  equipmentStatus,
  formatOdometer,
  openWorkOrderCount,
  type Equipment,
  type Priority,
} from "@/data/demos/vanbags-maintenance";
import type { MaintenanceState } from "@/data/demos/vanbags-maintenance";
import type { MaintenanceDispatch } from "./MaintenanceDemo";

const PRIORITY_OPTIONS: Priority[] = ["Low", "Medium", "High"];

export function EquipmentView({
  state,
  dispatch,
}: {
  state: MaintenanceState;
  dispatch: MaintenanceDispatch;
}) {
  const [reporting, setReporting] = useState<string | null>(null);
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  const handleSubmit = () => {
    if (!reporting || !issue.trim()) return;
    dispatch({
      type: "REPORT_REQUEST",
      equipmentId: reporting,
      issue: issue.trim(),
      priority,
    });
    setReporting(null);
    setIssue("");
    setPriority("Medium");
  };

  const equipmentName = (e: Equipment) =>
    e.plate ? `${e.name} / ${e.plate}` : e.name;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select an asset and report a problem to open a Maintenance Request.
      </p>

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
                Asset
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Odometer
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Next PM
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                Open WO
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-right font-semibold text-foreground"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-popover">
            {state.equipment.map((e) => {
              const isOpen =
                equipmentStatus(e, state.workOrders) === "Under Maintenance";
              const selected = state.selectedEquipmentId === e.id;
              return (
                <tr key={e.id} className={selected ? "bg-secondary/50" : undefined}>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                    {e.id}
                  </td>
                  <td className="px-3 py-2 text-foreground">
                    {equipmentName(e)}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{e.location}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {e.type === "vehicle" ? formatOdometer(e.odometer) : "—"}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{e.nextPMDue}</td>
                  <td className="px-3 py-2">
                    <StatusBadge
                      value={isOpen ? "Under Maintenance" : "Operational"}
                      tone={isOpen ? "open" : "closed"}
                    />
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {openWorkOrderCount(e.id, state.workOrders)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        dispatch({ type: "SELECT_EQUIPMENT", id: e.id })
                      }
                    >
                      Select
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReporting(e.id)}
                    >
                      Report Problem
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {reporting ? (
        <ReportProblemForm
          equipment={state.equipment.find((e) => e.id === reporting)}
          priority={priority}
          issue={issue}
          onPriorityChange={setPriority}
          onIssueChange={setIssue}
          onSubmit={handleSubmit}
          onCancel={() => {
            setReporting(null);
            setIssue("");
            setPriority("Medium");
          }}
        />
      ) : null}
    </div>
  );
}

function ReportProblemForm({
  equipment,
  priority,
  issue,
  onPriorityChange,
  onIssueChange,
  onSubmit,
  onCancel,
}: {
  equipment: Equipment | undefined;
  priority: Priority;
  issue: string;
  onPriorityChange: (p: Priority) => void;
  onIssueChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="rounded-md border border-border bg-secondary p-4">
      <h3 className="text-sm font-semibold text-foreground">
        Report Problem — {equipment?.name ?? "Unknown"}
      </h3>
      <div className="mt-2 space-y-3">
        <textarea
          value={issue}
          onChange={(e) => onIssueChange(e.target.value)}
          placeholder="Describe the issue"
          rows={3}
          className="w-full rounded-md border border-border bg-popover px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value as Priority)}
          className="w-full max-w-xs rounded-md border border-border bg-popover px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={onSubmit} disabled={!issue.trim()}>
          Submit
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
