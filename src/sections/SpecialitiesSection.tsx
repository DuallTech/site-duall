import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronLeft, ChevronRight, Cpu, Droplet, Shield, Wrench, Zap } from 'lucide-react';

import { SPECIALITIES } from '../data';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from './animations';

type ImagePair = { bim: string; real: string };

const specialitiesImages: Record<string, ImagePair[]> = {
  eletrico: [
    {
      bim: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80',
    },
    {
      bim: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      bim: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1544724480-1a6c4dfdcf27?auto=format&fit=crop&w=1200&q=80',
    },
  ],
  hidraulico: [
    {
      bim: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80',
      real: 'https://space-duall.sfo3.cdn.digitaloceanspaces.com/galeria/0c58241e-a88b-420c-bbfa-ae92066d38e3.jpg',
    },
    {
      bim: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      bim: 'https://images.unsplash.com/photo-1581094751180-2292a8cf2723?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    },
  ],
  incendio: [
    {
      bim: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1516216621174-bfa2196cfcf0?auto=format&fit=crop&w=1200&q=80',
    },
    {
      bim: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
    },
    {
      bim: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80',
    },
  ],
  mecanico: [
    {
      bim: 'https://images.unsplash.com/photo-1581094751180-2292a8cf2723?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      bim: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    },
    {
      bim: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      real: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
    },
  ],
};

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
  const [expandedSpec, setExpandedSpec] = useState<string | null>('eletrico');
  const [cardSliderPercents, setCardSliderPercents] = useState<Record<string, number>>({});
  const [cardImageIndexes, setCardImageIndexes] = useState<Record<string, number>>({});
  const [isImageHovered, setIsImageHovered] = useState(false);
  const cardSliderRefs = useRef<Record<string, HTMLDivElement>>({});
  const isDraggingRef = useRef(false);

  // Auto-advance carousel — pauses when user hovers the image area
  useEffect(() => {
    if (!expandedSpec || isImageHovered) return;
    const pairs = specialitiesImages[expandedSpec] ?? [];
    if (pairs.length <= 1) return;

    const interval = setInterval(() => {
      setCardImageIndexes((prev) => {
        const current = prev[expandedSpec] ?? 0;
        return { ...prev, [expandedSpec]: (current + 1) % pairs.length };
      });
      setCardSliderPercents((prev) => ({ ...prev, [expandedSpec]: 50 }));
    }, 4000);

    return () => clearInterval(interval);
  }, [expandedSpec, isImageHovered]);

  const handleCardSliderPointerDown = (specId: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    const rect = cardSliderRefs.current[specId]?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setCardSliderPercents((prev) => ({ ...prev, [specId]: percent }));
  };

  const handleCardSliderPointerMove = (specId: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const rect = cardSliderRefs.current[specId]?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setCardSliderPercents((prev) => ({ ...prev, [specId]: percent }));
  };

  const handleCardSliderPointerUp = () => {
    isDraggingRef.current = false;
  };

  const getCardSliderPercent = (specId: string) => cardSliderPercents[specId] ?? 50;
  const getCardImageIndex = (specId: string) => cardImageIndexes[specId] ?? 0;

  const navigateImage = (specId: string, direction: 1 | -1, e: React.PointerEvent) => {
    e.stopPropagation();
    const pairs = specialitiesImages[specId] ?? [];
    const current = getCardImageIndex(specId);
    const next = (current + direction + pairs.length) % pairs.length;
    setCardImageIndexes((prev) => ({ ...prev, [specId]: next }));
    setCardSliderPercents((prev) => ({ ...prev, [specId]: 50 }));
  };

  const goToImage = (specId: string, index: number, e: React.PointerEvent) => {
    e.stopPropagation();
    setCardImageIndexes((prev) => ({ ...prev, [specId]: index }));
    setCardSliderPercents((prev) => ({ ...prev, [specId]: 50 }));
  };

  return (
    <section
      id="comparador-bim"
      aria-labelledby="spec-heading"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="max-w-2xl space-y-3 mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1992BB]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1992BB] font-mono">
            <span className="h-px w-4 bg-[#1992BB]" />
            Especialidades Técnicas Integradas
          </span>
          <h2 id="spec-heading" className="text-3xl md:text-4xl font-display font-extrabold text-[#1c2e3f] tracking-tight">
            Instalações Prediais Inteligentes em BIM
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Projetos tridimensionais integrados de alto desempenho com coordenação única, reduzindo interferências e retrabalho no canteiro de obras.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
            className="lg:w-[320px] shrink-0 space-y-2"
          >
            {SPECIALITIES.map((spec) => {
              const isActive = expandedSpec === spec.id;
              return (
                <motion.button
                  key={spec.id}
                  variants={staggerItemVariants}
                  onClick={() => { setExpandedSpec(isActive ? null : spec.id); setIsImageHovered(false); }}
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

          <motion.div
            key={expandedSpec || 'empty'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {(() => {
              const spec = SPECIALITIES.find((item) => item.id === expandedSpec);
              if (!spec) {
                return (
                  <div className="h-full flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-12 text-center">
                    <p className="text-slate-400 text-sm">Selecione uma especialidade ao lado</p>
                  </div>
                );
              }

              const pairs = specialitiesImages[spec.id] ?? [];
              const imgIndex = getCardImageIndex(spec.id);
              const currentPair = pairs[imgIndex] ?? { bim: spec.bannerUrl, real: spec.bannerUrl };
              const total = pairs.length;

              return (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div
                    ref={(el) => { if (el) cardSliderRefs.current[spec.id] = el; }}
                    className="aspect-video overflow-hidden bg-slate-100 relative select-none cursor-ew-resize"
                    onPointerDown={(e) => handleCardSliderPointerDown(spec.id, e)}
                    onPointerMove={(e) => handleCardSliderPointerMove(spec.id, e)}
                    onPointerUp={handleCardSliderPointerUp}
                    onPointerCancel={handleCardSliderPointerUp}
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => { setIsImageHovered(false); isDraggingRef.current = false; }}
                  >
                    {/* Real image (background) */}
                    <img
                      src={currentPair.real}
                      alt={spec.name}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      draggable="false"
                      loading="lazy"
                    />

                    {/* BIM image (clipped foreground) */}
                    <div
                      className="absolute inset-0 overflow-hidden z-10 pointer-events-none"
                      style={{ width: `${getCardSliderPercent(spec.id)}%` }}
                    >
                      <img
                        src={currentPair.bim}
                        alt={`${spec.name} - BIM`}
                        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                        draggable="false"
                        style={{ width: `${10000 / Math.max(getCardSliderPercent(spec.id), 1)}%`, maxWidth: 'none' }}
                        loading="lazy"
                      />
                    </div>

                    {/* Divider line + handle */}
                    <div
                      className="absolute inset-y-0 z-20 w-0.5 bg-white/90 shadow-lg pointer-events-none"
                      style={{ left: `${getCardSliderPercent(spec.id)}%`, transform: 'translateX(-50%)' }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#EDA700] shadow-xl flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18 3 12 9 6" />
                          <path d="M15 6 21 12 15 18" />
                        </svg>
                      </div>
                    </div>

                    {/* Top-left label */}
                    <div className="absolute top-3 left-3 z-20 bg-[#1c2e3f]/75 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase backdrop-blur-sm flex items-center gap-1.5 pointer-events-none">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDA700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18 3 12 9 6" />
                        <path d="M15 6 21 12 15 18" />
                      </svg>
                      ARRASTE PARA COMPARAR BIM VS REALIDADE
                    </div>

                    {/* Top-right BIM/Obra buttons */}
                    <div className="absolute top-3 right-3 z-20 flex bg-[#1c2e3f]/80 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden text-[9px] font-bold">
                      <button
                        className="px-3 py-1.5 text-white hover:bg-white/15 transition cursor-pointer"
                        onPointerDown={(e) => { e.stopPropagation(); setCardSliderPercents((prev) => ({ ...prev, [spec.id]: 100 })); }}
                      >
                        Ver BIM
                      </button>
                      <div className="w-px bg-white/20" />
                      <button
                        className="px-3 py-1.5 text-white hover:bg-white/15 transition cursor-pointer"
                        onPointerDown={(e) => { e.stopPropagation(); setCardSliderPercents((prev) => ({ ...prev, [spec.id]: 0 })); }}
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

                    {/* Carousel nav arrows */}
                    {total > 1 && (
                      <>
                        <button
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition"
                          onPointerDown={(e) => navigateImage(spec.id, -1, e)}
                          aria-label="Imagem anterior"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition"
                          onPointerDown={(e) => navigateImage(spec.id, 1, e)}
                          aria-label="Próxima imagem"
                        >
                          <ChevronRight size={16} />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                          {pairs.map((_, idx) => (
                            <button
                              key={idx}
                              className={`rounded-full transition-all ${
                                idx === imgIndex
                                  ? 'w-5 h-2 bg-[#EDA700]'
                                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                              }`}
                              onPointerDown={(e) => goToImage(spec.id, idx, e)}
                              aria-label={`Ir para imagem ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

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
  );
}
