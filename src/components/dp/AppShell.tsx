import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Compass, Heart, Home, Library, User } from "lucide-react";
import { Logo } from "./Logo";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/explorar", label: "Explorar", icon: Compass },
  { to: "/minhas-novelas", label: "Minhas novelas", icon: Library },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function AppShell({ children, extraBottom = false }: { children: ReactNode; extraBottom?: boolean }) {
  return (
    <div className="min-h-screen">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2">Pular para o conteúdo</a>
      <div className="bg-wine px-4 py-1.5 text-center text-xs text-wine-foreground pt-safe">
        Prévia da interface — títulos de demonstração, sem compras ou contas reais.
      </div>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-8">
          <Logo />
          <nav aria-label="Principal" className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground" activeProps={{ className: "bg-secondary !text-foreground" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/entrar" className={btn({ variant: "outline", size: "sm" })}>Entrar</Link>
        </div>
      </header>
      <main id="conteudo" className={cn("mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-8 md:pb-16", extraBottom && "pb-48")}>{children}</main>
      <footer className="hidden border-t border-border py-8 text-center text-xs text-muted-foreground md:block">
        DoraPlay · Sua próxima história começa aqui. · Prévia — Etapa 1
      </footer>
      <nav aria-label="Navegação inferior" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur pb-safe md:hidden">
        <ul className="grid grid-cols-5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link to={to} activeOptions={{ exact: to === "/" }} className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-muted-foreground" activeProps={{ className: "!text-primary" }}>
                <Icon className="size-5" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
