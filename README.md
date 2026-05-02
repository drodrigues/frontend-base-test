# Teste Técnico — Dev Frontend

## Sobre o teste

O objetivo deste teste é avaliar sua capacidade de transformar um layout em código funcional, integrando dados reais de uma API e seguindo os padrões de desenvolvimento da THREAD.

Você deverá montar a interface definida no [Figma](https://www.figma.com/design/HVdd9VdkeeDCjpqRXVys75/Teste-Front-end?node-id=0-5&m=dev&t=EEfiEO7RgQ7Wpb4y-1) — com fidelidade visual e responsividade — e integrá-la com dois endpoints da [DummyJSON Products API](https://dummyjson.com/docs/products):

- **Get all products** — carrega e exibe a listagem de produtos em grid
- **Search products** — filtra os produtos em tempo real conforme o usuário digita na busca

O projeto base já está configurado com Next.js, TypeScript, SCSS e Zustand. Seu trabalho começa a partir daqui.

### O que será avaliado

- Fidelidade ao layout do Figma (espaçamentos, tipografia, cores, responsividade)
- Qualidade e organização do código TypeScript
- Uso correto do SCSS com nomenclatura BEM
- Modelagem do estado global com Zustand
- Estruturação dos domínios e serviços de API
- Boas práticas de componentização e separação de responsabilidades

### Requisitos obrigatórios

- **SCSS com padrão BEM** para todos os estilos — sem CSS-in-JS, sem Tailwind
- **Zustand** para gerenciar os dados da aplicação (lista de produtos, termo de busca, estado de carregamento)
- **Grid responsivo** para a listagem de produtos, adaptado para mobile, tablet e desktop conforme o Figma
- **Mobile first** — estilos base escritos para mobile, breakpoints adicionam comportamento para telas maiores

## Entrega

1. Suba o projeto em um repositório **privado** no GitHub
2. Compartilhe o acesso com o usuário [@drodrigues](https://github.com/drodrigues)
3. Faça commits incrementais ao longo do desenvolvimento — **um commit por parte ou funcionalidade implementada** (ex: estrutura base, listagem de produtos, busca, responsividade)

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone git@github.com:drodrigues/frontend-base-test.git
cd frontend-base-test
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_PATH=
```

### 4. Inicie o servidor de desenvolvimento

```bash
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts disponíveis

| Comando      | Descrição                                 |
| ------------ | ----------------------------------------- |
| `yarn dev`   | Inicia o servidor de desenvolvimento      |
| `yarn build` | Gera o build de produção                  |
| `yarn start` | Inicia o servidor com o build de produção |
| `yarn lint`  | Executa o linter (ESLint)                 |

---

## Estrutura do projeto

```
src/
├── app/                  # App Router do Next.js
│   ├── (pages)/          # Grupo de rotas com layout compartilhado
│   │   ├── layout.tsx    # Layout raiz (fontes, metadata)
│   │   └── page.tsx      # Página inicial
│   └── api/              # Route Handlers (API Routes)
├── components/           # Componentes reutilizáveis de UI
│   ├── layout/           # Container de layout responsivo
│   ├── loading/          # Indicadores de carregamento
│   └── typography/       # Componente de tipografia unificado
├── views/                # Componentes de visualização por página
├── features/             # Módulos de features (ex: produtos, busca)
├── domains/              # Tipos e regras de domínio
├── hooks/                # Custom React hooks
├── concerns/             # Lógica transversal (ex: autenticação, analytics)
├── constants/            # Constantes da aplicação
├── core/                 # Serviços base (HttpClient)
├── config/               # Configurações da aplicação
├── utils/                # Utilitários (URL, moeda, base path)
├── types/                # Definições de tipos globais
└── stylesheets/          # Estilos globais e sistema de temas
    ├── App.scss
    ├── Themes.scss
    └── includes/         # Variáveis, mixins e funções SCSS
```

---

## Guia de desenvolvimento

### Convenções de código

**Componentes:**

- Diretórios nomeados em **PascalCase** (ex: `ProductCard/`, `SearchInput/`)
- O arquivo principal do componente é sempre `index.tsx`, com seu `index.scss` no mesmo diretório
- Subcomponentes dentro do diretório usam **PascalCase** (ex: `Skeleton.tsx`, `Skeleton.scss`)
- Props tipadas com `type Props = { }` no topo do arquivo
- Preferir componentes funcionais com TypeScript estrito

```
src/components/
└── ProductCard/
    ├── index.tsx       # componente principal
    ├── index.scss
    ├── Skeleton.tsx    # subcomponente em PascalCase
    └── Skeleton.scss
```

```tsx
// ✅ Correto
type Props = {
  title: string;
  price: number;
  isLoading?: boolean;
};

export default function ProductCard({ title, price, isLoading }: Props) {
  // ...
}
```

**Funções e variáveis:** `camelCase`

**Classes CSS:** padrão BEM com underscores duplos (ex: `ProductCard__title--highlighted`)

---

### Importações

Use sempre o alias `@/` para importações absolutas a partir de `src/`:

```tsx
// ✅ Correto
import Container from '@/components/layout';
import { formatBRL } from '@/utils/MoneyUtils';

// ❌ Evitar
import Container from '../../../components/layout';
```

---

### Estilos (SCSS)

O projeto usa **SCSS puro** (sem CSS Modules nem Tailwind).

**Funções SCSS disponíveis:**

| Função                    | Uso                                       |
| ------------------------- | ----------------------------------------- |
| `vw($px)`                 | Largura relativa à viewport (mobile base) |
| `vh($px)`                 | Altura relativa à viewport (mobile base)  |
| `dvh($px)`                | Altura dinâmica de viewport (mobile base) |
| `rem($px)`                | Unidade fixa relativa ao root (desktop)   |
| `fluid-clamp($min, $max)` | Escalonamento fluido entre breakpoints    |
| `font-size($px)`          | Tamanho de fonte responsivo               |

**Uso de unidades por contexto:**

No mobile, prefira unidades relativas à viewport (`vw`, `vh`, `dvh`) para que o layout escale proporcionalmente em qualquer tamanho de tela. No desktop, use `rem` ou `fluid-clamp` para valores fixos e tipografia fluida.

```scss
.ProductCard {
  padding: dvh(2) vw(4); // mobile — proporcional à viewport
  @include font-size(12); // mobile — escala com a tela

  &__title {
    font-weight: 600;
  }

  &__price {
    color: $primary;
  }

  @include respond-to($desktop) {
    padding: rem(16) rem(24); // desktop — valor fixo
    @include font-size(14);
  }
}
```

**Mixin de responsividade — Mobile First:**

Estilos base sempre para mobile. Use `$desktop` para sobrescrever em telas maiores. Nunca use `$mobile` para "desfazer" estilos de desktop.

```scss
// ✅ Correto — mobile first
.ProductGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); // mobile base

  @include respond-to($desktop) {
    grid-template-columns: repeat(4, 1fr); // desktop override
  }
}

// ❌ Evitar — desktop first
.ProductGrid {
  grid-template-columns: repeat(4, 1fr);

  @include respond-to($mobile) {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Breakpoints disponíveis:** `mobile`, `mobileHorizontal`, `tablet`, `desktop`, `not-desktop`

**Variáveis de tema (SCSS):**

```scss
$primary     // #0C2AF1
$secondary   // #dfdfdf
$background  // #fff
$black       // #000
$success     // #47bc00
$error       // #FF1334
$warning     // #ffaa00
```

---

### Consumo de API

As chamadas HTTP são encapsuladas em **classes de serviço estáticas**, definidas junto ao domínio correspondente em `src/domains/`.

```
src/domains/
└── product/
    |-- ProductStore.ts 
    ├── ProductService.ts   # chamadas HTTP do domínio
    └── types.ts            # tipos/interfaces do domínio
```

```typescript
// src/domains/product/ProductService.ts
import { apiFetch } from '@/core/HttpClient';
import type { Product, ProductsResponse } from './types';

export class ProductService {
  static async list(limit = 20, skip = 0) {
    return apiFetch<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  }

  static async search(query: string) {
    return apiFetch<ProductsResponse>(`/products/search?q=${query}`);
  }

  static async getById(id: number) {
    return apiFetch<Product>(`/products/${id}`);
  }
}
```

O serviço é consumido nos store, nunca diretamente em componentes.


A API de produtos está documentada em [dummyjson.com/docs/products](https://dummyjson.com/docs/products).

Endpoints principais utilizados neste teste:

```
GET https://dummyjson.com/products?limit=20&skip=0       # Listagem paginada
GET https://dummyjson.com/products/search?q={query}      # Busca por nome
GET https://dummyjson.com/products/{id}                  # Produto por ID
GET https://dummyjson.com/products/categories            # Categorias
```

---

### Estado global

O projeto tem **Zustand** instalado. Para criar uma store:

```typescript
// src/domains/products/ProductStore.ts
import { create } from 'zustand';

type ProductsStore = {
  search: string;
  setSearch: (value: string) => void;
};

export const useProductsStore = create<ProductsStore>((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
}));
```

---

### Tipagem global

O tipo `Status` está disponível globalmente (sem precisar importar):

```typescript
// src/types/index.d.ts
type Status = 'idle' | 'loading' | 'success' | 'error';
```

Use para controle de estado assíncrono em hooks e componentes.

---

### Onde implementar cada parte

| O quê                                                 | Onde              |
| ----------------------------------------------------- | ----------------- |
| Componentes visuais reutilizáveis                     | `src/components/` |
| Tipos/interfaces e classes de serviço (chamadas HTTP) | `src/domains/`    |
| Lógica de feature (hooks, store)                      | `src/features/`   |
| Custom hooks de dados                                 | `src/hooks/`      |
| Constantes (ex: itens por página)                     | `src/constants/`  |
| Composição de páginas                                 | `src/views/`      |

---

## Tecnologias

- [Next.js 16](https://nextjs.org/) — framework React com App Router
- [React 19](https://react.dev/) — biblioteca de UI
- [TypeScript 5](https://www.typescriptlang.org/) — tipagem estática
- [SCSS / Sass](https://sass-lang.com/) — pré-processador CSS
- [Zustand 5](https://zustand-demo.pmnd.rs/) — gerenciamento de estado
- [DummyJSON](https://dummyjson.com/docs/products) — API de dados fake para produtos

---

> Commits granulares fazem parte da avaliação. Evite subir tudo em um único commit no final.

---

## Implementação

Esta seção descreve o que foi entregue, as decisões técnicas tomadas e como a aplicação está estruturada.

### Visão geral

A aplicação consome os endpoints `GET /products` e `GET /products/search` da DummyJSON, exibe os produtos em um grid responsivo, permite busca em tempo real (com debounce) e pagina os resultados. Os estados de carregamento, erro e vazio são tratados explicitamente.

### Domínio: `src/domains/product/`

- **`types.ts`** — tipos `Product` e `ProductsResponse` derivados do contrato da DummyJSON.
- **`ProductService.ts`** — classe estática com `list`, `search` e `getById`. Usa `apiFetch` de `@/core/HttpClient` com paths relativos (`/products?...`), aplica `encodeURIComponent` na busca e mantém `limit`/`skip` também no endpoint de search.
- **`ProductStore.ts`** — store Zustand com `products`, `search`, `status` (`Status` global), `error`, `total` e `page`, além das ações `fetchProducts`, `searchProducts`, `setSearch` e `setPage`.

A store é a única consumidora do `ProductService`. Os componentes nunca chamam o service diretamente.

#### Proteção contra race conditions

Buscas e paginações são concorrentes por natureza: o usuário pode digitar rápido ou trocar de página antes da resposta anterior voltar. Para lidar com isso, a store mantém um `latestRequestId` incremental. Cada chamada captura seu id antes do `await` e, quando a resposta chega, confere se ainda é o id mais recente. O `setSearch` também invalida requests pendentes assim que o termo muda, antes mesmo do debounce disparar a nova busca. Assim, respostas atrasadas são descartadas e não há risco de uma busca antiga sobrescrever o resultado da atual.

### Camada HTTP

`src/core/HttpClient.ts` expõe `apiFetch<T>(path, options)`, que recebe um path relativo e o prefixa com a base da DummyJSON (`https://dummyjson.com`). Também aceita URL absoluta, com retorno antecipado nesse caso. Erros HTTP são convertidos em `Error` com o status correspondente e propagados para a store tratar.

Endpoints usados na implementação:

```txt
GET https://dummyjson.com/products?limit=20&skip=0
GET https://dummyjson.com/products/search?q={query}&limit=20&skip=0
GET https://dummyjson.com/products/{id}
```

### View: `src/views/home/`

`HomeView` é um client component (`'use client'`) e orquestra:

- **Fetch inicial** no `useEffect`.
- **Busca com debounce de 400ms**, via `setTimeout` controlado por `useRef`. Quando o input fica vazio, a listagem completa é exibida novamente.
- **Paginação** com scroll suave para o topo a cada troca de página.
- **Retry** no estado de erro, que reutiliza a última intenção (busca ou listagem) na página atual.
- **Skeletons** durante `loading` e `idle`, evitando o flash de conteúdo vazio.

### Componentes criados

Todos seguem `PascalCase/index.tsx + index.scss` e BEM nas classes.

| Componente                 | Responsabilidade                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ProductCard/index.tsx`    | Card do produto: imagem, badge de desconto, brand, nome, descrição (desktop), rating, stock e preço. Calcula preço original a partir de `discountPercentage`. Usa `next/image` para a thumbnail. |
| `ProductCard/Skeleton.tsx` | Placeholder com shimmer animado via `@extend %skeleton-pulse`.                                                                                                                                   |
| `SearchInput/index.tsx`    | Input controlado com ícone de busca e botão de clear. Usa componentes de ícone reutilizáveis.                                                                                                    |
| `Pagination/index.tsx`     | Anterior/Próximo com label "Previous/Next" no desktop e apenas chevrons no mobile. Indicador `Page X of Y` (desktop) / `X / Y` (mobile).                                                         |
| `icons/`                   | `SearchIcon`, `CloseIcon`, `StarIcon` extraídos do Figma como componentes React.                                                                                                                 |

### Sistema de estilos

As dimensões dos principais elementos visuais (cards, grid, espaçamentos, tipografia, raios, sombras e estados responsivos) seguem as medidas do Figma. Quando necessário, os valores foram adaptados para as funções SCSS do projeto (`rem`, `vw`, `dvh` e `font-size`), preservando a proporção visual do layout.

#### Breakpoints adicionados

O sistema base trazia `mobile`, `mobileHorizontal`, `tablet`, `desktop` e `not-desktop`. Em `src/stylesheets/includes/Mixins.scss` foram adicionados dois novos:

- **`$mobile-wide`** — `(min-width: 448px)`: ativa o grid de 2 colunas no mobile, mantendo 1 coluna abaixo desse limite.
- **`$desktop-wide`** — `(min-width: 1200px)`: força 4 colunas fixas de 294px no desktop largo.

Os dois foram declarados como variáveis nomeadas para evitar números mágicos em media queries inline.

#### Grid responsivo

Mobile-first, com 4 níveis usando apenas variáveis do sistema:

| Largura                     | Colunas               | Card       |
| --------------------------- | --------------------- | ---------- |
| `<448px` (base)             | 1 col centralizada    | `rem(206)` |
| `≥448px` (`$mobile-wide`)   | 2 cols                | `rem(206)` |
| `≥768px` (`$desktop`)       | `auto-fit` adaptativo | `rem(294)` |
| `≥1200px` (`$desktop-wide`) | 4 cols fixas          | `rem(294)` |

#### Unidades

Seguindo o guia do projeto: `vw` e `dvh` para espaçamentos proporcionais no mobile (paddings, gaps); `rem` para dimensões fixas vindas do Figma (cards, ícones, borders, raios) e para o desktop. A tipografia usa `font-size()`, que é responsiva via `vw` no mobile e via `fluid-clamp` no desktop.

#### Tema

As variáveis SCSS apontam para CSS custom properties (`--primary`, `--background`, etc.) declaradas em `Themes.scss`. Tokens específicos do Figma (cinzas neutros, surface de imagem, badge, preço) foram adicionados seguindo o mesmo padrão: `$figma-text-primary`, `$figma-image-surface`, `$figma-price`, entre outros.

Principais tokens adicionados:

```scss
$figma-surface
$figma-image-surface
$figma-border
$figma-icon-muted
$figma-text-primary
$figma-text-body
$figma-text-muted
$figma-price
$figma-badge
```

### Tipografia

O componente `Typography` recebeu as props `size`, `lineHeight`, `sizeDesktop` e `lineHeightDesktop`, que são injetadas como CSS custom properties no inline style. Essa abordagem permite ter estilos diferentes entre mobile e desktop sem inflar o SCSS com uma classe por tamanho. Como o Figma traz variações de line-height entre estilos próximos, isso cobre todos os casos sem gerar uma explosão de combinações.

### Constantes

`src/constants/products.ts` exporta `PRODUCTS_PER_PAGE = 20`, atendendo ao exemplo do guia (`limit=20`).

### Formatação monetária

O `MoneyUtils.ts` ganhou a função `formatUSD`, já que a DummyJSON retorna os preços em dólares. O `formatBRL` foi mantido por compatibilidade com o utilitário base.

### Melhorias de UX

- **Ícone de close no `SearchInput`** (não previsto no Figma): com um clique, o termo digitado é limpo e a listagem completa volta a ser exibida, sem a necessidade de apagar caractere por caractere.
- **Layout de 1 coluna em telas menores** (abaixo de 448px): adicionei um breakpoint extra para que, em dispositivos muito estreitos, os cards sejam exibidos em coluna única e centralizados, garantindo melhor legibilidade e aproveitamento do espaço em vez de espremer dois cards lado a lado.

#### Possíveis evoluções futuras

- **`cursor: pointer` no `ProductCard`**: como o card representa um produto, faria sentido sinalizar visualmente que ele é clicável e levar o usuário a uma página de detalhes. Como o escopo do teste e o design no Figma se limitam à listagem e à busca, essa interação não foi implementada nesta entrega, mas gostaria de deixar registrado como evolução.

### Acessibilidade

- `role="alert"` no estado de erro.
- `aria-label` em ícones interativos (clear da busca, anterior/próxima página) e na navegação de paginação.
- `aria-hidden="true"` nos ícones puramente decorativos (chevrons, dot separador, star quando dentro de bloco com texto).
- Input de busca com `aria-label` e `type="search"`.

### Build e qualidade

- `yarn lint` passa limpo.
- `yarn build` gera o output `standalone` sem erros.
- Prettier configurado para padronização automática de estilo de código.
- `yarn format` disponível para formatar o projeto.
- `yarn format:check` disponível para validar formatação antes da entrega.
- React Compiler ativo (`reactCompiler: true` em `next.config.ts`) — daí a opção por componentes funcionais sem `useMemo`/`useCallback` excessivos onde o compiler resolve.
