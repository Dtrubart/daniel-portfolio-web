import { ButtonLink } from "@/components/ui/ButtonLink";

export function SolutionsCTA() {
  return (
    <section className="mx-auto max-w-3xl rounded-lg border border-border bg-secondary px-6 py-12 text-center sm:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Have a related challenge?
      </h2>
      <p className="mt-4 text-sm text-muted-foreground">
        I&apos;m open to professional conversations and selected project-based
        collaborations where there is a strong fit between the challenge and
        experience.
      </p>
      <ButtonLink href="/contact" variant="primary" size="lg" className="mt-6">
        Start a conversation
      </ButtonLink>
    </section>
  );
}