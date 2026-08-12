import type { ElementType } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "center" | "left";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "center",
  level = 2,
  className,
}: SectionHeadingProps) {
  const Tag: ElementType = `h${level}`;

  return (
    <header
      className={cn(
        "mx-auto max-w-3xl",
        align === "left" && "text-left",
        className,
      )}
    >
      <Tag className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
