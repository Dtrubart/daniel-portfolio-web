import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Let&apos;s connect.
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          I&apos;m interested in opportunities and conversations around data,
          business systems, ERP, operational analytics, automation, and process
          improvement.
        </p>

        <Link
          href="/contact"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}