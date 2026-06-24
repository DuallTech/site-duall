import { motion } from 'motion/react';

import VideoCarousel from '../components/VideoCarousel';
import { fadeInUpVariants } from './animations';

interface DifferentialsSectionProps {
  isHighContrast: boolean;
}

export default function DifferentialsSection({ isHighContrast }: DifferentialsSectionProps) {
  return (
    <section
      id="diferenciais"
      aria-labelledby="videos-heading"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
        >
          <VideoCarousel isHighContrast={isHighContrast} />
        </motion.div>
      </div>
    </section>
  );
}
