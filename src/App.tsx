/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Droplet,
  ShieldCheck,
  Wrench,
  Phone,
  Instagram,
  Award,
  CheckCircle2,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  Shield,
  Briefcase,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Cpu,
  FileText,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
  ChevronRight,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

// Static Data
import { SPECIALITIES, PORTFOLIO_PROJECTS } from './data';
import duallLogoUrl from './assets/images/Logo Horizontal - WEB@4x.png';
import duallLogoWhiteUrl from './assets/images/Logo Horizontal - branco@4x.png';

// Client logos (hosted locally for reliability)
import logoClientCyrela from './assets/images/clients/cyrela.svg';
import logoClientEztec from './assets/images/clients/eztec.svg';
import logoClientHelbor from './assets/images/clients/helbor.webp';
import logoClientDirecional from './assets/images/clients/direcional.png';
import logoClientCury from './assets/images/clients/cury.png';
import logoClientBild from './assets/images/clients/bild.svg';
import logoClientRni from './assets/images/clients/rni.svg';
import logoClientVitacon from './assets/images/clients/vitacon.svg';
import logoClientWtorre from './assets/images/clients/wtorre.svg';
import logoClientMpd from './assets/images/clients/mpd.png';

// Modular Components
import AccessibilityPanel from './components/AccessibilityPanel';
import ClashSimulator from './components/ClashSimulator';
import VideoCarousel from './components/VideoCarousel';
import ContactForm from './components/ContactForm';

// Scroll Animation Variants
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const heroImageVariants: Variants = {
  enter: { opacity: 0, scale: 1.12 },
  center: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      opacity: { duration: 1.5, ease: "easeInOut" },
      scale: { duration: 6.5, ease: "easeOut" }
    } 
  },
  exit: { 
    opacity: 0,
    transition: { duration: 1.5, ease: "easeInOut" } 
  }
};

const PARTNER_TESTIMONIALS = [
  {
    initials: 'MR',
    name: 'Marcos Ribeiro',
    role: 'Diretor de Obras',
    company: 'Construtora Alfa',
    text: 'A Duall é uma excelente parceira. Segue à risca o cronograma e sempre traz soluções inteligentes de modelagem e compatibilização 3D, poupando retrabalho no canteiro.',
    rating: 5,
  },
  {
    initials: 'CP',
    name: 'Carla Pinheiro',
    role: 'Gerente de Projetos',
    company: 'C2J Incorporadora',
    text: 'Fomos surpreendidos positivamente desde o início. O atendimento é muito próximo, e a equipe entrega segurança técnica em SPDA, elétrica e solar fotovoltaico.',
    rating: 5,
  },
  {
    initials: 'TS',
    name: 'Thiago Souza',
    role: 'Engenheiro Coordenador',
    company: 'RM Mais',
    text: 'Encontramos na Duall um parceiro sólido para instalações elétricas e redes de incêndio de alta complexidade. Suporte nota dez e cumprimento impecável de prazos.',
    rating: 5,
  },
  {
    initials: 'LF',
    name: 'Larissa Ferreira',
    role: 'Arquiteta Coordenadora',
    company: 'Núcleo Urbano',
    text: 'A compatibilização BIM evitou conflitos importantes entre estrutura e instalações. O processo ficou mais claro para toda a equipe e a obra ganhou previsibilidade.',
    rating: 5,
  },
  {
    initials: 'RG',
    name: 'Rafael Gomes',
    role: 'Sócio Diretor',
    company: 'Horizonte Engenharia',
    text: 'O diferencial da Duall está na agilidade com profundidade técnica. Eles entendem o projeto, propõem soluções e ajudam a destravar decisões com rapidez.',
    rating: 5,
  },
  {
    initials: 'AM',
    name: 'Amanda Moura',
    role: 'Coordenadora de Implantação',
    company: 'Vértice Construtora',
    text: 'Recebemos documentação organizada, comunicação objetiva e um acompanhamento muito próximo nas etapas críticas. Foi uma parceria que trouxe tranquilidade.',
    rating: 5,
  },
];

export default function App() {
  // Theme & Accessibility States
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra'>('normal');
  const [activeTab, setActiveTab] = useState<'all' | 'eletrico' | 'hidraulico' | 'incendio' | 'mecanico'>('all');
  const [expandedSpec, setExpandedSpec] = useState<string | null>('eletrico');
  const [testimonialCardsPerView, setTestimonialCardsPerView] = useState(3);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [cardSliderPercents, setCardSliderPercents] = useState<Record<string, number>>({});
  const cardSliderRefs = useRef<Record<string, HTMLDivElement>>({});

  const handleCardSliderPointerDown = (specId: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = cardSliderRefs.current[specId]?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setCardSliderPercents(prev => ({ ...prev, [specId]: percent }));
  };

  const handleCardSliderPointerMove = (specId: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const rect = cardSliderRefs.current[specId]?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setCardSliderPercents(prev => ({ ...prev, [specId]: percent }));
  };

  const getCardSliderPercent = (specId: string) => cardSliderPercents[specId] ?? 50;

  const specialitiesImages: Record<string, { bim: string; real: string }> = {
    eletrico: {
      bim: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80'
    },
    hidraulico: {
      bim: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80'
    },
    incendio: {
      bim: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1516216621174-bfa2196cfcf0?auto=format&fit=crop&w=1200&q=80'
    },
    mecanico: {
      bim: 'https://images.unsplash.com/photo-1581094751180-2292a8cf2723?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
    }
  };

  const heroImages = [
    "/src/assets/images/duall_hero_building_1782134245778.jpg",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", // Engenharia e Coordenação Construtiva
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Fachada moderna em Revit
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop", // Projetos industriais e instalações MEP
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop"  // Climatização e ventilação corporativa
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play interval for the video-simulation image carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Sticky header background state
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll height to trigger glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set font scaling at the document root for WCAG AA compliance
  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (textSize === 'extra') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [textSize]);

  // Handle contrast toggle helper classes
  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setTestimonialCardsPerView(1);
        return;
      }

      if (window.innerWidth < 1280) {
        setTestimonialCardsPerView(2);
        return;
      }

      setTestimonialCardsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const testimonialTotalPages = Math.max(
    1,
    Math.ceil(PARTNER_TESTIMONIALS.length / testimonialCardsPerView),
  );

  useEffect(() => {
    setTestimonialPage((current) => Math.min(current, testimonialTotalPages - 1));
  }, [testimonialTotalPages]);

  const testimonialTranslate = `${testimonialPage * (100 / testimonialCardsPerView)}%`;

  // Pre-loaded image paths
  const heroImageUrl = "/src/assets/images/duall_hero_building_1782134245778.jpg";

  const DuallLogo = ({ isDark = false }: { isDark?: boolean }) => (
    <img
      src={isDark ? duallLogoWhiteUrl : duallLogoUrl}
      alt="Duall Engenharia"
      className="h-14 w-auto select-none"
    />
  );

  // Helper mapping string icon name to Lucide components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="text-sky-500 shrink-0" size={24} />;
      case 'Droplet': return <Droplet className="text-sky-500 shrink-0" size={24} />;
      case 'ShieldAlert': return <Shield className="text-rose-500 shrink-0" size={24} />;
      case 'Wrench': return <Wrench className="text-teal-500 shrink-0" size={24} />;
      default: return <Cpu className="text-slate-500 shrink-0" size={24} />;
    }
  };

  // Pre-filled WhatsApp link helper
  const getWhatsAppGlobalUrl = (contextMessage: string) => {
    const number = "5511945406289";
    const text = encodeURIComponent(contextMessage);
    return `https://wa.me/${number}?text=${text}`;
  };

  return (
    <div className={`min-h-screen font-sans ${isHighContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Dynamic Offscreen live announcer and WCAG Skip Link handled by AccessibilityPanel */}
      <AccessibilityPanel
        onHighContrastToggle={setIsHighContrast}
        isHighContrast={isHighContrast}
        onTextSizeChange={setTextSize}
        textSize={textSize}
      />

      {/* STICKY ACCESSIBLE TOP HEADER */}
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? isHighContrast 
              ? 'bg-black border-b border-white py-2' 
              : 'bg-white/95 backdrop-blur-md shadow-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="#"
            className="focus:outline-hidden"
            aria-label="Ir para o topo da página do Duall Engenharia"
          >
            <DuallLogo isDark={isHighContrast ? true : !isScrolled} />
          </a>

          {/* Large Screen Navigation Menus */}
          <nav role="navigation" className="hidden lg:flex items-center gap-7">
            {[
              { label: 'Início', href: '#' },
              { label: 'Especialidades', href: '#especialidades' },
              { label: 'Navegador IFC 3D', href: '#simulador' },
              { label: 'Diferenciais', href: '#diferenciais' },
              { label: 'História & Cases', href: '#portfolio' },
              { label: 'Orçamento', href: '#contato' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-display text-sm font-semibold transition hover:text-[#1992BB] ${
                  isScrolled 
                    ? isHighContrast ? 'text-white' : 'text-slate-700' 
                    : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Immediate Call to Action */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppGlobalUrl("Olá Duall Engenharia! Estava navegando no site de vocês e gostaria de falar com um coordenador de engenharia sobre nossos projetos corporativos.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 py-2 px-4 rounded-xl font-bold text-xs transition duration-150 transform active:scale-95 cursor-pointer ${
                isScrolled 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-[#1992BB] text-white hover:bg-[#157a9d]'
              }`}
              aria-label="Falar conosco no WhatsApp corporativo +55 11 94540.6289"
            >
              <Phone size={14} />
              <span className="font-mono">+55 11 94540.6289</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN TARGET CONTENT (WCAG Skip link targets here) */}
      <main id="main-content" role="main">

        {/* HERO SECTION / BANNER (Based on slide 1 & 9) */}
        <section
          aria-label="Apresentação Principal"
          className="relative min-h-[92vh] flex items-center justify-center bg-slate-900 py-24 object-cover overflow-hidden"
        >
          {/* Background High-rise building video-simulation image carousel with deep parallax glass styling */}
          <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none bg-slate-950">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={currentImageIndex}
                src={heroImages[currentImageIndex]}
                alt="Fundo de engenharia em transição"
                variants={heroImageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.62] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Visual Abstract Overlay representing slide elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/40 to-transparent z-15" />
            <div className="absolute inset-0 bg-[#315676]/20 mix-blend-color z-15" />
            <div className="absolute inset-0 bg-slate-950/20 z-15" />
          </div>

          {/* Aesthetic Geometric diagonal slice stripes mimicking slide 1 visual lines */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden opacity-10 pointer-events-none">
            <div className="w-96 h-[200%] bg-white transform rotate-30 translate-x-44" />
            <div className="w-16 h-[200%] bg-[#1992BB] transform rotate-30 translate-x-[480px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              
              {/* Centered value proposition */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
                className="space-y-6 flex flex-col items-center"
              >
                <motion.span variants={staggerItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1992BB]/15 text-[#9ddcf2] border border-[#1992BB]/25">
                  <Compass size={13} /> Know-how certificado líder em BIM
                </motion.span>
                
                <motion.h1 variants={staggerItemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Know-how em projetos de <span className="text-[#1992BB]">INSTALAÇÕES</span>
                </motion.h1>

                <motion.p variants={staggerItemVariants} className="text-slate-200 text-lg sm:text-xl font-light font-sans leading-relaxed max-w-2xl mx-auto">
                  Um time de engenheiros incansáveis em busca da <strong className="text-[#7dd3fc] font-semibold">melhor solução tecnológica</strong> para garantir segurança física e economia inteligente no seu empreendimento!
                </motion.p>

                {/* Key features - 2x2 grid centered */}
                <motion.div variants={staggerItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left max-w-3xl w-full">
                  {[
                    { title: "Desenvolvimento BIM Completo", desc: "Fluxo integral estruturado em Autodesk Revit" },
                    { title: "+18 Anos de Experiência ativa", desc: "Grande portfólio corporativo e residencial vertical" },
                    { title: "Sustentabilidade LEED & EDGE", desc: "Projetos em conformidade ecológica total" },
                    { title: "Detalhamento Nível LOD 400", desc: "Prevenção garantida de interferências em canteiro" }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-3 bg-slate-950/40 backdrop-blur-xs p-4 rounded-xl border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-[#1992BB]/10 border border-[#1992BB]/25 text-[#1992BB] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={13} />
                      </div>
                      <div>
                        <h4 className="text-slate-100 font-bold text-sm leading-tight">{feat.title}</h4>
                        <p className="text-slate-300 text-xs mt-0.5 leading-tight">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Primary dynamic Conversion triggers */}
                <motion.div variants={staggerItemVariants} className="pt-6 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                  <a
                    href="#contato"
                    className="py-4 px-8 rounded-xl font-bold bg-[#1992BB] hover:bg-[#157a9d] text-white transition flex items-center justify-center gap-2 transform active:scale-95 shadow-xl hover:shadow-sky-500/20 text-sm cursor-pointer"
                  >
                    Solicitar Proposta Comercial <ArrowRight size={16} />
                  </a>
                  <a
                    href="#especialidades"
                    className="py-4 px-8 rounded-xl font-bold bg-white/10 hover:bg-white/15 border border-white/20 text-white transition flex items-center justify-center text-sm cursor-pointer"
                  >
                    Ver Especialidades
                  </a>
                </motion.div>
              </motion.div>

            </div>

            {/* PARTNERS / SOFTWARE ECOSYSTEM (BADGES BAR - REPLICATED FROM CAROUSEL GRAPHICS) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainerVariants}
              className="mt-16 pt-8 border-t border-white/10 relative z-10"
            >
              <motion.p variants={staggerItemVariants} className="text-slate-400 text-xs font-mono tracking-widest text-center uppercase mb-6">
                Tecnologias licenciadas & Certificações Globais de Engenharia
              </motion.p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-70">
                
                {/* Autodesk Revit */}
                <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
                  <div className="text-white font-display font-extrabold text-sm tracking-wide bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 justify-center">
                    <span className="text-sky-400 font-bold font-mono">R</span> AUTODESK REVIT
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">Modelagem LOD 400</span>
                </motion.div>
 
                {/* CTE */}
                <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
                  <div className="text-white font-display font-black text-sm tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg flex items-center justify-center text-center">
                    CTE
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">Selo de Qualidade</span>
                </motion.div>
 
                {/* LEED Green building */}
                <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
                  <div className="text-white font-display font-extrabold text-xs tracking-wider bg-[#105e42]/20 border border-[#105e42]/30 px-3 py-1.5 rounded-lg text-emerald-400 flex items-center justify-center gap-1">
                    <ShieldCheck size={12} /> LEED CERTIFIED
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">Líder Sustentabilidade</span>
                </motion.div>
 
                {/* GBC BRASIL */}
                <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
                  <div className="text-white font-display font-bold text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center justify-center text-center">
                    GBC BRASIL
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">Membro Conselheiro</span>
                </motion.div>
 
                {/* EDGE cert */}
                <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150 col-span-2 md:col-span-1">
                  <div className="text-[#1992BB] font-display font-extrabold text-sm tracking-wider bg-[#1992BB]/10 border border-[#1992BB]/20 px-4 py-1.5 rounded-lg flex items-center justify-center text-center">
                    Edge
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block font-semibold">Eficiência Energética</span>
                </motion.div>
 
              </div>
            </motion.div>

          </div>

          {/* Custom Carousel Navigation Dots mimicking a video progress timeline bar */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2.5 bg-slate-950/45 backdrop-blur-xs px-4 py-2.5 rounded-full border border-white/5 shadow-lg">
            {heroImages.map((_, idx) => {
              const isSelected = currentImageIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    isSelected 
                      ? 'w-7 bg-[#1992BB]' 
                      : 'w-2 bg-slate-400 hover:bg-white'
                  }`}
                  aria-label={`Visualizar slide de fundo ${idx + 1}`}
                  title={`Slide de fundo ${idx + 1}`}
                />
              );
            })}
          </div>
        </section>

        {/* SPECIALITIES SECTION (Slide 4 symbols & layouts) */}
        <section
          id="especialidades"
          aria-labelledby="spec-heading"
          className="py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Heading section */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="text-center max-w-3xl mx-auto space-y-3 mb-16"
            >
              <span className="text-[#1992BB] text-xs font-bold uppercase tracking-wider font-mono">Especialidades Técnicas Integradas</span>
              <h2 id="spec-heading" className="text-3xl md:text-4xl font-display font-extrabold text-[#1c2e3f] tracking-tight">
                Instalações Prediais Inteligentes em BIM
              </h2>
              <div className="h-1.5 w-24 bg-[#355979] mx-auto rounded-full" />
              <p className="text-slate-600 text-base leading-relaxed">
                Projetos tridimensionais integrados de alto desempenho com coordenação única, reduzindo interferências e retrabalho no canteiro de obras.
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Vertical list of specialities with thumbnail + description */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
                className="lg:w-[320px] shrink-0 space-y-2"
              >
                {SPECIALITIES.map((spec) => {
                  const isActive = expandedSpec === spec.id;
                  return (
                    <motion.button
                      key={spec.id}
                      variants={staggerItemVariants}
                      onClick={() => setExpandedSpec(isActive ? null : spec.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 border ${
                        isActive
                          ? 'bg-white border-[#355979] shadow-lg ring-2 ring-[#355979]/10'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#1c2e3f]' : 'bg-slate-800'
                      }`}>
                        <span className={isActive ? 'text-[#1992BB]' : 'text-slate-400'}>
                          {getIconComponent(spec.icon)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-display font-bold text-sm block text-slate-900 leading-tight">{spec.name}</span>
                        <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">{spec.description}</p>
                      </div>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#1992BB] shrink-0" />}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Right: Detail panel with image comparison */}
              <motion.div
                key={expandedSpec || 'empty'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {(() => {
                  const spec = SPECIALITIES.find(s => s.id === expandedSpec);
                  if (!spec) {
                    return (
                      <div className="h-full flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-12 text-center">
                        <p className="text-slate-400 text-sm">Selecione uma especialidade ao lado</p>
                      </div>
                    );
                  }
                  return (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                      {/* Image comparison slider */}
                      <div
                        ref={el => { if (el) cardSliderRefs.current[spec.id] = el; }}
                        className="aspect-[16/9] overflow-hidden bg-slate-100 relative select-none cursor-ew-resize"
                        onPointerDown={(e) => handleCardSliderPointerDown(spec.id, e)}
                        onPointerMove={(e) => handleCardSliderPointerMove(spec.id, e)}
                      >
                        {/* Obra base layer */}
                        <img
                          src={specialitiesImages[spec.id]?.real || spec.bannerUrl}
                          alt={spec.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* BIM overlay — clipped */}
                        <div
                          className="absolute inset-0 overflow-hidden z-10"
                          style={{ width: `${getCardSliderPercent(spec.id)}%` }}
                        >
                          <img
                            src={specialitiesImages[spec.id]?.bim || spec.bannerUrl}
                            alt={`${spec.name} - BIM`}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            style={{ width: `${10000 / Math.max(getCardSliderPercent(spec.id), 1)}%`, maxWidth: 'none' }}
                            loading="lazy"
                          />
                        </div>

                        {/* Divider + golden handle */}
                        <div
                          className="absolute inset-y-0 z-20 w-0.5 bg-white/90 shadow-lg pointer-events-none"
                          style={{ left: `${getCardSliderPercent(spec.id)}%`, transform: 'translateX(-50%)' }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1992BB] shadow-xl flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 18 3 12 9 6" />
                              <path d="M15 6 21 12 15 18" />
                            </svg>
                          </div>
                        </div>

                        {/* Top left: drag instruction */}
                        <div className="absolute top-3 left-3 z-20 bg-[#1c2e3f]/75 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase backdrop-blur-sm flex items-center gap-1.5 pointer-events-none">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1992BB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18 3 12 9 6" /><path d="M15 6 21 12 15 18" />
                          </svg>
                          ARRASTE PARA COMPARAR BIM VS REALIDADE
                        </div>

                        {/* Top right: Ver BIM / Ver Obra snap buttons */}
                        <div className="absolute top-3 right-3 z-20 flex bg-[#1c2e3f]/80 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden text-[9px] font-bold">
                          <button
                            className="px-3 py-1.5 text-white hover:bg-white/15 transition cursor-pointer"
                            onPointerDown={(e) => { e.stopPropagation(); setCardSliderPercents(prev => ({ ...prev, [spec.id]: 100 })); }}
                          >
                            Ver BIM
                          </button>
                          <div className="w-px bg-white/20" />
                          <button
                            className="px-3 py-1.5 text-white hover:bg-white/15 transition cursor-pointer"
                            onPointerDown={(e) => { e.stopPropagation(); setCardSliderPercents(prev => ({ ...prev, [spec.id]: 0 })); }}
                          >
                            Ver Obra
                          </button>
                        </div>

                        {/* Bottom labels */}
                        <div className="absolute bottom-3 left-3 z-10 bg-[#1c2e3f]/75 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm pointer-events-none">
                          MODELO BIM (3D REVIT)
                        </div>
                        <div className="absolute bottom-3 right-3 z-10 bg-[#1c2e3f]/75 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm pointer-events-none">
                          OBRA REAL (INSTALADO)
                        </div>
                      </div>

                      {/* Details panel */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1.5">
                          <span className="text-[#1992BB] text-[9px] font-bold uppercase tracking-widest font-mono">
                            APRESENTAÇÃO TECNOLÓGICA
                          </span>
                          <p className="text-slate-600 text-sm leading-relaxed">{spec.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                            ENTREGÁVEIS TÉCNICOS OFERECIDOS (LOD 400):
                          </span>
                          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold rounded-md uppercase tracking-wider shrink-0 ml-3">
                            ZERO COLISÕES
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {spec.details.slice(0, 6).map((detail) => (
                            <div key={detail} className="flex gap-2 items-start">
                              <CheckCircle2 size={13} className="text-[#1992BB] shrink-0 mt-0.5" />
                              <span className="text-xs text-slate-600 leading-snug">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </div>

          </div>
        </section>

        {/* IFC NAVIGATOR SECTION */}
        <section
          id="simulador"
          aria-label="Navegador IFC 3D Interativo"
          className="py-24 bg-slate-950 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header info */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="text-center max-w-3xl mx-auto space-y-3 mb-16"
            >
              <span className="text-[#1992BB] text-xs font-bold uppercase tracking-wider font-mono">Inovação Exclusiva Duall</span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                Navegador IFC 3D Interativo
              </h2>
              <div className="h-1.5 w-24 bg-[#1992BB] mx-auto rounded-full" />
              <p className="text-slate-300 text-base leading-relaxed">
                Explore um arquivo IFC técnico de exemplo carregado automaticamente para visualizar sistemas MEP em 3D, alternar modos de navegação e inspecionar elementos do modelo em tempo real.
              </p>
            </motion.div>

            {/* Embed ClashSimulator directly */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <ClashSimulator />
            </motion.div>

          </div>
        </section>

        {/* DESCRIPTION VIDEOS CAROUSEL SECTION (User-requested Video Carousel of Differentials) */}
        <section
          id="diferenciais"
          aria-labelledby="videos-heading"
          className="py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header info */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="text-center max-w-3xl mx-auto space-y-3 mb-16"
            >
              <span className="text-[#1992BB] text-xs font-bold uppercase tracking-wider font-mono">Diferenciais em Áudio & Vídeo</span>
              <h2 id="videos-heading" className="text-3xl md:text-4xl font-display font-extrabold text-[#1c2e3f] tracking-tight">
                Empreendimento Inteligente na Prática
              </h2>
              <div className="h-1.5 w-24 bg-[#355979] mx-auto rounded-full" />
              <p className="text-slate-600 text-base leading-relaxed">
                Assista aos nossos diferenciais em vídeo e veja a engenharia BIM de alto desempenho aplicada em tempo real.
              </p>
            </motion.div>

            {/* Video Player Carousel */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <VideoCarousel isHighContrast={isHighContrast} />
            </motion.div>

          </div>
        </section>

        {/* PORTFOLIO EDITORIAL GRID */}
        <section
          id="portfolio"
          aria-labelledby="portfolio-heading"
          className="py-24 bg-white border-t border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="max-w-3xl text-left"
              >
                <div className="flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-[#315676]">
                  <span className="h-px w-5 bg-[#315676]" />
                  <span>Portfólio de Obras</span>
                </div>
                <h2 id="portfolio-heading" className="mt-5 text-3xl md:text-4xl lg:text-[3.35rem] font-display font-extrabold text-[#2D3845] tracking-tight leading-[1]">
                  Veja nossas obras de destaque.
                </h2>
                <p className="mt-4 text-base text-[#5E6B7A] leading-relaxed max-w-2xl">
                  Projetos de instalações prediais de alta complexidade desenvolvidos integralmente em tecnologia BIM (LOD 400), garantindo precisão executiva e zero interferências.
                </p>
              </motion.div>

              <motion.a
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                href={getWhatsAppGlobalUrl('Olá Duall Engenharia! Gostaria de receber o portfólio completo de obras e conhecer mais casos de destaque.')}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2.5 bg-[#1992BB] text-white px-5 py-3.5 rounded-md text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-200 hover:bg-[#157a9d] hover:-translate-y-px shadow-[0_4px_16px_rgba(25,146,187,0.18)]"
              >
                <FileText size={16} />
                <span>Abrir Portfólio Completo</span>
              </motion.a>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5"
            >
              {PORTFOLIO_PROJECTS.slice(0, 5).map((project, index) => {
                const isFeatured = index === 0;
                const isSideFeature = index === 1;
                const wrapperClass = isFeatured
                  ? 'lg:col-span-7'
                  : isSideFeature
                    ? 'lg:col-span-5'
                    : 'lg:col-span-4';
                const imageHeight = isFeatured ? 'h-[280px] md:h-[320px] lg:h-[340px]' : isSideFeature ? 'h-[280px] md:h-[320px] lg:h-[340px]' : 'h-[210px] md:h-[225px]';
                const categoryLabel =
                  index === 0 ? 'Residencial Alto Padrão' :
                  index === 1 ? 'Corporativo Premium' :
                  index === 2 ? 'Residencial de Luxo' :
                  index === 3 ? 'Comercial / Mixed-Use' :
                  'Complexo de Saúde';

                return (
                  <motion.article
                    key={project.id}
                    variants={staggerItemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className={`${wrapperClass} overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-[0_6px_22px_rgba(15,23,42,0.07)] group h-full`}
                  >
                    <div className={`relative overflow-hidden ${imageHeight}`}>
                      <img
                        src={project.imageUrl}
                        alt={`Empreendimento ${project.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute left-4 top-4 rounded-full bg-[#1992BB] px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-md">
                        {categoryLabel}
                      </div>
                    </div>

                    <div className="bg-white px-5 py-4 md:px-5 md:py-5">
                      <h3 className={`font-display font-extrabold tracking-tight text-[#2D3845] leading-tight ${
                        isFeatured
                          ? 'text-[2rem] md:text-[2.25rem]'
                          : isSideFeature
                            ? 'text-[1.45rem] md:text-[1.7rem]'
                            : 'text-[1.28rem] md:text-[1.45rem]'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`mt-2 text-[#5E6B7A] ${
                        isFeatured || isSideFeature ? 'text-[14px] leading-7' : 'text-[13px] leading-6'
                      }`}>
                        {project.area} · BIM 2024 · {project.specialities.join(', ')}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

            {/* CLIENT LOGO TICKER */}
            {(() => {
              const clients: { name: string; logo: string | null }[] = [
                { name: 'Cyrela',      logo: logoClientCyrela },
                { name: 'EzTec',       logo: logoClientEztec },
                { name: 'Helbor',      logo: logoClientHelbor },
                { name: 'Direcional',  logo: logoClientDirecional },
                { name: 'Cury',        logo: logoClientCury },
                { name: 'BILD',        logo: logoClientBild },
                { name: 'RNI',         logo: logoClientRni },
                { name: 'Vitacon',     logo: logoClientVitacon },
                { name: 'Idea Zarvos', logo: null },
                { name: 'WTorre',      logo: logoClientWtorre },
                { name: 'Tarraf',      logo: null },
                { name: 'MPD',         logo: logoClientMpd },
              ];
              const doubled = [...clients, ...clients];
              return (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeInUpVariants}
                  className="relative left-1/2 right-1/2 mt-24 w-screen -translate-x-1/2 bg-[#030b1f] py-16 md:py-20 border-y border-[#1992BB]/10 shadow-[0_24px_80px_rgba(3,11,31,0.28)]"
                >
                  <div className="mx-auto max-w-[1680px] px-3 sm:px-4 lg:px-6">
                    <div className="mb-12 text-center max-w-4xl mx-auto">
                      <div className="flex items-center justify-center gap-4 mb-5">
                        <div className="h-px w-10 bg-[#1992BB]/55" />
                        <p className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#5db9df] whitespace-nowrap">
                          Parcerias e Credibilidade
                        </p>
                        <div className="h-px w-10 bg-[#1992BB]/55" />
                      </div>
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-white">
                        Grandes marcas que
                        <br className="hidden sm:block" />
                        confiam na Duall Engenharia.
                      </h3>
                    </div>

                    <div className="relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-gradient-to-r from-[#030b1f] via-[#030b1f]/72 to-transparent z-10 pointer-events-none" />
                      <div className="absolute right-0 top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-gradient-to-l from-[#030b1f] via-[#030b1f]/72 to-transparent z-10 pointer-events-none" />

                      <div className="flex gap-4 animate-ticker w-max py-2">
                        {doubled.map((client, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center px-7 py-5 bg-white/8 border border-white/12 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm hover:bg-white/12 hover:border-[#1992BB]/35 transition-all duration-300 shrink-0 h-24 min-w-37.5 group cursor-default"
                          >
                            {client.logo ? (
                              <img
                                src={client.logo}
                                alt={client.name}
                                className="max-h-12 max-w-36 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                              />
                            ) : (
                              <span className="font-display font-semibold text-sm text-slate-200 group-hover:text-white transition-colors text-center leading-tight">
                                {client.name}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

          </div>
        </section>

        {/* SOCIAL PROOF / CONSTRUCTOR TESTIMONIALS (WCAG Accessible Quote structures) */}
        <section
          id="depoimentos"
          aria-label="Opinião de Clientes"
          className="py-24 bg-[#f4f4f4]"
        >
          <div className="max-w-[1800px] mx-auto px-2 sm:px-5 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
              >
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#315676]">
                  <span className="h-px w-5 bg-[#315676]" />
                  <span>Feedbacks e Depoimentos</span>
                </div>
                <h2 className="mt-6 max-w-4xl text-4xl md:text-5xl xl:text-[4rem] font-display font-extrabold leading-[0.98] tracking-tight text-slate-900">
                  O que dizem os <span className="text-[#315676]">nossos parceiros.</span>
                </h2>
              </motion.div>

              <div className="flex items-center gap-3 self-end">
                <div className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#5E6B7A]">
                  {String(testimonialPage + 1).padStart(2, '0')} / {String(testimonialTotalPages).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => setTestimonialPage((current) => Math.max(0, current - 1))}
                  disabled={testimonialPage === 0}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D6DEE8] bg-white text-[#315676] transition hover:border-[#315676] hover:bg-[#315676] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Ver depoimentos anteriores"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialPage((current) => Math.min(testimonialTotalPages - 1, current + 1))}
                  disabled={testimonialPage === testimonialTotalPages - 1}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D6DEE8] bg-white text-[#315676] transition hover:border-[#315676] hover:bg-[#315676] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Ver mais depoimentos"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="mt-12 overflow-hidden"
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${testimonialTranslate})` }}
              >
                {PARTNER_TESTIMONIALS.map((testimonial, idx) => (
                  <div
                    key={`${testimonial.initials}-${idx}`}
                    className="w-full shrink-0 px-[10px]"
                    style={{ flexBasis: `${100 / testimonialCardsPerView}%` }}
                  >
                    <blockquote className="h-full min-h-[265px] rounded-[8px] border border-[#D6DEE8] bg-white px-7 py-10 shadow-[0_14px_30px_rgba(29,53,87,0.06)]">
                      <div className="flex text-[#1992BB] text-sm tracking-[0.2em]">
                        {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                          <span key={starIndex}>★</span>
                        ))}
                      </div>

                      <p className="mt-6 min-h-[104px] text-[15px] leading-8 text-[#315676] italic">
                        "{testimonial.text}"
                      </p>

                      <div className="mt-10 h-px w-7 bg-[#D6DEE8]" />

                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-[#315676] text-base font-extrabold text-white">
                          {testimonial.initials}
                        </div>
                        <div>
                          <div className="text-[1.02rem] font-display font-bold text-slate-900">
                            {testimonial.name}
                          </div>
                          <div className="text-[13px] leading-relaxed text-[#5E6B7A]">
                            {testimonial.role} · {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: testimonialTotalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTestimonialPage(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === testimonialPage ? 'w-8 bg-[#315676]' : 'w-2.5 bg-[#C7D3E0] hover:bg-[#8EA8C3]'
                  }`}
                  aria-label={`Ir para o grupo de depoimentos ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATED PERSUASIVE LEAD CAPTURE SECTION (Driving High conversion with detailed parameters) */}
        <section
          id="contato"
          aria-labelledby="contact-heading"
          className="py-24 bg-slate-900 text-white relative border-t border-slate-800"
        >
          {/* Blueprint background lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Direct contact & copy */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
                className="lg:col-span-6 space-y-6 text-left"
              >
                <motion.span variants={staggerItemVariants} className="inline-flex px-3 py-1 bg-[#1992BB]/15 text-[#9ddcf2] rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
                  Contato & Licenciamento de Projetos
                </motion.span>
                
                <motion.h2 variants={staggerItemVariants} id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Pronto para eliminar re-trabalho na sua obra?
                </motion.h2>
                
                <motion.p variants={staggerItemVariants} className="text-slate-300 text-base leading-relaxed">
                  Entre em contato através do formulário ao lado. Nosso time técnico de coordenadores BIM iniciará sua análise de viabilidade e escopo sem custos.
                </motion.p>

                {/* Direct office markers */}
                <motion.div variants={staggerItemVariants} className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-sky-505/10 bg-slate-800 text-sky-450 border border-slate-700 flex items-center justify-center shrink-0">
                      <MapPin size={17} className="text-[#1992BB]" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-white uppercase tracking-wider">Cidades Atendidas Fisicamente:</h4>
                      <p className="text-slate-400 mt-0.5">Escritório Central de Coordenação em São Paulo - SP, Americana - SP, e Santos - SP (Baixada Santista).</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-[#355979]/30 text-white border border-[#355979]/40 flex items-center justify-center shrink-0">
                      <Zap size={17} strokeWidth={2.5} className="text-[#1992BB]" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-white uppercase tracking-wider">Plantão Técnico Urgente:</h4>
                      <p className="text-slate-400 mt-0.5 flex items-center gap-1.5 font-mono">
                        WhatsApp: +55 11 94540.6289
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Instagram size={17} />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-white uppercase tracking-wider">Mídias Sociais Oficiais:</h4>
                      <p className="text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
                        Instagram: @duallengenharia
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Secure certificate info */}
                <motion.div variants={staggerItemVariants} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 flex items-start gap-2.5 max-w-md">
                  <ShieldCheck size={16} className="text-[#1992BB] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Seus dados corporativos estão salvos sob as diretrizes de criptografia AES-256 e LGPD de Prospecção Comercial. Nenhum dado de empreendimento é compartilhado com terceiros.
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Column: Premium Contact Form */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="lg:col-span-6"
              >
                <ContactForm isHighContrast={isHighContrast} />
              </motion.div>

            </div>
          </div>
        </section>

      </main>

      {/* ACCESSIBLE ACCORDION FOOTER */}
      <footer role="contentinfo" className={`py-12 bg-[#090f19] text-white border-t ${
        isHighContrast ? 'border-white bg-[#000]' : 'border-slate-800/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Logo & social links layer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/10">
            <DuallLogo isDark={true} />

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/duallengenharia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#1992BB] hover:border-[#1992BB] flex items-center justify-center transition"
                aria-label="Visitar perfil do Duall Engenharia no Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={getWhatsAppGlobalUrl("Olá Duall, vim do site oficial e gostaria de agendar uma reunião comercial de projetos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#1992BB] hover:border-[#1992BB] flex items-center justify-center transition"
                aria-label="Falar conosco via canal direto no WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Legal / credits block */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <div className="text-center md:text-left space-y-1.5">
              <p>© {new Date().getFullYear()} Duall Engenharia Ltda. Todos os direitos reservados.</p>
              <p className="text-[10px] text-slate-500 font-mono">
                CNPJ sob regulação comercial de Engenharia de Construção Civil brasileira.
              </p>
            </div>

            <div className="text-center md:text-right text-[10px] text-slate-400 space-y-1">
              <p className="font-semibold text-[#1992BB]">Duall Projetos e Instalações Prediais BIM LOD 400</p>
              <p className="text-slate-500">Desenvolvido em total conformidade WCAG 2.1 AA | Teclado & Leitores de Tela</p>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Desktop Direct WhatsApp Squeeze badge */}
      <a
        href={getWhatsAppGlobalUrl("Olá Duall Engenharia! Vi a landing page e gostaria de conversar com um coordenador sobre nosso orçamento de projetos.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm transform hover:scale-105 transition duration-150 group active:scale-95 cursor-pointer max-w-fit"
        aria-label="Conversar com o engenheiro plantonista no WhatsApp"
      >
        <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping shrink-0" />
        <Phone size={20} className="shrink-0" />
        <span className="hidden md:inline pr-1">Falar com Especialista</span>
      </a>

    </div>
  );
}

