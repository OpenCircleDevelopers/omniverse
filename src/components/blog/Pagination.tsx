"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(page, totalPages);

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-muted/60 disabled:opacity-50 disabled:hover:translate-y-0"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {items.map((it, idx) =>
        it === "…" ? (
          <span key={`e-${idx}`} className="px-2 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            onClick={() => onPageChange(it)}
            className={cn(
              "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition",
              it === page
                ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-18px_hsl(var(--primary)/0.7)]"
                : "border border-border/70 bg-card/60 text-foreground hover:-translate-y-0.5 hover:bg-muted/60",
            )}
            aria-current={it === page ? "page" : undefined}
          >
            {it}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-muted/60 disabled:opacity-50 disabled:hover:translate-y-0"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function getPaginationItems(page: number, totalPages: number): Array<number | "…"> {
  const clamp = (n: number) => Math.min(totalPages, Math.max(1, n));
  const p = clamp(page);

  const pages = new Set<number>([1, totalPages, p - 1, p, p + 1].map(clamp));
  const sorted = [...pages].sort((a, b) => a - b);

  const out: Array<number | "…"> = [];
  for (let i = 0; i < sorted.length; i++) {
    const cur = sorted[i]!;
    const prev = sorted[i - 1];
    if (prev && cur - prev > 1) out.push("…");
    out.push(cur);
  }
  return out;
}

