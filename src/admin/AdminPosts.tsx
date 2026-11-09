import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { deletePost, listPosts, type AdminPost } from './api';

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

type Kind = 'published' | 'scheduled' | 'draft';

const kindOf = (p: AdminPost): Kind =>
  p.status === 'draft' ? 'draft' : new Date(p.publishedAt).getTime() > Date.now() ? 'scheduled' : 'published';

const TABS: { status: Kind; param: string; label: string; empty: string }[] = [
  { status: 'published', param: 'publicados', label: 'Publicados', empty: 'Nenhum artigo publicado ainda.' },
  { status: 'scheduled', param: 'agendados', label: 'Agendados', empty: 'Nenhum artigo agendado.' },
  { status: 'draft', param: 'rascunhos', label: 'Rascunhos', empty: 'Nenhum rascunho salvo.' },
];

export default function AdminPosts() {
  const [posts, setPosts] = useState<AdminPost[] | null>(null);
  const [params, setParams] = useSearchParams();
  const tab = TABS.find((t) => t.param === params.get('aba')) ?? TABS[0];

  const load = () => listPosts().then(setPosts);
  useEffect(() => {
    load();
  }, []);

  const remove = async (post: AdminPost) => {
    if (!window.confirm(`Excluir "${post.title}"? Essa ação não pode ser desfeita.`)) return;
    await deletePost(post.id);
    load();
  };

  const visible = posts?.filter((p) => kindOf(p) === tab.status) ?? [];
  const count = (status: Kind) => posts?.filter((p) => kindOf(p) === status).length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-extrabold text-[#0d1929]">Seus artigos</h1>
        <Link
          to="/admin/novo"
          className="inline-flex items-center gap-2 rounded-lg bg-[#EDA700] px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:brightness-95"
        >
          <Plus size={16} aria-hidden="true" /> Novo artigo
        </Link>
      </div>

      <div role="tablist" className="flex gap-1 border-b border-slate-300">
        {TABS.map((t) => {
          const active = t.param === tab.param;
          return (
            <button
              key={t.param}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setParams(t.param === TABS[0].param ? {} : { aba: t.param })}
              className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-bold transition ${
                active ? 'border-[#EDA700] text-[#0d1929]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
              <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-[#EDA700]/20' : 'bg-slate-200'}`}>
                {count(t.status)}
              </span>
            </button>
          );
        })}
      </div>

      {posts === null ? (
        <p className="text-slate-500">Carregando…</p>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-semibold text-slate-700">{tab.empty}</p>
          <p className="mt-1 text-sm text-slate-500">Clique em "Novo artigo" para escrever.</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          {visible.map((post) => (
            <li key={post.id} className="flex items-center gap-4 p-4">
              {post.coverUrl ? (
                <img src={post.coverUrl} alt="" className="hidden h-14 w-20 shrink-0 rounded-lg object-cover sm:block" />
              ) : (
                <div className="hidden h-14 w-20 shrink-0 rounded-lg bg-slate-100 sm:block" aria-hidden="true" />
              )}
              <Link to={`/admin/editar/${post.id}`} className="min-w-0 flex-1 hover:underline">
                <p className="truncate font-bold text-[#0d1929]">{post.title}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {post.status === 'published'
                    ? new Date(post.publishedAt).getTime() > Date.now()
                      ? 'Agendado para'
                      : 'Publicado em'
                    : 'Última edição em'}{' '}
                  {dateFormat.format(new Date(post.status === 'published' ? post.publishedAt : post.updatedAt))}
                </p>
              </Link>
              <Link
                to={`/admin/editar/${post.id}`}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Pencil size={14} aria-hidden="true" />
                <span className="hidden sm:inline">{post.status === 'draft' ? 'Continuar editando' : 'Editar'}</span>
                <span className="sr-only sm:hidden">Editar {post.title}</span>
              </Link>
              <button
                type="button"
                onClick={() => remove(post)}
                aria-label={`Excluir ${post.title}`}
                className="rounded-lg border border-slate-200 p-2 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
