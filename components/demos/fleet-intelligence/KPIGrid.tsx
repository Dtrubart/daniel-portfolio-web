"use client";

import { cn } from "@/lib/utils";

interface KPIItem {
  label: string;
  value: string | number;
  variant?: "primary" | "success" | "warning" | "error";
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function KPIGrid() {
  const kpis: KPIItem[] = [
    {
      label: "Total Vehicles",
      value: 12,
      variant: "primary",
    },
    {
      label: "Active Routes",
      value: 6,
      variant: "success",
    },
    {
      label: "Avg Fuel Efficiency",
      value: "3.2 km/L",
      variant: "primary",
      trend: "up",
      trendValue: "+0.3 km/L",
    },
    {
      label: "Driver Safety Score",
      value: "74/100",
      variant: "success",
      trend: "up",
      trendValue: "+5 pts",
    },
    {
      label: "Maintenance Compliance",
      value: "83%",
      variant: "warning",
      trend: "down",
      trendValue: "-4%",
    },
    {
      label: "Fuel Cost Savings",
      value: "$12,400",
      variant: "primary",
      trend: "up",
      trendValue: "+8%",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col items-center p-4 border border-border rounded-lg bg-popover",
            "hover:border-accent hover:bg-accent/5 transition-all duration-200",
          )}
        >
          <div className="w-full text-center mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              {kpi.label}
            </span>
          </div>
          <div className="w-full text-center">
            <span className="text-2xl font-semibold text-foreground">
              {kpi.value}
            </span>
            {kpi.trend && kpi.trendValue ? (
              <div className="flex items-center justify-center mt-1 space-x-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    kpi.trend === "up"
                      ? "text-emerald-600"
                      : kpi.trend === "down"
                      ? "text-rose-600"
                      : "text-muted-foreground",
                  )}
                >
                  {kpi.trendValue}
                </span>
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {kpi.trend === "up" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7l9 9 9-9"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 14l9-9 9 9"
                    />
                  )}
                </svg>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}