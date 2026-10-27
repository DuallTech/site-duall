import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Box, Droplets, FileSearch, Network, Zap, type LucideIcon } from 'lucide-react';

import { ButtonLink, Container, Eyebrow } from '../components/ui';
import { SOLUTIONS } from '../content/solutions';

export const SOLUTION_ICONS: Record<string, LucideIcon> = {
  eletrica: Zap,
  hidraulica: Droplets,
  sistemas: Network,
  bim: Box,
  'consultoria-atp': FileSearch,
};

/** Luz que acompanha o mouse e leve inclinação 3D do card. */
const trackPointer = (event: MouseEvent<HTMLElement>) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  el.style.setProperty('--mx', `${x}px`);
  el.style.setProperty('--my', `${y}px`);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.style.setProperty('--rx', `${((0.5 - y / rect.height) * 7).toFixed(2)}deg`);
  el.style.setProperty('--ry', `${((x / rect.width - 0.5) * 9).toFixed(2)}deg`);
};

const resetTilt = (event: MouseEvent<HTMLElement>) => {
  event.currentTarget.style.setProperty('--rx', '0deg');
  event.currentTarget.style.setProperty('--ry', '0deg');
};

/** Bloco 3. Cards compactos com frase curta; o texto completo fica na página de cada solução. */
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
            e de água à infraestrutura para sistemas, com modelagem BIM e avaliação técnica de projetos de
            terceiros.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {SOLUTIONS.map((solution, index) => {
            const Icon = SOLUTION_ICONS[solution.slug] ?? Box;
            return (
              <li key={solution.slug} className="reveal">
                <article
                  onMouseMove={trackPointer}
                  onMouseLeave={resetTilt}
                  className="group relative flex h-full min-h-[15rem] flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#111f33] p-5 transition-[transform,border-color,box-shadow] duration-200 [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-[#EDA700]/60 hover:shadow-[0_24px_50px_-20px_rgba(237,167,0,0.4)]"
                >
                  {/* Luz que segue o mouse */}
                  <span
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgba(237,167,0,0.14),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDA700]/15 text-[#EDA700] transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#EDA700] group-hover:text-slate-900">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-widest text-white/25 transition group-hover:text-[#EDA700]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold leading-tight">
                    <Link to={`/solucoes/${solution.slug}`} className="after:absolute after:inset-0 after:z-10 after:content-['']">
                      {solution.name}
                    </Link>
                  </h3>

                  <p className="relative text-sm leading-relaxed text-slate-300">{solution.teaser}</p>

                  <span className="relative mt-auto inline-flex items-center gap-1 pt-1 text-sm font-bold text-[#EDA700]">
                    Saiba mais
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </span>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink to="/solucoes">Ver todas as soluções</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
