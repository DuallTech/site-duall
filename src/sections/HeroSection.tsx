import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';

import {
  heroImageVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from './animations';

const heroImages = [
  '/src/assets/images/duall_hero_building_1782134245778.jpg',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop',
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Apresentação Principal"
      className="relative min-h-[92vh] flex items-center justify-center bg-slate-900 py-24 object-cover overflow-hidden"
    >
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

        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/40 to-transparent z-15" />
        <div className="absolute inset-0 bg-duall-blue/20 mix-blend-color z-15" />
        <div className="absolute inset-0 bg-slate-950/20 z-15" />
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden opacity-10 pointer-events-none">
        <div className="w-96 h-[200%] bg-white transform rotate-30 translate-x-44" />
        <div className="w-16 h-[200%] bg-[#1992BB] transform rotate-30 translate-x-120" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
            className="space-y-6 flex flex-col items-center"
          >
            <motion.span variants={staggerItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EDA700]/15 text-[#EDA700] border border-[#EDA700]/30">
              <Compass size={13} /> Know-how certificado líder em BIM
            </motion.span>

            <motion.h1 variants={staggerItemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Know-how em projetos de <span className="text-[#EDA700]">INSTALAÇÕES</span>
            </motion.h1>

            <motion.p variants={staggerItemVariants} className="text-slate-200 text-lg sm:text-xl font-light font-sans leading-relaxed max-w-2xl mx-auto">
              Um time de engenheiros em busca da <strong className="text-[#EDA700] font-semibold">melhor solução tecnológica</strong> para garantir segurança física e economia inteligente no seu empreendimento!
            </motion.p>

            <motion.div variants={staggerItemVariants} className="pt-6 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <a
                href="#contato"
                className="py-4 px-8 rounded-xl font-bold bg-[#EDA700] hover:bg-[#d49500] text-slate-900 transition flex items-center justify-center gap-2 transform active:scale-95 shadow-xl hover:shadow-amber-500/30 text-sm cursor-pointer"
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
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2.5 bg-slate-950/45 backdrop-blur-xs px-4 py-2.5 rounded-full border border-white/5 shadow-lg">
        {heroImages.map((_, idx) => {
          const isSelected = currentImageIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                isSelected ? 'w-7 bg-[#EDA700]' : 'w-2 bg-slate-400 hover:bg-white'
              }`}
              aria-label={`Visualizar slide de fundo ${idx + 1}`}
              title={`Slide de fundo ${idx + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
