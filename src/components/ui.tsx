import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';

import { breadcrumbLd } from '../seo/jsonld';
import { openChatbot } from '../utils/chatbot';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] ${
        light ? 'text-[#EDA700]' : 'text-[#315676]'
      }`}
    >
      <span className={`h-px w-6 ${light ? 'bg-[#EDA700]' : 'bg-[#315676]'}`} />
      {children}
    </p>
  );
}

type Variant = 'gold' | 'ghost' | 'dark' | 'outline';

const variantClass: Record<Variant, string> = {
  gold: 'bg-[#EDA700] text-slate-900 hover:bg-[#ffb81a] shadow-[0_10px_30px_-10px_rgba(237,167,0,0.7)]',
  ghost: 'border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20',
  dark: 'bg-[#315676] text-white hover:bg-[#254261]',
  outline: 'border border-[#315676]/30 text-[#315676] hover:border-[#315676] hover:bg-[#315676]/5',
};

const buttonBase =
  'group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition duration-200 active:scale-[0.98]';

export function ButtonLink({
  to,
  children,
  variant = 'gold',
  arrow = true,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
}) {
  const external = /^https?:/.test(to);
  const className = `${buttonBase} ${variantClass[variant]}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
    </>
  );
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {content}
    </Link>
  );
}

/** "Falar com a Duall": abre o chatbot; sem chatbot instalado, leva ao formulário de contato. */
export function ChatButton({ variant = 'ghost', children = 'Falar com a Duall' }: { variant?: Variant; children?: ReactNode }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        if (!openChatbot()) navigate('/contato#falar');
      }}
      className={`${buttonBase} ${variantClass[variant]}`}
    >
      <MessageCircle size={16} />
      {children}
    </button>
  );
}

export function Breadcrumbs({ items, light = false }: { items: Array<{ name: string; path: string }>; light?: boolean }) {
  return (
    <nav aria-label="Você está em" className={`text-xs ${light ? 'text-white/60' : 'text-slate-500'}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={light ? 'text-white' : 'text-slate-800'}>
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="hover:underline">
                  {item.name}
                </Link>
              )}
              {!last && <ChevronRight size={12} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const crumbsLd = breadcrumbLd;

/** Cabeçalho escuro das páginas internas: auroras flutuantes, palavra-fantasma e entrada em sequência. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Array<{ name: string; path: string }>;
  actions?: ReactNode;
  /** Versão baixa do cabeçalho, para páginas em que o conteúdo precisa aparecer sem rolar. */
  compact?: boolean;
}) {
  const step = (n: number) => ({ animationDelay: `${n * 0.09}s` });

  return (
    <section className={`relative isolate overflow-hidden bg-[#0d1929] text-white ${compact ? 'pb-8 pt-28 md:pb-10 md:pt-32' : 'pb-16 pt-36 md:pb-24 md:pt-44'}`}>
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="blob pointer-events-none absolute -right-24 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#315676]/45 blur-3xl" aria-hidden="true" />
      <div className="blob-slow pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#EDA700]/15 blur-3xl" aria-hidden="true" />

      {/* Palavra-fantasma */}
      <p
        className={`text-outline-light pointer-events-none absolute -bottom-6 right-4 -z-10 hidden select-none font-display text-[9rem] font-extrabold uppercase leading-none xl:text-[12rem] ${compact ? '' : 'lg:block'}`}
        aria-hidden="true"
      >
        {eyebrow.split(' ')[0]}
      </p>

      <Container className={compact ? 'space-y-3' : 'space-y-6'}>
        <div className="hero-in" style={step(0)}>
          <Breadcrumbs items={crumbs} light />
        </div>
        <div className="hero-in" style={step(1)}>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </div>
        <h1
          className={`hero-in max-w-4xl font-display font-extrabold leading-[1.05] tracking-tight ${compact ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl'}`}
          style={step(2)}
        >
          {title}
        </h1>
        {lead && (
          <p className="hero-in max-w-3xl text-lg leading-relaxed text-slate-300" style={step(3)}>
            {lead}
          </p>
        )}
        {actions && (
          <div className="hero-in flex flex-wrap gap-3 pt-2" style={step(4)}>
            {actions}
          </div>
        )}
      </Container>

      <span className="draw-x absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#EDA700] via-[#EDA700]/30 to-transparent" aria-hidden="true" />
    </section>
  );
}

/** Renderiza o componente só no navegador (3D, IFC), mantendo o resto da página em HTML estático. */
export function ClientOnly({
  load,
  fallback,
}: {
  load: () => Promise<{ default: ComponentType }>;
  fallback: ReactNode;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    load().then((mod) => active && setComponent(() => mod.default));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return Component ? <Component /> : <>{fallback}</>;
}
