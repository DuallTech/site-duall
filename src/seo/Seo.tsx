import { createContext, useContext, useEffect } from 'react';

import { SITE, absoluteUrl } from '../content/site';
import { organizationLd, websiteLd } from './jsonld';

export interface SeoData {
  title: string;
  description: string;
  /** Caminho canônico, começando em "/". */
  path: string;
  image?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Array<Record<string, unknown> | null>;
}

/** Coletor usado no pré-render: o <Seo> da página grava aqui e o script monta o <head>. */
export interface HeadCollector {
  data: SeoData | null;
}

export const HeadContext = createContext<HeadCollector | null>(null);

const DEFAULT_OG_IMAGE = '/og-duall.jpg';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

const resolveImage = (image?: string) => (image?.startsWith('http') ? image : absoluteUrl(image ?? DEFAULT_OG_IMAGE));

const graph = (data: SeoData) => [organizationLd(), websiteLd(), ...(data.jsonLd ?? []).filter(Boolean)];

/** Serializa o head de uma página para o HTML estático. */
export function renderHead(data: SeoData): string {
  const canonical = absoluteUrl(data.path);
  const image = resolveImage(data.image);
  const tags = [
    `<title>${escapeHtml(data.title)}</title>`,
    `<meta name="description" content="${escapeHtml(data.description)}" />`,
    `<meta name="robots" content="${data.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:type" content="${data.ogType ?? 'website'}" />`,
    `<meta property="og:title" content="${escapeHtml(data.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(data.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(data.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(data.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...graph(data).map((ld) => `<script type="application/ld+json" data-seo>${safeJson(ld)}</script>`),
  ];
  return tags.join('\n    ');
}

function upsert(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  set(el);
}

const meta = (attr: 'name' | 'property', key: string, content: string) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const el = document.createElement('meta');
      el.setAttribute(attr, key);
      return el;
    },
    (el) => el.setAttribute('content', content),
  );

/** Atualiza o head no navegador durante a navegação client-side. */
function applyHead(data: SeoData) {
  const canonical = absoluteUrl(data.path);
  const image = resolveImage(data.image);

  document.title = data.title;
  meta('name', 'description', data.description);
  meta('name', 'robots', data.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
  meta('property', 'og:type', data.ogType ?? 'website');
  meta('property', 'og:title', data.title);
  meta('property', 'og:description', data.description);
  meta('property', 'og:url', canonical);
  meta('property', 'og:image', image);
  meta('name', 'twitter:title', data.title);
  meta('name', 'twitter:description', data.description);
  meta('name', 'twitter:image', image);

  upsert(
    'link[rel="canonical"]',
    () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    },
    (el) => el.setAttribute('href', canonical),
  );

  document.head.querySelectorAll('script[data-seo]').forEach((el) => el.remove());
  graph(data).forEach((ld) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', '');
    script.text = safeJson(ld);
    document.head.appendChild(script);
  });
}

export default function Seo(props: SeoData) {
  const collector = useContext(HeadContext);
  if (collector) collector.data = props;

  const { title, description, path, image, ogType, noindex, jsonLd } = props;
  const ldKey = JSON.stringify(jsonLd ?? []);

  useEffect(() => {
    applyHead({ title, description, path, image, ogType, noindex, jsonLd });
    // jsonLd entra pela chave serializada para não reaplicar o head a cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, ogType, noindex, ldKey]);

  return null;
}
