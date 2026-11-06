import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Phone } from 'lucide-react';

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

const socialClass = 'flex h-10 w-10 items-center justify-center rounded-full border transition';

const headingClass = 'mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400';

export default function FooterSection({ isHighContrast }: FooterSectionProps) {
  return (
    <footer className={`relative overflow-hidden border-t text-white ${isHighContrast ? 'border-white bg-black' : 'border-slate-800/80 bg-[#090f19]'}`}>
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#EDA700] to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center space-y-2 md:block">
            <DuallLogo isDark />
            <p className="sr-only">
              {SITE.name} <span className="text-[#EDA700]">|</span> {SITE.signature}
            </p>
          </div>
          <div className="flex justify-center gap-2.5">
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialClass} border-[#0A66C2]/60 text-[#4f9de8] hover:bg-[#0A66C2]/15`}
              aria-label="Duall Engenharia no LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialClass} border-[#1877F2]/60 text-[#4b8ef7] hover:bg-[#1877F2]/15`}
              aria-label="Duall Engenharia no Facebook"
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
              </svg>
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialClass} border-[#E4405F]/60 text-[#f0527a] hover:bg-[#E4405F]/15`}
              aria-label="Duall Engenharia no Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={SITE.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialClass} border-[#25F4EE]/50 text-[#25F4EE] hover:bg-[#25F4EE]/10`}
              aria-label="Duall Engenharia no TikTok"
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
              </svg>
            </a>
            <a
              href={getWhatsAppGlobalUrl('Olá Duall, vim do site e gostaria de falar sobre um projeto.')}
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialClass} border-[#25D366]/60 text-[#25D366] hover:bg-[#25D366]/15`}
              aria-label="Falar com a Duall pelo WhatsApp"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé" className="border-t border-white/10 pt-5 text-center md:text-left">
          <h2 className={headingClass}>Navegação</h2>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-start">
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

        <div className="flex flex-col gap-4 border-t border-white/10 pt-4 text-center text-xs text-slate-400 md:flex-row md:items-end md:justify-between md:text-left">
          <div className="space-y-1.5">
            <p>© {new Date().getFullYear()} Duall Engenharia Ltda. Todos os direitos reservados.</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-sm md:justify-start">
              <Link to="/politica-de-privacidade" className="transition hover:text-[#EDA700]">
                Política de privacidade
              </Link>
              <a href={SITE.careersUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 transition hover:text-[#EDA700]">
                Trabalhe Conosco →
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
