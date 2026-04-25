import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact OmniVerse (demo UI).",
};

export default function ContactPage() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="rounded-[2.5rem] border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="soft">Contact</Badge>
            <Badge className="bg-primary/8 border-primary/15">UI only</Badge>
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight md:text-4xl">
            Get in touch
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            This page is intentionally frontend-only. Replace the email and wire
            the form to your backend or form provider.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="rounded-3xl border border-border/60 bg-background/40 p-6 shadow-sm">
              <div className="text-sm font-semibold tracking-tight">
                Email
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For now, update this placeholder:
              </p>
              <a
                className="mt-4 inline-flex rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm font-medium transition hover:bg-muted/50"
                href="mailto:hello@omniverse.local"
              >
                hello@omniverse.local
              </a>

              <div className="mt-8 text-sm font-semibold tracking-tight">
                Social (optional)
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {["Twitter", "LinkedIn", "Instagram", "GitHub"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-full border border-border/60 bg-card/60 px-4 py-2 transition hover:bg-muted/50"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/40 p-6 shadow-sm">
              <div className="text-sm font-semibold tracking-tight">
                Message form (demo)
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                No backend is connected, so this won’t send anywhere yet.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

