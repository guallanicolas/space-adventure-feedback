# Space Adventure - Pesquisa de Satisfação (Projeto Completo)

Este repositório contém uma aplicação mínima em **React + Vite** para coletar feedback de visitantes (app para tablet) e um painel simples de gestão. 
O armazenamento é feito no **Supabase**. O painel neste pacote está configurado para **acesso direto** (sem login).

## Como usar (passo a passo simples)

1. Instale o Node.js (LTS) — https://nodejs.org
2. Extraia a pasta `space-adventure-feedback.zip` em seu computador.
3. Abra o terminal na pasta do projeto:
   ```
   cd space-adventure-feedback
   ```
4. Instale dependências:
   ```
   npm install
   ```
5. Abra `src/supabase.js` e substitua as constantes:
   ```js
   export const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co'
   export const SUPABASE_KEY = 'SUA_ANON_PUBLIC_KEY'
   ```
   As chaves estão em: Supabase → Settings → API

6. Crie a tabela no Supabase (SQL Editor):
```sql
create table space_feedback (
  id uuid default uuid_generate_v4() primary key,
  firstVisit text,
  visits text,
  city text,
  state text,
  source text,
  atendimento int,
  organizacao int,
  estrutura int,
  conteudo int,
  custo int,
  alimentacao int,
  liked text,
  improve text,
  recommend text,
  contact text,
  created_at timestamp default now()
);
```

7. Rode a aplicação:
```
npm run dev
```
Abra no navegador: `http://localhost:5173`

## Notas
- O projeto vem sem autenticação no painel para facilitar testes. Para produção, proteja o painel com autenticação e regras de RLS.
- Se for usar em tablets no parque, recomendo hospedar em Vercel/Netlify e abrir o link no navegador do tablet.

## Estrutura
- index.html
- package.json
- src/
  - main.jsx
  - App.jsx
  - supabase.js
  - styles.css

Boa sorte! Se quiser, eu posso agora guiar você pelos comandos no seu computador.
