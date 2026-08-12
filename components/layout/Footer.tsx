import Link from "next/link";

import { nav, siteName } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-7 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {year} {siteName}.</p>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:underline"
                    prefetch
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
