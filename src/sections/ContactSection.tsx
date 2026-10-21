import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react';

import ContactForm from '../components/ContactForm';
import { ChatButton, Container, Eyebrow } from '../components/ui';
import { SITE } from '../content/site';
import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

/** Bloco 7. CTA final, com o chatbot como primeiro filtro de contato. Reutilizado em /contato. */
export default function ContactSection({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? 'h1' : 'h2';

  return (
    <section
      id="falar"
      aria-labelledby="contact-heading"
      className={`relative isolate scroll-mt-20 overflow-hidden bg-[#0d1929] pb-24 text-white ${asPage ? 'pt-40' : 'pt-24'}`}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="blob pointer-events-none absolute -left-32 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-[#315676]/45 blur-3xl" aria-hidden="true" />
      <div className="blob-slow pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#EDA700]/15 blur-3xl" aria-hidden="true" />
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-6">
            {!asPage && (
              <blockquote className="border-l-2 border-[#EDA700] pl-5 font-display text-xl font-semibold leading-snug text-white/90 md:text-2xl">
                “Entendemos que, quando um projeto nasce, expectativas são criadas.”
              </blockquote>
            )}
            <Eyebrow light>Contato</Eyebrow>
            <Heading
              id="contact-heading"
              className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
            >
              Fale com a Duall sobre o seu empreendimento
            </Heading>
            <p className="text-lg leading-relaxed text-slate-300">
              Envie as informações do empreendimento pelo formulário, pelo WhatsApp ou pelo chatbot. A equipe técnica da
              Duall Engenharia retorna para alinhar escopo, prazo e documentação.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ChatButton variant="gold">Abrir o chat</ChatButton>
              <a
                href={getWhatsAppGlobalUrl('Olá, Duall Engenharia! Gostaria de falar sobre um projeto de instalações.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp {SITE.whatsappDisplay}
              </a>
            </div>

            {!asPage && (
              <Link to="/contato" className="group inline-flex items-center gap-2 text-sm font-bold text-[#EDA700]">
                <span className="border-b border-[#EDA700]/50 transition group-hover:border-[#EDA700]">Abrir a página de contato</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}

            <ul className="space-y-4 border-t border-white/10 pt-7 text-sm text-slate-300">
              {SITE.units.map((unit) => (
                <li key={unit.city} className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#EDA700]" aria-hidden="true" />
                  <span>
                    Unidade {unit.city}, {unit.region}
                    {unit.street && <span className="block text-slate-400">{unit.street}</span>}
                    {unit.phone && <span className="block text-slate-400">{unit.phone}</span>}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-[#EDA700]" aria-hidden="true" />
                <span>
                  Quer trabalhar na Duall?{' '}
                  <a href={SITE.careersUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#EDA700] underline">
                    Trabalhe conosco
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="glow-border rounded-[1.65rem] p-[2px] lg:col-span-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
