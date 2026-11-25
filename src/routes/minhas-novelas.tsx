import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Library } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { EmptyState, SectionTitle, btn } from "@/components/dp/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/minhas-novelas")({
  head: () => seo("Minhas novelas", "Suas novelas desbloqueadas e progresso na DoraPlay (prévia)."),
  component: () => (
    <AppShell>
      <h1 className="mb-6 text-3xl md:text-4xl">Minhas novelas</h1>
      <section className="mb-10"><SectionTitle>Desbloqueadas</SectionTitle>
        <EmptyState icon={<Library className="size-6" />} title="Nenhuma novela ainda" action={<Link to="/explorar" className={btn()}>Explorar catálogo</Link>}>Compras ainda não estão disponíveis nesta prévia.</EmptyState></section>
      <section className="mb-10"><SectionTitle>Continue assistindo</SectionTitle>
        <EmptyState icon={<Clock className="size-6" />} title="Sem progresso salvo">O progresso será registrado quando houver contas e vídeos.</EmptyState></section>
      <Link to="/historico" className="text-sm text-primary">Ver histórico</Link>
    </AppShell>
  ),
});
