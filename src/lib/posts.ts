export type Author = {
  name: string;
  role: string;
  avatarInitials: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
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
    thumbnail: "/thumbnails/thumb-01.svg",
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
    thumbnail: "/thumbnails/thumb-02.svg",
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
    thumbnail: "/thumbnails/thumb-03.svg",
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
    thumbnail: "/thumbnails/thumb-02.svg",
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
    thumbnail: "/thumbnails/thumb-01.svg",
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
    thumbnail: "/thumbnails/thumb-03.svg",
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
  {
    slug: "writing-headlines-that-earn-the-click",
    title: "Writing headlines that earn the click (without clickbait)",
    excerpt:
      "Strong headlines are clear, specific, and honest. A small framework to improve yours in minutes.",
    thumbnail: "/thumbnails/thumb-01.svg",
    date: "2026-03-28T10:00:00.000Z",
    readingMinutes: 6,
    trendingScore: 77,
    category: "Product",
    tags: ["Writing", "Editorial", "UX"],
    author,
    content: [
      { type: "p", text: "A good headline is a promise you can keep." },
      { type: "h2", text: "A simple formula" },
      {
        type: "ul",
        items: [
          "Audience + outcome + constraint.",
          "Cut vague adjectives first.",
          "Add specificity: numbers, timeframes, examples.",
        ],
      },
    ],
  },
  {
    slug: "tag-taxonomy-that-doesnt-break",
    title: "Tag taxonomy that doesn’t break at 200 posts",
    excerpt:
      "Tags are powerful until they sprawl. Here’s how to keep them tidy and useful for readers.",
    thumbnail: "/thumbnails/thumb-02.svg",
    date: "2026-03-14T10:00:00.000Z",
    readingMinutes: 5,
    trendingScore: 71,
    category: "Engineering",
    tags: ["Taxonomy", "Information Architecture", "CMS"],
    author,
    content: [
      { type: "p", text: "Your tag system is an interface, not a dump of keywords." },
      { type: "ul", items: ["Prefer fewer canonical tags.", "Merge synonyms.", "Retire tags that never get clicks."] },
    ],
  },
  {
    slug: "designing-for-reading-comfort",
    title: "Designing for reading comfort: the non-negotiables",
    excerpt:
      "Line length, contrast, rhythm, and hierarchy. The fundamentals that make content feel effortless.",
    thumbnail: "/thumbnails/thumb-03.svg",
    date: "2026-03-10T10:00:00.000Z",
    readingMinutes: 7,
    trendingScore: 83,
    category: "Design",
    tags: ["Typography", "Accessibility", "Layout"],
    author,
    content: [
      { type: "p", text: "Readers feel comfort before they can describe it." },
      { type: "quote", text: "Make the page disappear, so the words remain." },
      { type: "ul", items: ["60–80ch measure.", "Generous line-height.", "Clear heading hierarchy."] },
    ],
  },
  {
    slug: "shipping-fast-with-editorial-standards",
    title: "Shipping fast with editorial standards",
    excerpt:
      "Speed matters, but consistency builds trust. A lightweight checklist for repeatable quality.",
    thumbnail: "/thumbnails/thumb-01.svg",
    date: "2026-02-26T10:00:00.000Z",
    readingMinutes: 6,
    trendingScore: 68,
    category: "Culture",
    tags: ["Process", "Editorial", "Quality"],
    author,
    content: [
      { type: "p", text: "Standards are what you keep when you’re busy." },
      { type: "ul", items: ["One clear takeaway.", "Examples over abstractions.", "Edit for scanning."] },
    ],
  },
  {
    slug: "image-performance-for-blogs",
    title: "Image performance for blogs: the practical guide",
    excerpt:
      "How to keep pages fast: sizes, lazy loading, and choosing the right formats for thumbnails.",
    thumbnail: "/thumbnails/thumb-02.svg",
    date: "2026-02-22T10:00:00.000Z",
    readingMinutes: 8,
    trendingScore: 79,
    category: "Engineering",
    tags: ["Performance", "Images", "Next/Image"],
    author,
    content: [
      { type: "p", text: "Images are usually the biggest bytes on a blog page." },
      { type: "ul", items: ["Use explicit sizes.", "Let the browser pick with `sizes`.", "Prefer fewer, better images."] },
    ],
  },
  {
    slug: "building-a-recent-popular-sidebar",
    title: "Building a ‘Recent + Popular’ sidebar that people use",
    excerpt:
      "Sidebars work when they’re scannable. Keep them short, ordered, and relevant to the page.",
    thumbnail: "/thumbnails/thumb-03.svg",
    date: "2026-02-12T10:00:00.000Z",
    readingMinutes: 5,
    trendingScore: 75,
    category: "Product",
    tags: ["Navigation", "Discovery", "UX"],
    author,
    content: [
      { type: "p", text: "Discovery is a UX feature, not an afterthought." },
      { type: "ul", items: ["Limit lists to 5–7 items.", "Mix ‘popular’ with ‘recent’.", "Show tags sparingly."] },
    ],
  },
  {
    slug: "pagination-vs-infinite-scroll",
    title: "Pagination vs infinite scroll for articles",
    excerpt:
      "There’s no universal winner. Pick based on intent, SEO, and how readers actually browse.",
    thumbnail: "/thumbnails/thumb-01.svg",
    date: "2026-01-20T10:00:00.000Z",
    readingMinutes: 6,
    trendingScore: 66,
    category: "Product",
    tags: ["UX", "SEO", "Browsing"],
    author,
    content: [
      { type: "p", text: "Pagination is explicit. Infinite scroll is effortless." },
      { type: "quote", text: "Choose the pattern that matches the reader’s intent." },
    ],
  },
  {
    slug: "how-to-write-better-excerpts",
    title: "How to write better excerpts (so people keep reading)",
    excerpt:
      "Excerpts are micro-pitches. A few rules to make them clear, specific, and enticing.",
    thumbnail: "/thumbnails/thumb-02.svg",
    date: "2026-01-08T10:00:00.000Z",
    readingMinutes: 4,
    trendingScore: 61,
    category: "Culture",
    tags: ["Writing", "Editorial"],
    author,
    content: [
      { type: "p", text: "Your excerpt should preview the payoff, not summarize the setup." },
      { type: "ul", items: ["Keep it to 1–2 sentences.", "Avoid generic phrasing.", "Lead with the outcome."] },
    ],
  },
  {
    slug: "dark-mode-for-reading",
    title: "Dark mode for reading: what to avoid",
    excerpt:
      "Dark mode is great until contrast and typography are off. Here’s what typically breaks readability.",
    thumbnail: "/thumbnails/thumb-03.svg",
    date: "2026-03-02T10:00:00.000Z",
    readingMinutes: 5,
    trendingScore: 74,
    category: "Design",
    tags: ["Dark Mode", "Accessibility", "Typography"],
    author,
    content: [
      { type: "p", text: "Pure black with pure white text is rarely comfortable." },
      { type: "ul", items: ["Use off-black backgrounds.", "Avoid low-contrast muted text.", "Keep code blocks readable."] },
    ],
  },
  {
    slug: "author-pages-and-trust",
    title: "Author profiles that build trust",
    excerpt:
      "A clear author section makes content feel accountable. What to include (and what not to).",
    thumbnail: "/thumbnails/thumb-01.svg",
    date: "2026-02-06T10:00:00.000Z",
    readingMinutes: 4,
    trendingScore: 63,
    category: "Product",
    tags: ["Authors", "Trust", "Publishing"],
    author,
    content: [
      { type: "p", text: "Trust is a product feature." },
      { type: "ul", items: ["Name + role.", "A short credibility snippet.", "Links only if they’re real."] },
    ],
  },
  {
    slug: "cms-migration-without-breaking-urls",
    title: "CMS migration without breaking URLs",
    excerpt:
      "If you ever switch CMS providers, preserving slugs is how you preserve SEO and reader trust.",
    thumbnail: "/thumbnails/thumb-02.svg",
    date: "2026-01-30T10:00:00.000Z",
    readingMinutes: 7,
    trendingScore: 70,
    category: "Engineering",
    tags: ["CMS", "SEO", "Routing"],
    author,
    content: [
      { type: "p", text: "URLs are user experience and long-term memory." },
      { type: "ul", items: ["Keep old slugs.", "Add redirects when needed.", "Don’t change dates casually."] },
    ],
  },
  {
    slug: "what-to-publish-when-youre-stuck",
    title: "What to publish when you’re stuck",
    excerpt:
      "When you don’t know what to write, publish what you learned this week. It’s always useful.",
    thumbnail: "/thumbnails/thumb-03.svg",
    date: "2026-03-18T10:00:00.000Z",
    readingMinutes: 4,
    trendingScore: 62,
    category: "Culture",
    tags: ["Writing", "Consistency"],
    author,
    content: [
      { type: "p", text: "Consistency beats inspiration." },
      { type: "ul", items: ["Share a lesson.", "Share a decision.", "Share a mistake and a fix."] },
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

export function getRecentPosts(limit = 5) {
  return getAllPosts().slice(0, limit);
}


