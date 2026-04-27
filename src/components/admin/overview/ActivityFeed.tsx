"use client";

import { cn } from "@/lib/utils";

export type ActivityItem = {
  id: string;
  title: string;
  time: string;
  tone?: "info" | "success" | "warning";
};

export function AdminActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li
          key={it.id}
          className="rounded-xl border border-border/60 bg-background/60 p-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-medium leading-snug">{it.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{it.time}</div>
            </div>
            <span
              className={cn(
                "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full",
                it.tone === "success" && "bg-accent",
                it.tone === "warning" && "bg-yellow-400",
                (!it.tone || it.tone === "info") && "bg-primary",
              )}
              aria-hidden
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

