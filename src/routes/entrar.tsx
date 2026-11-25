import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthForm } from "@/components/dp/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/entrar")({
  head: () => seo("Entrar", "Tela de login da DoraPlay (prévia, sem autenticação real)."),
  component: () => (
    <AuthForm title="Entrar" subtitle="Sua próxima história começa aqui." submit="Entrar"
      fields={[{ name: "email", label: "E-mail", type: "email", auto: "email" }, { name: "senha", label: "Senha", type: "password", auto: "current-password" }]}
      footer={<><p><Link to="/recuperar-senha" className="text-primary">Esqueci minha senha</Link></p><p>Não tem conta? <Link to="/cadastro" className="text-primary">Criar conta</Link></p></>} />
  ),
});
