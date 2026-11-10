import { useEffect, useState } from 'react';

import { ARTICLES, type Article } from './articles';

/**
 * Artigos do site: começam com a lista gerada no build (HTML estático, bom para SEO e sem piscar na hidratação)
 * e, ao abrir a página, são atualizados com o que está publicado no Supabase. Assim um artigo recém-publicado
 * aparece sem esperar um novo build.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let cache: Article[] | null = null;
let inflight: Promise<Article[] | null> | null = null;

interface Row {
  slug: string;
  title: string;
  summary: string;
  body: string;
  cover_url: string | null;
  linkedin_url: string | null;
  published_at: string;
}

function fetchPublished(): Promise<Article[] | null> {
  if (!url || !key) return Promise.resolve(null);
  inflight ??= fetch(
    `${url.replace(/\/$/, '')}/rest/v1/posts?select=slug,title,summary,body,cover_url,linkedin_url,published_at&status=eq.published&order=published_at.desc`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } },
  )
    .then((res) => (res.ok ? (res.json() as Promise<Row[]>) : Promise.reject(new Error(String(res.status)))))
    .then((rows) => {
      cache = rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        summary: r.summary,
        body: r.body,
        date: r.published_at.slice(0, 10),
        coverUrl: r.cover_url ?? undefined,
        linkedinUrl: r.linkedin_url ?? undefined,
      }));
      return cache;
    })
    .catch(() => null)
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** `loading` fica true até a busca terminar (ou falhar), para páginas de artigo não mostrarem "não encontrado" cedo demais. */
export function useArticles(): { articles: Article[]; loading: boolean } {
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [loading, setLoading] = useState(Boolean(url && key) && cache === null);

  useEffect(() => {
    if (cache) {
      setArticles(cache);
      setLoading(false);
      return;
    }
    let alive = true;
    fetchPublished().then((fresh) => {
      if (!alive) return;
      if (fresh) setArticles(fresh);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  return { articles, loading };
}
