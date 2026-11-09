import { useState, type FormEvent } from 'react';

import { signIn, type Session } from './api';
import { supabaseConfigured } from './supabase';

export default function AdminLogin({ onSignedIn }: { onSignedIn: (s: Session) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      onSignedIn(await signIn(email.trim(), password));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EDA700]">Área restrita</p>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-[#0d1929]">Painel de artigos</h1>
        </div>

        <label className="block space-y-1.5 text-sm font-semibold">
          E-mail
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-[#315676] focus:ring-2 focus:ring-[#315676]/20"
          />
        </label>
        <label className="block space-y-1.5 text-sm font-semibold">
          Senha
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-[#315676] focus:ring-2 focus:ring-[#315676]/20"
          />
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-[#EDA700] py-3 font-bold text-slate-900 transition hover:brightness-95 disabled:opacity-60"
        >
          {busy ? 'Entrando…' : 'Entrar'}
        </button>

        {!supabaseConfigured && (
          <p className="text-xs text-slate-400">Modo de teste (Supabase não configurado): qualquer e-mail e senha com 6+ caracteres.</p>
        )}
      </form>
    </div>
  );
}
