export type ContactReason =
  | "job-opportunity"
  | "collaboration"
  | "project-inquiry"
  | "networking"
  | "other";

export interface ContactReasonOption {
  value: ContactReason;
  label: string;
  defaultSubject: string;
  defaultMessage: string;
}

export const contactReasons: ContactReasonOption[] = [
  {
    value: "job-opportunity",
    label: "Job opportunity",
    defaultSubject: "Job opportunity — Daniel Trujillo Portfolio",
    defaultMessage:
      "Hi Daniel,\n\nI came across your portfolio and wanted to reach out regarding a potential opportunity.\n\n[Add details here]\n\nBest regards,",
  },
  {
    value: "collaboration",
    label: "Collaboration",
    defaultSubject: "Collaboration inquiry — Daniel Trujillo Portfolio",
    defaultMessage:
      "Hi Daniel,\n\nI came across your portfolio and would like to explore a potential collaboration.\n\n[Add details here]\n\nLooking forward to hearing from you,\n",
  },
  {
    value: "project-inquiry",
    label: "Project inquiry",
    defaultSubject: "Project inquiry — Daniel Trujillo Portfolio",
    defaultMessage:
      "Hi Daniel,\n\nI have a question about a project you've worked on or would like to discuss a new project.\n\n[Add details here]\n\nThanks,\n",
  },
  {
    value: "networking",
    label: "Networking",
    defaultSubject: "Networking — Daniel Trujillo Portfolio",
    defaultMessage:
      "Hi Daniel,\n\nI'd love to connect and exchange perspectives on operations, data, or enterprise systems.\n\n[Add details here]\n\nBest,\n",
  },
  {
    value: "other",
    label: "Other",
    defaultSubject: "Message — Daniel Trujillo Portfolio",
    defaultMessage:
      "Hi Daniel,\n\n[Add your message here]\n\nBest regards,",
  },
];

export const publicContactConfig = {
  location: {
    label: "Location",
    value: "Burnaby, BC / Metro Vancouver, Canada",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-trujillo-barthe/",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/Dtrubart",
  },
  professionalInterests: [
    "Data & Analytics",
    "ERP & Business Systems",
    "Operations Analytics",
    "Automation",
    "Process Improvement",
    "Enterprise Technology",
  ],
} as const;

export const fieldLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { min: 0, max: 120 },
  subject: { min: 3, max: 160 },
  message: { min: 10, max: 5000 },
} as const;

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  reason: ContactReason;
  subject: string;
  message: string;
  website: string;
}
