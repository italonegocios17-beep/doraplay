import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminTitle } from "@/components/dp/admin";
import { Badge } from "@/components/dp/ui";
import { NOVELAS, brl, statusLabel } from "@/lib/catalog";

export const Route = createFileRoute("/admin/catalogo/")({
  component: () => (
    <>
      <AdminTitle sub="Lista local de prévia. Criar ou excluir títulos estará disponível com o banco de dados.">Catálogo & episódios</AdminTitle>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary text-muted-foreground"><tr><th className="p-3">Título</th><th className="p-3">Status</th><th className="p-3">Preço</th><th className="p-3">Vídeo</th><th className="p-3"><span className="sr-only">Ações</span></th></tr></thead>
          <tbody className="divide-y divide-border">
            {NOVELAS.map((n) => (
              <tr key={n.slug}>
                <td className="p-3 font-medium">{n.title}</td>
                <td className="p-3"><Badge tone={n.status === "rascunho" ? "wine" : "muted"}>{statusLabel(n.status)}</Badge></td>
                <td className="p-3">{brl(n.priceCents)}</td>
                <td className="p-3 text-muted-foreground">{n.videoUrl ? "Cadastrado" : "Não cadastrado"}</td>
                <td className="p-3 text-right"><Link to="/admin/catalogo/$slug" params={{ slug: n.slug }} className="text-primary">Editar</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ),
});
