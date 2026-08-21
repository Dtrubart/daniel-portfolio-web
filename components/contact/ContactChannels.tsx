import { ButtonLink } from "@/components/ui/ButtonLink";
import { publicContactConfig } from "@/data/contact";

export function ContactChannels() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Or reach out directly through these professional channels:
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink
          href={publicContactConfig.linkedin.href}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
          Connect on LinkedIn
        </ButtonLink>
        <ButtonLink
          href={publicContactConfig.github.href}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
          Explore my GitHub
        </ButtonLink>
      </div>
    </div>
  );
}
