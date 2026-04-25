import Link from "next/link";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-14">
      <Container>
        <div className="rounded-[2.5rem] border border-border/60 bg-card/50 p-10 text-center shadow-sm backdrop-blur">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground md:text-base">
            The page you’re looking for doesn’t exist or has moved.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/" size="lg" className="justify-center">
              Go home
            </ButtonLink>
            <Link
              href="/blog"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border/70 bg-card/60 px-6 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-muted/60"
            >
              Browse articles
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

