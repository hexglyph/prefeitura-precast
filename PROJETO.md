# Documento de Projeto de Software - PRODAM Precast

## 1. Informações Gerais
- Título do Projeto: PRODAM Precast - Plataforma Inteligente de Gestão Municipal com IA
- Versão do Documento: 1.0
- Data: 05/09/2025
- Responsável: Daniel Niemietz Braz
- Público-alvo: Equipes técnicas, áreas de negócios, stakeholders de tecnologia e inovação, órgãos públicos, e parceiros interessados em integrar soluções de IA para gestão municipal.

## 2. Sumário
Informações Gerais
Sumário Executivo
Escopo do Projeto
Objetivos do Projeto
Introdução e Contexto
Análise
Requisitos Funcionais
Requisitos Não Funcionais
Métricas de Qualidade
Arquitetura e Design
- 11.1 Visão Geral
- 11.2 Componentes da Arquitetura
- 11.3 Fluxo de Dados
- 11.4 Modelo de Dados (Logical Data Model)
- 11.5 Regras de Validação
Extensibilidade e Versionamento
Plano de Desenvolvimento
Plano de Testes
Gestão de Riscos
Plano de Implantação
Manutenção e Suporte
Orçamento e Custos
Critérios de Sucesso
Pós-Entrega
Fora de Escopo

## 3. Sumário Executivo
O PRODAM Precast é uma plataforma web e conjunto de APIs para suporte à gestão municipal com recursos de IA. Oferece painel operacional com KPIs, consultas contextuais via IA (chat), ingestão de dados públicos (ex.: ObservaSampa), previsões e análises, além de integrações REST para sistemas e portais.

Utilizando Processamento de Linguagem Natural (PLN), consultas contextuais e integração com fontes de dados oficiais, o Precast disponibiliza endpoints e componentes prontos para embutir em portais, além de um painel com dashboards, alertas e relatórios assistidos por IA.

O produto endereça desafios de:
- Consolidação e exploração de dados municipais em uma visão única.
- Respostas contextuais e insights para tomada de decisão.
- Integração com bases proprietárias e públicas.
- Desempenho, escalabilidade e segurança adequados a serviços públicos.

## 4. Escopo do Projeto
### Escopo Funcional
- Painel web com visão geral (KPIs, alertas, áreas temáticas, subprefeituras, eventos).
- Chat de IA contextual para perguntas sobre a cidade (endpoint `/api/ai/chat`).
- Ingestão e sincronização de dados públicos (ObservaSampa) e geração de insights.
- APIs para consulta de previsões climáticas e séries temporais (ex.: `/api/weather`, `/api/forecast`).
- Relatórios e análises com suporte de IA.
- Estrutura para personalização de temas e módulos por área.

### Escopo Não Funcional
- Tempo de resposta alvo: ≤ 2s para 95% das requisições síncronas de texto; ≤ 6s para chamadas com agregações externas.
- Disponibilidade mínima desejada: 99,9%.
- Escalabilidade horizontal à medida da demanda (Vercel/Serverless + banco gerenciado).
- Segurança, privacidade e conformidade (LGPD).

### Restrições
- Não inclui personalização profunda de layout por cliente (fora do tema base).
- Curadoria de conteúdo e políticas de dados do cliente são de sua responsabilidade.
- Treinamento e capacitação são opcionais e contratados separadamente.

## 5. Objetivos do Projeto
### Objetivo Geral
Disponibilizar uma plataforma inteligente e extensível para suporte à gestão municipal, com chat de IA contextual, dashboards operacionais e APIs de integração.

### Objetivos Específicos
- Alta precisão e utilidade nas respostas do chat de IA.
- Suporte a integrações com fontes públicas e bases internas.
- Ferramentas de análise, previsão e geração de insights.
- Garantia de desempenho, segurança e conformidade.

## 6. Introdução e Contexto
A gestão municipal moderna demanda visão integrada de dados e capacidade de resposta rápida. O Precast evolui o modelo tradicional de relatórios isolados ao oferecer navegação por áreas, visão por subprefeituras, previsões e um assistente de IA capaz de contextualizar informações e sugerir ações.

## 7. Análise
### Necessidade
Integrar dados críticos, reduzir tempo de obtenção de respostas e prover recomendações práticas, independentemente do canal de acesso.

### Funcionalidades-Chave
- PLN com Azure OpenAI para consultas e explicações contextuais.
- Dashboards com KPIs, alertas e visão por áreas/subprefeituras.
- Previsões de clima e séries temporais com métodos estatísticos simples.
- Ingestão/sincronização de dados públicos e geração de insights.

### APIs e Endpoints Atuais
- IA: `POST /api/ai/chat` (streaming), `POST /api/ai/contextual-chat`.
- Clima: `GET /api/weather` (Open‑Meteo, com cache/revalidate).
- Séries e previsões: `GET /api/forecast` (Suavização Exponencial Simples sobre dados do banco).
- ObservaSampa: `POST /api/observasampa/ingest`, `POST /api/observasampa/ingest/all`, `POST /api/observasampa/sync`.
- Insights: `POST /api/insights`, `GET /api/insights`.

### Painel Web
- Visão geral de KPIs, alertas, áreas temáticas, subprefeituras e eventos.
- Componentes de análise e relatórios com auxílio de IA.
- Chat de IA embutido (header e rota dedicada `/ai`).

### Roadmap (Proposto)
- Fase 1 (MVP): Painel, chat IA (texto), ingestão ObservaSampa, clima, séries e insights.
- Fase 2: Contexto avançado (RAG) com banco vetorial (pgvector/Pinecone), análises multilíngues, curadoria.
- Fase 3: Modalidades adicionais (voz/imagem), geolocalização, cache semântico e formatos avançados.

## 8. Requisitos Funcionais
- RF1: Permitir consulta por chat de IA com respostas contextuais.
- RF2: Exibir KPIs, alertas e visão por áreas/subprefeituras.
- RF3: Ingerir e sincronizar dados de fontes públicas (ex.: ObservaSampa).
- RF4: Disponibilizar APIs REST para clima, séries e insights.
- RF5: Gerar relatórios e explicações com suporte de IA.
- RF6: Fornecer autenticação e autorização (expansível; middleware já configurado para futura proteção).

## 9. Requisitos Não Funcionais
- RNF1: Desempenho com p95 ≤ 2s para rotas síncronas; ≤ 6s para integrações externas.
- RNF2: Disponibilidade ≥ 99,9% (infra gerenciada e deploy sem downtime).
- RNF3: Observabilidade (logs, métricas de latência/erros, alertas).
- RNF4: Segurança (TLS, segredos em `.env`/Vercel, validação de entrada, rate limiting onde aplicável).
- RNF5: Conformidade com LGPD (minimização de dados pessoais, bases legais, registros de acesso quando necessário).

## 10. Métricas de Qualidade
- Disponibilidade: ≥ 99,9% uptime.
- Latência: ≤ 2s (texto/síncrono) / ≤ 6s (chamadas externas) p95.
- Escalabilidade: suportar 1.000+ usuários simultâneos com crescimento linear de custo.
- Integridade: taxa de erro ≤ 1% nas consultas/requests.

## 11. Arquitetura e Design
### 11.1 Visão Geral
Aplicação web com Next.js (App Router) e TypeScript, hospedada em Vercel. Integrações com Azure OpenAI (via Vercel AI SDK) para IA conversacional, Open‑Meteo para clima e Postgres gerenciado para persistência (ex.: Neon/Supabase). Ingestão e sincronização de dados públicos (ObservaSampa). Arquitetura modular preparada para futuro RAG com banco vetorial.

### 11.2 Componentes da Arquitetura
- Banco Relacional: Postgres (`lib/db.ts`, `migrations/`).
- Banco Vetorial (futuro): pgvector ou serviço gerenciado (ex.: Pinecone).
- APIs REST: rotas em `app/api/*` (AI, clima, forecast, insights, observasampa).
- Painel Web: rotas em `app/*` com componentes reutilizáveis em `components/*`.
- Serviço de NLP/IA: Azure OpenAI via `lib/ai.ts` e Vercel AI SDK (`streamText`).
- Monitoramento/Logs: Vercel, log drains e métricas (a definir alertas).

### 11.3 Fluxo de Dados
- Ingestão: tarefas em `app/api/observasampa/*` capturam e normalizam dados em tabelas relacionais.
- Consulta: endpoints expõem informações para UI e integrações externas.
- IA: prompts e contexto do domínio municipal orientam respostas do chat.
- Previsão: séries temporais processadas com suavização exponencial simples em `/api/forecast`.
- Observabilidade: logs e métricas para medir latência, erros e throughput.

### 11.4 Modelo de Dados (Logical Data Model)
Entidades principais (exemplo baseado no código e migrações):
- Indicador: catálogo de indicadores (tabela `indicators`).
- Resultado de Indicador: série temporal (tabela `indicator_results`), atributos: `indicator_id`, `nivel`, `regiao_name`, `periodo`, `value_num`, `metadata`.
- Insight: entradas geradas/curadas pela IA (tabela `insights`: `scope`, `input`, `output`, `metadata`).
- Evento/Alerta: eventos operacionais e alertas (na UI; persistência futura).
- Usuário e API Key: para autenticação/autorização (futuro, via NextAuth/keys).
- Configuração: parâmetros de painel, thresholds, recursos por área.

### 11.5 Regras de Validação
- Sanitização/validação de entrada em APIs (tipos, limites, listas permitidas).
- Verificação de conformidade com LGPD ao manipular dados pessoais.
- Deduplicação e versionamento lógico na ingestão (evitar registros duplicados).
- Rate limiting e proteção contra abuso em endpoints públicos.

### 11.6 Configuração de Ambiente
Variáveis esperadas (exemplos):
- `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_DEPLOYMENT`, `AZURE_OPENAI_API_VERSION`.
- `DATABASE_URL` (Postgres gerenciado).
- `OBSERVASAMPA_BASE_URL` (padrão: https://api.observasampa.prefeitura.sp.gov.br).
Boas práticas: usar `.env.local` em desenvolvimento e variáveis seguras na Vercel; nunca versionar segredos.

## 12. Extensibilidade e Versionamento
- Versionamento semântico (SemVer) do aplicativo e das APIs.
- Versionamento de APIs (ex.: `/api/v1/*`) e de esquemas de banco via migrações.
- Arquitetura preparada para novas modalidades (voz/imagem) e módulos (ex.: curadoria, auditoria).

## 13. Plano de Desenvolvimento
- Metodologia: Scrum
- Sprints: quinzenais
- Fase 1 (6 semanas): MVP – painel, IA (texto), ingestão ObservaSampa, clima, séries, insights.
- Fase 2 (8 semanas): multilíngue, curadoria, banco vetorial e contexto RAG, reforço de autenticação.
- Fase 3 (8 semanas): voz, imagem, geolocalização, cache semântico, automações operacionais.

## 14. Plano de Testes
- Testes unitários e de integração (priorizar APIs e componentes críticos do painel).
- Testes de contrato para endpoints externos (mocks e limites).
- Carga e performance (p95/p99), com atenção a limites de provedores.
- Segurança e vulnerabilidades (validações, rate limit, segredos, dependências).

## 15. Gestão de Riscos
- Dependência de provedores externos (Azure OpenAI, Open‑Meteo, Vercel) – mitigação: fallback e monitoração.
- Disponibilidade/qualidade de dados públicos (ObservaSampa) – mitigação: cache e revalidação.
- Custos variáveis de IA – mitigação: limites de uso, modelos mais econômicos, cache de respostas.
- Privacidade/LGPD – mitigação: minimização de dados, anonimização, políticas de retenção.
- Latência em horários de pico – mitigação: edge caching, otimizações de consultas e revalidate.

## 16. Plano de Implantação
- Modelo: SaaS e/ou implantação containerizada.
- Infra: Vercel (app), Postgres gerenciado, Azure OpenAI.
- Deploy: zero downtime, prévias por PR, migrações coordenadas.
- Ambientes: Dev, Homologação, Produção (variáveis distintas).

## 17. Manutenção e Suporte
- SLA acordado conforme contrato.
- Monitoramento proativo, alertas e canais de suporte dedicados.
- Rotina de atualizações e janelas de manutenção planejadas.

## 18. Orçamento e Custos
- Desenvolvimento: por hora ou pacote fechado.
- Infraestrutura: Vercel, Postgres, Azure OpenAI, observabilidade (estimativa por consumo/uso esperado).
- Terceiros: serviços adicionais (e-mail, CDN, geocodificação, vetorial).
- Otimização: auto‑escalonamento, cache, instâncias reservadas e tuning de consultas.

## 19. Critérios de Sucesso
### Técnicos
- Cumprimento de SLA e métricas de desempenho (p95, erro ≤ 1%).
- Integridade de dados e estabilidade de ingestões.

### De Negócio
- Aumento do uso do painel e das APIs.
- Redução de tempo para responder perguntas operacionais.
- Maior efetividade de decisões baseadas em dados.

### De UX
- ≥ 95% satisfação dos usuários internos.
- Alta taxa de adoção de funcionalidades assistidas por IA.

## 20. Pós-Entrega
- Evolução contínua do produto (roadmap trimestral).
- Monitoria de performance e qualidade com planos de melhoria.
- Alinhamento com clientes/stakeholders e priorização colaborativa.

## 21. Fora de Escopo
- Personalizações profundas de layout/branding além do tema base.
- Curadoria de conteúdo e governança de dados específicas de cada cliente.
- Implementações nativas mobile (iOS/Android) – podem consumir APIs.
- Integrações proprietárias não listadas – avaliadas caso a caso.

