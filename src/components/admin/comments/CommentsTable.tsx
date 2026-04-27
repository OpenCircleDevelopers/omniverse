"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Search, Trash2, X } from "lucide-react";
import { useAdminDb } from "@/lib/data/useAdminDb";
import type { AdminComment } from "@/lib/data/admin-store";
import { Pagination } from "@/components/blog/Pagination";
import { ConfirmDialog } from "@/components/admin/feedback/ConfirmDialog";
import { useToast } from "@/components/admin/feedback/Toast";
import { TableSkeleton } from "@/components/admin/shared/TableSkeleton";

const PAGE_SIZE = 10;

export function CommentsTable() {
  const { db, mutate } = useAdminDb();
  const { toast } = useToast();

  const [loading, setLoading] = React.useState(true);
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<AdminComment["status"] | "all">("all");
  const [page, setPage] = React.useState(1);
  const [confirm, setConfirm] = React.useState<AdminComment | null>(null);

  React.useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 380);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    return db.comments
      .filter((c) => {
        if (status !== "all" && c.status !== status) return false;
        if (!query) return true;
        const hay = [c.authorName, c.authorEmail, c.content, c.postTitle]
          .join(" ")
          .toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [db.comments, q, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const setCommentStatus = (id: string, next: AdminComment["status"]) => {
    mutate((db) => ({
      ...db,
      comments: db.comments.map((c) => (c.id === id ? { ...c, status: next } : c)),
    }));
    toast({ title: `Comment ${next}`, variant: "success" });
  };

  const deleteComment = (id: string) => {
    mutate((db) => ({ ...db, comments: db.comments.filter((c) => c.id !== id) }));
    toast({ title: "Comment deleted", variant: "success" });
  };

  if (loading) return <TableSkeleton cols={6} rows={8} />;

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
            placeholder="Search comments..."
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => {
              setStatus(parseStatus(e.target.value));
              setPage(1);
            }}
            className="h-10 rounded-xl border border-border/70 bg-background px-3 text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="text-xs text-muted-foreground">{filtered.length} comments</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b border-border/60">
              <th className="px-4 py-3 font-medium">Comment</th>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Post</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/15">
                <td className="px-4 py-3">
                  <div className="line-clamp-2 max-w-lg text-sm">{c.content}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{c.authorName}</div>
                  <div className="text-xs text-muted-foreground">{c.authorEmail}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <Link className="hover:underline" href={`/admin/posts`}>
                    {c.postTitle}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className={statusPill(c.status)}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(c.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCommentStatus(c.id, "approved")}
                      className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-border/70 bg-background px-2.5 text-xs font-medium transition hover:bg-accent/20"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setCommentStatus(c.id, "rejected")}
                      className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-border/70 bg-background px-2.5 text-xs font-medium transition hover:bg-muted/30"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirm(c)}
                      className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-border/70 bg-background px-2.5 text-xs font-medium transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No comments found.
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
        title="Delete comment?"
        description="This comment will be removed permanently."
        confirmText="Delete"
        destructive
        onConfirm={() => confirm && deleteComment(confirm.id)}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
}

function parseStatus(v: string): AdminComment["status"] | "all" {
  if (v === "pending" || v === "approved" || v === "rejected") return v;
  return "all";
}

function statusPill(status: AdminComment["status"]) {
  if (status === "approved")
    return "inline-flex rounded-full bg-accent/20 px-2.5 py-1 text-xs font-medium text-foreground";
  if (status === "rejected")
    return "inline-flex rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-300";
  return "inline-flex rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

