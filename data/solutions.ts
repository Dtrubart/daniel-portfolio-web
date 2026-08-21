import { Project } from "@/data/projects";

export type SolutionAreaId =
  | "operational-intelligence"
  | "business-systems-erp"
  | "workflow-automation"
  | "operational-excellence";

export type SolutionRelationship = "primary" | "secondary";

export interface SolutionApproachStep {
  label: string;
  description?: string;
}

export interface SolutionData {
  id: SolutionAreaId;
  title: string;
  descriptor: string;
  visitorProblem: string;
  challenges: string[];
  approach: SolutionApproachStep[];
  capabilities: string[];
  tools: string[];
  foundationId: "industrial-engineering";
}

export interface VisitorProblem {
  id: string;
  text: string;
  solutionAreaId: SolutionAreaId;
}

export interface ProjectSolutionLink {
  projectSlug: string;
  solutionId: SolutionAreaId;
  relationship: SolutionRelationship;
}

export const visitorProblems: VisitorProblem[] = [
  {
    id: "ops-visibility",
    text: "I need better visibility into operations.",
    solutionAreaId: "operational-intelligence",
  },
  {
    id: "manual-processes",
    text: "We have too many manual processes.",
    solutionAreaId: "workflow-automation",
  },
  {
    id: "systems-mismatch",
    text: "Our systems do not reflect how the business works.",
    solutionAreaId: "business-systems-erp",
  },
  {
    id: "process-improvement",
    text: "Our process needs to be standardized or improved.",
    solutionAreaId: "operational-excellence",
  },
];

export const solutions: SolutionData[] = [
  {
    id: "operational-intelligence",
    title: "Operational Intelligence",
    descriptor: "Data, KPIs, analytics & decision support.",
    visitorProblem: "I need better visibility into operations.",
    challenges: [
      "fragmented operational information",
      "manual reporting",
      "limited KPI visibility",
      "inconsistent data structures",
      "difficult management reporting",
      "lack of operational performance visibility",
    ],
    approach: [
      { label: "Data", description: "Identify and assemble operational data sources" },
      { label: "Structure", description: "Organize data into consistent models" },
      { label: "Validate", description: "Apply controls to ensure reliability" },
      { label: "Model", description: "Build analytical models and KPI definitions" },
      { label: "Measure", description: "Surface metrics for operational monitoring" },
      { label: "Visualize", description: "Create interactive dashboards and reports" },
      { label: "Decision Support", description: "Enable evidence-based operational decisions" },
    ],
    capabilities: [
      "KPI definition",
      "operational reporting",
      "Power BI dashboards",
      "analytical data models",
      "Excel / Power Query reporting",
      "SQL analysis",
      "data validation",
      "management reporting",
    ],
    tools: ["Power BI", "DAX", "Power Query", "SQL", "Excel", "Python / Pandas"],
    foundationId: "industrial-engineering",
  },
  {
    id: "business-systems-erp",
    title: "Business Systems & ERP",
    descriptor: "Processes, requirements, workflows & system design.",
    visitorProblem: "Our systems do not reflect how the business works.",
    challenges: [
      "disconnected business processes",
      "workflows managed through email/spreadsheets",
      "unclear system requirements",
      "weak process traceability",
      "fragmented operational data",
      "ERP workflows that do not match operational reality",
    ],
    approach: [
      { label: "Discover", description: "Understand current operations and pain points" },
      { label: "Current State", description: "Map existing processes and systems" },
      { label: "Requirements", description: "Translate operational needs into system requirements" },
      { label: "Future State", description: "Design target processes and data structures" },
      { label: "Configuration / Design", description: "Configure or design the system to match" },
      { label: "UAT", description: "Validate the solution against business needs" },
      { label: "Stabilization", description: "Refine and stabilize post-deployment" },
    ],
    capabilities: [
      "business process analysis",
      "requirements gathering",
      "current/future-state mapping",
      "workflow design",
      "ERP configuration support",
      "master-data design",
      "UAT design",
      "SOP/process documentation",
      "reporting requirements",
      "business/system translation",
    ],
    tools: ["ERP systems", "ERPNext / Frappe", "Power BI", "SQL", "Excel", "Power Query"],
    foundationId: "industrial-engineering",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    descriptor: "Manual work, structured workflows, automation & traceability.",
    visitorProblem: "We have too many manual processes.",
    challenges: [
      "repetitive reporting",
      "manual reconciliation",
      "spreadsheet consolidation",
      "repeated email workflows",
      "duplicate data entry",
      "manual exception tracking",
      "weak process traceability",
    ],
    approach: [
      { label: "Understand", description: "Identify repetitive and error-prone work" },
      { label: "Map", description: "Document the current flow end-to-end" },
      { label: "Simplify", description: "Remove unnecessary steps" },
      { label: "Standardize", description: "Create consistent, structured workflows" },
      { label: "Automate", description: "Replace manual steps with automation" },
      { label: "Validate", description: "Verify accuracy of automated outputs" },
      { label: "Monitor", description: "Track exceptions and performance" },
    ],
    capabilities: [
      "reporting automation",
      "reconciliation workflows",
      "Excel automation",
      "workflow automation",
      "exception tracking",
      "notifications",
      "structured document workflows",
      "lightweight data-processing automation",
    ],
    tools: ["Power Automate", "Power Query", "Excel", "VBA", "Google Apps Script", "Python", "SQL", "SharePoint"],
    foundationId: "industrial-engineering",
  },
  {
    id: "operational-excellence",
    title: "Operational Excellence",
    descriptor: "Process improvement, standardization & continuous improvement.",
    visitorProblem: "Our process needs to be standardized or improved.",
    challenges: [
      "inconsistent workflows",
      "operational bottlenecks",
      "unclear process ownership",
      "weak process documentation",
      "recurring operational exceptions",
      "disconnected systems and operations",
    ],
    approach: [
      { label: "Observe", description: "Watch the work as it actually happens" },
      { label: "Map", description: "Document current processes and handoffs" },
      { label: "Measure", description: "Collect performance data and cycle times" },
      { label: "Analyze", description: "Identify bottlenecks and waste" },
      { label: "Root Cause", description: "Determine underlying causes" },
      { label: "Future State", description: "Design improved processes" },
      { label: "Implement", description: "Deploy improvements" },
      { label: "Monitor", description: "Track performance and sustain gains" },
    ],
    capabilities: [
      "process mapping",
      "current/future-state analysis",
      "root-cause analysis",
      "continuous improvement",
      "KPI frameworks",
      "SOP development",
      "workflow standardization",
      "operations analysis",
      "inventory/supply-chain process analysis",
    ],
    tools: ["Process Mapping", "5 Whys", "Ishikawa / Cause-and-Effect", "PDCA", "KPI Analysis"],
    foundationId: "industrial-engineering",
  },
];

export const solutionFoundation = {
  id: "industrial-engineering",
  name: "Industrial Engineering",
  description:
    "The methodological foundation for all solution areas.",
} as const;

export const solutionAreaConfig: Record<
  SolutionAreaId,
  { title: string; descriptor: string }
> = {
  "operational-intelligence": {
    title: "Operational Intelligence",
    descriptor: "Data, KPIs, analytics & decision support.",
  },
  "business-systems-erp": {
    title: "Business Systems & ERP",
    descriptor: "Processes, requirements, workflows & system design.",
  },
  "workflow-automation": {
    title: "Workflow Automation",
    descriptor: "Manual work, structured workflows, automation & traceability.",
  },
  "operational-excellence": {
    title: "Operational Excellence",
    descriptor: "Process improvement, standardization & continuous improvement.",
  },
};

export const projectSolutionLinks: ProjectSolutionLink[] = [
  { projectSlug: "vanbags-erp", solutionId: "business-systems-erp", relationship: "primary" },
  { projectSlug: "vanbags-erp", solutionId: "operational-excellence", relationship: "secondary" },
  { projectSlug: "vanbags-maintenance", solutionId: "business-systems-erp", relationship: "primary" },
  { projectSlug: "vanbags-maintenance", solutionId: "operational-excellence", relationship: "secondary" },
  { projectSlug: "fleet-intelligence", solutionId: "operational-intelligence", relationship: "primary" },
  { projectSlug: "fleet-intelligence", solutionId: "operational-excellence", relationship: "secondary" },
];

export function getSolution(id: SolutionAreaId): SolutionData | undefined {
  return solutions.find((s) => s.id === id);
}

export function getSolutionForProblem(problemId: string): { solution: SolutionData; problem: VisitorProblem } | undefined {
  const problem = visitorProblems.find((p) => p.id === problemId);
  if (!problem) return undefined;
  const solution = getSolution(problem.solutionAreaId);
  if (!solution) return undefined;
  return { solution, problem };
}

export function getProjectsForSolution(
  solutionId: SolutionAreaId,
  allProjects: Project[],
): Project[] {
  return projectSolutionLinks
    .filter((link) => link.solutionId === solutionId)
    .map((link) => allProjects.find((p) => p.slug === link.projectSlug))
    .filter(Boolean) as Project[];
}

export function getSolutionsForProject(projectSlug: string): ProjectSolutionLink[] {
  return projectSolutionLinks.filter((link) => link.projectSlug === projectSlug);
}

export function getSolutionLinks(projectSlug: string): ProjectSolutionLink[] {
  return projectSolutionLinks.filter((link) => link.projectSlug === projectSlug);
}

export function getRelatedProjects(slugs: string[], allProjects: Project[]): Project[] {
  return slugs
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter(Boolean) as Project[];
}

export function getSolutionAnchor(id: SolutionAreaId): string {
  return "solution-" + id;
}

export function solutionAreaHasProjects(solutionId: SolutionAreaId): boolean {
  return projectSolutionLinks.some((link) => link.solutionId === solutionId);
}

export const allSolutionAreaIds: SolutionAreaId[] = [
  "operational-intelligence",
  "business-systems-erp",
  "workflow-automation",
  "operational-excellence",
];
