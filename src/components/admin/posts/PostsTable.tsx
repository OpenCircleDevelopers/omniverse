"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Trash2, PencilLine } from "lucide-react";
import { useAdminDb } from "@/lib/data/useAdminDb";
import type { AdminPost, PostStatus } from "@/lib/data/admin-store";
import { ConfirmDialog } from "@/components/admin/feedback/ConfirmDialog";
import { useToast } from "@/components/admin/feedback/Toast";
import { Pagination } from "@/components/blog/Pagination";

const PAGE_SIZE = 10;

export function PostsTable() {
  const { db, mutate } = useAdminDb();
  const { toast } = useToast();

  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");
  const [status, setStatus] = React.useState<PostStatus | "all">("all");
  const [page, setPage] = React.useState(1);
  const [confirm, setConfirm] = React.useState<null | AdminPost>(null);

  const categories = React.useMemo(
    () => ["All", ...db.categories.map((c) => c.name)],
    [db.categories],
  );

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    return db.posts
      .filter((p) => {
        if (category !== "All" && p.category !== category) return false;
        if (status !== "all" && p.status !== status) return false;
        if (!query) return true;
        const hay = [p.title, p.slug, p.excerpt, p.tags.join(" "), p.author]
          .join(" ")
          .toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [db.posts, q, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const deletePost = (id: string) => {
    mutate((db) => ({ ...db, posts: db.posts.filter((p) => p.id !== id) }));
    toast({ title: "Post deleted", variant: "success" });
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border/60 p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            className="h-10 w-full rounded-xl border border-border/70 bg-background px-10 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
            placeholder="Search posts…"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-xl border border-border/70 bg-background px-3 text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => {
              setStatus(parseStatus(e.target.value));
              setPage(1);
            }}
            className="h-10 rounded-xl border border-border/70 bg-background px-3 text-sm"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <div className="text-xs text-muted-foreground">
            {filtered.length} posts
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b border-border/60">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">Views</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-muted/15">
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{p.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    /blog/{p.slug}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.status === "published"
                        ? "inline-flex rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-foreground"
                        : "inline-flex rounded-full bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(p.updatedAt)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.views.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/posts/${p.id}/edit`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-3 text-xs font-medium transition hover:bg-muted/20"
                    >
                      <PencilLine className="h-4 w-4" />
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => setConfirm(p)}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-3 text-xs font-medium transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-muted-foreground" colSpan={6}>
                  No posts found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="text-xs text-muted-foreground">
          Page {current} of {totalPages}
        </div>
        <Pagination page={current} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Delete post?"
        description={
          confirm
            ? `This will permanently remove “${confirm.title}”.`
            : undefined
        }
        confirmText="Delete"
        destructive
        onConfirm={() => confirm && deletePost(confirm.id)}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function parseStatus(v: string): PostStatus | "all" {
  if (v === "draft" || v === "published") return v;
  return "all";
}

