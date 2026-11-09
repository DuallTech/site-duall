import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bold, Clock, Eye, ImagePlus, Image as ImageIcon, Link2, List, Plus, Smile, X, Youtube } from 'lucide-react';

import RichText, { youtubeId } from '../components/RichText';

import { getPost, savePost, slugify, uploadImage, type PostStatus } from './api';

const today = () => new Date().toISOString().slice(0, 10);

const EMOJIS = ['👍', '👏', '🙌', '💡', '🚀', '🏗️', '⚡', '💧', '🔥', '✅', '📐', '🤝', '🎯', '📌', '😊', '❤️'];

const fieldClass = 'w-full bg-transparent outline-none placeholder:text-slate-400';

function Preview({ title, summary, body, coverUrl }: { title: string; summary: string; body: string; coverUrl?: string }) {
  return (
    <article className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {coverUrl && <img src={coverUrl} alt="" className="aspect-video w-full rounded-xl object-cover" />}
      <h2 className="font-display text-2xl font-extrabold text-[#0d1929]">{title || 'Título do artigo'}</h2>
      {summary && <p className="text-slate-500">{summary}</p>}
      <RichText text={body} className="text-slate-700" />
    </article>
  );
}

function ToolButton({ label, onClick, active, children }: { label: string; onClick: () => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 ${active ? 'bg-slate-100' : ''}`}
    >
      {children}
    </button>
  );
}

/** Compositor no estilo de postagem do LinkedIn. */
export default function AdminEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(Boolean(id));
  const [originalStatus, setOriginalStatus] = useState<PostStatus>('draft');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [publishedAt, setPublishedAt] = useState(today());

  const [panel, setPanel] = useState<'emoji' | 'date' | 'more' | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPost(id).then((post) => {
      if (!post) return navigate('/admin', { replace: true });
      setOriginalStatus(post.status);
      setTitle(post.title);
      setSlug(post.slug);
      setSlugTouched(true);
      setSummary(post.summary);
      setBody(post.body);
      setCoverUrl(post.coverUrl);
      setLinkedinUrl(post.linkedinUrl ?? '');
      setPublishedAt(post.publishedAt.slice(0, 10));
      setLoading(false);
    });
  }, [id, navigate]);

  // O campo de texto cresce junto com o conteúdo.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.max(el.scrollHeight, 220)}px`;
  }, [body, loading]);

  const onTitle = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const replaceSelection = (build: (selected: string) => string | null) => {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const next = build(body.slice(s, e));
    if (next === null) return;
    setBody(body.slice(0, s) + next + body.slice(e));
    requestAnimationFrame(() => el.focus());
  };

  const format = (kind: 'bold' | 'list' | 'link') =>
    replaceSelection((sel) => {
      if (kind === 'bold') return `**${sel || 'texto'}**`;
      if (kind === 'list') return (sel || 'item').split('\n').map((l) => `- ${l}`).join('\n');
      const url = window.prompt('Endereço do link (https://…)');
      return url ? `[${sel || 'texto do link'}](${url})` : null;
    });

  const onCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setCoverUrl(await uploadImage(file));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no envio da imagem.');
    }
    e.target.value = '';
  };

  /** Insere o trecho como um bloco próprio (separado por linhas em branco) na posição do cursor. */
  const insertBlock = (block: string) =>
    replaceSelection((sel) => `${sel ? `${sel}

` : ''}${block}

`);

  const onInlineImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      insertBlock(`![](${url})`);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no envio da imagem.');
    }
    e.target.value = '';
  };

  const addVideo = () => {
    const url = window.prompt('Cole o link do vídeo do YouTube');
    if (!url) return;
    if (!youtubeId(url)) return setError('Esse link não parece ser de um vídeo do YouTube.');
    setError('');
    insertBlock(url.trim());
  };

  const canPublish = title.trim().length > 0 && body.trim().length > 0;

  const submit = async (status: PostStatus) => {
    if (status === 'published' && !canPublish) return setError('Preencha o título e o texto para publicar.');
    if (!title.trim()) return setError('Dê ao menos um título para salvar o rascunho.');
    setBusy(true);
    setError('');
    try {
      await savePost({
        id,
        slug: slug || slugify(title) || `rascunho-${Date.now()}`,
        title: title.trim(),
        summary: summary.trim(),
        body,
        coverUrl,
        linkedinUrl: linkedinUrl.trim() || undefined,
        status,
        publishedAt: new Date(publishedAt).toISOString(),
      });
      navigate(status === 'draft' ? '/admin?aba=rascunhos' : '/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar.');
      setBusy(false);
    }
  };

  if (loading) return <p className="text-slate-500">Carregando…</p>;

  const isPublished = originalStatus === 'published';

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft size={14} aria-hidden="true" /> Voltar
      </Link>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* Cabeçalho: quem está publicando */}
        <div className="flex items-center gap-3 px-6 pb-2 pt-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d1929] font-display text-lg font-extrabold text-[#EDA700]">
            D
          </span>
          <div className="flex-1">
            <p className="font-bold leading-tight text-[#0d1929]">Duall Engenharia</p>
            <p className="text-xs text-slate-500">
              {isPublished ? 'Artigo publicado' : id ? 'Rascunho' : 'Novo artigo'} · aparece em /conteudo/artigos
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Eye size={14} aria-hidden="true" /> {showPreview ? 'Editar' : 'Pré-visualizar'}
          </button>
        </div>

        {showPreview ? (
          <div className="bg-slate-50 p-4">
            <Preview title={title} summary={summary} body={body} coverUrl={coverUrl} />
          </div>
        ) : (
          <div className="space-y-3 px-6 pb-4 pt-2">
            <input
              value={title}
              onChange={(e) => onTitle(e.target.value)}
              placeholder="Título do artigo"
              maxLength={140}
              aria-label="Título"
              className={`${fieldClass} font-display text-2xl font-extrabold text-[#0d1929]`}
            />
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Resumo curto (aparece na lista e no Google)"
              maxLength={300}
              aria-label="Resumo"
              className={`${fieldClass} text-slate-600`}
            />

            {coverUrl && (
              <div className="relative">
                <img src={coverUrl} alt="" className="aspect-video w-full rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => setCoverUrl(undefined)}
                  aria-label="Remover imagem"
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            )}

            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Compartilhe suas ideias..."
              aria-label="Texto do artigo"
              className={`${fieldClass} min-h-[220px] resize-none text-lg leading-relaxed text-slate-800`}
            />
          </div>
        )}

        {/* Painéis que abrem a partir da barra de ferramentas */}
        {!showPreview && panel === 'emoji' && (
          <div className="mx-6 mb-3 flex flex-wrap gap-1 rounded-xl border border-slate-200 p-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => replaceSelection((sel) => sel + emoji)}
                className="rounded-lg p-1.5 text-xl hover:bg-slate-100"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        {!showPreview && panel === 'date' && (
          <label className="mx-6 mb-3 flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-semibold">
            Data de publicação
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 font-normal"
            />
          </label>
        )}
        {!showPreview && panel === 'more' && (
          <div className="mx-6 mb-3 space-y-3 rounded-xl border border-slate-200 p-4 text-sm">
            <label className="block space-y-1 font-semibold">
              Endereço do artigo (slug)
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugTouched(true);
                }}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
              />
              <span className="block text-xs font-normal text-slate-400">/conteudo/artigos/{slug || '…'}</span>
            </label>
            <label className="block space-y-1 font-semibold">
              Link da postagem original no LinkedIn <span className="font-normal text-slate-400">(opcional)</span>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
          </div>
        )}

        {error && (
          <p role="alert" className="mx-6 mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Barra de ferramentas */}
        <div className="flex items-center gap-1 px-4 pb-3">
          <ToolButton label="Emoji" active={panel === 'emoji'} onClick={() => setPanel(panel === 'emoji' ? null : 'emoji')}>
            <Smile size={20} aria-hidden="true" />
          </ToolButton>
          <label title="Imagem de capa (topo do artigo)" className="cursor-pointer rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100">
            <ImagePlus size={20} aria-hidden="true" />
            <span className="sr-only">Adicionar imagem de capa</span>
            <input type="file" accept="image/*" onChange={onCover} className="sr-only" />
          </label>
          <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
          <ToolButton label="Negrito" onClick={() => format('bold')}>
            <Bold size={18} aria-hidden="true" />
          </ToolButton>
          <ToolButton label="Lista" onClick={() => format('list')}>
            <List size={18} aria-hidden="true" />
          </ToolButton>
          <ToolButton label="Link" onClick={() => format('link')}>
            <Link2 size={18} aria-hidden="true" />
          </ToolButton>
          <label title="Imagem no texto" className="cursor-pointer rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100">
            <ImageIcon size={18} aria-hidden="true" />
            <span className="sr-only">Inserir imagem no texto</span>
            <input type="file" accept="image/*" onChange={onInlineImage} className="sr-only" />
          </label>
          <ToolButton label="Vídeo do YouTube" onClick={addVideo}>
            <Youtube size={18} aria-hidden="true" />
          </ToolButton>
          <ToolButton label="Mais opções" active={panel === 'more'} onClick={() => setPanel(panel === 'more' ? null : 'more')}>
            <Plus size={20} aria-hidden="true" />
          </ToolButton>
        </div>

        {/* Rodapé: agendar, rascunho e publicar */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-4 py-3">
          <ToolButton label="Data de publicação" active={panel === 'date'} onClick={() => setPanel(panel === 'date' ? null : 'date')}>
            <Clock size={20} aria-hidden="true" />
          </ToolButton>
          <button
            type="button"
            disabled={busy}
            onClick={() => submit('draft')}
            className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-60"
          >
            {isPublished ? 'Voltar para rascunho' : 'Salvar rascunho'}
          </button>
          <button
            type="button"
            disabled={busy || !canPublish}
            onClick={() => submit('published')}
            className="rounded-full bg-[#EDA700] px-6 py-2 text-sm font-bold text-slate-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {isPublished ? 'Salvar alterações' : 'Publicar'}
          </button>
        </div>
      </div>
    </div>
  );
}
