import { professionalFacts } from "@/data/professional-facts";

export function ProfessionalProfile() {
  const identity = professionalFacts.identity;

  return (
    <section id="profile" className="pt-16 md:pt-24">
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <p className="text-sm font-medium tracking-wider text-accent uppercase">
          Industrial Engineer
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {identity.name}
        </h1>

        <p className="mt-4 text-xl font-medium leading-tight text-foreground sm:text-2xl">
          {identity.headline}
        </p>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {identity.supportingLine}
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {identity.summary}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {identity.domainTags.map((tag) => (
            <li
              key={tag}
              className="text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}