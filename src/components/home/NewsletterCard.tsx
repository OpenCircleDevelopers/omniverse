"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function NewsletterCard() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/80 to-cyan-400/70 text-white shadow-sm">
          <Mail className="h-4 w-4" />
        </span>
        <div>
          <div className="text-sm font-semibold tracking-tight">
            Subscribe to OmniVerse
          </div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Newsletter UI only — connect your provider later.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          type="email"
          autoComplete="email"
        />
        <Button
          variant="primary"
          onClick={() => setSubmitted(true)}
          disabled={!email || submitted}
        >
          {submitted ? "Subscribed (demo)" : "Subscribe"}
        </Button>
        {submitted ? (
          <p className="text-xs text-muted-foreground">
            This is a frontend-only demo. Replace with your real newsletter flow.
          </p>
        ) : null}
      </div>
    </div>
  );
}

