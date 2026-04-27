import Link from "next/link";
import { categories, type Category, type Post } from "@/lib/posts";
import { Badge } from "@/components/ui/Badge";
import { NewsletterCard } from "@/components/home/NewsletterCard";

export function HomeSidebar({
  selectedCategory,
  onCategoryClick,
  popular,
  recent,
}: {
  selectedCategory: Category;
  onCategoryClick: (c: Category) => void;
  popular: Post[];
  recent: Post[];
}) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-20">
      <section className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
        <h2 className="text-sm font-semibold tracking-tight">Categories</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCategoryClick(c)}
              className="text-left"
            >
              <Badge
                variant="soft"
                className={
                  c === selectedCategory
                    ? "bg-muted/70 border-border/80"
                    : "bg-muted/30 hover:bg-muted/60"
                }
              >
                {c}
              </Badge>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight">Popular</h2>
          <span className="text-xs text-muted-foreground">Top reads</span>
        </div>
        <ul className="mt-3 divide-y divide-border/70">
          {popular.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block rounded-xl px-2 py-3 transition hover:bg-muted/25"
              >
                <div className="text-sm font-medium leading-snug">
                  {p.title}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {p.author.name} · {formatDate(p.date)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight">Recent</h2>
          <span className="text-xs text-muted-foreground">New</span>
        </div>
        <ul className="mt-3 divide-y divide-border/70">
          {recent.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block rounded-xl px-2 py-3 transition hover:bg-muted/25"
              >
                <div className="text-sm font-medium leading-snug">
                  {p.title}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {formatDate(p.date)} · {p.readingMinutes} min
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NewsletterCard />
    </aside>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

