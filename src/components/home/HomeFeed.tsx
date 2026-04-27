"use client";

import * as React from "react";
import type { Category, Post } from "@/lib/posts";
import { BlogCard } from "@/components/blog/BlogCard";
import { SearchBar } from "@/components/blog/SearchBar";
import { Pagination } from "@/components/blog/Pagination";
import { HomeSidebar } from "@/components/home/HomeSidebar";

const PAGE_SIZE = 15; // show 10–20 on homepage immediately

export function HomeFeed({
  posts,
  popular,
  recent,
}: {
  posts: Post[];
  popular: Post[];
  recent: Post[];
}) {
  const [category, setCategory] = React.useState<Category>("All");
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [isPending, startTransition] = React.useTransition();

  const onCategory = (c: Category) => {
    startTransition(() => {
      setCategory(c);
      setPage(1);
    });
  };

  const onQuery = (q: string) => {
    startTransition(() => {
      setQuery(q);
      setPage(1);
    });
  };

  const onPage = (p: number) => startTransition(() => setPage(p));

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.title, p.excerpt, p.author.name, p.tags.join(" ")]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <div>
        <div className="flex flex-col gap-3">
          <SearchBar
            value={query}
            onChange={onQuery}
            placeholder="Search posts, tags, authors…"
          />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {(["All", "Design", "Engineering", "Product", "AI", "Culture"] as const).map(
              (c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCategory(c)}
                  className={
                    c === category
                      ? "rounded-full border border-border/70 bg-muted/70 px-3 py-1.5 text-sm font-medium text-foreground"
                      : "rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted/25 hover:text-foreground"
                  }
                >
                  {c}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mt-5 divide-y divide-border/70 rounded-2xl border border-border/60 bg-background px-2">
          {pageItems.map((p) => (
            <div key={p.slug} className="py-0">
              <BlogCard post={p} />
            </div>
          ))}
        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={onPage}
          className="mt-8"
        />

        {isPending ? (
          <p className="mt-3 text-xs text-muted-foreground">Updating…</p>
        ) : null}
      </div>

      <HomeSidebar
        selectedCategory={category}
        onCategoryClick={onCategory}
        popular={popular}
        recent={recent}
      />
    </div>
  );
}

