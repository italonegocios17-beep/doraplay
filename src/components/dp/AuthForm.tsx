import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LogoMark } from "./Logo";
import { Field, Notice, btn, inputCls } from "./ui";

type F = { name: string; label: string; type: string; auto: string };
/** Formulário apenas visual: não envia nem guarda nada. Etapa 2: ligar ao Lovable Cloud Auth. */
export function AuthForm({ title, subtitle, fields, submit, footer }: { title: string; subtitle: string; fields: F[]; submit: string; footer: ReactNode }) {
  const [tried, setTried] = useState(false);
  return (
    <div className="bg-hero flex min-h-screen items-center justify-center p-4 pt-safe pb-safe">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-background/90 p-6 backdrop-blur">
        <Link to="/" aria-label="Voltar ao início"><LogoMark className="size-11" /></Link>
        <h1 className="mt-4 text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <Notice className="mt-4">Somente interface: sem autenticação real nesta etapa. Não digite dados verdadeiros.</Notice>
        <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setTried(true); }}>
          {fields.map((f) => <Field key={f.name} label={f.label}><input name={f.name} type={f.type} autoComplete="off" className={inputCls} /></Field>)}
          <button type="submit" className={btn({ className: "w-full" })}>{submit}</button>
          {tried && <p role="status" className="text-center text-sm text-primary">Autenticação ainda não disponível nesta prévia. Nada foi enviado.</p>}
        </form>
        <div className="mt-5 space-y-2 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </div>
  );
}
