import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Send } from 'lucide-react';

import { getWhatsAppGlobalUrl } from '../utils/whatsapp';

const TYPES = ['Residencial', 'Comercial', 'Misto'] as const;

const field =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#315676] focus:outline-none focus:ring-2 focus:ring-[#315676]/25';
const label = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600';

type FormState = { name: string; company: string; email: string; phone: string; type: string; message: string };
const empty: FormState = { name: '', company: '', email: '', phone: '', type: TYPES[0], message: '' };

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
    `Olá, Duall Engenharia! Sou ${data.name}${data.company ? ` da ${data.company}` : ''}. Enviei um contato pelo site sobre um empreendimento ${data.type.toLowerCase()}.${
      data.message ? `\n\n${data.message}` : ''
    }`,
  );

  if (sent) {
    return (
      <div role="status" className="space-y-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-slate-800">
        <CheckCircle2 size={36} className="text-emerald-600" aria-hidden="true" />
        <h3 className="font-display text-2xl font-extrabold">Recebemos as informações, {data.name.split(' ')[0]}.</h3>
        <p className="leading-relaxed text-slate-600">
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
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl md:p-8">
      {error && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Nome *</label>
          <input id="cf-name" autoComplete="name" required className={field} value={data.name} onChange={(e) => update('name', e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-company" className={label}>Empresa</label>
          <input id="cf-company" autoComplete="organization" className={field} value={data.company} onChange={(e) => update('company', e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>E-mail *</label>
          <input id="cf-email" type="email" autoComplete="email" required className={field} value={data.email} onChange={(e) => update('email', e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>Telefone ou WhatsApp *</label>
          <input id="cf-phone" type="tel" autoComplete="tel" required className={field} value={data.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
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
        <label htmlFor="cf-message" className={label}>Mensagem</label>
        <textarea id="cf-message" rows={4} className={field} value={data.message} onChange={(e) => update('message', e.target.value)} />
      </div>

      <button
        type="submit"
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#315676] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#254261] active:scale-[0.99]"
      >
        <Send size={16} aria-hidden="true" />
        Enviar
      </button>

      {/* [VALIDAR texto de consentimento com a Duall e com o responsável por LGPD] */}
      <p className="text-xs leading-relaxed text-slate-500">
        Seus dados são usados apenas para o retorno deste contato, conforme a{' '}
        <Link to="/politica-de-privacidade" className="font-semibold text-[#315676] underline">
          Política de privacidade
        </Link>
        .
      </p>
    </form>
  );
}
