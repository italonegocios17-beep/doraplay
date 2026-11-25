import { Lock } from "lucide-react";
import type { Novela } from "@/lib/catalog";
import { statusLabel } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** Capa abstrata original (placeholder). Nenhuma arte oficial é usada. */
export function Cover({ novela, className, showTitle = true, locked = false }: { novela: Novela; className?: string; showTitle?: boolean; locked?: boolean }) {
  const h = novela.hue;
  return (
    <div
      className={cn("relative aspect-[2/3] overflow-hidden rounded-2xl border border-border", className)}
      style={{ background: `radial-gradient(80% 60% at 70% 20%, oklch(0.62 0.2 ${h} / 0.9), transparent 70%), radial-gradient(70% 60% at 10% 90%, oklch(0.3 0.1 ${h + 20}), transparent 70%), oklch(0.16 0.02 ${h})` }}
      role="img"
      aria-label={`Capa ilustrativa abstrata de ${novela.title}`}
    >
      <svg viewBox="0 0 100 150" className="absolute inset-0 size-full opacity-40" aria-hidden>
        <circle cx="70" cy="40" r="22" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="70" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <path d="M0 120 Q50 95 100 118" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <div className="absolute left-2 top-2 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur">
        {statusLabel(novela.status)}
      </div>
      {locked && (
        <div className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background/70 backdrop-blur" aria-label="Conteúdo bloqueado">
          <Lock className="size-3.5" aria-hidden />
        </div>
      )}
      {showTitle && (
        <div className="absolute inset-x-0 bottom-0 bg-fade p-3 pt-10">
          <p className="font-display text-base leading-tight">{novela.title}</p>
        </div>
      )}
    </div>
  );
}
