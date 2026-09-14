import { useState } from 'react';
import {
  Building2,
  Compass,
  FileText,
  PlayCircle,
  Target,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import duallTeamImage from '../assets/images/diretores_duall.jpeg';

interface VideoCarouselProps {
  isHighContrast: boolean;
}

const ABOUT_VIDEO_EMBED_URL = 'https://www.youtube.com/embed/vMMo-JEr5rE';

type TabId = 'descricao' | 'missao' | 'video';

const TABS: Array<{ id: TabId; label: string; icon: typeof FileText }> = [
  { id: 'descricao', label: 'A Duall', icon: FileText },
  { id: 'missao', label: 'Missão, Visão e Valores', icon: Compass },
  { id: 'video', label: 'Vídeo Institucional', icon: PlayCircle },
];

const PRINCIPIOS = ['Ética', 'Comprometimento', 'Satisfação', 'Inovação', 'Humanização', 'Conhecimento Técnico'];

const VIDEO_LEAD_TEXT =
  'Comprometimento é o nosso ponto de partida. Assumimos o dever de cumprir com precisão cada acordo e planejamento.';

const VIDEO_TEXT_PARAGRAPHS = [
  'Foco em Soluções: Somos uma equipe de engenheiros dedicada a unir pontualidade, qualidade e excelência no atendimento.',
  'Agilidade e Normas: Trabalhamos alinhados aos padrões técnicos, oferecendo opções flexíveis e resposta rápida em qualquer etapa do projeto.',
  'Entregas no Prazo: Respeitamos a expectativa de cada cliente, garantindo prazos com ética, responsabilidade e alto conhecimento técnico.',
] as const;

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
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-1 lg:h-125">
              <div className="flex flex-col p-8 md:p-10 lg:h-full lg:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#315676]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#315676]">
                  <Building2 size={14} />
                  Sobre a Duall
                </span>

                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                  Referência em projetos de instalações e gestão de engenharia
                </h3>

                <div
                  className="mt-5 overflow-y-auto pr-4 lg:min-h-0 lg:flex-1"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#94a3b8 #f1f5f9',
                    scrollbarGutter: 'stable',
                  }}
                >
                  <p className="text-base leading-relaxed text-slate-600">
                    Todo projeto nasce de uma expectativa, e, para transformá-la em realidade, é preciso mais do que
                    conhecimento técnico: é preciso responsabilidade com cada decisão. Na Duall Engenharia,
                    projetamos instalações com precisão, organização e visão integrada, antecipando desafios,
                    coordenamos informações e desenvolvemos soluções que contribuem para obras mais seguras,
                    eficientes e bem executadas.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    Nosso compromisso é garantir tranquilidade aos clientes e, por isso, respeitamos prazos, seguimos
                    normas, mantemos uma coordenação técnica presente e conduzimos cada entrega com ética, clareza e
                    comprometimento.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    Acreditamos que a qualidade também se constrói nas relações, ouvimos, orientamos e permanecemos
                    disponíveis em todas as etapas do projeto, trabalhando de forma colaborativa porque sabemos que
                    confiança e satisfação se conquistam com proximidade, transparência, agilidade, excelência e
                    consistência.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    Também valorizamos quem faz a Duall acontecer, investindo no desenvolvimento da equipe e na
                    construção de um ambiente saudável, humano e colaborativo, onde o conhecimento é compartilhado e
                    cada profissional pode evoluir.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    A inovação nos move, por isso buscamos novas tecnologias, aprimoramos processos e transformamos
                    conhecimento técnico em soluções cada vez mais claras, ágeis e confiáveis.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    É assim que consolidamos a Duall como referência em projetos de instalações: unindo ética,
                    comprometimento, satisfação, inovação, humanização e conhecimento técnico. Mais do que
                    desenvolver projetos, entregamos tranquilidade em cada detalhe.
                  </p>
                </div>
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
                      <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-sky-200/85">Diretores</p>
                      <h4 className="mt-2 font-display text-xl font-bold">
                        Denis Salles, Cristiano Salles e Eric Salles
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'missao' ? (
          <motion.div
            key="missao"
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
            <div className="grid gap-6 p-8 md:p-10 lg:grid-cols-3 lg:p-12">
              <div
                className={`rounded-2xl border p-6 ${
                  isHighContrast ? 'border-white/30 bg-black' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#315676]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#315676]">
                  <Target size={14} />
                  Missão
                </span>
                <p className="mt-5 text-sm leading-relaxed text-slate-600 md:text-base">
                  Garantir tranquilidade aos nossos clientes, por meio de uma engenharia precisa, prazos
                  respeitados, coordenação técnica presente e prezar pelo desenvolvimento da equipe em um ambiente
                  saudável.
                </p>
              </div>

              <div
                className={`rounded-2xl border p-6 ${
                  isHighContrast ? 'border-white/30 bg-black' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#315676]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#315676]">
                  <Compass size={14} />
                  Visão
                </span>
                <p className="mt-5 text-sm leading-relaxed text-slate-600 md:text-base">
                  Consolidar a marca como referência em projetos de instalações.
                </p>
              </div>

              <div
                className={`rounded-2xl border p-6 ${
                  isHighContrast ? 'border-white/30 bg-black' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#315676]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#315676]">
                  <Building2 size={14} />
                  Princípios
                </span>
                <ul className="mt-5 space-y-2">
                  {PRINCIPIOS.map((principio) => (
                    <li key={principio} className="text-sm leading-relaxed text-slate-600 md:text-base">
                      {principio}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : (
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
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1992BB]">Vídeo Institucional</p>
              <h3 className="mt-2 max-w-4xl font-display text-2xl font-extrabold leading-tight tracking-tight text-[#0f4f7b] md:text-3xl">
                {VIDEO_LEAD_TEXT}
              </h3>
            </div>

            <div className="bg-white p-4 md:p-6">
              <article className="max-w-none text-slate-700">
                <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-xl lg:float-left lg:mb-6 lg:mr-8 lg:w-[58%] xl:w-[62%]">
                  <iframe
                    src={ABOUT_VIDEO_EMBED_URL}
                    title="Vídeo Institucional Duall Engenharia"
                    className="aspect-[16/10] w-full bg-black lg:aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
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
        )}
      </AnimatePresence>
    </div>
  );
}
