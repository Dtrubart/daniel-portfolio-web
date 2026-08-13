import { cn } from "@/lib/utils";

export interface TirePosition {
  code: string;
  position: string;
  tireId: string | null;
}

interface AxleLayout {
  label: string;
  positions: TirePosition[];
}

export function TireLayout({
  vehicle,
  axles,
}: {
  vehicle: { name: string; plate: string };
  axles: AxleLayout[];
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <div>
          <span className="font-medium text-foreground">{vehicle.name}</span>
          <span className="text-muted-foreground"> / Plate: {vehicle.plate}</span>
        </div>
      </div>

      <div className="rounded-lg border-2 border-dashed border-border bg-popover p-3">
        <div className="flex flex-col items-stretch justify-center gap-4">
          {axles.map((axle) => (
            <AxleRow key={axle.label} axle={axle} />
          ))}
        </div>
      </div>

      <TireLegend />
    </div>
  );
}

function AxleRow({ axle }: { axle: AxleLayout }) {
  const isFront = axle.positions.length === 2;
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
        {axle.label}
      </span>
      <div
        className={cn(
          "flex items-center justify-center gap-1.5",
          isFront ? "flex-wrap justify-center gap-4" : "flex-wrap",
        )}
      >
          {axle.positions.map((position) => (
            <TireCell key={position.code} position={position} />
          ))}
      </div>
    </div>
  );
}

function TireCell({
  position,
}: {
  position: TirePosition;
}) {
  const occupied = position.tireId !== null;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {position.position}
      </span>
      <div
        aria-label={
          occupied
            ? `${position.code}: ${position.tireId}`
            : `${position.code}: Empty`
        }
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-md border text-[10px] font-medium leading-tight",
          "text-center",
          occupied
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-slate-300 bg-secondary text-muted-foreground",
        )}
      >
        {occupied ? (
          <>
            <span className="block">{position.code}</span>
            <span className="block font-mono">{position.tireId}</span>
          </>
        ) : (
          <span className="block">{position.code}</span>
        )}
      </div>
    </div>
  );
}

const legendItems = [
  { label: "Occupied", occupied: true },
  { label: "Empty position", occupied: false },
];

function TireLegend() {
  return (
    <ul
      role="list"
      className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
    >
      {legendItems.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={cn(
              "h-2.5 w-2.5 shrink-0 rounded-sm",
              item.occupied
                ? "bg-emerald-500/40"
                : "bg-slate-400/40",
            )}
          />
          <span>{item.label}</span>
        </li>
      ))}
      <li className="text-xs text-muted-foreground">
        Position codes encode axle, side, and inner/outer — the tire ID at a
        position uniquely identifies the installed asset.
      </li>
    </ul>
  );
}
