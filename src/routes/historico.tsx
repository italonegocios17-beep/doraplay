import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { EmptyState } from "@/components/dp/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/historico")({
  head: () => seo("Histórico", "Histórico de visualização na DoraPlay (prévia)."),
  component: () => (
    <AppShell>
      <h1 className="mb-6 text-3xl md:text-4xl">Histórico</h1>
      <EmptyState icon={<History className="size-6" />} title="Nenhum histórico">O que você assistir aparecerá aqui em uma etapa futura.</EmptyState>
    </AppShell>
  ),
});
