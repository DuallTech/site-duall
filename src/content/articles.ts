/**
 * Artigos publicados no painel /admin (Supabase).
 * O arquivo articles.generated.json é gerado por scripts/fetch-articles.mjs antes do dev e do build;
 * cada artigo é pré-renderizado em /conteudo/artigos/[slug].
 */
import generated from './articles.generated.json';

export interface Article {
  slug: string;
  title: string;
  /** ISO 8601, ex.: 2026-03-12 */
  date: string;
  summary: string;
  /** Texto com marcações simples (ver components/RichText.tsx). */
  body: string;
  coverUrl?: string;
  author?: string;
  linkedinUrl?: string;
}

export const ARTICLES: Article[] = generated as Article[];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
