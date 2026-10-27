import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

import DuallLogo from '../components/DuallLogo';
import { NAV, SITE } from '../content/site';
import { SOLUTIONS } from '../content/solutions';

interface HeaderSectionProps {
  isHighContrast: boolean;
}

export default function HeaderSection({ isHighContrast }: HeaderSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  // Só a Home tem hero escuro: nas demais páginas o cabeçalho já nasce sobre fundo claro.
  const solid = isScrolled || pathname !== '/';

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const linkTone = solid ? (isHighContrast ? 'text-white' : 'text-slate-700') : 'text-white';
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-display text-sm font-semibold transition hover:text-[#EDA700] ${linkTone} ${isActive ? 'text-[#EDA700]!' : ''}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
          solid
            ? isHighContrast
              ? 'border-b border-white bg-black py-2'
              : 'bg-white/90 py-2.5 shadow-md backdrop-blur-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Duall Engenharia, página inicial">
            <DuallLogo isDark={isHighContrast ? true : !solid} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-5 xl:gap-8 lg:flex">
            {NAV.map((item) =>
              item.href === '/solucoes' ? (
                <div key={item.href} className="group relative">
                  <NavLink to={item.href} className={(s) => `${linkClass(s)} inline-flex items-center gap-1 py-2`}>
                    {item.label}
                    <ChevronDown size={14} className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                  </NavLink>
                  <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                      {SOLUTIONS.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/solucoes/${s.slug}`}
                            className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#315676]"
                          >
                            {s.short}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <NavLink key={item.href} to={item.href} className={linkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
            <a
              href={SITE.careersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`whitespace-nowrap rounded-full border border-[#EDA700] px-4 py-1.5 text-sm font-semibold transition hover:bg-[#EDA700] hover:text-slate-900 ${
                solid && !isHighContrast ? 'text-[#a87400]' : 'text-[#EDA700]'
              }`}
            >
              Trabalhe conosco
            </a>
            <Link
              to="/contato"
              className="whitespace-nowrap rounded-full bg-[#EDA700] px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#ffb81a]"
            >
              Solicitar proposta
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            {mobileOpen ? (
              <X size={24} className={solid ? 'text-slate-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={solid ? 'text-slate-800' : 'text-white'} />
            )}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      <div
        id="menu-mobile"
        className={`fixed bottom-0 right-0 top-0 z-40 flex w-80 max-w-[88vw] transform flex-col bg-[#14202f] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'invisible translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <DuallLogo isDark />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Principal (mobile)" className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {NAV.map((item) => (
            <div key={item.href}>
              <Link
                to={item.href}
                className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-100 transition hover:bg-white/10 hover:text-[#EDA700]"
              >
                {item.label}
              </Link>
              {item.href === '/solucoes' && (
                <ul className="ml-4 border-l border-white/10 pl-2">
                  {SOLUTIONS.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/solucoes/${s.slug}`}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:text-[#EDA700]"
                      >
                        {s.short}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="space-y-3 border-t border-white/10 px-4 pb-8 pt-4">
          <Link
            to="/contato"
            className="flex w-full items-center justify-center rounded-xl bg-[#EDA700] py-3.5 text-sm font-bold text-slate-900 transition hover:bg-[#ffb81a]"
          >
            Solicitar proposta
          </Link>
          <a
            href={SITE.careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl border border-[#EDA700] py-3 text-sm font-semibold text-[#EDA700] transition hover:bg-[#EDA700]/10"
          >
            Trabalhe conosco
          </a>
        </div>
      </div>
    </>
  );
}
