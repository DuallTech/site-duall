import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

import photo040 from '../assets/images/diretores/DSC00040.jpg';
import photo056 from '../assets/images/diretores/DSC00056.jpg';
import photo201 from '../assets/images/diretores/DSC00201.jpg';
import photo307 from '../assets/images/diretores/DSC00307.jpg';
import photo316 from '../assets/images/diretores/DSC00316.jpg';
import photo321 from '../assets/images/diretores/DSC00321.jpg';
import photo358 from '../assets/images/diretores/DSC00358.jpg';
import photo384 from '../assets/images/diretores/DSC00384.jpg';
import photo439 from '../assets/images/diretores/DSC00439.jpg';
import photo465 from '../assets/images/diretores/DSC00465.jpg';
import photo9798 from '../assets/images/diretores/DSC09798.jpg';
import photo9868 from '../assets/images/diretores/DSC09868.jpg';
import photo9938 from '../assets/images/diretores/DSC09938.jpg';
import { Container, Eyebrow } from '../components/ui';
import { fadeInUpVariants, staggerContainerVariants } from './animations';

const viewport = { once: true, margin: '-100px' } as const;

type Tile = { title: string; text: string; tone: 'gold' | 'glass' };

/**
 * Cada grid é uma faixa larga: a foto em grupo ocupa o espaço de dois retratos e muda de lugar em cada grid;
 * as demais são retratos (ou um quadro com frase), um sim, um não deslocados para baixo.
 */
type Cell =
  | { kind: 'group'; src: string }
  | { kind: 'photo'; src: string }
  | { kind: 'tile'; tile: Tile };

const SLIDES: Cell[][] = [
  // Grupo à esquerda
  [
    { kind: 'group', src: photo358 },
    { kind: 'photo', src: photo384 },
    { kind: 'photo', src: photo040 },
    { kind: 'photo', src: photo201 },
    { kind: 'photo', src: photo9868 },
  ],
  // Grupo à direita
  [
    { kind: 'photo', src: photo056 },
    {
      kind: 'tile',
      tile: {
        title: 'Profissionais capacitados',
        text: 'Desenvolvimento contínuo e conhecimento compartilhado entre a equipe.',
        tone: 'glass',
      },
    },
    { kind: 'photo', src: photo9798 },
    { kind: 'photo', src: photo439 },
    { kind: 'group', src: photo316 },
  ],
  // Grupo no meio
  [
    { kind: 'photo', src: photo307 },
    { kind: 'group', src: photo321 },
    { kind: 'photo', src: photo465 },
    { kind: 'photo', src: photo9938 },
    {
      kind: 'tile',
      tile: {
        title: 'Comprometimento',
        text: 'É a palavra que rege o nosso trabalho, em cada projeto e em cada entrega.',
        tone: 'gold',
      },
    },
  ],
];

/** Largura de cada célula na faixa: o grupo vale dois retratos e o quadro de frase um pouco mais que um, para o título caber inteiro. */
const columnTemplate = (cells: Cell[]) =>
  cells.map((c) => (c.kind === 'group' ? '2fr' : c.kind === 'tile' ? '1.4fr' : '1fr')).join(' ');

const PHOTO_ALT = 'Equipe da Duall Engenharia';

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06 } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -80, transition: { duration: 0.3 } }),
};

const cellVariants: Variants = {
  enter: { opacity: 0, y: 24, scale: 0.97 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function PhotoCell({ src, className }: { src: string; className: string }) {
  return (
    <motion.figure
      variants={cellVariants}
      className={`group relative overflow-hidden rounded-xl bg-slate-800 ring-1 ring-white/10 ${className}`}
    >
      <img
        src={src}
        alt={PHOTO_ALT}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#EDA700] transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </motion.figure>
  );
}

function TileCell({ tile, className = '' }: { tile: Tile; className?: string }) {
  const gold = tile.tone === 'gold';
  return (
    <motion.div
      variants={cellVariants}
      className={`relative flex aspect-[3/4] min-w-0 flex-col md:aspect-[21/20] justify-between overflow-hidden rounded-xl p-4 lg:p-5 ${className} ${
        gold ? 'bg-[#EDA700] text-slate-900' : 'bg-white/[0.04] text-white ring-1 ring-white/10'
      }`}
    >
      <Quote size={24} className={gold ? 'text-slate-900/70' : 'text-[#EDA700]'} aria-hidden="true" />
      <div>
        <p className="font-display text-lg font-extrabold leading-tight xl:text-xl">{tile.title}</p>
        <p className={`mt-2 text-sm leading-relaxed ${gold ? 'text-slate-900/80' : 'text-slate-400'}`}>{tile.text}</p>
      </div>
    </motion.div>
  );
}

/** Grids de fotos que passam para o lado (setas, bolinhas ou arrastando). */
function TeamGallery() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const n = SLIDES.length;

  const go = (target: number, direction: 1 | -1) => {
    setDir(direction);
    setIndex((target + n) % n);
  };

  const cells = SLIDES[index];

  return (
    <div className="mt-12">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(index + 1, 1);
              else if (info.offset.x > 80) go(index - 1, -1);
            }}
            style={{ '--cols': columnTemplate(cells) } as CSSProperties}
            className="grid cursor-grab grid-flow-row-dense grid-cols-2 items-start gap-3 pb-2 active:cursor-grabbing md:grid-cols-[var(--cols)] md:gap-4"
          >
            {cells.map((cell, i) => {
              const offset = i % 2 === 1 ? 'md:mt-12' : '';
              if (cell.kind === 'group')
                return (
                  <PhotoCell key={cell.src} src={cell.src} className={`col-span-2 aspect-[3/2] md:col-span-1 ${offset}`} />
                );
              if (cell.kind === 'photo')
                return <PhotoCell key={cell.src} src={cell.src} className={`aspect-[3/4] ${offset}`} />;
              return <TileCell key={`tile-${i}`} tile={cell.tile} className={offset} />;
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Mostrar grid ${i + 1}`}
              aria-current={i === index}
              onClick={() => i !== index && go(i, i > index ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-[#EDA700]' : 'w-3 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
          <span className="ml-3 font-mono text-xs text-white/50" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Grid anterior"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition hover:border-[#EDA700] hover:bg-[#EDA700] hover:text-slate-900"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Próximo grid"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition hover:border-[#EDA700] hover:bg-[#EDA700] hover:text-slate-900"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Liderança e equipe na página /a-duall: texto sobre confiança e grids de fotos da equipe. */
export default function LeadershipSection() {
  return (
    <section aria-labelledby="lideranca" className="relative isolate overflow-hidden bg-[#0d1929] py-20 text-white md:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-24 -z-10 h-96 w-96 rounded-full bg-[#315676]/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-[#EDA700]/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainerVariants}
          className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <motion.div variants={fadeInUpVariants} className="space-y-4 lg:col-span-6">
            <Eyebrow light line={false}>
              Liderança
            </Eyebrow>
            <h2
              id="lideranca"
              className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
            >
              Confiança se constrói com quem está perto<span className="text-[#EDA700]">.</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="space-y-4 text-slate-300 lg:col-span-6 lg:pt-8">
            <p className="text-lg leading-relaxed">
              Acreditamos que a qualidade também se constrói nas relações: ouvimos, orientamos e permanecemos
              disponíveis em todas as etapas do projeto.
            </p>
            <p className="leading-relaxed text-slate-400">
              Por isso valorizamos quem faz a Duall acontecer, investindo no desenvolvimento da equipe e em um ambiente
              saudável, humano e colaborativo, onde o conhecimento é compartilhado e cada profissional pode evoluir.
            </p>
          </motion.div>
        </motion.div>

        <TeamGallery />
      </Container>
    </section>
  );
}
