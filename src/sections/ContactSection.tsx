import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Instagram, MapPin, Phone, ShieldCheck } from 'lucide-react';

import ContactForm from '../components/ContactForm';
import { Container } from '../components/ui';
import { SITE } from '../content/site';
import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

function InfoRow({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#EDA700]">
        {icon}
      </span>
      <div className="space-y-0.5">
        <p className="font-display text-sm font-extrabold uppercase tracking-wide text-white">{title}</p>
        <div className="text-sm leading-snug text-slate-400">{children}</div>
      </div>
    </li>
  );
}

const link = 'font-mono text-[13px] font-semibold text-[#EDA700] transition hover:text-[#ffb81a]';

/** Bloco 7. Contato: informações à esquerda e formulário à direita. Reutilizado em /contato. */
export default function ContactSection({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? 'h1' : 'h2';
  const cities = SITE.units.map((u) => `${u.city} - ${u.region}`).join(' e ');

  return (
    <section
      id="falar"
      aria-labelledby="contact-heading"
      className={`relative isolate scroll-mt-20 overflow-hidden bg-[#0d1929] pb-24 text-white ${asPage ? 'pt-40' : 'pt-24'}`}
    >
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#EDA700]/10 blur-3xl" aria-hidden="true" />
      <Container>
        <div className="grid items-stretch gap-14 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-6">
            <div className="space-y-6">
              <p className="inline-flex rounded-full bg-[#EDA700]/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#EDA700]">
                Contato e proposta de projetos
              </p>
              <Heading
                id="contact-heading"
                className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
              >
                Fale com a Duall sobre o seu empreendimento
              </Heading>
              <p className="text-lg leading-relaxed text-slate-300">
                Envie as informações do empreendimento pelo formulário ao lado, pelo WhatsApp ou pelo chatbot. A equipe
                técnica da Duall Engenharia retorna para alinhar escopo, prazo e documentação.
              </p>
            </div>

            <ul className="space-y-5 border-t border-white/10 pt-8">
              <InfoRow icon={<MapPin size={20} aria-hidden="true" />} title="Cidades atendidas fisicamente">
                Unidades em {cities}.
              </InfoRow>
              <InfoRow icon={<Phone size={20} aria-hidden="true" />} title="WhatsApp">
                <a
                  href={getWhatsAppGlobalUrl('Olá, Duall Engenharia! Gostaria de falar sobre um projeto de instalações.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {SITE.whatsappDisplay}
                </a>
              </InfoRow>
              <InfoRow icon={<Instagram size={20} aria-hidden="true" />} title="Mídias sociais oficiais">
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                  Instagram: @duallengenharia
                </a>
              </InfoRow>
              <InfoRow icon={<Briefcase size={20} aria-hidden="true" />} title="Faça parte da nossa equipe">
                <a href={SITE.careersUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  Trabalhe conosco →
                </a>
              </InfoRow>
            </ul>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-xs leading-relaxed text-slate-400">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#EDA700]" aria-hidden="true" />
              <p>
                Seus dados são usados apenas para o retorno deste contato e não são compartilhados com terceiros. Saiba
                mais na{' '}
                <Link to="/politica-de-privacidade" className="font-semibold text-[#EDA700] underline">
                  Política de privacidade
                </Link>
                .
              </p>
            </div>

            {!asPage && (
              <Link to="/contato" className="group inline-flex items-center gap-2 text-sm font-bold text-[#EDA700]">
                <span className="border-b border-[#EDA700]/50 transition group-hover:border-[#EDA700]">Abrir a página de contato</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}
          </div>

          <div className="flex lg:col-span-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
