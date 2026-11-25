import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/dp/AppShell";
import { Badge, Notice, btn } from "@/components/dp/ui";
import { NOVELAS, brl, getNovela } from "@/lib/catalog";
import { UPSELL, canOfferUpsell } from "@/lib/offers";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/oferta/$slug")({
  loader: ({ params }) => { const novela = getNovela(params.slug); if (!novela) throw notFound(); return { novela }; },
  head: () => seo("Oferta especial (prévia)", "Prévia visual da oferta pós-checkout da DoraPlay.", true),
  component: Oferta,
});

function Oferta() {
  const { novela } = Route.useLoaderData();
  const realTitles = NOVELAS.filter((n) => n.status !== "demonstracao").length;
  const available = canOfferUpsell(realTitles);
  return (
    <AppShell>
      <Notice>Prévia da etapa de oferta. Nenhuma compra foi realizada ou confirmada.</Notice>
      <section className="bg-hero mt-6 rounded-3xl border border-border p-6 text-center md:p-12">
        <Badge tone="primary">Oferta única</Badge>
        <h1 className="mt-4 text-3xl md:text-5xl">{UPSELL.label} por {brl(UPSELL.cents)}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          {available ? "Amplie sua coleção com 10 títulos do catálogo." : `Indisponível: esta oferta só será exibida quando houver ao menos ${UPSELL.titles} títulos reais no catálogo.`}
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button type="button" disabled className={btn({ size: "lg" })}>Aceitar oferta (indisponível)</button>
          <Link to="/novela/$slug" params={{ slug: novela.slug }} className="text-sm text-muted-foreground underline">Voltar para a novela</Link>
        </div>
      </section>
    </AppShell>
  );
}
