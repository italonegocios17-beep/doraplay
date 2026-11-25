import { createFileRoute } from "@tanstack/react-router";
import { AdminTitle, Panel, SaveButton } from "@/components/dp/admin";
import { Field, inputCls } from "@/components/dp/ui";
import { BUMP, COMBOS, FRONT_CENTS, UPSELL } from "@/lib/offers";
import { brl } from "@/lib/catalog";

const rows = [
  { label: "Produto principal (front)", cents: FRONT_CENTS, note: "" },
  { label: `${BUMP.label} (bump)`, cents: BUMP.cents, note: "Desmarcado por padrão" },
  { label: `${UPSELL.label} (upsell)`, cents: UPSELL.cents, note: "Só com 10+ títulos reais" },
  ...COMBOS.map((c) => ({ label: c.label, cents: c.cents, note: "" })),
];

export const Route = createFileRoute("/admin/ofertas")({
  component: () => (
    <>
      <AdminTitle sub="Valores provisórios da prévia.">Ofertas, combos & preços</AdminTitle>
      <Panel title="Preços">
        <div className="space-y-4">
          {rows.map((r) => <Field key={r.label} label={r.label} hint={r.note || `Atual: ${brl(r.cents)}`}><input defaultValue={(r.cents / 100).toFixed(2).replace(".", ",")} inputMode="decimal" className={inputCls} /></Field>)}
        </div>
      </Panel>
      <SaveButton />
    </>
  ),
});
