import { FlowStep, ProcessFlow } from "@/components/projects/ProcessFlow";

interface Tire {
  id: string;
  vehicle: string;
  plate: string;
}

export function TireHistory({
  tire,
  movements,
}: {
  tire: Tire;
  movements: FlowStep[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm">
          <span className="font-medium text-foreground">{tire.id}</span>
          <span className="text-muted-foreground">
            {" "}
            on {tire.vehicle} / {tire.plate}
          </span>
        </p>
        <span className="text-xs text-muted-foreground">
          Individually traceable asset — not a consumable quantity
        </span>
      </div>

      <ProcessFlow steps={movements} />
    </div>
  );
}
