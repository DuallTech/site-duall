import { motion } from 'motion/react';
import { ArrowRight, Boxes, Flame, ShieldCheck, SunMedium, Zap } from 'lucide-react';

import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from './animations';

const serviceAreas = [
  {
    id: 'instalacoes-eletricas',
    eyebrow: 'Projetos de',
    title: 'Instalacoes Eletricas',
    description:
      'Projetos de instalacoes eletricas personalizados, atendendo as normas e diversas tipologias.',
    icon: Zap,
    span: '',
  },
  {
    id: 'instalacoes-para-sistemas',
    eyebrow: 'Projetos de',
    title: 'Instalacoes para Sistemas',
    description:
      'Projetos de instalacoes para sistemas, infra-estrutura e automacao, garantindo qualidade e eficiencia.',
    icon: Boxes,
    span: '',
  },
  {
    id: 'instalacoes-hidraulicas',
    eyebrow: 'Projetos de',
    title: 'Instalacoes Hidraulicas',
    description:
      'Projetos de instalacoes hidraulicas com detalhamento tecnico, desempenho e compatibilizacao entre disciplinas.',
    icon: ArrowRight,
    span: '',
  },
  {
    id: 'projetos-bim',
    eyebrow: '',
    title: 'Projetos BIM',
    description:
      'Representacao fiel aos projetos contemplados, inclusive aos detalhes tecnicos e dimensionais.',
    icon: Boxes,
    span: '',
  },
  {
    id: 'combate-incendio',
    eyebrow: '',
    title: 'Combate a Incendio',
    description:
      'Projetos de instalacoes de prevencao e combate a incendios que garantem seguranca e conformidade com as normas.',
    icon: Flame,
    span: '',
  },
  {
    id: 'corpo-de-bombeiro',
    eyebrow: '',
    title: 'Corpo de Bombeiro',
    description:
      'Garantimos conformidade com as exigencias legais e normas de seguranca, assegurando protecao e regularidade.',
    icon: ShieldCheck,
    span: '',
  },
  {
    id: 'aquecimento-solar',
    eyebrow: '',
    title: 'Aquecimento Solar',
    description:
      'Projetos de aquecimento solar eficientes e sustentaveis, com solucoes que atendem as necessidades do empreendimento.',
    icon: SunMedium,
    span: 'md:col-span-2',
  },
] as const;

function AreaCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  span,
}: (typeof serviceAreas)[number]) {
  return (
    <motion.article
      variants={staggerItemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`${span} group flex h-full flex-col justify-between border border-slate-200/90 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-shadow duration-200 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]`}
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-[0.9rem] uppercase tracking-[0.02em] text-[#0f4d79]">{eyebrow}</p>
            ) : null}
            <h3 className="mt-2 max-w-[13ch] text-[2rem] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-[#EDA700]">
              {title}
            </h3>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#EDA700]/25 bg-[#EDA700]/10 text-[#EDA700]">
            <Icon size={22} strokeWidth={2.2} />
          </div>
        </div>

        <p className="max-w-[28rem] text-[1.05rem] leading-8 text-[#103b5b]">{description}</p>
      </div>

      <a
        href="#contato"
        className="mt-8 inline-flex items-center gap-2 text-[1.05rem] font-medium text-[#0f4d79] transition group-hover:text-[#09314d]"
      >
        <span>Mais detalhes</span>
        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </motion.article>
  );
}

export default function SpecialitiesSection() {
  return (
    <section id="especialidades" aria-labelledby="spec-heading" className="bg-[#f7f8fb] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.92fr_1.28fr] lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-sm uppercase tracking-[0.03em] text-[#0f4d79]">Servicos</p>
            <h2
              id="spec-heading"
              className="mt-3 max-w-[12ch] font-display text-4xl font-extrabold leading-[0.96] tracking-tight text-[#1f3550] md:text-5xl"
            >
              Nossas Areas de Atuacao
            </h2>
            <p className="mt-7 max-w-xl text-[1.12rem] leading-9 text-[#123b5c]">
              Somos especialistas em projetos de instalacoes e cada servico e desenvolvido com maxima excelencia. Conheca nossas solucoes e inove o seu projeto!
            </p>

            <a
              href="#contato"
              className="mt-10 inline-flex items-center justify-center bg-[#0f4d79] px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#0b3c5f]"
            >
              Entre em contato
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {serviceAreas.map((area) => (
              <AreaCard key={area.id} {...area} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
