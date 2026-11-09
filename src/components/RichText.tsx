import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Texto dos artigos (escrito no painel /admin), em marcações simples:
 *  - parágrafos separados por linha em branco
 *  - **negrito** e [texto](https://link)
 *  - lista: linhas começando com "- "
 *  - imagem: ![descrição](https://...) sozinha numa linha
 *  - vídeo: link do YouTube sozinho numa linha
 * Usado na pré-visualização do painel e na página pública do artigo.
 */

const YOUTUBE_RE = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})(?:[?&#].*)?$/;

export const youtubeId = (url: string) => url.trim().match(YOUTUBE_RE)?.[1] ?? null;

const safeUrl = (url: string) => (/^(https?:\/\/|mailto:|\/)/i.test(url) ? url : '#');
const safeImage = (url: string) => /^(https?:\/\/|data:image\/|\/)/i.test(url);

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link)
      return (
        <a key={i} href={safeUrl(link[2])} className="font-semibold text-[#315676] underline" target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    return part;
  });
}

/** Vídeo "leve": mostra a miniatura e só carrega o player do YouTube quando a pessoa clica. */
export function YouTubeEmbed({ id }: { id: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="Vídeo do YouTube"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label="Reproduzir vídeo" className="group absolute inset-0 h-full w-full">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
          />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDA700] text-slate-900 shadow-xl transition group-hover:scale-110">
            <Play size={28} fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}

export default function RichText({ text, className = '' }: { text: string; className?: string }) {
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className={`space-y-5 ${className}`}>
      {blocks.map((block, i) => {
        const video = youtubeId(block);
        if (video) return <YouTubeEmbed key={i} id={video} />;

        const image = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
        if (image && safeImage(image[2]))
          return (
            <figure key={i}>
              <img src={image[2]} alt={image[1]} loading="lazy" className="w-full rounded-xl" />
              {image[1] && <figcaption className="mt-2 text-center text-sm text-slate-500">{image[1]}</figcaption>}
            </figure>
          );

        const lines = block.split('\n');
        if (lines.every((l) => l.trim().startsWith('- ')))
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.trim().slice(2))}</li>
              ))}
            </ul>
          );

        return (
          <p key={i} className="whitespace-pre-line">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
