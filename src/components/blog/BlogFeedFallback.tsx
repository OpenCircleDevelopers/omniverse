import { Skeleton } from "@/components/ui/Skeleton";

export function BlogFeedFallback() {
  return (
    <div className="mt-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <Skeleton className="h-11 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-3xl md:w-[420px]" />
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur"
          >
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

