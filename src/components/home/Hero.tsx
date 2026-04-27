import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/50 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-28 left-1/2 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-background/0 to-accent/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-accent/12 via-background/0 to-primary/12 blur-3xl" />
      </div>

      <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            Premium Next.js blogging UI
            <span className="h-1 w-1 rounded-full bg-primary/70" />
            Dark mode · Motion · Clean layout
          </p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            OmniVerse — a modern blog frontend that feels expensive.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            Clean typography, soft depth, and subtle motion — inspired by the
            best editorial and SaaS design. Use the dummy posts now, connect a
            CMS later.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/blog" size="lg" className="justify-center">
              Browse articles <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/about"
              variant="secondary"
              size="lg"
              className="justify-center"
            >
              Learn about OmniVerse
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-background/40 p-6 shadow-sm backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What you get
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground/90">
            <li>• Featured + latest posts layout</li>
            <li>• Search, categories, tags, pagination</li>
            <li>• Sticky responsive navbar + multi-column footer</li>
            <li>• Skeleton loaders and empty states</li>
            <li>• Framer Motion transitions and card hovers</li>
          </ul>
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-4">
            <div className="text-sm font-semibold tracking-tight">
              Ready for production polish
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Accessible focus states, modern spacing, and optimized UI patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

