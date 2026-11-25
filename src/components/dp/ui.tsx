import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-glow hover:brightness-110",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        wine: "bg-wine text-wine-foreground hover:brightness-125",
      },
      size: { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-sm", lg: "h-13 px-7 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Badge({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "primary" | "wine" }) {
  const tones = { muted: "bg-secondary text-muted-foreground", primary: "bg-primary text-primary-foreground", wine: "bg-wine text-wine-foreground" };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide", tones[tone])}>{children}</span>;
}

export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="note" className={cn("flex gap-3 rounded-2xl border border-primary/30 bg-wine/40 p-4 text-sm text-wine-foreground", className)}>
      <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

export function EmptyState({ icon, title, children, action }: { icon: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-border px-6 py-12 text-center">
      <div className="mb-4 grid size-14 place-items-center rounded-full bg-secondary text-primary">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {children && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <h2 className="text-2xl md:text-3xl">{children}</h2>
      {aside}
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}
export const inputCls = "h-11 w-full rounded-xl border border-input bg-secondary px-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none";
