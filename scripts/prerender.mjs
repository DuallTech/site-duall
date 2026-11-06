/**
 * Pré-renderiza cada rota em HTML estático (SSG) para que rastreadores e sistemas de IA,
 * que em geral não executam JavaScript, leiam o conteúdo completo.
 *
 * Fluxo (ver "build" no package.json):
 *   1. vite build                                  -> dist/ (client)
 *   2. vite build --ssr src/entry-server.tsx       -> dist-ssr/entry-server.js
 *   3. node scripts/prerender.mjs                  -> dist/<rota>/index.html, 404.html, sitemap.xml, robots.txt, llms*.txt
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, getRoutes } = await import(pathToFileURL(ssrEntry).href);
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://duallengenharia.com.br').replace(/\/$/, '');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const write = (file, content) => {
  const target = path.join(dist, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

const inject = ({ html, head }) =>
  template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html);

const routes = getRoutes();
const pages = [];

for (const route of routes) {
  const result = render(route);
  write(route === '/' ? 'index.html' : `${route.slice(1)}/index.html`, inject(result));
  pages.push({ route, ...result.data });
}

// 404 estático (servido pelo host para rotas inexistentes).
write('404.html', inject(render('/rota-inexistente')));

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const priority = (route) => (route === '/' ? '1.0' : route.split('/').length <= 2 ? '0.8' : '0.6');
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(
      (route) =>
        `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(route)}</priority>\n  </url>`,
    )
    .join('\n')}\n</urlset>\n`,
);

// robots.txt: libera os rastreadores de busca e de IA (GEO) e aponta o sitemap.
const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
];
write(
  'robots.txt',
  `User-agent: *\nAllow: /\n\n${aiBots.map((bot) => `User-agent: ${bot}\nAllow: /\n`).join('\n')}\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

// llms.txt (índice para LLMs) e llms-full.txt (conteúdo textual das páginas principais).
const byRoute = new Map(pages.map((p) => [p.route, p]));
const section = (title, filter) =>
  `## ${title}\n\n${pages
    .filter((p) => filter(p.route))
    .map((p) => `- [${p.title.replace(/ \| Duall Engenharia$/, '')}](${SITE_URL}${p.route}): ${p.description}`)
    .join('\n')}\n`;

write(
  'llms.txt',
  `# Duall Engenharia\n\n> ${byRoute.get('/').description} Know-how em projetos de instalações. Unidades em Americana e Santos, SP.\n\n${section(
    'Principais páginas',
    (r) => !r.startsWith('/projetos/') && !r.startsWith('/conteudo/artigos/') && r !== '/politica-de-privacidade',
  )}\n${section('Projetos do portfólio', (r) => r.startsWith('/projetos/'))}\n${section('Artigos', (r) =>
    r.startsWith('/conteudo/artigos/'),
  )}`.replace(/## Artigos\n\n\n$/, ''),
);

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<\/(p|h[1-6]|li|dt|dd|blockquote|summary)>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();

const mainText = (html) => stripTags(html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '');
write(
  'llms-full.txt',
  `# Duall Engenharia (conteúdo completo)\n\nFonte: ${SITE_URL}\n\n${pages
    .filter((p) => !p.route.startsWith('/projetos/'))
    .map((p) => `---\n\n# ${p.title}\nURL: ${SITE_URL}${p.route}\n\n${mainText(fs.readFileSync(path.join(dist, p.route === '/' ? 'index.html' : `${p.route.slice(1)}/index.html`), 'utf-8'))}\n`)
    .join('\n')}`,
);

console.log(`Pré-renderizadas ${routes.length} rotas + 404, sitemap.xml, robots.txt, llms.txt, llms-full.txt (${SITE_URL})`);
