import type { AnchorHTMLAttributes } from "react";
import { forwardRef } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary" | "ghost";
type ButtonLinkSize = "sm" | "md" | "lg";

const linkBase =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const linkVariants: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
};

const linkSizes: Record<ButtonLinkSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 py-2",
  lg: "h-12 px-6 text-base",
};

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, href, variant = "primary", size = "md", ...props }, ref) => {
    const isExternal = href.startsWith("http");
    const classes = cn(
      linkBase,
      linkVariants[variant],
      linkSizes[size],
      className,
    );

    if (isExternal) {
      return <a ref={ref} href={href} className={classes} {...props} />;
    }

    return <Link ref={ref} href={href} className={classes} {...props} />;
  },
);

ButtonLink.displayName = "ButtonLink";
