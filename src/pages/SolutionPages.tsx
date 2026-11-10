import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Box, ChevronLeft, ChevronRight, CircleCheck, Play } from 'lucide-react';

import imgAprovacao from '../assets/images/atuacao/aprovacao-concessionaria.png';
import imgBim from '../assets/images/atuacao/bim-modelagem3d.png';
import imgBombeiro from '../assets/images/atuacao/corpo-de-bombeiro.png';
// import BimRealityCompare from '../components/BimRealityCompare'; // desativado por enquanto (seção "BIM vs realidade")
import { ButtonLink, ClientOnly, Container, Eyebrow, PageHero } from '../components/ui';
import { SOLUTION_PHOTOS } from '../content/solutionPhotos';
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

/** Fotos de cada solução, na ordem do carrossel. */
const SOLUTION_GALLERY: Record<string, string[]> = {
  eletrica: [SOLUTION_PHOTOS['eletrica']],
  hidraulica: [SOLUTION_PHOTOS['hidraulica']],
  sistemas: [SOLUTION_PHOTOS['sistemas']],
  bim: [imgBim],
  'corpo-de-bombeiro': [SOLUTION_PHOTOS['corpo-de-bombeiro']],
  'aquecimento-solar': [SOLUTION_PHOTOS['aquecimento-solar']],
  'consultoria-atp': [imgAprovacao, imgBombeiro],
};

const ifcFallback = (
  <div className="flex h-[480px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-sm text-slate-400">
    Carregando o modelo 3D…
  </div>
);

/**
 * O navegador IFC (Three.js + web-ifc + modelo de ~35 MB) é pesado: só baixa e processa quando a pessoa pede,
 * para a página de BIM abrir leve e não travar ao rolar.
 */
function IfcViewerGate() {
  const [open, setOpen] = useState(false);
  if (open) return <ClientOnly load={() => import('../components/ClashSimulator')} fallback={ifcFallback} />;

  return (
    <div className="relative isolate flex h-[480px] flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 px-6 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDA700]/15 text-[#EDA700]">
        <Box size={30} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <p className="font-display text-xl font-bold text-white">Modelo IFC de exemplo</p>
        <p className="max-w-md text-sm leading-relaxed text-slate-400">
          O visualizador carrega um modelo 3D completo. Pode levar alguns segundos, dependendo da conexão.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-[#EDA700] px-6 py-3 font-display text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <Play size={16} fill="currentColor" aria-hidden="true" />
        Abrir visualizador 3D
      </button>
    </div>
  );
}

function SolutionGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const step = (n: number) => setIndex((current) => (current + n + total) % total);

  return (
    <div className="solution-gallery relative" role="region" aria-label={`Imagens de ${alt}`}>
      <div className="relative aspect-3/2">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === index ? alt : ''}
          aria-hidden={i !== index}
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`solution-gallery-image absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      </div>

      <div className="mt-3 flex min-h-11 items-center justify-between gap-4">
        <p className="text-xs tracking-wide text-slate-500">{alt}</p>
        {total > 1 && (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Imagem anterior"
            className="flex h-11 w-11 items-center justify-center text-[#315676] transition hover:bg-slate-50"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <span className="min-w-12 text-center font-mono text-[11px] tabular-nums text-slate-500" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Próxima imagem"
            className="flex h-11 w-11 items-center justify-center text-[#315676] transition hover:bg-slate-50"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

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
  const services = solution.services ?? solution.scope;
  const gallery = SOLUTION_GALLERY[solution.slug] ?? [];
  const Icon = SOLUTION_ICONS[solution.slug];
  const showServiceIntro = solution.slug === 'hidraulica' || solution.slug === 'aquecimento-solar';
  // Na página de BIM, a lista de tópicos dá lugar ao navegador IFC e ao comparador BIM x obra.
  const isBim = solution.slug === 'bim';

  return (
    <>
      <Seo
        title={solution.seoTitle}
        description={solution.seoDescription}
        path={path}
        jsonLd={[breadcrumbLd(crumbs), serviceLd(solution.slug)]}
      />

      <section className="solution-detail bg-white pb-20 pt-28 md:pt-32" aria-label={solution.name}>
        <Container>
          <Link
            to="/solucoes"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#315676]"
          >
            <ArrowLeft size={16} className="transition group-hover:-translate-x-1" aria-hidden="true" />
            {showServiceIntro ? 'Voltar aos Serviços' : 'Voltar às soluções'}
          </Link>

          <div className="solution-intro relative mt-8 grid items-center lg:grid-cols-2">
            <div className="solution-intro-copy relative z-10 flex flex-col items-start gap-7 py-6 lg:py-16">
              <div className="space-y-6">
                <span className="flex items-center gap-3 text-[#315676]">
                  {Icon && <Icon size={22} aria-hidden="true" />}
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em]">{showServiceIntro ? 'Projetos de' : 'Soluções / Duall'}</span>
                </span>
                <div className="space-y-2">
                  <h1 className="max-w-xl font-display text-[clamp(2.5rem,4.8vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-[#243b50]">{solution.short}</h1>
                </div>
                <p className="max-w-lg text-base leading-[1.85] text-slate-600">{solution.summary}</p>
              </div>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-5 pt-1">
                <ButtonLink to="/contato">{showServiceIntro ? 'Solicitar Proposta' : 'Solicitar proposta'}</ButtonLink>
              </div>
            </div>

            {gallery.length > 0 && <SolutionGallery key={solution.slug} images={gallery} alt={solution.short} />}
          </div>

          {!isBim && (
          <div id="servicos" className="scroll-mt-28 pt-6 lg:pt-14">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-[#EDA700]" aria-hidden="true" />
              <h2 className="font-display text-2xl font-medium tracking-tight text-[#243b50] md:text-3xl">{showServiceIntro ? 'Lista completa de serviços' : 'O que faz parte do projeto'}</h2>
            </div>

            <div>
              <ul className="gap-x-16 md:columns-2">
                {services.map((item) => (
                  <li key={item} className="flex break-inside-avoid items-start gap-3 border-b border-slate-100 py-4 text-[15px] leading-relaxed text-slate-600">
                    <CircleCheck size={18} className="mt-0.5 shrink-0 text-[#D99500]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
          )}
        </Container>
      </section>

      {isBim && (
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
            <IfcViewerGate />
          </Container>
        </section>
      )}

      {/* Seção "BIM vs realidade" desativada por enquanto. Para voltar, descomente este bloco e o import lá em cima.
      {isBim && (
        <section className="bg-white py-20" aria-labelledby="bim-realidade">
          <Container className="space-y-10">
            <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-4 lg:col-span-6">
                <Eyebrow>Do modelo à obra</Eyebrow>
                <h2 id="bim-realidade" className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-4xl">
                  BIM vs realidade<span className="text-[#EDA700]">.</span>
                </h2>
              </div>
              <p className="leading-relaxed text-slate-600 lg:col-span-6">
                Arraste a linha para comparar o modelo BIM com a instalação executada: a representação fiel das
                disciplinas no modelo é o que permite antecipar incompatibilidades antes da obra.
              </p>
            </div>
            <BimRealityCompare />
          </Container>
        </section>
      )}
      */}
    </>
  );
}
