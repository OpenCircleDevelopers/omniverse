import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/site/Container";
import { BlogFeed } from "@/components/blog/BlogFeed";
import { BlogFeedFallback } from "@/components/blog/BlogFeedFallback";
import { categories, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse all OmniVerse articles, categories, and tags.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="rounded-[2.5rem] border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur md:p-10">
          <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
            Articles
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Search, filter by category, and explore tags. This is a frontend-only
            demo — wire it to your CMS when you’re ready.
          </p>
        </div>

        <Suspense fallback={<BlogFeedFallback />}>
          <BlogFeed posts={posts} categories={categories} />
        </Suspense>
      </Container>
    </div>
  );
}

