"use client";

import { cn } from "@/lib/utils";

export function AdminStatCard({
  title,
  value,
  delta,
  icon,
}: {
  title: string;
  value: string;
  delta?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {value}
          </div>
        </div>
        <div
          className={cn(
            "grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-background/60 text-foreground",
          )}
        >
          {icon}
        </div>
      </div>
      {delta ? (
        <div className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-accent">{delta}</span> vs last period
        </div>
      ) : null}
    </div>
  );
}

