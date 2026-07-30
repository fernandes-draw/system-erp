# SystemERP 🚀

O **SystemERP** é uma aplicação SaaS/ERP modular, desenvolvida em React com TypeScript e estruturada seguindo o padrão **Feature-Driven Development (FDD) / Bulletproof Architecture**. Este repositório serve como core e modelo de referência técnica para projetos futuros de grande porte que exigem alta escalabilidade, baixo acoplamento e manutenibilidade.

---

## 🏗️ Arquitetura e Estrutura de Pastas

A aplicação é organizada por **domínios de negócio (features)** em vez de tipos de arquivos globais. Cada módulo/funcionalidade do ERP vive de forma independente.

```
src/
├── app/                  # Configurações globais (Router, Providers, Contexts de Estado)
├── assets/               # Mídias estáticas (Imagens, ícones globais, fontes)
├── components/           # Componentes 100% reutilizáveis e agnósticos a contexto de negócio
│   ├── ui/               # Botões, inputs, cards básicos
│   ├── forms/            # Componentes de formulário complexos (DatePickers, Currency)
│   ├── tables/           # DataTables, paginação e filtros abstratos
│   └── layout/           # Componentes estruturais (Sidebar, Header, Footer)
├── features/             # Módulos de negócio isolados (Onde a mágica acontece ✨)
│   ├── auth/             # Autenticação e controle de acesso
│   ├── dashboard/        # Painel principal
│   └── customers/        # Exemplo de Módulo: Clientes
│       ├── api/          # Chamadas de API exclusivas deste módulo (TanStack Query)
│       ├── components/   # Componentes visuais usados apenas neste módulo
│       ├── hooks/        # Hooks de estado ou lógica local
│       ├── pages/        # Telas do módulo (List, Create, Edit, Details)
│       ├── types.ts      # Interfaces e Types TypeScript do domínio
│       ├── validations.ts# Schemas de validação (Zod)
│       └── index.ts      # API Pública da Feature (O que é visível para o resto do app)
├── hooks/                # Hooks utilitários globais (useAuth, useTheme, etc.)
├── layouts/              # Esqueletos de página (AuthLayout, DashboardLayout)
├── lib/                  # Clientes de bibliotecas terceiras (Configuração do Axios, React Query)
├── styles/               # Estilizações globais (CSS / Configurações do Tailwind)
├── types/                # Definições de tipos globais do TypeScript
└── utils/                # Funções utilitárias e auxiliares puras
```

> 🔒 O Princípio do Guardião (index.ts)  

    Cada pasta dentro de features/ possui um arquivo index.ts. Ele atua como uma barreira de isolamento. Só exporte dali o que o restante da aplicação realmente precisa acessar (ex: componentes de páginas ou rotas do módulo). O restante deve permanecer estritamente privado ao diretório da feature.

> 🛠️ Stack Tecnológica Coerente  

* Vite + React 19 - Build ultra-rápido e a última versão estável do ecossistema React.  
* TypeScript - Tipagem estática estrita para evitar erros em runtime.  
* Tailwind CSS (v4) - Estilização moderna acoplada nativamente via plugin do Vite (sem necessidade de arquivos de configuração poluídos).  
* TanStack Query (React Query v5) - Cacheamento, sincronização de estado de servidor e gerenciamento de requisições HTTP assíncronas.  
* Zustand - Estado global leve, performático e baseado em hooks para dados locais (ex: dados do usuário logado, tema).  
* React Hook Form + Zod - Gerenciamento e validação de formulários complexos de forma declarativa e tipada.  
* Axios - Cliente HTTP configurado com interceptors para tratamento de Token JWT e tratamento global de erros.  
* React Router - Roteamento dinâmico baseado em componentes com suporte a layouts e rotas protegidas.  

> 🚀 Guia de Desenvolvimento & Padrões  

Ao criar novas funcionalidades, siga religiosamente estes guias para manter a consistência do código:  
1. Criando uma Nova Feature  
1.1 Crie a pasta correspondente dentro de src/features/.  
1.2 Estruture as subpastas necessárias (api, components, pages).

Isole as requisições na pasta api/ usando o TanStack Query (useQuery / useMutation).

Crie o arquivo index.ts exportando os pontos de entrada do módulo.

2. Fluxo de Dados HTTP
O fluxo padrão para comunicação com o backend deve seguir:
Componente UI ➡️ Custom Hook (TanStack Query) ➡️ Função de API (Axios) ➡️ Backend

Evite chamar o axios diretamente dentro do ciclo de vida dos componentes (useEffect).

3. Commit Patterns
Para manter o histórico do Git limpo e legível, utilize o padrão Conventional Commits:

feat(finance): adiciona fluxo de estorno de lançamento

fix(auth): corrige refresh token expirado

docs(readme): atualiza guia de implantação

📦 Implantação e Inicialização Local
Pré-requisitos
Certifique-se de ter instalado em sua máquina:

Node.js (Versão LTS recomendada)

Um terminal moderno como Git Bash (recomendado para Windows) ou terminal nativo (Linux/macOS).

Passo a Passo para Recriação do Ambiente
Se precisar reconstruir este projeto do zero, o fluxo exato executado foi:

1. Inicialização do Projeto e Dependências Base
Bash

# Criar o projeto com Vite + React + TypeScript

npm create vite@latest system-erp -- --template react-ts
cd system-erp

# Instalar dependências de produção do ERP

npm install react-router-dom @tanstack/react-query zustand react-hook-form zod axios lucide-react
2. Configuração do Tailwind CSS (v4)
Diferente das versões anteriores, o Tailwind v4 funciona como um plugin nativo do Vite, eliminando a necessidade de arquivos tailwind.config.js.

Bash

# Instalar o Tailwind e o plugin oficial do Vite

npm install tailwindcss @tailwindcss/vite
No arquivo vite.config.ts, adicione o plugin:

TypeScript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [

    react(),
    tailwindcss(),

  ], 
})
No arquivo src/index.css, substitua o conteúdo por:

CSS
@import "tailwindcss"; 
3. Criação Automatizada da Estrutura de Pastas (via Git Bash)
Para criar a arquitetura modular baseada em features de uma só vez, utilize o terminal Git Bash:

Bash
mkdir -p src/{app/{router, providers, store}, assets, components/{ui, forms, layout, tables, modals, charts}, features/{auth/{api, hooks, pages, components}, dashboard, customers/{api, components, hooks, pages}}, hooks, lib, layouts, styles, types, utils, constants}
🚀 Execução em Desenvolvimento
Instalar Dependências (caso esteja clonando o repositório existente):

Bash
npm install
Configurar Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto:

Snippet de código
VITE_API_URL=http://localhost:8000/api
Rodar o Servidor Local

Bash
npm run dev
A aplicação estará disponível em http://localhost:5173.

Build de Produção

Bash
npm run build
Como salvar essa atualização no Git?
Como acabamos de criar um padrão profissional de commits, vamos inaugurá-lo para salvar essa mudança no README.md:

Bash
git add README.md
git commit -m "docs(readme): adicionar histórico de instalação do projeto e Tailwind v4"
git push origin main
