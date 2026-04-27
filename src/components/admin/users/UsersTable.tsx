"use client";

import * as React from "react";
import { Search, ShieldBan, ShieldCheck } from "lucide-react";
import { useAdminDb } from "@/lib/data/useAdminDb";
import type { AdminUser } from "@/lib/data/admin-store";
import { Pagination } from "@/components/blog/Pagination";
import { useToast } from "@/components/admin/feedback/Toast";

const PAGE_SIZE = 10;

export function UsersTable() {
  const { db, mutate } = useAdminDb();
  const { toast } = useToast();

  const [q, setQ] = React.useState("");
  const [role, setRole] = React.useState<AdminUser["role"] | "all">("all");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<AdminUser | null>(null);

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    return db.users
      .filter((u) => {
        if (role !== "all" && u.role !== role) return false;
        if (!query) return true;
        const hay = [u.name, u.email, u.role].join(" ").toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
  }, [db.users, q, role]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const toggleBlock = (id: string) => {
    mutate((db) => ({
      ...db,
      users: db.users.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u)),
    }));
    toast({ title: "User updated", description: "Block status changed (mock).", variant: "success" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
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
              placeholder="Search users…"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={role}
              onChange={(e) => {
                setRole(parseRole(e.target.value));
                setPage(1);
              }}
              className="h-10 rounded-xl border border-border/70 bg-background px-3 text-sm"
            >
              <option value="all">All roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
            <div className="text-xs text-muted-foreground">{filtered.length} users</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Activity</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-border/50 hover:bg-muted/15"
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelected(u)}
                      className="text-left"
                    >
                      <div className="font-medium text-foreground">{u.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{u.email}</div>
                    </button>
                    {u.blocked ? (
                      <div className="mt-2 inline-flex rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-300">
                        Blocked
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(u.joinedAt)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u.posts} posts · {u.comments} comments
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => toggleBlock(u.id)}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-3 text-xs font-medium transition hover:bg-muted/20"
                      >
                        {u.blocked ? (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            Unblock
                          </>
                        ) : (
                          <>
                            <ShieldBan className="h-4 w-4" />
                            Block
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length ? (
                <tr>
                  <td className="px-4 py-10 text-center text-sm text-muted-foreground" colSpan={5}>
                    No users found.
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
      </div>

      <UserDetails user={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function UserDetails({
  user,
  onClose,
}: {
  user: AdminUser | null;
  onClose: () => void;
}) {
  if (!user) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card/70 p-5 text-sm text-muted-foreground shadow-sm">
        Select a user to view details.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold tracking-tight">{user.name}</div>
          <div className="mt-1 text-sm text-muted-foreground">{user.email}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background transition hover:bg-muted/20"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="mt-5 grid gap-3 text-sm">
        <Row label="Role" value={user.role} />
        <Row label="Status" value={user.blocked ? "Blocked" : "Active"} />
        <Row label="Joined" value={formatDate(user.joinedAt)} />
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-background/60 p-4">
        <div className="text-xs font-medium text-muted-foreground">Mock stats</div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <Stat title="Posts" value={String(user.posts)} />
          <Stat title="Comments" value={String(user.comments)} />
          <Stat title="Reports" value={String(Math.floor((user.posts + user.comments) / 7))} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-muted-foreground">{label}</div>
      <div className="font-medium text-foreground">{value}</div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-3">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function parseRole(v: string): AdminUser["role"] | "all" {
  if (v === "admin" || v === "editor" || v === "user") return v;
  return "all";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

