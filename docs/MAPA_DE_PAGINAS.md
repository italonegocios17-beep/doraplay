# Mapa de páginas — DoraPlay

> **Status:** todas as rotas existentes são **prévias visuais sem backend**. Não há autenticação, banco de dados, pagamentos, vídeos nem persistência. Dados vêm de módulos locais (`src/lib/catalog.ts`, `src/lib/offers.ts`).
>
> O título **"A Luna Traída que se Tornou a Rainha dos Lobos"** está em **rascunho** e todos os preços são **provisórios**. Direitos de distribuição/exibição devem ser confirmados com o fornecedor antes de vender ou publicar.

## 1. Rotas existentes (prévia)

### Aplicativo público
| Rota | Arquivo | Descrição | Dependências futuras |
|---|---|---|---|
| `/` | `src/routes/index.tsx` | Início: busca, destaque, carrosséis, categorias, "Continue assistindo" vazio | Catálogo no banco, banners, progresso do usuário |
| `/explorar` | `src/routes/explorar.tsx` | Catálogo com busca e filtro por categoria | Catálogo no banco |
| `/novela/:slug` | `src/routes/novela.$slug.tsx` | Detalhe: capa, trailer placeholder, sinopse, preço, CTA, FAQ/suporte | Catálogo, mídia (Bunny), direito de acesso, preços |
| `/oferta/:slug` | `src/routes/oferta.$slug.tsx` | Upsell 10 títulos (indisponível até catálogo real) | Ofertas, catálogo real, pagamentos |
| `/checkout/:slug` | `src/routes/checkout.$slug.tsx` | Checkout de prévia, bump desmarcado, combos; sem pagamento | Auth, gateway Pix/cartão, pedidos, webhooks |

### Área do membro
| Rota | Arquivo | Descrição | Dependências futuras |
|---|---|---|---|
| `/minhas-novelas` | `src/routes/minhas-novelas.tsx` | Títulos adquiridos (vazio) | Auth, pedidos/direitos de acesso |
| `/favoritos` | `src/routes/favoritos.tsx` | Favoritos (vazio) | Auth, tabela de favoritos |
| `/historico` | `src/routes/historico.tsx` | Histórico (vazio) | Auth, progresso de reprodução |
| `/perfil` | `src/routes/perfil.tsx` | Perfil (visual) | Auth, perfis |
| `/assistir/:slug` | `src/routes/assistir.$slug.tsx` | Player 9:16, "vídeo não cadastrado" | Auth, direito de acesso, Bunny Stream (URL assinada) |

### Autenticação (apenas UI)
| Rota | Arquivo | Dependências futuras |
|---|---|---|
| `/entrar` | `src/routes/entrar.tsx` | Lovable Cloud Auth |
| `/cadastro` | `src/routes/cadastro.tsx` | Lovable Cloud Auth, aceite de termos (LGPD) |
| `/recuperar-senha` | `src/routes/recuperar-senha.tsx` | Lovable Cloud Auth, e-mail transacional, página de redefinição |

### Painel administrativo (demonstrativo, **sem proteção de acesso**)
| Rota | Arquivo | Dependências futuras |
|---|---|---|
| `/admin` (layout) | `src/routes/admin.tsx` | Guarda de papel admin (`user_roles`) |
| `/admin/` | `src/routes/admin.index.tsx` | Pedidos/vendas reais para métricas |
| `/admin/catalogo` | `src/routes/admin.catalogo.index.tsx` | CRUD de catálogo |
| `/admin/catalogo/:slug` | `src/routes/admin.catalogo.$slug.tsx` | CRUD, upload Bunny, storage de capas |
| `/admin/ofertas` | `src/routes/admin.ofertas.tsx` | Tabela de ofertas/preços |
| `/admin/clientes` | `src/routes/admin.clientes.tsx` | Perfis, pedidos |
| `/admin/banners` | `src/routes/admin.banners.tsx` | Tabela de banners, storage |
| `/admin/configuracoes` | `src/routes/admin.configuracoes.tsx` | Configurações, segredos de integrações |

Componentes compartilhados: `src/components/dp/` (AppShell, Cover, NovelaCard, AuthForm, admin, ui, Logo). Raiz: `src/routes/__root.tsx`.

## 2. Rotas futuras a criar

### Área do cliente
| Rota | Finalidade | Dependências |
|---|---|---|
| `/minhas-compras` | Lista de pedidos do cliente | Auth, tabela `orders` com RLS |
| `/pedido/:id` | Status do pedido (Pix pendente/pago, cartão) | Auth, `orders`, webhooks do gateway |
| `/ajuda` | Central de ajuda / contato | Conteúdo definido, canal de suporte |
| `/termos-de-uso` | Termos de uso | Texto jurídico aprovado |
| `/privacidade` | Política de privacidade (LGPD) | Texto jurídico aprovado, inventário de dados |
| `/cookies` | Política de cookies e consentimento | Banner de consentimento, Meta Pixel condicionado |

### Painel
| Rota | Finalidade | Dependências |
|---|---|---|
| `/admin/entrar` | Login administrativo | Auth, papel `admin` em `user_roles` |
| `/admin/pedidos` | Pedidos, status, reembolsos | `orders`, webhooks, gateway |
| `/admin/relatorios` | Relatórios de vendas reais | `orders` pagos (nunca métricas inventadas) |
| `/admin/usuarios` | Usuários e papéis | `profiles`, `user_roles`, função privilegiada no servidor |
| `/admin/suporte` | Tickets/atendimento | Tabela de tickets ou integração de suporte |
