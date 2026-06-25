import { Phone } from 'lucide-react';

import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={getWhatsAppGlobalUrl('Olá Duall Engenharia! Gostaria de conversar com um coordenador sobre nosso orçamento de projetos.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm transform hover:scale-105 transition duration-150 group active:scale-95 cursor-pointer max-w-fit"
      aria-label="Conversar com o engenheiro plantonista no WhatsApp"
    >
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping shrink-0" />
      <Phone size={20} className="shrink-0" />
      <span className="hidden md:inline pr-1">Falar com Especialista</span>
    </a>
  );
}
