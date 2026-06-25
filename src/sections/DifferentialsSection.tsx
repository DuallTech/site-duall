import { motion } from 'motion/react';

import VideoCarousel from '../components/VideoCarousel';
import { fadeInUpVariants } from './animations';

interface DifferentialsSectionProps {
  isHighContrast: boolean;
}

export default function DifferentialsSection({ isHighContrast }: DifferentialsSectionProps) {
  return (
    <section
      id="a-duall"
      aria-labelledby="about-duall-heading"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="max-w-4xl space-y-5 mb-16"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#355979]" />
            <span className="text-[#1992BB] text-xs font-bold uppercase tracking-[0.24em] font-mono">
              Sobre a Duall
            </span>
          </div>

          <h2
            id="about-duall-heading"
            className="max-w-3xl text-4xl leading-none md:text-6xl md:leading-[0.95] font-display font-extrabold text-[#1c2e3f] tracking-tight"
          >
            Engenharia que faz a diferença na prática.
          </h2>
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
