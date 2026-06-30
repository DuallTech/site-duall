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

function getIconComponent(iconName: string) {
  switch (iconName) {
    case 'Zap':
      return <Zap className="text-sky-500 shrink-0" size={24} />;
    case 'Droplet':
      return <Droplet className="text-sky-500 shrink-0" size={24} />;
    case 'ShieldAlert':
      return <Shield className="text-rose-500 shrink-0" size={24} />;
    case 'Wrench':
      return <Wrench className="text-teal-500 shrink-0" size={24} />;
    case 'Cpu':
      return <Cpu className="text-[#EDA700] shrink-0" size={24} />;
    default:
      return <Cpu className="text-slate-500 shrink-0" size={24} />;
  }
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
