import { motion } from 'motion/react';

import ClashSimulator from '../components/ClashSimulator';
import { fadeInUpVariants } from './animations';

export default function SimulatorSection() {
  return (
    <section
      id="navegador-ifc"
      aria-label="Navegador IFC 3D Interativo"
      className="py-24 bg-slate-950 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
        >
          <ClashSimulator />
        </motion.div>
      </div>
    </section>
  );
}
