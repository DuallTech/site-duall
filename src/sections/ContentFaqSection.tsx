import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronDown, Linkedin } from 'lucide-react';

import { ButtonLink, Container } from '../components/ui';
import { type Article } from '../content/articles';
import { useArticles } from '../content/useArticles';
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
          <p className="px-6 pb-6 pl-17 leading-relaxed text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#EDA700] hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden bg-[#0d1929]">
        {article.coverUrl ? (
          <img
            src={article.coverUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="bg-grid flex h-full w-full items-center justify-center opacity-90" aria-hidden="true">
            <span className="font-display text-4xl font-extrabold text-white/90">
              Duall<span className="text-[#EDA700]">.</span>
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <time dateTime={article.date} className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {dateFormat.format(new Date(article.date))}
        </time>
        <h3 className="font-display text-xl font-bold leading-tight text-[#2D3845]">
          <Link to={`/conteudo/artigos/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </h3>
        {article.summary && <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{article.summary}</p>}
        <span className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-[#EDA700] px-5 py-2 text-sm font-bold text-slate-900 transition duration-300 group-hover:brightness-95">
          Ler mais{' '}
          <ArrowUpRight size={16} className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

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

export default function ContentFaqSection() {
  const { articles } = useArticles();
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

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
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {latest.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              ) : (
                <BlankSheet />
              )}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
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
