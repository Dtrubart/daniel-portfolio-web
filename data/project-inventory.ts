


export type WorkClassification =
  | "professional-program"
  | "professional-work"
  | "advisory-project"
  | "academic-project"
  | "teaching-automation"
  | "portfolio-case-study"
  | "portfolio-reconstruction"
  | "independent-project";


export type ImplementationStatus =
  | "implemented"
  | "operational"
  | "partially-implemented"
  | "proposal"
  | "business-case"
  | "reconstruction"
  | "portfolio-demo"
  | "needs-review";


export interface ProjectInventoryItem {
  id: string;
  title: string;
  organization?: string;
  classification: WorkClassification;
  period?: string;
  role?: string;
  implementationStatus: ImplementationStatus;
  category: string;
  shortDescription: string;
  businessContext?: string;
  contributions: string[];
  initiatives?: string[];
  capabilities: string[];
  tools?: string[];
  impact?: {
    statement: string;
    evidenceLevel: "verified" | "contextual";
  }[];
  relatedExperienceId?: string;
  relatedPortfolioSlugs?: string[];
  relatedProfessionalIds?: string[];
  featured: boolean;
  publicDetailLevel:
    | "full"
    | "limited"
    | "needs-review";
  internalPublicationNotes?: string[];
}


export const projectInventory: ProjectInventoryItem[] = [
{
    "id": "erp-transformation-sol",
    "title": "ERP Transformation & Custom Operational Modules",
    "organization": "Sol del Pacífico",
    "classification": "professional-program",
    "period": "2021-2025",
    "implementationStatus": "implemented",
    "category": "Systems",
    "shortDescription": "ERP implementation and optimization across business functions",
    "contributions": [
      "ERP implementation and optimization across business functions",
      "Translation of operational processes into system workflows and controls",
      "Cross-functional ERP/process improvement",
      "Connection between operational processes, ERP information and reporting"
    ],
    "initiatives": [
      "Logistics Operations module",
      "Maintenance module",
      "Maintenance & Tire Management module",
      "Fuel Management module",
      "Budgeting module",
      "SFTP integrations/automation",
      "Carrier Transportation Guide automation"
    ],
    "capabilities": [
      "ERP & Business Systems",
      "Business Analysis",
      "Requirements",
      "Process Design",
      "Current/Future State",
      "Workflow Design",
      "Systems Integration",
      "Operational Process Improvement",
      "UAT / Adoption Support"
    ],
    "tools": [
      "ERP",
      "Power BI",
      "SQL",
      "Excel",
      "Power Query"
    ],
    "impact": [],
    "relatedExperienceId": "sol-del-pacifico-coordinator",
    "relatedPortfolioSlugs": [
      "vanbags-erp",
      "vanbags-maintenance"
    ],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "bi-hub-sol",
    "title": "Business Intelligence & Management Reporting Hub",
    "organization": "Sol del Pacífico",
    "classification": "professional-program",
    "period": "2022-2025",
    "implementationStatus": "implemented",
    "category": "Analytics",
    "shortDescription": "Cross-functional business-intelligence and management-reporting environment",
    "contributions": [
      "Cross-functional business-intelligence and management-reporting environment",
      "Operational, financial and executive decision support"
    ],
    "initiatives": [
      "General Management Executive Dashboard",
      "Multiple-area reporting",
      "Executive reporting",
      "Management breakdowns",
      "Operational KPIs",
      "Financial information",
      "Cross-functional analysis",
      "Decision support"
    ],
    "capabilities": [
      "Business Intelligence",
      "Data Modeling",
      "KPI Design",
      "Management Reporting",
      "Operational Analytics",
      "Financial Analysis",
      "Decision Support"
    ],
    "tools": [
      "Power BI",
      "Power Query",
      "Excel",
      "ERP data"
    ],
    "impact": [],
    "relatedExperienceId": "sol-del-pacifico-coordinator",
    "relatedPortfolioSlugs": [
      "fleet-intelligence"
    ],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "fleet-telemetry-sol",
    "title": "Fleet Telemetry & Driver Performance Program",
    "organization": "Sol del Pacífico",
    "classification": "professional-work",
    "period": "2022-2025",
    "implementationStatus": "implemented",
    "category": "Operations",
    "shortDescription": "Telemetry implementation at device level",
    "contributions": [
      "Telemetry implementation at device level",
      "Unified telemetry reporting platform",
      "Consolidation of fragmented telemetry data",
      "Sensor/data validation",
      "Telemetry KPI development",
      "Driver performance analysis",
      "Driver rankings and team scoring",
      "Operations/Maintenance collaboration",
      "Driving instructor follow-up",
      "Driver/team performance management",
      "Gamification and team competitions",
      "Recognition/reward campaigns"
    ],
    "initiatives": [
      "Devices",
      "Telemetry Implementation",
      "Unified Reporting",
      "Operational KPIs",
      "Operations/Maintenance",
      "Driving Instructors",
      "Driver & Team Performance",
      "Gamification/Competition",
      "Operational Improvement"
    ],
    "capabilities": [
      "Telemetry",
      "Operational Intelligence",
      "Data Quality",
      "KPI Design",
      "Fleet Analytics",
      "Driver Performance",
      "Change & Adoption",
      "Cross-Functional Collaboration",
      "Continuous Improvement"
    ],
    "tools": [
      "Power BI",
      "SQL",
      "Excel",
      "ERP data",
      "Telemetry"
    ],
    "impact": [
      {
        "statement": "65% reduction in speeding incidents",
        "evidenceLevel": "contextual"
      },
      {
        "statement": "3-5% improvement in fuel efficiency",
        "evidenceLevel": "contextual"
      }
    ],
    "relatedExperienceId": "sol-del-pacifico-coordinator",
    "relatedPortfolioSlugs": [
      "fleet-intelligence"
    ],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "financial-modeling-sol",
    "title": "Corporate Financial Modeling & Tender Pricing",
    "organization": "Sol del Pacífico",
    "classification": "professional-work",
    "period": "2021-2025",
    "implementationStatus": "implemented",
    "category": "Business / Finance",
    "shortDescription": "Financial modeling for mining transportation pricing",
    "contributions": [
      "Financial modeling for mining transportation pricing",
      "Sensitivity scenarios",
      "Route-based pricing",
      "Operational costing",
      "Centralized variables",
      "Fuel sensitivity",
      "FX sensitivity",
      "Maintenance evolution",
      "Operational aging",
      "Route variability",
      "Strategic decision support",
      "Financing process support (approximately USD 22.5M)"
    ],
    "initiatives": [
      "Corporate Financial Model",
      "Tender Pricing Models"
    ],
    "capabilities": [
      "Financial Modeling",
      "Pricing",
      "Cost Analysis",
      "Sensitivity Analysis",
      "Business Cases",
      "Decision Support"
    ],
    "tools": [
      "Excel",
      "Power BI",
      "SQL"
    ],
    "impact": [],
    "relatedExperienceId": "sol-del-pacifico-coordinator",
    "relatedPortfolioSlugs": [],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "invoice-reconciliation-publicis",
    "title": "Invoice Reconciliation & Exception Management Automation",
    "organization": "Publicis Global Delivery",
    "classification": "professional-work",
    "period": "2025",
    "implementationStatus": "implemented",
    "category": "Automation",
    "shortDescription": "RFI Generator Automation",
    "contributions": [
      "RFI Generator Automation",
      "Status Tracker Automation",
      "Cross-system reconciliation logic",
      "System Ledger automation",
      "Finance follow-up automation",
      "Billed-vs-plan reporting",
      "Exception taxonomy",
      "Permissions/controlled workflow support",
      "Daily reporting ETL",
      "Progress dashboards"
    ],
    "initiatives": [
      "RFI Generator",
      "Status Tracker",
      "Reconciliation logic",
      "System Ledger",
      "Finance follow-up",
      "Billed-vs-plan reporting",
      "Exception taxonomy",
      "Daily ETL",
      "Progress dashboards"
    ],
    "capabilities": [
      "Automation",
      "Data Quality",
      "Reconciliation",
      "Exception Management",
      "Finance Operations",
      "Reporting",
      "Process Improvement"
    ],
    "tools": [
      "Power Automate",
      "Power Query",
      "Excel",
      "Google Apps Script",
      "SQL logic",
      "Power BI"
    ],
    "impact": [
      {
        "statement": "~26 hours saved per monthly reconciliation cycle",
        "evidenceLevel": "verified"
      }
    ],
    "relatedExperienceId": "publicis-global-delivery",
    "relatedPortfolioSlugs": [],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "order-tracker-able",
    "title": "Centralized Order Tracker",
    "organization": "Able Group",
    "classification": "professional-work",
    "period": "2026",
    "implementationStatus": "implemented",
    "category": "Systems",
    "shortDescription": "Centralized operational visibility for B2B order lifecycle",
    "contributions": [
      "Centralized operational visibility for B2B order lifecycle",
      "Order status tracking",
      "Centralized tracking across systems",
      "Operational status monitoring",
      "Exception visibility"
    ],
    "initiatives": [],
    "capabilities": [
      "Order Management",
      "Data Visibility",
      "Process Tracking",
      "Operations",
      "Supply Chain"
    ],
    "tools": [
      "Power BI",
      "Power Query",
      "Excel"
    ],
    "impact": [],
    "relatedExperienceId": "ag-group",
    "relatedPortfolioSlugs": [],
    "featured": true,
    "publicDetailLevel": "limited"
  }
,
{
    "id": "hs-code-tool-able",
    "title": "HS Code Generation Tool",
    "organization": "Able Group",
    "classification": "professional-work",
    "period": "2026",
    "implementationStatus": "implemented",
    "category": "Systems",
    "shortDescription": "Structured tool to support HS-code classification workflows",
    "contributions": [
      "Structured tool to support HS-code classification workflows"
    ],
    "initiatives": [],
    "capabilities": [
      "Classification",
      "Process Standardization",
      "Data Handling",
      "Automation"
    ],
    "tools": [],
    "impact": [],
    "relatedExperienceId": "ag-group",
    "relatedPortfolioSlugs": [],
    "featured": false,
    "publicDetailLevel": "limited"
  }
,
{
    "id": "financial-diagnosis-genesis",
    "title": "Financial Diagnosis & Debt Restructuring Strategy",
    "organization": "Constructora e Inmobiliaria Genesis SAC",
    "classification": "advisory-project",
    "period": "2020",
    "implementationStatus": "proposal",
    "category": "Business / Finance",
    "shortDescription": "Financial diagnosis",
    "contributions": [
      "Financial diagnosis",
      "Debt structure analysis",
      "Cash-flow pressure analysis",
      "Operational impact of financing",
      "Asset aging analysis",
      "Refinancing strategy",
      "Progressive debt reduction",
      "As-Is/To-Be recommendations"
    ],
    "initiatives": [],
    "capabilities": [
      "Financial Modeling",
      "Strategy",
      "Analysis",
      "Operations"
    ],
    "tools": [
      "Excel"
    ],
    "impact": [],
    "relatedExperienceId": "genesis-sac",
    "relatedPortfolioSlugs": [],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "revenue-diversification-genesis",
    "title": "Revenue Diversification - Prefabricated Products",
    "organization": "Constructora e Inmobiliaria Genesis SAC",
    "classification": "advisory-project",
    "period": "2020",
    "implementationStatus": "proposal",
    "category": "Business / Finance",
    "shortDescription": "Prefabricated products analysis",
    "contributions": [
      "Prefabricated products analysis",
      "Concrete blocks",
      "Perimeter fences",
      "Revenue diversification",
      "Business case development"
    ],
    "initiatives": [],
    "capabilities": [
      "Business Cases",
      "Financial Modeling",
      "Decision Support",
      "Strategy"
    ],
    "tools": [
      "Excel"
    ],
    "impact": [],
    "relatedExperienceId": "genesis-sac",
    "relatedPortfolioSlugs": [],
    "featured": false,
    "publicDetailLevel": "full"
  }
,
{
    "id": "innovation-initiatives-molina",
    "title": "Public Innovation & Local Economic Development Initiatives",
    "organization": "Municipality of La Molina",
    "classification": "professional-work",
    "period": "2022",
    "implementationStatus": "implemented",
    "category": "Operations",
    "shortDescription": "La Molina InnovaLab",
    "contributions": [
      "La Molina InnovaLab",
      "Local economic development",
      "Entrepreneurship initiatives",
      "Employability initiatives",
      "Blockchain/MoliCoin exploration",
      "Institutional partnerships",
      "International partnerships"
    ],
    "initiatives": [
      "Innovation initiatives",
      "Entrepreneurship programs",
      "Economic development",
      "Employability",
      "Blockchain exploration"
    ],
    "capabilities": [
      "Project Management",
      "Stakeholder Communication",
      "Process Improvement",
      "Innovation"
    ],
    "tools": [
      "Process Design",
      "Reporting",
      "Workflow"
    ],
    "impact": [],
    "relatedExperienceId": "municipality-la-molina",
    "relatedPortfolioSlugs": [],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "pump-module-lima",
    "title": "Pump Automation Training Module",
    "organization": "Universidad de Lima",
    "classification": "academic-project",
    "period": "2018",
    "implementationStatus": "implemented",
    "category": "Academic",
    "shortDescription": "Development of pump module for engineering laboratory environment",
    "contributions": [
      "Development of pump module for engineering laboratory environment"
    ],
    "initiatives": [],
    "capabilities": [
      "Industrial Engineering",
      "Manufacturing",
      "Mechanics",
      "Industrial Automation",
      "Technical Communication",
      "Teaching"
    ],
    "tools": [],
    "impact": [],
    "relatedExperienceId": "universidad-de-lima",
    "relatedPortfolioSlugs": [],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "teaching-automation-lima",
    "title": "Student Results Publishing & Blackboard Bulk-Upload Automation",
    "organization": "Universidad de Lima",
    "classification": "teaching-automation",
    "period": "2025",
    "implementationStatus": "implemented",
    "category": "Automation",
    "shortDescription": "Mini-system for publishing/distributing student results",
    "contributions": [
      "Mini-system for publishing/distributing student results",
      "Generation of bulk-upload files/workflow for Blackboard",
      "Recurring teaching-administration automation",
      "Process standardization"
    ],
    "initiatives": [],
    "capabilities": [
      "Automation",
      "Process Standardization",
      "Data Handling",
      "Teaching Operations"
    ],
    "tools": [],
    "impact": [],
    "relatedExperienceId": "universidad-de-lima-2025",
    "relatedPortfolioSlugs": [],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "vanbags-erp-transformation",
    "title": "VanBags ERP Transformation",
    "organization": "Portfolio Case Study",
    "classification": "portfolio-case-study",
    "period": "",
    "implementationStatus": "portfolio-demo",
    "category": "Systems",
    "shortDescription": "Portfolio case study demonstrating ERP consulting capability across order-to-delivery, configuration, and testing",
    "contributions": [
      "Portfolio case study demonstrating ERP consulting capability across order-to-delivery, configuration, and testing"
    ],
    "capabilities": [
      "ERP",
      "Business Analysis",
      "Process Design",
      "Implementation"
    ],
    "tools": [
      "ERPNext",
      "Frappe",
      "Python"
    ],
    "relatedPortfolioSlugs": [
      "vanbags-erp"
    ],
    "relatedProfessionalIds": [
      "erp-transformation-sol"
    ],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "vanbags-maintenance-system",
    "title": "VanBags Maintenance System",
    "organization": "Portfolio Case Study",
    "classification": "portfolio-case-study",
    "period": "",
    "implementationStatus": "portfolio-demo",
    "category": "Systems",
    "shortDescription": "Portfolio case study of an ERPNext/Frappe maintenance application covering work orders, logistics, PM scheduling and tire management",
    "contributions": [
      "Portfolio case study of an ERPNext/Frappe maintenance application covering work orders, logistics, PM scheduling and tire management"
    ],
    "capabilities": [
      "ERPNext",
      "Frappe",
      "Python",
      "Maintenance Management"
    ],
    "tools": [
      "ERPNext",
      "Frappe",
      "Python"
    ],
    "relatedPortfolioSlugs": [
      "vanbags-maintenance"
    ],
    "relatedProfessionalIds": [
      "erp-transformation-sol"
    ],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "fleet-intelligence-platform",
    "title": "Fleet Intelligence Platform",
    "organization": "Portfolio Case Study",
    "classification": "portfolio-case-study",
    "period": "",
    "implementationStatus": "portfolio-demo",
    "category": "Analytics",
    "shortDescription": "Analytics platform integrating ERP, telemetry, maintenance and fuel data with KPI design, driver ranking and team scoring",
    "contributions": [
      "Analytics platform integrating ERP, telemetry, maintenance and fuel data with KPI design, driver ranking and team scoring",
      "Uses synthetic data"
    ],
    "capabilities": [
      "Power BI",
      "Telemetry",
      "ERP",
      "Operations Analytics"
    ],
    "tools": [
      "Power BI",
      "SQL",
      "Python",
      "Excel"
    ],
    "relatedPortfolioSlugs": [
      "fleet-intelligence"
    ],
    "relatedProfessionalIds": [
      "fleet-telemetry-sol"
    ],
    "featured": true,
    "publicDetailLevel": "full"
  }
,
{
    "id": "cross-system-reconciliation-engine",
    "title": "Cross-System Reconciliation Engine",
    "organization": "Portfolio Reconstruction",
    "classification": "portfolio-reconstruction",
    "period": "",
    "implementationStatus": "reconstruction",
    "category": "Automation",
    "shortDescription": "Validation pipelines ensuring data integrity and consistency across integrated enterprise systems",
    "contributions": [
      "Validation pipelines ensuring data integrity and consistency across integrated enterprise systems",
      "Uses synthetic data"
    ],
    "capabilities": [
      "Automation",
      "Data Quality",
      "Reconciliation",
      "Validation"
    ],
    "tools": [
      "Python",
      "SQL",
      "Power Query",
      "Excel"
    ],
    "relatedPortfolioSlugs": [],
    "relatedProfessionalIds": [
      "invoice-reconciliation-publicis"
    ],
    "featured": false,
    "publicDetailLevel": "full"
  }
,
{
    "id": "cross-channel-workflow-automation",
    "title": "Cross-Channel Workflow Automation",
    "organization": "Portfolio Reconstruction",
    "classification": "portfolio-reconstruction",
    "period": "",
    "implementationStatus": "reconstruction",
    "category": "Automation",
    "shortDescription": "Workflow automation streamlining cross-channel processes with integrated validation and exception handling",
    "contributions": [
      "Workflow automation streamlining cross-channel processes with integrated validation and exception handling",
      "Uses synthetic data"
    ],
    "capabilities": [
      "Power Automate",
      "Workflow Automation",
      "Automation",
      "Validation"
    ],
    "tools": [
      "Power Automate",
      "Power Query",
      "Google Apps Script",
      "Excel"
    ],
    "relatedPortfolioSlugs": [],
    "relatedProfessionalIds": [],
    "featured": false,
    "publicDetailLevel": "full"
  }
,
{
    "id": "data-analyst-portfolio",
    "title": "Data Analyst Portfolio",
    "organization": "Independent",
    "classification": "independent-project",
    "period": "",
    "implementationStatus": "portfolio-demo",
    "category": "Analytics",
    "shortDescription": "Collection of practical analytics projects demonstrating SQL, Python, data processing and business intelligence workflows",
    "contributions": [
      "Collection of practical analytics projects demonstrating SQL, Python, data processing and business intelligence workflows",
      "Uses synthetic data"
    ],
    "capabilities": [
      "SQL",
      "Python",
      "Excel",
      "Power Query",
      "Data Modeling"
    ],
    "tools": [
      "SQL",
      "Python",
      "Excel",
      "Power Query",
      "Power BI"
    ],
    "relatedPortfolioSlugs": [
      "data-analytics-portfolio"
    ],
    "relatedProfessionalIds": [],
    "featured": false,
    "publicDetailLevel": "full"
  }
]


export const professionalWork = projectInventory.filter(function(item) {
  return item.classification !== "portfolio-case-study" && item.classification !== "portfolio-reconstruction" && item.classification !== "independent-project";
});


export const portfolioEvidence = projectInventory.filter(function(item) {
  return item.classification === "portfolio-case-study" || item.classification === "portfolio-reconstruction" || item.classification === "independent-project";
});


export function getProjectById(id: string): ProjectInventoryItem | undefined {
  return projectInventory.find(function(item) { return item.id === id; });
}


export function getProjectsByClassification(cls: WorkClassification): ProjectInventoryItem[] {
  return projectInventory.filter(function(item) { return item.classification === cls; });
}


export function getProjectsByExperience(expId: string): ProjectInventoryItem[] {
  return projectInventory.filter(function(item) { return item.relatedExperienceId === expId; });
}

