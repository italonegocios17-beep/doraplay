import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { EmptyState, btn } from "@/components/dp/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/favoritos")({
  head: () => seo("Favoritos", "Novelas favoritas na DoraPlay (prévia)."),
  component: () => (
    <AppShell>
      <h1 className="mb-6 text-3xl md:text-4xl">Favoritos</h1>
      <EmptyState icon={<Heart className="size-6" />} title="Sua lista está vazia" action={<Link to="/explorar" className={btn()}>Descobrir novelas</Link>}>Salvar favoritos exigirá uma conta, disponível em etapa futura.</EmptyState>
    </AppShell>
  ),
});
