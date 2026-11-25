import { createFileRoute } from "@tanstack/react-router";
import { AdminTitle, Panel, SaveButton } from "@/components/dp/admin";
import { Field, inputCls } from "@/components/dp/ui";
import { NOVELAS } from "@/lib/catalog";

export const Route = createFileRoute("/admin/banners")({
  component: () => (
    <>
      <AdminTitle sub="Destaque exibido no topo do início.">Banners</AdminTitle>
      <Panel title="Banner principal">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título em destaque"><select defaultValue={NOVELAS[0]?.slug} className={inputCls}>{NOVELAS.map((n) => <option key={n.slug} value={n.slug}>{n.title}</option>)}</select></Field>
          <Field label="Selo"><input defaultValue="Em breve" className={inputCls} /></Field>
        </div>
      </Panel>
      <SaveButton />
    </>
  ),
});
