import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdminTitle, Panel, SaveButton } from "@/components/dp/admin";
import { Field, Notice, inputCls } from "@/components/dp/ui";
import { GROUPS, getNovela } from "@/lib/catalog";

export const Route = createFileRoute("/admin/catalogo/$slug")({
  loader: ({ params }) => { const novela = getNovela(params.slug); if (!novela) throw notFound(); return { novela }; },
  component: Edit,
});

function Edit() {
  const { novela } = Route.useLoaderData();
  return (
    <>
      <Link to="/admin/catalogo" className="text-sm text-muted-foreground">← Catálogo</Link>
      <AdminTitle sub="Edição de demonstração">Editar título</AdminTitle>
      <Notice className="mb-6">Alterações não são salvas: a persistência ainda não existe nesta etapa.</Notice>
      <Panel title="Informações">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título"><input defaultValue={novela.title} className={inputCls} /></Field>
          <Field label="Slug"><input defaultValue={novela.slug} className={inputCls} /></Field>
          <Field label="Preço (R$)"><input defaultValue={(novela.priceCents / 100).toFixed(2).replace(".", ",")} className={inputCls} inputMode="decimal" /></Field>
          <Field label="Idioma"><input defaultValue={novela.language} className={inputCls} /></Field>
          <Field label="Status"><select defaultValue={novela.status} className={inputCls}><option value="rascunho">Rascunho</option><option value="demonstracao">Demonstração</option></select></Field>
          <Field label="Grupo principal"><select defaultValue={novela.groups[0]} className={inputCls}>{GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}</select></Field>
        </div>
        <div className="mt-4"><Field label="Sinopse"><textarea defaultValue={novela.synopsis ?? ""} placeholder="Sinopse oficial ainda não cadastrada" rows={4} className={`${inputCls} h-auto py-3`} /></Field></div>
      </Panel>
      <Panel title="Vídeo & episódios">
        <p className="text-sm text-muted-foreground">Nenhum vídeo cadastrado. O envio de vídeo completo será habilitado com a integração de streaming em etapa futura.</p>
        <button type="button" disabled className="mt-3 rounded-full border border-border px-4 py-2 text-sm opacity-50">Enviar vídeo (indisponível)</button>
      </Panel>
      <SaveButton />
    </>
  );
}
