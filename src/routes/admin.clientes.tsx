import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { AdminTitle } from "@/components/dp/admin";
import { EmptyState } from "@/components/dp/ui";

export const Route = createFileRoute("/admin/clientes")({
  component: () => (
    <>
      <AdminTitle>Clientes</AdminTitle>
      <EmptyState icon={<Users className="size-6" />} title="Nenhum cliente">Clientes aparecerão aqui quando contas reais existirem.</EmptyState>
    </>
  ),
});
