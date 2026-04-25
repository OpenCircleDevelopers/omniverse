"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-primary/90 to-cyan-400/70 shadow-sm">
            <span className="text-sm font-semibold tracking-tight text-white">
              O
            </span>
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">OmniVerse</div>
            <div className="text-[11px] text-muted-foreground">
              Modern blogging, premium UI
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground hover:bg-muted/60",
                  active && "text-foreground bg-muted/60",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLink href="/blog" variant="primary" size="sm">
              Explore posts
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border/60 bg-background/70 backdrop-blur transition-[max-height,opacity] duration-300",
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="grid gap-1">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-muted/60",
                    active && "bg-muted/60",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-3">
            <ButtonLink
              href="/blog"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Explore posts
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}

