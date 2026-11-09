import { useParams } from 'react-router-dom';

import RichText from '../components/RichText';
import { Container, PageHero } from '../components/ui';
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
      <PageHero eyebrow={dateFormat.format(new Date(article.date))} title={article.title} lead={article.summary} crumbs={crumbs} />
      <article className="bg-white py-20">
        <Container className="max-w-3xl space-y-6 text-lg leading-relaxed text-slate-700">
          {article.coverUrl && <img src={article.coverUrl} alt="" className="aspect-video w-full rounded-2xl object-cover" />}
          <RichText text={article.body} />
          {article.linkedinUrl && (
            <a href={article.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#315676] underline">
              Veja também no LinkedIn
            </a>
          )}
        </Container>
      </article>
    </>
  );
}
