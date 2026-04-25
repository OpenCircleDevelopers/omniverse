import Link from "next/link";
import { Flame } from "lucide-react";
import type { Post } from "@/lib/posts";
import { Badge } from "@/components/ui/Badge";

export function TrendingSidebar({ posts }: { posts: Post[] }) {
  return (
    <aside className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Flame className="h-4 w-4 text-primary" />
          Trending
        </div>
        <Badge variant="soft">Today</Badge>
      </div>

      <div className="mt-4 space-y-4">
        {posts.map((p, idx) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block rounded-2xl border border-border/50 bg-background/40 p-4 transition hover:-translate-y-0.5 hover:bg-muted/40"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-primary/10 text-xs font-semibold text-foreground">
                {idx + 1}
              </span>
              <div>
                <div className="text-sm font-semibold leading-snug tracking-tight group-hover:underline underline-offset-4">
                  {p.title}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="soft">{p.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {p.readingMinutes} min read
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

