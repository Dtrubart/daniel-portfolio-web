export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  focus: string[];
  href: string;
}

export const projects: Project[] = [
  {
    slug: "vanbags-erp",
    title: "VanBags ERP Transformation",
    category: "ERP & Business Systems",
    description:
      "End-to-end ERP implementation case study covering business analysis, process design, and system rollout.",
    focus: ["ERP", "Business Analysis", "Process Design", "Implementation"],
    href: "/projects/vanbags-erp",
  },
  {
    slug: "vanbags-maintenance",
    title: "VanBags Maintenance System",
    category: "Enterprise Application Development",
    description:
      "ERPNext and Frappe-based maintenance-management application for operational tracking.",
    focus: ["ERPNext", "Frappe", "Python", "Maintenance Management"],
    href: "/projects/vanbags-maintenance",
  },
  {
    slug: "fleet-intelligence",
    title: "Fleet Intelligence Platform",
    category: "Data & Operations Analytics",
    description:
      "Integration of operational telemetry and ERP data into decision-support dashboards.",
    focus: ["Power BI", "Telemetry", "ERP", "Operations Analytics"],
    href: "/projects/fleet-intelligence",
  },
];
