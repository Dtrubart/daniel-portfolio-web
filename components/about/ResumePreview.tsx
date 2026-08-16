import { ButtonLink } from "@/components/ui/ButtonLink";

export function ResumePreview() {
  return (
    <section
      id="resume"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Professional Resume
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Need the condensed version?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          A concise professional resume covering experience across data,
          business systems, operations and process improvement.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/resume" variant="primary" size="sm">
            View Resume
          </ButtonLink>
          <span className="text-xs text-muted-foreground/60">
            Condensed professional summary derived from the same canonical facts
          </span>
        </div>
      </div>
    </section>
  );
}
