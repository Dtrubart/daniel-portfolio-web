import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { publicContactConfig } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact | Daniel Trujillo",
  description:
    "Connect with Daniel Trujillo on LinkedIn and GitHub regarding professional opportunities, collaboration, projects, data, business systems, ERP, operations, automation, and process improvement.",
};

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&rsquo;s connect.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            I&rsquo;m always interested in thoughtful conversations around data,
            business systems, ERP, operational analytics, automation, process
            improvement, and technology.
          </p>
        </header>

        <div className="mb-12 space-y-2">
          <p className="text-sm font-medium text-foreground">
            Professional interests:
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground">
            {publicContactConfig.professionalInterests.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {publicContactConfig.location.value}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:mt-20 lg:grid-cols-2">
        <ContactCard
          label="LinkedIn"
          href={publicContactConfig.linkedin.href}
          qrImage="/contact/linkedin-qr.svg"
          qrAlt="Scan to open LinkedIn"
          description="Professional profile, experience, and networking."
        />
        <ContactCard
          label="GitHub"
          href={publicContactConfig.github.href}
          qrImage="/contact/github-qr.svg"
          qrAlt="Scan to open GitHub"
          description="Projects, repositories, and technical evidence."
        />
      </div>
    </Container>
  );
}

interface ContactCardProps {
  label: string;
  href: string;
  qrImage: string;
  qrAlt: string;
  description: string;
}

function ContactCard({ label, href, qrImage, qrAlt, description }: ContactCardProps) {
  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <div className="flex flex-col items-center">
          <Image
            src={qrImage}
            alt={qrAlt}
            width={160}
            height={160}
            className="rounded-md"
            priority
          />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {qrAlt}
          </p>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-foreground">{label}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <div className="mt-4">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
            >
              {label === "LinkedIn"
                ? "Connect on LinkedIn"
                : "Explore my GitHub"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
