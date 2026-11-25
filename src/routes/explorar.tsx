import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { AppShell } from "@/components/dp/AppShell";
import { NovelaCard } from "@/components/dp/NovelaCard";
import { EmptyState, inputCls } from "@/components/dp/ui";
import { GROUPS, NOVELAS, type GroupId } from "@/lib/catalog";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type S = { q?: string; cat?: GroupId };
export const Route = createFileRoute("/explorar")({
  validateSearch: (s: Record<string, unknown>): S => ({
    ...(typeof s["q"] === "string" && s["q"] ? { q: s["q"] } : {}),
    ...(GROUPS.some((g) => g.id === s["cat"]) ? { cat: s["cat"] as GroupId } : {}),
  }),
  head: () => seo("Explorar catálogo", "Explore e filtre o catálogo de novelas verticais da DoraPlay por categoria."),
  component: Explorar,
});

const chip = "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors";

function Explorar() {
  const { q, cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/explorar" });
  const term = (q ?? "").toLowerCase();
  const list = NOVELAS.filter((n) => (!cat || n.groups.includes(cat)) && (!term || `${n.title} ${n.categories.join(" ")}`.toLowerCase().includes(term)));
  return (
    <AppShell>
      <h1 className="text-3xl md:text-4xl">Explorar</h1>
      <p className="mt-1 text-sm text-muted-foreground">Catálogo de prévia: um título em rascunho e títulos fictícios de demonstração.</p>
      <input type="search" defaultValue={q ?? ""} aria-label="Buscar no catálogo" placeholder="Buscar…" className={cn(inputCls, "mt-5 rounded-full")}
        onChange={(e) => navigate({ search: (p) => { const v = e.target.value.trim(); const { q: _q, ...rest } = p; return v ? { ...rest, q: v } : rest; }, replace: true })} />
      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Filtrar por categoria">
        <Link to="/explorar" search={(p) => { const { cat: _c, ...rest } = p; return rest; }} aria-pressed={!cat} className={cn(chip, !cat ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>Todas</Link>
        {GROUPS.map((g) => (
          <Link key={g.id} to="/explorar" search={(p) => ({ ...p, cat: g.id })} aria-pressed={cat === g.id} className={cn(chip, cat === g.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>{g.label}</Link>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? "título" : "títulos"}</p>
      {list.length ? (
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{list.map((n) => <NovelaCard key={n.slug} novela={n} />)}</div>
      ) : (
        <div className="mt-4"><EmptyState icon={<SearchX className="size-6" />} title="Nenhum título encontrado">Tente outro termo ou categoria.</EmptyState></div>
      )}
    </AppShell>
  );
}
