export const siteName = "Daniel Trujillo";

export const siteDescription =
  "Industrial Engineer building data-driven systems that connect operations, enterprise technology, automation, and decision-making.";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface NavItem {
  label: string;
  href: string;
}

// Active primary navigation for the current portfolio configuration.
// /experience is preserved as a functional route but omitted from visible navigation.
// See optionalNav for routes that may be enabled for future configurations.
export const nav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

// Optional portfolio modules preserved in the codebase but not currently shown
// in primary navigation. These routes remain functional and can be re-enabled
// by adding them to the nav array above for future portfolio configurations.
export const optionalNav: NavItem[] = [
  { label: "Experience", href: "/experience" },
];
