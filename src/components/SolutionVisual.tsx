import type { CSSProperties, ReactNode } from 'react';

/**
 * Esquema animado de cada solução, desenhado em traço de prancha: decorativo, SVG puro com animação em CSS
 * (as mesmas classes bp-* do hero). Funciona no HTML pré-renderizado.
 */

const BLUE = '#1992BB';
const GOLD = '#D99500';
const CORAL = '#F2555D';
const TEAL = '#35C2B0';
const BG = '#ffffff';
const INK = '#2D3845';

const v = (vars: Record<string, string | number>) => vars as unknown as CSSProperties;
const mono = { fontFamily: 'JetBrains Mono, monospace' } as const;

const Label = ({ x, y, children, color = INK, anchor = 'start' }: { x: number; y: number; children: ReactNode; color?: string; anchor?: 'start' | 'middle' | 'end' }) => (
  <text x={x} y={y} textAnchor={anchor} {...mono} fontSize="9" letterSpacing="1.6" fill={color} fillOpacity="0.8">
    {children}
  </text>
);

const Flow = ({ d, color, delay = 0 }: { d: string; color: string; delay?: number }) => (
  <g>
    <path d={d} stroke={color} strokeOpacity="0.45" strokeWidth="1.6" />
    <path className="bp-flow" style={v({ animationDelay: `${delay}s` })} d={d} stroke={color} strokeWidth="2.6" strokeLinecap="round" />
  </g>
);

const Node = ({ x, y, color, delay = 0, r = 6 }: { x: number; y: number; color: string; delay?: number; r?: number }) => (
  <g>
    <circle className="bp-glow" style={v({ '--d': `${delay}s` })} cx={x} cy={y} r={r * 2} fill={color} fillOpacity="0.25" />
    <circle cx={x} cy={y} r={r} fill={BG} stroke={color} strokeWidth="1.8" />
  </g>
);

function Eletrica() {
  const loads = [50, 100, 150, 200];
  return (
    <>
      <Label x={20} y={22} color={GOLD}>ENTRADA DE ENERGIA</Label>
      <path d="M40 40 V70 M28 48 H52 M32 56 H48" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
      <Flow d="M40 70 V130 H130" color={GOLD} />
      <rect x="130" y="100" width="56" height="60" rx="3" fill={BG} stroke={GOLD} strokeWidth="1.8" />
      <Label x={158} y={94} color={GOLD} anchor="middle">QDF</Label>
      {[112, 126, 140].map((y) => (
        <line key={y} x1="140" x2="176" y1={y} y2={y} stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.4" />
      ))}
      {loads.map((y, i) => (
        <g key={y}>
          <Flow d={`M186 130 H230 V${y} H330`} color={GOLD} delay={i * 0.35} />
          <Node x={340} y={y} color={GOLD} delay={i * 0.5} r={5} />
        </g>
      ))}
      <Label x={380} y={54} color={GOLD} anchor="end">ILUM.</Label>
      <Label x={380} y={104} color={GOLD} anchor="end">TUG</Label>
      <Label x={380} y={154} color={GOLD} anchor="end">AR</Label>
      <Label x={380} y={204} color={GOLD} anchor="end">SPDA</Label>
      <path d="M40 130 V220 H20" stroke={INK} strokeOpacity="0.35" strokeDasharray="3 4" />
      <Label x={20} y={236} color={INK}>ATERRAMENTO</Label>
    </>
  );
}

function Hidraulica() {
  const fixtures = [80, 200, 320];
  return (
    <>
      <rect x="150" y="18" width="100" height="42" rx="4" fill={BG} stroke={BLUE} strokeWidth="1.8" />
      <path className="bp-glow" style={v({ '--d': '0s' })} d="M160 44 Q175 36 190 44 T220 44 T240 44" stroke={BLUE} strokeWidth="1.8" />
      <Label x={200} y={14} color={BLUE} anchor="middle">RESERVATÓRIO</Label>
      <Flow d="M200 60 V110" color={BLUE} />
      <Flow d="M200 110 H80 V150" color={BLUE} delay={0.2} />
      <Flow d="M200 110 V150" color={BLUE} delay={0.4} />
      <Flow d="M200 110 H320 V150" color={BLUE} delay={0.6} />
      {fixtures.map((x, i) => (
        <g key={x}>
          <Node x={x} y={150} color={BLUE} delay={i * 0.6} />
          <circle className="bp-drop" style={v({ animationDelay: `${i * 0.5}s` })} cx={x} cy={172} r="3" fill={BLUE} />
          <circle className="bp-drop" style={v({ animationDelay: `${i * 0.5 + 0.9}s` })} cx={x} cy={172} r="3" fill={BLUE} />
        </g>
      ))}
      <Label x={80} y={150 + 40} color={BLUE} anchor="middle">LAV.</Label>
      <Label x={200} y={190} color={BLUE} anchor="middle">CHUV.</Label>
      <Label x={320} y={190} color={BLUE} anchor="middle">PIA</Label>
      <Flow d="M20 232 H380" color={TEAL} />
      <Label x={20} y={224} color={TEAL}>ESGOTO E DRENAGEM</Label>
      <path d="M200 60 H280 V110" stroke={CORAL} strokeDasharray="4 4" strokeOpacity="0.8" />
      <Label x={284} y={86} color={CORAL}>INCÊNDIO</Label>
    </>
  );
}

function Sistemas() {
  const pts: Array<[number, number, string]> = [
    [70, 60, 'DADOS'],
    [330, 60, 'VOZ'],
    [60, 190, 'CATV'],
    [340, 190, 'ALARME'],
    [200, 208, 'MEDIÇÃO'],
  ];
  return (
    <>
      {pts.map(([x, y, label], i) => (
        <g key={label}>
          <Flow d={`M200 125 L${x} ${y}`} color={i % 2 ? GOLD : TEAL} delay={i * 0.3} />
          <Node x={x} y={y} color={i % 2 ? GOLD : TEAL} delay={i * 0.5} />
          <Label x={x} y={y + (y > 150 ? 28 : -16)} color={INK} anchor="middle">{label}</Label>
        </g>
      ))}
      <rect x="170" y="100" width="60" height="50" rx="3" fill={BG} stroke={BLUE} strokeWidth="1.8" />
      {[110, 122, 134].map((y) => (
        <g key={y}>
          <line x1="178" x2="222" y1={y} y2={y} stroke={BLUE} strokeOpacity="0.55" />
          <circle className="bp-glow" style={v({ '--d': `${(y - 110) / 20}s` })} cx="214" cy={y} r="2.2" fill={TEAL} />
        </g>
      ))}
      <Label x={200} y={92} color={BLUE} anchor="middle">RACK</Label>
    </>
  );
}

function Bim() {
  return (
    <>
      <g className="bp-spin" style={v({ transformOrigin: '200px 130px' })}>
        <path d="M200 52 L280 92 V172 L200 212 L120 172 V92 Z" stroke={BLUE} strokeWidth="1.8" />
        <path d="M200 52 V132 M120 92 L200 132 L280 92" stroke={BLUE} strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M200 132 V212" stroke={BLUE} strokeOpacity="0.55" strokeWidth="1.2" />
      </g>
      <path className="bp-flow" d="M140 108 L200 138 L260 108" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
      <path className="bp-flow" d="M140 156 L200 186 L260 156" stroke={TEAL} strokeWidth="2.2" strokeLinecap="round" style={v({ animationDelay: '0.5s' })} />
      <Node x={200} y={138} color={CORAL} r={5} />
      <circle className="bp-ping" cx="200" cy="138" r="8" stroke={CORAL} strokeWidth="1.6" />
      <Label x={20} y={40} color={GOLD}>ELÉTRICA</Label>
      <Label x={20} y={58} color={TEAL}>HIDRÁULICA</Label>
      <Label x={20} y={76} color={BLUE}>ARQUITETURA</Label>
      <Label x={380} y={236} color={CORAL} anchor="end">INCOMPATIBILIDADE</Label>
      <Label x={380} y={40} color={INK} anchor="end">IFC · LOD 400</Label>
    </>
  );
}

function Atp() {
  return (
    <>
      <rect x="110" y="24" width="180" height="212" rx="4" fill={BG} stroke={BLUE} strokeWidth="1.8" />
      {[
        [60, true],
        [96, true],
        [132, false],
        [168, true],
        [204, true],
      ].map(([y, ok], i) => (
        <g key={String(y)}>
          <line x1="150" x2="270" y1={Number(y)} y2={Number(y)} stroke={INK} strokeOpacity="0.22" strokeWidth="6" strokeLinecap="round" />
          <g className="bp-fade" style={v({ '--d': `${0.6 + i * 0.5}s` })}>
            <circle cx="132" cy={Number(y)} r="8" fill={BG} stroke={ok ? TEAL : CORAL} strokeWidth="1.6" />
            <path d={ok ? `M128 ${Number(y)} l3 3 l6 -6` : `M129 ${Number(y) - 4} l6 8 M135 ${Number(y) - 4} l-6 8`} stroke={ok ? TEAL : CORAL} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </g>
      ))}
      <g className="bp-magnify">
        <circle cx="262" cy="60" r="20" fill={BLUE} fillOpacity="0.12" stroke={GOLD} strokeWidth="2.2" />
        <path d="M277 75 L296 94" stroke={GOLD} strokeWidth="3.4" strokeLinecap="round" />
      </g>
      <Label x={98} y={64} color={TEAL} anchor="end">CONFORME</Label>
      <Label x={98} y={136} color={CORAL} anchor="end">REVISAR</Label>
      <Label x={98} y={208} color={TEAL} anchor="end">CONFORME</Label>
    </>
  );
}

const VISUALS: Record<string, () => ReactNode> = {
  eletrica: Eletrica,
  hidraulica: Hidraulica,
  sistemas: Sistemas,
  bim: Bim,
  'consultoria-atp': Atp,
};

export default function SolutionVisual({ slug, caption }: { slug: string; caption: string }) {
  const Visual = VISUALS[slug];
  if (!Visual) return null;
  return (
    <figure className="relative w-full">
      <svg viewBox="0 0 400 262" className="relative h-auto w-full" role="presentation" aria-hidden="true" fill="none">
        <Visual />
      </svg>
      <figcaption className="relative mt-2 border-t border-[#315676]/10 pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#315676]/60">
        {caption}
      </figcaption>
    </figure>
  );
}
