"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import { useAdminDb } from "@/lib/data/useAdminDb";
import { useToast } from "@/components/admin/feedback/Toast";
import { ConfirmDialog } from "@/components/admin/feedback/ConfirmDialog";

export function MediaLibrary() {
  const { db, mutate } = useAdminDb();
  const { toast } = useToast();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [confirmId, setConfirmId] = React.useState<string | null>(null);

  const addMockImage = () => {
    const count = db.media.length + 1;
    const name = `mock-upload-${String(count).padStart(2, "0")}.svg`;
    const url = `/thumbnails/thumb-${((count - 1) % 3) + 1}.svg`;
    mutate((db) => ({
      ...db,
      media: [{ id: crypto.randomUUID(), name, url, uploadedAt: new Date().toISOString() }, ...db.media],
    }));
    toast({ title: "Image added (mock)", description: `${name} uploaded`, variant: "success" });
  };

  const removeImage = (id: string) => {
    mutate((db) => ({ ...db, media: db.media.filter((m) => m.id !== id) }));
    toast({ title: "Image deleted", variant: "success" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold tracking-tight">Gallery</div>
            <div className="text-sm text-muted-foreground">{db.media.length} items</div>
          </div>
          <button
            type="button"
            onClick={addMockImage}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5"
          >
            <ImagePlus className="h-4 w-4" />
            Upload (mock)
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {db.media.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelected(m.id)}
              className={
                selected === m.id
                  ? "overflow-hidden rounded-xl border-2 border-primary bg-background text-left"
                  : "overflow-hidden rounded-xl border border-border/60 bg-background text-left hover:border-border"
              }
            >
              <div className="relative h-28 w-full bg-muted/40">
                <Image src={m.url} alt={m.name} fill className="object-cover" />
              </div>
              <div className="p-2">
                <div className="truncate text-xs font-medium">{m.name}</div>
                <div className="text-[11px] text-muted-foreground">{formatDate(m.uploadedAt)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
        <div className="text-sm font-semibold tracking-tight">Selected asset</div>
        {selected ? (
          <SelectedPanel
            item={db.media.find((m) => m.id === selected) ?? null}
            onDelete={() => selected && setConfirmId(selected)}
          />
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Pick an image from the gallery to preview details.
          </p>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmId}
        title="Delete image?"
        description="This removes it from local mock media."
        confirmText="Delete"
        destructive
        onConfirm={() => confirmId && removeImage(confirmId)}
        onClose={() => setConfirmId(null)}
      />
    </div>
  );
}

function SelectedPanel({
  item,
  onDelete,
}: {
  item: { id: string; name: string; url: string; uploadedAt: string } | null;
  onDelete: () => void;
}) {
  if (!item) return null;

  return (
    <div className="mt-4 space-y-3">
      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40">
        <Image src={item.url} alt={item.name} fill className="object-cover" />
      </div>
      <div className="text-sm">
        <div className="font-medium">{item.name}</div>
        <div className="mt-1 text-xs text-muted-foreground">{item.url}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Uploaded: {formatDate(item.uploadedAt)}
        </div>
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-4 text-sm font-medium transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
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

