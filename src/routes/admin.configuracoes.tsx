import { createFileRoute } from "@tanstack/react-router";
import { AdminTitle, Panel, SaveButton } from "@/components/dp/admin";
import { Field, inputCls } from "@/components/dp/ui";

const INTEGRATIONS = ["Contas e banco de dados", "Streaming de vídeo", "Pagamentos Pix/cartão", "Pixel e conversões"];
export const Route = createFileRoute("/admin/configuracoes")({
  component: () => (
    <>
      <AdminTitle>Configurações</AdminTitle>
      <Panel title="Marca">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nome"><input defaultValue="DoraPlay" className={inputCls} /></Field>
          <Field label="Slogan"><input defaultValue="Sua próxima história começa aqui." className={inputCls} /></Field>
        </div>
      </Panel>
      <Panel title="Integrações (etapas futuras)">
        <ul className="space-y-2 text-sm">{INTEGRATIONS.map((i) => <li key={i} className="flex justify-between rounded-xl bg-secondary p-3">{i}<span className="text-muted-foreground">Não conectado</span></li>)}</ul>
      </Panel>
      <SaveButton />
    </>
  ),
});
