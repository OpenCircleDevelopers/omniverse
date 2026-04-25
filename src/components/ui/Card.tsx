import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/60 bg-card/70 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

