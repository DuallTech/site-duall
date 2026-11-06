/**
 * Artigos técnicos. Origem: série de artigos do LinkedIn, republicada no site com canonical próprio.
 * Cada artigo é pré-renderizado em /conteudo/artigos/[slug]. A lista começa vazia até a Duall entregar os textos.
 */

export interface Article {
  slug: string;
  title: string;
  /** ISO 8601, ex.: 2026-03-12 */
  date: string;
  summary: string;
  /** Parágrafos em texto simples. */
  body: string[];
  author?: string;
  linkedinUrl?: string;
}

export const ARTICLES: Article[] = [];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
