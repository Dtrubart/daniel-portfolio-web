export interface ExperienceEntry {
  company: string;
  role: string;
  themes: string[];
  description: string;
}

export const experience: ExperienceEntry[] = [
  {
    company: "Publicis Global Delivery",
    role: "Invoice Reconciliation Analyst L2",
    themes: ["Finance", "Analytics", "Automation"],
    description:
      "Worked on invoice reconciliation, operational reporting, exception management, and automation workflows supporting complex financial processes.",
  },
  {
    company: "Sol del Pacífico",
    role: "ERP & Telemetry Coordinator",
    themes: ["ERP", "Operations", "Analytics"],
    description:
      "Worked across ERP systems, telemetry, operational analytics, maintenance information, and management reporting.",
  },
  {
    company: "Able Group",
    role: "Data & Operations Analyst",
    themes: ["Operations", "Supply Chain", "Analytics"],
    description:
      "Worked on operational reporting, inventory visibility, inbound logistics, validation workflows, and business intelligence.",
  },
];
