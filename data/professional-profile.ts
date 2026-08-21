export type EvidenceLevel = "verified" | "supported" | "contextual";

export interface ProfessionalIdentity {
  name: string;
  headline: string;
  supportingLine: string;
  summary: string;
  domainTags: string[];
}

export interface CareerStage {
  id: string;
  title: string;
  period: string;
  theme: string;
  domains: string[];
  evolution: string;
  highlight?: boolean;
  isCurrentDirection?: boolean;
  focus?: string[];
}

export interface CapabilityDomain {
  id: string;
  title: string;
  coreAreas: string[];
}

export interface CrossCuttingCapability {
  id: string;
  title: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  context: string;
  contributions: string[];
  capabilities: string[];
  technologies: string[];
  workSlugs: string[];
}

export interface SelectedWorkItem {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  capabilities: string[];
  relatedProjectSlug?: string;
  workSlugs?: string[];
  evidence: EvidenceLevel;
}

export interface SelectedImpactItem {
  id: string;
  metric: string;
  description: string;
  context: string;
  evidence: EvidenceLevel;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
}

export interface CurrentDevelopmentItem {
  id: string;
  name: string;
}

export interface ProfessionalProfile {
  identity: ProfessionalIdentity;
  careerStages: CareerStage[];
  capabilityDomains: CapabilityDomain[];
  crossCuttingCapabilities: CrossCuttingCapability[];
  experiences: ExperienceItem[];
  selectedWork: SelectedWorkItem[];
  selectedImpact: SelectedImpactItem[];
  principles: Principle[];
  education: EducationItem[];
  certifications: string[];
  currentDevelopment: CurrentDevelopmentItem[];
}

export const professionalProfile: ProfessionalProfile = {
  identity: {
    name: "Daniel Trujillo",
    headline: "Industrial Engineer | Data, Business Systems & Operations",
    supportingLine:
      "Building systems that connect operations, data, enterprise technology, automation, and business decision-making.",
    summary:
      "Industrial Engineer with a multidisciplinary background across operations, enterprise systems, data analytics, automation, finance, and process improvement. His career has evolved from understanding how physical and financial operations work to designing the systems, analytical models, workflows, and controls that make those operations more visible and manageable. His strongest professional interest lies in problems between business and technology, where understanding the process is as important as understanding the system or the data.",
    domainTags: [
      "Data & Analytics",
      "ERP & Business Systems",
      "Operations",
      "Automation",
      "Process Improvement",
    ],
  },
  careerStages: [
    {
      id: "engineering-foundations",
      title: "Engineering Foundations",
      period: "2018–2020",
      theme: "Learning how systems work — and how people learn to operate them.",
      domains: ["Manufacturing", "Technical Communication", "Safety", "Teaching", "Leadership"],
      evolution: "Engineering Student → Technical Reference",
    },
    {
      id: "business-diagnosis",
      title: "Business Diagnosis",
      period: "2020",
      theme: "Learning that operational problems are often financial and systemic problems.",
      domains: ["Operations", "Finance", "Maintenance", "Assets", "Strategy"],
      evolution: "Technical Engineer → Business Problem Solver",
    },
    {
      id: "finance-business-analysis",
      title: "Finance & Business Analysis",
      period: "2021–2022",
      theme: "Understanding the economics behind operations.",
      domains: ["Financial Modeling", "Pricing", "Costing", "Sensitivity Analysis", "Business Analysis"],
      evolution: "Business Analyst → Cross-Functional Analyst",
    },
    {
      id: "operational-intelligence",
      title: "Operational Intelligence",
      period: "2022–2025",
      theme: "Connecting operations, systems and data.",
      domains: ["ERP", "Telemetry", "Fleet", "Maintenance", "Fuel", "Analytics", "Process Improvement"],
      evolution: "Cross-Functional Analyst → Architect of Data-Driven Operations",
      highlight: true,
    },
    {
      id: "enterprise-data-automation",
      title: "Enterprise Data & Automation",
      period: "2025",
      theme: "Turning complex enterprise workflows into controlled, repeatable processes.",
      domains: ["Reconciliation", "Automation", "Data Quality", "Exception Management", "Reporting"],
      evolution: "Operational Intelligence → Scalable Enterprise Automation",
    },
    {
      id: "supply-chain-operations",
      title: "Supply Chain & Operations Systems",
      period: "2026",
      theme: "Applying analytics and systems thinking directly to physical supply chains.",
      domains: ["Orders", "Inventory", "Warehousing", "Logistics", "Analytics", "Process Controls"],
      evolution: "Enterprise Automation → Integrated Operations Systems",
    },
    {
      id: "current-direction",
      title: "Current Direction",
      period: "2026 →",
      theme: "Building toward intelligent enterprise systems.",
      domains: [],
      evolution: "",
      isCurrentDirection: true,
      focus: [
        "ERP Implementation",
        "Business Systems",
        "Operational Analytics",
        "Data Architecture",
        "Enterprise AI",
        "Automation",
        "Industry 4.0",
        "Systems Integration",
      ],
    },
  ],
  capabilityDomains: [
    {
      id: "industrial-engineering",
      title: "Industrial Engineering",
      coreAreas: [
        "Process Design",
        "Process Mapping",
        "Continuous Improvement",
        "Root Cause Analysis",
        "Manufacturing",
        "Maintenance",
        "Operational Planning",
      ],
    },
    {
      id: "data-analytics",
      title: "Data & Analytics",
      coreAreas: [
        "Power BI",
        "SQL",
        "Python",
        "Power Query",
        "Excel",
        "Data Modeling",
        "KPI Design",
        "Data Quality",
        "Reconciliation",
        "Exception Analysis",
      ],
    },
    {
      id: "erp-business-systems",
      title: "ERP & Business Systems",
      coreAreas: [
        "ERP",
        "Requirements",
        "Current / Future State",
        "Configuration",
        "Master Data",
        "UAT",
        "Data Migration",
        "Workflow Design",
        "SOPs",
        "Systems Integration",
      ],
    },
    {
      id: "automation",
      title: "Automation",
      coreAreas: [
        "Power Automate",
        "Google Apps Script",
        "Python",
        "Excel / VBA",
        "Workflow Automation",
        "Validation Pipelines",
      ],
    },
    {
      id: "operations-supply-chain",
      title: "Operations & Supply Chain",
      coreAreas: [
        "Inventory",
        "Logistics",
        "Warehousing",
        "Production",
        "Fleet",
        "Maintenance",
        "Order Management",
        "Supply Planning",
      ],
    },
    {
      id: "business-finance",
      title: "Business & Finance",
      coreAreas: [
        "Financial Modeling",
        "Cost Analysis",
        "Pricing",
        "Sensitivity Analysis",
        "Business Cases",
        "Decision Support",
      ],
    },
  ],
  crossCuttingCapabilities: [
    {
      id: "business-analysis",
      title: "Business Analysis",
      description: "Translating operational problems into structured requirements and measurable outcomes.",
    },
    {
      id: "systems-thinking",
      title: "Systems Thinking",
      description: "Understanding how data, technology, and operations interconnect to shape business outcomes.",
    },
    {
      id: "process-improvement",
      title: "Process Improvement",
      description: "Designing measurable improvements backed by data and stakeholder feedback.",
    },
    {
      id: "stakeholder-communication",
      title: "Stakeholder Communication",
      description: "Bridging technical and business audiences through clear documentation and analysis.",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      description: "Breaking complex problems into testable hypotheses and validated solutions.",
    },
    {
      id: "change-adoption",
      title: "Change & Adoption",
      description: "Designing systems that are understandable, trusted, and usable by their operators.",
    },
  ],
  experiences: [
    {
      id: "universidad-de-lima",
      organization: "Universidad de Lima",
      role: "Laboratory Assistant / Instructor",
      period: "2018–2020",
      context: "Manufacturing · Engineering · Teaching",
      contributions: [
        "Supported manufacturing and engineering laboratory sessions",
        "Provided technical instruction and safety guidance to student groups",
        "Maintained equipment and documented technical procedures",
      ],
      capabilities: ["Teaching", "Safety", "Manufacturing", "Technical Communication"],
      technologies: ["Industrial Equipment", "Educational Systems"],
      workSlugs: [],
    },
    {
      id: "genesis-sac",
      organization: "Constructora e Inmobiliaria Genesis SAC",
      role: "Project Advisor",
      period: "2020",
      context: "Finance · Operations · Strategy",
      contributions: [
        "Advised on financial structuring for real-estate development projects",
        "Modeled project costs and evaluated operational feasibility",
        "Supported analysis connecting field operations to financial outcomes",
      ],
      capabilities: ["Financial Modeling", "Operations", "Strategy", "Analysis"],
      technologies: ["Excel", "Financial Modeling"],
      workSlugs: ["mining-transportation-pricing-model"],
    },
    {
      id: "sol-del-pacifico",
      organization: "Sol del Pacífico",
      role: "Finance & IT / Operations → ERP & Telemetry",
      period: "2021–2025",
      context: "Finance · ERP · Analytics · Fleet · Operations",
      contributions: [
        "Designed and coordinated ERP and telemetry initiatives connecting operations to financial reporting",
        "Built analytical models integrating fleet telemetry, fuel, maintenance and driver performance",
        "Developed management reporting and performance dashboards",
      ],
      capabilities: [
        "ERP",
        "Analytics",
        "Fleet Management",
        "Process Improvement",
        "Financial Analysis",
      ],
      technologies: ["ERP", "Power BI", "Telemetry", "SQL", "Excel"],
      workSlugs: [
        "erp-implementation-transformation",
        "fleet-telemetry-platform",
        "fleet-intelligence-driver-performance",
        "executive-operations-financial-bi",
        "mining-transportation-pricing-model",
        "corporate-financing-analysis",
      ],
    },
    {
      id: "municipality-la-molina",
      organization: "Municipality of La Molina",
      role: "Administrative Specialist III",
      period: "2022",
      context: "Innovation · Projects · Stakeholders",
      contributions: [
        "Led innovation and process-improvement projects across municipal operations",
        "Coordinated cross-functional stakeholder initiatives",
        "Designed administrative workflows and reporting controls",
      ],
      capabilities: ["Process Improvement", "Stakeholder Communication", "Project Management"],
      technologies: ["Process Design", "Reporting", "Workflow"],
      workSlugs: ["cross-system-reconciliation-engine"],
    },
    {
      id: "publicis-global-delivery",
      organization: "Publicis Global Delivery",
      role: "Invoice Reconciliation / Process Optimization",
      period: "2025",
      context: "Data · Finance Operations · Automation",
      contributions: [
        "Implemented automation workflows for invoice reconciliation and exception management",
        "Built ETL, validation and reporting pipelines reducing monthly cycle time",
        "Designed exception-handling and alerting controls",
      ],
      capabilities: ["Automation", "Data Quality", "Finance Operations", "Reconciliation"],
      technologies: ["Power Automate", "Excel/VBA"],
      workSlugs: ["invoice-reconciliation-automation"],
    },
    {
      id: "ag-group",
      organization: "Able Group",
      role: "Data & Operations Analyst",
      period: "Feb 2026 – Jun 2026",
      context: "Operations · Supply Chain · Inventory · Logistics · Analytics",
      contributions: [
        "Combined direct operational exposure with data and process-improvement work across inventory, B2B orders, inbound logistics and warehouse operations",
        "Built Power BI / Power Query reporting and inventory-visibility views supporting operational decision-making",
        "Designed validation and exception controls for multi-source operational information",
        "Documented workflows, SOPs, ownership and exception-handling processes",
        "Coordinated with supply chain, procurement, warehouse and operations stakeholders",
        "Supported direct operational / material-flow activities strengthening practical understanding of warehouse and logistics execution",
      ],
      capabilities: ["Operations", "Supply Chain", "Inventory", "Analytics", "Business Intelligence", "Business Analysis", "Process Improvement", "Systems Thinking"],
      technologies: ["Power BI", "Power Query", "Excel", "ERP systems / ERP data", "operational spreadsheets"],
      workSlugs: [
        "cross-channel-workflow-automation",
        "data-analyst-portfolio",
        "inbound-shipment-warehouse-visibility",
      ],
    },
  ],
  selectedWork: [
    {
      id: "erp-implementation-transformation",
      title: "ERP Implementation & Transformation",
      organization: "Sol del Pacífico",
      category: "Systems",
      description:
        "End-to-end ERP implementation coordinating cross-functional requirements, process redesign, system configuration and operational adoption.",
      capabilities: ["ERP", "Business Analysis", "Process Design", "Configuration"],
      relatedProjectSlug: "vanbags-erp",
      evidence: "contextual",
    },
    {
      id: "fleet-telemetry-platform",
      title: "Fleet Telemetry Platform",
      organization: "Sol del Pacífico",
      category: "Systems",
      description:
        "Integrated vehicle telemetry, fuel, maintenance and driver-performance data into an analytics platform for fleet monitoring and optimization.",
      capabilities: ["Telemetry", "ERP", "Analytics", "Fleet Management"],
      workSlugs: [],
      evidence: "contextual",
    },
    {
      id: "vanbags-erp-transformation",
      title: "VanBags ERP Transformation",
      organization: "Portfolio Case Study",
      category: "Systems",
      description:
        "Portfolio case study demonstrating ERP consulting and business-analysis capability across order-to-delivery, configuration, and testing.",
      capabilities: ["ERP", "Business Analysis", "Process Design", "Implementation"],
      relatedProjectSlug: "vanbags-erp",
      evidence: "verified",
    },
    {
      id: "vanbags-maintenance-system",
      title: "VanBags Maintenance System",
      organization: "Portfolio Case Study",
      category: "Systems",
      description:
        "Portfolio case study of an ERPNext/Frappe maintenance application covering work orders, logistics, PM scheduling and tire management.",
      capabilities: ["ERPNext", "Frappe", "Python", "Maintenance Management"],
      relatedProjectSlug: "vanbags-maintenance",
      evidence: "verified",
    },
    {
      id: "fleet-intelligence-driver-performance",
      title: "Fleet Intelligence Platform",
      organization: "Portfolio Case Study",
      category: "Analytics",
      description:
        "Analytics platform integrating ERP, telemetry, maintenance and fuel data with KPI design, driver ranking and team scoring.",
      capabilities: ["Power BI", "Telemetry", "ERP", "Operations Analytics"],
      relatedProjectSlug: "fleet-intelligence",
      evidence: "verified",
    },
    {
      id: "executive-operations-financial-bi",
      title: "Executive Operations & Financial BI",
      organization: "Sol del Pacífico",
      category: "Analytics",
      description:
        "Management reporting and dashboards connecting operational KPIs to financial outcomes across fleet and enterprise operations.",
      capabilities: ["Power BI", "Financial Analysis", "KPI Design", "Data Modeling"],
      workSlugs: [],
      evidence: "contextual",
    },
    {
      id: "data-analyst-portfolio",
      title: "Data Analyst Portfolio",
      organization: "Independent",
      category: "Analytics",
      description:
        "Collection of practical analytics projects demonstrating SQL, Python, data processing and business-intelligence workflows.",
      capabilities: ["SQL", "Python", "Excel", "Power Query", "Data Modeling"],
      relatedProjectSlug: "data-analytics-portfolio",
      evidence: "verified",
    },
    {
      id: "invoice-reconciliation-automation",
      title: "Invoice Reconciliation Automation",
      organization: "Publicis",
      category: "Automation",
      description:
        "Automation workflows for invoice reconciliation, exception management and financial reporting across complex processes.",
      capabilities: ["Power Automate", "Automation", "Data Quality"],
      workSlugs: [],
      evidence: "contextual",
    },
    {
      id: "cross-system-reconciliation-engine",
      title: "Cross-System Reconciliation Engine",
      organization: "Public Reconstruction",
      category: "Automation",
      description:
        "Validation pipelines ensuring data integrity and consistency across integrated enterprise systems.",
      capabilities: ["Automation", "Data Quality", "Reconciliation", "Validation"],
      workSlugs: [],
      evidence: "contextual",
    },
    {
      id: "cross-channel-workflow-automation",
      title: "Cross-Channel Workflow Automation",
      organization: "Public Reconstruction",
      category: "Automation",
      description:
        "Workflow automation streamlining cross-channel processes with integrated validation and exception handling.",
      capabilities: ["Power Automate", "Workflow Automation", "Automation", "Validation"],
      workSlugs: [],
      evidence: "contextual",
    },
    {
      id: "mining-transportation-pricing-model",
      title: "Mining Transportation Pricing Model",
      organization: "Sol del Pacífico",
      category: "Business / Finance",
      description:
        "Pricing model for mining transportation services based on route, load, vehicle class and operational cost analysis.",
      capabilities: ["Financial Modeling", "Pricing", "Cost Analysis", "Sensitivity Analysis"],
      workSlugs: [],
      evidence: "contextual",
    },
    {
      id: "corporate-financing-analysis",
      title: "Corporate Financing Analysis",
      organization: "Sol del Pacífico",
      category: "Business / Finance",
      description:
        "Analytical and preparation support around operational assumptions, financial structures and business risks for a corporate financing process.",
      capabilities: ["Financial Modeling", "Business Cases", "Decision Support", "Analysis"],
      workSlugs: [],
      evidence: "contextual",
    },
    {
      id: "inbound-shipment-warehouse-visibility",
      title: "Inbound Shipment & Warehouse Visibility",
      organization: "Able Group",
      category: "Analytics",
      description:
        "Built structured Power BI / Power Query reporting and inventory-visibility views across inbound shipments, purchase orders, inventory availability and warehouse allocation.",
      capabilities: ["Inventory", "Inbound Logistics", "Order Management", "Warehouse Visibility", "Power BI", "Power Query", "Data Validation", "Process Improvement"],
      relatedProjectSlug: "data-analytics-portfolio",
      workSlugs: [],
      evidence: "contextual",
    },
  ],
  selectedImpact: [
    {
      id: "speeding-reduction",
      metric: "65% reduction",
      description: "Speeding incidents",
      context: "Telemetry analytics and driver-performance program.",
      evidence: "contextual",
    },
    {
      id: "fuel-efficiency-improvement",
      metric: "3–5% improvement",
      description: "Fuel efficiency",
      context: "Telemetry-driven operational optimization.",
      evidence: "contextual",
    },
    {
      id: "reconciliation-time-reduction",
      metric: "26+ hours reduced per monthly cycle",
      description: "Reconciliation processing",
      context: "Automation of ETL, validation and exception workflows.",
      evidence: "contextual",
    },
    {
      id: "financing-process-support",
      metric: "Approximately USD 22.5M",
      description: "Financing process supported",
      context:
        "Analytical and preparation support around operational assumptions, financial structures and business risks. This represents the financing process supported, not funds raised directly by Daniel.",
      evidence: "contextual",
    },
  ],
  principles: [
    {
      id: "understand-operation-first",
      title: "Understand the operation first",
      description:
        "Technology without operational understanding becomes disconnected.",
    },
    {
      id: "make-information-actionable",
      title: "Make information actionable",
      description:
        "Data creates value when it improves a decision or process.",
    },
    {
      id: "design-before-automating",
      title: "Design before automating",
      description:
        "Do not automate a broken process without understanding and improving it.",
    },
    {
      id: "build-for-adoption",
      title: "Build for adoption",
      description:
        "Systems succeed when people can understand, trust and use them.",
    },
  ],
  education: [
    {
      id: "bs-industrial-engineering",
      title: "BSc Industrial Engineering",
      institution: "Universidad de Lima",
    },
  ],
  certifications: ["Microsoft PL-300", "Microsoft DP-900", "Microsoft DP-600", "Google Data Analytics"],
  currentDevelopment: [
    { id: "erpnext-frappe", name: "ERPNext / Frappe" },
    { id: "enterprise-ai", name: "Enterprise AI" },
    { id: "data-architecture", name: "Data Architecture" },
    { id: "systems-architecture", name: "Systems Architecture" },
    { id: "industry-4-0", name: "Industry 4.0" },
  ],
};