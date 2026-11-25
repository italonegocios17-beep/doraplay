import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Search, Clock } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { Cover } from "@/components/dp/Cover";
import { Rail } from "@/components/dp/NovelaCard";
import { Badge, EmptyState, SectionTitle, btn } from "@/components/dp/ui";
import { GROUPS, NOVELAS, brl } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Início", "Prévia da DoraPlay: descubra novelas verticais em português. Sua próxima história começa aqui."),
  component: Home,
});

function Home() {
  const featured = NOVELAS[0]!;
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <AppShell>
      <form role="search" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/explorar", search: q.trim() ? { q: q.trim() } : {} }); }} className="relative mb-6">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar novelas" placeholder="Buscar novelas, categorias…" className="h-12 w-full rounded-full border border-input bg-secondary pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
      </form>

      <section aria-labelledby="destaque" className="bg-hero relative mb-10 grid gap-6 overflow-hidden rounded-3xl border border-border p-5 md:grid-cols-[1fr_220px] md:p-10">
        <div className="flex flex-col justify-end">
          <div className="mb-3 flex flex-wrap gap-2"><Badge tone="primary">Em breve</Badge><Badge tone="wine">Rascunho</Badge></div>
          <p className="text-sm text-muted-foreground">Sua próxima história começa aqui.</p>
          <h1 id="destaque" className="mt-2 text-3xl leading-tight md:text-5xl">{featured.title}</h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">Título em preparação. Sinopse, episódios e material audiovisual ainda não foram cadastrados.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/novela/$slug" params={{ slug: featured.slug }} className={btn()}><Play className="size-4" aria-hidden />Ver detalhes</Link>
            <span className="self-center text-sm text-muted-foreground">{brl(featured.priceCents)} · {featured.priceNote.toLowerCase()}</span>
          </div>
        </div>
        <Cover novela={featured} showTitle={false} className="mx-auto hidden w-full max-w-[220px] md:block" />
      </section>

      <section className="mb-10">
        <SectionTitle>Continue assistindo</SectionTitle>
        <EmptyState icon={<Clock className="size-6" />} title="Nada por aqui ainda">Quando houver contas e vídeos, seu progresso aparecerá aqui.</EmptyState>
      </section>

      <section className="mb-10">
        <SectionTitle aside={<Link to="/explorar" className="text-sm text-primary">Ver tudo</Link>}>Lançamentos</SectionTitle>
        <Rail items={NOVELAS.filter((n) => n.isNew)} />
      </section>

      {GROUPS.map((g) => (
        <section key={g.id} className="mb-10">
          <SectionTitle aside={<Link to="/explorar" search={{ cat: g.id }} className="text-sm text-primary">Ver tudo</Link>}>{g.label}</SectionTitle>
          <Rail items={NOVELAS.filter((n) => n.groups.includes(g.id))} />
        </section>
      ))}
    </AppShell>
  );
}
