import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Blocks,
  Box,
  Droplet,
  Droplets,
  FileSearch,
  Layers,
  Network,
  ShieldCheck,
  SunMedium,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import imgBim from '../assets/images/atuacao/bim-modelagem3d.png';
import { ButtonLink, Eyebrow } from '../components/ui';
import { SOLUTION_PHOTOS } from '../content/solutionPhotos';
import { SOLUTION_AREAS } from '../content/solutionAreas';

export const SOLUTION_ICONS: Record<string, LucideIcon> = {
  eletrica: Zap,
  hidraulica: Droplets,
  sistemas: Network,
  bim: Box,
  'corpo-de-bombeiro': ShieldCheck,
  'aquecimento-solar': SunMedium,
  'consultoria-atp': FileSearch,
};

interface Area {
  id: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  /** Página interna correspondente; áreas sem página própria levam à lista de soluções. */
  to: string;
  images: string[];
}

/** As seis áreas de atuação. Cada card alterna até quatro fotos. */
const AREAS: Area[] = [
  {
    ...SOLUTION_AREAS[0],
    eyebrow: 'Projetos de',
    icon: Zap,
    images: [SOLUTION_PHOTOS['eletrica']],
  },
  {
    ...SOLUTION_AREAS[1],
    eyebrow: 'Projetos de',
    icon: Blocks,
    images: [SOLUTION_PHOTOS['sistemas']],
  },
  {
    ...SOLUTION_AREAS[2],
    eyebrow: 'Projetos de',
    icon: Droplet,
    images: [SOLUTION_PHOTOS['hidraulica']],
  },
  {
    ...SOLUTION_AREAS[3],
    eyebrow: 'Projetos',
    icon: Layers,
    images: [
      imgBim,
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    ...SOLUTION_AREAS[4],
    eyebrow: 'Aprovação',
    icon: ShieldCheck,
    images: [SOLUTION_PHOTOS['corpo-de-bombeiro']],
  },
  {
    ...SOLUTION_AREAS[5],
    eyebrow: 'Projetos de',
    icon: SunMedium,
    images: [SOLUTION_PHOTOS['aquecimento-solar']],
  },
];

const ROTATE_MS = 7000;

/** Card com três fotos que se alternam em crossfade. Cada card começa com um atraso, para não trocar todos ao mesmo tempo. */
function AreaCard({ area, index }: { area: Area; index: number }) {
  const { icon: Icon, images } = area;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCurrent((value) => (value + 1) % images.length);
      }, ROTATE_MS);
    }, index * 500);

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [images.length, index]);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_6px_22px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(237,167,0,0.45)]">
      <div className="relative aspect-square overflow-hidden border-b border-slate-200 bg-slate-100">
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Fundo desfocado da própria foto preenche as laterais; a foto fica inteira por cima, sem corte. */}
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
            />
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-1 items-center gap-2.5 px-3 py-3 xl:px-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#315676] shadow-sm transition duration-500 group-hover:rotate-6 group-hover:bg-[#EDA700] group-hover:text-slate-900">
          <Icon size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1992BB]">{area.eyebrow}</p>
          <h3 className="mt-0.5 font-display text-sm font-extrabold leading-tight text-[#1c2e3f] xl:text-[15px]">
            <Link to={area.to} className="after:absolute after:inset-0 after:z-10 after:content-['']">
              {area.title}
            </Link>
          </h3>
        </div>
        <ArrowRight
          size={16}
          className="shrink-0 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-[#EDA700]"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

/** Áreas de atuação com fotos que se alternam; o texto completo fica nas páginas de soluções. */
export default function SolutionsSection() {
  return (
    <section aria-labelledby="solucoes" className="relative isolate overflow-hidden bg-[#0d1929] py-16 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-10 -z-10 h-96 w-96 rounded-full bg-[#315676]/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <blockquote className="reveal mb-6 flex items-center gap-4 font-display text-sm font-semibold text-white/85 md:text-base">
          <span className="h-px w-10 shrink-0 bg-white/70 md:w-10" aria-hidden="true" />
          “Comprometimento é a palavra que rege o nosso trabalho.”
        </blockquote>

        <div className="reveal mb-5 grid items-end gap-4 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-2 lg:col-span-6">
            <Eyebrow light line={false}>Escopo</Eyebrow>
            <h2 id="solucoes" className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-[2rem]">
              Soluções em projetos de instalações
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 lg:col-span-6">
            O escopo da Duall Engenharia cobre as disciplinas de instalações de um empreendimento: da entrada de energia
            e de água à infraestrutura para sistemas, com modelagem BIM e avaliação técnica de projetos de terceiros.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 xl:gap-4">
          {AREAS.map((area, index) => (
            <li key={area.id} className="reveal">
              <AreaCard area={area} index={index} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <ButtonLink to="/solucoes">Ver todas as soluções</ButtonLink>
        </div>
      </div>
    </section>
  );
}
