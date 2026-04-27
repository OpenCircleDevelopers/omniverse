import { getAllPosts } from "@/lib/posts";
import type { ActivityItem } from "@/components/admin/overview/ActivityFeed";

export function getAdminOverviewMock({
  postsCount,
  usersCount,
}: {
  postsCount?: number;
  usersCount?: number;
} = {}) {
  const posts = getAllPosts();

  const totalPosts = postsCount ?? posts.length;
  const totalUsers = usersCount ?? 1284;
  const totalViews = 482_190;
  const engagement = 37;

  const viewsSeries = [
    18200, 19040, 17620, 20110, 22490, 21320, 24200,
    23150, 24820, 25910, 27120, 26880, 27990, 29310,
  ];

  const activity: ActivityItem[] = [
    {
      id: "a1",
      title: "Comment approved on “Designing for reading comfort”",
      time: "2 hours ago",
      tone: "success",
    },
    {
      id: "a2",
      title: "New draft saved: “Pagination vs infinite scroll”",
      time: "5 hours ago",
      tone: "info",
    },
    {
      id: "a3",
      title: "User blocked for spam reports (mock action)",
      time: "Yesterday",
      tone: "warning",
    },
    {
      id: "a4",
      title: `Published: “${posts[0]?.title ?? "New post"}”`,
      time: "2 days ago",
      tone: "success",
    },
  ];

  return { totalPosts, totalUsers, totalViews, engagement, viewsSeries, activity };
}

