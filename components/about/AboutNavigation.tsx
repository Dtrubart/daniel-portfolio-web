"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

const anchors = [
  { id: "profile", label: "Profile" },
  { id: "journey", label: "Career Journey" },
  { id: "capabilities", label: "Capabilities" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected Work" },
  { id: "impact", label: "Selected Impact" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
];

interface AboutNavigationProps {
  className?: string;
}

export function AboutNavigation({ className }: AboutNavigationProps) {
  const [activeId, setActiveId] = useState<string>("profile");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    const elements = document.querySelectorAll(
      "section[id]:not(#profile)",
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <nav
      aria-label="Page navigation"
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium",
        className,
      )}
    >
      {anchors.map((item) => {
        const isActive = activeId === item.id;
        return (
          <Link
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "border border-accent text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}