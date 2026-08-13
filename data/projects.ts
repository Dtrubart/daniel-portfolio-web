export type ProjectStatus = "active" | "case-study-coming-soon";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  featured: boolean;
  status?: ProjectStatus;
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
    status: "case-study-coming-soon",
  },
  {
    slug: "vanbags-maintenance",
    title: "VanBags Maintenance System",
    category: "Enterprise Application Development",
    description:
      "ERPNext/Frappe maintenance-management application designed around equipment records, preventive and corrective maintenance workflows, technician activities, spare parts, downtime, and service history.",
    technologies: ["ERPNext", "Frappe", "Python", "Maintenance Management"],
    featured: true,
    status: "case-study-coming-soon",
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
  },
  {
    slug: "data-analytics-portfolio",
    title: "Data Analytics Portfolio",
    category: "Data Analytics",
    description:
      "Collection of practical analytics projects demonstrating SQL, Python, data processing, business intelligence, and business-oriented analysis workflows.",
    technologies: ["SQL", "Python", "Data Processing", "Business Intelligence"],
    featured: false,
    status: "case-study-coming-soon",
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System Lite",
    category: "Operations Systems",
    description:
      "Lightweight inventory-management application exploring inventory records, operational transactions, validation logic, and core business-system workflows.",
    technologies: ["Python", "Inventory Management", "Operations", "Business Logic"],
    featured: false,
    status: "case-study-coming-soon",
  },
];
