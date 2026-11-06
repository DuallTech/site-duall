import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronDown, Linkedin } from 'lucide-react';

import { ButtonLink, Container } from '../components/ui';
import { ARTICLES, type Article } from '../content/articles';
import { FAQ } from '../content/faq';
import { SITE } from '../content/site';

export function FaqList() {
  return (
    <div className="divide-y divide-[#315676]/15 overflow-hidden rounded-2xl border border-[#315676]/20 bg-white/80 backdrop-blur">
      {FAQ.map((item, i) => (
        <details key={item.question} className="group border-l-4 border-transparent transition-colors open:border-[#EDA700] open:bg-white">
          <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 font-display text-lg font-bold text-[#2D3845] transition hover:bg-[#315676]/5 [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-xs font-bold tracking-widest text-[#315676]/50 transition group-open:text-[#EDA700]" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1">{item.question}</span>
            <ChevronDown size={20} className="shrink-0 text-[#315676] transition duration-300 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="px-6 pb-6 pl-[4.25rem] leading-relaxed text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Artigo em linha editorial: data, título e seta que desliza. */
export function ArticleRow({ article }: { article: Article }) {
  return (
    <article className="group relative flex items-start gap-5 border-b border-[#315676]/15 py-6 transition-all duration-300 hover:translate-x-2 hover:border-[#EDA700]">
      <time dateTime={article.date} className="w-24 shrink-0 pt-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#315676]/60">
        {dateFormat.format(new Date(article.date))}
      </time>
      <div className="flex-1 space-y-1.5">
        <h3 className="font-display text-xl font-bold leading-tight text-[#2D3845] md:text-2xl">
          <Link to={`/conteudo/artigos/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{article.summary}</p>
      </div>
      <ArrowUpRight className="mt-1 shrink-0 text-[#315676] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#EDA700]" aria-hidden="true" />
    </article>
  );
}

/** Mantido para a listagem em /conteudo/artigos. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
      <time dateTime={article.date} className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {dateFormat.format(new Date(article.date))}
      </time>
      <h3 className="font-display text-xl font-bold leading-tight text-[#2D3845]">
        <Link to={`/conteudo/artigos/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {article.title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">{article.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold text-[#315676]">
        Ler artigo <ArrowUpRight size={16} />
      </span>
    </article>
  );
}

/** Estado sem artigos: folha em branco sendo escrita. */
function BlankSheet() {
  return (
    <div className="relative flex h-full flex-col justify-between gap-8 rounded-3xl border-2 border-dashed border-[#315676]/30 bg-white/70 p-8 backdrop-blur md:p-10">
      <div className="space-y-4" aria-hidden="true">
        {[100, 86, 94, 62].map((w, i) => (
          <span
            key={i}
            className="ct-write block h-2.5 origin-left rounded-full bg-[#315676]/20"
            style={{ width: `${w}%`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
        <span className="ct-cursor inline-block h-5 w-0.5 bg-[#EDA700]" />
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-2xl font-extrabold text-[#2D3845]">Os primeiros artigos estão a caminho</h3>
        <p className="leading-relaxed text-slate-600">
          Conteúdo técnico sobre projetos de instalações, escrito pela equipe da Duall. Enquanto isso, acompanhe no LinkedIn.
        </p>
        <a
          href={SITE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-bold text-[#315676]"
        >
          <Linkedin size={18} aria-hidden="true" />
          <span className="border-b-2 border-[#EDA700]/0 transition group-hover:border-[#EDA700]">Seguir a Duall no LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

/** Linha de cota (desenho técnico) que se desenha ao rolar. */
function DimensionLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-[#315676]" aria-hidden="true">
      <span className="h-3 w-px bg-current" />
      <span className="draw-x h-px flex-1 bg-current opacity-40" />
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em]">{label}</span>
      <span className="draw-x h-px w-10 bg-current opacity-40" />
      <span className="h-3 w-px bg-current" />
    </div>
  );
}

/** Bloco 6. Conteúdo técnico. As perguntas frequentes ficam na página /faq. */
export default function ContentFaqSection() {
  const latest = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section aria-labelledby="conteudo" className="bg-blueprint relative overflow-hidden py-24">
      <Container>
        <div className="space-y-12">
          <div className="reveal space-y-6">
            <DimensionLine label="Conteúdo técnico" />
            <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
              <h2
                id="conteudo"
                className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-[#2D3845] md:text-6xl lg:col-span-7"
              >
                Conteúdo{' '}
                <span className="relative inline-block whitespace-nowrap text-[#315676]">
                  técnico
                  <span className="draw-x absolute -bottom-1 left-0 h-1.5 w-full bg-[#EDA700]" aria-hidden="true" />
                </span>{' '}
                da Duall
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 lg:col-span-5">
                Artigos da Duall Engenharia sobre projetos de instalações elétricas, hidráulicas e BIM.
              </p>
            </div>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="reveal flex flex-col lg:col-span-12">
              <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#315676]">Artigos</p>
              {latest.length ? (
                <div className="border-t border-[#315676]/15">
                  {latest.map((article) => (
                    <ArticleRow key={article.slug} article={article} />
                  ))}
                </div>
              ) : (
                <BlankSheet />
              )}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  to="/conteudo"
                  className="group inline-flex items-center gap-2 font-display text-lg font-bold text-[#2D3845]"
                >
                  <span className="border-b-2 border-[#EDA700]">Abrir a página de Conteúdo</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
                </Link>
                <Link
                  to="/conteudo/artigos"
                  className="group inline-flex items-center gap-2 font-display text-lg font-bold text-[#2D3845]"
                >
                  <span className="border-b-2 border-[#EDA700]">Ver todos os artigos</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
