import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Ruler } from 'lucide-react';

import { ButtonLink, Container, Eyebrow } from '../components/ui';
import { PROJECTS, projectImage, type Project } from '../content/projects';

const arrowClass =
  'flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#315676]/25 bg-white text-[#315676] shadow-md transition hover:border-[#315676] hover:bg-[#315676] hover:text-white disabled:pointer-events-none disabled:opacity-30';

/** Card em formato de pôster: a foto ocupa tudo e os detalhes sobem ao passar o mouse (sempre visíveis no toque). */
function PosterCard({ project, priority }: { project: Project; priority: boolean }) {
  const image = projectImage(project.imageFileName);

  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-[0_20px_50px_-24px_rgba(13,25,41,0.55)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_34px_60px_-24px_rgba(13,25,41,0.7)]">
      {image && (
        <img
          src={image}
          alt={`${project.title}, ${project.category.toLowerCase()}, projeto de instalações desenvolvido pela Duall Engenharia.`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 ${project.imageClassName ?? 'object-center'}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1929] via-[#0d1929]/35 to-transparent transition-opacity duration-500 group-hover:opacity-95" aria-hidden="true" />
      {/* Área clicável do card inteiro (o título acima é o link acessível) */}
      <Link
        to={`/projetos/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 z-20"
      />

      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
        {project.category}
      </span>

      <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 text-white">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#EDA700]">{project.client}</p>
        <h3 className="font-display text-2xl font-extrabold leading-tight">
          <Link to={`/projetos/${project.slug}`}>{project.title}</Link>
        </h3>

        <div className="grid grid-rows-[1fr] transition-all duration-500 md:grid-rows-[0fr] md:group-focus-within:grid-rows-[1fr] md:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <ul className="space-y-1.5 pb-1 pt-1 text-sm text-slate-200">
              {project.location && (
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#EDA700]" aria-hidden="true" /> {project.location}
                </li>
              )}
              {project.area && (
                <li className="flex items-center gap-2">
                  <Ruler size={14} className="text-[#EDA700]" aria-hidden="true" /> {project.area}
                </li>
              )}
            </ul>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#EDA700] px-4 py-2 text-xs font-bold text-slate-900">
              Ver projeto <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Bloco 2. Todos os projetos do portfólio em carrossel, três por vez. Todos os cards ficam no HTML. */
export default function FeaturedProjectsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0.1);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    setProgress(Math.min(1, (track.scrollLeft + track.clientWidth) / track.scrollWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [update]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (track.clientWidth + 20), behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="projetos-destaque" className="relative overflow-hidden bg-[#f6f3ee] py-24">
      <Container>
        <div className="reveal mb-14 grid items-end gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            <Eyebrow>Portfólio</Eyebrow>
            <h2
              id="projetos-destaque"
              className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-5xl"
            >
              Projetos de instalações em empreendimentos de médio e alto padrão
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              O portfólio da Duall Engenharia reúne projetos de instalações para empreendimentos residenciais, comerciais
              e mistos de alta complexidade técnica. Em cada projeto, o site apresenta o desafio do empreendimento, a
              solução proposta pela Duall e a etapa em que a equipe atuou.
            </p>
          </div>

          <div className="flex items-end gap-4 lg:col-span-4 lg:justify-end">
            <p className="text-outline select-none font-display text-[6.5rem] font-extrabold leading-[0.8]" aria-hidden="true">
              {PROJECTS.length}
            </p>
            <p className="pb-2 font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.2em] text-[#315676]">
              projetos
              <br />
              no portfólio
            </p>
          </div>
        </div>

        <div className="reveal" role="region" aria-roledescription="carrossel" aria-label="Projetos do portfólio">
          <ul
            ref={trackRef}
            className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-8 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS.map((project, i) => (
              <li
                key={project.slug}
                className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <PosterCard project={project} priority={i < 3} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#315676]/15" aria-hidden="true">
              <div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#315676] to-[#EDA700] transition-transform duration-500"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => page(-1)} disabled={!canPrev} aria-label="Projetos anteriores" className={arrowClass}>
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => page(1)} disabled={!canNext} aria-label="Próximos projetos" className={arrowClass}>
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink to="/projetos" variant="dark">
            Ver todos os projetos
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
