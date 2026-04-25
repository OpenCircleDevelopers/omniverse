"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";
import { Badge } from "@/components/ui/Badge";

export function BlogCard({
  post,
}: {
  post: Post;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block h-full overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-[0_12px_40px_-22px_rgba(0,0,0,0.35)] backdrop-blur transition hover:shadow-[0_18px_54px_-24px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={post.title}
      >
        <div className="relative">
          <div
            className={cn(
              "h-44 w-full bg-gradient-to-br",
              post.cover.gradient,
            )}
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
          {post.featured ? (
            <div className="absolute left-4 top-4">
              <Badge className="bg-background/50 backdrop-blur border-border/60">
                Featured
              </Badge>
            </div>
          ) : null}
        </div>

        <div className="flex h-[calc(100%-11rem)] flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="soft" className="bg-card/60">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>

          <h3 className="text-base font-semibold leading-snug tracking-tight">
            {post.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="h-3.5 w-3.5" />
              {post.readingMinutes} min
            </span>
            <div className="ml-auto flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((t) => (
                <Badge key={t} className="bg-primary/8 border-primary/15">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

