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
  ChevronDown,
  ChevronUp,
  Cpu,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
  ChevronRight,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

// Static Data
import { SPECIALITIES, TESTIMONIALS, PORTFOLIO_PROJECTS } from './data';
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
import logoClientIdeaZarvos from './assets/images/clients/ideazarvos.png';
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

export default function App() {
  // Theme & Accessibility States
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra'>('normal');
  const [activeTab, setActiveTab] = useState<'all' | 'eletrico' | 'hidraulico' | 'incendio' | 'mecanico'>('all');
  const [expandedSpec, setExpandedSpec] = useState<string | null>('eletrico');
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
      case 'Zap': return <Zap className="text-amber-500 shrink-0" size={24} />;
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
                className={`font-display text-sm font-semibold transition hover:text-[#d9a006] ${
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
                  : 'bg-[#d9a006] text-slate-900 hover:bg-amber-500'
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
            <div className="absolute inset-0 bg-[#355979]/10 mix-blend-color z-15" />
            <div className="absolute inset-0 bg-slate-950/20 z-15" />
          </div>

          {/* Aesthetic Geometric diagonal slice stripes mimicking slide 1 visual lines */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden opacity-10 pointer-events-none">
            <div className="w-96 h-[200%] bg-white transform rotate-30 translate-x-44" />
            <div className="w-16 h-[200%] bg-[#d9a006] transform rotate-30 translate-x-[480px]" />
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
                <motion.span variants={staggerItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#d9a006]/20 text-[#f59e5b] border border-amber-600/20">
                  <Compass size={13} /> Know-how certificado líder em BIM
                </motion.span>
                
                <motion.h1 variants={staggerItemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Know-how em projetos de <span className="text-[#d9a006]">INSTALAÇÕES</span>
                </motion.h1>

                <motion.p variants={staggerItemVariants} className="text-slate-200 text-lg sm:text-xl font-light font-sans leading-relaxed max-w-2xl mx-auto">
                  Um time de engenheiros incansáveis em busca da <strong className="text-[#d5acf5] text-sky-300 font-semibold">melhor solução tecnológica</strong> para garantir segurança física e economia inteligente no seu empreendimento!
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
                      <div className="w-6 h-6 rounded-full bg-[#d9a006]/10 border border-[#d9a006]/20 text-[#d9a006] flex items-center justify-center shrink-0 mt-0.5">
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
                    className="py-4 px-8 rounded-xl font-bold bg-[#d9a006] hover:bg-amber-500 text-slate-900 transition flex items-center justify-center gap-2 transform active:scale-95 shadow-xl hover:shadow-amber-500/20 text-sm cursor-pointer"
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
                  <div className="text-[#0082c8] font-display font-extrabold text-sm tracking-wider bg-[#0081c8]/10 border border-[#0081c8]/20 px-4 py-1.5 rounded-lg flex items-center justify-center text-center">
                    E<span className="text-slate-300">d</span>g<span className="text-[#d9a006]">e</span>
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
                      ? 'w-7 bg-[#d9a006]' 
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
              <span className="text-[#d9a006] text-xs font-bold uppercase tracking-wider font-mono">Especialidades Técnicas Integradas</span>
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
                        <span className={isActive ? 'text-[#d9a006]' : 'text-slate-400'}>
                          {getIconComponent(spec.icon)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-display font-bold text-sm block text-slate-900 leading-tight">{spec.name}</span>
                        <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">{spec.description}</p>
                      </div>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#d9a006] shrink-0" />}
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
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#d9a006] shadow-xl flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 18 3 12 9 6" />
                              <path d="M15 6 21 12 15 18" />
                            </svg>
                          </div>
                        </div>

                        {/* Top left: drag instruction */}
                        <div className="absolute top-3 left-3 z-20 bg-[#1c2e3f]/75 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase backdrop-blur-sm flex items-center gap-1.5 pointer-events-none">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d9a006" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                          <span className="text-[#d9a006] text-[9px] font-bold uppercase tracking-widest font-mono">
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
                              <CheckCircle2 size={13} className="text-[#d9a006] shrink-0 mt-0.5" />
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
              <span className="text-[#d9a006] text-xs font-bold uppercase tracking-wider font-mono">Inovação Exclusiva Duall</span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                Navegador IFC 3D Interativo
              </h2>
              <div className="h-1.5 w-24 bg-[#d9a006] mx-auto rounded-full" />
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
              <span className="text-[#d9a006] text-xs font-bold uppercase tracking-wider font-mono">Diferenciais em Áudio & Vídeo</span>
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

        {/* PORTFOLIO GRID & HISTORICAL SAVINGS (Locations São Paulo, Americana, Santos) */}
        <section
          id="portfolio"
          aria-labelledby="portfolio-heading"
          className="py-24 bg-slate-50 border-t border-slate-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Split layout: Intro on left, Quick statistics card on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="lg:col-span-7 space-y-4 text-left"
              >
                <span className="text-[#d9a006] text-xs font-bold uppercase tracking-wider font-mono">Nosso Histórico</span>
                <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-display font-extrabold text-[#1c2e3f] tracking-tight">
                  Projetos de Empreendimentos de Alto Impacto
                </h2>
                <div className="h-1.5 w-24 bg-[#355979] rounded-full" />
                <p className="text-slate-600 text-base leading-relaxed">
                  Lideramos o desenvolvimento de instalações com aprovação ágil junto ao Corpo de Bombeiros e concessionárias em São Paulo, Americana e Santos.
                </p>
              </motion.div>

              {/* Statistics Grid */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="lg:col-span-5 bg-[#1c2e3f] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-slate-700/60"
              >
                <div className="text-xs space-y-1">
                  <span className="text-[10px] text-amber-400 font-mono font-bold tracking-wider uppercase">Indicadores Consolidados de Sucesso</span>
                  <p className="text-slate-300">Unindo a tecnologia BIM ao rigor fiscal da obra</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center border-r border-slate-700">
                    <span className="text-2xl font-bold font-display text-white">+18</span>
                    <span className="text-[10px] block text-slate-300 mt-1 uppercase font-mono tracking-wider">Anos Ativa</span>
                  </div>
                  <div className="text-center border-r border-slate-700">
                    <span className="text-2xl font-bold font-display text-white">420k²</span>
                    <span className="text-[10px] block text-slate-300 mt-1 uppercase font-mono tracking-wider">M² Projetados</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold font-display text-[#d9a006]">95%+</span>
                    <span className="text-[10px] block text-slate-300 mt-1 uppercase font-mono tracking-wider">Economia de Custos</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Custom Interactive Portfolio Tab Filter */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="flex gap-2.5 justify-center mb-12 flex-wrap"
            >
              {(['all', 'eletrico', 'hidraulico', 'incendio', 'mecanico'] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-350 cursor-pointer border ${
                      isActive 
                        ? 'bg-[#355979] text-white border-[#355979] shadow-lg shadow-blue-950/25 scale-[1.02]' 
                        : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/85 hover:border-slate-300 hover:text-slate-900 shadow-xs'
                    } font-sans uppercase tracking-wider text-[10px]`}
                  >
                    {tab === 'all' && 'Todos os Locais'}
                    {tab === 'eletrico' && 'Projetos Elétricos'}
                    {tab === 'hidraulico' && 'Projetos Hidráulicos'}
                    {tab === 'incendio' && 'Combate a Incêndio'}
                    {tab === 'mecanico' && 'Climatização VRF'}
                  </button>
                );
              })}
            </motion.div>

            {/* Portfolio Grid Cards */}
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {PORTFOLIO_PROJECTS.filter(project => {
                  if (activeTab === 'all') return true;
                  const specNameMapped = activeTab === 'eletrico' ? 'Elétrico' : activeTab === 'hidraulico' ? 'Hidráulico' : activeTab === 'incendio' ? 'Incêndio' : 'Climatização';
                  return project.specialities.includes(specNameMapped);
                }).map((project) => (
                  <motion.div
                    layout
                    variants={staggerItemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    key={project.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Card head layout */}
                    <div className="relative h-56 overflow-hidden bg-slate-900">
                      <img
                        src={project.imageUrl}
                        alt={`Empreendimento ${project.title}`}
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
                      
                      {/* Property Type Pill */}
                      <div className="absolute top-4 left-4 py-1.5 px-3 bg-slate-950/80 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-extrabold font-mono rounded-lg border border-white/10">
                        {project.type}
                      </div>

                      {/* Spark dynamic tag */}
                      <div className="absolute bottom-4 right-4 py-1 px-2.5 bg-amber-500 text-slate-950 text-[9px] uppercase font-mono font-black rounded-md tracking-wider flex items-center gap-1 shadow-md">
                        <Sparkles size={10} className="fill-slate-950" />
                        <span>BIM Coord.</span>
                      </div>
                    </div>

                    {/* Card body layout */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[9px] uppercase tracking-wider select-none">
                          <MapPin size={11} className="text-[#d9a006]" />
                          <span>{project.location}</span>
                        </div>
                        <h3 className="font-display font-extrabold text-lg text-slate-800 leading-snug group-hover:text-[#355979] transition duration-150">
                          {project.title}
                        </h3>
                        <p className="text-slate-500 font-sans font-light text-xs leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-1">
                        {/* Custom visual specialty badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.specialities.map((spec, i) => {
                            let badgeColor = 'bg-slate-50 text-slate-600 border-slate-200/50';
                            if (spec === 'Elétrico') badgeColor = 'bg-amber-500/10 text-amber-800 border-amber-500/20';
                            else if (spec === 'Hidráulico') badgeColor = 'bg-sky-500/10 text-sky-800 border-sky-500/20';
                            else if (spec === 'Incêndio') badgeColor = 'bg-rose-500/10 text-rose-800 border-rose-500/20';
                            else if (spec === 'Climatização') badgeColor = 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20';
                            
                            return (
                              <span
                                key={i}
                                className={`px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wide uppercase border ${badgeColor}`}
                              >
                                {spec}
                              </span>
                            );
                          })}
                        </div>

                        {/* Card bottom area with area scale indication & dynamic link to CTA */}
                        <div className="border-t border-slate-100 pt-4 flex justify-between items-center bg-slate-50/70 -mx-6 -mb-6 p-6">
                          <div>
                            <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase block select-none">Área Coberta</span>
                            <span className="font-mono text-xs font-black text-[#355979] tracking-tight">{project.area}</span>
                          </div>
                          
                          <a
                            href={getWhatsAppGlobalUrl(`Olá Duall Engenharia! Vi o portfólio oficial de vocês e gostei bastante do empreendimento "${project.title}" (${project.location}). Gostaria de entender mais sobre o escopo de engenharia e modelagem BIM para esse tipo de obra.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#355979]/5 hover:bg-[#355979] hover:text-white text-[#355979] text-[11px] font-extrabold font-sans rounded-xl transition-all duration-300"
                            id={`btn-${project.id}`}
                          >
                            <span>Caso de Estudo</span>
                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* CLIENT LOGO TICKER */}
            {(() => {
              const clients: { name: string; logo: string | null }[] = [
                { name: 'Cyrela',     logo: logoClientCyrela },
                { name: 'EzTec',     logo: logoClientEztec },
                { name: 'Helbor',    logo: logoClientHelbor },
                { name: 'Direcional',logo: logoClientDirecional },
                { name: 'Cury',      logo: logoClientCury },
                { name: 'BILD',      logo: logoClientBild },
                { name: 'RNI',       logo: logoClientRni },
                { name: 'Vitacon',   logo: logoClientVitacon },
                { name: 'Idea!Zarvos', logo: logoClientIdeaZarvos },
                { name: 'WTorre',    logo: logoClientWtorre },
                { name: 'Tarraf',    logo: null },
                { name: 'MPD',       logo: logoClientMpd },
              ];
              const doubled = [...clients, ...clients];
              return (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeInUpVariants}
                  className="mt-20 pt-10 border-t border-slate-200"
                >
                  <p className="text-center text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-8">
                    Construtoras &amp; Incorporadoras que Confiam na Duall
                  </p>

                  <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-4 animate-ticker w-max">
                      {doubled.map((client, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-xs shrink-0 h-20 min-w-[160px] group hover:border-[#355979]/30 hover:shadow-md transition-all duration-200"
                        >
                          {client.logo ? (
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="max-h-10 max-w-30 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          ) : (
                            <span className="font-display font-bold text-sm text-slate-500 group-hover:text-duall-blue transition-colors text-center">
                              {client.name}
                            </span>
                          )}
                        </div>
                      ))}
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
              <span className="text-[#d9a006] text-xs font-bold uppercase tracking-wider font-mono">Opinião de Quem Constrói</span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                Garantia de Aprovação e Orçamento Controlado
              </h2>
              <div className="h-1.5 w-24 bg-[#355979] mx-auto rounded-full" />
              <p className="text-slate-600 text-base leading-relaxed">
                Veja o relato de quem confia na Duall Engenharia para garantir obras eficientes, seguras e coordenadas.
              </p>
            </motion.div>

            {/* Testimonials Quote Blocks */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {TESTIMONIALS.map((test) => (
                <motion.blockquote
                  variants={staggerItemVariants}
                  key={test.id}
                  className="bg-slate-50/60 p-6 md:p-8 rounded-2xl border border-slate-100/80 shadow-xs flex flex-col justify-between space-y-6 relative"
                >
                  <span className="text-5xl text-[#355979] font-serif absolute -top-1 -left-1 opacity-20 select-none">&ldquo;</span>
                  
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10 font-normal">
                    {test.text}
                  </p>

                  <div className="flex items-center gap-3.5 border-t border-slate-200/50 pt-4">
                    <img
                      src={test.avatarUrl}
                      alt={`Retrato de ${test.name}`}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left leading-tight">
                      <cite className="not-italic font-display font-bold text-xs text-slate-800 block">
                        {test.name}
                      </cite>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {test.role}, <strong className="font-semibold text-slate-500">{test.company}</strong>
                      </span>
                    </div>
                  </div>
                </motion.blockquote>
              ))}
            </motion.div>

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
                <motion.span variants={staggerItemVariants} className="inline-flex px-3 py-1 bg-[#d9a006]/20 text-[#f59e5b] rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
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
                      <MapPin size={17} className="text-[#d9a006]" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-white uppercase tracking-wider">Cidades Atendidas Fisicamente:</h4>
                      <p className="text-slate-400 mt-0.5">Escritório Central de Coordenação em São Paulo - SP, Americana - SP, e Santos - SP (Baixada Santista).</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-[#355979]/30 text-white border border-[#355979]/40 flex items-center justify-center shrink-0">
                      <Zap size={17} strokeWidth={2.5} className="text-[#0082c8]" />
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
                  <ShieldCheck size={16} className="text-[#d9a006] shrink-0 mt-0.5" />
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
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#d9a006] hover:border-[#d9a006] flex items-center justify-center transition"
                aria-label="Visitar perfil do Duall Engenharia no Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={getWhatsAppGlobalUrl("Olá Duall, vim do site oficial e gostaria de agendar uma reunião comercial de projetos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#d9a006] hover:border-[#d9a006] flex items-center justify-center transition"
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
              <p className="font-semibold text-[#d9a006]">Duall Projetos e Instalações Prediais BIM LOD 400</p>
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

