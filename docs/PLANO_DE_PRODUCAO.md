# Plano de produção — DoraPlay

> **Avisos:** o título **"A Luna Traída que se Tornou a Rainha dos Lobos"** é **rascunho** e os preços atuais (R$ 9,90 front; bump 2 títulos R$ 9,90; upsell 10 títulos R$ 29,90; combos 3 = R$ 19,90 e 5 = R$ 29,90) são **provisórios**. **Confirmar com o fornecedor os direitos de distribuição/exibição antes de vender ou publicar.** Nenhuma sinopse, episódio, duração, métrica ou credencial deve ser inventada.

Ver também: [Mapa de páginas](./MAPA_DE_PAGINAS.md).

## Etapa 2 — Produto funcional (pendente, por subetapas)

### 2.1 Autenticação, banco e RLS
- Lovable Cloud Auth (e-mail/senha, Google), sem cadastro anônimo, confirmação de e-mail.
- Tabelas: `profiles`, `user_roles` (papéis separados, nunca em metadados editáveis), `novelas`, `media`, `offers`, `orders`, `order_items`, `entitlements` (direitos de acesso), `favorites`, `watch_progress`, `banners`.
- RLS em todas as tabelas: cliente lê só os próprios dados; escrita administrativa só via papel `admin` verificado por função `has_role`.
- Substituir `src/lib/catalog.ts` e `src/lib/offers.ts` por consultas (ponto único de troca).

### 2.2 CRUD de catálogo
- Painel com criar/editar/publicar/despublicar títulos, capas (storage), categorias, preços.
- Estados: rascunho → pronto → publicado; publicar exige confirmação de direitos registrada.

### 2.3 Bunny Stream com validação de acesso
- Vídeo único completo por título; upload/gestão pelo painel.
- Reprodução só com URL/token assinado gerado no servidor após checar `entitlements` do usuário; expiração curta.
- Chaves do Bunny apenas como segredos do servidor.

### 2.4 Pagamentos Pix/cartão
- Gateway a definir; nenhum dado de cartão trafega pelo nosso servidor (tokenização do gateway).
- Pedido criado no servidor com preço recalculado a partir do banco (nunca do cliente).
- Webhook público com verificação de assinatura; idempotência por ID do evento e do pedido (tabela de eventos processados, chave única).
- Liberação de `entitlements` somente após confirmação via webhook; reembolso/estorno revoga acesso.
- Páginas `/minhas-compras` e `/pedido/:id`.

### 2.5 Gestão administrativa
- `/admin/entrar`, guarda de papel em todo `/admin/*`.
- `/admin/pedidos`, `/admin/relatorios` (somente dados reais), `/admin/usuarios`, `/admin/suporte`.
- Registro de auditoria das ações administrativas.

### 2.6 Meta Pixel / CAPI
- Pixel no navegador somente após consentimento de cookies.
- CAPI no servidor para `Purchase` disparado pelo webhook confirmado; deduplicação por `event_id` compartilhado com o Pixel.
- Token de acesso como segredo do servidor; dados pessoais com hash SHA-256.

### 2.7 LGPD
- Páginas `/termos-de-uso`, `/privacidade`, `/cookies` com textos aprovados juridicamente.
- Banner de consentimento; registro de consentimento.
- Solicitação de exportação e exclusão de dados pelo titular; minimização de dados; retenção definida.

## Etapa 3 — Preparação de lançamento (pendente)
- Confirmação documental dos direitos de cada título com o fornecedor.
- Preços finais aprovados; sinopses e materiais oficiais fornecidos.
- Testes ponta a ponta: cadastro, compra Pix e cartão (sandbox), webhook repetido (idempotência), reprodução com e sem direito, acesso negado ao admin para não-admin.
- Revisão de segurança (scanner, RLS), desempenho e acessibilidade.
- Domínio, e-mails transacionais, monitoramento; publicação apenas após aprovação.
