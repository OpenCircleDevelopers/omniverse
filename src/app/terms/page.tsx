import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for OmniVerse (template).",
};

export default function TermsPage() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="rounded-[2.5rem] border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="soft">Legal</Badge>
            <Badge className="bg-primary/8 border-primary/15">Template</Badge>
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight md:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Effective date: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>
              By accessing and using OmniVerse, you agree to these Terms &
              Conditions. If you do not agree, please do not use the site.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Content
            </h2>
            <p>
              Articles are provided for general informational purposes. We do not
              guarantee completeness, accuracy, or timeliness.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Acceptable use
            </h2>
            <p>
              You agree not to misuse the site, attempt to disrupt services, or
              access areas you are not authorized to access.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              External links
            </h2>
            <p>
              The site may contain links to third-party websites. We are not
              responsible for their content or practices.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Changes
            </h2>
            <p>
              We may update these terms at any time. Continued use of the site
              after changes means you accept the updated terms.
            </p>

            <p className="text-xs">
              Note: This is starter text. Update it to match your actual site,
              business identity, and legal requirements.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

