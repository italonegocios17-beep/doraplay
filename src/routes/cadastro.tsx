import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthForm } from "@/components/dp/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cadastro")({
  head: () => seo("Criar conta", "Tela de cadastro da DoraPlay (prévia, sem autenticação real)."),
  component: () => (
    <AuthForm title="Criar conta" subtitle="Cadastro visual de demonstração." submit="Criar conta"
      fields={[{ name: "nome", label: "Nome", type: "text", auto: "name" }, { name: "email", label: "E-mail", type: "email", auto: "email" }, { name: "senha", label: "Senha", type: "password", auto: "new-password" }]}
      footer={<p>Já tem conta? <Link to="/entrar" className="text-primary">Entrar</Link></p>} />
  ),
});
