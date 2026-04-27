import { Container } from "@/components/site/Container";
import { HomeFeed } from "@/components/home/HomeFeed";
import { getAllPosts, getRecentPosts, getTrendingPosts } from "@/lib/posts";

export default function Home() {
  const all = getAllPosts(); // 18 posts
  const popular = getTrendingPosts(5);
  const recent = getRecentPosts(5);

  return (
    <div className="py-6 md:py-10">
      <Container>
        <header className="flex items-end justify-between gap-6 pb-2">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">OmniVerse</h1>
            <p className="mt-1 text-sm text-muted-foreground">Latest posts</p>
          </div>
        </header>

        <HomeFeed posts={all} popular={popular} recent={recent} />
      </Container>
    </div>
  );
}
