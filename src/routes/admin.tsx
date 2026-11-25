import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { BadgePercent, Film, Image, LayoutDashboard, Settings, Users, ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/dp/Logo";
import { seo } from "@/lib/seo";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/catalogo", label: "Catálogo", icon: Film },
  { to: "/admin/ofertas", label: "Ofertas & preços", icon: BadgePercent },
  { to: "/admin/clientes", label: "Clientes", icon: Users },
  { to: "/admin/banners", label: "Banners", icon: Image },
  { to: "/admin/configuracoes", label: "Configurações", icon: Settings },
] as const;

export const Route = createFileRoute("/admin")({
  head: () => seo("Painel administrativo (demonstração)", "Painel administrativo demonstrativo da DoraPlay.", true),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-border bg-sidebar pt-safe md:sticky md:top-0 md:h-screen md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center gap-2 p-4"><LogoMark className="size-8" /><span className="font-display text-lg">Admin</span></div>
        <nav aria-label="Administração" className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} activeOptions={{ exact: to === "/admin" }} className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent" activeProps={{ className: "bg-sidebar-accent !text-primary" }}>
              <Icon className="size-4" aria-hidden />{label}
            </Link>
          ))}
          <Link to="/" className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground md:mt-4"><ArrowLeft className="size-4" aria-hidden />Voltar ao app</Link>
        </nav>
      </aside>
      <div className="flex-1">
        <div className="bg-wine px-4 py-2 text-center text-xs text-wine-foreground">Painel demonstrativo: sem login, sem proteção de acesso e sem salvamento de dados.</div>
        <main className="mx-auto max-w-5xl p-4 pb-safe md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
