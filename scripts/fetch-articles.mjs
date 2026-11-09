/**
 * Baixa os artigos publicados do Supabase e grava em src/content/articles.generated.json,
 * que o site usa no build (pré-render) e no navegador. Roda sozinho antes de `npm run dev` e `npm run build`.
 *
 * Usa só a chave pública (anon/publishable): a regra RLS da tabela só devolve artigos com status "published".
 * Sem as variáveis, ou se a rede falhar, mantém o arquivo atual (ou cria vazio) e o build segue normalmente.
 */
import fs from 'node:fs';
import path from 'node:path';

import dotenv from 'dotenv';

const root = path.resolve(import.meta.dirname, '..');
const target = path.join(root, 'src', 'content', 'articles.generated.json');

// Variáveis do host de deploy têm prioridade; depois .env.local e .env.
dotenv.config({ path: path.join(root, '.env.local'), quiet: true });
dotenv.config({ path: path.join(root, '.env'), quiet: true });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

const keepCurrent = (reason) => {
  if (!fs.existsSync(target)) fs.writeFileSync(target, '[]\n');
  console.log(`[artigos] ${reason} Mantendo o arquivo atual.`);
};

if (!url || !key) {
  keepCurrent('Supabase não configurado.');
} else {
  try {
    const endpoint = `${url.replace(/\/$/, '')}/rest/v1/posts?select=slug,title,summary,body,cover_url,linkedin_url,published_at&status=eq.published&order=published_at.desc`;
    const res = await fetch(endpoint, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    const articles = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      summary: r.summary,
      body: r.body,
      date: String(r.published_at).slice(0, 10),
      coverUrl: r.cover_url ?? undefined,
      linkedinUrl: r.linkedin_url ?? undefined,
    }));
    fs.writeFileSync(target, `${JSON.stringify(articles, null, 2)}\n`);
    console.log(`[artigos] ${articles.length} artigo(s) publicado(s) carregado(s) do Supabase.`);
  } catch (err) {
    keepCurrent(`Não foi possível buscar no Supabase (${err.message}).`);
  }
}
