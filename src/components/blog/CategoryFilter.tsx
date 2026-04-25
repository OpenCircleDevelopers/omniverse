"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/posts";

export function CategoryFilter({
  categories,
  value,
  onChange,
  className,
}: {
  categories: readonly Category[];
  value: Category;
  onChange: (c: Category) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto rounded-3xl border border-border/60 bg-card/50 p-2 shadow-sm backdrop-blur",
        className,
      )}
    >
      {categories.map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
              active
                ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-18px_hsl(var(--primary)/0.7)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
            )}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

