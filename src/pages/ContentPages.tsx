import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import RichText from '../components/RichText';
import { Breadcrumbs, Container, PageHero } from '../components/ui';
import { useArticles } from '../content/useArticles';
import { SITE } from '../content/site';
import { ArticleCard } from '../sections/ContentFaqSection';
import Seo from '../seo/Seo';
import { articleLd, breadcrumbLd } from '../seo/jsonld';
import NotFoundPage from './MiscPages';

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function ArticlesPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Artigos', path: '/conteudo/artigos' },
  ];
  const { articles } = useArticles();
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Seo
        title="Artigos sobre projetos de instalações | Duall Engenharia"
        description="Artigos técnicos da Duall Engenharia sobre projetos de instalações elétricas, hidráulicas e BIM."
        path="/conteudo/artigos"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="Artigos" title="Artigos da Duall" lead="Artigos técnicos da Duall Engenharia sobre projetos de instalações elétricas, hidráulicas e BIM." crumbs={crumbs} />
      <section className="bg-white py-20">
        <Container>
          {sorted.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-xl rounded-2xl border border-dashed border-slate-300 p-8 text-slate-600">
              Os primeiros artigos serão publicados em breve. Enquanto isso, acompanhe a Duall no{' '}
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="font-bold text-[#315676] underline">
                LinkedIn
              </a>
              .
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

export function ArticlePage() {
  const { slug = '' } = useParams();
  const { articles, loading } = useArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return loading ? <div className="min-h-[60vh]" aria-busy="true" /> : <NotFoundPage />;

  const path = `/conteudo/artigos/${article.slug}`;
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Artigos', path: '/conteudo/artigos' },
    { name: article.title, path },
  ];

  const minutes = Math.max(1, Math.round(article.body.split(/\s+/).filter(Boolean).length / 200));
  const others = articles.filter((a) => a.slug !== article.slug).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <Seo
        title={`${article.title} | ${SITE.name}`}
        description={article.summary}
        path={path}
        ogType="article"
        image={article.coverUrl}
        jsonLd={[breadcrumbLd(crumbs), articleLd(article)]}
      />
      <article className="bg-white pb-20 pt-32 md:pt-40">
        <Container className="max-w-3xl">
          <Breadcrumbs items={crumbs} />

          <header className="mt-8 space-y-6">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#315676]">
              <span className="h-px w-6 bg-[#EDA700]" aria-hidden="true" />
              <span>Artigo</span>
              <span className="text-slate-300" aria-hidden="true">/</span>
              <time dateTime={article.date}>{dateFormat.format(new Date(article.date))}</time>
              <span className="text-slate-300" aria-hidden="true">/</span>
              <span>{minutes} min de leitura</span>
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0d1929] [overflow-wrap:anywhere] md:text-5xl">
              {article.title}
            </h1>
            {article.summary && (
              <p className="border-l-4 border-[#EDA700] pl-5 text-xl leading-relaxed text-slate-500 [overflow-wrap:anywhere]">{article.summary}</p>
            )}
            <div className="flex items-center gap-3 border-y border-slate-200 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0d1929] font-display text-base font-extrabold text-[#EDA700]" aria-hidden="true">
                D
              </span>
              <div className="leading-tight">
                <p className="font-bold text-[#0d1929]">{article.author ?? SITE.name}</p>
                <p className="text-sm text-slate-500">Publicado em {dateFormat.format(new Date(article.date))}</p>
              </div>
            </div>
          </header>

          <RichText text={article.body} className="mt-10 text-[1.1875rem] leading-[1.85] text-slate-700" />

          <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <Link to="/conteudo/artigos" className="inline-flex items-center gap-2 font-bold text-[#315676] hover:underline">
              <ArrowLeft size={16} aria-hidden="true" /> Todos os artigos
            </Link>
            {article.linkedinUrl && (
              <a
                href={article.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#315676]/30 px-5 py-2 text-sm font-bold text-[#315676] transition hover:bg-[#315676]/5"
              >
                Veja também no LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </footer>
        </Container>
      </article>

      {others.length > 0 && (
        <section className="bg-slate-50 py-16">
          <Container>
            <h2 className="mb-8 font-display text-2xl font-extrabold text-[#0d1929]">Continue lendo</h2>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {others.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
