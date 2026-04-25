import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for OmniVerse (template).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="rounded-[2.5rem] border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="soft">Legal</Badge>
            <Badge className="bg-primary/8 border-primary/15">AdSense-ready</Badge>
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Effective date: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>
              This Privacy Policy explains how OmniVerse (“we”, “us”, “our”)
              handles information when you visit this website.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Information we collect
            </h2>
            <p>
              OmniVerse is a frontend-only demo by default. It does not include
              a backend database or user accounts. If you connect analytics, ads,
              or a contact form provider later, those services may collect data.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Cookies and similar technologies
            </h2>
            <p>
              We may use cookies or similar technologies to understand site
              usage, remember preferences (such as dark mode), and deliver ads.
              You can control cookies through your browser settings.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Advertising (Google AdSense)
            </h2>
            <p>
              If we display ads (including Google AdSense), third-party vendors
              may use cookies to serve ads based on a user’s prior visits to this
              or other websites. Users may opt out of personalized advertising by
              visiting Google’s Ads Settings or using industry opt-out tools.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Analytics
            </h2>
            <p>
              If analytics are enabled, we may collect aggregated usage data such
              as pages visited, time on site, and device/browser information. We
              use this to improve the content and experience.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Contacting us
            </h2>
            <p>
              If you contact us by email, we will receive the information you
              choose to share (such as your email address and message). We use
              it only to respond.
            </p>

            <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. If we make changes,
              we’ll update the effective date above.
            </p>

            <p className="text-xs">
              Note: This is a template suitable for a starter project. For a real
              business, review with a qualified professional to match your
              jurisdiction and actual data flows.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

