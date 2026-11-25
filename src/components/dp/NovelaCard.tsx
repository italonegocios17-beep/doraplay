import { Link } from "@tanstack/react-router";
import type { Novela } from "@/lib/catalog";
import { brl } from "@/lib/catalog";
import { Cover } from "./Cover";

export function NovelaCard({ novela }: { novela: Novela }) {
  return (
    <Link to="/novela/$slug" params={{ slug: novela.slug }} className="group block" aria-label={`${novela.title}, ${brl(novela.priceCents)}`}>
      <Cover novela={novela} locked className="transition-transform group-hover:-translate-y-1 group-hover:shadow-glow" />
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="truncate text-muted-foreground">{novela.categories.slice(0, 2).join(" · ")}</span>
        <span className="shrink-0 font-semibold text-primary">{brl(novela.priceCents)}</span>
      </div>
    </Link>
  );
}

export function Rail({ items }: { items: Novela[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:-mx-8 md:px-8">
      {items.map((n) => (
        <div key={n.slug} className="w-[38%] shrink-0 snap-start sm:w-[26%] md:w-44 lg:w-48">
          <NovelaCard novela={n} />
        </div>
      ))}
    </div>
  );
}
