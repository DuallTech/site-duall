import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

import DuallLogo from '../components/DuallLogo';
import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

const NAV_LINKS = [
  { label: 'Início', href: '#' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Simulador', href: '#navegador-ifc' },
  { label: 'A Duall', href: '#diferenciais' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Parcerias', href: '#parcerias' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
] as const;

interface HeaderSectionProps {
  isHighContrast: boolean;
}

export default function HeaderSection({ isHighContrast }: HeaderSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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

        <nav role="navigation" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-display text-sm font-semibold transition hover:text-[#1992BB] ${
                isScrolled
                  ? isHighContrast
                    ? 'text-white'
                    : 'text-slate-700'
                  : 'text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppGlobalUrl('Olá Duall Engenharia! Estava navegando no site de vocês e gostaria de falar com um coordenador de engenharia sobre nossos projetos corporativos.')}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex items-center gap-2 py-2 px-4 rounded-xl font-bold text-xs transition duration-150 transform active:scale-95 cursor-pointer ${
              isScrolled
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-[#1992BB] text-white hover:bg-[#157a9d]'
            }`}
            aria-label="Falar conosco no WhatsApp corporativo +55 11 94540.6289"
          >
            <Phone size={14} />
            <span className="font-mono">+55 11 94540.6289</span>
          </a>
        </div>
      </div>
    </header>
  );
}
