import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, User } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { Notice, btn } from "@/components/dp/ui";
import { seo } from "@/lib/seo";

const LINKS = [
  { to: "/minhas-novelas", label: "Minhas novelas" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/historico", label: "Histórico" },
  { to: "/recuperar-senha", label: "Recuperar senha" },
  { to: "/admin", label: "Painel administrativo (demonstração)" },
] as const;

export const Route = createFileRoute("/perfil")({
  head: () => seo("Perfil", "Seu perfil na DoraPlay (prévia)."),
  component: () => (
    <AppShell>
      <div className="flex items-center gap-4">
        <div className="grid size-16 place-items-center rounded-full bg-brand"><User className="size-7" aria-hidden /></div>
        <div><h1 className="text-3xl">Visitante</h1><p className="text-sm text-muted-foreground">Você não está conectado.</p></div>
      </div>
      <Notice className="mt-6">Contas reais ainda não existem nesta etapa. As telas abaixo são apenas visuais.</Notice>
      <div className="mt-6 flex gap-3"><Link to="/entrar" className={btn()}>Entrar</Link><Link to="/cadastro" className={btn({ variant: "outline" })}>Criar conta</Link></div>
      <ul className="mt-8 divide-y divide-border rounded-2xl border border-border">
        {LINKS.map((l) => <li key={l.to}><Link to={l.to} className="flex items-center justify-between p-4 hover:bg-secondary">{l.label}<ChevronRight className="size-4 text-muted-foreground" aria-hidden /></Link></li>)}
      </ul>
    </AppShell>
  ),
});
