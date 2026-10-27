import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MapPin, Phone } from 'lucide-react';

import DuallLogo from '../components/DuallLogo';
import { SITE } from '../content/site';
import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

interface FooterSectionProps {
  isHighContrast: boolean;
}

const FOOTER_MENU = [
  { label: 'Projetos', href: '/projetos' },
  { label: 'Soluções', href: '/solucoes' },
  { label: 'A Duall', href: '/a-duall' },
  { label: 'Conteúdo', href: '/conteudo' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contato' },
  { label: 'Trabalhe conosco', href: SITE.careersUrl },
] as const;

const socialClass =
  'flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-[#EDA700] hover:text-[#EDA700]';

export default function FooterSection({ isHighContrast }: FooterSectionProps) {
  return (
    <footer className={`relative overflow-hidden border-t text-white ${isHighContrast ? 'border-white bg-black' : 'border-slate-800/80 bg-[#090f19]'}`}>
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#EDA700] to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <DuallLogo isDark />
            <p className="font-display text-lg font-semibold text-white">
              {SITE.name} <span className="text-[#EDA700]">|</span> {SITE.signature}
            </p>
            <div className="flex gap-2.5 pt-1">
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="Duall Engenharia no LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="Duall Engenharia no Instagram">
                <Instagram size={16} />
              </a>
              <a
                href={getWhatsAppGlobalUrl('Olá Duall, vim do site e gostaria de falar sobre um projeto.')}
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="Falar com a Duall pelo WhatsApp"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <h2 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">Navegação</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {FOOTER_MENU.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith('http') ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-slate-300 transition hover:text-[#EDA700]">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="text-slate-300 transition hover:text-[#EDA700]">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">Unidades</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {SITE.units.map((unit) => (
                <li key={unit.city} className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#EDA700]" aria-hidden="true" />
                  <span>
                    {unit.city}, {unit.region}
                    {unit.street && <span className="block text-slate-400">{unit.street}</span>}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#EDA700]" aria-hidden="true" />
                <span>WhatsApp: {SITE.whatsappDisplay}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} Duall Engenharia. Todos os direitos reservados.</p>
          <Link to="/politica-de-privacidade" className="transition hover:text-[#EDA700]">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
