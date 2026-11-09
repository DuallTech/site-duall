import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

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
          <header className="border-b border-slate-200 bg-[#0d1929] text-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
              <Link to="/admin" className="font-display text-lg font-extrabold">
                Duall <span className="text-[#EDA700]">· Artigos</span>
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <span className="hidden text-white/60 sm:inline">{session.email}</span>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    setSession(null);
                    navigate('/admin');
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-1.5 transition hover:bg-white/10"
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
