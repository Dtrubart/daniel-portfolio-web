export interface DriverDimension {
  id: string;
  label: string;
  direction: "higher-better" | "lower-better";
}

export function DriverScoreModel({
  dimensions,
}: {
  dimensions: DriverDimension[];
}) {
  const cx = 160;
  const cy = 160;
  const R = 120;
  const levels = [25, 50, 75, 100];
  const radii = levels.map((l) => (l / 100) * R);

  const angleForIndex = (i: number) => 90 - i * 72;
  const point = (angleDeg: number, r: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
  };

  const polygonPoints = (r: number) =>
    dimensions
      .map((_, i) => point(angleForIndex(i), r))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        className="mx-auto block text-muted-foreground"
        role="img"
        aria-label="Conceptual spider/radar chart framework with five axes and a 0–100 scale. No driver data is plotted; scores populate in Milestone 7B."
      >
        {levels.map((level, i) => {
          const r = radii[i];
          return (
            <g key={level}>
              <polygon
                points={polygonPoints(r)}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="stroke-muted-foreground/40"
              />
              {level % 25 === 0 ? (
                <text
                  x={cx}
                  y={cy - r - 6}
                  textAnchor="middle"
                  className="text-[10px] text-muted-foreground"
                >
                  {level}
                </text>
              ) : null}
            </g>
          );
        })}

        {dimensions.map((dim, i) => {
          const p = point(angleForIndex(i), R);
          return (
            <line
              key={dim.id}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              strokeWidth="1"
              className="stroke-muted-foreground/50"
            />
          );
        })}

        <circle cx={cx} cy={cy} r="3" fill="currentColor" className="fill-muted-foreground/40" />
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="stroke-muted-foreground/30"
        />
      </svg>

      <ul
        role="list"
        className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm"
      >
        {dimensions.map((dim, i) => (
          <li key={dim.id} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                background: `hsl(${(i * 72) % 360}, 70%, 55%)`,
              }}
            />
            <span className="text-muted-foreground">{dim.label}</span>
          </li>
        ))}
      </ul>

      <div className="rounded-md border border-border bg-popover p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Scoring Convention
        </p>
        <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
              Scale
            </dt>
            <dd className="text-muted-foreground">0–100, higher = better performance</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
              Radial direction
            </dt>
            <dd className="text-muted-foreground">Higher outward value = better performance</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
              Negative indicators
            </dt>
            <dd className="text-muted-foreground">
              Idle, Over-Rev, Braking, and Harsh Acceleration are inverted so lower raw values score higher.
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt             className="text-xs font-semibold uppercase tracking-wider text-accent">
              Formula
            </dt>
            <dd className="text-muted-foreground">
              Final weights and normalization formulas are pending approval before Milestone 7B.
            </dd>
          </div>
        </dl>
      </div>

      <p className="text-xs italic text-muted-foreground">
        This is a conceptual specification of the planned radar visualization. No
        chart library is used; the actual interactive radar is implemented in
        Milestone 7B.
      </p>
    </div>
  );
}
