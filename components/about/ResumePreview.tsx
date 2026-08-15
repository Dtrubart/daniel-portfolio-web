export function ResumePreview() {
  return (
    <section
      id="resume"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Professional Resume
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Looking for the condensed version?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          A concise professional resume covering experience across data,
          business systems, operations and process improvement will be
          available here.
        </p>

        <div className="mt-8 inline-block rounded-md border border-border bg-secondary px-4 py-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Coming in M8C</p>
          <p className="mt-1 text-xs">Resume PDF integration is deferred.</p>
        </div>
      </div>
    </section>
  );
}