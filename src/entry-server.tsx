import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './App';
import { ARTICLES } from './content/articles';
import { PROJECTS } from './content/projects';
import { SOLUTIONS } from './content/solutions';
import { HeadContext, renderHead, type HeadCollector } from './seo/Seo';

/** Todas as rotas que viram HTML estático. */
export function getRoutes(): string[] {
  return [
    '/',
    '/projetos',
    ...PROJECTS.map((p) => `/projetos/${p.slug}`),
    '/solucoes',
    ...SOLUTIONS.map((s) => `/solucoes/${s.slug}`),
    '/a-duall',
    '/conteudo',
    '/conteudo/artigos',
    ...ARTICLES.map((a) => `/conteudo/artigos/${a.slug}`),
    '/conteudo/workshop-tecnico',
    '/contato',
    '/politica-de-privacidade',
  ];
}

export function render(url: string) {
  const collector: HeadCollector = { data: null };
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  if (!collector.data) throw new Error(`Rota sem <Seo>: ${url}`);
  return { html, head: renderHead(collector.data), data: collector.data };
}
