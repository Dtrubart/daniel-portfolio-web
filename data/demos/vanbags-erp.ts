export type WorkflowStageId =
  | "forecast"
  | "commitment"
  | "customer-po"
  | "production"
  | "packaging"
  | "shipment"
  | "delivery";

export type StageStatus = "pending" | "active" | "completed" | "exception";

export interface FlowStage {
  id: WorkflowStageId;
  label: string;
  status: StageStatus;
  note?: string;
}

export interface OrderLine {
  id: string;
  parentId?: string;
  label?: string;
  quantity: number;
  status: string;
}

export interface ShipmentSegment {
  id: string;
  orderId?: string;
  quantity: number;
  container: string;
  status: string;
}

export interface TraceabilityEvent {
  timestamp: string;
  event: string;
  document?: string;
  previousValue?: string;
  newValue?: string;
  status?: string;
}

export interface ERPScenario {
  id: string;
  name: string;
  description: string;
  customerReference: string;
  committedQuantity: number;
  producedQuantity: number;
  packagedQuantity: number;
  deliveredQuantity: number;
  orders: OrderLine[];
  shipments: ShipmentSegment[];
  events: TraceabilityEvent[];
  note?: string;
}

export type ScenarioId =
  | "standard-order"
  | "po-modification"
  | "split-shipment"
  | "partial-shipment"
  | "packaging-delay"
  | "consolidated-container";

export const WORKFLOW_STAGES: { id: WorkflowStageId; label: string }[] = [
  { id: "forecast", label: "Forecast" },
  { id: "commitment", label: "Commitment" },
  { id: "customer-po", label: "Customer PO" },
  { id: "production", label: "Production" },
  { id: "packaging", label: "Packaging" },
  { id: "shipment", label: "Shipment" },
  { id: "delivery", label: "Warehouse / Delivery" },
];

export const SCENARIOS: Record<ScenarioId, ERPScenario> = {
  "standard-order": {
    id: "standard-order",
    name: "Standard Order",
    description:
      "A single forecast converts to one customer PO, one production run, one packaging run, and one shipment on a single container.",
    customerReference: "SO-VB-1001",
    committedQuantity: 5000,
    producedQuantity: 5000,
    packagedQuantity: 5000,
    deliveredQuantity: 5000,
    orders: [
      {
        id: "SO-VB-1001",
        label: "Customer Order",
        quantity: 5000,
        status: "Delivered",
      },
    ],
    shipments: [
      {
        id: "SH-VB-2001",
        quantity: 5000,
        container: "CN-DEMO-001",
        status: "Delivered",
      },
    ],
    events: [
      {
        timestamp: "Day 1 — 09:00",
        event: "Forecast published",
        document: "FCST-VB-001",
        status: "Recorded",
      },
      {
        timestamp: "Day 1 — 10:30",
        event: "Demand committed",
        document: "DEM-VB-1001",
        newValue: "5,000",
        status: "Committed",
      },
      {
        timestamp: "Day 1 — 11:00",
        event: "Customer PO received",
        document: "PO-CUST-7001",
        status: "Received",
      },
      {
        timestamp: "Day 2 — 08:00",
        event: "Production completed",
        document: "PROD-VB-1001",
        status: "Completed",
      },
      {
        timestamp: "Day 2 — 14:00",
        event: "Packaging completed",
        document: "PK-VB-1001",
        status: "Completed",
      },
      {
        timestamp: "Day 3 — 09:00",
        event: "Container shipped",
        document: "SHP-VB-2001 / CN-DEMO-001",
        status: "In Transit",
      },
      {
        timestamp: "Day 5 — 16:00",
        event: "Customer delivery",
        document: "DLV-VB-2001",
        status: "Delivered",
      },
    ],
    note: "Reference flow. Every stage completes and balances to the committed quantity.",
  },

  "po-modification": {
    id: "po-modification",
    name: "PO Modification",
    description:
      "An original commitment of 5,000 is modified to 4,800 while production is active. The previous value remains in history and the new value becomes the operational quantity.",
    customerReference: "SO-VB-1002",
    committedQuantity: 4800,
    producedQuantity: 2400,
    packagedQuantity: 0,
    deliveredQuantity: 0,
    orders: [
      {
        id: "SO-VB-1002",
        label: "Customer Order (effective)",
        quantity: 4800,
        status: "In Production",
      },
    ],
    shipments: [],
    events: [
      {
        timestamp: "Day 1 — 09:00",
        event: "Commitment created",
        document: "DEM-VB-1002",
        newValue: "5,000",
        status: "Committed",
      },
      {
        timestamp: "Day 1 — 10:00",
        event: "Customer PO received",
        document: "PO-CUST-7002",
        status: "Received",
      },
      {
        timestamp: "Day 1 — 14:00",
        event: "Production started",
        document: "PROD-VB-1002",
        status: "Active",
      },
      {
        timestamp: "Day 2 — 09:00",
        event: "Commitment modified",
        document: "DEM-VB-1002-CHG",
        previousValue: "5,000",
        newValue: "4,800",
        status: "Modified",
      },
      {
        timestamp: "Day 2 — 09:30",
        event: "Production adjusted",
        document: "PROD-VB-1002",
        status: "Re-planned",
      },
    ],
    note: "Changes are recorded as history, not overwritten. The effective committed quantity drives planning.",
  },

  "split-shipment": {
    id: "split-shipment",
    name: "Split Shipment",
    description:
      "One committed quantity of 5,000 is fulfilled by two independent shipments of 2,500 each, both loaded on the same container.",
    customerReference: "SO-VB-1003",
    committedQuantity: 5000,
    producedQuantity: 5000,
    packagedQuantity: 5000,
    deliveredQuantity: 5000,
    orders: [
      {
        id: "SO-VB-1003",
        label: "Customer Order (parent)",
        quantity: 5000,
        status: "Split",
      },
      {
        id: "SO-VB-3010",
        parentId: "SO-VB-1003",
        label: "Suborder — Shipment A",
        quantity: 2500,
        status: "Shipped",
      },
      {
        id: "SO-VB-3011",
        parentId: "SO-VB-1003",
        label: "Suborder — Shipment B",
        quantity: 2500,
        status: "Shipped",
      },
    ],
    shipments: [
      {
        id: "SH-VB-3020",
        orderId: "SO-VB-3010",
        quantity: 2500,
        container: "CN-DEMO-002",
        status: "Delivered",
      },
      {
        id: "SH-VB-3021",
        orderId: "SO-VB-3011",
        quantity: 2500,
        container: "CN-DEMO-002",
        status: "Delivered",
      },
    ],
    events: [
      {
        timestamp: "Day 1 — 09:00",
        event: "Commitment created",
        document: "DEM-VB-1003",
        newValue: "5,000",
        status: "Committed",
      },
      {
        timestamp: "Day 1 — 11:00",
        event: "Customer PO received",
        document: "PO-CUST-7003",
        status: "Received",
      },
      {
        timestamp: "Day 2 — 08:00",
        event: "Order split into suborders",
        document: "SPLIT-VB-1003",
        status: "Planned",
      },
      {
        timestamp: "Day 2 — 16:00",
        event: "Shipment A confirmed",
        document: "SH-VB-3020",
        status: "Shipped",
      },
      {
        timestamp: "Day 3 — 09:00",
        event: "Shipment B confirmed",
        document: "SH-VB-3021",
        status: "Shipped",
      },
    ],
    note: "Remaining commitment equals the sum of unconsumed suborder shipments.",
  },

  "partial-shipment": {
    id: "partial-shipment",
    name: "Partial Shipment",
    description:
      "Of a 5,000 commit, 3,000 have been shipped. Production and packaging are complete for the shipped portion; 2,000 units remain to ship.",
    customerReference: "SO-VB-1004",
    committedQuantity: 5000,
    producedQuantity: 5000,
    packagedQuantity: 5000,
    deliveredQuantity: 0,
    orders: [
      {
        id: "SO-VB-1004",
        label: "Customer Order",
        quantity: 5000,
        status: "Partially Shipped",
      },
    ],
    shipments: [
      {
        id: "SH-VB-4020",
        quantity: 3000,
        container: "CN-DEMO-003",
        status: "In Transit",
      },
    ],
    events: [
      {
        timestamp: "Day 1 — 09:00",
        event: "Commitment created",
        document: "DEM-VB-1004",
        newValue: "5,000",
        status: "Committed",
      },
      {
        timestamp: "Day 1 — 11:00",
        event: "Customer PO received",
        document: "PO-CUST-7004",
        status: "Received",
      },
      {
        timestamp: "Day 2 — 10:00",
        event: "Production completed",
        document: "PROD-VB-1004",
        status: "Completed",
      },
      {
        timestamp: "Day 2 — 18:00",
        event: "Partial shipment",
        document: "SHP-VB-4020",
        status: "In Transit",
      },
    ],
    note: "Committed and shipped are independent values. Remaining reflects what is still owed.",
  },

  "packaging-delay": {
    id: "packaging-delay",
    name: "Packaging Delay",
    description:
      "Production of the full 5,000 is complete but packaging is behind at 2,000. No shipment can begin until packaging completes.",
    customerReference: "SO-VB-1005",
    committedQuantity: 5000,
    producedQuantity: 5000,
    packagedQuantity: 2000,
    deliveredQuantity: 0,
    orders: [
      {
        id: "SO-VB-1005",
        label: "Customer Order",
        quantity: 5000,
        status: "Ready for Packaging",
      },
    ],
    shipments: [],
    events: [
      {
        timestamp: "Day 1 — 09:00",
        event: "Commitment created",
        document: "DEM-VB-1005",
        newValue: "5,000",
        status: "Committed",
      },
      {
        timestamp: "Day 2 — 12:00",
        event: "Production completed",
        document: "PROD-VB-1005",
        status: "Completed",
      },
      {
        timestamp: "Day 2 — 14:00",
        event: "Packaging delayed",
        document: "PK-VB-1005",
        newValue: "2,000 / 5,000",
        status: "Delayed",
      },
      {
        timestamp: "Day 3 — 09:00",
        event: "Production balance idle",
        document: "-",
        status: "Blocked",
      },
    ],
    note: "Production completion does not automatically mean shipment readiness.",
  },

  "consolidated-container": {
    id: "consolidated-container",
    name: "Consolidated Container",
    description:
      "Three order groups (2,500 each) share one container of 7,500 units, shipped and delivered together.",
    customerReference: "SO-VB-1006",
    committedQuantity: 7500,
    producedQuantity: 7500,
    packagedQuantity: 7500,
    deliveredQuantity: 7500,
    orders: [
      {
        id: "PO-VB-6001",
        label: "Order Group A",
        quantity: 2500,
        status: "Delivered",
      },
      {
        id: "PO-VB-6002",
        label: "Order Group B",
        quantity: 2500,
        status: "Delivered",
      },
      {
        id: "PO-VB-6003",
        label: "Order Group C",
        quantity: 2500,
        status: "Delivered",
      },
    ],
    shipments: [
      {
        id: "SH-VB-6010",
        quantity: 7500,
        container: "CN-DEMO-099",
        status: "Delivered",
      },
    ],
    events: [
      {
        timestamp: "Day 1 — 09:00",
        event: "Commitment created (group A)",
        document: "DEM-VB-1006A",
        newValue: "2,500",
        status: "Committed",
      },
      {
        timestamp: "Day 1 — 09:05",
        event: "Commitment created (group B)",
        document: "DEM-VB-1006B",
        newValue: "2,500",
        status: "Committed",
      },
      {
        timestamp: "Day 1 — 09:10",
        event: "Commitment created (group C)",
        document: "DEM-VB-1006C",
        newValue: "2,500",
        status: "Committed",
      },
      {
        timestamp: "Day 2 — 10:00",
        event: "Orders consolidated",
        document: "CONSOL-VB-1006",
        status: "Confirmed",
      },
      {
        timestamp: "Day 3 — 09:00",
        event: "Container shipped",
        document: "SHP-VB-6010 / CN-DEMO-099",
        status: "In Transit",
      },
      {
        timestamp: "Day 5 — 16:00",
        event: "Customer delivery",
        document: "DLV-VB-6010",
        status: "Delivered",
      },
    ],
    note: "Consolidation groups multiple orders onto one container. Each order retains its own commitment trace.",
  },
};

export const SCENARIO_IDS: ScenarioId[] = [
  "standard-order",
  "po-modification",
  "split-shipment",
  "partial-shipment",
  "packaging-delay",
  "consolidated-container",
];

export interface TreeNode {
  label: string;
  children?: TreeNode[];
}

export interface AccountingMapping {
  source: string;
  account: string;
  dimension?: string;
}

export interface CompanySetup {
  company: string;
  currency: string;
  fiscalYear: string;
  defaultCostCenter: string;
  defaultWarehouse: string;
  note: string;
}

export interface ERPPConfig {
  company: CompanySetup;
  chartOfAccounts: TreeNode[];
  chartNote: string;
  accountingMappings: AccountingMapping[];
  mappingsNote: string;
  costCenters: TreeNode[];
  costCentersNote: string;
  warehouses: TreeNode[];
  warehousesNote: string;
  itemGroups: TreeNode[];
  itemGroupsNote: string;
  accountingChain: { label: string; detail?: string }[];
  accountingExamples: { title: string; lines: string[] }[];
}

export const ERP_CONFIG: ERPPConfig = {
  company: {
    company: "VanBags Demo Company",
    currency: "CAD",
    fiscalYear: "Demo FY (Jan–Dec)",
    defaultCostCenter: "Corporate",
    defaultWarehouse: "Vancouver - Finished Goods",
    note: "Illustrative company and fiscal settings for this simulation; not real company settings.",
  },
  chartOfAccounts: [
    {
      label: "1000 Assets",
      children: [
        { label: "1100 Cash & Bank" },
        { label: "1200 Accounts Receivable" },
        {
          label: "1300 Inventory",
          children: [
            { label: "1310 Finished Goods" },
            { label: "1320 Packaging" },
            { label: "1330 Goods in Transit" },
          ],
        },
      ],
    },
    {
      label: "2000 Liabilities",
      children: [
        { label: "2100 Accounts Payable" },
        { label: "2200 Goods Received Not Billed" },
      ],
    },
    { label: "3000 Equity" },
    { label: "4000 Revenue" },
    { label: "5000 Cost of Goods Sold" },
    {
      label: "6000 Operating Expenses",
      children: [
        { label: "6100 Freight & Logistics" },
        { label: "6200 Warehouse Expenses" },
        { label: "6300 Administrative Expenses" },
      ],
    },
  ],
  chartNote:
    "Illustrative chart of accounts for this simulation; not a published chart of accounts.",
  accountingMappings: [
    {
      source: "Finished Goods (issue / delivery)",
      account: "5000 Cost of Goods Sold",
      dimension: "Logistics",
    },
    {
      source: "Inventory receipt",
      account: "1300 Inventory",
      dimension: "Receiving Warehouse",
    },
    {
      source: "Freight charges",
      account: "6100 Freight & Logistics",
      dimension: "Logistics",
    },
    {
      source: "Stock adjustment",
      account: "6400 Inventory Adjustment",
      dimension: "Issuing Cost Center",
    },
  ],
  mappingsNote:
    "Configured accounting relationships for this simulation; not actual VanBags accounting policy.",
  costCenters: [
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
  ],
  costCentersNote: "Illustrative cost-center hierarchy for this simulation.",
  warehouses: [
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
  ],
  warehousesNote: "Illustrative warehouse structure for this simulation.",
  itemGroups: [
    {
      label: "Products",
      children: [
        { label: "Handbags" },
        { label: "Crossbodies" },
        { label: "Cosmetic Pouches" },
      ],
    },
    {
      label: "Materials / Supporting",
      children: [{ label: "Packaging" }],
    },
  ],
  itemGroupsNote: "Approved product families for this simulation.",
  accountingChain: [
    {
      label: "Business Transaction",
      detail: "e.g. receipt, delivery, adjustment",
    },
    { label: "ERP Document", detail: "stock receipt, stock issue, stock adjustment" },
    { label: "Inventory Effect", detail: "quantity increases / decreases" },
    { label: "Accounting Effect", detail: "configured GL accounts" },
    {
      label: "Cost Center / Dimension",
      detail: "warehouse and cost context",
    },
  ],
  accountingExamples: [
    {
      title: "Example A — Inventory Receipt",
      lines: [
        "Receipt of goods → Stock Receipt",
        "Inventory increases",
        "Debit Inventory, Credit Goods Received Not Billed (GRNI)",
        "Assigned to receiving warehouse / cost context",
      ],
    },
    {
      title: "Example B — Customer Delivery",
      lines: [
        "Customer delivery → Delivery / Stock Issue",
        "Inventory decreases",
        "Debit Cost of Goods Sold, Credit Inventory",
        "Revenue recognized through the sales / invoice process",
      ],
    },
    {
      title: "Example C — Inventory Adjustment",
      lines: [
        "Stock adjustment document",
        "Inventory increases or decreases",
        "Posted to the configured inventory adjustment account",
      ],
    },
  ],
};

export function fmt(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export interface KPI {
  label: string;
  value: string;
  hint?: string;
}

export function computeShipped(scenario: ERPScenario): number {
  if (scenario.shipments.length > 0) {
    return scenario.shipments.reduce((sum, shipment) => sum + shipment.quantity, 0);
  }
  return scenario.deliveredQuantity;
}

export function computeKPIs(scenario: ERPScenario): KPI[] {
  const committed = scenario.committedQuantity;
  const produced = scenario.producedQuantity;
  const packaged = scenario.packagedQuantity;
  const shipped = computeShipped(scenario);
  const delivered = scenario.deliveredQuantity;
  const remaining = committed - shipped;
  const productionBalance = committed - produced;
  const packagingBalance = produced - packaged;

  return [
    { label: "Committed", value: fmt(committed) },
    { label: "Produced", value: fmt(produced), hint: balanceHint(productionBalance, "to produce") },
    {
      label: "Packaged",
      value: fmt(packaged),
      hint: balanceHint(packagingBalance, "to package"),
    },
    { label: "Shipped", value: fmt(shipped), hint: balanceHint(remaining, "to ship") },
    {
      label: "Remaining",
      value: fmt(remaining),
    },
    { label: "Delivered", value: fmt(delivered) },
  ];
}

function balanceHint(value: number, action: string): string | undefined {
  if (value > 0) return `+${fmt(value)} ${action}`;
  if (value < 0) return `${fmt(value)} ${action === "to ship" ? "over" : action}`;
  return undefined;
}

export function computeStageStatuses(
  scenario: ERPScenario,
): Record<WorkflowStageId, { status: StageStatus; note?: string }> {
  const committed = scenario.committedQuantity;
  const produced = scenario.producedQuantity;
  const packaged = scenario.packagedQuantity;
  const shipped = computeShipped(scenario);
  const delivered = scenario.deliveredQuantity;

  const result: Record<
    WorkflowStageId,
    { status: StageStatus; note?: string }
  > = {
    forecast: { status: "completed" },
    commitment: { status: "completed" },
    "customer-po": { status: "completed" },
    production: { status: productionStatus(committed, produced) },
    packaging: { status: packagingStatus(produced, packaged) },
    shipment: { status: shipmentStatus(committed, shipped) },
    delivery: { status: deliveryStatus(shipped, delivered) },
  };

  if (produced >= committed && packaged < produced) {
    result.packaging = {
      status: "exception",
      note: "Production complete; packaging behind.",
    };
    result.shipment = {
      status: "pending",
      note: "Shipment blocked by packaging.",
    };
  }

  return result;
}

function productionStatus(
  committed: number,
  produced: number,
): StageStatus {
  if (produced >= committed) return "completed";
  if (produced > 0) return "active";
  return "pending";
}

function packagingStatus(produced: number, packaged: number): StageStatus {
  if (produced > 0 && packaged >= produced) return "completed";
  if (packaged > 0) return "active";
  return "pending";
}

function shipmentStatus(committed: number, shipped: number): StageStatus {
  if (shipped >= committed && shipped > 0) return "completed";
  if (shipped > 0) return "active";
  return "pending";
}

function deliveryStatus(shipped: number, delivered: number): StageStatus {
  if (shipped > 0 && delivered >= shipped) return "completed";
  if (delivered > 0) return "active";
  return "pending";
}

export function computeWorkflow(
  scenario: ERPScenario,
): FlowStage[] {
  const statuses = computeStageStatuses(scenario);
  return WORKFLOW_STAGES.map((stage) => ({
    id: stage.id,
    label: stage.label,
    status: statuses[stage.id].status,
    note: statuses[stage.id].note,
  }));
}

export const DEFAULT_SCENARIO_ID: ScenarioId = "standard-order";
export const DEFAULT_CONFIG_VIEW: ConfigViewId = "company";

export type ConfigViewId =
  | "company"
  | "chart-of-accounts"
  | "accounting-mappings"
  | "cost-centers"
  | "warehouses"
  | "item-groups";

export const CONFIG_VIEWS: { id: ConfigViewId; label: string }[] = [
  { id: "company", label: "Company Setup" },
  { id: "chart-of-accounts", label: "Chart of Accounts" },
  { id: "accounting-mappings", label: "Accounting Mappings" },
  { id: "cost-centers", label: "Cost Centers" },
  { id: "warehouses", label: "Warehouses" },
  { id: "item-groups", label: "Item Groups" },
];
