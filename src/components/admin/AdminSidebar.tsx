"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  FolderKanban,
  Image as ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Tags,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/taxonomy", label: "Categories & Tags", icon: Tags },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/blog", label: "View site", icon: FolderKanban },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 border-r border-border/60 bg-card/90 backdrop-blur transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-muted/40">
              <span className="text-sm font-semibold text-foreground">O</span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                OmniVerse Admin
              </div>
              <div className="text-[11px] text-muted-foreground">
                Manage content & platform
              </div>
            </div>
          </Link>

          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/60"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className="px-3 py-2">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-muted/70 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-border/60 bg-background/60 p-4 text-xs text-muted-foreground">
            Demo dashboard with local dummy data. Hook this up to your backend/CMS
            when ready.
          </div>
        </div>
      </aside>

      {/* Desktop spacer */}
      <div className="hidden w-72 shrink-0 lg:block" />

      {/* Mobile trigger (rendered by topbar too, but kept here for safety) */}
      <button
        type="button"
        className="fixed bottom-6 left-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/90 shadow-sm backdrop-blur transition hover:-translate-y-0.5 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>
    </>
  );
}

