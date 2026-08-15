import type { ReactNode } from "react";

import { DataArchitecture } from "@/components/projects/fleet-intelligence/DataArchitecture";
import { KPIDefinitionGrid, KpiDirectionBadge, type KpiDef } from "@/components/projects/fleet-intelligence/KPIDefinitionGrid";
import { DriverScoreModel, type DriverDimension } from "@/components/projects/fleet-intelligence/DriverScoreModel";
import { MaintenanceIntervalPreview, type ComponentInterval } from "@/components/projects/fleet-intelligence/MaintenanceIntervalPreview";
import { AlertLogic, type AlertFamily } from "@/components/projects/fleet-intelligence/AlertLogic";
import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import { ProcessFlow, type FlowStep } from "@/components/projects/ProcessFlow";
import { UATTable, type UatScenario } from "@/components/projects/UATTable";
import { DemoPreview } from "@/components/projects/DemoPreview";
import { RepositoryNote } from "@/components/projects/RepositoryNote";
import Link from "next/link";
import type { NavItem, ProjectSectionDef } from "@/lib/projectContent";
import type { Project } from "@/data/projects";

// Constants

const sectionNote =
  "This is a designed analytical platform for the case study. It documents the target system design and business logic; it is not presented as a completed production deployment, and no production, financial, or customer-specific results are claimed.";

const dataSources = [
  "Vehicle Telemetry",
  "Fuel Data",
  "Maintenance Records",
  "ERP / Asset Data",
  "Routes / Locations",
  "Driver Assignments",
  "Team Assignments",
];

const sharedDimensions = [
  "Vehicle",
  "Driver",
  "Date / Time",
  "Route",
  "Location",
  "Maintenance Component",
];

const telemetrySteps: FlowStep[] = [
  { label: "Raw Telemetry" },
  { label: "Validation / Cleaning", detail: "sensor anomalies, gaps, out-of-range values" },
  { label: "Event Classification", detail: "idle, normal, over-rev; refuel; driving events" },
  { label: "Aggregation", detail: "per vehicle / driver / route / period" },
  { label: "KPI Calculation" },
  { label: "Operational Analysis" },
];

const telemetryVariables = [
  "vehicle", "timestamp", "speed", "RPM", "ignition state",
  "odometer", "distance", "fuel level", "fuel consumption",
  "route", "driver", "location", "driving events",
];

const fleetBrands = ["Volvo", "Freightliner", "Kenworth", "International", "Mercedes-Benz", "Hino", "Isuzu"];
const vehicleTypes = ["Tractor", "Straight Truck", "Delivery Truck", "Service Vehicle"];

const operatingRanges: FlowStep[] = [
  { label: "Idle Range", detail: "engine on, vehicle effectively stationary" },
  { label: "Normal Operating Range", detail: "configured per vehicle / engine context" },
  { label: "Over-Rev Range", detail: "threshold configured per vehicle / engine context" },
];

const fleetStages: FlowStep[] = [
  { label: "Data Preparation / Integration", detail: "join across vehicle, driver, date, route, location, component" },
  { label: "Analytical Model", detail: "dimensional model (facts + dimensions)" },
  { label: "KPI / Alert Logic", detail: "KPI definitions + alert rules" },
  { label: "Fleet Intelligence", detail: "score models, ranking, alert dashboards" },
  { label: "Operational Decisions", detail: "maintenance, routing, staffing, fuel management" },
];

const kpiDefs: KpiDef[] = [
  { name: "Fuel Consumption", purpose: "Total fuel used over a period", formula: "Σ fuel consumed (liters / gallons)", interpretation: "Absolute volume consumed; compare to distance, vehicle class, and route context", direction: "lower-better" },
  { name: "Fuel Efficiency", purpose: "Distance traveled per unit of fuel", formula: "distance ÷ fuel consumed (km/L or mpgUS)", interpretation: "Higher values indicate more efficient operation; sensitive to vehicle class and load", direction: "higher-better" },
  { name: "Fuel Level", purpose: "Current fuel in tank as % or volume", formula: "tank level reading (normalized 0–100%)", interpretation: "Monitored for refuel events and unexpected drops", direction: "higher-better" },
  { name: "Refuel Events", purpose: "Authorized fuel additions", formula: "count of level increases above noise threshold", interpretation: "Used to reconcile consumption and confirm authorized top-ups", direction: "higher-better" },
  { name: "Idle %", purpose: "Engine-on time spent idling", formula: "time with RPM in Idle Range ÷ Total Engine-On Time", interpretation: "Lower is more efficient; higher may indicate queuing or driver behaviour issues", direction: "lower-better" },
  { name: "Over-Rev %", purpose: "Engine-on time in the over-rev band", formula: "time with RPM in Over-Rev Range ÷ Total Engine-On Time", interpretation: "Lower is better; high values indicate excessive engine speed relative to load", direction: "lower-better" },
  { name: "Braking Events / km", purpose: "Frequency of harsh braking per distance", formula: "count of braking events ÷ distance traveled", interpretation: "Normalized exposure; lower indicates smoother driving", direction: "lower-better" },
  { name: "Harsh Acceleration Events / km", purpose: "Frequency of harsh acceleration per distance", formula: "count of harsh acceleration events ÷ distance traveled", interpretation: "Normalized exposure; lower indicates smoother driving", direction: "lower-better" },
  { name: "Maintenance Remaining Distance", purpose: "Distance remaining to next service", formula: "Next Due - Current Odometer", interpretation: "Drives Due Soon / Overdue status; lower values indicate upcoming maintenance", direction: "higher-better" },
  { name: "Driver Performance Score", purpose: "Composite normalized performance across the five dimensions", formula: "0–100 composite of normalized dimensions", interpretation: "100 = best; weights pending approval", direction: "higher-better" },
  { name: "Team Performance Score", purpose: "Composite collective team performance", formula: "0–100 reflecting team-wide consistency and adherence", interpretation: "Designed to reward consistent collective performance", direction: "higher-better" },
];

const driverDimensions: DriverDimension[] = [
  { id: "fuel", label: "Fuel Performance", direction: "higher-better" },
  { id: "idle", label: "Idle %", direction: "lower-better" },
  { id: "overrev", label: "Over-Rev %", direction: "lower-better" },
  { id: "braking", label: "Braking Events / km", direction: "lower-better" },
  { id: "accel", label: "Harsh Acceleration Events / km", direction: "lower-better" },
];

const componentIntervals: ComponentInterval[] = [
  { component: "Engine Oil", lastService: 420000, interval: 15000, currentOdometer: 432000, status: "OK" },
  { component: "Oil Filter", lastService: 418000, interval: 16000, currentOdometer: 432000, status: "Due Soon" },
  { component: "Fuel Filter", lastService: 410000, interval: 20000, currentOdometer: 432000, status: "Overdue" },
  { component: "Transmission", lastService: 390000, interval: 60000, currentOdometer: 432000, status: "OK" },
  { component: "Differential", lastService: 390000, interval: 40000, currentOdometer: 432000, status: "Overdue" },
  { component: "Brake Inspection", lastService: 424000, interval: 10000, currentOdometer: 432000, status: "Due Soon" },
];

const routes = [
  { name: "Vancouver → Surrey", distance: "38 km", efficiency: "3.1 km/L", idle: "7%" },
  { name: "Vancouver → Abbotsford", distance: "75 km", efficiency: "3.4 km/L", idle: "5%" },
  { name: "Burnaby → Richmond", distance: "12 km", efficiency: "2.9 km/L", idle: "9%" },
  { name: "Vancouver → Kamloops", distance: "340 km", efficiency: "3.6 km/L", idle: "4%" },
  { name: "Toronto → Mississauga", distance: "25 km", efficiency: "3.0 km/L", idle: "8%" },
  { name: "Seattle → Tacoma", distance: "45 km", efficiency: "3.3 km/L", idle: "6%" },
];

const individualRanking = [
  { rank: 1, driver: "Driver A", score: 92 },
  { rank: 2, driver: "Driver B", score: 89 },
  { rank: 3, driver: "Driver C", score: 86 },
];

const teamRanking = [
  { team: "Team Alpha", meanScore: 87, variance: 4.2, lowScore: 81, highScore: 93 },
  { team: "Team Beta", meanScore: 82, variance: 9.8, lowScore: 68, highScore: 94 },
  { team: "Team Gamma", meanScore: 78, variance: 6.1, lowScore: 72, highScore: 85 },
];

const uatScenarios: UatScenario[] = [
  {
    scenario: "Normal fuel consumption",
    behavior: "Telemetry shows steady fuel decrease proportional to distance and engine load.",
    validation: "Fuel efficiency falls within the modelled expected band for the vehicle class and route.",
  },
  {
    scenario: "Authorized refuel",
    behavior: "A driver initiates a refuel; fuel level increases above noise threshold.",
    validation: "The event is timestamped and attributed to a driver; consumption is reconciled against the prior leg.",
  },
  {
    scenario: "Unexpected fuel drop with ignition off",
    behavior: "Fuel level decreases while vehicle is stationary and ignition is off, with no authorized refuel logged.",
    validation: "A suspected fuel-theft alert is raised for operational review (illustrative rule).",
  },
  {
    scenario: "Normal operating profile",
    behavior: "RPM spends the majority of engine-on time in the Normal Operating Range.",
    validation: "Idle % and Over-Rev % are low relative to fleet baselines.",
  },
  {
    scenario: "High idle",
    behavior: "Extended time with RPM in the Idle Range while ignition is on.",
    validation: "Idle % is elevated; alert candidate for investigation.",
  },
  {
    scenario: "Over-rev exposure",
    behavior: "RPM exceeds the Over-Rev threshold during acceleration or coasting.",
    validation: "Over-Rev % is elevated; flag for driver-feedback review.",
  },
  {
    scenario: "Component OK",
    behavior: "Remaining distance to next service is comfortably above the near-term window.",
    validation: "Status = OK.",
  },
  {
    scenario: "Due Soon",
    behavior: "Remaining distance is approaching the configurable near-term window.",
    validation: "Status = Due Soon; schedule preparation.",
  },
  {
    scenario: "Overdue",
    behavior: "Current odometer exceeds the next-due reading.",
    validation: "Status = Overdue; prioritize service.",
  },
  {
    scenario: "Balanced strong performance",
    behavior: "All five dimensions score in the upper band.",
    validation: "Composite score is high with low variance across dimensions.",
  },
  {
    scenario: "One weak indicator",
    behavior: "Four dimensions score high; one dimension is low.",
    validation: "Composite score is moderate; the weak dimension is flagged for targeted feedback.",
  },
  {
    scenario: "Consistently good drivers",
    behavior: "Team members all score in the upper band with low variance.",
    validation: "Team score is high; collective consistency is strong.",
  },
  {
    scenario: "One excellent driver but several weak drivers",
    behavior: "One driver scores high; multiple drivers score low; team variance is high.",
    validation: "Mean score is moderate but the team score reflects weak collective consistency rather than the single strong driver.",
  },
  {
    scenario: "Same driver on different routes",
    behavior: "A driver operates two routes with different distance and context.",
    validation: "Efficiency and idle differ by route context; comparisons control for route rather than ranking drivers on raw totals.",
  },
];

const evidenceTypes = [
  "Data architecture diagram",
  "Analytical (dimensional) model",
  "KPI definitions",
  "SQL / transformation logic",
  "Power BI report concepts",
  "DAX measure examples",
  "Synthetic dataset design",
  "Driver and team scoring methodology",
  "Validation scenarios",
];

const alertFamilies: AlertFamily[] = [
  {
    category: "Fuel",
    severity: "warning",
    alerts: [
      { label: "Potential fuel theft", severity: "critical" },
      { label: "Unexpected fuel drop", severity: "warning" },
    ],
  },
  {
    category: "Maintenance",
    severity: "warning",
    alerts: [
      { label: "Component due soon", severity: "warning" },
      { label: "Component overdue", severity: "critical" },
    ],
  },
  {
    category: "Driver Behaviour",
    severity: "info",
    alerts: [
      { label: "Elevated idle", severity: "warning" },
      { label: "Excessive over-rev", severity: "warning" },
      { label: "Elevated braking events", severity: "warning" },
      { label: "Elevated harsh acceleration", severity: "warning" },
    ],
  },
];

const demoFeatures = [
  { name: "Fleet Overview", desc: "Vehicles, brands/types, operational status" },
  { name: "Fuel", desc: "Consumption, efficiency, tank level, refuel events, theft alert" },
  { name: "RPM", desc: "Idle, normal, over-rev operating ranges" },
  { name: "Maintenance", desc: "Component intervals, due soon / overdue status" },
  { name: "Routes", desc: "Comparative route performance" },
  { name: "Drivers", desc: "Individual ranking and radar chart" },
  { name: "Teams", desc: "Team ranking and collective-performance logic" },
];

// Component Functions

export function fleetIntelligenceNav(): NavItem[] {
  return [
    { id: "overview", label: "Overview" },
    { id: "data-model", label: "Data Model" },
    { id: "fuel-rpm", label: "Fuel & RPM" },
    { id: "maintenance", label: "Maintenance" },
    { id: "routes", label: "Routes" },
    { id: "driver-performance", label: "Driver Performance" },
    { id: "architecture", label: "Architecture" },
    { id: "demo-evidence", label: "Demo / Evidence" },
  ];
}

function Overview(project: Project): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">{project.title}</span> is an operational-intelligence platform combining vehicle telemetry, fuel, maintenance, routes, and driver-behaviour data into an analytics model that supports fleet monitoring, maintenance planning, fuel control, safety analysis, and performance management.
      </p>
      <p className="text-muted-foreground">
        The solution integrates multiple fleet-related datasets into a cohesive decision-support architecture, enabling comparative performance analysis and operational optimization across the enterprise.
      </p>
      <p className="text-sm italic text-muted-foreground">{sectionNote}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fleetBrands.map((brand) => (
          <div
            key={brand}
            className="rounded-md border border-border bg-popover p-3 text-sm text-muted-foreground"
          >
            <span className="font-medium text-foreground">{brand}</span> — {vehicleTypes.join(", ")} (illustrative examples, no affiliation)
          </div>
        ))}
      </div>
    </>
  );
}

function DataModel(): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">Data Sources</h3>
      <DataArchitecture sources={dataSources} stages={fleetStages} />

      <h3 className="text-lg font-semibold text-foreground">Shared Dimensions</h3>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {sharedDimensions.map((dim) => (
          <li key={dim}>{dim}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-foreground">Telemetry Model</h3>
      <p className="text-sm text-muted-foreground">The future analytical model will use these telemetry variables:</p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {telemetryVariables.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
      <ProcessFlow steps={telemetrySteps} />
    </>
  );
}

function FuelAndRpm(): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">Fuel Analytics</h3>
      <p className="text-muted-foreground">
        Fuel analytics cover consumption, efficiency, tank level, refuel events, and fuel-level trends. <strong>Note:</strong> Fuel Consumption and Fuel Efficiency are distinct concepts — consumption is absolute volume, while efficiency is distance per unit of fuel.
      </p>
      <p className="text-sm italic text-muted-foreground">
        Units are normalized by vehicle class; no universal unit across every vehicle unless clearly stated.
      </p>

      <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <h4 className="text-sm font-semibold text-foreground">Potential Fuel Theft Alert (Illustrative Rule)</h4>
        <p className="mt-1 text-xs uppercase tracking-wider text-amber-700">An illustrative analytical rule for the portfolio</p>
        <ul className="list-disc list-outside ml-5 mt-2 text-sm text-muted-foreground">
          <li>Unexpected fuel-level decrease</li>
          <li>Vehicle stationary</li>
          <li>Ignition OFF</li>
          <li>No authorized corresponding event</li>
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          This is an illustrative analytical rule for the portfolio and NOT a validated theft-detection algorithm, a production fraud system, or proof of theft. Operational investigation would still be required.
        </p>
      </div>

      <h3 className="text-lg font-semibold text-foreground">RPM & Engine Behaviour</h3>
      <p className="text-sm text-muted-foreground">
        Engine behavior is documented in three conceptual operating ranges: Idle, Normal Operating Range, Over-Rev. Thresholds must be configured by vehicle / engine context.
      </p>
      <ProcessFlow steps={operatingRanges} />

      <h3 className="text-lg font-semibold text-foreground">Driving Events</h3>
      <p className="text-muted-foreground">
        Driver behaviour indicators are normalized by distance:
      </p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        <li>
          <strong>Braking Events / Distance</strong> — count of harsh braking events divided by distance traveled.
        </li>
        <li>
          <strong>Harsh Acceleration Events / Distance</strong> — count of harsh acceleration events divided by distance traveled.
        </li>
      </ul>
      <p className="text-xs italic text-muted-foreground">
        Sensor thresholds are not defined in M7A and should be configurable in future demo data.
      </p>
    </>
  );
}

function Maintenance(): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">Flexible Maintenance</h3>
      <p className="text-muted-foreground">
        Component-specific maintenance intervals are based on vehicle usage. Example illustrative components:
      </p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        <li>Engine Oil</li>
        <li>Oil Filter</li>
        <li>Fuel Filter</li>
        <li>Transmission</li>
        <li>Differential</li>
        <li>Brake Inspection</li>
      </ul>
      <p className="text-xs italic text-muted-foreground">
        Each component can conceptually have: Last Service Reading, Interval, Next Due Reading, Current Odometer, Remaining Distance, and Status (OK / Due Soon / Overdue). Illustrated values are illustrative only; they do not represent manufacturer recommendations.
      </p>

      <MaintenanceIntervalPreview components={componentIntervals} />

      <h3 className="text-lg font-semibold text-foreground">Maintenance Calculation</h3>
      <p className="text-sm text-muted-foreground">
        The conceptual calculation follows:
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ConfigurationPanel title="Conceptual Formula" note="Illustrative, not a universal definition">
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-semibold text-foreground">Next Due</dt>
              <dd className="text-muted-foreground">Last Service Odometer + Component Interval</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Remaining Distance</dt>
              <dd className="text-muted-foreground">Next Due - Current Odometer</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Status derivation</dt>
              <dd className="text-muted-foreground">0 km → Overdue; 1–15000 km → Due Soon; &gt;15000 km → OK</dd>
            </div>
          </dl>
        </ConfigurationPanel>
        <div className="text-sm text-muted-foreground">
          <p>The Due Soon threshold is configurable and may vary by component criticality.</p>
          <p>Illustrative values are shown in the table above; they do not claim real operational data.</p>
        </div>
      </div>
    </>
  );
}

function Routes(): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">Route Intelligence</h3>
      <p className="text-muted-foreground">
        Illustrative routes are synthetic analytical examples and do not imply actual company routes.
      </p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {routes.map((r) => (
          <li key={r.name}>{r.name}: {r.distance}, efficiency {r.efficiency}, idle {r.idle}</li>
        ))}
      </ul>
      <p className="text-xs italic text-muted-foreground mt-2">
        Route context matters when comparing driver or fleet performance; longer routes may have higher absolute fuel consumption but lower idle % per km.
      </p>
    </>
  );
}

function DriverPerformance(): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">Driver Performance Model</h3>
      <p className="text-muted-foreground">
        The model uses exactly these five analytical dimensions:
      </p>
<ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {driverDimensions.map((dim) => (
          <li key={dim.id} className="flex items-start gap-2">
            <KpiDirectionBadge value={dim.direction} />
            <span className="mt-1.5 text-muted-foreground">{dim.label}</span>
          </li>
        ))}
</ul>
      <DriverScoreModel dimensions={driverDimensions} />

      <h3 className="text-lg font-semibold text-foreground">Normalization Philosophy</h3>
      <p className="text-sm text-muted-foreground">
        Because the five dimensions have different units and directions, they must be normalized to a common scale (0–100 score). Higher outward value equals better performance.
      </p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        <li>100 = better performance</li>
        <li>Negative indicators (Idle %, Over-Rev %, Braking / km, Harsh Acceleration / km) are inverted: lower raw values translate to higher normalized scores.</li>
        <li>Fuel Performance accounts for efficiency relative to operating context, vehicle class, and route context. Do not automatically equate raw fuel consumption with performance.</li>
      </ul>

      <h3 className="text-lg font-semibold text-foreground">Individual Driver Ranking</h3>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Rank</th>
              <th className="px-4 py-2 text-left font-semibold">Driver</th>
              <th className="px-4 py-2 text-right font-semibold">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-popover">
            {individualRanking.map((r) => (
              <tr key={r.rank} className="align-top">
                <td className="px-4 py-2 text-muted-foreground">{r.rank}</td>
                <td className="px-4 py-2 text-foreground">{r.driver}</td>
                <td className="px-4 py-2 text-right text-muted-foreground">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-foreground">Team Ranking</h3>
      <p className="text-sm text-muted-foreground">
        <strong>Teamwork Design Principle:</strong> Team performance rewards consistent collective performance rather than allowing one exceptional driver to fully compensate for weak team-wide performance.
      </p>
      <p className="text-sm text-muted-foreground">
        The analytical intent is to encourage shared operating standards, peer improvement, and consistent team performance. It should not be framed as employee surveillance or punitive scoring.
      </p>
      <p className="text-sm text-muted-foreground">
        Possible future methodology may consider: mean score, consistency/variance, lower-performing members, and team-wide adherence — but no final formula is chosen during M7A.
      </p>
      <div className="mt-4 overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Team</th>
              <th className="px-4 py-2 text-right font-semibold">Mean Score</th>
              <th className="px-4 py-2 text-right font-semibold">Variance</th>
              <th className="px-4 py-2 text-right font-semibold">Low Score</th>
              <th className="px-4 py-2 text-right font-semibold">High Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-popover">
            {teamRanking.map((t) => (
              <tr key={t.team} className="align-top">
                <td className="px-4 py-2 text-foreground">{t.team}</td>
                <td className="px-4 py-2 text-right text-muted-foreground">{t.meanScore}</td>
                <td className="px-4 py-2 text-right text-muted-foreground">{t.variance}</td>
                <td className="px-4 py-2 text-right text-muted-foreground">{t.lowScore}</td>
                <td className="px-4 py-2 text-right text-muted-foreground">{t.highScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Architecture(): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">Data Architecture</h3>
      <p className="text-sm text-muted-foreground">
        Visual architecture showing the flow from source systems through integration, analytical modeling, KPI/alert logic, and operational decisions.
      </p>
      <DataArchitecture sources={dataSources} stages={fleetStages} />

      <h3 className="text-lg font-semibold text-foreground">Analytical Model</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <ConfigurationPanel title="Dimensions">
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Dim Vehicle</li>
            <li>Dim Driver</li>
            <li>Dim Date</li>
            <li>Dim Route</li>
            <li>Dim Location</li>
            <li>Dim Team</li>
            <li>Dim Maintenance Component</li>
          </ul>
        </ConfigurationPanel>
        <ConfigurationPanel title="Facts">
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Fact Telemetry</li>
            <li>Fact Fuel</li>
            <li>Fact Driving Events</li>
            <li>Fact Maintenance</li>
            <li>Fact Route Performance</li>
          </ul>
        </ConfigurationPanel>
      </div>
      <p className="text-xs italic text-muted-foreground">
        No real database schema is published; this is conceptual analytical architecture.
      </p>

      <h3 className="text-lg font-semibold text-foreground">KPI Definitions</h3>
      <p className="text-sm text-muted-foreground">
        Professional KPI glossary (minimum includes Fuel Consumption, Fuel Efficiency, Idle %, Over-Rev %, Braking Events / km, Harsh Acceleration Events / km, Maintenance Remaining Distance, Driver Performance Score, Team Performance Score). Each includes purpose, conceptual formula, and interpretation.
      </p>
      <KPIDefinitionGrid kpis={kpiDefs} />

      <h3 className="text-lg font-semibold text-foreground">Alert Logic</h3>
      <AlertLogic families={alertFamilies} />
    </>
  );
}

function DemoEvidence(project: Project): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">Testing / Validation</h3>
      <p className="text-sm text-muted-foreground">Scenario-driven validation examples grouped by area:</p>
      <UATTable scenarios={uatScenarios} />

<h3 className="text-lg font-semibold text-foreground">Interactive Demo</h3>
       <p className="text-sm text-muted-foreground">
         Interactive Fleet Intelligence dashboard is live.
       </p>
       <DemoPreview project={project} />
       <div className="mt-6 rounded-lg border border-border bg-popover p-5">
         <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
           <p className="text-xs font-semibold uppercase tracking-wider text-accent">Interactive Demo</p>
           <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">Live</span>
         </div>
         <p className="text-sm text-muted-foreground">
           The interactive dashboard includes the following sections:
         </p>
         <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
           {demoFeatures.map((feature) => (
             <li key={feature.name} className="flex items-center gap-2">
               <span
                 aria-hidden="true"
                 className="h-2 w-2 shrink-0 rounded-full bg-accent"
               />
               <span className="text-sm text-muted-foreground">{feature.name}</span>
               <span className="text-xs text-muted-foreground/70 ml-auto">{feature.desc}</span>
             </li>
           ))}
         </ul>
<div className="mt-4 flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
            <Link
              href="/projects/fleet-intelligence/demo"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
              aria-label="Launch Interactive Dashboard"
            >
              Launch Interactive Dashboard
            </Link>
            <span className="text-xs text-muted-foreground">
              Live interactive fleet analytics dashboard available.
            </span>
          </div>
       </div>

      <h3 className="text-lg font-semibold text-foreground">Technical Evidence</h3>
      <p className="text-sm text-muted-foreground">
        Evidence that will be linked when each artifact is cleared for public sharing:
      </p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {evidenceTypes.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
      <RepositoryNote project={project} />
    </>
  );
}

export function fleetIntelligenceSections(project: Project): ProjectSectionDef[] {
  return [
    { id: "overview", title: "Overview", body: Overview(project) },
    { id: "data-model", title: "Data Model", body: DataModel() },
    { id: "fuel-rpm", title: "Fuel & RPM", body: FuelAndRpm() },
    { id: "maintenance", title: "Maintenance", body: Maintenance() },
    { id: "routes", title: "Routes", body: Routes() },
    { id: "driver-performance", title: "Driver Performance", body: DriverPerformance() },
    { id: "architecture", title: "Architecture", body: Architecture() },
    { id: "demo-evidence", title: "Demo / Evidence", body: DemoEvidence(project) },
  ];
}
