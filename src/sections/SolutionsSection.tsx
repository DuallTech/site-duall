import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Blocks,
  Box,
  Droplet,
  Droplets,
  FileSearch,
  Flame,
  Landmark,
  Layers,
  Network,
  ShieldCheck,
  SunMedium,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import imgBim from '../assets/images/atuacao/bim-modelagem3d.png';
import imgBombeiro from '../assets/images/atuacao/corpo-de-bombeiro.png';
import imgConcessionaria from '../assets/images/atuacao/aprovacao-concessionaria.png';
import imgEletrica from '../assets/images/atuacao/projeto-instalacao-eletrica.png';
import imgHidraulica from '../assets/images/atuacao/projeto-hidraulica.png';
import imgIncendio from '../assets/images/atuacao/projeto-combate-incendio.png';
import imgSistemas from '../assets/images/atuacao/instalacao-sistemas.png';
import imgSolar from '../assets/images/atuacao/projeto-aquecimento-solar.png';
import { ButtonLink, Container, Eyebrow } from '../components/ui';

export const SOLUTION_ICONS: Record<string, LucideIcon> = {
  eletrica: Zap,
  hidraulica: Droplets,
  sistemas: Network,
  bim: Box,
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

/** As oito áreas de atuação. Cada card alterna três fotos. */
const AREAS: Area[] = [
  {
    id: 'instalacoes-eletricas',
    eyebrow: 'Projetos de',
    title: 'Instalações Elétricas',
    icon: Zap,
    to: '/solucoes/eletrica',
    images: [
      imgEletrica,
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'instalacoes-para-sistemas',
    eyebrow: 'Projetos de',
    title: 'Instalações para Sistemas',
    icon: Blocks,
    to: '/solucoes/sistemas',
    images: [
      imgSistemas,
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'instalacoes-hidraulicas',
    eyebrow: 'Projetos de',
    title: 'Instalações Hidráulicas',
    icon: Droplet,
    to: '/solucoes/hidraulica',
    images: [
      imgHidraulica,
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581094751180-2292a8cf2723?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'projetos-bim',
    eyebrow: 'Projetos',
    title: 'BIM — Modelagem 3D',
    icon: Layers,
    to: '/solucoes/bim',
    images: [
      imgBim,
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'combate-incendio',
    eyebrow: 'Projetos de',
    title: 'Combate a Incêndio',
    icon: Flame,
    to: '/solucoes',
    images: [
      imgIncendio,
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'corpo-de-bombeiro',
    eyebrow: 'Aprovação',
    title: 'Corpo de Bombeiro',
    icon: ShieldCheck,
    to: '/solucoes',
    images: [
      imgBombeiro,
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'aquecimento-solar',
    eyebrow: 'Projetos de',
    title: 'Aquecimento Solar',
    icon: SunMedium,
    to: '/solucoes',
    images: [
      imgSolar,
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'aprovacao-concessionaria',
    eyebrow: 'Aprovação',
    title: 'Concessionária',
    icon: Landmark,
    to: '/solucoes',
    images: [
      imgConcessionaria,
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_22px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(237,167,0,0.45)]">
      <div className="relative h-44 overflow-hidden bg-slate-200">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-out group-hover:scale-105 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute bottom-0 left-4 flex h-10 w-10 translate-y-1/2 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#315676] shadow-md transition duration-500 group-hover:rotate-6 group-hover:bg-[#EDA700] group-hover:text-slate-900">
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1992BB]">{area.eyebrow}</p>
        <h3 className="mt-1.5 font-display text-lg font-extrabold leading-tight text-[#1c2e3f]">
          <Link to={area.to} className="after:absolute after:inset-0 after:z-10 after:content-['']">
            {area.title}
          </Link>
        </h3>
        <span className="mt-auto inline-flex items-center gap-2 border-t border-slate-200 pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 transition group-hover:text-[#EDA700]">
          Ver detalhes
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

/** Bloco 3. Oito áreas de atuação com fotos que se alternam; o texto completo fica nas páginas de soluções. */
export default function SolutionsSection() {
  return (
    <section aria-labelledby="solucoes" className="relative isolate overflow-hidden bg-[#0d1929] py-20 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-10 -z-10 h-96 w-96 rounded-full bg-[#315676]/30 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <blockquote className="reveal mb-12 flex items-center gap-4 font-display text-lg font-semibold text-white/80 md:text-xl">
          <span className="h-px w-10 shrink-0 bg-[#EDA700] md:w-16" aria-hidden="true" />
          “Comprometimento é a palavra que rege o nosso trabalho.”
        </blockquote>

        <div className="reveal mb-10 grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-6">
            <Eyebrow light line={false}>Escopo</Eyebrow>
            <h2 id="solucoes" className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Soluções em projetos de instalações
            </h2>
          </div>
          <p className="leading-relaxed text-slate-300 lg:col-span-6">
            O escopo da Duall Engenharia cobre as disciplinas de instalações de um empreendimento: da entrada de energia
            e de água à infraestrutura para sistemas, com modelagem BIM e avaliação técnica de projetos de terceiros.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area, index) => (
            <li key={area.id} className="reveal">
              <AreaCard area={area} index={index} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink to="/solucoes">Ver todas as soluções</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
