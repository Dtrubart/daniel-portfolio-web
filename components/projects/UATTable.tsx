export interface UatScenario {
  scenario: string;
  behavior: string;
  validation: string;
}

export function UATTable({ scenarios }: { scenarios: UatScenario[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-foreground">
              Scenario
            </th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">
              Expected System Behavior
            </th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">
              Validation Objective
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-popover">
          {scenarios.map((scenario) => (
            <tr key={scenario.scenario}>
              <td className="px-4 py-2 align-top text-muted-foreground">
                {scenario.scenario}
              </td>
              <td className="px-4 py-2 align-top text-muted-foreground">
                {scenario.behavior}
              </td>
              <td className="px-4 py-2 align-top text-muted-foreground">
                {scenario.validation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
