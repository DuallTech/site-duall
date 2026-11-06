import { useRef, useState, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ImagePair = { bim: string; real: string; label: string };

// Mesmos pares da versão anterior do site (seção de especialidades). Trocar por pares reais: modelo BIM x foto da obra.
const PAIRS: ImagePair[] = [
  {
    label: 'Instalações hidráulicas',
    bim: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1400&q=80',
    real: 'https://space-duall.sfo3.cdn.digitaloceanspaces.com/galeria/0c58241e-a88b-420c-bbfa-ae92066d38e3.jpg',
  },
  {
    label: 'Instalações elétricas',
    bim: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
    real: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Combate a incêndio',
    bim: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=1400&q=80',
    real: 'https://images.unsplash.com/photo-1516216621174-bfa2196cfcf0?auto=format&fit=crop&w=1400&q=80',
  },
];

const tag =
  'pointer-events-none absolute z-20 rounded-full bg-[#0d1929]/75 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm';

/** Comparador arrastável: modelo BIM à esquerda, obra executada à direita. */
export default function BimRealityCompare() {
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pair = PAIRS[index];

  const moveTo = (clientX: number) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return;
    setPercent(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const step = (delta: number) => {
    setIndex((v) => (v + delta + PAIRS.length) % PAIRS.length);
    setPercent(50);
  };

  return (
    <div>
      <div
        ref={boxRef}
        className="relative aspect-video cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-slate-200 shadow-[0_30px_60px_-30px_rgba(13,25,41,0.45)]"
        onPointerDown={onDown}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        role="slider"
        tabIndex={0}
        aria-label="Comparar modelo BIM e obra executada"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPercent((p) => Math.max(0, p - 5));
          if (e.key === 'ArrowRight') setPercent((p) => Math.min(100, p + 5));
        }}
      >
        <img
          src={pair.real}
          alt={`${pair.label}: obra executada`}
          draggable={false}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={pair.bim}
          alt={`${pair.label}: modelo BIM`}
          draggable={false}
          loading="lazy"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-lg"
          style={{ left: `${percent}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDA700] text-slate-900 shadow-xl">
            <ChevronLeft size={14} aria-hidden="true" />
            <ChevronRight size={14} aria-hidden="true" />
          </span>
        </div>

        <span className={`${tag} left-4 top-4`}>Modelo BIM</span>
        <span className={`${tag} right-4 top-4`}>Obra executada</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#315676]">Arraste para comparar</p>
          <p className="mt-1 font-display text-lg font-bold text-[#2D3845]">{pair.label}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2 flex overflow-hidden rounded-lg border border-slate-200 text-xs font-semibold">
            <button type="button" onClick={() => setPercent(100)} className="px-3 py-2 text-[#2D3845] transition hover:bg-slate-50">
              Ver BIM
            </button>
            <span className="w-px bg-slate-200" aria-hidden="true" />
            <button type="button" onClick={() => setPercent(0)} className="px-3 py-2 text-[#2D3845] transition hover:bg-slate-50">
              Ver obra
            </button>
          </div>
          <span className="font-mono text-xs text-slate-500" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(PAIRS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Comparação anterior"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[#2D3845] transition hover:border-[#EDA700] hover:bg-[#EDA700]"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Próxima comparação"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[#2D3845] transition hover:border-[#EDA700] hover:bg-[#EDA700]"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
