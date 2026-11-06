import { useState } from 'react';
import { Clock, Compass, FileText, Gem, Play, PlayCircle, Target, Zap, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, type Variants } from 'motion/react';

const VIDEO_ID = 'vMMo-JEr5rE';
const VIDEO_EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`;
const VIDEO_THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

type TabId = 'descricao' | 'missao' | 'video';

const TABS: Array<{ id: TabId; label: string; hint: string; icon: LucideIcon }> = [
  { id: 'descricao', label: 'A Duall', hint: 'Quem somos', icon: FileText },
  { id: 'missao', label: 'Missão, Visão e Valores', hint: 'O que nos guia', icon: Compass },
  { id: 'video', label: 'Vídeo Institucional', hint: 'Assista', icon: PlayCircle },
];

const PRINCIPIOS = ['Ética', 'Comprometimento', 'Satisfação', 'Inovação', 'Humanização', 'Conhecimento técnico'];

const HIGHLIGHTS = ['Precisão', 'Organização', 'Visão integrada'];

const VIDEO_LEAD_TEXT =
  'Comprometimento é o nosso ponto de partida. Assumimos o dever de cumprir com precisão cada acordo e planejamento.';

const VIDEO_POINTS: Array<{ title: string; text: string; Icon: LucideIcon }> = [
  {
    title: 'Foco em soluções',
    text: 'Uma equipe de engenheiros dedicada a unir pontualidade, qualidade e excelência no atendimento.',
    Icon: Target,
  },
  {
    title: 'Agilidade e normas',
    text: 'Alinhados aos padrões técnicos, com opções flexíveis e resposta rápida em qualquer etapa do projeto.',
    Icon: Zap,
  },
  {
    title: 'Entregas no prazo',
    text: 'Prazos garantidos com ética, responsabilidade e alto conhecimento técnico.',
    Icon: Clock,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** O painel entra pelo lado da aba escolhida (direita se avançou, esquerda se voltou). */
const panelVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60, filter: 'blur(6px)' }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease, staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60, filter: 'blur(6px)', transition: { duration: 0.25 } }),
};

/** Lista dentro de um painel: só escalona a entrada dos itens. */
const listVariants: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const popVariants: Variants = {
  enter: { opacity: 0, scale: 0.6 },
  center: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 380, damping: 22 } },
};

function DescricaoPanel() {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
      <motion.div
        variants={itemVariants}
        className="relative isolate overflow-hidden border-b border-slate-200 p-8 text-[#2D3845] md:p-10 lg:border-b-0 lg:border-r lg:p-12"
      >
        <span
          className="pointer-events-none absolute -bottom-10 -right-4 -z-10 select-none font-display text-[10rem] font-extrabold leading-none text-[#315676]/[0.05]"
          aria-hidden="true"
        >
          01
        </span>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#D99500]">Sobre a Duall</p>
        <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
          Referência em projetos de instalações e gestão de engenharia<span className="text-[#EDA700]">.</span>
        </h3>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-8 block h-px w-24 origin-left bg-[#EDA700]"
          aria-hidden="true"
        />
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          Todo projeto nasce de uma expectativa. Para transformá-la em realidade, é preciso mais do que conhecimento
          técnico: é preciso responsabilidade com cada decisão.
        </p>
      </motion.div>

      <div className="flex flex-col justify-center gap-5 p-8 text-slate-600 md:p-10 lg:p-12">
        <motion.ul variants={listVariants} className="flex flex-wrap gap-2">
          {HIGHLIGHTS.map((item) => (
            <motion.li
              key={item}
              variants={popVariants}
              className="rounded-full border border-[#315676]/20 bg-[#315676]/5 px-3.5 py-1.5 text-xs font-semibold text-[#315676]"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.p variants={itemVariants} className="leading-relaxed md:text-lg">
          Projetamos instalações com precisão, organização e visão integrada, antecipando desafios e coordenando
          informações para obras mais seguras, eficientes e bem executadas.
        </motion.p>
        <motion.p variants={itemVariants} className="leading-relaxed">
          Respeitamos prazos, seguimos normas e buscamos novas tecnologias para transformar conhecimento técnico em
          soluções cada vez mais claras, ágeis e confiáveis.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="border-l-2 border-[#EDA700] pl-4 font-display text-lg font-bold text-[#2D3845]"
        >
          Mais do que desenvolver projetos, entregamos tranquilidade em cada detalhe.
        </motion.p>
      </div>
    </div>
  );
}

function MissaoPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <motion.article
        variants={itemVariants}
        whileHover={{ y: -6 }}
        className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDA700] text-slate-900">
          <Target size={22} aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#315676]">Missão</p>
        <p className="mt-3 leading-relaxed text-slate-600">
          Garantir tranquilidade aos nossos clientes, por meio de uma engenharia precisa, prazos respeitados, coordenação
          técnica presente e prezar pelo desenvolvimento da equipe em um ambiente saudável.
        </p>
      </motion.article>

      <motion.article
        variants={itemVariants}
        whileHover={{ y: -6 }}
        className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#315676]/10 text-[#315676]">
          <Compass size={22} aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#315676]">Visão</p>
        <p className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-[#2D3845]">
          Consolidar a marca como referência em projetos de instalações<span className="text-[#EDA700]">.</span>
        </p>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="mt-auto block h-[3px] w-full origin-center rounded-full bg-linear-to-r from-transparent via-[#EDA700] to-transparent"
          aria-hidden="true"
        />
      </motion.article>

      <motion.article
        variants={itemVariants}
        whileHover={{ y: -6 }}
        className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#315676]/10 text-[#315676]">
          <Gem size={22} aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#315676]">Valores</p>
        <motion.ul variants={listVariants} className="mt-4 flex flex-wrap justify-center gap-2">
          {PRINCIPIOS.map((principio) => (
            <motion.li
              key={principio}
              variants={popVariants}
              whileHover={{ scale: 1.06 }}
              className="cursor-default rounded-full border border-[#315676]/20 px-3.5 py-1.5 text-sm font-semibold text-[#315676] transition-colors hover:border-[#EDA700] hover:bg-[#EDA700] hover:text-slate-900"
            >
              {principio}
            </motion.li>
          ))}
        </motion.ul>
      </motion.article>
    </div>
  );
}

function VideoPanel() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-[#2D3845] shadow-xl md:p-8 lg:p-10">

      <motion.div variants={itemVariants} className="max-w-3xl">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#D99500]">Vídeo institucional</p>
        <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
          {VIDEO_LEAD_TEXT}
        </h3>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <motion.div
          variants={itemVariants}
          className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-lg"
        >
          {playing ? (
            <iframe
              src={VIDEO_EMBED_URL}
              title="Vídeo Institucional Duall Engenharia"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 cursor-pointer"
              aria-label="Assistir ao vídeo institucional"
            >
              <img
                src={VIDEO_THUMB}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <span className="absolute h-20 w-20 animate-ping rounded-full bg-[#EDA700]/40 motion-reduce:animate-none" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#EDA700] text-slate-900 shadow-2xl transition duration-300 group-hover:scale-110">
                  <Play size={30} className="ml-1" fill="currentColor" aria-hidden="true" />
                </span>
              </span>
              <span className="absolute bottom-4 left-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/80">
                Assistir
              </span>
            </button>
          )}
        </motion.div>

        <motion.ol variants={listVariants} className="space-y-3">
          {VIDEO_POINTS.map(({ title, text, Icon }, i) => (
            <motion.li
              key={title}
              variants={itemVariants}
              className="group flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-colors duration-300 hover:border-[#EDA700]/60 hover:bg-white"
            >
              <span className="font-mono text-[11px] font-bold text-slate-400">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="flex items-center gap-2 font-display font-bold">
                  <Icon size={16} className="text-[#D99500]" aria-hidden="true" />
                  {title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

/** Abas da página /a-duall: A Duall, Missão/Visão/Valores e Vídeo, com transição lateral entre elas. */
export default function VideoCarousel() {
  const [activeTab, setActiveTab] = useState<TabId>('descricao');
  const [direction, setDirection] = useState(1);
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  const select = (id: TabId) => {
    const next = TABS.findIndex((t) => t.id === id);
    if (next === activeIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveTab(id);
  };

  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Sobre a Duall" className="grid gap-3 sm:grid-cols-3">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(tab.id)}
              className={`group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${
                isActive
                  ? 'border-[#EDA700]/50 bg-white text-[#2D3845] shadow-[0_12px_30px_-18px_rgba(237,167,0,0.6)]'
                  : 'border-slate-200 bg-white/80 text-[#2D3845] hover:border-[#315676]/40 hover:bg-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="about-tab-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  className="absolute inset-0 -z-0 bg-[#EDA700]/[0.06]"
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#EDA700] text-slate-900' : 'bg-[#315676]/10 text-[#315676] group-hover:bg-[#315676]/15'
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="relative min-w-0">
                <span
                  className={`block font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${
                    isActive ? 'text-[#D99500]' : 'text-slate-400'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} · {tab.hint}
                </span>
                <span className="mt-0.5 block font-display text-sm font-bold leading-tight md:text-base">{tab.label}</span>
              </span>
              {isActive && (
                <motion.span
                  layoutId="about-tab-line"
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-[#EDA700]"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={activeTab}
            role="tabpanel"
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {activeTab === 'descricao' ? <DescricaoPanel /> : activeTab === 'missao' ? <MissaoPanel /> : <VideoPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
