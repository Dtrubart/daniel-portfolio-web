export function SolutionFoundation() {
  return (
    <section className="mx-auto max-w-4xl">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
        Industrial Engineering Foundation
      </h2>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        The methodological foundation for all solution areas.
      </p>

      <div className="mt-10 flex flex-col items-center">
        <svg
          className="h-80 w-full max-w-2xl"
          viewBox="0 0 500 400"
          role="img"
          aria-label="Four solution areas converging on Industrial Engineering foundation"
        >
          <defs>
            <style>
              {`.sol-text { font-family: var(--font-sans); font-size: 13px; fill: #64748b; }
                 .ie-title { font-family: var(--font-sans); font-size: 16px; font-weight: 700; fill: #2563eb; }
                 .foundation { fill: #eff6ff; stroke: #2563eb; stroke-width: 2; }
                 .sol-card { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1; }
                 .connector { stroke: #94a3b8; stroke-width: 1.5; stroke-dasharray: 4 2; }`}
            </style>
          </defs>

          <rect x="50" y="60" width="400" height="280" rx="12" className="sol-card" />

          <text x="250" y="40" textAnchor="middle" className="ie-title">
            INDUSTRIAL ENGINEERING
          </text>

          <rect x="120" y="90" width="80" height="60" rx="8" className="sol-card" />
          <text x="160" y="105" textAnchor="middle" className="sol-text">Operational</text>
          <text x="160" y="122" textAnchor="middle" className="sol-text">Intelligence</text>

          <rect x="280" y="90" width="80" height="60" rx="8" className="sol-card" />
          <text x="320" y="105" textAnchor="middle" className="sol-text">Business Systems</text>
          <text x="320" y="122" textAnchor="middle" className="sol-text">&amp; ERP</text>

          <rect x="120" y="170" width="80" height="60" rx="8" className="sol-card" />
          <text x="160" y="185" textAnchor="middle" className="sol-text">Workflow</text>
          <text x="160" y="202" textAnchor="middle" className="sol-text">Automation</text>

          <rect x="280" y="170" width="80" height="60" rx="8" className="sol-card" />
          <text x="320" y="185" textAnchor="middle" className="sol-text">Operational</text>
          <text x="320" y="202" textAnchor="middle" className="sol-text">Excellence</text>

          <rect x="150" y="265" width="200" height="65" rx="12" className="foundation" />
          <text x="250" y="285" textAnchor="middle" className="ie-title">Industrial</text>
          <text x="250" y="305" textAnchor="middle" className="ie-title">Engineering</text>
          <text x="250" y="325" textAnchor="middle" className="sol-text">Process Design, Analysis, Optimization</text>

          <path
            className="connector"
            d="M160,75 L160,90 M240,75 L240,90 M320,75 L320,90 M160,165 L160,170 M240,165 L240,170 M320,165 L320,170 M200,230 L200,265 M280,230 L280,265"
          />
        </svg>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Daniel applies an Industrial Engineering mindset &mdash; process design,
        root-cause analysis, and systems thinking &mdash; using data, business
        systems, automation, and process improvement.
      </p>
    </section>
  );
}