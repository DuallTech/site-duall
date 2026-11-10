import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

import duallLogoWhiteUrl from '../assets/images/logo-duall-horizontal-branco.png';
import Seo from '../seo/Seo';
import { getSession, signOut, type Session } from './api';
import AdminLogin from './AdminLogin';

/** Casca do painel: exige sessão, esconde do Google (noindex) e não usa o header/footer do site. */
export default function AdminLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setReady(true);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Seo title="Painel | Duall Engenharia" description="Área restrita." path="/admin" noindex />

      {!ready ? (
        <p className="p-10 text-center text-slate-500">Carregando…</p>
      ) : !session ? (
        <AdminLogin onSignedIn={setSession} />
      ) : (
        <>
          <header className="border-b-2 border-[#EDA700] bg-[#0d1929] text-white shadow-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
              <Link to="/admin" className="flex items-center gap-4" aria-label="Painel de artigos da Duall Engenharia">
                <img src={duallLogoWhiteUrl} alt="Duall Engenharia" className="h-8 w-auto select-none" />
                <span className="hidden h-6 w-px bg-white/25 sm:block" aria-hidden="true" />
                <span className="hidden font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/70 sm:block">Painel de artigos</span>
              </Link>
              <div className="flex items-center gap-3 text-sm">
                <span className="hidden items-center gap-2 sm:flex">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDA700] text-xs font-extrabold uppercase text-slate-900"
                    aria-hidden="true"
                  >
                    {session.email.charAt(0)}
                  </span>
                  <span className="text-white/70">{session.email}</span>
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    setSession(null);
                    navigate('/admin');
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 font-semibold transition hover:bg-white/10"
                >
                  <LogOut size={14} aria-hidden="true" /> Sair
                </button>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}
