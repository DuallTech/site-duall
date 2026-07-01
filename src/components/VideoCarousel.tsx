import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplet,
  FileText,
  Flame,
  Layers,
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
  { id: 'atuacao', label: 'Áreas de Atuação', icon: Blocks },
  { id: 'video', label: 'Vídeo Institucional', icon: PlayCircle },
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
    description: 'Projetos de instalações elétricas personalizados, atendendo as normas técnicas vigentes e diversas tipologias de edificações residenciais, comerciais e industriais.',
    icon: Zap,
    details: [
      'Instalações de alimentação de energia;',
      'Rede de entrada de energia com subestação em Média Tensão;',
      'Rede de entrada de energia em Baixa Tensão;',
      'Distribuição de energia em Média e Baixa Tensão;',
      'Quadros gerais e circuitos de distribuição em Baixa Tensão;',
      'Circuitos e pontos de alimentação específicos (ar condicionado, ventilação, motores, bombas);',
      'Sistemas de iluminação da área total de implantação;',
      'Circuitos e pontos de alimentação de uso geral;',
      'Quadros de força e funcionais para equipamentos;',
      'Quadros terminais para iluminação e tomadas;',
      'SPDA — Sistema de proteção contra descargas atmosféricas;',
      'Sistema de proteção contra choques elétricos;',
      'Sistema de aterramento funcional e de proteção geral;',
      'Projeto e dimensionamento de Gerador para cargas essenciais;',
      'Aprovações: Entrada e medição de energia;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'instalacoes-para-sistemas',
    eyebrow: 'Projetos de',
    title: 'Instalações para Sistemas',
    description: 'Projetos de instalações para sistemas, infraestrutura e automação predial com tecnologia de ponta, garantindo qualidade, eficiência e integração total.',
    icon: Blocks,
    details: [
      'Infraestrutura para cabeamento estruturado (lógico e telefônico);',
      'Sistemas de automação predial e BMS;',
      'CFTV — circuito fechado de televisão;',
      'Controle de acesso e segurança eletrônica;',
      'Sistemas de som ambiente e comunicação interna;',
      'Infraestrutura para redes Wi-Fi corporativas;',
      'Sistemas de gerenciamento de energia (SGE);',
      'Infraestrutura para recarga de veículos elétricos;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'instalacoes-hidraulicas',
    eyebrow: 'Projetos de',
    title: 'Instalações Hidráulicas',
    description: 'Projetos de instalações hidráulicas com detalhamento técnico rigoroso, alto desempenho e compatibilização entre todas as disciplinas do empreendimento.',
    icon: Droplet,
    details: [
      'Sistemas de abastecimento de água fria;',
      'Sistemas de água quente e aquecimento solar;',
      'Esgoto sanitário e ventilação de tubulações;',
      'Captação e aproveitamento de águas pluviais;',
      'Sistemas de reúso e reaproveitamento de água;',
      'Irrigação automática e paisagismo;',
      'Piscinas, fontes e espelhos d\'água;',
      'Sistemas de filtragem e tratamento de água;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581094751180-2292a8cf2723?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'projetos-bim',
    eyebrow: 'Projetos',
    title: 'BIM — Modelagem 3D',
    description: 'Representação fiel e tridimensional de todos os projetos, com compatibilização entre disciplinas, detecção de interferências e entrega em nível de detalhe LOD 300 a 400.',
    icon: Layers,
    details: [
      'Modelagem 3D multidisciplinar em Revit/Autodesk;',
      'Compatibilização e coordenação entre disciplinas;',
      'Clash detection — detecção e resolução de interferências;',
      'LOD 300 a 400 conforme exigência do cliente;',
      'Exportação IFC para plataformas de gestão colaborativa;',
      'Maquetes virtuais e renderizações para apresentação;',
      'Relatórios de interferências com rastreabilidade por revisão;',
      'Integração arquitetura, estrutura e instalações em modelo único;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'combate-incendio',
    eyebrow: 'Projetos de',
    title: 'Combate a Incêndio',
    description: 'Projetos completos de prevenção e combate a incêndios, garantindo segurança total e conformidade com as normas técnicas e exigências do Corpo de Bombeiros.',
    icon: Flame,
    details: [
      'Sistemas de sprinklers (chuveiros automáticos);',
      'Hidrantes e mangotinhos;',
      'Detectores de fumaça, calor e gás;',
      'Alarmes de incêndio e central de detecção;',
      'Iluminação de emergência e saídas sinalizadas;',
      'Extintores portáteis e sobre rodas;',
      'Sistemas de supressão por gás (salas técnicas);',
      'Rotas de fuga e planos de evacuação;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516216621174-bfa2196cfcf0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'corpo-de-bombeiro',
    eyebrow: 'Aprovação',
    title: 'Corpo de Bombeiro',
    description: 'Garantimos conformidade total com as exigências legais e normas de segurança, acompanhando o processo de aprovação junto ao Corpo de Bombeiros do início ao fim.',
    icon: ShieldCheck,
    details: [
      'Elaboração do PPCI (Plano de Prevenção e Proteção Contra Incêndio);',
      'Acompanhamento técnico junto ao Corpo de Bombeiros;',
      'Aprovação de projetos de segurança contra incêndio;',
      'Laudo técnico de vistoria e regularização;',
      'Memorial descritivo para aprovação oficial;',
      'Adequação às normas ABNT e às IT do CB estadual;',
      'Consultoria em licenciamento e alvará de funcionamento;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516216621174-bfa2196cfcf0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'aquecimento-solar',
    eyebrow: 'Projetos de',
    title: 'Aquecimento Solar',
    description: 'Projetos de aquecimento solar eficientes e sustentáveis, com estudo de viabilidade, dimensionamento completo e integração total ao projeto hidráulico.',
    icon: SunMedium,
    details: [
      'Dimensionamento de coletores solares térmicos;',
      'Reservatórios térmicos (boilers) e sistemas de acumulação;',
      'Integração com sistema de apoio a gás ou elétrico;',
      'Integração com projeto hidráulico e de água quente;',
      'Estudo de viabilidade energética e payback;',
      'Sistemas fotovoltaicos para geração de energia;',
      'Monitoramento de desempenho e eficiência energética;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

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
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  const openService = (id: string) => { setSelectedService(id); setGalleryIndex(0); };
  const closeService = () => setSelectedService(null);
  const prevImage = (len: number) => setGalleryIndex((i) => (i - 1 + len) % len);
  const nextImage = (len: number) => setGalleryIndex((i) => (i + 1) % len);

  // Auto-advance gallery — pauses on hover
  useEffect(() => {
    if (!selectedService || isGalleryHovered) return;
    const area = SERVICE_AREAS.find((a) => a.id === selectedService);
    if (!area || area.gallery.length <= 1) return;
    const t = setInterval(() => setGalleryIndex((i) => (i + 1) % area.gallery.length), 3500);
    return () => clearInterval(t);
  }, [selectedService, isGalleryHovered]);

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
              isHighContrast ? 'border-white bg-black' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <AnimatePresence mode="wait">
              {!selectedService ? (
                /* ── GRID VIEW ─────────────────────────────── */
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="px-8 py-7 bg-white border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[#1992BB] text-[10px] font-bold uppercase tracking-[0.22em] font-mono mb-2">
                          <span className="h-px w-4 bg-[#1992BB]" />Serviços
                        </span>
                        <h3 className="font-display text-2xl md:text-[1.75rem] font-extrabold text-[#1c2e3f] leading-tight tracking-tight">
                          Nossas Áreas de Atuação
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        Clique em um serviço para ver todos os detalhes.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-5 md:p-7">
                    {SERVICE_AREAS.map((area, index) => {
                      const Icon = area.icon;
                      const num = String(index + 1).padStart(2, '0');
                      return (
                        <button
                          key={area.id}
                          onClick={() => openService(area.id)}
                          className="relative flex flex-col p-5 rounded-2xl bg-white cursor-pointer transition-all duration-200 border-2 border-slate-100 hover:border-[#1992BB]/50 hover:shadow-lg hover:shadow-[#1992BB]/8 hover:-translate-y-1 text-left group"
                        >
                          <div className="flex items-start justify-between mb-5">
                            <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-[#1992BB] flex items-center justify-center transition-all duration-200">
                              <Icon size={20} strokeWidth={1.8} className="text-[#1c2e3f] group-hover:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-[#1992BB] transition-colors duration-200">{num}</span>
                          </div>
                          <div className="flex-1 space-y-0.5">
                            {area.eyebrow && (
                              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#1992BB] transition-colors duration-200">{area.eyebrow}</p>
                            )}
                            <h4 className="font-display font-extrabold text-[0.95rem] leading-snug text-[#1c2e3f] group-hover:text-[#1992BB] transition-colors duration-200">{area.title}</h4>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-100 group-hover:border-[#1992BB]/15 flex items-center justify-between transition-colors duration-200">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#1992BB] transition-colors duration-200">Ver detalhes</span>
                            <ArrowRight size={13} className="text-slate-300 group-hover:text-[#1992BB] group-hover:translate-x-0.5 transition-all duration-200" />
                          </div>
                          <div className="absolute left-0 top-5 bottom-5 w-0.5 rounded-full bg-transparent group-hover:bg-[#1992BB] transition-all duration-200" />
                        </button>
                      );
                    })}
                    {/* CTA card */}
                    <a href="#contato" className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-[#1c2e3f] border-2 border-[#1c2e3f] cursor-pointer group hover:bg-[#152438] hover:border-[#1992BB]/40 transition-all duration-200 text-center">
                      <div className="w-11 h-11 rounded-xl bg-[#EDA700]/15 flex items-center justify-center group-hover:bg-[#EDA700]/25 transition-colors duration-200">
                        <ArrowRight size={20} className="text-[#EDA700]" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-white text-sm leading-snug">Solicitar Proposta</h4>
                        <p className="text-slate-400 text-[10px] mt-0.5 leading-snug">Fale com um especialista</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              ) : (() => {
                /* ── DETAIL VIEW ────────────────────────────── */
                const area = SERVICE_AREAS.find((a) => a.id === selectedService)!;
                const Icon = area.icon;
                return (
                  <motion.div
                    key={selectedService}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Hero: dark left panel + image carousel */}
                    <div className="grid lg:grid-cols-[420px_1fr]">

                      {/* LEFT — dark info panel */}
                      <div className="bg-[#1c2e3f] px-8 py-8 flex flex-col gap-6 min-h-[420px]">
                        <button
                          onClick={closeService}
                          className="inline-flex items-center gap-1.5 text-slate-400 text-xs font-semibold hover:text-white transition-colors group w-fit"
                        >
                          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                          Voltar aos Serviços
                        </button>

                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#EDA700]/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon size={22} className="text-[#EDA700]" strokeWidth={1.8} />
                          </div>
                          <div>
                            {area.eyebrow && (
                              <p className="text-[#1992BB] text-[10px] font-bold uppercase tracking-widest mb-1">{area.eyebrow}</p>
                            )}
                            <h3 className="font-display text-2xl md:text-[1.6rem] font-extrabold text-white leading-tight tracking-tight">
                              {area.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-slate-300 text-sm leading-relaxed">{area.description}</p>

                        <p className="text-slate-400 text-xs leading-relaxed">
                          Confira ao lado nossa galeria de projetos e abaixo a lista completa de serviços.
                        </p>

                        <div className="mt-auto flex flex-col gap-2.5">
                          <a
                            href="#contato"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#EDA700] text-slate-900 text-sm font-bold rounded-xl hover:bg-[#d4960a] transition-colors"
                          >
                            Solicitar Proposta
                            <ArrowRight size={15} />
                          </a>
                          <a
                            href="#contato"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/15 text-white text-sm font-semibold rounded-xl hover:bg-white/8 transition-colors"
                          >
                            Falar com Especialista
                          </a>
                        </div>
                      </div>

                      {/* RIGHT — auto-carousel */}
                      <div
                        className="relative bg-slate-900 min-h-80 lg:min-h-full overflow-hidden"
                        onMouseEnter={() => setIsGalleryHovered(true)}
                        onMouseLeave={() => setIsGalleryHovered(false)}
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={galleryIndex}
                            src={area.gallery[galleryIndex]}
                            alt={`${area.title} — imagem ${galleryIndex + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 to-transparent pointer-events-none" />

                        {/* Prev / Next */}
                        <button
                          onClick={() => prevImage(area.gallery.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={() => nextImage(area.gallery.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition"
                        >
                          <ChevronRight size={18} />
                        </button>

                        {/* Progress dots + counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                          <div className="flex gap-1.5">
                            {area.gallery.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setGalleryIndex(idx)}
                                className={`rounded-full transition-all duration-300 ${idx === galleryIndex ? 'w-6 h-2 bg-[#EDA700]' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
                              />
                            ))}
                          </div>
                          <span className="text-white/60 text-[10px] font-mono">
                            {galleryIndex + 1}/{area.gallery.length}
                          </span>
                        </div>

                        {/* Auto-play indicator */}
                        {!isGalleryHovered && (
                          <div className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 text-[9px] text-white/60 font-mono uppercase tracking-widest">
                            auto
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Full checklist */}
                    <div className="px-7 py-8 bg-white border-t border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="h-px flex-1 bg-slate-100" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1992BB] whitespace-nowrap">
                          Lista Completa de Serviços
                        </p>
                        <span className="h-px flex-1 bg-slate-100" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                        {area.details.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-[#EDA700] shrink-0 mt-0.5" />
                            <span className="text-[#1c2e3f] text-sm leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
