import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/site/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { NewsletterCard } from "@/components/home/NewsletterCard";
import { TrendingSidebar } from "@/components/home/TrendingSidebar";
import { getAllPosts, getFeaturedPosts, getTrendingPosts } from "@/lib/posts";

export default function Home() {
  const featured = getFeaturedPosts().slice(0, 3);
  const latest = getAllPosts().slice(0, 6);
  const trending = getTrendingPosts(4);

  return (
    <div className="py-10 md:py-14">
      <Container>
        <Hero />

        <section className="mt-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Featured
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hand-picked articles with the best signal-to-noise ratio.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featured.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Latest
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fresh ideas on design, engineering, and product craft.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-5 sm:grid-cols-2">
              {latest.slice(0, 4).map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>

            <div className="grid gap-6">
              <TrendingSidebar posts={trending} />
              <NewsletterCard />
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.slice(4).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
