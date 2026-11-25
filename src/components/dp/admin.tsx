import { useState, type ReactNode } from "react";
import { btn } from "./ui";

export function AdminTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return <div className="mb-6"><h1 className="text-3xl">{children}</h1>{sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}</div>;
}
export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mb-6 rounded-2xl border border-border bg-card p-5"><h2 className="mb-4 text-xl">{title}</h2>{children}</section>;
}
/** Botão de salvar que avisa honestamente que não há persistência. */
export function SaveButton() {
  const [msg, setMsg] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => setMsg(true)} className={btn()}>Salvar alterações</button>
      {msg && <p role="status" className="text-sm text-primary">Nada foi salvo: a persistência ainda não existe nesta etapa.</p>}
    </div>
  );
}
