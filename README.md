# TurboNest

Boilerplate pessoal para aplicações fullstack de alta escalabilidade, segurança e design minimalista.

TurboNest foi concebido como um acelerador de produto para partir da fundação técnica certa desde o início: autenticação segura, separação clara de responsabilidades, monorepo organizado, tipagem consistente entre frontend e backend e uma base preparada para evoluir para produtos reais.

## Visão Geral

TurboNest é um boilerplate fullstack baseado em monorepo, com foco em velocidade de desenvolvimento sem sacrificar arquitetura.

Ele combina:

- `Turborepo` para orquestração do monorepo
- `NestJS` como backend modular e escalável
- `Next.js` como frontend moderno e performático
- `Prisma` como ORM tipado para acesso a dados

O objetivo é servir como fundação padrão para novos produtos, reduzindo tempo de setup, padronizando decisões técnicas e elevando a qualidade estrutural desde a primeira entrega.

## Arquitetura & Stack

O boilerplate foi desenhado para uma arquitetura moderna, segura e extensível.

### Backend

- `NestJS`
- `Prisma ORM`
- `PostgreSQL` com foco em uso com `Neon`
- `JWT` para autenticação
- `ValidationPipe` e DTOs para validação de entrada

### Frontend

- `Next.js`
- `TypeScript`
- `Tailwind CSS`
- autenticação baseada em `cookies HttpOnly`

### Segurança e comunicação

- JWT emitido pelo backend
- persistência de sessão via `HttpOnly cookies`
- proteção de rotas no backend com guards
- proteção de navegação no frontend com middleware/proxy
- contratos tipados entre camadas sempre que possível

## Estrutura do Monorepo

```text
apps/
  api/   -> aplicação backend em NestJS
  web/   -> aplicação frontend em Next.js

packages/
  contracts/ -> tipos e contratos compartilhados entre apps
  ui/        -> componentes reutilizáveis e base de design system
  config/    -> presets compartilhados de lint, format e convenções
```

### `apps/api`

Responsável pela API principal da plataforma.

Exemplos de responsabilidades:

- autenticação e autorização
- integração com banco de dados
- módulos de domínio
- documentação OpenAPI/Swagger
- health checks e observabilidade

### `apps/web`

Responsável pela interface principal da aplicação.

Exemplos de responsabilidades:

- login e cadastro
- consumo da API via route handlers e camada de cliente
- gerenciamento de sessão
- páginas protegidas
- experiência visual e fluxo do produto

### `packages/*`

As pastas em `packages/` existem para evitar duplicação e consolidar padrões técnicos entre aplicações do monorepo.

Objetivos:

- compartilhar contratos entre frontend e backend
- centralizar componentes visuais
- reaproveitar regras de lint, format e configuração
- facilitar a criação de novos apps no ecossistema

## Segurança

Segurança é tratada como fundação, não como complemento.

O boilerplate adota:

- `JWT Guards` para proteção de rotas autenticadas
- `Decorators customizados` para extração do usuário autenticado de forma limpa
- `DTOs` para validação e saneamento de payloads de entrada
- `HttpOnly cookies` para reduzir exposição do token no client
- separação entre dados públicos do usuário e dados sensíveis
- estrutura voltada para evitar vazamento de hash de senha em respostas e fluxos indevidos

Esse modelo reduz acoplamento, melhora auditabilidade e prepara a base para evolução futura com RBAC, refresh tokens, rate limiting e provedores externos de autenticação.

## Guia de Setup

### 1. Instalação

Na raiz do monorepo:

```bash
npm install
```

### 2. Variáveis de ambiente

Use o arquivo de exemplo como base:

```bash
cp .env.example .env
```

No Windows PowerShell, se preferir:

```powershell
Copy-Item .env.example .env
```

Preencha as variáveis necessárias, principalmente:

- `DATABASE_URL`
- `JWT_SECRET`

Se o projeto estiver usando `apps/api/.env` como fonte principal do backend, replique as variáveis obrigatórias nesse arquivo conforme a estratégia adotada pelo ambiente local.

### 3. Banco de dados

Configure uma instância PostgreSQL, preferencialmente no `Neon`, e aponte a `DATABASE_URL` para ela.

### 4. Ambiente de desenvolvimento

Suba o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Fluxos normalmente esperados:

- frontend em `http://localhost:3000`
- backend em `http://localhost:3001`
- documentação da API em `http://localhost:3001/api/docs`

## Fluxo de Trabalho

O repositório segue um fluxo simples e disciplinado para manter clareza histórica e facilitar code review.

### Branches

Crie branches por responsabilidade:

- `feat/...` para novas funcionalidades
- `fix/...` para correções
- `refactor/...` para melhorias estruturais
- `chore/...` para manutenção e ajustes operacionais

Exemplos:

- `feat/web-auth-flow`
- `refactor/api-architecture`
- `fix/api-jwt-config`

### Commits

Prefira mensagens curtas, objetivas e prefixadas pelo escopo afetado:

- `feat(api): add jwt auth guards`
- `fix(web): persist session with httpOnly cookie`
- `refactor(api): decouple users service from auth dto`

Esse padrão melhora leitura do histórico, facilita troubleshooting e dá contexto imediato sobre impacto e área alterada.

## Roadmap

Os próximos módulos estratégicos previstos para o boilerplate são:

### Jurimetria

Base para ingestão, processamento e organização de documentos jurídicos, com foco em automação e análise estruturada.

Possíveis evoluções:

- upload e parsing de PDFs
- pipelines de processamento
- indexação e armazenamento estruturado
- preparação para analytics e IA aplicada

### SpecFlow

Módulo voltado à gestão de especificações e fluxo interno de produto.

Possíveis evoluções:

- CRUD de especificações
- organização por projeto
- histórico de alterações
- estrutura para operação interna da própria agência

## Princípios do Boilerplate

TurboNest existe para sustentar produtos reais com uma base técnica previsível.

Os pilares são:

- arquitetura limpa
- segurança por padrão
- experiência de desenvolvimento consistente
- reuso inteligente entre aplicações
- clareza para escalar equipe, código e produto

## Licença

MIT
