import type { CSSProperties, ReactNode } from 'react';

/**
 * Ilustração decorativa: celular exibindo o PDF do Duall Dynamic, com o desenho técnico sendo traçado e
 * trocando entre disciplinas. Animação em CSS puro (sem JavaScript), então funciona no HTML pré-renderizado.
 * Substituir pela imagem final quando houver.
 */

const vars = (p: number, l = 0) => ({ '--p': p, '--l': l }) as CSSProperties;

function Page({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  return (
    <g className="dd-page" style={vars(index)} data-first={index === 0 ? '' : undefined}>
      <rect x="36" y="124" width="208" height="120" rx="10" fill="#e2e8f0" />
      <rect x="44" y="132" width="74" height="18" rx="9" fill="#fff" />
      <text x="54" y="145" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#315676">
        {label}
      </text>
      {children}
      {[262, 280, 298].map((y, k) => (
        <rect
          key={y}
          className="dd-line"
          style={vars(index, k + 1)}
          x="36"
          y={y}
          width={k === 2 ? 120 : 208}
          height="8"
          rx="4"
          fill="#cbd5e1"
        />
      ))}
      {[330, 348].map((y, k) => (
        <rect key={y} className="dd-line" style={vars(index, k + 4)} x="36" y={y} width={k === 1 ? 150 : 208} height="8" rx="4" fill="#cbd5e1" />
      ))}
    </g>
  );
}

const Node = ({ x, y, color = '#315676', p }: { x: number; y: number; color?: string; p: number }) => (
  <g>
    <circle className="dd-ping" style={vars(p)} cx={x} cy={y} r="4" fill={color} opacity="0.5" />
    <circle cx={x} cy={y} r="4" fill={color} />
  </g>
);

export default function DuallDynamicVisual() {
  return (
    <figure
      className="relative mx-auto w-64 sm:w-72"
      aria-label="Ilustração de um celular exibindo o PDF do Duall Dynamic"
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-[#315676]/30 blur-3xl" aria-hidden="true" />


      <div className="dd-float">
        <svg viewBox="0 0 280 560" role="img" aria-hidden="true" className="w-full drop-shadow-2xl">
          <rect x="6" y="6" width="268" height="548" rx="40" fill="#0b1522" stroke="#3b5a7a" strokeWidth="3" />
          <rect x="20" y="22" width="240" height="516" rx="28" fill="#f8fafc" />
          <rect x="100" y="30" width="80" height="16" rx="8" fill="#0b1522" />

          {/* Cabeçalho do PDF */}
          <rect x="36" y="64" width="208" height="44" rx="10" fill="#315676" />
          <text x="50" y="92" fontFamily="Outfit, sans-serif" fontSize="16" fontWeight="700" fill="#fff">
            Duall Dynamic
          </text>
          <rect x="204" y="76" width="28" height="20" rx="4" fill="#EDA700" />
          <text x="209" y="91" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700" fill="#1e293b">
            PDF
          </text>

          {/* Página 1: elétrica */}
          <Page index={0} label="ELÉTRICA">
            <path className="dd-draw" style={vars(0)} pathLength={1} d="M52 230 V172 H108 V198 H164 V164 H228" fill="none" stroke="#315676" strokeWidth="2.5" strokeLinejoin="round" />
            <path className="dd-draw" style={vars(0, 2)} pathLength={1} d="M52 212 H92 V188 H146 V228 H228" fill="none" stroke="#EDA700" strokeWidth="2.5" strokeLinejoin="round" />
            <Node x={108} y={198} p={0} />
            <Node x={164} y={164} p={0} />
            <Node x={228} y={228} color="#EDA700" p={0} />
          </Page>

          {/* Página 2: hidráulica */}
          <Page index={1} label="HIDRÁULICA">
            <path className="dd-draw" style={vars(1)} pathLength={1} d="M52 172 H116 Q140 172 140 196 V228 H228" fill="none" stroke="#1992BB" strokeWidth="2.5" strokeLinejoin="round" />
            <path className="dd-draw" style={vars(1, 2)} pathLength={1} d="M52 204 H92 V230 H116" fill="none" stroke="#315676" strokeWidth="2.5" strokeLinejoin="round" />
            <path className="dd-draw" style={vars(1, 3)} pathLength={1} d="M140 196 H228 V172" fill="none" stroke="#1992BB" strokeWidth="2.5" strokeLinejoin="round" />
            <Node x={140} y={196} color="#1992BB" p={1} />
            <Node x={228} y={172} color="#1992BB" p={1} />
            <Node x={92} y={204} p={1} />
          </Page>

          {/* Página 3: infraestrutura para sistemas */}
          <Page index={2} label="SISTEMAS">
            <path className="dd-draw" style={vars(2)} pathLength={1} d="M70 172 L140 202 L212 168" fill="none" stroke="#315676" strokeWidth="2.5" strokeLinejoin="round" />
            <path className="dd-draw" style={vars(2, 2)} pathLength={1} d="M140 202 L212 232" fill="none" stroke="#EDA700" strokeWidth="2.5" />
            <path className="dd-draw" style={vars(2, 3)} pathLength={1} d="M140 202 L70 232" fill="none" stroke="#315676" strokeWidth="2.5" />
            <Node x={140} y={202} color="#EDA700" p={2} />
            <Node x={70} y={172} p={2} />
            <Node x={212} y={168} p={2} />
            <Node x={212} y={232} p={2} />
            <Node x={70} y={232} p={2} />
          </Page>

          {/* Linha de varredura sobre o desenho */}
          <rect className="dd-scan" x="36" y="126" width="208" height="3" rx="1.5" fill="#EDA700" opacity="0.7" />

          {/* Botões e indicador de páginas */}
          <rect className="dd-tap" x="36" y="384" width="100" height="40" rx="10" fill="#EDA700" />
          <rect x="144" y="384" width="100" height="40" rx="10" fill="#e2e8f0" />
          <rect x="52" y="400" width="68" height="8" rx="4" fill="#fff" opacity="0.7" />
          <rect x="160" y="400" width="68" height="8" rx="4" fill="#cbd5e1" />

          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={118 + i * 22} cy="462" r="4.5" fill="#cbd5e1" />
              <circle className="dd-dot" data-first={i === 0 ? '' : undefined} style={vars(i)} cx={118 + i * 22} cy="462" r="4.5" fill="#315676" />
            </g>
          ))}
        </svg>
      </div>
      {/* Selos flutuantes: palavras dos benefícios do Duall Dynamic */}
      <span className="dd-chip absolute z-20 -left-20 top-16 hidden rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-[#315676] shadow-lg sm:block" style={vars(0)} aria-hidden="true">
        Clareza
      </span>
      <span className="dd-chip absolute z-20 -right-20 top-1/2 hidden rounded-full bg-[#EDA700] px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-lg sm:block" style={vars(1)} aria-hidden="true">
        Agilidade
      </span>
      <span className="dd-chip absolute z-20 -left-24 bottom-24 hidden rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-[#315676] shadow-lg sm:block" style={vars(2)} aria-hidden="true">
        Usabilidade
      </span>
    </figure>
  );
}
