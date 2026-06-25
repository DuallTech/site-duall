import { motion } from 'motion/react';

import logoClientCyrela from '../assets/images/clients/cyrela.svg';
import logoClientEztec from '../assets/images/clients/eztec.svg';
import logoClientHelbor from '../assets/images/clients/helbor.webp';
import logoClientDirecional from '../assets/images/clients/direcional.png';
import logoClientCury from '../assets/images/clients/cury.png';
import logoClientBild from '../assets/images/clients/bild.svg';
import logoClientRni from '../assets/images/clients/rni.svg';
import logoClientVitacon from '../assets/images/clients/vitacon.svg';
import logoClientWtorre from '../assets/images/clients/wtorre.svg';
import logoClientMpd from '../assets/images/clients/mpd.png';
import { fadeInUpVariants } from './animations';

const partnerClients: { name: string; logo: string | null }[] = [
  { name: 'Cyrela', logo: logoClientCyrela },
  { name: 'EzTec', logo: logoClientEztec },
  { name: 'Helbor', logo: logoClientHelbor },
  { name: 'Direcional', logo: logoClientDirecional },
  { name: 'Cury', logo: logoClientCury },
  { name: 'BILD', logo: logoClientBild },
  { name: 'RNI', logo: logoClientRni },
  { name: 'Vitacon', logo: logoClientVitacon },
  { name: 'Idea Zarvos', logo: null },
  { name: 'WTorre', logo: logoClientWtorre },
  { name: 'Tarraf', logo: null },
  { name: 'MPD', logo: logoClientMpd },
];

export default function PartnershipsSection() {
  const doubled = [...partnerClients, ...partnerClients];

  return (
    <motion.div
      id="parcerias"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeInUpVariants}
      className="relative left-1/2 right-1/2 mt-24 w-screen -translate-x-1/2 bg-[#030b1f] py-16 md:py-20 border-y border-[#1992BB]/10 shadow-[0_24px_80px_rgba(3,11,31,0.28)]"
    >
      <div className="mx-auto max-w-[1680px] px-3 sm:px-4 lg:px-6">
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#EDA700]/55" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#EDA700] whitespace-nowrap">
              Parcerias e Credibilidade
            </p>
            <div className="h-px w-10 bg-[#EDA700]/55" />
          </div>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-white">
            Grandes marcas que
            <br className="hidden sm:block" />
            confiam na Duall Engenharia.
          </h3>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-linear-to-r from-[#030b1f] via-[#030b1f]/72 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-linear-to-l from-[#030b1f] via-[#030b1f]/72 to-transparent z-10 pointer-events-none" />

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
}
