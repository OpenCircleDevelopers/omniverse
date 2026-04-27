"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export function AdminTopbar() {
  return (
    <div className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur lg:ml-72">
      <div className="flex h-16 items-center gap-3 px-4 md:px-8">
        <div className="hidden lg:block text-sm font-semibold tracking-tight">
          Dashboard
        </div>

        <div className="relative ml-auto w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-10 w-full rounded-xl border border-border/70 bg-card/70 pl-10 pr-3 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
            placeholder="Search admin… (UI only)"
          />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card/70 shadow-sm transition hover:bg-muted/30"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        <ThemeToggle />

        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-sm font-medium shadow-sm transition hover:bg-muted/30"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-muted/60 text-[10px] font-semibold">
            AD
          </span>
          Admin
        </Link>
      </div>
    </div>
  );
}

