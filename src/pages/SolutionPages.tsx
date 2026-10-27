import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import SolutionVisual from '../components/SolutionVisual';
import { ButtonLink, ChatButton, ClientOnly, Container, Eyebrow, PageHero } from '../components/ui';
import { SOLUTIONS, getSolution } from '../content/solutions';
import { SOLUTION_ICONS } from '../sections/SolutionsSection';
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
        description="Escopo da Duall Engenharia: instalações elétricas e hidráulicas, infraestrutura para sistemas, modelagem BIM e Consultoria ATP."
        path="/solucoes"
        jsonLd={[breadcrumbLd(crumbs), servicesListLd()]}
      />
      <PageHero
        eyebrow="Escopo"
        eyebrowLine={false}
        title="Soluções em projetos de instalações"
        lead="O escopo da Duall Engenharia cobre as disciplinas de instalações de um empreendimento: da entrada de energia e de água à infraestrutura para sistemas, com modelagem BIM e avaliação técnica de projetos de terceiros."
        crumbs={crumbs}
      />
      <section className="bg-white py-20">
        <Container>
          {/* Linha do tempo em zigue-zague: os cards alternam de lado e um traço diagonal liga um ao outro */}
          <ul className="flex flex-col gap-6 md:gap-0">
            {SOLUTIONS.map((s, i) => (
              <li key={s.slug} className="reveal relative md:w-[46%] md:[&:not(:first-child)]:-mt-16 md:even:ml-auto">
                {i < SOLUTIONS.length - 1 && (
                  <svg
                    className={`pointer-events-none absolute top-1/2 hidden h-[calc(100%-4rem)] w-[117.4%] md:block ${i % 2 ? 'right-1/2' : 'left-1/2'}`}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d={i % 2 ? 'M100 0 L0 100' : 'M0 0 L100 100'} stroke="#EDA700" strokeOpacity="0.35" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
                    <path className="bp-flow" d={i % 2 ? 'M100 0 L0 100' : 'M0 0 L100 100'} stroke="#EDA700" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
                <article className="group relative z-10 h-full space-y-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#EDA700]/60 hover:shadow-xl">
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#EDA700] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#315676]/10 text-[#315676] transition duration-500 group-hover:rotate-6 group-hover:bg-[#EDA700] group-hover:text-slate-900">
                      {(() => {
                        const Icon = SOLUTION_ICONS[s.slug];
                        return Icon ? <Icon size={22} aria-hidden="true" /> : null;
                      })()}
                    </span>
                    <span className="font-display text-5xl font-extrabold leading-none text-[#315676]/10 transition group-hover:text-[#EDA700]/40" aria-hidden="true">
                      {String(SOLUTIONS.indexOf(s) + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-extrabold text-[#2D3845]">
                    <Link to={`/solucoes/${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {s.name}
                    </Link>
                  </h2>
                  <p className="leading-relaxed text-slate-600">{s.summary}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="No escopo">
                    {s.scope.slice(0, 3).map((item) => (
                      <li key={item} className="rounded-full border border-[#315676]/20 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#315676]">
                    Saiba mais <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

const PROCESS = [
  { title: 'Estudo preliminar', text: 'Análise do empreendimento e das premissas para definir a melhor solução.' },
  { title: 'Projeto executivo', text: 'Desenvolvimento das pranchas prontas para executar em obra.' },
  { title: 'Compatibilização', text: 'Verificação entre disciplinas para evitar interferências antes da obra.' },
  { title: 'Memória de cálculo', text: 'Dimensionamentos e critérios documentados com precisão.' },
  { title: 'Entrega com ART', text: 'Pranchas finais, documentação e responsabilidade técnica.' },
];

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

      <section className="bg-white py-16" aria-labelledby="escopo">
        <Container className="space-y-8">
          <div className="space-y-4">
            <Eyebrow>No escopo</Eyebrow>
            <h2 id="escopo" className="font-display text-3xl font-extrabold leading-tight text-[#2D3845] md:text-4xl">
              {solution.short}: o que a Duall entrega
            </h2>
          </div>

          {/* Um painel só: lista de escopo, esquema e disciplinas relacionadas no mesmo bloco */}
          <div className="overflow-hidden rounded-3xl border border-[#315676]/15 bg-[#f6f9fc]">
            <div className="grid lg:grid-cols-2">
              <ol className="divide-y divide-[#315676]/10 p-2 md:p-4">
                {solution.scope.map((item, i) => (
                  <li key={item} className="group flex items-start gap-5 rounded-xl px-4 py-4 transition hover:bg-white">
                    <span className="pt-0.5 font-mono text-sm font-bold text-[#315676]/40 transition group-hover:text-[#EDA700]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] leading-snug text-slate-700">{item}</span>
                  </li>
                ))}
              </ol>
              <div className="border-t border-[#315676]/10 p-4 md:p-6 lg:border-l lg:border-t-0">
                <SolutionVisual slug={solution.slug} caption={`Esquema · ${solution.short}`} />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#315676]/10 px-6 py-4 md:flex-row md:items-center md:gap-6">
              <p className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#315676]/70">
                Compatibilizado com
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {others.map((o) => {
                  const Icon = SOLUTION_ICONS[o.slug];
                  return (
                    <li key={o.slug}>
                      <Link
                        to={`/solucoes/${o.slug}`}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2D3845] transition hover:text-[#315676]"
                      >
                        {Icon && <Icon size={15} className="text-[#315676]" aria-hidden="true" />}
                        <span className="border-b border-transparent transition group-hover:border-[#EDA700]">{o.short}</span>
                        <ArrowUpRight size={13} className="text-slate-400 transition group-hover:text-[#EDA700]" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white pb-16" aria-labelledby="como-trabalhamos">
        <Container className="space-y-8">
          <div className="space-y-4">
            <Eyebrow>Como trabalhamos</Eyebrow>
            <h2 id="como-trabalhamos" className="font-display text-3xl font-extrabold leading-tight text-[#2D3845] md:text-4xl">
              Do estudo preliminar à prancha final
            </h2>
          </div>

          {/* Mesmo painel do escopo: etapas e chamada para contato no mesmo bloco */}
          <div className="overflow-hidden rounded-3xl border border-[#315676]/15 bg-[#f6f9fc]">
            <ol className="relative grid gap-8 p-6 md:grid-cols-5 md:gap-4 md:p-8">
              <span className="draw-x absolute left-8 right-8 top-[3.25rem] hidden h-px bg-gradient-to-r from-[#EDA700] via-[#EDA700]/40 to-transparent md:block" aria-hidden="true" />
              {PROCESS.map((step, i) => (
                <li key={step.title} className="group relative space-y-3 md:pr-4">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#EDA700] bg-[#f6f9fc] font-mono text-xs font-bold text-[#315676] transition duration-300 group-hover:bg-[#EDA700] group-hover:text-slate-900">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-base font-bold text-[#2D3845]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-4 border-t border-[#315676]/10 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
              <p className="text-[15px] text-slate-700">
                <span className="font-display font-extrabold text-[#2D3845]">Tem um empreendimento em vista?</span>{' '}
                Conte o escopo e a Duall indica como atuar em {solution.short}.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink to="/contato">Solicitar proposta</ButtonLink>
                <ChatButton variant="outline">Falar com a Duall</ChatButton>
              </div>
            </div>
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

    </>
  );
}
