import type { ReactNode } from "react";

import { CapabilitiesDemonstrated } from "@/components/projects/CapabilitiesDemonstrated";
import { ProcessFlow, type FlowStep } from "@/components/projects/ProcessFlow";
import { UATTable, type UatScenario } from "@/components/projects/UATTable";
import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import { DemoPreview } from "@/components/projects/DemoPreview";
import { RepositoryNote } from "@/components/projects/RepositoryNote";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { NavItem, ProjectSectionDef } from "@/lib/projectContent";
import type { Project } from "@/data/projects";

export function vanbagsErpNav(): NavItem[] {
  return [
    { id: "overview", label: "Overview" },
    { id: "business-context", label: "Business Analysis" },
    { id: "future-state", label: "Future State" },
    { id: "erp-configuration", label: "ERP Configuration" },
    { id: "solution-architecture", label: "Architecture" },
    { id: "implementation-methodology", label: "Implementation" },
    { id: "demo", label: "Demo" },
    { id: "capabilities", label: "Capabilities Demonstrated" },
    { id: "technical-evidence", label: "Evidence" },
  ];
}

export function vanbagsErpSections(project: Project): ProjectSectionDef[] {
  return [
    { id: "overview", title: "Overview", body: Overview(project) },
    { id: "business-context", title: "Business Context", body: BusinessContext() },
    { id: "current-state", title: "Current-State Process", body: CurrentState() },
    { id: "pain-points", title: "Pain Points", body: PainPoints() },
    { id: "requirements", title: "Requirements", body: Requirements() },
    { id: "future-state", title: "Future-State Process", body: FutureState() },
    { id: "process-optimization", title: "Process Optimization", body: ProcessOptimization() },
    { id: "erp-configuration", title: "ERP Configuration", body: ERPConfiguration() },
    { id: "accounting-integration", title: "Accounting Integration", body: AccountingIntegration() },
    { id: "solution-architecture", title: "Solution Architecture", body: SolutionArchitecture() },
    { id: "implementation-methodology", title: "Implementation Methodology", body: ImplementationMethodology() },
    { id: "testing-uat", title: "Testing & UAT", body: TestingUAT() },
    { id: "demo", title: "Interactive Demo Preview", body: DemoPreviewSection(project) },
    { id: "capabilities", title: "Capabilities Demonstrated", body: CapabilitiesDemonstrated(project) },
    { id: "technical-evidence", title: "Technical Evidence", body: TechnicalEvidence(project) },
  ];
}

const currentSteps: FlowStep[] = [
  { label: "Customer Forecast" },
  { label: "Customer PO / ARIBA", detail: "formal order; may split into suborders" },
  { label: "Internal Planning", detail: "no central order register" },
  { label: "Production" },
  { label: "Packaging", detail: "coordinated to shipment" },
  { label: "Shipment / Container", detail: "batched and consolidated" },
  { label: "Warehouse", detail: "multiple locations" },
  { label: "Customer Delivery" },
];

const futureSteps: FlowStep[] = [
  { label: "Forecast" },
  { label: "Commitment / Demand Record", detail: "committed quantity tracked" },
  { label: "Customer PO" },
  { label: "Internal Sales / Order Structure", detail: "parent and suborders" },
  { label: "Production Planning" },
  { label: "Packaging" },
  { label: "Shipment / Container Planning" },
  { label: "Warehouse Receipt / Distribution" },
  { label: "Customer Delivery" },
  { label: "Traceability / Reporting" },
];

const accountingChain: FlowStep[] = [
  { label: "Business Transaction", detail: "e.g. goods receipt, delivery, adjustment" },
  { label: "ERP Document", detail: "stock receipt, stock issue, stock adjustment" },
  { label: "Inventory Effect", detail: "quantity increases / decreases" },
  { label: "Accounting Effect", detail: "configured GL accounts" },
  { label: "Cost Center / Financial Dimension", detail: "warehouse and cost context" },
];

const painPoints = [
  "No centralized internal order register.",
  "Limited production-planning visibility.",
  "Packaging, shipment, and change coordination handled through email.",
  "Limited packaging-flow visibility.",
  "Delivery-date changes with no structured, traceable history.",
  "PO/order splits creating tracking complexity.",
  "Multiple shipments against committed quantities.",
  "Production consolidating multiple order groups and suborders.",
  "Quantities committed before final purchase-order identifiers are available.",
  "Need to preserve modifications and change history.",
];

const uatScenarios: UatScenario[] = [
  {
    scenario: "Standard order to delivery",
    behavior: "A single forecast converts to one PO, one internal order, planned production, packaging, shipment, and delivery.",
    validation: "Each stage is traceable and balances to the original committed quantity.",
  },
  {
    scenario: "Modified order after planning",
    behavior: "A change to committed quantity or delivery date is recorded as a history record, not an overwrite.",
    validation: "The original commitment, the modification, and the effective value are all queryable.",
  },
  {
    scenario: "Split order with partial shipments",
    behavior: "One customer PO splits into suborders; each suborder can ship independently and partially.",
    validation: "Remaining committed quantity equals the sum of unconsumed suborder shipments.",
  },
  {
    scenario: "Packaging delay on consolidated shipment",
    behavior: "A packaging delay holds the container while other units remain ready to ship.",
    validation: "Container release is blocked only by the packaging hold; other ready units are not regressed.",
  },
  {
    scenario: "Committed quantity before final PO",
    behavior: "Production is planned against a committed quantity before the final PO code is attached.",
    validation: "The committed quantity is preserved and traced when the final PO arrives.",
  },
  {
    scenario: "Accounting posting on delivery",
    behavior: "A customer delivery posts inventory reduction and COGS to the configured accounts.",
    validation: "Inventory and COGS accounts match the configured accounting mappings for the item group.",
  },
];

const evidenceTypes = [
  "Business requirements",
  "Current-state process map",
  "Future-state process map",
  "Fit-gap analysis",
  "Master-data design",
  "ERP configuration examples",
  "Accounting mapping documentation",
  "UAT scenarios",
  "Implementation documentation",
];

const treeNote =
  "Illustrative configuration for this case study; not a published chart of accounts.";

function Overview(project: Project): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">
          {project.title}
        </span>{" "}
        demonstrates capability across ERP Consulting, ERP Configuration,
        Business Analysis, and Process Optimization for a B2B operation that
        turns customer demand into shipped commercial-van interiors.
      </p>
      <p className="text-muted-foreground">
        The engagement spans the full operational chain: customer forecasts,
        purchase orders, production planning, packaging, shipments, containers,
        warehouses, logistics, and customer delivery.
      </p>
      <p className="text-sm italic text-muted-foreground">
        This case study documents the analysis, design, and configuration
        approach. The interactive ERP simulation is available via the Demo
        section below.
      </p>
    </>
  );
}

function BusinessContext(): ReactNode {
  return (
    <>
      <p className="text-muted-foreground">
        VanBags builds custom commercial van interiors for business customers.
        The operation plans to committed demand, produces to order, packages
        units, consolidates shipments into containers, and distributes from
        multiple warehouses to final customer delivery.
      </p>
      <p className="text-muted-foreground">
        Customers communicate demand first through rolling forecasts, then
        through formal purchase orders issued in their procurement platform. A
        customer purchase order may be split after issue into suborders, and
        quantities must remain committed to production even when final purchase
        order identifiers are not yet attached. Packaging must be coordinated to
        shipment, shipments may be batched or consolidated into containers,
        delivery dates may change, and production is consolidated across multiple
        order groups.
      </p>
      <p className="text-sm italic text-muted-foreground">
        Note: customer purchase orders are described as arriving through the
        customer procurement platform (ARIBA) as part of the business/order
        process. This does not imply a VanBags-side ARIBA integration was
        implemented.
      </p>
    </>
  );
}

function CurrentState(): ReactNode {
  return (
    <>
      <ProcessFlow steps={currentSteps} />
      <p className="text-sm text-muted-foreground">
        In the current state these steps are coordinated through email,
        spreadsheets, and disconnected tools. Committed quantities, order splits,
        packaging status, container consolidations, and warehouse transfers are
        difficult to trace end to end, so delivery dates and remaining
        commitments are hard to reconcile.
      </p>
    </>
  );
}

function PainPoints(): ReactNode {
  return (
    <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
      {painPoints.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

function Requirements(): ReactNode {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">
        Functional Requirements
      </h3>
      <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
        <li>Maintain an internal order register linking forecast, PO, production, and shipments.</li>
        <li>Support PO/order splitting into parent and suborders.</li>
        <li>Preserve committed quantities independently of final PO identifiers.</li>
        <li>Support partial and multiple shipments against a single commitment.</li>
        <li>Maintain modification and change history with date and context.</li>
        <li>Maintain packaging milestones linked to shipment planning.</li>
        <li>Support production consolidation across order groups.</li>
        <li>Maintain traceability from planning through delivery.</li>
      </ul>

      <h3 className="text-lg font-semibold text-foreground">
        Master Data Requirements
      </h3>
      <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
        <li>Customers and customer PO reference formats.</li>
        <li>Items, item groups, and packaging materials.</li>
        <li>Warehouses and distribution locations.</li>
        <li>Suppliers and incoming logistics.</li>
        <li>Cost centers and financial dimensions.</li>
      </ul>

      <h3 className="text-lg font-semibold text-foreground">
        Reporting / Visibility Requirements
      </h3>
      <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
        <li>Open committed quantities and remaining to-ship.</li>
        <li>Production status and planned completions.</li>
        <li>Shipment and container status.</li>
        <li>Traceability report from forecast to delivery.</li>
        <li>Change history and aging.</li>
      </ul>

      <h3 className="text-lg font-semibold text-foreground">
        Non-Functional / Control Requirements
      </h3>
      <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
        <li>Auditability of commitments and changes.</li>
        <li>Traceability between planning, orders, production, and shipments.</li>
        <li>Consistent master data and controlled changes.</li>
        <li>Clear status ownership per operational stage.</li>
      </ul>
    </>
  );
}

function FutureState(): ReactNode {
  return (
    <>
      <ProcessFlow steps={futureSteps} />
      <p className="text-sm text-muted-foreground">
        The designed future state establishes a single traceability chain from
        forecast through delivery, with an explicit committed quantity, parent
        and suborder relationships, controlled date changes, support for multiple
        shipments, packaging visibility, production consolidation, and preserved
        change history.
      </p>
      <p className="text-sm italic text-muted-foreground">
        This represents the designed ERP model, not a claimed completed
        production implementation.
      </p>
    </>
  );
}

function ProcessOptimization(): ReactNode {
  const optimizations = [
    {
      before: "Email-based order tracking across teams.",
      change: "Structured ERP order records.",
      benefit: "Better visibility and status accountability.",
    },
    {
      before: "PO/order split ambiguity.",
      change: "Parent/suborder relationships in the ERP.",
      benefit: "Preserved commitment traceability.",
    },
    {
      before: "Delivery-date changes without structured history.",
      change: "Modification history with context.",
      benefit: "Aging and traceability analysis.",
    },
    {
      before: "Packaging disconnected from order planning.",
      change: "Linked packaging milestones.",
      benefit: "Improved shipment-readiness visibility.",
    },
    {
      before: "Multiple-shipment complexity against commitments.",
      change: "Explicit fulfillment allocation per shipment.",
      benefit: "Clear remaining committed quantity.",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {optimizations.map((opt) => (
        <div
          key={opt.before}
          className="rounded-md border border-border bg-popover p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Current state
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{opt.before}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent">
            Design change
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{opt.change}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent">
            Operational benefit
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{opt.benefit}</p>
        </div>
      ))}
    </div>
  );
}

interface TreeNode {
  label: string;
  children?: TreeNode[];
}

const accountTree: TreeNode[] = [
  {
    label: "1000 Assets",
    children: [
      { label: "Cash / Bank" },
      { label: "Accounts Receivable" },
      {
        label: "Inventory",
        children: [
          { label: "Finished Goods" },
          { label: "Packaging" },
          { label: "Goods in Transit" },
        ],
      },
    ],
  },
  {
    label: "2000 Liabilities",
    children: [{ label: "Accounts Payable" }, { label: "Goods Received Not Billed" }],
  },
  { label: "3000 Equity" },
  { label: "4000 Revenue" },
  { label: "5000 Cost of Goods Sold" },
  {
    label: "6000 Operating Expenses",
    children: [
      { label: "Freight / Logistics" },
      { label: "Warehouse Expenses" },
      { label: "Administrative Expenses" },
    ],
  },
];

const costCenterTree: TreeNode[] = [
  {
    label: "Company",
    children: [
      { label: "Corporate" },
      { label: "Vancouver Operations" },
      { label: "Toronto Operations" },
      { label: "Seattle Operations" },
      { label: "Logistics" },
    ],
  },
];

const warehouseTree: TreeNode[] = [
  {
    label: "Vancouver",
    children: [
      { label: "Finished Goods" },
      { label: "Packaging" },
      { label: "Returns" },
    ],
  },
  {
    label: "Toronto",
    children: [
      { label: "Finished Goods" },
      { label: "Returns" },
    ],
  },
  { label: "Seattle", children: [{ label: "Finished Goods" }] },
];

function TreeList({ nodes }: { nodes: TreeNode[] }) {
  return (
    <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
      {nodes.map((node) => (
        <li key={node.label}>
          {node.label}
          {node.children ? <TreeList nodes={node.children} /> : null}
        </li>
      ))}
    </ul>
  );
}

function ERPConfiguration(): ReactNode {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ConfigurationPanel title="Company &amp; Fiscal Setup" note="Illustrative company and fiscal settings for this case study.">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Company: VanBags Manufacturing Ltd.</li>
          <li>Base currency: CAD</li>
          <li>Fiscal year: Jan–Dec</li>
          <li>Default organization: single operating company</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Chart of Accounts" note={treeNote}>
        <TreeList nodes={accountTree} />
      </ConfigurationPanel>

      <ConfigurationPanel title="Accounting Mappings" note="Illustrative mappings from operational objects to finance accounts.">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Inventory / Finished Goods → Inventory Asset Account</li>
          <li>Stock Issue / Delivery → COGS Account</li>
          <li>Freight → Freight / Logistics Expense</li>
          <li>Stock Adjustment → Inventory Adjustment Account (by item group)</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Cost Centers" note="Illustrative cost-center hierarchy.">
        <TreeList nodes={costCenterTree} />
      </ConfigurationPanel>

      <ConfigurationPanel title="Warehouses" note="Illustrative warehouse structure.">
        <TreeList nodes={warehouseTree} />
      </ConfigurationPanel>

      <ConfigurationPanel title="Items / Item Groups" note="Approved product families for this case study.">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Handbags</li>
          <li>Crossbodies</li>
          <li>Cosmetic Pouches</li>
          <li>Packaging</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Customers / Suppliers" note="Master-data configuration is described conceptually.">
        <p className="text-sm text-muted-foreground">
          Customer and supplier records carry standard purchasing, payment, and
          delivery terms. Names and identifiers are illustrative and not
          fabricated as real entities.
        </p>
      </ConfigurationPanel>

      <ConfigurationPanel title="Payment / Tax / Naming" note="Configuration awareness; not a tax implementation.">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Payment terms (net 30, etc.)</li>
          <li>Naming/numbering series for documents</li>
          <li>Tax treated as configuration scope awareness — no jurisdiction-specific tax setup</li>
        </ul>
      </ConfigurationPanel>
    </div>
  );
}

function AccountingIntegration(): ReactNode {
  return (
    <>
      <ProcessFlow steps={accountingChain} />
      <p className="mt-6 text-sm text-muted-foreground">
        The conceptual chain links a business transaction through the ERP
        document, the resulting inventory movement, the configured accounting
        postings, and the cost center / financial dimension context.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-md border border-border bg-popover p-4">
          <h4 className="text-sm font-semibold text-foreground">
            Example A — Inventory Receipt
          </h4>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Receipt of goods → Purchase / Stock Receipt</li>
            <li>Inventory increases</li>
            <li>Debit Inventory, Credit Goods Received Not Billed (GRNI)</li>
            <li>Assigned to receiving warehouse / cost context</li>
          </ul>
        </div>

        <div className="rounded-md border border-border bg-popover p-4">
          <h4 className="text-sm font-semibold text-foreground">
            Example B — Customer Delivery
          </h4>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Customer delivery → Delivery / Stock Issue</li>
            <li>Inventory decreases</li>
            <li>Debit Cost of Goods Sold, Credit Inventory</li>
            <li>Revenue recognized through the sales / invoice process</li>
          </ul>
        </div>

        <div className="rounded-md border border-border bg-popover p-4">
          <h4 className="text-sm font-semibold text-foreground">
            Example C — Inventory Adjustment
          </h4>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Stock adjustment document</li>
            <li>Inventory increases or decreases</li>
            <li>Posted to the configured inventory adjustment account</li>
          </ul>
        </div>
      </div>

      <p className="mt-6 text-sm italic text-muted-foreground">
        These are illustrative accounting consequences for ERP configuration.
        They are not presented as VanBags actual accounting policy, audited
        entries, or Canadian tax/accounting advice. Detailed accounting
        configuration will be approved separately.
      </p>
    </>
  );
}

function SolutionArchitecture(): ReactNode {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ConfigurationPanel title="Process Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Forecast</li>
          <li>Customer Purchase Orders (ARIBA, customer-side)</li>
          <li>Internal Sales / Orders</li>
          <li>Production Planning</li>
          <li>Packaging</li>
          <li>Shipment / Container</li>
          <li>Warehouse Receipt / Distribution</li>
          <li>Customer Delivery</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="ERP Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Sales / Orders</li>
          <li>Inventory</li>
          <li>Procurement</li>
          <li>Production / Planning</li>
          <li>Logistics</li>
          <li>Finance / Accounting</li>
          <li>Reporting</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Master Data Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Customer</li>
          <li>Supplier</li>
          <li>Item / Item Group</li>
          <li>Warehouse</li>
          <li>Cost Center / Financial Dimension</li>
          <li>Chart of Accounts</li>
        </ul>
      </ConfigurationPanel>

      <ConfigurationPanel title="Reporting / Control Layer">
        <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Open commitments</li>
          <li>Production status</li>
          <li>Shipment status</li>
          <li>Delivery status</li>
          <li>Traceability / change history</li>
        </ul>
      </ConfigurationPanel>
    </div>
  );
}

function ImplementationMethodology(): ReactNode {
  const stages: FlowStep[] = [
    { label: "Discovery" },
    { label: "Current-State Analysis" },
    { label: "Requirements" },
    { label: "Fit-Gap" },
    { label: "Future-State Design" },
    { label: "Configuration" },
    { label: "Data Preparation / Migration" },
    { label: "Testing" },
    { label: "UAT" },
    { label: "Training" },
    { label: "Cutover" },
    { label: "Stabilization" },
  ];

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Proposed (modeled) implementation lifecycle for this transformation:
      </p>
      <ProcessFlow steps={stages} />
      <p className="mt-6 text-sm italic text-muted-foreground">
        This is the designed lifecycle for the case study; it is not presented
        as a completed implementation.
      </p>
    </>
  );
}

function TestingUAT(): ReactNode {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Scenario-driven validation covers the core order-to-delivery flow and its
        exceptions:
      </p>
      <UATTable scenarios={uatScenarios} />
    </>
  );
}

function DemoPreviewSection(project: Project): ReactNode {
  return (
    <>
      <DemoPreview project={project} />
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            Business Process mode
          </h4>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Standard Order</li>
            <li>PO Modification</li>
            <li>Split Shipment</li>
            <li>Partial Shipment</li>
            <li>Packaging Delay</li>
            <li>Consolidated Container</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            ERP Configuration mode
          </h4>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Chart of Accounts</li>
            <li>Accounting Mappings</li>
            <li>Cost Centers</li>
            <li>Warehouses</li>
            <li>Item Groups</li>
            <li>Company / Fiscal Setup</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
          <ButtonLink href="/projects/vanbags-erp/demo" variant="primary">
            Launch Interactive Demo
          </ButtonLink>
          <span className="text-xs text-muted-foreground">
            Interactive ERP consulting simulation with synthetic data.
          </span>
        </div>
      </div>
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
      <RepositoryNote project={project} />
    </>
  );
}
