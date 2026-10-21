import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, MapPin, Target, Users, type LucideIcon } from 'lucide-react';

import duallTeamImage from '../assets/images/diretores_duall.jpeg';
import { ButtonLink, Container, Eyebrow } from '../components/ui';
import { SITE } from '../content/site';

const PRINCIPLES = ['Ética', 'Comprometimento', 'Satisfação', 'Inovação', 'Humanização', 'Conhecimento técnico'];

const SHORTCUTS: Array<{ title: string; text: string; to: string; Icon: LucideIcon }> = [
  { title: 'Quem somos', text: 'Manifesto e posicionamento', to: '/a-duall', Icon: Target },
  { title: 'Liderança e equipe', text: 'Os diretores da Duall', to: '/a-duall', Icon: Users },
  { title: 'Unidades', text: 'Americana e Santos', to: '/a-duall#unidades', Icon: MapPin },
  { title: 'Trabalhe conosco', text: 'Portal de talentos', to: SITE.careersUrl, Icon: Briefcase },
];

/** Link interno (rota) ou externo (portal de talentos, abre em nova aba). */
function ShortcutLink({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  if (/^https?:/.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

/** Resumo da página /a-duall na Home: quem somos, liderança, unidades e o portal de talentos, cada um com link. */
export default function AboutSummarySection() {
  return (
    <section aria-labelledby="a-duall" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#315676]/10 blur-3xl" aria-hidden="true" />

      <Container className="space-y-16">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="reveal relative lg:col-span-6">
            <div className="corner-marks relative m-2">
              <i />
              <i />
              <i />
              <i />
              <img
                src={duallTeamImage}
                alt="Denis Salles, Cristiano Salles e Eric Salles, diretores da Duall Engenharia."
                loading="lazy"
                decoding="async"
                className="aspect-[5/4] w-full rounded-xl object-cover shadow-2xl"
              />
            </div>
            <p className="absolute -bottom-6 right-4 max-w-[16rem] rounded-2xl bg-[#0d1929] px-5 py-4 text-sm leading-snug text-white shadow-2xl md:right-[-1.5rem]">
              <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#EDA700]">Diretores</span>
              Denis Salles, Cristiano Salles e Eric Salles
            </p>
          </div>

          <div className="reveal space-y-6 lg:col-span-6">
            <Eyebrow>A Duall</Eyebrow>
            <h2 id="a-duall" className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-5xl">
              Comprometimento é o nosso ponto de partida
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              A Duall Engenharia é uma equipe de engenheiros dedicada a unir pontualidade, qualidade e excelência no
              atendimento. Entendemos que, quando um projeto nasce, expectativas são criadas.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#315676]">Missão</p>
                <p className="text-sm leading-relaxed text-slate-600">
                  Garantir tranquilidade aos nossos clientes, por meio de uma engenharia precisa, prazos respeitados e
                  coordenação técnica presente.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#315676]">Visão</p>
                <p className="text-sm leading-relaxed text-slate-600">
                  Consolidar a marca como referência em projetos de instalações.
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap gap-2" aria-label="Princípios">
              {PRINCIPLES.map((p) => (
                <li key={p} className="rounded-full border border-[#315676]/25 px-3.5 py-1.5 text-xs font-semibold text-[#315676]">
                  {p}
                </li>
              ))}
            </ul>

            <ButtonLink to="/a-duall" variant="dark">
              Conhecer a Duall
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHORTCUTS.map(({ title, text, to, Icon }) => (
            <li key={title} className="reveal">
              <ShortcutLink
                to={to}
                className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#315676]/40 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#315676]/10 text-[#315676] transition duration-300 group-hover:bg-[#315676] group-hover:text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-[#2D3845]">{title}</span>
                  <span className="block text-sm text-slate-500">{title === 'Unidades' ? SITE.units.map((u) => u.city).join(' e ') : text}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[#315676] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#EDA700]"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#EDA700] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              </ShortcutLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
