import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Linkedin } from 'lucide-react';

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

/** Ingresso do Workshop: recortes laterais, "3º" vazado e brilho que varre o card. */
export function TicketCard() {
  return (
    <article className="ticket group relative isolate overflow-hidden rounded-3xl bg-[#0d1929] p-8 text-white shadow-[0_30px_60px_-25px_rgba(13,25,41,0.7)] transition duration-500 hover:-rotate-1 hover:-translate-y-2 md:p-10">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <span className="ticket-shine pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <span className="absolute inset-x-0 top-0 h-1.5 bg-[#EDA700]" aria-hidden="true" />

      {/* Recortes do ingresso */}
      <span className="absolute -left-4 top-[58%] h-8 w-8 rounded-full bg-[#eaf0f6]" aria-hidden="true" />
      <span className="absolute -right-4 top-[58%] h-8 w-8 rounded-full bg-[#eaf0f6]" aria-hidden="true" />

      <div className="flex items-start justify-between">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#EDA700]">Evento</p>
        <CalendarDays className="text-[#EDA700]" aria-hidden="true" />
      </div>

      <p className="text-outline mt-4 select-none font-display text-[7rem] font-extrabold leading-[0.85] md:text-[8.5rem]" aria-hidden="true">
        3º
      </p>

      <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight md:text-3xl">Workshop Técnico Duall</h3>
      <p className="mt-3 leading-relaxed text-slate-300">
        Treinamento técnico para construtoras, incorporadoras e arquitetos.
      </p>

      <div className="my-7 border-t-2 border-dashed border-white/20" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EDA700] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#EDA700]" />
          </span>
          Data e local em breve
        </p>
        <ButtonLink to="/conteudo/workshop-tecnico">Inscrever-se no Workshop</ButtonLink>
      </div>
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

/** Bloco 6. Conteúdo técnico, evento e perguntas frequentes (o FAQ também vai em JSON-LD). */
export default function ContentFaqSection() {
  const latest = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section aria-labelledby="conteudo" className="bg-blueprint relative overflow-hidden py-24">
      <Container className="space-y-20">
        <div className="space-y-12">
          <div className="reveal space-y-6">
            <DimensionLine label="Conteúdo técnico" />
            <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
              <h2
                id="conteudo"
                className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-[#2D3845] md:text-6xl lg:col-span-7"
              >
                Conteúdo técnico e{' '}
                <span className="relative inline-block whitespace-nowrap text-[#315676]">
                  eventos
                  <span className="draw-x absolute -bottom-1 left-0 h-1.5 w-full bg-[#EDA700]" aria-hidden="true" />
                </span>{' '}
                da Duall
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 lg:col-span-5">
                A Duall Engenharia publica artigos sobre projetos de instalações e realiza o Workshop Técnico Duall,
                treinamento voltado a construtoras, incorporadoras e arquitetos.
              </p>
            </div>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="reveal flex flex-col lg:col-span-7">
              <p className="mb-4 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#315676]">
                <span className="flex h-6 w-6 items-center justify-center rounded border border-[#315676]/40">1</span>
                Artigos
              </p>
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

            <div className="reveal lg:col-span-5">
              <p className="mb-4 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#315676]">
                <span className="flex h-6 w-6 items-center justify-center rounded border border-[#315676]/40">2</span>
                Workshop
              </p>
              <TicketCard />
            </div>
          </div>
        </div>

        <div className="reveal space-y-6">
          <DimensionLine label="Perguntas frequentes" />
          <h3 className="font-display text-2xl font-bold text-[#2D3845] md:text-3xl">
            Perguntas frequentes sobre a Duall Engenharia
          </h3>
          <FaqList />
        </div>
      </Container>
    </section>
  );
}
