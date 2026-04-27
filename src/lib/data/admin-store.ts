/* Admin "backend" for the dashboard.
   Uses localStorage so CRUD feels real without a server. */

export type PostStatus = "draft" | "published";

export type AdminPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string; // URL/path
  tags: string[];
  category: string;
  status: PostStatus;
  author: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  views: number;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  blocked: boolean;
  joinedAt: string;
  posts: number;
  comments: number;
};

export type AdminComment = {
  id: string;
  postId: string;
  postTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export type AdminCategory = { id: string; name: string; slug: string };
export type AdminTag = { id: string; name: string; slug: string };

export type AdminMedia = {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
};

type AdminDB = {
  posts: AdminPost[];
  users: AdminUser[];
  comments: AdminComment[];
  categories: AdminCategory[];
  tags: AdminTag[];
  media: AdminMedia[];
};

const KEY = "omniverse_admin_db_v1";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getDb(): AdminDB {
  if (typeof window === "undefined") {
    return {
      posts: [],
      users: [],
      comments: [],
      categories: [],
      tags: [],
      media: [],
    };
  }
  const existing = safeParse<AdminDB>(localStorage.getItem(KEY));
  if (existing) return existing;

  const seeded = seedDb();
  localStorage.setItem(KEY, JSON.stringify(seeded));
  return seeded;
}

export function setDb(next: AdminDB) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function updateDb(updater: (db: AdminDB) => AdminDB) {
  const db = getDb();
  const next = updater(db);
  setDb(next);
  return next;
}

export function resetDb() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

function seedDb(): AdminDB {
  const now = new Date().toISOString();

  const categories: AdminCategory[] = [
    "Design",
    "Engineering",
    "Product",
    "AI",
    "Culture",
  ].map((name) => ({ id: crypto.randomUUID(), name, slug: slugify(name) }));

  const tags: AdminTag[] = [
    "Typography",
    "Accessibility",
    "Next.js",
    "Performance",
    "SEO",
    "UX",
    "Writing",
    "Workflow",
    "Architecture",
    "Dark Mode",
  ].map((name) => ({ id: crypto.randomUUID(), name, slug: slugify(name) }));

  const media: AdminMedia[] = [
    { id: crypto.randomUUID(), name: "thumb-01.svg", url: "/thumbnails/thumb-01.svg", uploadedAt: now },
    { id: crypto.randomUUID(), name: "thumb-02.svg", url: "/thumbnails/thumb-02.svg", uploadedAt: now },
    { id: crypto.randomUUID(), name: "thumb-03.svg", url: "/thumbnails/thumb-03.svg", uploadedAt: now },
  ];

  const posts: AdminPost[] = Array.from({ length: 18 }).map((_, i) => {
    const title = `Sample admin post ${i + 1}: Building a better publishing workflow`;
    const cat = categories[i % categories.length]!;
    const tagSet = [tags[i % tags.length]!, tags[(i + 3) % tags.length]!].map((t) => t.name);
    const status: PostStatus = i % 5 === 0 ? "draft" : "published";
    const createdAt = new Date(Date.now() - i * 86_400_000).toISOString();
    return {
      id: crypto.randomUUID(),
      title,
      slug: slugify(title),
      content:
        "This is dummy content used for the admin dashboard. Replace it with your CMS content.\n\n## Section\n\n- Point one\n- Point two\n\n> A nice quote.\n",
      excerpt:
        "A realistic excerpt that makes the post scannable in tables and lists. Short, clear, useful.",
      image: media[i % media.length]!.url,
      tags: tagSet,
      category: cat.name,
      status,
      author: "OmniVerse Editorial",
      createdAt,
      updatedAt: createdAt,
      views: 1200 + i * 137,
    };
  });

  const users: AdminUser[] = Array.from({ length: 24 }).map((_, i) => {
    const role: AdminUser["role"] = i % 11 === 0 ? "admin" : i % 5 === 0 ? "editor" : "user";
    return {
      id: crypto.randomUUID(),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role,
      blocked: i % 17 === 0,
      joinedAt: new Date(Date.now() - i * 9 * 86_400_000).toISOString(),
      posts: Math.floor(Math.random() * 12),
      comments: Math.floor(Math.random() * 40),
    };
  });

  const comments: AdminComment[] = Array.from({ length: 36 }).map((_, i) => {
    const p = posts[i % posts.length]!;
    const status: AdminComment["status"] =
      i % 6 === 0 ? "pending" : i % 7 === 0 ? "rejected" : "approved";
    return {
      id: crypto.randomUUID(),
      postId: p.id,
      postTitle: p.title,
      authorName: `Commenter ${i + 1}`,
      authorEmail: `commenter${i + 1}@mail.com`,
      content:
        "This is a dummy comment for moderation UI. It should look realistic and be easy to scan.",
      status,
      createdAt: new Date(Date.now() - i * 3_600_000).toISOString(),
    };
  });

  return { posts, users, comments, categories, tags, media };
}

