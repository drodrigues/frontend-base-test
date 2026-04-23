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

O serviço é consumido nos hooks da feature, nunca diretamente em componentes:

```typescript
// src/features/products/useProducts.ts
import { ProductService } from '@/domains/product/ProductService';

export function useProducts() {
  // chama ProductService.list() e alimenta a store Zustand
}
```

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
// src/features/products/ProductStore.ts
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
