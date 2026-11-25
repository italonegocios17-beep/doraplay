import { createFileRoute } from "@tanstack/react-router";
import { AdminTitle, Panel } from "@/components/dp/admin";
import { EmptyState } from "@/components/dp/ui";
import { BarChart3 } from "lucide-react";

const KPIS = ["Vendas", "Receita", "Clientes", "Títulos publicados"];
export const Route = createFileRoute("/admin/")({
  component: () => (
    <>
      <AdminTitle sub="Sem dados: nenhuma venda ou cliente real existe ainda.">Dashboard</AdminTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {KPIS.map((k) => <div key={k} className="rounded-2xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-1 text-2xl font-semibold">—</p><p className="text-xs text-muted-foreground">sem dados</p></div>)}
      </div>
      <Panel title="Vendas recentes"><EmptyState icon={<BarChart3 className="size-6" />} title="Nenhuma venda registrada">Os dados aparecerão após a integração de pagamentos.</EmptyState></Panel>
    </>
  ),
});
