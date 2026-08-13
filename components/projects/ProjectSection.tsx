import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ProjectSectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children: ReactNode;
}

export function ProjectSection({
  title,
  children,
  className,
  ...props
}: ProjectSectionProps) {
  return (
    <section className={cn("scroll-mt-24", className)} {...props}>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}
