import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthForm } from "@/components/dp/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => seo("Recuperar senha", "Tela de recuperação de senha da DoraPlay (prévia)."),
  component: () => (
    <AuthForm title="Recuperar senha" subtitle="Nenhum e-mail será enviado nesta prévia." submit="Enviar link"
      fields={[{ name: "email", label: "E-mail", type: "email", auto: "email" }]}
      footer={<p><Link to="/entrar" className="text-primary">Voltar para entrar</Link></p>} />
  ),
});
