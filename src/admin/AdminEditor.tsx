import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ArrowLeft, Bold, Clock, Eye, ImagePlus, Image as ImageIcon, Link2, List, Plus, Smile, X, Youtube } from 'lucide-react';

import RichText, { youtubeId } from '../components/RichText';

import { getPost, savePost, slugify, uploadImage, type PostStatus } from './api';

/** Converte uma data em "AAAA-MM-DDTHH:mm" no fuso local (formato do input datetime-local). */
const toLocalInput = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};
const today = () => toLocalInput(new Date());

const EMOJIS = ['👍', '👏', '🙌', '💡', '🚀', '🏗️', '⚡', '💧', '🔥', '✅', '📐', '🤝', '🎯', '📌', '😊', '❤️'];

const fieldClass = 'w-full bg-transparent outline-none placeholder:text-slate-400';

function Preview({ title, summary, body }: { title: string; summary: string; body: string }) {
  return (
    <article className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
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
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 ${active ? 'bg-slate-100' : ''}`}
    >
      {children}
    </button>
  );
}

/* O texto do artigo continua sendo gravado como antes (parágrafos separados por linha em branco, imagem como
   ![](url), vídeo como link). Só que, no editor, imagens e vídeos aparecem como blocos visuais entre caixas de texto. */

interface Seg {
  id: string;
  kind: 'text' | 'media';
  value: string;
}

let segCounter = 0;
const newSeg = (kind: Seg['kind'], value = ''): Seg => ({ id: `seg-${++segCounter}`, kind, value });

const IMAGE_RE = /^!\[([^\]]*)\]\(([^)\s]+)\)(?:\{(?:(\d{1,3})%)? ?(left|center|right)?\})?$/;
const TEXT_ALIGN_RE = /^\{(center|right|justify)\}\s*/;
const isMedia = (block: string) => Boolean(youtubeId(block) || IMAGE_RE.test(block));

/** Sempre começa e termina com um bloco de texto e alterna texto/mídia, para dar para digitar antes e depois de cada mídia. */
function parseSegs(body: string): Seg[] {
  const segs: Seg[] = [];
  let buffer: string[] = [];
  const flush = () => {
    segs.push(newSeg('text', buffer.join('\n\n')));
    buffer = [];
  };
  for (const block of body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)) {
    if (isMedia(block)) {
      flush();
      segs.push(newSeg('media', block));
    } else buffer.push(block);
  }
  flush();
  return segs;
}

const serializeSegs = (segs: Seg[]) => segs.map((s) => s.value.trim()).filter(Boolean).join('\n\n');

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inlineToHtml(text: string) {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>');
}

/** Texto gravado (marcações simples) -> HTML para mostrar já formatado dentro do editor. */
const mdToHtml = (md: string) =>
  md
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      const align = block.match(TEXT_ALIGN_RE);
      if (align) return `<p style="text-align:${align[1]}">${inlineToHtml(block.slice(align[0].length))}</p>`;
      const lines = block.split('\n');
      if (lines.every((l) => l.trim().startsWith('- '))) {
        return `<ul>${lines.map((l) => `<li>${inlineToHtml(l.trim().slice(2))}</li>`).join('')}</ul>`;
      }
      return `<p>${inlineToHtml(block)}</p>`;
    })
    .join('');

const BLOCK_TAGS = new Set(['P', 'DIV', 'UL', 'OL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE']);

function inlineMd(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? '').replace(/\u00a0/g, ' ');
  if (!(node instanceof HTMLElement)) return '';
  if (node.tagName === 'BR') return '\n';
  const inner = Array.from(node.childNodes).map(inlineMd).join('');
  if (node.tagName === 'STRONG' || node.tagName === 'B') {
    const m = inner.match(/^(\s*)([\s\S]*?)(\s*)$/)!;
    return m[2] ? `${m[1]}**${m[2]}**${m[3]}` : inner;
  }
  if (node.tagName === 'A') {
    const href = node.getAttribute('href');
    return href && inner.trim() ? `[${inner}](${href})` : inner;
  }
  return inner;
}

/** HTML do editor -> texto gravado (o mesmo formato que o site já sabe exibir). */
function htmlToMd(root: Node): string {
  const out: string[] = [];
  let buffer = '';
  const flush = () => {
    if (buffer.trim()) out.push(buffer.trim());
    buffer = '';
  };
  const walk = (parent: Node) => {
    for (const child of Array.from(parent.childNodes)) {
      if (child instanceof HTMLElement && BLOCK_TAGS.has(child.tagName)) {
        flush();
        if (child.tagName === 'UL' || child.tagName === 'OL') {
          const items = Array.from(child.children)
            .map((li) => inlineMd(li).trim().replace(/\n+/g, ' '))
            .filter(Boolean)
            .map((t) => `- ${t}`);
          if (items.length) out.push(items.join('\n'));
        } else if (Array.from(child.children).some((c) => BLOCK_TAGS.has(c.tagName))) {
          walk(child);
        } else {
          const t = inlineMd(child).trim();
          const align = child.style.textAlign || child.getAttribute('align') || '';
          if (t) out.push(align === 'center' || align === 'right' || align === 'justify' ? `{${align}} ${t}` : t);
        }
      } else buffer += inlineMd(child);
    }
    flush();
  };
  walk(root);
  return out.join('\n\n');
}

/** Caixa de texto formatado: negrito, lista e link aparecem como ficarão no site. */
function TextSegment({
  value,
  onChange,
  onFocus,
  register,
  placeholder,
  minHeight,
}: {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  register: (el: HTMLDivElement | null) => void;
  placeholder?: string;
  minHeight: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const emitted = useRef<string | null>(null);

  // Só reescreve o conteúdo quando a mudança veio de fora (ex.: remover uma imagem); digitar não mexe no cursor.
  useEffect(() => {
    const el = ref.current;
    if (!el || value === emitted.current) return;
    el.innerHTML = mdToHtml(value);
    emitted.current = value;
  }, [value]);

  const onInput = () => {
    const el = ref.current;
    if (!el) return;
    if (!el.textContent && !el.querySelector('li')) el.innerHTML = '';
    const md = htmlToMd(el);
    emitted.current = md;
    onChange(md);
  };

  return (
    <div
      ref={(el) => {
        ref.current = el;
        register(el);
      }}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline="true"
      aria-label="Texto do artigo"
      data-placeholder={placeholder}
      onInput={onInput}
      onFocus={onFocus}
      onPaste={(e) => {
        e.preventDefault();
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
      }}
      className={`${fieldClass} text-lg leading-relaxed text-slate-800 [overflow-wrap:anywhere] empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] [&_a]:font-semibold [&_a]:text-[#315676] [&_a]:underline [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6`}
      style={{ minHeight }}
    />
  );
}

const IMAGE_SIZES = [
  { label: 'Pequena', width: 33 },
  { label: 'Média', width: 50 },
  { label: 'Grande', width: 75 },
  { label: 'Total', width: 100 },
];

type Align = 'left' | 'center' | 'right';
const IMAGE_ALIGNS: { value: Align; label: string; Icon: typeof AlignLeft }[] = [
  { value: 'left', label: 'Alinhar à esquerda', Icon: AlignLeft },
  { value: 'center', label: 'Centralizar', Icon: AlignCenter },
  { value: 'right', label: 'Alinhar à direita', Icon: AlignRight },
];
const ALIGN_CLASS: Record<Align, string> = { left: 'mr-auto', center: 'mx-auto', right: 'ml-auto' };

function MediaBlock({ value, onChange, onRemove }: { value: string; onChange: (value: string) => void; onRemove: () => void }) {
  const video = youtubeId(value);
  const image = value.match(IMAGE_RE);
  const width = Number(image?.[3] ?? 100);
  const align = (image?.[4] as Align | undefined) ?? 'center';

  const update = (w: number, a: Align) => {
    const attrs = [w < 100 ? `${w}%` : '', a !== 'center' ? a : ''].filter(Boolean).join(' ');
    onChange(`![${image?.[1] ?? ''}](${image?.[2]})${attrs ? `{${attrs}}` : ''}`);
  };

  const removeButton = (
    <button
      type="button"
      onClick={onRemove}
      aria-label={video ? 'Remover vídeo' : 'Remover imagem'}
      className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
    >
      <X size={14} aria-hidden="true" />
    </button>
  );

  if (video)
    return (
      <div className="relative">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          <img src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-90" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDA700] text-slate-900 shadow-xl">
            <Youtube size={24} aria-hidden="true" />
          </span>
        </div>
        {removeButton}
      </div>
    );

  return (
    <div className="space-y-2">
      <div className={`relative ${ALIGN_CLASS[align]}`} style={{ width: `${width}%` }}>
        <img src={image?.[2]} alt={image?.[1] ?? ''} className="w-full rounded-xl" />
        {removeButton}
      </div>
      <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-2">
        <div role="group" aria-label="Tamanho da imagem" className="flex gap-1 rounded-full bg-slate-100 p-1">
          {IMAGE_SIZES.map((size) => (
            <button
              key={size.width}
              type="button"
              onClick={() => update(size.width, align)}
              aria-pressed={width === size.width}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                width === size.width ? 'bg-[#0d1929] text-white shadow' : 'text-slate-600 hover:bg-white'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Posição da imagem" className="flex gap-1 rounded-full bg-slate-100 p-1">
          {IMAGE_ALIGNS.map(({ value: v, label, Icon }) => (
            <button
              key={v}
              type="button"
              onClick={() => update(width, v)}
              aria-pressed={align === v}
              aria-label={label}
              title={label}
              className={`rounded-full p-1.5 transition ${align === v ? 'bg-[#0d1929] text-white shadow' : 'text-slate-600 hover:bg-white'}`}
            >
              <Icon size={14} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

type ModalKind = 'video' | 'link';

const MODAL_TEXT: Record<ModalKind, { title: string; hint: string; placeholder: string; action: string }> = {
  video: {
    title: 'Adicionar vídeo do YouTube',
    hint: 'Cole o link do vídeo, do jeito que aparece na barra do navegador. Nós cuidamos do resto.',
    placeholder: 'https://www.youtube.com/watch?v=...',
    action: 'Adicionar vídeo',
  },
  link: {
    title: 'Adicionar link',
    hint: 'Cole o endereço da página para onde o texto selecionado deve levar.',
    placeholder: 'https://...',
    action: 'Adicionar link',
  },
};

/** Janela no lugar do window.prompt: pede um endereço, valida e mostra a miniatura se for vídeo. */
function UrlModal({ kind, onConfirm, onClose }: { kind: ModalKind; onConfirm: (url: string) => void; onClose: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const text = MODAL_TEXT[kind];
  const videoId = kind === 'video' ? youtubeId(value) : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const url = value.trim();
    if (!url) return setError('Cole o endereço para continuar.');
    if (kind === 'video' && !youtubeId(url)) return setError('Esse link não parece ser de um vídeo do YouTube.');
    if (kind === 'link' && !/^https?:\/\/\S+$/i.test(url)) return setError('O endereço precisa começar com https://');
    onConfirm(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1929]/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-label={text.title}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDA700]/15 text-[#b57f00]">
            {kind === 'video' ? <Youtube size={20} aria-hidden="true" /> : <Link2 size={20} aria-hidden="true" />}
          </span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-extrabold text-[#0d1929]">{text.title}</h3>
            <p className="text-sm text-slate-500">{text.hint}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100">
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <input
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          placeholder={text.placeholder}
          aria-label="Endereço"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-[#EDA700] focus:ring-2 focus:ring-[#EDA700]/30"
        />

        {videoId && (
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Miniatura do vídeo"
            className="aspect-video w-full rounded-xl object-cover"
          />
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100">
            Cancelar
          </button>
          <button type="submit" className="rounded-full bg-[#EDA700] px-5 py-2 text-sm font-bold text-slate-900 hover:brightness-95">
            {text.action}
          </button>
        </div>
      </form>
    </div>
  );
}

/** Compositor no estilo de postagem do LinkedIn. */
export default function AdminEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const areas = useRef<Record<string, HTMLDivElement | null>>({});
  const savedRange = useRef<Range | null>(null);
  const activeId = useRef<string | null>(null);

  const [loading, setLoading] = useState(Boolean(id));
  const [originalStatus, setOriginalStatus] = useState<PostStatus>('draft');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [summary, setSummary] = useState('');
  const [segs, setSegs] = useState<Seg[]>(() => [newSeg('text')]);
  const body = useMemo(() => serializeSegs(segs), [segs]);
  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [publishedAt, setPublishedAt] = useState(today());

  const [panel, setPanel] = useState<'emoji' | 'date' | 'more' | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [modal, setModal] = useState<ModalKind | null>(null);

  useEffect(() => {
    if (!id) return;
    getPost(id).then((post) => {
      if (!post) return navigate('/admin', { replace: true });
      setOriginalStatus(post.status);
      setTitle(post.title);
      setSlug(post.slug);
      setSlugTouched(true);
      setSummary(post.summary);
      setSegs(parseSegs(post.body));
      setCoverUrl(post.coverUrl);
      setLinkedinUrl(post.linkedinUrl ?? '');
      setPublishedAt(toLocalInput(new Date(post.publishedAt)));
      setLoading(false);
    });
  }, [id, navigate]);

  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }, []);

  const onTitle = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  /** Caixa de texto onde o cursor estava por último (ou a última, se ainda não clicou em nenhuma). */
  const activeText = () => {
    const index = segs.findIndex((s) => s.id === activeId.current && s.kind === 'text');
    const i = index >= 0 ? index : segs.map((s) => s.kind).lastIndexOf('text');
    return { i, el: areas.current[segs[i].id] ?? null };
  };

  /** Guarda onde estava o cursor, porque abrir uma janela ou o seletor de arquivo tira o foco do texto. */
  const remember = () => {
    const { el } = activeText();
    const sel = window.getSelection();
    savedRange.current = el && sel && sel.rangeCount && el.contains(sel.anchorNode) ? sel.getRangeAt(0).cloneRange() : null;
  };

  const openModal = (kind: ModalKind) => {
    remember();
    setModal(kind);
  };

  /** Aplica um comando de formatação (negrito, lista, emoji...) no texto que está sendo editado. */
  const exec = (command: string, arg?: string) => {
    const { el } = activeText();
    if (!el) return;
    if (document.activeElement !== el) el.focus();
    document.execCommand(command, false, arg);
  };

  const setSegValue = (id: string, value: string) => setSegs((all) => all.map((s) => (s.id === id ? { ...s, value } : s)));

  const removeMedia = (id: string) =>
    setSegs((all) => {
      const i = all.findIndex((s) => s.id === id);
      const merged = [all[i - 1].value.trimEnd(), all[i + 1].value.trimStart()].filter(Boolean).join('\n\n');
      return [...all.slice(0, i - 1), { ...all[i - 1], value: merged }, ...all.slice(i + 2)];
    });

  const format = (kind: 'bold' | 'list') => exec(kind === 'bold' ? 'bold' : 'insertUnorderedList');

  const addLink = (url: string) => {
    setModal(null);
    const { el } = activeText();
    const range = savedRange.current;
    if (!el) return;
    el.focus();
    const sel = window.getSelection();
    if (range && sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (sel && !sel.isCollapsed) document.execCommand('createLink', false, url);
    else document.execCommand('insertHTML', false, `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`);
    savedRange.current = null;
  };

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

  /** Insere imagem/vídeo como bloco visual na posição do cursor, dividindo o texto em duas caixas. */
  const insertBlock = (block: string) => {
    const { i, el } = activeText();
    let before = segs[i].value;
    let after = '';
    const range = savedRange.current;
    if (el && range && el.contains(range.endContainer)) {
      const toMd = (r: Range) => {
        const box = document.createElement('div');
        box.appendChild(r.cloneContents());
        return htmlToMd(box);
      };
      const head = document.createRange();
      head.selectNodeContents(el);
      head.setEnd(range.endContainer, range.endOffset);
      const tail = document.createRange();
      tail.selectNodeContents(el);
      tail.setStart(range.endContainer, range.endOffset);
      before = toMd(head);
      after = toMd(tail);
    }
    savedRange.current = null;
    const next = newSeg('text', after);
    setSegs((all) => [...all.slice(0, i), { ...all[i], value: before }, newSeg('media', block), next, ...all.slice(i + 1)]);
    activeId.current = next.id;
    requestAnimationFrame(() => areas.current[next.id]?.focus());
  };

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

  const addVideo = (url: string) => {
    setModal(null);
    setError('');
    insertBlock(url.trim());
  };

  const canPublish = title.trim().length > 0 && body.trim().length > 0;

  const submit = async (status: PostStatus) => {
    if (status === 'published' && !canPublish) return setError('Preencha o título e o texto para publicar.');
    if (!title.trim()) return setError('Dê ao menos um título para salvar o rascunho.');
    if (!publishedAt || Number.isNaN(new Date(publishedAt).getTime())) return setError('Informe uma data e hora de publicação válidas.');
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
    <div className="mx-auto max-w-4xl space-y-4">
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
            <Preview title={title} summary={summary} body={body} />
          </div>
        ) : (
          <div className="space-y-4 px-8 pb-4 pt-3">
            <input
              value={title}
              onChange={(e) => onTitle(e.target.value)}
              placeholder="Título do artigo"
              maxLength={140}
              aria-label="Título"
              className={`${fieldClass} font-display text-3xl font-extrabold text-[#0d1929]`}
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

            {segs.map((seg) =>
              seg.kind === 'media' ? (
                <MediaBlock key={seg.id} value={seg.value} onChange={(value) => setSegValue(seg.id, value)} onRemove={() => removeMedia(seg.id)} />
              ) : (
                <TextSegment
                  key={seg.id}
                  value={seg.value}
                  onChange={(value) => setSegValue(seg.id, value)}
                  onFocus={() => (activeId.current = seg.id)}
                  register={(el) => (areas.current[seg.id] = el)}
                  placeholder={segs.length === 1 ? 'Compartilhe suas ideias...' : undefined}
                  minHeight={segs.length === 1 ? 380 : 64}
                />
              ),
            )}
          </div>
        )}

        {/* Painéis que abrem a partir da barra de ferramentas */}
        {!showPreview && panel === 'emoji' && (
          <div className="mx-6 mb-3 flex flex-wrap gap-1 rounded-xl border border-slate-200 p-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('insertText', emoji)}
                className="rounded-lg p-1.5 text-xl hover:bg-slate-100"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        {!showPreview && panel === 'date' && (
          <label className="mx-6 mb-3 flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-semibold">
            Data e hora de publicação
            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 font-normal"
            />
            {new Date(publishedAt).getTime() > Date.now() && (
              <span className="text-xs font-normal text-amber-700">
                Agendado: o artigo só aparece no site a partir desse horário.
              </span>
            )}
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
          <ToolButton label="Link" onClick={() => openModal('link')}>
            <Link2 size={18} aria-hidden="true" />
          </ToolButton>
          <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
          <ToolButton label="Alinhar texto à esquerda" onClick={() => exec('justifyLeft')}>
            <AlignLeft size={18} aria-hidden="true" />
          </ToolButton>
          <ToolButton label="Centralizar texto" onClick={() => exec('justifyCenter')}>
            <AlignCenter size={18} aria-hidden="true" />
          </ToolButton>
          <ToolButton label="Alinhar texto à direita" onClick={() => exec('justifyRight')}>
            <AlignRight size={18} aria-hidden="true" />
          </ToolButton>
          <ToolButton label="Justificar texto" onClick={() => exec('justifyFull')}>
            <AlignJustify size={18} aria-hidden="true" />
          </ToolButton>
          <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
          <label title="Imagem no texto" onMouseDown={remember} className="cursor-pointer rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100">
            <ImageIcon size={18} aria-hidden="true" />
            <span className="sr-only">Inserir imagem no texto</span>
            <input type="file" accept="image/*" onChange={onInlineImage} className="sr-only" />
          </label>
          <ToolButton label="Vídeo do YouTube" onClick={() => openModal('video')}>
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
            {new Date(publishedAt).getTime() > Date.now() ? 'Agendar' : isPublished ? 'Salvar alterações' : 'Publicar'}
          </button>
        </div>
      </div>

      {modal && <UrlModal kind={modal} onConfirm={modal === 'video' ? addVideo : addLink} onClose={() => setModal(null)} />}
    </div>
  );
}
