import { useState } from 'react';
import {
  ArrowRight,
  Blocks,
  Building2,
  FileText,
  Flame,
  PlayCircle,
  ShieldCheck,
  SunMedium,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import duallTeamImage from '../assets/images/diretores_duall.jpeg';

interface VideoCarouselProps {
  isHighContrast: boolean;
}

const ABOUT_VIDEO_URL =
  'https://space-duall.sfo3.digitaloceanspaces.com/institucional/44a10deb-7b88-4158-a8cd-d55feca6f306.mp4';

const TABS = [
  { id: 'descricao', label: 'A Duall', icon: FileText },
  { id: 'video', label: 'Video Institucional', icon: PlayCircle },
  { id: 'atuacao', label: 'Areas de Atuacao', icon: Blocks },
] as const;

const VIDEO_LEAD_TEXT =
  'Comprometimento significa obrigacao, dever. Envolve a responsabilidade de cumprir com o planejado, de realizar um acordo. Por isso, comprometimento e a palavra que rege o nosso trabalho.';

const VIDEO_TEXT_PARAGRAPHS = [
  'Nos somos um time de engenheiros incansaveis em buscar a melhor solucao para sua necessidade. Vamos conquistar a sua confianca de que pontualidade, qualidade, precisao e bom atendimento podem andar juntos.',
  'Somos uma equipe que segue normas, respeita padroes e se motiva pelo sucesso dos nossos clientes. Oferecemos solucoes, mas tambem opcoes de escolha, garantindo agilidade e prontidao em qualquer etapa do processo.',
  'Entendemos que, quando um projeto nasce, expectativas sao criadas. E e por isso que entregar no prazo estabelecido e a nossa missao, com etica, responsabilidade e conhecimento tecnico de ponta.',
] as const;

const SERVICE_AREAS = [
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
      'Projetos de instalacoes para sistemas, infra-estrutura e automacao, garantindo a qualidade e eficiencia.',
    icon: Blocks,
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
    icon: Blocks,
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
      'Projetos de aquecimento solar eficientes e sustentaveis, oferecendo solucoes que atendem as necessidades do empreendimento.',
    icon: SunMedium,
    span: 'md:col-span-2',
  },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function VideoCarousel({ isHighContrast }: VideoCarouselProps) {
  const [activeTab, setActiveTab] = useState<TabId>('descricao');

  return (
    <div className="space-y-8">
      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex cursor-pointer items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 font-display text-sm font-semibold transition-all ${
                isActive
                  ? 'border-duall-blue text-duall-blue'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'descricao' ? (
          <motion.div
            key="descricao"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className={`overflow-hidden rounded-3xl border shadow-xl ${
              isHighContrast
                ? 'border-white bg-black text-white'
                : 'border-slate-200 bg-white text-slate-800'
            }`}
          >
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-8 md:p-10 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#315676]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#315676]">
                  <Building2 size={14} />
                  Sobre a Duall
                </span>

                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                  Referencia em projetos de instalacoes e gestao de engenharia
                </h3>

                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  A Duall Engenharia, empresa especializada em Projetos de Instalacoes, e referencia de qualidade no
                  desenvolvimento e gestao de projetos de engenharia no pais e conta com profissionais altamente
                  qualificados e motivados para garantir a excelencia na entrega dos projetos de engenharia,
                  maximizando valor aos nossos clientes, respeitando as normas que regulamentam o exercicio da
                  profissao e atuando com etica, responsabilidade e conhecimento tecnico de ponta.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  Com mais de 12 anos de experiencia, nossos gestores ja desenvolveram mais de 500 empreendimentos,
                  desde o residencial, comercial, mistos, industrial, shopping centers, hospitalar e mobilidade urbana
                  por todo o pais.
                </p>
              </div>

              <div className="relative min-h-70 overflow-hidden bg-slate-200 lg:min-h-full">
                <img
                  src={duallTeamImage}
                  alt="Equipe da Duall Engenharia"
                  className="absolute inset-0 h-full w-full object-[50%_68%] object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/55 via-slate-950/12 to-transparent" />

                <div className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
                  <div className="inline-flex max-w-full rounded-2xl border border-white/20 bg-slate-950/55 px-4 py-3 backdrop-blur-sm">
                    <div className="text-white">
                      <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-sky-200/85">
                        Diretores
                      </p>
                      <h4 className="mt-2 font-display text-xl font-bold">
                        Denis Salles, Cristiano Salles e Eric Salles
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'video' ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className={`overflow-hidden rounded-3xl border shadow-2xl ${
              isHighContrast
                ? 'border-white bg-black text-white'
                : 'border-slate-200 bg-white text-slate-800'
            }`}
          >
            <div className="border-b border-slate-200 bg-white px-6 py-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1992BB]">
                Video Institucional
              </p>
              <h3 className="mt-2 max-w-4xl font-display text-2xl font-extrabold leading-tight tracking-tight text-[#0f4f7b] md:text-3xl">
                {VIDEO_LEAD_TEXT}
              </h3>
            </div>

            <div className="bg-white p-4 md:p-6">
              <article className="max-w-none text-slate-700">
                <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-xl lg:float-left lg:mb-6 lg:mr-8 lg:w-[58%] xl:w-[62%]">
                  <video controls preload="metadata" className="aspect-[16/10] w-full bg-black lg:aspect-video">
                    <source src={ABOUT_VIDEO_URL} type="video/mp4" />
                    Seu navegador nao suporta reproducao de video.
                  </video>
                </div>

                {VIDEO_TEXT_PARAGRAPHS.map((paragraph, index) => (
                  <p
                    key={`${index}-${paragraph.slice(0, 24)}`}
                    className={`${index === 0 ? '' : 'mt-5'} text-sm leading-relaxed text-slate-600 md:text-base`}
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="clear-both" />
              </article>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="atuacao"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className={`overflow-hidden rounded-3xl border shadow-xl ${
              isHighContrast
                ? 'border-white bg-black text-white'
                : 'border-slate-200 bg-[#f7f8fb] text-slate-800'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr]">
              <div className="p-8 md:p-10 lg:p-12">
                <p className="text-sm uppercase tracking-[0.04em] text-[#0f4d79]">Servicos</p>
                <h3 className="mt-3 max-w-[11ch] font-display text-3xl font-extrabold leading-[0.96] tracking-tight text-[#1f3550] md:text-4xl">
                  Nossas Areas de Atuacao
                </h3>
                <p className="mt-5 max-w-md text-[1rem] leading-7 text-[#123b5c]">
                  Somos especialistas em projetos de instalacoes e cada servico e desenvolvido com maxima excelencia.
                  Conheca nossas solucoes e inove o seu projeto!
                </p>

                <a
                  href="#contato"
                  className="mt-8 inline-flex items-center justify-center rounded-md bg-[#0f4d79] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0b3c5f]"
                >
                  Entre em contato
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 md:p-6 lg:p-8">
                {SERVICE_AREAS.map((area) => {
                  const Icon = area.icon;

                  return (
                    <article
                      key={area.id}
                      className={`${area.span} group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)]`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {area.eyebrow ? (
                              <p className="text-[0.82rem] uppercase tracking-[0.03em] text-[#0f4d79]">{area.eyebrow}</p>
                            ) : null}
                            <h4 className="mt-2 max-w-[13ch] text-[1.55rem] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-[#0f4d79] md:text-[1.7rem]">
                              {area.title}
                            </h4>
                          </div>

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#315676]/20 bg-[#315676]/8 text-[#315676]">
                            <Icon size={18} strokeWidth={2.2} />
                          </div>
                        </div>

                        <p className="text-[0.95rem] leading-7 text-[#103b5b]">{area.description}</p>
                      </div>

                      <a
                        href="#contato"
                        className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#0f4d79] transition group-hover:text-[#09314d]"
                      >
                        <span>Mais detalhes</span>
                        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </article>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
