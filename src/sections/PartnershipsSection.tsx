import { motion } from 'motion/react';

import { fadeInUpVariants } from './animations';

const clientLogoModules = import.meta.glob('../assets/images/clients/*.{png,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const formatClientName = (filePath: string) =>
  filePath
    .split('/')
    .pop()
    ?.replace(/\.(png|svg|webp)$/i, '')
    .replace(/[-_]+/g, ' ')
    .trim() ?? 'Cliente';

const partnerClients = Object.entries(clientLogoModules)
  .map(([filePath, logo]) => ({
    name: formatClientName(filePath),
    logo,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

export default function PartnershipsSection() {
  const doubled = [...partnerClients, ...partnerClients];

  return (
    <motion.div
      id="parcerias"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeInUpVariants}
      className="relative left-1/2 right-1/2 mt-24 w-screen -translate-x-1/2 bg-white py-16 md:py-20 border-y border-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
    >
      <div className="mx-auto max-w-[1680px] px-3 sm:px-4 lg:px-6">
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#EDA700]/55" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#355979] whitespace-nowrap">
              Parcerias e Credibilidade
            </p>
            <div className="h-px w-10 bg-[#EDA700]/55" />
          </div>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
            Grandes marcas que
            <br className="hidden sm:block" />
            confiam na Duall Engenharia.
          </h3>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-linear-to-r from-white via-white/82 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-linear-to-l from-white via-white/82 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-ticker w-max py-3">
            {doubled.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex items-center justify-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-xs shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:bg-white hover:border-[#1992BB]/35 transition-all duration-300 shrink-0 h-42 w-42 group cursor-default"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-31 max-w-44 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
