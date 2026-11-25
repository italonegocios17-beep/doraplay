import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Film, Lock, Play, LifeBuoy } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { Cover } from "@/components/dp/Cover";
import { Badge, Notice, btn } from "@/components/dp/ui";
import { brl, getNovela, statusLabel } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/novela/$slug")({
  loader: ({ params }) => {
    const novela = getNovela(params.slug);
    if (!novela) throw notFound();
    return { novela };
  },
  head: ({ loaderData }) =>
    loaderData ? seo(loaderData.novela.title, `${loaderData.novela.title} — ${loaderData.novela.categories.join(", ")}. Página de prévia na DoraPlay.`) : seo("Novela não encontrada", "Este título não existe.", true),
  notFoundComponent: () => (
    <AppShell><h1 className="text-3xl">Novela não encontrada</h1><Link to="/explorar" className={btn({ className: "mt-6" })}>Explorar catálogo</Link></AppShell>
  ),
  component: NovelaPage,
});

const FAQ = [
  ["Como vou assistir depois da compra?", "A forma de acesso ainda está em definição. Esta página é uma prévia."],
  ["Quais formas de pagamento serão aceitas?", "Ainda não definido. Nenhum pagamento é aceito nesta prévia."],
  ["Por quanto tempo terei acesso?", "Condições de acesso serão informadas antes do lançamento."],
];

function NovelaPage() {
  const { novela } = Route.useLoaderData();
  const media = novela.trailerUrl ?? novela.videoUrl;
  return (
    <AppShell extraBottom>
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <Cover novela={novela} locked showTitle={false} className="mx-auto w-2/3 max-w-[280px] md:w-full" />
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={novela.status === "rascunho" ? "wine" : "muted"}>{statusLabel(novela.status)}</Badge>
            {novela.categories.map((c) => <Badge key={c}>{c}</Badge>)}
          </div>
          <h1 className="mt-3 text-3xl leading-tight md:text-5xl">{novela.title}</h1>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-muted-foreground">Idioma</dt><dd className="font-medium">{novela.language}</dd></div>
            <div><dt className="text-muted-foreground">Preço</dt><dd className="font-medium text-primary">{brl(novela.priceCents)} <span className="text-xs text-muted-foreground">({novela.priceNote.toLowerCase()})</span></dd></div>
          </dl>
          <Notice className="mt-5">
            {novela.status === "rascunho"
              ? "Título em rascunho. Sinopse oficial, episódios, duração e material audiovisual ainda não foram cadastrados."
              : "Título fictício de demonstração, criado apenas para ilustrar a interface."}
          </Notice>
          <div className="mt-6 hidden gap-3 md:flex">
            <Link to="/checkout/$slug" params={{ slug: novela.slug }} className={btn({ size: "lg" })}><Lock className="size-4" aria-hidden />Desbloquear por {brl(novela.priceCents)} (prévia)</Link>
            <Link to="/assistir/$slug" params={{ slug: novela.slug }} className={btn({ variant: "outline", size: "lg" })}><Play className="size-4" aria-hidden />Abrir player</Link>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-2xl">Trailer / episódio</h2>
        {media ? <video src={media} controls className="aspect-[9/16] w-full max-w-xs rounded-2xl" /> : (
          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground"><Film className="size-6 text-primary" aria-hidden />Trailer ou episódio ainda não disponível.</div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-2xl">Sinopse</h2>
        <p className="text-muted-foreground">{novela.synopsis ?? "Sinopse oficial ainda não cadastrada."}</p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-2xl">Perguntas frequentes</h2>
        <div className="divide-y divide-border rounded-2xl border border-border">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group p-4"><summary className="cursor-pointer font-medium">{q}</summary><p className="mt-2 text-sm text-muted-foreground">{a}</p></details>
          ))}
        </div>
      </section>

      <section className="mt-10 flex items-start gap-4 rounded-2xl bg-card p-5">
        <LifeBuoy className="size-6 shrink-0 text-primary" aria-hidden />
        <div><h2 className="text-xl">Suporte</h2><p className="text-sm text-muted-foreground">Canais de atendimento ainda serão definidos. Nenhum contato está ativo nesta prévia.</p></div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <Link to="/assistir/$slug" params={{ slug: novela.slug }} className={btn({ variant: "outline", className: "px-4" })} aria-label="Abrir player"><Play className="size-4" aria-hidden /></Link>
        <Link to="/checkout/$slug" params={{ slug: novela.slug }} className={btn({ className: "flex-1" })}><Lock className="size-4" aria-hidden />Desbloquear {brl(novela.priceCents)} (prévia)</Link>
      </div>
    </AppShell>
  );
}
