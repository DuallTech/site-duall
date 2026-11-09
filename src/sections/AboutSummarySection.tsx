import { motion } from 'motion/react';
import { Clock, Target, Zap, type LucideIcon } from 'lucide-react';

import directorsImage from '../assets/images/diretores/DSC00327.jpg';
import { ButtonLink, Container, Eyebrow } from '../components/ui';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from './animations';

const viewport = { once: true, margin: '-100px' } as const;

const PRINCIPLES = ['Ética', 'Comprometimento', 'Satisfação', 'Inovação', 'Humanização', 'Conhecimento técnico'];

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

const pad = (n: number) => String(n).padStart(2, '0');

function DirectorsPhoto() {
  return (
    <figure>
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-slate-100 shadow-[0_30px_60px_-30px_rgba(13,25,41,0.45)]">
        <img
          src={directorsImage}
          alt="Denis Salles, Cristiano Salles e Eric Salles, diretores da Duall Engenharia."
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
        <span className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-[#EDA700]" aria-hidden="true" />
      </div>
      <figcaption className="mt-4">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#315676]">Diretores</span>
        <span className="mt-1 block font-display text-base font-bold leading-tight text-[#2D3845] md:text-lg">
          Denis Salles, Cristiano Salles e Eric Salles
        </span>
      </figcaption>
    </figure>
  );
}

export default function AboutSummarySection() {
  return (
    <section aria-labelledby="a-duall" className="relative overflow-hidden bg-white py-20 md:py-24">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUpVariants}
          className="grid items-end gap-6 border-b border-slate-200 pb-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="space-y-4 lg:col-span-7">
            <Eyebrow>A Duall</Eyebrow>
            <h2 id="a-duall" className="max-w-xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-5xl">
              Comprometimento é o nosso ponto de partida<span className="text-[#EDA700]">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-slate-600 lg:col-span-5">
            Entendemos que, quando um projeto nasce, expectativas são criadas.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUpVariants}
            className="lg:col-span-7"
          >
            <DirectorsPhoto />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainerVariants}
            className="lg:col-span-5"
          >
            <motion.ol variants={staggerContainerVariants}>
              {PILLARS.map(({ title, text, Icon }, i) => (
                <motion.li
                  key={title}
                  variants={staggerItemVariants}
                  className="group/item flex gap-4 border-b border-slate-200 py-5 first:pt-0"
                >
                  <span className="pt-1 font-mono text-[11px] font-bold text-slate-400">{pad(i + 1)}</span>
                  <div>
                    <p className="flex items-center gap-2.5 font-display text-lg font-bold text-[#2D3845]">
                      <Icon
                        size={20}
                        className="text-[#315676] transition duration-300 group-hover/item:text-[#EDA700]"
                        aria-hidden="true"
                      />
                      {title}
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            <motion.ul
              variants={staggerContainerVariants}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
              aria-label="Princípios"
            >
              {PRINCIPLES.map((principle) => (
                <motion.li
                  key={principle}
                  variants={staggerItemVariants}
                  className="flex items-center gap-2 text-xs font-semibold text-[#315676]"
                >
                  <span className="h-1 w-1 rounded-full bg-[#EDA700]" aria-hidden="true" />
                  {principle}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUpVariants} className="mt-8">
              <ButtonLink to="/a-duall">Conhecer a Duall</ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
