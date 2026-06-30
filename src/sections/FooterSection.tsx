import { Instagram, Linkedin, Phone } from 'lucide-react';

import DuallLogo from '../components/DuallLogo';
import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

interface FooterSectionProps {
  isHighContrast: boolean;
}

export default function FooterSection({ isHighContrast }: FooterSectionProps) {
  return (
    <footer
      role="contentinfo"
      className={`py-12 bg-[#090f19] text-white border-t ${
        isHighContrast ? 'border-white bg-black' : 'border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/10">
          <DuallLogo isDark={true} />

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/duall-engenharia/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/20 hover:border-[#0077B5] flex items-center justify-center transition"
              aria-label="Visitar perfil da Duall Engenharia no LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/duallengenharia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C]/20 hover:border-[#E1306C] flex items-center justify-center transition"
              aria-label="Visitar perfil do Duall Engenharia no Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={getWhatsAppGlobalUrl('Olá Duall, vim do site oficial e gostaria de agendar uma reunião comercial de projetos.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366] flex items-center justify-center transition"
              aria-label="Falar conosco via canal direto no WhatsApp"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="text-center md:text-left space-y-1.5">
            <p>© {new Date().getFullYear()} Duall Engenharia Ltda. Todos os direitos reservados.</p>
            <p className="text-[10px] text-slate-500 font-mono">
              CNPJ sob regulação comercial de Engenharia de Construção Civil brasileira.
            </p>
            <a
              href="https://talentos.duallengenharia.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-400 hover:text-[#EDA700] transition font-medium"
            >
              Trabalhe Conosco →
            </a>
          </div>

          <div className="text-center md:text-right text-[10px] text-slate-400 space-y-1">
            <p className="font-semibold text-[#EDA700]">Duall Projetos e Instalações Prediais BIM LOD 400</p>
            <p className="text-slate-500">Desenvolvido em total conformidade WCAG 2.1 AA | Teclado & Leitores de Tela</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
