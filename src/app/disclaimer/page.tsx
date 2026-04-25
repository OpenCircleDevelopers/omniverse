import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for OmniVerse (template).",
};

export default function DisclaimerPage() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="rounded-[2.5rem] border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="soft">Legal</Badge>
            <Badge className="bg-primary/8 border-primary/15">Template</Badge>
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight md:text-4xl">
            Disclaimer
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>
              The information on OmniVerse is provided for general informational
              purposes only. All content is provided in good faith; however, we
              make no representation or warranty of any kind regarding accuracy,
              adequacy, validity, reliability, or completeness.
            </p>
            <p>
              Any action you take upon the information you find on this website
              is strictly at your own risk. We will not be liable for any losses
              or damages in connection with the use of our website.
            </p>
            <p>
              This site may contain links to external websites. We do not
              guarantee the accuracy or relevance of information on external
              sites and are not responsible for their content.
            </p>
            <p className="text-xs">
              Note: This is starter text. Update to match your actual content,
              jurisdiction, and risk profile.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

