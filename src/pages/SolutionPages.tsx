import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import CtaBand from '../components/CtaBand';
import DuallDynamicVisual from '../components/DuallDynamicVisual';
import { ClientOnly, Container, Eyebrow, PageHero } from '../components/ui';
import { DUALL_DYNAMIC_DEFINITION, SOLUTIONS, getSolution } from '../content/solutions';
import Seo from '../seo/Seo';
import { breadcrumbLd, serviceLd, servicesListLd } from '../seo/jsonld';
import NotFoundPage from './MiscPages';

export function SolutionsPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Soluções', path: '/solucoes' },
  ];

  return (
    <>
      <Seo
        title="Soluções em projetos de instalações | Duall Engenharia"
        description="Escopo da Duall Engenharia: instalações elétricas e hidráulicas, infraestrutura para sistemas, modelagem BIM, Duall Dynamic e Consultoria ATP."
        path="/solucoes"
        jsonLd={[breadcrumbLd(crumbs), servicesListLd()]}
      />
      <PageHero
        eyebrow="Escopo"
        title="Soluções em projetos de instalações"
        lead="O escopo da Duall Engenharia cobre as disciplinas de instalações de um empreendimento: da entrada de energia e de água à infraestrutura para sistemas, com modelagem BIM, Duall Dynamic e avaliação técnica de projetos de terceiros."
        crumbs={crumbs}
      />
      <section className="bg-white py-20">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {SOLUTIONS.map((s) => (
              <li key={s.slug}>
                <article className="group relative h-full space-y-4 rounded-2xl border border-slate-200 p-8 transition hover:-translate-y-1 hover:border-[#315676]/40 hover:shadow-xl">
                  <h2 className="font-display text-2xl font-extrabold text-[#2D3845]">
                    <Link to={`/solucoes/${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {s.name}
                    </Link>
                  </h2>
                  <p className="leading-relaxed text-slate-600">{s.summary}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#315676]">
                    Saiba mais <ArrowUpRight size={16} />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

const ifcFallback = (
  <div className="flex h-[480px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-sm text-slate-400">
    Carregando o navegador IFC 3D…
  </div>
);

export function SolutionPage() {
  const { slug = '' } = useParams();
  const solution = getSolution(slug);
  if (!solution) return <NotFoundPage />;

  const path = `/solucoes/${solution.slug}`;
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Soluções', path: '/solucoes' },
    { name: solution.name, path },
  ];
  const others = SOLUTIONS.filter((s) => s.slug !== solution.slug);

  return (
    <>
      <Seo
        title={solution.seoTitle}
        description={solution.seoDescription}
        path={path}
        jsonLd={[breadcrumbLd(crumbs), serviceLd(solution.slug)]}
      />
      <PageHero eyebrow="Solução" title={solution.name} lead={solution.summary} crumbs={crumbs} />

      <section className="bg-white py-20" aria-labelledby="escopo">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <Eyebrow>{solution.slug === 'duall-dynamic' ? 'O que é' : 'No escopo'}</Eyebrow>
            <h2 id="escopo" className="font-display text-3xl font-extrabold leading-tight text-[#2D3845] md:text-4xl">
              {solution.slug === 'duall-dynamic' ? 'A documentação do projeto em um PDF acessível no celular' : `O que a Duall entrega em ${solution.short.toLowerCase()}`}
            </h2>
            {solution.slug === 'duall-dynamic' && (
              <p className="text-lg leading-relaxed text-slate-600">{DUALL_DYNAMIC_DEFINITION}</p>
            )}
            <ul className="grid gap-3">
              {solution.scope.map((item, i) => (
                <li
                  key={item}
                  className="reveal group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 transition duration-300 hover:translate-x-2 hover:border-[#315676]/40 hover:bg-white hover:shadow-lg"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#315676]/10 font-mono text-xs font-bold text-[#315676] transition group-hover:bg-[#EDA700] group-hover:text-slate-900">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {solution.slug === 'duall-dynamic' && (
              <p className="text-slate-600">
                Além do Duall Dynamic, os projetos da Duall são desenvolvidos em 2D, 3D e modelagem BIM.
              </p>
            )}
          </div>

          <div className="flex items-center justify-center lg:col-span-5">
            {solution.slug === 'duall-dynamic' ? (
              <DuallDynamicVisual />
            ) : (
              <aside className="w-full space-y-3 rounded-2xl bg-[#0d1929] p-8 text-white">
                <h3 className="font-display text-lg font-bold">Outras soluções</h3>
                <ul className="space-y-1">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/solucoes/${s.slug}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-[#EDA700]"
                      >
                        {s.short}
                        <ArrowUpRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </Container>
      </section>

      {solution.slug === 'bim' && (
        <section className="bg-slate-950 py-20 text-white" aria-labelledby="navegador-ifc">
          <Container className="space-y-10">
            <div className="max-w-3xl space-y-4">
              <Eyebrow light>Experimente</Eyebrow>
              <h2 id="navegador-ifc" className="font-display text-3xl font-extrabold md:text-4xl">
                Navegador IFC 3D interativo
              </h2>
              <p className="text-slate-300">
                Explore um arquivo IFC técnico de exemplo, alterne os modos de navegação e inspecione os elementos do
                modelo em tempo real.
              </p>
            </div>
            <ClientOnly load={() => import('../components/ClashSimulator')} fallback={ifcFallback} />
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
