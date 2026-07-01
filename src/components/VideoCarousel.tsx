import { useState } from 'react';
import {
  Building2,
  FileText,
  PlayCircle,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import duallTeamImage from '../assets/images/diretores_duall.jpeg';

interface VideoCarouselProps {
  isHighContrast: boolean;
}

const ABOUT_VIDEO_URL =
  'https://space-duall.sfo3.digitaloceanspaces.com/institucional/44a10deb-7b88-4158-a8cd-d55feca6f306.mp4';

type TabId = 'descricao' | 'video';

const TABS: Array<{ id: TabId; label: string; icon: typeof FileText }> = [
  { id: 'descricao', label: 'A Duall', icon: FileText },
  { id: 'video', label: 'Vídeo Institucional', icon: PlayCircle },
];

const VIDEO_LEAD_TEXT =
  'Comprometimento significa obrigação, dever. Envolve a responsabilidade de cumprir com o planejado, de realizar um acordo. Por isso, comprometimento é a palavra que rege o nosso trabalho.';

const VIDEO_TEXT_PARAGRAPHS = [
  'Nós somos um time de engenheiros incansáveis em buscar a melhor solução para sua necessidade. Vamos conquistar a sua confiança de que pontualidade, qualidade, precisão e bom atendimento podem andar juntos.',
  'Somos uma equipe que segue normas, respeita padrões e se motiva pelo sucesso dos nossos clientes. Oferecemos soluções, mas também opções de escolha, garantindo agilidade e prontidão em qualquer etapa do processo.',
  'Entendemos que, quando um projeto nasce, expectativas são criadas. E é por isso que entregar no prazo estabelecido é a nossa missão, com ética, responsabilidade e conhecimento técnico de ponta.',
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
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-8 md:p-10 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#315676]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#315676]">
                  <Building2 size={14} />
                  Sobre a Duall
                </span>

                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                  Referência em projetos de instalações e gestão de engenharia
                </h3>

                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  A Duall Engenharia, empresa especializada em Projetos de Instalações, é referência de qualidade no
                  desenvolvimento e gestão de projetos de engenharia no país e conta com profissionais altamente
                  qualificados e motivados para garantir a excelência na entrega dos projetos de engenharia,
                  maximizando valor aos nossos clientes, respeitando as normas que regulamentam o exercício da
                  profissão e atuando com ética, responsabilidade e conhecimento técnico de ponta.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  Com mais de 12 anos de experiência, nossos gestores já desenvolveram mais de 500 empreendimentos,
                  desde o residencial, comercial, mistos, industrial, shopping centers, hospitalar e mobilidade urbana
                  por todo o país.
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
                  <video controls preload="metadata" className="aspect-[16/10] w-full bg-black lg:aspect-video">
                    <source src={ABOUT_VIDEO_URL} type="video/mp4" />
                    Seu navegador não suporta reprodução de vídeo.
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
        )}
      </AnimatePresence>
    </div>
  );
}
