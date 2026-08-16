import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { professionalProfile } from "@/data/professional-profile";
import { professionalFacts } from "@/data/professional-facts";

const interestAreas = [
  "Data & Analytics",
  "Business Systems / ERP",
  "Operations Analytics",
  "Automation",
  "Process Improvement",
] as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Professional inquiries for Daniel Trujillo — Industrial Engineer specializing in data, ERP & business systems, operations, automation, and process improvement.",
};

export default function ContactPage() {
  const { identity } = professionalProfile;
  const publicContact = professionalFacts.contact.filter((c) => c.isPublic);
  const privateContact = professionalFacts.contact.filter((c) => !c.isPublic);

  return (
    <Container className="py-16 md:py-24">
      <section className="mx-auto max-w-2xl space-y-12">
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Let&apos;s Connect
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Interested in discussing:
          </p>
        </header>

        <div>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-foreground">
            {interestAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{identity.name}</h2>
          <p className="text-sm text-muted-foreground">{identity.headline}</p>
          {publicContact.map((c) => (
            <p key={c.id} className="text-sm text-muted-foreground">
              {c.value}
            </p>
          ))}
        </div>

        <div className="space-y-4">
          {privateContact.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-md border border-border bg-secondary px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">
                {c.label}
              </span>
              <span className="text-xs text-muted-foreground/60">
                Contact details under review
              </span>
            </div>
          ))}
        </div>

        <p className="border-t border-border pt-6 text-xs text-muted-foreground/60">
          This page uses only verified professional data. Contact details marked
          under review are retained in canonical records pending public
          verification.
        </p>
      </section>
    </Container>
  );
}
