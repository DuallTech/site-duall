import { useState } from 'react';
import {
  ArrowRight,
  Blocks,
  Building2,
  Check,
  FileText,
  Flame,
  PlayCircle,
  ShieldCheck,
  SunMedium,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import duallTeamImage from '../assets/images/diretores_duall.jpeg';

interface VideoCarouselProps {
  isHighContrast: boolean;
}

const ABOUT_VIDEO_URL =
  'https://space-duall.sfo3.digitaloceanspaces.com/institucional/44a10deb-7b88-4158-a8cd-d55feca6f306.mp4';

const TABS = [
  { id: 'descricao', label: 'A Duall', icon: FileText },
  { id: 'video', label: 'Vídeo Institucional', icon: PlayCircle },
  { id: 'atuacao', label: 'Áreas de Atuação', icon: Blocks },
] as const;

const VIDEO_LEAD_TEXT =
  'Comprometimento significa obrigação, dever. Envolve a responsabilidade de cumprir com o planejado, de realizar um acordo. Por isso, comprometimento é a palavra que rege o nosso trabalho.';

const VIDEO_TEXT_PARAGRAPHS = [
  'Nós somos um time de engenheiros incansáveis em buscar a melhor solução para sua necessidade. Vamos conquistar a sua confiança de que pontualidade, qualidade, precisão e bom atendimento podem andar juntos.',
  'Somos uma equipe que segue normas, respeita padrões e se motiva pelo sucesso dos nossos clientes. Oferecemos soluções, mas também opções de escolha, garantindo agilidade e prontidão em qualquer etapa do processo.',
  'Entendemos que, quando um projeto nasce, expectativas são criadas. E é por isso que entregar no prazo estabelecido é a nossa missão, com ética, responsabilidade e conhecimento técnico de ponta.',
] as const;

const SERVICE_AREAS = [
  {
    id: 'instalacoes-eletricas',
    eyebrow: 'Projetos de',
    title: 'Instalações Elétricas',
    description:
      'Projetos de instalações elétricas personalizados, atendendo às normas e diversas tipologias.',
    icon: Zap,
    span: '',
    services: [
      'Instalações de alimentação de energia',
      'Rede de entrada de energia com subestação em Média Tensão',
      'Rede de entrada de energia em Baixa Tensão',
      'Distribuição de energia em Média e Baixa tensão',
      'Quadros gerais e circuitos de distribuição em Baixa Tensão',
      'Circuitos e pontos de alimentação específicos',
      'Sistemas de iluminação da área total de implantação',
      'Circuitos e pontos de alimentação de uso geral',
      'Quadros de força e funcionais para equipamentos',
      'Quadros terminais para iluminação e tomadas',
      'SPDA e proteção contra choques elétricos',
      'Sistema de aterramento funcional e de proteção geral',
      'Projeto e dimensionamento de gerador',
      'Aprovações de entrada e medição de energia',
    ],
  },
  {
    id: 'instalacoes-para-sistemas',
    eyebrow: 'Projetos de',
    title: 'Instalações para Sistemas',
    description:
      'Projetos de instalações para sistemas, infraestrutura e automação, garantindo a qualidade e eficiência.',
    icon: Blocks,
    span: '',
    services: [
      'Instalações para sistemas de rede para voz e dados',
      'Rede de entrada de comunicações',
      'Rede primária para distribuição de voz e dados',
      'Rede secundária para alimentação dos pontos de voz e dados',
      'Rede de entrada de TV a cabo e antena TV/FM',
      'Rede primária para distribuição de CATV e CFTV',
      'Rede secundária para alimentação dos pontos de CATV e CFTV',
      'Sistemas de medição individualizada de energia, água e gás',
      'Sistema de detecção, alarme e apoio ao combate de incêndios',
      'Aprovações de tubulação de entrada da telefonia',
    ],
  },
  {
    id: 'instalacoes-hidraulicas',
    eyebrow: 'Projetos de',
    title: 'Instalações Hidráulicas',
    description:
      'Projetos de instalações hidráulicas com detalhamento técnico, desempenho e compatibilização entre disciplinas.',
    icon: ArrowRight,
    span: '',
    services: [
      'Instalações de água potável fria',
      'Instalações de água potável quente',
      'Instalações de esgotos sanitários',
      'Instalações de drenagem predial',
      'Instalações de gás natural e GLP',
    ],
  },
  {
    id: 'projetos-bim',
    eyebrow: '',
    title: 'Projetos BIM',
    description:
      'Representação fiel aos projetos contemplados, inclusive aos detalhes técnicos e dimensionais.',
    icon: Blocks,
    span: '',
    services: [
      'Projetos de instalações elétricas em metodologia BIM',
      'Projetos de sistemas em metodologia BIM',
      'Projetos hidráulicos em metodologia BIM',
      'Projetos de combate a incêndio em metodologia BIM',
      'Desenvolvimento em LOD 300',
      'Geometrias, dimensões, formas, quantidades e localização fiéis ao empreendimento',
    ],
  },
  {
    id: 'combate-incendio',
    eyebrow: '',
    title: 'Combate a Incêndio',
    description:
      'Projetos de instalações de prevenção e combate a incêndios que garantem segurança e conformidade com as normas.',
    icon: Flame,
    span: '',
    services: [
      'Hidrantes',
      'Dimensionamento da reserva de SPK',
      'Dimensionamento da rede de SPK',
      'Especificações de equipamentos, bicos, VGA e controle setorial',
    ],
  },
  {
    id: 'corpo-de-bombeiro',
    eyebrow: '',
    title: 'Corpo de Bombeiro',
    description:
      'Garantimos conformidade com as exigências legais e normas de segurança, assegurando proteção e regularidade.',
    icon: ShieldCheck,
    span: '',
    services: [
      'Extintores manuais',
      'Cartão de identificação',
      'Pasta do Projeto Técnico',
      'Formulário de segurança contra incêndio de Projeto Técnico',
      'Anotação de Responsabilidade Técnica (ART)',
      'Documentos complementares quando necessário',
      'Memoriais de cálculo e memorial descritivo',
      'Planta das medidas de segurança contra incêndio',
    ],
  },
  {
    id: 'aquecimento-solar',
    eyebrow: '',
    title: 'Aquecimento Solar',
    description:
      'Projetos de aquecimento solar eficientes e sustentáveis, oferecendo soluções que atendem às necessidades do empreendimento.',
    icon: SunMedium,
    span: 'md:col-span-2',
    services: [
      'Projeto completo com interface do projeto hidráulico',
      'Dimensionamento das placas e coletores solares',
      'Dimensionamento do boiler',
      'Dimensionamento do sistema auxiliar a gás ou elétrico',
      'Dimensionamento da rede primária e secundária',
    ],
  },
] as const;

type TabId = (typeof TABS)[number]['id'];

function getTooltipHeightClasses(itemsCount: number, isWideCard: boolean) {
  if (itemsCount <= 5) {
    return isWideCard
      ? 'hover:min-h-[250px] focus:min-h-[250px] md:hover:min-h-[270px] md:focus:min-h-[270px]'
      : 'hover:min-h-[240px] focus:min-h-[240px] md:hover:min-h-[255px] md:focus:min-h-[255px]';
  }

  if (itemsCount <= 8) {
    return isWideCard
      ? 'hover:min-h-[310px] focus:min-h-[310px] md:hover:min-h-[330px] md:focus:min-h-[330px]'
      : 'hover:min-h-[300px] focus:min-h-[300px] md:hover:min-h-[320px] md:focus:min-h-[320px]';
  }

  if (itemsCount <= 10) {
    return isWideCard
      ? 'hover:min-h-[360px] focus:min-h-[360px] md:hover:min-h-[390px] md:focus:min-h-[390px]'
      : 'hover:min-h-[350px] focus:min-h-[350px] md:hover:min-h-[380px] md:focus:min-h-[380px]';
  }

  return isWideCard
    ? 'hover:min-h-[420px] focus:min-h-[420px] md:hover:min-h-[450px] md:focus:min-h-[450px]'
    : 'hover:min-h-[430px] focus:min-h-[430px] md:hover:min-h-[470px] md:focus:min-h-[470px]';
}

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
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 md:p-6 lg:p-8">
              {SERVICE_AREAS.map((area) => {
                const Icon = area.icon;
                const tooltipHeightClasses = getTooltipHeightClasses(area.services.length, area.span === 'md:col-span-2');

                return (
                  <article
                    key={area.id}
                    tabIndex={0}
                    className={`${area.span} ${tooltipHeightClasses} group relative min-h-[172px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.04)] transition-[min-height,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)] focus:outline-none focus:ring-2 focus:ring-[#315676]/20 md:min-h-[184px]`}
                  >
                    <div className="pointer-events-none absolute inset-2 z-20 overflow-hidden rounded-[1.1rem] border border-[#315676]/12 bg-white/98 p-4 opacity-0 shadow-[0_18px_48px_rgba(15,23,42,0.14)] transition duration-200 group-hover:opacity-100 group-focus:opacity-100 md:inset-3 md:p-5">
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#315676]">
                        Lista completa de serviços
                      </p>
                      <ul className="mt-3 max-h-[calc(100%-2rem)] space-y-2 overflow-y-auto pr-1 text-[0.83rem] leading-5 text-[#103b5b] md:max-h-[calc(100%-2.25rem)]">
                        {area.services.map((service) => (
                          <li key={`${area.id}-${service}`} className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5 shrink-0 text-[#EDA700]" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {area.eyebrow ? (
                            <p className="text-[0.75rem] uppercase tracking-[0.03em] text-[#5b82a2]">{area.eyebrow}</p>
                          ) : null}
                          <h4 className="mt-1.5 max-w-[13ch] text-[1.28rem] font-extrabold uppercase leading-[1] tracking-[-0.03em] text-[#0f4d79] md:text-[1.42rem]">
                            {area.title}
                          </h4>
                        </div>

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#EDA700]/35 bg-[#EDA700]/10 text-[#EDA700]">
                          <Icon size={15} strokeWidth={2.2} />
                        </div>
                      </div>

                      <p className="text-[0.9rem] leading-6 text-[#103b5b]">{area.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
