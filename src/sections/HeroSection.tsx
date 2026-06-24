import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Compass, ShieldCheck } from 'lucide-react';

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

const heroFeatures = [
  { title: 'Desenvolvimento BIM Completo', desc: 'Fluxo integral estruturado em Autodesk Revit' },
  { title: '+18 Anos de Experiência ativa', desc: 'Grande portfólio corporativo e residencial vertical' },
  { title: 'Sustentabilidade LEED & EDGE', desc: 'Projetos em conformidade ecológica total' },
  { title: 'Detalhamento Nível LOD 400', desc: 'Prevenção garantida de interferências em canteiro' },
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
            <motion.span variants={staggerItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1992BB]/15 text-[#9ddcf2] border border-[#1992BB]/25">
              <Compass size={13} /> Know-how certificado líder em BIM
            </motion.span>

            <motion.h1 variants={staggerItemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Know-how em projetos de <span className="text-[#1992BB]">INSTALAÇÕES</span>
            </motion.h1>

            <motion.p variants={staggerItemVariants} className="text-slate-200 text-lg sm:text-xl font-light font-sans leading-relaxed max-w-2xl mx-auto">
              Um time de engenheiros incansáveis em busca da <strong className="text-[#7dd3fc] font-semibold">melhor solução tecnológica</strong> para garantir segurança física e economia inteligente no seu empreendimento!
            </motion.p>

            <motion.div variants={staggerItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left max-w-3xl w-full">
              {heroFeatures.map((feat) => (
                <div key={feat.title} className="flex gap-3 bg-slate-950/40 backdrop-blur-xs p-4 rounded-xl border border-white/5">
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="mt-16 pt-8 border-t border-white/10 relative z-10"
        >
          <motion.p variants={staggerItemVariants} className="text-slate-400 text-xs font-mono tracking-widest text-center uppercase mb-6">
            Tecnologias licenciadas & Certificações Globais de Engenharia
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-70">
            <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
              <div className="text-white font-display font-extrabold text-sm tracking-wide bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 justify-center">
                <span className="text-sky-400 font-bold font-mono">R</span> AUTODESK REVIT
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">Modelagem LOD 400</span>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
              <div className="text-white font-display font-black text-sm tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg flex items-center justify-center text-center">
                CTE
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">Selo de Qualidade</span>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
              <div className="font-display font-extrabold text-xs tracking-wider bg-[#105e42]/20 border border-[#105e42]/30 px-3 py-1.5 rounded-lg text-emerald-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> LEED CERTIFIED
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">Líder Sustentabilidade</span>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150">
              <div className="text-white font-display font-bold text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center justify-center text-center">
                GBC BRASIL
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">Membro Conselheiro</span>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="text-center group hover:opacity-100 transition duration-150 col-span-2 md:col-span-1">
              <div className="text-[#1992BB] font-display font-extrabold text-sm tracking-wider bg-[#1992BB]/10 border border-[#1992BB]/20 px-4 py-1.5 rounded-lg flex items-center justify-center text-center">
                Edge
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block font-semibold">Eficiência Energética</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2.5 bg-slate-950/45 backdrop-blur-xs px-4 py-2.5 rounded-full border border-white/5 shadow-lg">
        {heroImages.map((_, idx) => {
          const isSelected = currentImageIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                isSelected ? 'w-7 bg-[#1992BB]' : 'w-2 bg-slate-400 hover:bg-white'
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
