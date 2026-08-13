export type ProjectStatus = "active" | "case-study-coming-soon";

export type DemoType = "software" | "dashboard" | "workflow" | "analytics";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  featured: boolean;
  status?: ProjectStatus;
  objective?: string;
  caseStudyAnchor?: string;
  caseStudy: { enabled: boolean };
  architecture?: { enabled: boolean };
  demo?: { enabled: boolean; type: DemoType };
  repository?: { enabled: boolean; url?: string };
}

export const projects: Project[] = [
  {
    slug: "vanbags-erp",
    title: "VanBags ERP Transformation",
    category: "ERP & Business Systems",
    description:
      "End-to-end ERP implementation case study covering business requirements, process redesign, system structure, implementation planning, testing, and operational adoption.",
    technologies: ["ERP", "Business Analysis", "Process Design", "Implementation"],
    featured: true,
    status: "active",
    objective:
      "Demonstrate capability at the level of an ERP Consultant and Business Analyst: model the order-to-delivery process, translate requirements into ERP configuration, and trace transactions from committed quantities through to accounting consequences.",
    caseStudyAnchor: "overview",
    caseStudy: { enabled: true },
    architecture: { enabled: true },
    demo: { enabled: true, type: "workflow" },
    repository: { enabled: true },
  },
  {
    slug: "vanbags-maintenance",
    title: "VanBags Maintenance System",
    category: "Enterprise Application Development",
    description:
      "ERPNext/Frappe maintenance-management application designed around equipment records, preventive and corrective maintenance workflows, technician activities, spare parts, downtime, and service history.",
    technologies: ["ERPNext", "Frappe", "Python", "Maintenance Management"],
    featured: true,
    status: "active",
    caseStudyAnchor: "overview",
    objective:
      "Demonstrate enterprise application development on ERPNext/Frappe for maintenance operations, work-order management, and logistics integration.",
    caseStudy: { enabled: true },
    architecture: { enabled: true },
    demo: { enabled: true, type: "software" },
    repository: { enabled: true },
  },
  {
    slug: "fleet-intelligence",
    title: "Fleet Intelligence Platform",
    category: "Data & Operations Analytics",
    description:
      "Operations analytics solution integrating ERP, telemetry, maintenance, fuel, and related operational information to support performance monitoring and decision-making.",
    technologies: ["Power BI", "Telemetry", "ERP", "Operations Analytics"],
    featured: true,
    status: "case-study-coming-soon",
    objective:
      "Demonstrate fleet analytics, telemetry, KPI design, and data integration across maintenance, fuel, and driver performance.",
    caseStudy: { enabled: true },
    architecture: { enabled: true },
    demo: { enabled: true, type: "dashboard" },
    repository: { enabled: true },
  },
  {
    slug: "data-analytics-portfolio",
    title: "Data Analyst Portfolio",
    category: "Data Analytics",
    description:
      "Collection of practical analytics projects demonstrating SQL, Python, data processing, business intelligence, and business-oriented analysis workflows.",
    technologies: ["SQL", "Python", "Excel", "Power Query"],
    featured: false,
    status: "case-study-coming-soon",
    objective:
      "Demonstrate end-to-end analytical problem solving using approved portfolio exercises across multiple analytical tools.",
    caseStudy: { enabled: true },
    demo: { enabled: true, type: "analytics" },
    repository: { enabled: true },
  },
  {
    slug: "inventory-management-system",
    title: "ERPNext Logistics Demo",
    category: "Operations Systems / ERP Logistics",
    description:
      "Lightweight ERPNext-style logistics module demonstrating warehouse operations, stock receipts and issues, stock transfers, stock balance, and stock-ledger behavior.",
    technologies: ["ERPNext", "Frappe", "Warehouse Operations", "Stock Ledger"],
    featured: false,
    status: "case-study-coming-soon",
    objective:
      "Demonstrate ERP transactional logistics logic including stock receipt, issue, transfer, stock balance, and stock ledger behavior.",
    caseStudy: { enabled: true },
    architecture: { enabled: true },
    demo: { enabled: true, type: "software" },
    repository: { enabled: true },
  },
];
