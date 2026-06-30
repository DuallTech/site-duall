import { motion } from 'motion/react';
import { Briefcase, Instagram, MapPin, ShieldCheck, Zap } from 'lucide-react';

import ContactForm from '../components/ContactForm';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from './animations';

interface ContactSectionProps {
  isHighContrast: boolean;
}

export default function ContactSection({ isHighContrast }: ContactSectionProps) {
  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="py-24 bg-slate-900 text-white relative border-t border-slate-800"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <motion.span variants={staggerItemVariants} className="inline-flex px-3 py-1 bg-[#EDA700]/15 text-[#EDA700] rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
              Contato & Licenciamento de Projetos
            </motion.span>

            <motion.h2 variants={staggerItemVariants} id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Pronto para eliminar re-trabalho na sua obra?
            </motion.h2>

            <motion.p variants={staggerItemVariants} className="text-slate-300 text-base leading-relaxed">
              Entre em contato através do formulário ao lado. Nosso time técnico de coordenadores BIM iniciará sua análise de viabilidade e escopo sem custos.
            </motion.p>

            <motion.div variants={staggerItemVariants} className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-lg bg-sky-505/10 bg-slate-800 text-sky-450 border border-slate-700 flex items-center justify-center shrink-0">
                  <MapPin size={17} className="text-[#EDA700]" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-white uppercase tracking-wider">Cidades Atendidas Fisicamente:</h4>
                  <p className="text-slate-400 mt-0.5">Escritório Central de Coordenação em São Paulo - SP, Americana - SP, e Santos - SP (Baixada Santista).</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-lg bg-[#355979]/30 text-white border border-[#355979]/40 flex items-center justify-center shrink-0">
                  <Zap size={17} strokeWidth={2.5} className="text-[#EDA700]" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-white uppercase tracking-wider">Plantão Técnico Urgente:</h4>
                  <p className="text-slate-400 mt-0.5 flex items-center gap-1.5 font-mono">
                    WhatsApp: +55 11 94540.6289
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Instagram size={17} />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-white uppercase tracking-wider">Mídias Sociais Oficiais:</h4>
                  <p className="text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
                    Instagram: @duallengenharia
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-lg bg-[#EDA700]/10 border border-[#EDA700]/20 flex items-center justify-center shrink-0">
                  <Briefcase size={17} className="text-[#EDA700]" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-white uppercase tracking-wider">Faça Parte da Nossa Equipe:</h4>
                  <a
                    href="https://talentos.duallengenharia.com.br/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EDA700] mt-0.5 inline-flex items-center gap-1 font-mono hover:underline"
                  >
                    Trabalhe Conosco →
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 flex items-start gap-2.5 max-w-md">
              <ShieldCheck size={16} className="text-[#EDA700] shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-normal">
                Seus dados corporativos estão salvos sob as diretrizes de criptografia AES-256 e LGPD de Prospecção Comercial. Nenhum dado de empreendimento é compartilhado com terceiros.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            className="lg:col-span-6"
          >
            <ContactForm isHighContrast={isHighContrast} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
