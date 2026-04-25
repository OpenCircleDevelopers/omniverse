import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About",
  description: "What OmniVerse is and how to use it.",
};

export default function AboutPage() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="rounded-[2.5rem] border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="soft">OmniVerse</Badge>
            <Badge className="bg-primary/8 border-primary/15">Frontend</Badge>
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight md:text-4xl">
            About OmniVerse
          </h1>

          <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>
              OmniVerse is a{" "}
              <span className="text-foreground/90 font-medium">
                production-style blogging frontend
              </span>{" "}
              built in this workspace to give you a premium UI baseline: clean
              layouts, responsive components, dark mode, and tasteful motion.
            </p>
            <p>
              There’s no “made-up origin story” here. This project is a starter
              and a demo — meant to be customized with your real brand, your real
              authors, and your real content. If you connect a CMS later, you can
              keep the UI and swap the dummy data for live posts.
            </p>
            <p>
              If you’re using OmniVerse for a real site, update the Contact +
              Legal pages to match your actual business details and compliance
              needs.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Design-first",
                text: "Typography, spacing, depth, and motion tuned for a premium feel.",
              },
              {
                title: "Component-driven",
                text: "Reusable UI building blocks with a clean folder structure.",
              },
              {
                title: "Performance-minded",
                text: "App Router, lazy client work, and lightweight interactions.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-border/60 bg-background/40 p-6 shadow-sm"
              >
                <div className="text-sm font-semibold tracking-tight text-foreground">
                  {c.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

