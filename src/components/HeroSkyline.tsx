import type { CSSProperties } from 'react';

/**
 * Fundo do hero: uma cidade em traço de prancha. Os prédios se desenham e sobem, as janelas acendem
 * em azul (água), dourado (elétrica) e coral (incêndio), no ciclo de 12s das fases, e um guindaste
 * trabalha na lateral. SVG puro com animação em CSS: funciona no HTML pré-renderizado e é decorativo.
 */

const W = 1600;
const GROUND = 540;
const FLOOR_H = 26;
const BLUE = '#1992BB';
const GOLD = '#EDA700';
const CORAL = '#F2555D';

const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const v = (vars: Record<string, string | number>) => vars as unknown as CSSProperties;
const mono = { fontFamily: 'JetBrains Mono, monospace' } as const;

type Kind = 'blue' | 'gold' | 'coral' | 'dim';
type Win = { x: number; y: number; kind: Kind; d: number };
type Building = { x: number; w: number; h: number; floors: number; d: number; roof: 'none' | 'antenna' | 'tank'; riser: Kind | null };

function layout(seed: number, minH: number, maxH: number, minW: number, maxW: number, gap: number, withRiser: boolean) {
  const rand = seeded(seed);
  const list: Building[] = [];
  let x = -20;
  let i = 0;
  while (x < W) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const floors = Math.round((minH + rand() * (maxH - minH)) / FLOOR_H);
    const r = rand();
    list.push({
      x,
      w,
      h: floors * FLOOR_H,
      floors,
      d: 0.3 + i * 0.12,
      roof: r < 0.25 ? 'antenna' : r < 0.45 ? 'tank' : 'none',
      riser: withRiser && rand() < 0.3 ? (rand() < 0.5 ? 'blue' : 'gold') : null,
    });
    x += w + gap + Math.round(rand() * 14);
    i++;
  }
  return list;
}

const COLOR: Record<Kind, string> = { blue: BLUE, gold: GOLD, coral: CORAL, dim: '#fff' };

function Windows({ wins, kind, cls }: { wins: Win[]; kind: Kind; cls: string }) {
  return (
    <g className={cls}>
      {wins
        .filter((w) => w.kind === kind)
        .map((w, i) => (
          <rect
            key={i}
            className="bp-fade"
            style={v({ '--d': `${w.d}s` })}
            x={w.x}
            y={w.y}
            width="9"
            height="13"
            rx="1.5"
            fill={COLOR[kind]}
            fillOpacity="0.75"
          />
        ))}
    </g>
  );
}

export default function HeroSkyline() {
  const back = layout(7, 120, 300, 60, 100, 6, false);
  const front = layout(31, 160, 400, 78, 130, 10, true);

  const rand = seeded(5);
  const wins: Win[] = [];
  const dim: Win[] = [];
  front.forEach((b) => {
    const cols = Math.floor((b.w - 16) / 20);
    for (let f = 0; f < b.floors; f++) {
      for (let c = 0; c < cols; c++) {
        const r = rand();
        const win: Win = {
          x: b.x + 10 + c * 20 + (b.w - 16 - cols * 20) / 2,
          y: GROUND - (f + 1) * FLOOR_H + 6,
          kind: r < 0.14 ? 'blue' : r < 0.3 ? 'gold' : r < 0.36 ? 'coral' : 'dim',
          d: 1.6 + b.d + f * 0.05,
        };
        (win.kind === 'dim' ? dim : wins).push(win);
      }
    }
  });

  const tags: Array<{ b: number; text: string; color: string; dy: number }> = [
    { b: 2, text: 'P12 · MEP', color: BLUE, dy: -34 },
    { b: 6, text: 'BIM · LOD 400', color: GOLD, dy: -34 },
    { b: 9, text: 'ART ✓', color: CORAL, dy: -34 },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} 580`}
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="sk-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.02" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="sk-sweep" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Camada de trás: prédios longe, só contorno */}
      <g opacity="0.4">
        {back.map((b, i) => (
          <g key={i}>
            <rect className="bp-rise" style={v({ '--d': `${b.d * 0.6}s` })} x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="url(#sk-body)" />
            <rect className="bp-draw" style={v({ '--d': `${b.d * 0.6}s` })} pathLength={1} x={b.x} y={GROUND - b.h} width={b.w} height={b.h} stroke={BLUE} strokeWidth="1" />
            {Array.from({ length: Math.floor(b.floors / 2) }, (_, f) => (
              <line key={f} x1={b.x} x2={b.x + b.w} y1={GROUND - (f + 1) * FLOOR_H * 2} y2={GROUND - (f + 1) * FLOOR_H * 2} stroke={BLUE} strokeOpacity="0.5" strokeWidth="0.8" />
            ))}
          </g>
        ))}
      </g>

      {/* Camada da frente */}
      {front.map((b, i) => (
        <g key={i}>
          <rect className="bp-rise" style={v({ '--d': `${b.d}s` })} x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="url(#sk-body)" />
          <rect className="bp-draw" style={v({ '--d': `${b.d}s` })} pathLength={1} x={b.x} y={GROUND - b.h} width={b.w} height={b.h} stroke={BLUE} strokeOpacity="0.8" strokeWidth="1.4" />
          {Array.from({ length: b.floors - 1 }, (_, f) => (
            <line
              key={f}
              className="bp-fade"
              style={v({ '--d': `${1.2 + b.d + f * 0.05}s` })}
              x1={b.x}
              x2={b.x + b.w}
              y1={GROUND - (f + 1) * FLOOR_H}
              y2={GROUND - (f + 1) * FLOOR_H}
              stroke={BLUE}
              strokeOpacity="0.28"
              strokeWidth="0.8"
            />
          ))}
          {b.roof === 'antenna' && (
            <g stroke={BLUE} strokeOpacity="0.8" strokeWidth="1.2">
              <path className="bp-draw" style={v({ '--d': `${b.d + 1.6}s` })} pathLength={1} d={`M${b.x + b.w / 2} ${GROUND - b.h} v-34`} />
              <circle className="bp-glow" style={v({ '--d': `${i * 0.4}s` })} cx={b.x + b.w / 2} cy={GROUND - b.h - 36} r="3" fill={CORAL} stroke="none" />
            </g>
          )}
          {b.roof === 'tank' && (
            <g stroke={BLUE} strokeOpacity="0.8" strokeWidth="1.2" className="bp-fade" style={v({ '--d': `${b.d + 1.6}s` })}>
              <rect x={b.x + b.w / 2 - 14} y={GROUND - b.h - 16} width="28" height="16" rx="3" />
              <path d={`M${b.x + b.w / 2 - 14} ${GROUND - b.h - 16} h28`} />
            </g>
          )}
          {b.riser && (
            <g>
              <line x1={b.x + 6} x2={b.x + 6} y1={GROUND} y2={GROUND - b.h + 6} stroke={COLOR[b.riser]} strokeOpacity="0.5" strokeWidth="1.4" />
              <line className="bp-flow" x1={b.x + 6} x2={b.x + 6} y1={GROUND} y2={GROUND - b.h + 6} stroke={COLOR[b.riser]} strokeWidth="2.4" strokeLinecap="round" />
            </g>
          )}
        </g>
      ))}

      {/* Janelas: as apagadas ficam sempre; as coloridas acendem na fase do sistema */}
      <g fillOpacity="0.07">
        {dim.map((w, i) => (
          <rect key={i} className="bp-fade" style={v({ '--d': `${w.d}s` })} x={w.x} y={w.y} width="9" height="13" rx="1.5" fill="#fff" />
        ))}
      </g>
      <Windows wins={wins} kind="blue" cls="bp-phase-a" />
      <Windows wins={wins} kind="gold" cls="bp-phase-b" />
      <Windows wins={wins} kind="coral" cls="bp-phase-c" />

      {/* Etiquetas de projeto flutuando sobre alguns prédios */}
      {tags.map((t) => {
        const b = front[t.b];
        if (!b) return null;
        const x = b.x + b.w / 2;
        const y = GROUND - b.h + t.dy - (b.roof === 'none' ? 0 : 36);
        return (
          <g key={t.text} className="chip-float" style={v({ animationDelay: `${t.b * 0.3}s` })}>
            <g className="bp-fade" style={v({ '--d': '3s' })}>
              <rect x={x - 46} y={y - 14} width="92" height="22" rx="11" fill="#0d1929" stroke={t.color} strokeOpacity="0.8" strokeWidth="1.2" />
              <circle cx={x - 34} cy={y - 3} r="3" fill={t.color} />
              <text x={x - 26} y={y} {...mono} fontSize="9" fontWeight="700" letterSpacing="1" fill={t.color}>
                {t.text}
              </text>
              <line x1={x} x2={x} y1={y + 8} y2={y + 22} stroke={t.color} strokeOpacity="0.6" strokeDasharray="2 3" />
            </g>
          </g>
        );
      })}

      {/* Guindaste */}
      <g stroke={GOLD} strokeOpacity="0.85" strokeWidth="1.4">
        <path className="bp-draw" style={v({ '--d': '0.8s' })} pathLength={1} d={`M1496 ${GROUND} V120 M1508 ${GROUND} V120`} />
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} className="bp-fade" style={v({ '--d': `${1 + i * 0.08}s` })} strokeWidth="0.9" strokeOpacity="0.55" d={`M1496 ${GROUND - i * 30} L1508 ${GROUND - i * 30 - 30} M1508 ${GROUND - i * 30} L1496 ${GROUND - i * 30 - 30}`} />
        ))}
        <path className="bp-draw" style={v({ '--d': '1.6s' })} pathLength={1} d="M1350 120 H1620 M1350 120 L1502 80 L1620 120" />
        <path className="bp-fade" style={v({ '--d': '2.2s' })} d="M1620 120 v30 h18 v-30" />
        <g className="bp-trolley">
          <line x1="1390" x2="1390" y1="120" y2="230" strokeDasharray="3 3" />
          <rect x="1380" y="230" width="20" height="14" rx="2" fill="#0d1929" />
          <circle cx="1390" cy="120" r="3" fill={GOLD} stroke="none" />
        </g>
      </g>

      {/* Solo com marcações de cota */}
      <line className="bp-draw" style={v({ '--d': '0.2s' })} pathLength={1} x1="-40" x2={W + 40} y1={GROUND} y2={GROUND} stroke={BLUE} strokeOpacity="0.7" strokeWidth="1.4" />
      <g stroke="#fff" strokeOpacity="0.25" strokeWidth="1" className="bp-fade" style={v({ '--d': '2s' })}>
        {Array.from({ length: 33 }, (_, i) => (
          <line key={i} x1={i * 50} x2={i * 50} y1={GROUND + 4} y2={GROUND + (i % 4 === 0 ? 16 : 9)} />
        ))}
      </g>

      {/* Varredura que acende a cidade */}
      <rect className="bp-sweep" x="-200" y="0" width="200" height="580" fill="url(#sk-sweep)" />
    </svg>
  );
}
