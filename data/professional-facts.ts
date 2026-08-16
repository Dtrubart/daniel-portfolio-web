export type EvidenceLevel = "verified" | "supported" | "contextual" | "narrative";

export interface EmploymentFact {
  id: string;
  organization: string;
  role: string;
  periodStart: string;
  periodEnd: string;
  isOngoing?: boolean;
  employmentType?: string;
  area?: string;
  businessContext?: string;
  supportedAreas: string[];
  contributions: string[];
  technologies: string[];
  capabilities: string[];
  evidence: EvidenceLevel;
  notes?: string;
  relatedWorkIds?: string[];
  verificationStatus?: "confirmed" | "requires-confirmation" | "flagged";
}

export interface CareerStageFact {
  id: string;
  title: string;
  period: string;
  theme: string;
  domains: string[];
  evolution: string;
  highlight?: boolean;
  isCurrentDirection?: boolean;
  focus?: string[];
  evidence: EvidenceLevel;
  employmentIds?: string[];
}

export interface CapabilityFact {
  id: string;
  title: string;
  coreAreas: string[];
  relatedExperienceIds?: string[];
  relatedWorkIds?: string[];
  relatedProjectSlugs?: string[];
  evidence: EvidenceLevel;
}

export interface CrossCuttingCapabilityFact {
  id: string;
  title: string;
  description: string;
  evidence: EvidenceLevel;
}

export interface SelectedWorkFact {
  id: string;
  title: string;
  organization: string;
  category: string;
  workType: "professional" | "reconstruction" | "independent";
  description: string;
  capabilities: string[];
  technologies?: string[];
  relatedProjectSlug?: string;
  relatedExperienceId?: string;
  evidence: EvidenceLevel;
  evidenceNote?: string;
  notes?: string;
}

export interface SelectedImpactFact {
  id: string;
  metric: string;
  description: string;
  context: string;
  safeWording: string;
  evidence: EvidenceLevel;
}

export interface PrincipleFact {
  id: string;
  title: string;
  description: string;
  evidence: EvidenceLevel;
}

export interface EducationFact {
  id: string;
  title: string;
  institution: string;
  period?: string;
  evidence: EvidenceLevel;
}

export interface CertificationFact {
  id: string;
  name: string;
  evidence: EvidenceLevel;
}

export interface CurrentDevelopmentItem {
  id: string;
  name: string;
}

export interface ContactFact {
  id: string;
  label: string;
  value: string;
  isPublic: boolean;
  evidence: EvidenceLevel;
  needsConfirmation?: boolean;
}

export interface ProfessionalFacts {
  identity: {
    name: string;
    headline: string;
    supportingLine: string;
    summary: string;
    domainTags: string[];
    evidence: EvidenceLevel;
  };
  employment: EmploymentFact[];
  careerStages: CareerStageFact[];
  capabilities: CapabilityFact[];
  crossCuttingCapabilities: CrossCuttingCapabilityFact[];
  selectedWork: SelectedWorkFact[];
  selectedImpact: SelectedImpactFact[];
  principles: PrincipleFact[];
  education: EducationFact[];
  certifications: CertificationFact[];
  currentDevelopment: CurrentDevelopmentItem[];
  contact: ContactFact[];
}

export const professionalFacts: ProfessionalFacts = {
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
    evidence: "narrative",
  },

  employment: [
    {
      id: "universidad-de-lima",
      organization: "Universidad de Lima",
      role: "Laboratory Assistant / Lab Instructor (Intern)",
      periodStart: "2018-04",
      periodEnd: "2018-12",
      employmentType: "Intern",
      area: "Industrial Engineering Laboratories — Manufacturing & Metalworking",
      supportedAreas: [
        "supported practical engineering laboratory sessions",
        "technical instruction and guidance",
        "manufacturing / metalworking laboratory environment",
        "safety became an important professional lesson",
        "taught / supported 31 laboratory sections",
      ],
      contributions: [],
      technologies: ["Industrial Equipment"],
      capabilities: ["Manufacturing", "Teaching", "Safety", "Technical Communication"],
      evidence: "verified",
      notes: "Dates are narrative (April 2018 – December 2018); narrative stage remains 2018–2020.",
      verificationStatus: "confirmed",
    },
    {
      id: "universidad-de-lima-2025",
      organization: "Universidad de Lima",
      role: "Jefe de Práctica / Teaching Assistant",
      periodStart: "2025-04",
      periodEnd: "2025-12",
      employmentType: "Teaching Staff / Faculty Support",
      area: "Industrial Engineering",
      businessContext:
        "Member of the teaching staff / faculty support team in Industrial Engineering.",
      supportedAreas: [
        "Manufacturing Processes",
        "Mechanics",
        "Industrial Automation",
        "Fundamentals of Programming",
        "Technical instruction and guidance to university students",
      ],
      contributions: [],
      technologies: [],
      capabilities: [
        "Teaching",
        "Manufacturing",
        "Industrial Automation",
        "Programming Fundamentals",
      ],
      evidence: "verified",
      verificationStatus: "confirmed",
      relatedWorkIds: [],
    },
    {
      id: "genesis-sac",
      organization: "Constructora e Inmobiliaria Genesis SAC",
      role: "Project Advisor",
      periodStart: "2020-08",
      periodEnd: "2020-12",
      employmentType: "Freelance / Strategic Advisory",
      businessContext: "Construction and aggregate-production company.",
      supportedAreas: [
        "business diagnosis",
        "operations",
        "strategy",
        "administration / finance",
        "debt and financial-structure analysis",
        "operational / maintenance implications",
        "As-Is / To-Be process documentation",
        "decision support",
      ],
      contributions: [],
      technologies: ["Excel"],
      capabilities: ["Financial Modeling", "Operations", "Strategy", "Analysis"],
      evidence: "verified",
      verificationStatus: "confirmed",
      relatedWorkIds: ["mining-transportation-pricing-model"],
    },
    {
      id: "sol-del-pacifico-intern",
      organization: "Transportes y Comercio Sol del Pacífico",
      role: "Finance & IT / Operations Intern",
      periodStart: "2021-03",
      periodEnd: "2022-07",
      employmentType: "Intern",
      area: "Finance & IT / Operations",
      supportedAreas: [
        "financial modeling",
        "sensitivity analysis",
        "pricing / costing",
        "strategic analysis",
        "operational data",
        "systems support",
        "process mapping",
        "field data collection",
        "telemetry exploration",
        "ERP / telemetry requirements",
        "operational analytics transition",
      ],
      contributions: [],
      technologies: ["Excel", "ERP", "Power BI", "SQL", "Telemetry"],
      capabilities: ["Financial Modeling", "Analytics", "ERP", "Process Improvement"],
      evidence: "verified",
      verificationStatus: "confirmed",
      relatedWorkIds: ["erp-implementation-transformation", "mining-transportation-pricing-model", "corporate-financing-analysis"],
    },
    {
      id: "sol-del-pacifico-coordinator",
      organization: "Transportes y Comercio Sol del Pacífico",
      role: "Telematics & ERP Coordinator",
      periodStart: "2022-08",
      periodEnd: "2025-03",
      employmentType: "Full-time",
      supportedAreas: [
        "ERP implementation coordination",
        "data migration",
        "UAT",
        "reporting standardization",
        "telemetry analytics",
        "Power BI",
        "fleet analytics",
        "maintenance / fuel / driver-performance analytics",
        "executive operational / financial reporting",
      ],
      contributions: [],
      technologies: ["ERP", "Power BI", "Telemetry", "SQL", "Excel"],
      capabilities: ["ERP", "Analytics", "Telemetry", "Fleet Management", "Process Improvement"],
      evidence: "verified",
      verificationStatus: "confirmed",
      relatedWorkIds: [
        "erp-implementation-transformation",
        "fleet-telemetry-platform",
        "fleet-intelligence-driver-performance",
        "executive-operations-financial-bi",
      ],
      notes: "Supported outcomes: 65% speeding reduction and 3–5% fuel efficiency improvement (contributing to).",
    },
    {
      id: "municipality-la-molina",
      organization: "Municipality of La Molina",
      role: "Administrative Specialist III — Economic Development Management",
      periodStart: "2022-02",
      periodEnd: "2022-07",
      employmentType: "Public Sector",
      supportedAreas: [
        "innovation initiatives",
        "entrepreneurship programs",
        "blockchain / crypto exploration",
        "economic development",
        "public-private collaboration",
        "employability initiatives",
        "institutional coordination",
        "public-facing events",
        "stakeholder coordination",
        "project ownership",
        "communication with institutions / external organizations",
      ],
      contributions: [],
      technologies: ["Process Design", "Reporting"],
      capabilities: ["Innovation", "Stakeholder Communication", "Project Management"],
      evidence: "verified",
      verificationStatus: "confirmed",
      notes: "This role overlapped with the Sol del Pacífico telemetry-transition period (March–July 2022).",
      relatedWorkIds: ["cross-system-reconciliation-engine"],
    },
    {
      id: "publicis-global-delivery",
      organization: "Publicis Global Delivery",
      role: "Invoice Reconciliation & Process Optimization Analyst",
      periodStart: "2025-03",
      periodEnd: "2025-12",
      employmentType: "Full-time",
      supportedAreas: [
        "invoice reconciliation",
        "multi-source data validation",
        "exception management",
        "automation",
        "reporting",
        "data-quality controls",
      ],
      contributions: [],
      technologies: ["Power Automate", "Power Query", "SQL logic", "Google Apps Script", "Power BI", "Excel"],
      capabilities: ["Automation", "Data Quality", "Finance Operations", "Reconciliation"],
      evidence: "verified",
      verificationStatus: "confirmed",
      notes: "160+ monthly supplier accounts; USD 25M monthly activity framework; reduced from 28+ hours to ~2 hours (~26 hours saved per cycle).",
      relatedWorkIds: ["invoice-reconciliation-automation"],
    },
    {
      id: "ag-group",
      organization: "Able Group",
      role: "Data & Operations Analyst",
      periodStart: "2026-02",
      periodEnd: "2026-06",
      isOngoing: false,
      employmentType: "Full-time",
      area: "Vancouver, BC",
      businessContext:
        "Combined direct operational exposure with data and process-improvement work across inventory, B2B orders, inbound logistics and warehouse operations.",
      supportedAreas: [
        "B2B orders",
        "inventory",
        "inbound logistics",
        "multi-warehouse operations",
        "reporting",
        "validation / exception tracking",
        "SOP / process improvement",
        "warehouse allocation visibility",
        "order lifecycle visibility",
        "material movement",
        "operational coordination",
      ],
      contributions: [
        "Built Power BI / Power Query reporting and inventory-visibility views supporting operational decision-making",
        "Maintained and analyzed operational trackers covering inbound shipments, orders, inventory and warehouse allocation",
        "Designed validation and exception controls for multi-source operational information",
        "Documented workflows, SOPs, ownership and exception-handling processes",
        "Coordinated with supply chain, procurement, warehouse and operations stakeholders",
        "Supported direct operational / material-flow activities strengthening practical understanding of warehouse and logistics execution",
      ],
      technologies: ["Power BI", "Power Query", "Excel", "ERP systems / ERP data", "operational spreadsheets", "reporting logic", "data validation", "data-quality controls"],
      capabilities: ["Operations", "Supply Chain", "Inventory", "Analytics", "Business Intelligence", "Business Analysis", "Process Improvement", "Systems Thinking"],
      evidence: "verified",
      verificationStatus: "requires-confirmation",
      notes: "Public period: Feb 2026 – Jun 2026. No quantified outcomes are approved for public disclosure.",
      relatedWorkIds: ["data-analyst-portfolio", "cross-channel-workflow-automation", "inbound-shipment-warehouse-visibility"],
    },
  ],

  careerStages: [
    {
      id: "engineering-foundations",
      title: "Engineering Foundations",
      period: "2018–2020",
      theme: "Learning how systems work — and how people learn to operate them.",
      domains: ["Manufacturing", "Technical Communication", "Safety", "Teaching", "Leadership"],
      evolution: "Engineering Student → Technical Reference",
      evidence: "narrative",
      employmentIds: ["universidad-de-lima"],
    },
    {
      id: "business-diagnosis",
      title: "Business Diagnosis",
      period: "2020",
      theme: "Learning that operational problems are often financial and systemic problems.",
      domains: ["Operations", "Finance", "Maintenance", "Assets", "Strategy"],
      evolution: "Technical Engineer → Business Problem Solver",
      evidence: "narrative",
      employmentIds: ["genesis-sac"],
    },
    {
      id: "finance-business-analysis",
      title: "Finance & Business Analysis",
      period: "2021–2022",
      theme: "Understanding the economics behind operations.",
      domains: ["Financial Modeling", "Pricing", "Costing", "Sensitivity Analysis", "Business Analysis"],
      evolution: "Business Analyst → Cross-Functional Analyst",
      evidence: "narrative",
      employmentIds: ["sol-del-pacifico-intern"],
    },
    {
      id: "operational-intelligence",
      title: "Operational Intelligence",
      period: "2022–2025",
      theme: "Connecting operations, systems and data.",
      domains: ["ERP", "Telemetry", "Fleet", "Maintenance", "Fuel", "Analytics", "Process Improvement"],
      evolution: "Cross-Functional Analyst → Architect of Data-Driven Operations",
      highlight: true,
      evidence: "narrative",
      employmentIds: ["sol-del-pacifico-coordinator", "municipality-la-molina"],
    },
    {
      id: "enterprise-data-automation",
      title: "Enterprise Data & Automation",
      period: "2025",
      theme: "Turning complex enterprise workflows into controlled, repeatable processes.",
      domains: ["Reconciliation", "Automation", "Data Quality", "Exception Management", "Reporting"],
      evolution: "Operational Intelligence → Scalable Enterprise Automation",
      evidence: "narrative",
      employmentIds: ["publicis-global-delivery"],
    },
    {
      id: "supply-chain-operations",
      title: "Supply Chain & Operations Systems",
      period: "2026",
      theme: "Applying analytics and systems thinking directly to physical supply chains.",
      domains: ["Orders", "Inventory", "Warehousing", "Logistics", "Analytics", "Process Controls"],
      evolution: "Enterprise Automation → Integrated Operations Systems",
      evidence: "narrative",
      employmentIds: ["ag-group"],
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
      evidence: "narrative",
      employmentIds: [],
    },
  ],

  capabilities: [
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
      relatedExperienceIds: ["universidad-de-lima", "genesis-sac", "sol-del-pacifico-coordinator", "municipality-la-molina"],
      evidence: "verified",
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
        "KPIs & Design",
        "Data Quality",
        "Reconciliation",
        "Exception Analysis",
      ],
      relatedExperienceIds: ["sol-del-pacifico-intern", "sol-del-pacifico-coordinator", "publicis-global-delivery", "ag-group"],
      relatedWorkIds: ["fleet-intelligence-driver-performance", "executive-operations-financial-bi", "invoice-reconciliation-automation", "data-analyst-portfolio"],
      relatedProjectSlugs: ["fleet-intelligence", "data-analytics-portfolio"],
      evidence: "verified",
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
      relatedExperienceIds: ["sol-del-pacifico-intern", "sol-del-pacifico-coordinator"],
      relatedWorkIds: ["erp-implementation-transformation", "fleet-telemetry-platform"],
      relatedProjectSlugs: ["vanbags-erp", "vanbags-maintenance", "fleet-intelligence"],
      evidence: "verified",
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
      relatedExperienceIds: ["publicis-global-delivery", "ag-group"],
      relatedWorkIds: ["invoice-reconciliation-automation", "cross-system-reconciliation-engine", "cross-channel-workflow-automation"],
      evidence: "verified",
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
      relatedExperienceIds: ["universidad-de-lima", "genesis-sac", "sol-del-pacifico-coordinator", "ag-group"],
      relatedWorkIds: ["fleet-telemetry-platform", "cross-channel-workflow-automation"],
      evidence: "verified",
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
      relatedExperienceIds: ["genesis-sac", "sol-del-pacifico-intern", "sol-del-pacifico-coordinator", "publicis-global-delivery"],
      relatedWorkIds: ["mining-transportation-pricing-model", "corporate-financing-analysis"],
      evidence: "verified",
    },
  ],

  crossCuttingCapabilities: [
    {
      id: "business-analysis",
      title: "Business Analysis",
      description: "Translating operational problems into structured requirements and measurable outcomes.",
      evidence: "verified",
    },
    {
      id: "systems-thinking",
      title: "Systems Thinking",
      description: "Understanding how data, technology, and operations interconnect to shape business outcomes.",
      evidence: "verified",
    },
    {
      id: "process-improvement",
      title: "Process Improvement",
      description: "Designing measurable improvements backed by data and stakeholder feedback.",
      evidence: "verified",
    },
    {
      id: "stakeholder-communication",
      title: "Stakeholder Communication",
      description: "Bridging technical and business audiences through clear documentation and analysis.",
      evidence: "verified",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      description: "Breaking complex problems into testable hypotheses and validated solutions.",
      evidence: "verified",
    },
    {
      id: "change-adoption",
      title: "Change & Adoption",
      description: "Designing systems that are understandable, trusted, and usable by their operators.",
      evidence: "verified",
    },
  ],

  selectedWork: [
    {
      id: "erp-implementation-transformation",
      title: "ERP Implementation & Transformation",
      organization: "Sol del Pacífico",
      category: "Systems",
      workType: "professional",
      description: "End-to-end ERP implementation coordinating cross-functional requirements, process redesign, system configuration and operational adoption.",
      capabilities: ["ERP", "Business Analysis", "Process Design", "Configuration"],
      relatedProjectSlug: "vanbags-erp",
      relatedExperienceId: "sol-del-pacifico-coordinator",
      evidence: "contextual",
    },
    {
      id: "fleet-telemetry-platform",
      title: "Fleet Telemetry Platform",
      organization: "Sol del Pacífico",
      category: "Systems",
      workType: "professional",
      description: "Integrated vehicle telemetry, fuel, maintenance and driver-performance data into an analytics platform for fleet monitoring and optimization.",
      capabilities: ["Telemetry", "ERP", "Analytics", "Fleet Management"],
      relatedExperienceId: "sol-del-pacifico-coordinator",
      evidence: "contextual",
    },
    {
      id: "vanbags-erp-transformation",
      title: "VanBags ERP Transformation",
      organization: "Portfolio Case Study",
      category: "Systems",
      workType: "reconstruction",
      description: "Portfolio case study demonstrating ERP consulting and business-analysis capability across order-to-delivery, configuration, and testing.",
      capabilities: ["ERP", "Business Analysis", "Process Design", "Implementation"],
      relatedProjectSlug: "vanbags-erp",
      evidence: "verified",
      evidenceNote: "Portfolio reconstruction inspired by professional experience; uses synthetic data.",
    },
    {
      id: "vanbags-maintenance-system",
      title: "VanBags Maintenance System",
      organization: "Portfolio Case Study",
      category: "Systems",
      workType: "reconstruction",
      description: "Portfolio case study of an ERPNext/Frappe maintenance application covering work orders, logistics, PM scheduling and tire management.",
      capabilities: ["ERPNext", "Frappe", "Python", "Maintenance Management"],
      relatedProjectSlug: "vanbags-maintenance",
      evidence: "verified",
      evidenceNote: "Portfolio reconstruction inspired by professional experience; uses synthetic data.",
    },
    {
      id: "fleet-intelligence-driver-performance",
      title: "Fleet Intelligence & Driver Performance",
      organization: "Sol del Pacífico / Portfolio",
      category: "Analytics",
      workType: "reconstruction",
      description: "Analytics platform integrating ERP, telemetry, maintenance and fuel data with KPI design, driver ranking and team scoring.",
      capabilities: ["Power BI", "Telemetry", "ERP", "Operations Analytics"],
      relatedProjectSlug: "fleet-intelligence",
      relatedExperienceId: "sol-del-pacifico-coordinator",
      evidence: "verified",
      evidenceNote: "Portfolio reconstruction inspired by professional experience; uses synthetic data.",
    },
    {
      id: "executive-operations-financial-bi",
      title: "Executive Operations & Financial BI",
      organization: "Sol del Pacífico",
      category: "Analytics",
      workType: "professional",
      description: "Management reporting and dashboards connecting operational KPIs to financial outcomes across fleet and enterprise operations.",
      capabilities: ["Power BI", "Financial Analysis", "KPI Design", "Data Modeling"],
      relatedExperienceId: "sol-del-pacifico-coordinator",
      evidence: "contextual",
    },
    {
      id: "data-analyst-portfolio",
      title: "Data Analyst Portfolio",
      organization: "Independent",
      category: "Analytics",
      workType: "independent",
      description: "Collection of practical analytics projects demonstrating SQL, Python, data processing and business intelligence workflows.",
      capabilities: ["SQL", "Python", "Excel", "Power Query", "Data Modeling"],
      relatedProjectSlug: "data-analytics-portfolio",
      relatedExperienceId: "ag-group",
      evidence: "verified",
    },
    {
      id: "invoice-reconciliation-automation",
      title: "Invoice Reconciliation Automation",
      organization: "Publicis",
      category: "Automation",
      workType: "professional",
      description: "Automation workflows for invoice reconciliation, exception management and financial reporting across complex processes.",
      capabilities: ["Power Automate", "Data Quality", "Automation", "Reconciliation"],
      relatedExperienceId: "publicis-global-delivery",
      evidence: "contextual",
    },
    {
      id: "cross-system-reconciliation-engine",
      title: "Cross-System Reconciliation Engine",
      organization: "Public Reconstruction",
      category: "Automation",
      workType: "reconstruction",
      description: "Validation pipelines ensuring data integrity and consistency across integrated enterprise systems.",
      capabilities: ["Automation", "Data Quality", "Reconciliation", "Validation"],
      relatedExperienceId: "municipality-la-molina",
      evidence: "contextual",
      evidenceNote: "Portfolio reconstruction inspired by professional experience; uses synthetic data.",
    },
    {
      id: "cross-channel-workflow-automation",
      title: "Cross-Channel Workflow Automation",
      organization: "Public Reconstruction",
      category: "Automation",
      workType: "reconstruction",
      description: "Workflow automation streamlining cross-channel processes with integrated validation and exception handling.",
      capabilities: ["Power Automate", "Workflow Automation", "Automation", "Validation"],
      relatedExperienceId: "ag-group",
      evidence: "contextual",
      evidenceNote: "Portfolio reconstruction inspired by professional experience; uses synthetic data.",
    },
    {
      id: "mining-transportation-pricing-model",
      title: "Mining Transportation Pricing Model",
      organization: "Sol del Pacífico",
      category: "Business / Finance",
      workType: "professional",
      description: "Pricing model for mining transportation services based on route, load, vehicle class and operational cost analysis.",
      capabilities: ["Financial Modeling", "Pricing", "Cost Analysis", "Sensitivity Analysis"],
      relatedExperienceId: "genesis-sac",
      evidence: "contextual",
    },
    {
      id: "corporate-financing-analysis",
      title: "Corporate Financing Analysis",
      organization: "Sol del Pacífico",
      category: "Business / Finance",
      workType: "professional",
      description: "Analytical and preparation support around operational assumptions, financial structures and business risks for a corporate financing process.",
      capabilities: ["Financial Modeling", "Business Cases", "Decision Support", "Analysis"],
      relatedExperienceId: "sol-del-pacifico-intern",
      evidence: "contextual",
      notes: "Supported analysis and preparation during an approximately USD 22.5M financing process. Attribution: 'Financing process supported', not 'Raised $22.5M'.",
    },
    {
      id: "inbound-shipment-warehouse-visibility",
      title: "Inbound Shipment & Warehouse Visibility",
      organization: "Able Group",
      category: "Analytics",
      workType: "professional",
      description:
        "Built structured Power BI / Power Query reporting and inventory-visibility views across inbound shipments, purchase orders, inventory availability and warehouse allocation, improving visibility across the order and logistics lifecycle.",
      capabilities: ["Inventory", "Inbound Logistics", "Order Management", "Warehouse Visibility", "Power BI", "Power Query", "Data Validation", "Process Improvement"],
      technologies: ["Power BI", "Power Query", "Excel", "ERP systems / ERP data", "operational spreadsheets"],
      relatedExperienceId: "ag-group",
      evidence: "contextual",
      evidenceNote: "Professional work at Able Group. Uses operational information from ERP and supply-chain platforms.",
    },
  ],

  selectedImpact: [
    {
      id: "speeding-reduction",
      metric: "65% reduction",
      description: "Speeding incidents",
      context: "Telemetry analytics and driver-performance initiative.",
      safeWording: "Telemetry analytics / driver-performance initiative contributed to a 65% reduction in speeding incidents.",
      evidence: "contextual",
    },
    {
      id: "fuel-efficiency-improvement",
      metric: "3–5% improvement",
      description: "Fuel efficiency",
      context: "Telemetry-driven operational analysis.",
      safeWording: "Telemetry-driven operational analysis contributed to a 3–5% improvement in fuel efficiency.",
      evidence: "contextual",
    },
    {
      id: "reconciliation-time-reduction",
      metric: "~26 hours saved",
      description: "Monthly reconciliation workflow",
      context: "Automation of validation and exception workflows.",
      safeWording: "Automation reduced monthly reconciliation processing from 28+ hours to approximately 2 hours (~26 hours saved per cycle).",
      evidence: "verified",
    },
    {
      id: "financing-process-support",
      metric: "Approximately USD 22.5M",
      description: "Financing process supported",
      context: "Analytical and preparation support around operational assumptions, financial structures and business risks.",
      safeWording: "Daniel provided analytical and preparation support for a financing process of approximately USD 22.5M. This represents the financing process supported, not funds raised directly by Daniel.",
      evidence: "contextual",
    },
  ],

  principles: [
    {
      id: "understand-operation-first",
      title: "Understand the operation first",
      description:
        "Technology without operational understanding becomes disconnected.",
      evidence: "narrative",
    },
    {
      id: "make-information-actionable",
      title: "Make information actionable",
      description:
        "Data creates value when it improves a decision or process.",
      evidence: "narrative",
    },
    {
      id: "design-before-automating",
      title: "Design before automating",
      description:
        "Do not automate a broken process without understanding and improving it.",
      evidence: "narrative",
    },
    {
      id: "build-for-adoption",
      title: "Build for adoption",
      description:
        "Systems succeed when people can understand, trust and use them.",
      evidence: "narrative",
    },
  ],

  education: [
    {
      id: "bs-industrial-engineering",
      title: "BSc Industrial Engineering",
      institution: "Universidad de Lima",
      evidence: "verified",
    },
    {
      id: "post-diploma-operations",
      title: "Post-Degree Diploma",
      institution: "Operations & Production Management",
      evidence: "narrative",
    },
  ],

  certifications: [
    { id: "pl-300", name: "Microsoft PL-300", evidence: "verified" },
    { id: "dp-900", name: "Microsoft DP-900", evidence: "verified" },
    { id: "dp-600", name: "Microsoft DP-600", evidence: "verified" },
    { id: "google-data-analytics", name: "Google Data Analytics", evidence: "verified" },
  ],

  currentDevelopment: [
    { id: "erpnext-frappe", name: "ERPNext / Frappe" },
    { id: "enterprise-ai", name: "Enterprise AI" },
    { id: "data-architecture", name: "Data Architecture" },
    { id: "systems-architecture", name: "Systems Architecture" },
    { id: "industry-4-0", name: "Industry 4.0" },
  ],

  contact: [
    {
      id: "location",
      label: "Location",
      value: "Burnaby, BC / Metro Vancouver",
      isPublic: true,
      evidence: "narrative",
      needsConfirmation: true,
    },
    {
      id: "email",
      label: "Email",
      value: "",
      isPublic: false,
      evidence: "narrative",
      needsConfirmation: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "",
      isPublic: false,
      evidence: "narrative",
      needsConfirmation: true,
    },
    {
      id: "github",
      label: "GitHub",
      value: "",
      isPublic: false,
      evidence: "narrative",
      needsConfirmation: true,
    },
  ],
};