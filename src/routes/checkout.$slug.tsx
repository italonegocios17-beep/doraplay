import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, QrCode } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { Cover } from "@/components/dp/Cover";
import { Notice, btn } from "@/components/dp/ui";
import { brl, getNovela } from "@/lib/catalog";
import { BUMP, COMBOS, checkoutTotal } from "@/lib/offers";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/checkout/$slug")({
  loader: ({ params }) => { const novela = getNovela(params.slug); if (!novela) throw notFound(); return { novela }; },
  head: () => seo("Checkout (prévia)", "Prévia visual do checkout DoraPlay. Nenhum pagamento é aceito.", true),
  component: Checkout,
});

function Checkout() {
  const { novela } = Route.useLoaderData();
  const [bump, setBump] = useState<boolean>(BUMP.defaultChecked);
  return (
    <AppShell>
      <h1 className="text-3xl md:text-4xl">Checkout <span className="text-primary">(prévia)</span></h1>
      <Notice className="mt-4">Esta tela é apenas visual. Nenhum pagamento é aceito e nenhum dado de cartão ou documento é solicitado.</Notice>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="flex gap-4 rounded-2xl bg-card p-4">
            <Cover novela={novela} showTitle={false} className="w-20 shrink-0" />
            <div><p className="font-display text-lg leading-tight">{novela.title}</p><p className="mt-1 text-primary">{brl(novela.priceCents)}</p></div>
          </div>
          <label className="flex cursor-pointer gap-3 rounded-2xl border-2 border-dashed border-primary/50 p-4">
            <input type="checkbox" checked={bump} onChange={(e) => setBump(e.target.checked)} className="mt-1 size-5 accent-primary" />
            <span><span className="font-semibold">{BUMP.label} por {brl(BUMP.cents)}</span><span className="block text-sm text-muted-foreground">Opcional. Títulos seriam escolhidos do catálogo disponível no futuro.</span></span>
          </label>
          <div>
            <h2 className="mb-3 text-xl">Combos (prévia)</h2>
            <div className="grid grid-cols-2 gap-3">
              {COMBOS.map((c) => <div key={c.id} className="rounded-2xl border border-border p-4"><p className="font-semibold">{c.label}</p><p className="text-primary">{brl(c.cents)}</p></div>)}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Forma de pagamento</h2>
            <div className="grid grid-cols-2 gap-3">
              {[["Pix", QrCode], ["Cartão", CreditCard]].map(([l, I]) => { const Icon = I as typeof QrCode; return (
                <div key={l as string} aria-disabled className="flex items-center gap-3 rounded-2xl border border-border p-4 opacity-60"><Icon className="size-5" aria-hidden />{l as string}<span className="ml-auto text-xs">indisponível</span></div>); })}
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-2xl bg-card p-5">
          <h2 className="text-xl">Resumo</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Título principal</dt><dd>{brl(novela.priceCents)}</dd></div>
            {bump && <div className="flex justify-between"><dt>{BUMP.label}</dt><dd>{brl(BUMP.cents)}</dd></div>}
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold"><dt>Total (ilustrativo)</dt><dd>{brl(checkoutTotal(bump))}</dd></div>
          </dl>
          <button type="button" disabled className={btn({ className: "mt-5 w-full" })}>Pagamento indisponível na prévia</button>
          <Link to="/oferta/$slug" params={{ slug: novela.slug }} className={btn({ variant: "outline", className: "mt-3 w-full" })}>Ver tela de oferta seguinte (prévia)</Link>
        </aside>
      </div>
    </AppShell>
  );
}
