import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send, Sparkles } from 'lucide-react';

import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

const TYPES = ['Residencial', 'Comercial', 'Misto'] as const;

const field =
  'w-full rounded-xl border border-white/10 bg-[#0a1322] px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:border-[#EDA700] focus:outline-none focus:ring-2 focus:ring-[#EDA700]/25';
const label = 'mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300';

type FormState = { name: string; city: string; email: string; phone: string; type: string; area: string; message: string };
const empty: FormState = { name: '', city: '', email: '', phone: '', type: TYPES[0], area: '', message: '' };

/** Formulário do bloco 7. Sem backend: a confirmação aparece na própria página e oferece o envio pelo WhatsApp. */
export default function ContactForm() {
  const [data, setData] = useState<FormState>(empty);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (error) setError('');
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
      setError('Preencha nome, e-mail e telefone ou WhatsApp.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setError('Informe um e-mail válido.');
      return;
    }
    setSent(true);
  };

  const whatsappUrl = getWhatsAppGlobalUrl(
    `Olá, Duall Engenharia! Sou ${data.name}${data.city ? `, de ${data.city}` : ''}. Enviei um contato pelo site sobre um empreendimento ${data.type.toLowerCase()}${
      data.area ? ` de ${data.area} m²` : ''
    }.${data.message ? `

${data.message}` : ''}`,
  );

  if (sent) {
    return (
      <div role="status" className="space-y-5 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-white">
        <CheckCircle2 size={36} className="text-emerald-400" aria-hidden="true" />
        <h3 className="font-display text-2xl font-extrabold">Recebemos as informações, {data.name.split(' ')[0]}.</h3>
        <p className="leading-relaxed text-slate-300">
          A equipe técnica da Duall Engenharia retorna para alinhar escopo, prazo e documentação. Para agilizar, você
          também pode continuar a conversa pelo WhatsApp.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
        >
          Continuar pelo WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-4 rounded-[1.65rem] border border-white/10 bg-white/[0.03] p-6 text-white md:p-8">
      <header className="space-y-1.5 pb-1">
        <p className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
          <Sparkles size={11} aria-hidden="true" /> Atendimento direto
        </p>
        <h3 className="font-display text-xl font-extrabold">Fale com nossos especialistas</h3>
        <p className="text-sm text-slate-400">Preencha os dados abaixo e entraremos em contato prontamente.</p>
      </header>

      {error && (
        <p role="alert" className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm font-medium text-rose-300">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Nome completo *</label>
          <input id="cf-name" autoComplete="name" required placeholder="Seu nome" className={field} value={data.name} onChange={(e) => update('name', e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>E-mail *</label>
          <input id="cf-email" type="email" autoComplete="email" required placeholder="exemplo@empresa.com.br" className={field} value={data.email} onChange={(e) => update('email', e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>WhatsApp / telefone *</label>
          <input id="cf-phone" type="tel" autoComplete="tel" required placeholder="(11) 99999-9999" className={field} value={data.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-city" className={label}>Cidade / UF</label>
          <input id="cf-city" autoComplete="address-level2" placeholder="São Paulo - SP" className={field} value={data.city} onChange={(e) => update('city', e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-type" className={label}>Tipo de empreendimento</label>
          <select id="cf-type" className={field} value={data.type} onChange={(e) => update('type', e.target.value)}>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-area" className={label}>Área estimada (m²)</label>
          <input id="cf-area" inputMode="numeric" placeholder="Ex: 5000" className={field} value={data.area} onChange={(e) => update('area', e.target.value)} />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <label htmlFor="cf-message" className={label}>Fale sobre as suas necessidades de projetos</label>
        <textarea
          id="cf-message"
          rows={4}
          placeholder="Descreva brevemente o escopo necessário (elétrico, hidráulico, incêndio, sistemas, BIM)."
          className={`${field} min-h-28 flex-1 resize-none`}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#EDA700] px-6 py-3.5 text-sm font-bold text-slate-900 shadow-[0_10px_30px_-10px_rgba(237,167,0,0.7)] transition hover:bg-[#ffb81a] active:scale-[0.99]"
      >
        Enviar contato
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
