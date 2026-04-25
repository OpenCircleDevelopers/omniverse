export type Author = {
  name: string;
  role: string;
  avatarInitials: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: {
    gradient: string;
  };
  date: string; // ISO
  readingMinutes: number;
  featured?: boolean;
  trendingScore?: number;
  category: "Design" | "Engineering" | "Product" | "AI" | "Culture";
  tags: string[];
  author: Author;
  content: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "quote"; text: string }
    | { type: "ul"; items: string[] }
  >;
};

const author: Author = {
  name: "OmniVerse Editorial",
  role: "Curated by the OmniVerse team",
  avatarInitials: "OV",
};

export const posts: Post[] = [
  {
    slug: "the-premium-ui-checklist-for-blogging-sites",
    title: "The premium UI checklist for modern blogging sites",
    excerpt:
      "A practical checklist to make a blog feel expensive: typography, rhythm, depth, motion, and the small details readers notice subconsciously.",
    cover: { gradient: "from-primary/90 via-fuchsia-500/60 to-cyan-400/60" },
    date: "2026-02-18T10:00:00.000Z",
    readingMinutes: 7,
    featured: true,
    trendingScore: 92,
    category: "Design",
    tags: ["Typography", "UI", "Tailwind"],
    author,
    content: [
      { type: "p", text: "Premium design isn’t about adding more. It’s about removing friction." },
      { type: "h2", text: "1) Visual rhythm" },
      {
        type: "ul",
        items: [
          "Consistent spacing scale (and fewer arbitrary values).",
          "Readable line-height and max-width for prose.",
          "Predictable card grids with responsive breakpoints.",
        ],
      },
      { type: "h2", text: "2) Depth without heaviness" },
      { type: "p", text: "Use subtle shadows, soft borders, and translucent surfaces to create layers." },
      { type: "quote", text: "If everything pops, nothing does." },
      { type: "p", text: "A single great hero and a calm content layout beats busy decorations." },
    ],
  },
  {
    slug: "nextjs-app-router-patterns-that-scale",
    title: "Next.js App Router patterns that scale",
    excerpt:
      "Folder structure, colocation, and client/server boundaries that keep a blog frontend clean as it grows.",
    cover: { gradient: "from-cyan-400/60 via-emerald-400/40 to-primary/70" },
    date: "2026-03-04T10:00:00.000Z",
    readingMinutes: 6,
    featured: true,
    trendingScore: 88,
    category: "Engineering",
    tags: ["Next.js", "App Router", "Architecture"],
    author,
    content: [
      { type: "p", text: "App Router shines when server components do the heavy lifting and clients stay small." },
      { type: "h2", text: "A clean structure" },
      {
        type: "ul",
        items: [
          "Put routes in `app/` and reuse UI in `components/`.",
          "Keep data helpers in `lib/`.",
          "Use small client components for interactions (search, filters, pagination).",
        ],
      },
      { type: "p", text: "You’ll iterate faster when pages are composition, not logic dumps." },
    ],
  },
  {
    slug: "search-and-filters-without-a-backend",
    title: "Search & filters without a backend (still feels real)",
    excerpt:
      "Client-side filtering can feel instant and polished with the right UX: debounce, empty states, and skeletons.",
    cover: { gradient: "from-fuchsia-500/60 via-primary/60 to-amber-400/40" },
    date: "2026-01-12T10:00:00.000Z",
    readingMinutes: 5,
    trendingScore: 81,
    category: "Product",
    tags: ["UX", "Search", "Filtering"],
    author,
    content: [
      { type: "p", text: "If it feels responsive, users don’t care whether it’s backed by an API." },
      { type: "h2", text: "What matters" },
      {
        type: "ul",
        items: [
          "Immediate visual feedback (loading skeletons).",
          "Clear filters that look tappable on mobile.",
          "Good empty states that suggest the next action.",
        ],
      },
    ],
  },
  {
    slug: "motion-that-doesnt-annoy",
    title: "Motion that doesn’t annoy (Framer Motion rules of thumb)",
    excerpt:
      "Smooth transitions can be premium or distracting. Here’s how to keep motion subtle, purposeful, and fast.",
    cover: { gradient: "from-emerald-400/50 via-cyan-400/30 to-primary/70" },
    date: "2026-03-21T10:00:00.000Z",
    readingMinutes: 4,
    trendingScore: 73,
    category: "Design",
    tags: ["Framer Motion", "Micro-interactions"],
    author,
    content: [
      { type: "p", text: "Animation should explain state changes, not compete with content." },
      { type: "quote", text: "Prefer 200–300ms, ease-out, and tiny distances." },
      { type: "p", text: "Your readers are here to read. Let motion stay in the background." },
    ],
  },
  {
    slug: "ai-writing-tools-and-editorial-voice",
    title: "AI writing tools vs editorial voice",
    excerpt:
      "AI can help you draft faster, but voice is what makes your site memorable. Here’s a simple workflow.",
    cover: { gradient: "from-primary/70 via-indigo-500/40 to-cyan-400/50" },
    date: "2026-02-02T10:00:00.000Z",
    readingMinutes: 6,
    trendingScore: 69,
    category: "AI",
    tags: ["AI", "Writing", "Workflow"],
    author,
    content: [
      { type: "p", text: "Use AI for structure, not personality." },
      { type: "h2", text: "A balanced workflow" },
      {
        type: "ul",
        items: [
          "Outline with AI.",
          "Draft sections quickly.",
          "Rewrite with your own examples, opinions, and constraints.",
        ],
      },
    ],
  },
  {
    slug: "building-in-public-without-oversharing",
    title: "Building in public without oversharing",
    excerpt:
      "Transparency builds trust — until it becomes noise. A few guardrails to keep your audience engaged.",
    cover: { gradient: "from-amber-400/40 via-fuchsia-500/40 to-primary/70" },
    date: "2026-01-28T10:00:00.000Z",
    readingMinutes: 5,
    trendingScore: 64,
    category: "Culture",
    tags: ["Community", "Writing"],
    author,
    content: [
      { type: "p", text: "Share what’s useful. Save the rest for your journal." },
      { type: "h2", text: "Useful updates include" },
      {
        type: "ul",
        items: [
          "What you learned and what changed your mind.",
          "A decision and the trade-off you made.",
          "A postmortem that helps others avoid mistakes.",
        ],
      },
    ],
  },
];

export const categories = [
  "All",
  "Design",
  "Engineering",
  "Product",
  "AI",
  "Culture",
] as const;

export type Category = (typeof categories)[number];

export function getAllPosts() {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getFeaturedPosts() {
  return getAllPosts().filter((p) => p.featured);
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getTrendingPosts(limit = 4) {
  return [...posts]
    .sort((a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0))
    .slice(0, limit);
}

