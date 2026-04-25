import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "soft";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variant === "soft"
          ? "bg-muted text-foreground border border-border/70"
          : "bg-primary/10 text-foreground border border-primary/20",
        className,
      )}
    >
      {children}
    </span>
  );
}

