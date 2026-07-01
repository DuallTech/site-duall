import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Flame,
  Landmark,
  Layers,
  ShieldCheck,
  SunMedium,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
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
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
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
      "Piscinas, fontes e espelhos d'água;",
      'Sistemas de filtragem e tratamento de água;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80',
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
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
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
      'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80',
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
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
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
  {
    id: 'aprovacao-concessionaria',
    eyebrow: 'Aprovação',
    title: 'Concessionária',

    description: 'Elaboração e acompanhamento de projetos para aprovação junto às concessionárias de energia e água, garantindo regularização completa e conformidade com todos os requisitos técnicos e legais.',
    icon: Landmark,
    details: [
      'Projeto de entrada e medição de energia elétrica;',
      'Acompanhamento junto à concessionária de energia;',
      'Projeto de ramal de água e esgoto;',
      'Aprovação junto à concessionária de saneamento;',
      'Memorial descritivo e documentação técnica;',
      'ART/RRT de projetos e acompanhamento de obras;',
      'Regularização de instalações existentes;',
      'Ligação definitiva e vistoria técnica final;',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

export default function AreasAtuacaoSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  const openService = (id: string) => { setSelectedService(id); setGalleryIndex(0); };
  const closeService = () => setSelectedService(null);
  const prevImage = (len: number) => setGalleryIndex((i) => (i - 1 + len) % len);
  const nextImage = (len: number) => setGalleryIndex((i) => (i + 1) % len);

  useEffect(() => {
    if (!selectedService || isGalleryHovered) return;
    const area = SERVICE_AREAS.find((a) => a.id === selectedService);
    if (!area || area.gallery.length <= 1) return;
    const t = setInterval(() => setGalleryIndex((i) => (i + 1) % area.gallery.length), 3500);
    return () => clearInterval(t);
  }, [selectedService, isGalleryHovered]);

  return (
    <section id="especialidades" className="py-20 md:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1992BB]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1992BB] font-mono mb-4">
            <span className="h-px w-4 bg-[#1992BB]" />
            Especialidades
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#1c2e3f] md:text-4xl">
            Nossas Áreas de Atuação
          </h2>
          <p className="mt-4 text-slate-500 text-base leading-relaxed">
            Soluções técnicas completas em projetos de instalações, desenvolvidas por especialistas com mais de 12 anos de experiência no mercado.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedService ? (
            /* ── GRID VIEW ─────────────────────────────── */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SERVICE_AREAS.map((area, index) => {
                    const Icon = area.icon;
                    const num = String(index + 1).padStart(2, '0');
                    return (
                      <button
                        key={area.id}
                        onClick={() => openService(area.id)}
                        className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 text-left cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
                      >
                        {/* Image header */}
                        <div className="relative h-40 overflow-hidden bg-slate-200 shrink-0">
                          <img
                            src={area.gallery[0]}
                            alt={area.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#1c2e3f]/70 via-[#1c2e3f]/10 to-transparent" />
                          <span className="absolute top-3 right-3 font-mono text-[10px] font-bold text-white/80 bg-black/25 backdrop-blur-sm rounded-full px-2 py-0.5">{num}</span>
                        </div>

                        {/* Floating icon on boundary */}
                        <div className="relative px-5">
                          <div className="absolute -top-5 left-5 w-10 h-10 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1992BB] group-hover:border-[#1992BB]">
                            <Icon size={19} strokeWidth={1.7} className="text-[#1992BB] transition-colors duration-300 group-hover:text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 px-5 pt-8 pb-5">
                          <div className="flex-1 space-y-1">
                            {area.eyebrow && (
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1992BB]/70">{area.eyebrow}</p>
                            )}
                            <h4 className="font-display font-extrabold text-[1.05rem] leading-snug text-[#1c2e3f] group-hover:text-[#1992BB] transition-colors duration-300">{area.title}</h4>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#1992BB] transition-colors duration-300">Ver detalhes</span>
                            <ArrowRight size={15} className="text-slate-300 group-hover:translate-x-1 group-hover:text-[#1992BB] transition-all duration-300" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
                  className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl"
                >
                  {/* Hero: dark left panel + image carousel */}
                  <div className="grid lg:grid-cols-[420px_1fr]">

                    {/* LEFT — dark info panel */}
                    <div className="bg-[#1c2e3f] px-8 py-8 flex flex-col gap-6 min-h-105">
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
      </div>
    </section>
  );
}
