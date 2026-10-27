import { Clock, Target, Zap, type LucideIcon } from 'lucide-react';

import duallTeamImage from '../assets/images/diretores_duall.jpeg';
import { ButtonLink, Container, Eyebrow } from '../components/ui';

const PRINCIPLES = ['Ética', 'Comprometimento', 'Satisfação', 'Inovação', 'Humanização', 'Conhecimento técnico'];

// Textos do site institucional atual (vídeo institucional): foco, agilidade e prazo.
const PILLARS: Array<{ title: string; text: string; Icon: LucideIcon }> = [
  {
    title: 'Foco em soluções',
    text: 'Engenheiros dedicados a unir pontualidade, qualidade e excelência no atendimento.',
    Icon: Target,
  },
  {
    title: 'Agilidade e normas',
    text: 'Alinhados aos padrões técnicos, com opções flexíveis e resposta rápida em qualquer etapa do projeto.',
    Icon: Zap,
  },
  {
    title: 'Entregas no prazo',
    text: 'Respeito à expectativa de cada cliente, com ética, responsabilidade e alto conhecimento técnico.',
    Icon: Clock,
  },
];

/** Resumo da página /a-duall: o conteúdo completo (missão, visão, unidades) fica na página. */
export default function AboutSummarySection() {
  return (
    <section aria-labelledby="a-duall" className="relative overflow-hidden bg-white py-20 md:py-28">

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="reveal relative lg:col-span-7">
            {/* Filete fino deslocado atrás da foto: acabamento sóbrio, sem preenchimento */}
            <span className="pointer-events-none absolute -bottom-4 -left-4 right-4 top-4 rounded-lg border border-[#315676]/30" aria-hidden="true" />
            <figure className="relative overflow-hidden rounded-lg shadow-[0_30px_60px_-30px_rgba(13,25,41,0.45)]">
              <img
                src={duallTeamImage}
                alt="Denis Salles, Cristiano Salles e Eric Salles, diretores da Duall Engenharia."
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#0d1929]/90 via-[#0d1929]/55 to-transparent px-6 pb-5 pt-16 text-white">
                <span className="space-y-1">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#EDA700]">Diretores</span>
                  <span className="block font-display text-lg font-bold leading-tight">Denis Salles, Cristiano Salles e Eric Salles</span>
                </span>
                <span className="hidden h-px w-16 bg-[#EDA700] sm:block" aria-hidden="true" />
              </figcaption>
            </figure>
          </div>

          <div className="reveal space-y-7 lg:col-span-5">
            <div className="space-y-4">
              <Eyebrow>A Duall</Eyebrow>
              <h2 id="a-duall" className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-5xl">
                Comprometimento é o nosso ponto de partida
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                Entendemos que, quando um projeto nasce, expectativas são criadas.
              </p>
            </div>

            <ul className="space-y-3">
              {PILLARS.map(({ title, text, Icon }) => (
                <li
                  key={title}
                  className="group/item flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:border-[#315676]/40 hover:bg-white"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#315676]/10 text-[#315676] transition duration-300 group-hover/item:bg-[#EDA700] group-hover/item:text-slate-900">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-[#2D3845]">{title}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-2" aria-label="Princípios">
              {PRINCIPLES.map((principle) => (
                <li
                  key={principle}
                  className="cursor-default rounded-full border border-[#315676]/25 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#315676] transition duration-300 hover:border-[#EDA700] hover:text-slate-900"
                >
                  {principle}
                </li>
              ))}
            </ul>

            <ButtonLink to="/a-duall">Conhecer a Duall</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
