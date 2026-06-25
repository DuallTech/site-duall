import { useEffect, useState } from 'react';

import DuallLogo from '../components/DuallLogo';

const NAV_LINKS = [
  { label: 'Início', href: '#' },
  { label: 'A Duall', href: '#a-duall' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Simulador', href: '#navegador-ifc' },
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

        <div className="flex items-center gap-3" />
      </div>
    </header>
  );
}
