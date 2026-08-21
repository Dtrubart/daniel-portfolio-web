import { Container } from "@/components/ui/Container";

interface SolutionsHeroProps {
  subtitle: string;
}

export function SolutionsHero({ subtitle }: SolutionsHeroProps) {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Solutions
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{subtitle}</p>
        <p className="mt-6 text-base text-muted-foreground">
          My work sits at the intersection of industrial engineering, data,
          business systems and operations. These solution areas show how those
          capabilities can be applied to practical organizational challenges.
        </p>
      </div>
    </Container>
  );
}