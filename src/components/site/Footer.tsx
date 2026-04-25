import * as React from "react";
import Link from "next/link";
import { AtSign, Globe, Link2, Rss } from "lucide-react";

const columns = [
  {
    title: "OmniVerse",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Articles" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog?category=Design", label: "Design" },
      { href: "/blog?category=Engineering", label: "Engineering" },
      { href: "/blog?category=Product", label: "Product" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="text-sm font-semibold tracking-tight">OmniVerse</div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A premium Next.js blogging frontend starter. Swap in your content,
              connect a CMS, and ship.
            </p>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <SocialLink
                label="Email"
                href="mailto:hello@omniverse.local"
                icon={<AtSign className="h-4 w-4" />}
              />
              <SocialLink label="Website" href="#" icon={<Globe className="h-4 w-4" />} />
              <SocialLink label="Links" href="#" icon={<Link2 className="h-4 w-4" />} />
              <SocialLink label="RSS" href="#" icon={<Rss className="h-4 w-4" />} />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-foreground/90 transition hover:text-foreground hover:underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} OmniVerse. All rights reserved.</p>
          <p>
            Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-muted/60 hover:shadow-md active:translate-y-0"
    >
      {icon}
    </a>
  );
}

