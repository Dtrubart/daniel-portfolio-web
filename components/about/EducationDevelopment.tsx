import { professionalFacts } from "@/data/professional-facts";

export function EducationDevelopment() {
  return (
    <section
      id="education"
      className="border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Education & Development
        </h2>

        <div className="mt-10 space-y-10">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Formal Education
            </h3>
            <ul className="mt-3 space-y-2">
              {professionalFacts.education.map((edu) => (
                <li key={edu.id}>
                  <p className="font-medium text-foreground">{edu.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Certifications
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {professionalFacts.certifications.map((cert) => (
                <li
                  key={cert.id}
                  className="text-xs text-muted-foreground"
                >
                  {cert.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Current Development
            </h3>
            <p className="mt-2 text-sm text-muted-foreground/70">
              Areas of active learning and focus.
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {professionalFacts.currentDevelopment.map((dev) => (
                <li
                  key={dev.id}
                  className="text-xs text-muted-foreground"
                >
                  {dev.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}