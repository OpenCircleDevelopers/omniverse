"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Post } from "@/lib/posts";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { SearchBar } from "@/components/blog/SearchBar";
import { Pagination } from "@/components/blog/Pagination";
import { BlogCard } from "@/components/blog/BlogCard";
import { Skeleton } from "@/components/ui/Skeleton";

const PAGE_SIZE = 6;

export function BlogFeed({
  posts,
  categories,
}: {
  posts: Post[];
  categories: readonly Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get("category") as Category) || "All";
  const initialQ = searchParams.get("q") || "";

  const [category, setCategory] = React.useState<Category>(
    categories.includes(initialCategory) ? initialCategory : "All",
  );
  const [query, setQuery] = React.useState(initialQ);
  const [page, setPage] = React.useState(1);
  const [isPending, startTransition] = React.useTransition();

  const onCategoryChange = (c: Category) => {
    startTransition(() => {
      setCategory(c);
      setPage(1);
    });
  };

  const onQueryChange = (next: string) => {
    startTransition(() => {
      setQuery(next);
      setPage(1);
    });
  };

  const onPageChange = (p: number) => {
    startTransition(() => setPage(p));
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "All") params.set("category", category);
    else params.delete("category");
    if (query) params.set("q", query);
    else params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `/blog?${qs}` : "/blog", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, query]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.excerpt,
        p.author.name,
        p.category,
        p.tags.join(" "),
      ]
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
    <section className="mt-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <SearchBar value={query} onChange={onQueryChange} />
        <div className="md:min-w-[420px]">
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={onCategoryChange}
          />
        </div>
      </div>

      <div className="mt-6">
        {isPending ? (
          <GridSkeleton />
        ) : pageItems.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            onReset={() =>
              startTransition(() => {
                setQuery("");
                setCategory("All");
                setPage(1);
              })
            }
          />
        )}
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mt-8"
      />
    </section>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-16 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/60 p-10 text-center shadow-sm backdrop-blur">
      <div className="mx-auto max-w-md">
        <h3 className="text-lg font-semibold tracking-tight">
          No posts match your filters
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Try a different keyword, pick another category, or reset filters.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-18px_hsl(var(--primary)/0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-22px_hsl(var(--primary)/0.75)] active:translate-y-0"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}

