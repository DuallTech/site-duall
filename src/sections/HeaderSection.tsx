import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
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
            onClick={closeMenu}
          >
            <DuallLogo isDark={isHighContrast ? true : !isScrolled} />
          </a>

          {/* Desktop nav */}
          <nav role="navigation" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-display text-sm font-semibold transition hover:text-[#EDA700] ${
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
            <a
              href="https://talentos.duallengenharia.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-4 py-1.5 rounded-full border border-[#EDA700] text-[#EDA700] text-sm font-semibold hover:bg-[#EDA700] hover:text-slate-900 transition whitespace-nowrap"
            >
              Trabalhe Conosco
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X size={24} className={isScrolled ? 'text-slate-800' : 'text-white'} />
              : <Menu size={24} className={isScrolled ? 'text-slate-800' : 'text-white'} />
            }
          </button>
        </div>
      </header>


      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-72 bg-[#1c2e3f] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <DuallLogo isDark />
          <button
            onClick={closeMenu}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-200 font-semibold text-base hover:bg-white/8 hover:text-[#EDA700] transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="px-4 pb-8 pt-4 border-t border-white/10 space-y-3">
          <a
            href="#contato"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#EDA700] text-slate-900 font-bold text-sm hover:bg-[#d49500] transition active:scale-95"
          >
            Solicitar Proposta
          </a>
          <a
            href="https://talentos.duallengenharia.com.br/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#EDA700] text-[#EDA700] font-semibold text-sm hover:bg-[#EDA700]/10 transition active:scale-95"
          >
            Trabalhe Conosco
          </a>
        </div>
      </div>
    </>
  );
}
