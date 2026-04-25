"use client";

import * as React from "react";

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  return (
    <form
      className="mt-4 grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        className="h-11 w-full rounded-2xl border border-border/70 bg-card/70 px-4 text-sm shadow-sm backdrop-blur outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        placeholder="Your name"
        required
      />
      <input
        className="h-11 w-full rounded-2xl border border-border/70 bg-card/70 px-4 text-sm shadow-sm backdrop-blur outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        placeholder="Email"
        type="email"
        autoComplete="email"
        required
      />
      <textarea
        className="min-h-32 w-full rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm shadow-sm backdrop-blur outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        placeholder="What can we help with?"
        required
      />
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-18px_hsl(var(--primary)/0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-22px_hsl(var(--primary)/0.75)] active:translate-y-0"
        disabled={sent}
      >
        {sent ? "Sent (demo)" : "Send message (demo)"}
      </button>
      {sent ? (
        <p className="text-xs text-muted-foreground">
          Frontend-only demo: connect your form provider to send real messages.
        </p>
      ) : null}
    </form>
  );
}

