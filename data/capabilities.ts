export interface CapabilityGroup {
  title: string;
  items: string[];
}

export const capabilities: CapabilityGroup[] = [
  {
    title: "Data & Analytics",
    items: ["Power BI", "SQL", "Python", "Power Query", "Excel", "Data Modeling"],
  },
  {
    title: "ERP & Business Systems",
    items: ["ERPNext", "Frappe", "Business Analysis", "Requirements", "Process Design", "UAT"],
  },
  {
    title: "Automation",
    items: ["Power Automate", "Google Apps Script", "Python", "Workflow Automation"],
  },
  {
    title: "Process Improvement",
    items: ["Process Mapping", "KPI Design", "Root Cause Analysis", "Continuous Improvement"],
  },
];
