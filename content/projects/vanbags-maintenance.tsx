
      <p className="mt-6 text-xs text-muted-foreground">
        A Guided Tour mode is also available at the same demo URL by appending
        ?mode=guided. The tour walks through 13 steps — register equipment, configure
        templates, build a maintenance plan, install tires, simulate fleet operation,
        respond to alerts, perform tire inspection, reach PM trigger, generate a
        preventive work order, execute activities and parts, send to backlog on a
        part shortage, create a follow-up work order, and trace the tire lifecycle.
        Each step uses the same synthetic data and enforces the same business rules
        as the interactive workspace.
      </p>
import type { ReactNode } from "react";

import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import { DemoPreview } from "@/components/projects/DemoPreview";
import { ProcessFlow, type FlowStep } from "@/components/projects/ProcessFlow";
import { RepositoryNote } from "@/components/projects/RepositoryNote";
import { CapabilitiesDemonstrated } from "@/components/projects/CapabilitiesDemonstrated";
import { UATTable, type UatScenario } from "@/components/projects/UATTable";
import {
  DomainModel,
  type DomainNode,
} from "@/components/projects/vanbags-maintenance/DomainModel";
import {
  PartsIntegration,
  type MaterialAvailability,
  type PartRequirement,
} from "@/components/projects/vanbags-maintenance/PartsIntegration";
import {
  TireLayout,
  type TirePosition,
} from "@/components/projects/vanbags-maintenance/TireLayout";
import { TireHistory } from "@/components/projects/vanbags-maintenance/TireHistory";
import {
  WorkOrderPreview,
  type WorkOrder,
} from "@/components/projects/vanbags-maintenance/WorkOrderPreview";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { NavItem, ProjectSectionDef } from "@/lib/projectContent";
import type { Project } from "@/data/projects";

export function vanbagsMaintenanceNav(): NavItem[] {
  return [
    { id: "overview", label: "Overview" },
    { id: "domain", label: "Domain" },
    { id: "work-orders", label: "Work Orders" },
    { id: "logistics", label: "Logistics" },
    {
      id: "preventive",
      label: "Preventive Maintenance & History",
    },
    { id: "tires", label: "Tire Management" },
    { id: "architecture", label: "Architecture" },
    { id: "capabilities", label: "Capabilities Demonstrated" },
    { id: "demo-evidence", label: "Demo & Evidence" },
  ];
}

const sectionNote =
  "This is a designed operational model for the case study. It documents the target system design and business logic; it is not presented as a completed production deployment, and no production, financial, or customer-specific results are claimed.";

const domainTree: DomainNode[] = [
  {
    label: "Equipment / Vehicle",
    detail: "vehicles, assets, and equipment records",
  },
  {
    label: "Preventive Maintenance Plan",
    detail: "repeating, scheduled maintenance",
    children: [{ label: "PM Schedule" }],
  },
  {
    label: "Maintenance Request",
    children: [
      {
        label: "Work Order",
        children: [
          { label: "Activities" },
          { label: "Technician Assignment" },
          { label: "Parts Requirement" },
          { label: "Downtime" },
          { label: "Completion" },
        ],
      },
    ],
  },
  { label: "Service History" },
  {
    label: "Tire Positions / Tire History",
    detail: "tire as an individually traceable asset",
  },
];

const lifecycleSteps: FlowStep[] = [
  { label: "Equipment / Vehicle" },
  {
    label: "Maintenance Requirement",
    detail: "reported fault, schedule, or threshold",
  },
  { label: "Maintenance Request" },
  { label: "Work Order" },
  {
    label: "Parts Check",
    detail: "availability verification against logistics",
  },
  { label: "Technician Execution" },
  { label: "Completion" },
  { label: "Service History" },
];

const workOrder: WorkOrder = {
  id: "WO-DEMO-004",
  vehicle: "TRK-DEMO-017",
  plate: "BC-DEMO-4827",
  issue: "Front axle vibration",
  priority: "High",
  location: "Vancouver Demo Warehouse",
  technician: "Alex Morgan",
  status: "In Progress",
  activities: [
    {
      id: "A1",
      label: "Inspect front axle",
      technician: "Alex Morgan",
      status: "Complete",
    },
    {
      id: "A2",
      label: "Diagnose bearing condition",
      technician: "Alex Morgan",
      status: "Complete",
    },
    {
      id: "A3",
      label: "Replace bearing",
      technician: "Jordan Lee",
      status: "In Progress",
    },
    {
      id: "A4",
      label: "Functional test",
      technician: "Jordan Lee",
      status: "Pending",
    },
  ],
};

const partsFlow: FlowStep[] = [
  { label: "Work Order" },
  { label: "Parts Requirement", detail: "list of required materials" },
  { label: "Warehouse Availability", detail: "checked against on-hand stock" },
  { label: "Reservation", detail: "allocated to the order" },
  { label: "Issue / Consumption", detail: "posted to the work order" },
  { label: "Work Execution", detail: "parts consumed on completion" },
];

const requiredParts: PartRequirement[] = [
  { part: "Bearing 6205", required: 1, available: 4, reserved: 1, status: "Reserved" },
  { part: "Seal Kit", required: 1, available: 2, reserved: 1, status: "Reserved" },
  { part: "Lubricant", required: 2, available: 8, reserved: 0, status: "Available" },
];

const shortagePart: MaterialAvailability = {
  part: "Containment Ring",
  required: 2,
  available: 1,
  reserved: 0,
};

const pmFlow: FlowStep[] = [
  { label: "Equipment" },
  { label: "PM Plan" },
  { label: "Interval / Trigger", detail: "calendar, hours, or kilometers" },
  { label: "Scheduled Maintenance" },
  { label: "Work Order" },
  { label: "Completion" },
  { label: "Next Due" },
];

const serviceHistory: FlowStep[] = [
  {
    label: "PM Service",
    detail: "scheduled lubrication and inspection",
  },
  { label: "Corrective Repair", detail: "component replacement" },
  { label: "Tire Rotation" },
  { label: "Component Replacement" },
];

const tireVehicle = { name: "TRK-DEMO-017", plate: "BC-DEMO-4827" };
const tireAxles: { label: string; positions: TirePosition[] }[] = [
  {
    label: "Axle 1 — Steer",
    positions: [
      { code: "FL-01", position: "Front Left", tireId: "TIRE-DEMO-0184" },
      { code: "FR-01", position: "Front Right", tireId: "TIRE-DEMO-0210" },
    ],
  },
  {
    label: "Axle 2 — Drive",
    positions: [
      { code: "RL1-O", position: "Rear Left Outer", tireId: "TIRE-DEMO-0311" },
      { code: "RL1-I", position: "Rear Left Inner", tireId: "TIRE-DEMO-0312" },
      { code: "RR1-O", position: "Rear Right Outer", tireId: "TIRE-DEMO-0313" },
      { code: "RR1-I", position: "Rear Right Inner", tireId: "TIRE-DEMO-0314" },
    ],
  },
  {
    label: "Axle 3 — Drive",
    positions: [
      { code: "RL2-O", position: "Rear Left Outer", tireId: "TIRE-DEMO-0320" },
      { code: "RL2-I", position: "Rear Left Inner", tireId: null },
      { code: "RR2-O", position: "Rear Right Outer", tireId: "TIRE-DEMO-0321" },
      { code: "RR2-I", position: "Rear Right Inner", tireId: null },
    ],
  },
];

const tireLifecycle: FlowStep[] = [
  { label: "Warehouse" },
  { label: "Installed" },
  { label: "Position Change / Rotation" },
  { label: "Removed" },
  { label: "Repair" },
  { label: "Returned to Warehouse" },
  { label: "Reinstalled" },
  { label: "Scrap" },
];

const maintenanceGoldenPath: FlowStep[] = [
  { label: "Vehicle / Equipment" },
  { label: "Report Problem" },
  { label: "Maintenance Request" },
  { label: "Create Work Order" },
  { label: "Define Activities" },
  { label: "Assign Technician" },
  { label: "Check Parts" },
  { label: "Reserve / Issue Parts" },
  { label: "Execute Activities" },
  { label: "Complete Work" },
  { label: "Update Service History" },
];

const tireGoldenPath: FlowStep[] = [
  { label: "Vehicle" },
  { label: "View Axles / Positions" },
  { label: "Select Tire" },
  { label: "Inspect Tire Detail" },
  { label: "View Tire Movement History" },
];

const businessRules: { rule: string; kind: "Designed" }[] = [
  {
    rule: "A Work Order must reference an asset/equipment.",
    kind: "Designed",
  },
  {
    rule: "Activity statuses contribute to Work Order progression.",
    kind: "Designed",
  },
  {
    rule: "Required parts are checked against availability before execution.",
    kind: "Designed",
  },
  {
    rule: "Parts reservation precedes issue where applicable.",
    kind: "Designed",
  },
  {
    rule: "Work Order completion preserves a service-history record.",
    kind: "Designed",
  },
  {
    rule: "Downtime retains start/end context and reason.",
    kind: "Designed",
  },
  {
    rule: "A tire position uniquely identifies the installed tire.",
    kind: "Designed",
  },
  {
    rule: "One tire cannot occupy two active positions simultaneously.",
    kind: "Designed",
  },
  {
    rule: "Tire movements preserve full movement history.",
    kind: "Designed",
  },
  {
    rule: "Preventive-schedule completion updates the next-due context.",
    kind: "Designed",
  },
];

const uatScenarios: UatScenario[] = [
  {
    scenario: "Corrective work order",
    behavior: "A fault is reported, a Maintenance Request is created, and a Work Order is generated with assigned activities.",
    validation: "Work Order references the asset and links to the request.",
  },
  {
    scenario: "Parts available",
    behavior: "Required parts are checked and successfully reserved and issued from available stock.",
    validation: "Reservation and issue steps complete with no shortage.",
  },
  {
    scenario: "Parts shortage",
    behavior: "A required part is not fully available; the short position is flagged.",
    validation: "Work Order is blocked from issue until replenishment is available.",
  },
  {
    scenario: "Multi-technician activities",
    behavior: "Different technicians execute different activities within the same Work Order.",
    validation: "Each activity records its assigned technician and status independently.",
  },
  {
    scenario: "Preventive maintenance",
    behavior: "A PM schedule triggers a scheduled maintenance that generates a Work Order.",
    validation: "Completion updates the next-due context.",
  },
  {
    scenario: "Downtime",
    behavior: "Start/end timestamps are captured against a Work Order.",
    validation: "A downtime record with duration and reason is retained in service history.",
  },
  {
    scenario: "Tire installation",
    behavior: "A unique tire is assigned to a valid vehicle position.",
    validation: "The tire is occupied at exactly one active position.",
  },
  {
    scenario: "Tire rotation",
    behavior: "The same unique tire changes position and the movement is recorded.",
    validation: "Tire movement history preserves the change without duplicate active positions.",
  },
  {
    scenario: "Invalid tire position",
    behavior: "An attempt assigns one tire to two active positions simultaneously.",
    validation: "The system rejects the duplicate active positioning.",
  },
];

const evidenceTypes = [
  "Domain model",
  "Work-order design",
  "Activity-level execution model",
  "Parts availability and reservation rules",
  "Preventive maintenance design",
  "Tire lifecycle model",
  "ERPNext DocType architecture",
  "Business rules and controls",
  "UAT scenarios",
  "Implementation documentation",
];

function Overview(project: Project): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        {project.title} is an enterprise maintenance-management application
        designed on ERPNext/Frappe concepts for industrial vehicle and equipment
        operations. It connects asset records, maintenance requests, work orders,
        technician execution, spare-parts logistics, downtime capture, service
        history, and tire lifecycle management.
      </p>

      <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
        <li>Enterprise Application Development (ERPNext / Frappe)</li>
        <li>Maintenance Operations and Work Order Management</li>
        <li>Spare-Parts and Logistics Integration</li>
        <li>Fleet Asset and Equipment Management</li>
        <li>Tire Lifecycle and Position Management</li>
        <li>Business Workflow and Traceability Design</li>
        <li>Guided Tour workflow demonstration (13-step guided walkthrough)</li>
      </ul>

      <p className="text-sm text-muted-foreground mt-4">
        The system is architected around three integrated but clearly separated
        modules: Maintenance / Work Orders, Preventive Maintenance, and Tire
        Management. These share a common vehicle and odometer model so that
        one operational event updates multiple controls. A PM plan triggers
        work-order generation; a parts shortage sends an activity to the
        backlog with a follow-up work order. The guided tour at
        /projects/vanbags-maintenance/demo walks through these integrations step
        by step with synthetic data.
      </p>


      <p className="text-sm italic text-muted-foreground">{sectionNote}</p>
    </>
  );
}

function BusinessProblem(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        Maintenance execution is frequently fragmented across disconnected tools and
        spreadsheets. Maintenance requests, work orders, technician activities,
        spare parts, downtime, and asset history are tracked in separate
        locations, so it is difficult to confirm whether the materials required to
        close a job are actually available when a technician needs them.
      </p>

      <p className="text-muted-foreground">
        The core need is a structured maintenance system that connects asset and
        equipment records to work-order execution, links material availability from
        logistics/inventory into the maintenance flow, preserves asset and tire
        service history, and gives planners and technicians clear status, priority,
        and parts visibility across corrective and preventive work.
      </p>

      <p className="text-sm italic text-muted-foreground">
        This section describes the operational problem the system is designed to
        address. No quantified baseline or improvement targets are asserted.
      </p>
    </>
  );
}

function DomainModelSection(): ReactNode {
  return (
    <>
      <DomainModel nodes={domainTree} />

      <p className="text-sm italic text-muted-foreground">
        Conceptual domain model for this case study. The relationships shown
        describe the designed structure of the Maintenance application and the
        traceability links between assets, requests, work orders, logistics, and
        tire lifecycle records.
      </p>
    </>
  );
}

function MaintenanceLifecycle(): ReactNode {
  return (
    <>
      <ProcessFlow steps={lifecycleSteps} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-popover p-4">
          <p className="text-sm font-semibold text-foreground">
            Corrective Maintenance
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Triggered by a reported defect, failure, or unplanned condition. A
            Maintenance Request is raised and converted into a Work Order that
            drives execution, parts, downtime, and service history.
          </p>
        </div>
        <div className="rounded-md border border-border bg-popover p-4">
          <p className="text-sm font-semibold text-foreground">
            Preventive Maintenance
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Driven by a scheduled plan (calendar, operating hours, or kilometers)
            and converted into planned Work Orders. Corrective and preventive share
            the same Work Order, activity, parts, and history structure rather than
            operating as separate systems.
          </p>
        </div>
      </div>
    </>
  );
}

function WorkOrderManagement(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        The Work Order is the central execution record. A Work Order references an
        asset/equipment, captures the reported issue, and carries priority,
        location, assignment, status, required parts, downtime, labor, and a link
        to service history. The illustrative record below uses synthetic
        identifiers.
      </p>

      <WorkOrderPreview workOrder={workOrder} />

      <p className="text-sm italic text-muted-foreground">
        Illustrative Work Order WO-DEMO-004. Statuses and assignments are examples
        for design documentation only.
      </p>
    </>
  );
}

function ActivityExecution(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        Execution is modeled at the activity level within a Work Order. Each
        activity carries its own description, assigned technician, and status,
        allowing multi-technician work orders where different people complete
        different steps.
      </p>

      <p className="text-muted-foreground">
        Activity-level structure supports clearer execution and responsibility,
        labor tracking tied to specific steps, end-to-end traceability, and accurate
        completion of multi-person work. The preview above renders the illustrative
        activity breakdown for WO-DEMO-004.
      </p>
    </>
  );
}

function DowntimeAndHistory(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        Each completed Work Order contributes to the asset&apos;s service history. The
        model captures downtime start, downtime end, downtime duration, the
        related reason, the originating Work Order, completed activities, parts
        consumed, and the resulting asset status.
      </p>

      <ProcessFlow steps={serviceHistory} />

      <p className="text-sm italic text-muted-foreground">
        Conceptual service-history timeline for an illustrative vehicle. Entries,
        dates, and reasons are examples for design documentation only; no real
        operational history is presented.
      </p>
    </>
  );
}

function LogisticsIntegration(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        Maintenance execution is connected to logistics rather than managed
        independently. As a Work Order is opened, required parts are verified
        against warehouse availability, reserved against the order, and issued as a
        consumption event before and during execution.
      </p>

      <PartsIntegration
        flow={partsFlow}
        parts={requiredParts}
        availability={shortagePart}
      />

      <p className="text-sm italic text-muted-foreground">
        Flow and quantities are illustrative for this case study. For example, a
        Work Order requiring one Bearing 6205 against four available and one
        reserved yields no shortage, while requiring two units of a Containment
        Ring against one available yields a short position that must be resolved
        before issue.
      </p>
    </>
  );
}

function PreventiveMaintenance(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        Preventive Maintenance links an asset to a PM Plan and a schedule. The
        schedule triggers on calendar intervals, operating hours, or kilometers
        for vehicles. A scheduled maintenance produces a Work Order, and completion
        updates the next-due context.
      </p>

      <ProcessFlow steps={pmFlow} />

      <p className="text-sm italic text-muted-foreground">
        Triggers and intervals shown here are illustrative. Kilometer-based
        component alerts are expected to be modeled more explicitly within the
        Fleet Intelligence project.
      </p>
    </>
  );
}

function TireManagement(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        The Tire Management module treats the tire as an individually traceable
        asset rather than a consumable quantity. A vehicle exposes axles and tire
        positions, and each occupied position references a uniquely identified
        tire.
      </p>

      <TireLayout vehicle={tireVehicle} axles={tireAxles} />

      <TireDetail />
      <TireLifecycle />
      <TireMovement />
    </>
  );
}

function TireDetail(): ReactNode {
  return (
    <div className="mt-6 rounded-md border border-border bg-popover p-4">
      <h4 className="text-sm font-semibold text-foreground">
        Tire Record — TIRE-DEMO-000184
      </h4>
      <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Vehicle
          </dt>
          <dd className="text-muted-foreground">TRK-DEMO-017</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Plate
          </dt>
          <dd className="text-muted-foreground">BC-DEMO-4827</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Position
          </dt>
          <dd className="text-muted-foreground">Axle 2 — Left Inner</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Brand
          </dt>
          <dd className="text-muted-foreground">
            Illustrative commercial tire (no manufacturer affiliation)
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Model
          </dt>
          <dd className="text-muted-foreground">
            Demo 300-24 / illustrative tread pattern
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Installed Odometer
          </dt>
          <dd className="text-muted-foreground">48,300 km</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Pressure
          </dt>
          <dd className="text-muted-foreground">Illustrative value</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Tread Depth
          </dt>
          <dd className="text-muted-foreground">Illustrative value</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
            Status
          </dt>
          <dd className="text-muted-foreground">In Service</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        Brand and model names are illustrative examples with no affiliation to
        real manufacturers.
      </p>
    </div>
  );
}

function TireLifecycle(): ReactNode {
  return (
    <>
      <h4 className="text-sm font-semibold text-foreground">
        Supported Tire States (future)
      </h4>
      <ProcessFlow steps={tireLifecycle} />
    </>
  );
}

function TireMovement(): ReactNode {
  const movements: FlowStep[] = [
    {
      label: "Warehouse",
      detail: "TIRE-DEMO-000184 on hand",
    },
    {
      label: "TRK-DEMO-017 — Axle 2, Left Inner",
      detail: "installed position",
    },
    {
      label: "TRK-DEMO-017 — Axle 3, Left Inner",
      detail: "rotation move",
    },
    {
      label: "Repair facility",
      detail: "removed for service",
    },
    {
      label: "Warehouse",
      detail: "returned to stock",
    },
  ];

  return (
    <div className="mt-6">
      <TireHistory
        tire={{
          id: "TIRE-DEMO-000184",
          vehicle: "TRK-DEMO-017",
          plate: "BC-DEMO-4827",
        }}
        movements={movements}
      />
    </div>
  );
}

function SolutionArchitecture(): ReactNode {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ConfigurationPanel title="User / Operations Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Maintenance Planner</li>
          <li>Technician</li>
          <li>Warehouse / Logistics</li>
          <li>Operations Manager</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Application Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Equipment / Vehicles</li>
          <li>Maintenance Requests</li>
          <li>Work Orders</li>
          <li>Activities</li>
          <li>Preventive Maintenance</li>
          <li>Tire Management</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Logistics Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Parts Requirements</li>
          <li>Inventory Availability</li>
          <li>Reservation</li>
          <li>Issue / Consumption</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Data / History Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Equipment History</li>
          <li>Work Order History</li>
          <li>Parts Consumption</li>
          <li>Downtime</li>
          <li>Tire History</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Analytics / Control Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Maintenance Status</li>
          <li>Work Order Backlog</li>
          <li>PM Compliance</li>
          <li>Downtime Analysis</li>
          <li>Tire Status</li>
        </ul>
      </ConfigurationPanel>

      <p className="text-sm italic text-muted-foreground sm:col-span-2">
        Analytics and control are part of the target design; dashboarding and
        reporting are not built in Milestone 6A.
      </p>
    </div>
  );
}

function FrappeArchitecture(): ReactNode {
  const steps: FlowStep[] = [
    { label: "User" },
    { label: "ERPNext / Frappe UI" },
    { label: "VanBags Maintenance Application" },
    {
      label: "DocTypes / Business Logic",
      detail: "custom DocTypes and server-side scripts",
    },
    { label: "ERPNext Data Layer" },
  ];

  return (
    <>
      <ProcessFlow steps={steps} />
      <p className="mt-6 text-sm text-muted-foreground">
        The implementation builds as a custom Frappe application on top of ERPNext.
        Functional object types are modeled as DocTypes with controlled naming
        series, permissions, and standard audit fields; Frappe-native capabilities
        (master-data controls, naming series, audit timestamps) provide the
        underlying framework, while the maintenance-specific rules and workflows
        represent the designed behavior of this module.
      </p>
    </>
  );
}

function DataArchitecture(): ReactNode {
  const groups: { name: string; entities: string[] }[] = [
    {
      name: "Assets",
      entities: ["Equipment", "Vehicle", "Equipment Category", "Equipment Location"],
    },
    {
      name: "Maintenance",
      entities: [
        "PM Plan",
        "PM Schedule",
        "Maintenance Request",
        "Work Order",
        "Work Order Activity",
        "Technician",
      ],
    },
    {
      name: "Logistics",
      entities: ["Spare Part Requirement", "Inventory Transaction (reference)"],
    },
    {
      name: "History",
      entities: ["Service History", "Downtime Event"],
    },
    {
      name: "Tires",
      entities: ["Tire", "Tire Position", "Tire Movement"],
    },
  ];

  return (
    <>
      <p className="text-muted-foreground">
        The conceptual entity architecture below groups the principal records
        modeled for the Maintenance application. A full database schema is not
        published in this milestone.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <ConfigurationPanel key={group.name} title={group.name}>
            <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
              {group.entities.map((entity) => (
                <li key={entity}>{entity}</li>
              ))}
            </ul>
          </ConfigurationPanel>
        ))}
      </div>
    </>
  );
}

function BusinessRules(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        Modeled controls for the Maintenance application. Each rule is a designed
        model behavior; Frappe-native capabilities provide the surrounding
        framework (master-data controls, naming series, audit timestamps).
      </p>

      <ul className="mt-3 list-decimal list-outside ml-5 space-y-2 text-sm text-muted-foreground">
        {businessRules.map((rule) => (
          <li key={rule.rule} className="flex items-start gap-2.5">
            <span className="mt-3.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
            <span className="flex-1">
              {rule.rule}
              <span className="ml-2 inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {rule.kind}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        Not every rule is asserted as currently implemented. Rules describe the
        intended system behavior for this case study.
      </p>
    </>
  );
}

function TestingUAT(): ReactNode {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Scenario-driven validation for the maintenance flow and its logistics and
        tire integrations:
      </p>
      <UATTable scenarios={uatScenarios} />
    </>
  );
}

function DemoPreviewSection(project: Project): ReactNode {
  return (
    <>
      <DemoPreview project={project} />

        <div className="mt-6 rounded-md border border-border bg-popover p-5">
          <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Maintenance demo
            </p>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
              Live
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            An interactive Maintenance and Tire Management simulation. Execute
            corrective and preventive workflows, assign technicians, check parts
            availability, reserve and issue parts, complete work orders, and manage
            tire installation and rotation on a graphical vehicle layout.
          </p>

          <div className="mt-4 flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
            <ButtonLink
              href="/projects/vanbags-maintenance/demo"
              variant="primary"
              size="md"
            >
              Launch Interactive Demo
            </ButtonLink>
            <span className="text-xs text-muted-foreground">
              Synthetic data only. No data is collected or persisted.
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Prefer a guided walkthrough? Launch the Guided Tour mode,
              which walks through 13 steps covering equipment registration,
              maintenance templates, PM scheduling, tire lifecycle, work
              order generation, activity execution, parts logistics, backlog
              management, and tire lifecycle tracing with synthetic data.
            </p>
            <ButtonLink
              href="/projects/vanbags-maintenance/demo?mode=guided"
              variant="secondary"
              size="md"
            >
              Launch Guided Tour
            </ButtonLink>
          </div>
        </div>
    </>
  );
}

function FutureM6B(): ReactNode {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Planned Milestone 6B golden paths for the functional Maintenance and
        Tire Management modules:
      </p>

      <div className="mt-4 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Maintenance execution
          </p>
          <ProcessFlow steps={maintenanceGoldenPath} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Tire inspection
          </p>
          <ProcessFlow steps={tireGoldenPath} />
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        These interactions are available as a live interactive demo for Milestone 6B
        (see the Maintenance demo above): install tire, remove tire, rotate tire,
        send to repair, return to warehouse, and scrap tire — each enforcing the
        asset and position rules described in the business rules.
      </p>

      <p className="mt-6 text-xs text-muted-foreground">
        A Guided Tour mode is also available at the same demo URL by appending
        ?mode=guided. The tour walks through 13 steps — register equipment,
        configure templates, build a maintenance plan, install tires, simulate
        fleet operation, respond to alerts, perform tire inspection, reach PM
        trigger, generate a preventive work order, execute activities and parts,
        send to backlog on a part shortage, create a follow-up work order, and
        trace the tire lifecycle. Each step uses the same synthetic data and
        enforces the same business rules as the interactive workspace.
      </p>
    </>
  );
}

function TechnicalEvidence(project: Project): ReactNode {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Evidence that will be linked when each artifact is cleared for public
        sharing:
      </p>
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {evidenceTypes.map((evidence) => (
          <li key={evidence}>{evidence}</li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        This section uses the generic entity architecture and business rules; a
        full database schema and implementation artifacts are not published in
        Milestone 6A.
      </p>
      <RepositoryNote project={project} />
    </>
  );
}

export function vanbagsMaintenanceSections(
  project: Project,
): ProjectSectionDef[] {
  return [
    { id: "overview", title: "Overview", body: Overview(project) },
    {
      id: "domain",
      title: "Domain",
      body: (
        <>
          <BusinessProblem />
          <DomainModelSection />
          <MaintenanceLifecycle />
        </>
      ),
    },
    {
      id: "work-orders",
      title: "Work Orders",
      body: (
        <>
          <WorkOrderManagement />
          <ActivityExecution />
          <DowntimeAndHistory />
        </>
      ),
    },
    {
      id: "logistics",
      title: "Logistics",
      body: <LogisticsIntegration />,
    },
    {
      id: "preventive",
      title: "Preventive Maintenance & History",
      body: (
        <>
          <PreventiveMaintenance />
        </>
      ),
    },
    {
      id: "tires",
      title: "Tire Management",
      body: <TireManagement />,
    },
    {
      id: "architecture",
      title: "Architecture",
      body: (
        <>
          <SolutionArchitecture />
          <FrappeArchitecture />
          <DataArchitecture />
          <BusinessRules />
          <TestingUAT />
        </>
      ),
    },
    { id: "capabilities", title: "Capabilities Demonstrated", body: CapabilitiesDemonstrated(project) },
    {
      id: "demo-evidence",
      title: "Demo & Evidence",
      body: (
        <>
          {DemoPreviewSection(project)}
          <FutureM6B />
          {TechnicalEvidence(project)}
        </>
      ),
    },
  ];
}
