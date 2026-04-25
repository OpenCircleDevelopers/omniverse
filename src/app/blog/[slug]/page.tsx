import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/Badge";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="py-10 md:py-14">
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-muted/50"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to articles
        </Link>

        <header className="mt-6 overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/50 shadow-sm backdrop-blur">
          <div className={`h-56 w-full bg-gradient-to-br ${post.cover.gradient}`} />
          <div className="p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="soft">{post.category}</Badge>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)} · {post.readingMinutes} min read
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Badge key={t} className="bg-primary/8 border-primary/15">
                  #{t}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <article className="rounded-[2.5rem] border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur md:p-10">
            <div className="space-y-5 text-[15px] leading-7 text-foreground/90">
              {post.content.map((block, idx) => {
                if (block.type === "h2")
                  return (
                    <h2
                      key={idx}
                      className="pt-2 text-xl font-semibold tracking-tight text-foreground"
                    >
                      {block.text}
                    </h2>
                  );
                if (block.type === "quote")
                  return (
                    <div
                      key={idx}
                      className="rounded-3xl border border-border/60 bg-background/40 p-5 shadow-sm"
                    >
                      <p className="text-base font-medium leading-7">
                        “{block.text}”
                      </p>
                    </div>
                  );
                if (block.type === "ul")
                  return (
                    <ul key={idx} className="list-disc space-y-2 pl-5">
                      {block.items.map((it) => (
                        <li key={it} className="text-muted-foreground">
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                return (
                  <p key={idx} className="text-muted-foreground">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </article>

          <div className="grid gap-6">
            <AuthorCard author={post.author} />

            <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold tracking-tight">
                Quick actions
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                <a
                  className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3 transition hover:bg-muted/40"
                  href="mailto:hello@omniverse.local?subject=OmniVerse%20feedback"
                >
                  Send feedback
                </a>
                <Link
                  className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3 transition hover:bg-muted/40"
                  href="/contact"
                >
                  Contact page
                </Link>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Email links are placeholders — update them with your real address.
              </p>
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Related in {post.category}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

