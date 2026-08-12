export const siteName = "Daniel Trujillo";

export const siteDescription =
  "Industrial Engineer building data-driven systems that connect operations, enterprise technology, automation, and decision-making.";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
