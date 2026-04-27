export function TableSkeleton({ rows = 8, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm">
      <div className="h-10 w-72 animate-pulse rounded-xl bg-muted/60" />
      <div className="mt-4 overflow-hidden rounded-xl border border-border/60">
        <div className="grid grid-cols-6 gap-3 border-b border-border/60 bg-background/70 p-3">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-3 animate-pulse rounded bg-muted/60" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="grid grid-cols-6 gap-3 border-b border-border/40 p-3">
            {Array.from({ length: cols }).map((_, c) => (
              <div key={c} className="h-3 animate-pulse rounded bg-muted/40" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

