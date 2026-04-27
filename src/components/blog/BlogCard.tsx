"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { Post } from "@/lib/posts";
import { Badge } from "@/components/ui/Badge";

export function BlogCard({
  post,
}: {
  post: Post;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-4 rounded-xl px-2 py-4 transition hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[140px_1fr] sm:items-start"
        aria-label={post.title}
      >
        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30">
          <Image
            src={post.thumbnail}
            alt=""
            width={1200}
            height={800}
            className="h-24 w-full object-cover sm:h-24"
            sizes="(max-width: 640px) 100vw, 140px"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-muted/60 text-[10px] font-semibold text-foreground">
                {post.author.avatarInitials}
              </span>
              <span className="font-medium text-foreground/90">
                {post.author.name}
              </span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{post.readingMinutes} min read</span>
            <Badge variant="soft" className="ml-0 sm:ml-1">
              {post.category}
            </Badge>
          </div>

          <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight group-hover:underline underline-offset-4">
            {post.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
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

