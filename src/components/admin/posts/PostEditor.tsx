"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Save, Sparkles, Trash2 } from "lucide-react";
import { useAdminDb } from "@/lib/data/useAdminDb";
import { slugify, type AdminPost, type PostStatus } from "@/lib/data/admin-store";
import { useToast } from "@/components/admin/feedback/Toast";
import { ConfirmDialog } from "@/components/admin/feedback/ConfirmDialog";

export function PostEditor({
  mode,
  postId,
}: {
  mode: "create" | "edit";
  postId?: string;
}) {
  const router = useRouter();
  const { db, mutate } = useAdminDb();
  const { toast } = useToast();
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const existing = React.useMemo(
    () => (mode === "edit" ? db.posts.find((p) => p.id === postId) ?? null : null),
    [db.posts, mode, postId],
  );

  const [title, setTitle] = React.useState(existing?.title ?? "");
  const [slug, setSlug] = React.useState(existing?.slug ?? "");
  const [excerpt, setExcerpt] = React.useState(existing?.excerpt ?? "");
  const [content, setContent] = React.useState(existing?.content ?? "");
  const [category, setCategory] = React.useState(existing?.category ?? db.categories[0]?.name ?? "Design");
  const [tags, setTags] = React.useState((existing?.tags ?? ["UX", "Writing"]).join(", "));
  const [status, setStatus] = React.useState<PostStatus>(existing?.status ?? "draft");
  const [image, setImage] = React.useState(existing?.image ?? db.media[0]?.url ?? "/thumbnails/thumb-01.svg");

  if (mode === "edit" && !existing) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card/70 p-6 text-sm text-muted-foreground">
        Post not found.
      </div>
    );
  }

  const normalizedTags = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12);

  const save = () => {
    const now = new Date().toISOString();
    const base: Omit<AdminPost, "id"> = {
      title: title.trim(),
      slug: slugify(slug || title),
      excerpt: excerpt.trim(),
      content,
      image,
      tags: normalizedTags,
      category,
      status,
      author: "Admin",
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      views: existing?.views ?? 0,
    };

    if (!base.title) {
      toast({ title: "Title is required", variant: "error" });
      return;
    }

    mutate((db) => {
      if (mode === "create") {
        return { ...db, posts: [{ id: crypto.randomUUID(), ...base }, ...db.posts] };
      }
      return {
        ...db,
        posts: db.posts.map((p) => (p.id === existing!.id ? { ...p, ...base } : p)),
      };
    });

    toast({ title: "Saved", description: "Post changes were stored locally.", variant: "success" });
    router.push("/admin/posts");
  };

  const remove = () => {
    if (!existing) return;
    mutate((db) => ({ ...db, posts: db.posts.filter((p) => p.id !== existing.id) }));
    toast({ title: "Post deleted", variant: "success" });
    router.push("/admin/posts");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
        <div className="grid gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Title</label>
            <input
              value={title}
              onChange={(e) => {
                const nextTitle = e.target.value;
                const prevAuto = slugify(title);
                const shouldAuto =
                  mode === "create" && (!slug || slug === prevAuto);
                setTitle(nextTitle);
                if (shouldAuto) setSlug(slugify(nextTitle));
              }}
              className="mt-2 h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              placeholder="Write a clear, specific title…"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                placeholder="auto-generated"
              />
              <div className="mt-1 text-xs text-muted-foreground">/blog/{slugify(slug || title)}</div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="mt-2 h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="mt-2 min-h-24 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              placeholder="A short summary for list views…"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-medium text-muted-foreground">Content</label>
              <button
                type="button"
                onClick={() =>
                  setContent((c) =>
                    c ||
                    "## Heading\n\nWrite your post content here.\n\n- Bullet\n- Bullet\n\n> Quote\n",
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background px-3 py-2 text-xs font-medium transition hover:bg-muted/20"
              >
                <Sparkles className="h-4 w-4" />
                Insert template
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-2 min-h-[320px] w-full rounded-xl border border-border/70 bg-background px-3 py-2 font-mono text-[13px] leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              placeholder="Markdown-like text (demo)…"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
          <div className="text-sm font-semibold tracking-tight">Metadata</div>
          <div className="mt-4 grid gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm"
              >
                {db.categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Tags (comma separated)</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                placeholder="UX, Writing, SEO"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {normalizedTags.map((t) => (
                  <span key={t} className="rounded-full bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight">Cover image</div>
            <LinkToMedia />
          </div>
          <div className="mt-4 rounded-2xl border border-border/60 bg-background p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-muted/40">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{image}</div>
                <div className="text-xs text-muted-foreground">Select from Media Library.</div>
              </div>
            </div>
            <select
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-3 h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm"
            >
              {db.media.map((m) => (
                <option key={m.id} value={m.url}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={save}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            {mode === "edit" ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-4 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <Trash2 className="h-4 w-4" />
                Delete post
              </button>
            ) : null}
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Changes are saved to localStorage (mock backend).
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this post?"
        description="This cannot be undone in the mock store."
        confirmText="Delete"
        destructive
        onConfirm={remove}
        onClose={() => setConfirmDelete(false)}
      />
    </div>
  );
}

function LinkToMedia() {
  return (
    <a
      href="/admin/media"
      className="text-xs font-medium text-primary hover:underline underline-offset-4"
    >
      Open media
    </a>
  );
}

