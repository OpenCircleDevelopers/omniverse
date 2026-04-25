import type { Author } from "@/lib/posts";

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/70 to-cyan-400/60 text-sm font-semibold text-white shadow-sm">
          {author.avatarInitials}
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">{author.name}</div>
          <div className="text-sm text-muted-foreground">{author.role}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        OmniVerse ships as a frontend-only starter. Replace this author section
        with your real team profiles once you connect your CMS.
      </p>
    </div>
  );
}

