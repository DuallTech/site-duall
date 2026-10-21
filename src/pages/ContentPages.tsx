import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import CtaBand from '../components/CtaBand';
import { ButtonLink, Container, PageHero } from '../components/ui';
import { ARTICLES, getArticle } from '../content/articles';
import { SITE } from '../content/site';
import { ArticleCard, TicketCard } from '../sections/ContentFaqSection';
import Seo from '../seo/Seo';
import { articleLd, breadcrumbLd, eventLd } from '../seo/jsonld';
import NotFoundPage from './MiscPages';

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function ContentHubPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Conteúdo', path: '/conteudo' },
  ];
  return (
    <>
      <Seo
        title="Conteúdo técnico e eventos | Duall Engenharia"
        description="Artigos sobre projetos de instalações e o Workshop Técnico Duall, treinamento voltado a construtoras, incorporadoras e arquitetos."
        path="/conteudo"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="Conteúdo"
        title="Conteúdo técnico e eventos da Duall"
        lead="A Duall Engenharia publica artigos sobre projetos de instalações e realiza o Workshop Técnico Duall, treinamento voltado a construtoras, incorporadoras e arquitetos."
        crumbs={crumbs}
      />
      <section className="bg-blueprint py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <Link
            to="/conteudo/artigos"
            className="group space-y-3 rounded-3xl border border-[#315676]/20 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="font-display text-2xl font-extrabold text-[#2D3845]">Artigos</h2>
            <p className="text-slate-600">Artigos técnicos sobre projetos de instalações elétricas, hidráulicas e BIM.</p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#315676]">
              Ver artigos <ArrowUpRight size={16} />
            </span>
          </Link>
          <TicketCard />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

export function ArticlesPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Conteúdo', path: '/conteudo' },
    { name: 'Artigos', path: '/conteudo/artigos' },
  ];
  const sorted = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Seo
        title="Artigos sobre projetos de instalações | Duall Engenharia"
        description="Artigos técnicos da Duall Engenharia sobre projetos de instalações elétricas, hidráulicas e BIM."
        path="/conteudo/artigos"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="Conteúdo" title="Artigos" lead="Artigos técnicos da Duall Engenharia sobre projetos de instalações." crumbs={crumbs} />
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
  const article = getArticle(slug);
  if (!article) return <NotFoundPage />;

  const path = `/conteudo/artigos/${article.slug}`;
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Conteúdo', path: '/conteudo' },
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
        jsonLd={[breadcrumbLd(crumbs), articleLd(article)]}
      />
      <PageHero eyebrow={dateFormat.format(new Date(article.date))} title={article.title} lead={article.summary} crumbs={crumbs} />
      <article className="bg-white py-20">
        <Container className="max-w-3xl space-y-6 text-lg leading-relaxed text-slate-700">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {article.linkedinUrl && (
            <a href={article.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#315676] underline">
              Veja também no LinkedIn
            </a>
          )}
        </Container>
      </article>
      <CtaBand />
    </>
  );
}

export function WorkshopPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Conteúdo', path: '/conteudo' },
    { name: 'Workshop técnico', path: '/conteudo/workshop-tecnico' },
  ];
  return (
    <>
      <Seo
        title="Workshop Técnico Duall | Duall Engenharia"
        description="O Workshop Técnico Duall é um treinamento técnico para construtoras, incorporadoras e arquitetos, realizado pela Duall Engenharia."
        path="/conteudo/workshop-tecnico"
        jsonLd={[breadcrumbLd(crumbs), eventLd()]}
      />
      <PageHero
        eyebrow="Evento"
        title="3º Workshop Técnico Duall"
        lead="Treinamento técnico para construtoras, incorporadoras e arquitetos, realizado pela Duall Engenharia."
        crumbs={crumbs}
        actions={<ButtonLink to="/contato">Inscrever-se no Workshop</ButtonLink>}
      />
      <section className="bg-white py-20">
        <Container className="max-w-3xl space-y-4 text-lg leading-relaxed text-slate-600">
          <p>Data e local serão divulgados em breve. Para receber o aviso de abertura das inscrições, fale com a equipe da Duall.</p>
        </Container>
      </section>
    </>
  );
}
