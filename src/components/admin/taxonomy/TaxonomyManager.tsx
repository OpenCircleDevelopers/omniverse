"use client";

import * as React from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useAdminDb } from "@/lib/data/useAdminDb";
import { slugify } from "@/lib/data/admin-store";
import { useToast } from "@/components/admin/feedback/Toast";
import { ConfirmDialog } from "@/components/admin/feedback/ConfirmDialog";

type Mode = "categories" | "tags";

export function TaxonomyManager() {
  const { db, mutate } = useAdminDb();
  const { toast } = useToast();
  const [mode, setMode] = React.useState<Mode>("categories");
  const [name, setName] = React.useState("");
  const [editId, setEditId] = React.useState<string | null>(null);
  const [confirmId, setConfirmId] = React.useState<string | null>(null);

  const items = mode === "categories" ? db.categories : db.tags;

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    mutate((db) => {
      if (mode === "categories") {
        if (editId) {
          return {
            ...db,
            categories: db.categories.map((c) =>
              c.id === editId ? { ...c, name: trimmed, slug: slugify(trimmed) } : c,
            ),
          };
        }
        return {
          ...db,
          categories: [...db.categories, { id: crypto.randomUUID(), name: trimmed, slug: slugify(trimmed) }],
        };
      }

      if (editId) {
        return {
          ...db,
          tags: db.tags.map((t) => (t.id === editId ? { ...t, name: trimmed, slug: slugify(trimmed) } : t)),
        };
      }
      return {
        ...db,
        tags: [...db.tags, { id: crypto.randomUUID(), name: trimmed, slug: slugify(trimmed) }],
      };
    });

    setName("");
    setEditId(null);
    toast({ title: "Saved", variant: "success" });
  };

  const remove = (id: string) => {
    mutate((db) =>
      mode === "categories"
        ? { ...db, categories: db.categories.filter((c) => c.id !== id) }
        : { ...db, tags: db.tags.filter((t) => t.id !== id) },
    );
    toast({ title: "Deleted", variant: "success" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
      <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("categories");
              setEditId(null);
              setName("");
            }}
            className={pill(mode === "categories")}
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("tags");
              setEditId(null);
              setName("");
            }}
            className={pill(mode === "tags")}
          >
            Tags
          </button>
        </div>

        <div className="mt-4 divide-y divide-border/60 rounded-xl border border-border/60 bg-background/70">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 p-3">
              <div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.slug}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditId(item.id);
                    setName(item.name);
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-background transition hover:bg-muted/20"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmId(item.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-background transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {!items.length ? (
            <div className="p-6 text-sm text-muted-foreground">No items yet.</div>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
        <div className="text-sm font-semibold tracking-tight">
          {editId ? `Edit ${mode.slice(0, -1)}` : `Add new ${mode.slice(0, -1)}`}
        </div>
        <div className="mt-4">
          <label className="text-xs text-muted-foreground">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            placeholder={`Enter ${mode.slice(0, -1)} name`}
          />
          <div className="mt-2 text-xs text-muted-foreground">Slug: {slugify(name) || "-"}</div>
        </div>
        <button
          type="button"
          onClick={save}
          className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ConfirmDialog
        open={!!confirmId}
        title={`Delete ${mode.slice(0, -1)}?`}
        description="This is a mock action in local data."
        confirmText="Delete"
        destructive
        onConfirm={() => confirmId && remove(confirmId)}
        onClose={() => setConfirmId(null)}
      />
    </div>
  );
}

function pill(active: boolean) {
  return active
    ? "rounded-full border border-border/70 bg-muted/70 px-3 py-1.5 text-sm font-medium"
    : "rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/20";
}

