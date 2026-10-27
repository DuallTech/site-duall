import HeroSkyline from '../components/HeroSkyline';
import { ButtonLink, ChatButton } from '../components/ui';

/** Bloco 1. Título e parágrafo em HTML real, centralizados; o fundo é uma cidade em traço de prancha, só decorativa. */
export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#0d1929] pb-48 pt-32 text-center text-white sm:pb-56">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-20 opacity-50" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[62%]" aria-hidden="true">
        <HeroSkyline />
      </div>

      {/* Brilhos no mesmo ciclo dos sistemas */}
      <div className="bp-phase-a pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_90%,rgba(25,146,187,0.22),transparent_55%)]" aria-hidden="true" />
      <div className="bp-phase-b pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_85%,rgba(237,167,0,0.2),transparent_55%)]" aria-hidden="true" />
      <div className="bp-phase-c pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(242,85,93,0.14),transparent_50%)]" aria-hidden="true" />
      {/* Funde a base do hero com a faixa de números logo abaixo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-[#0d1929]" aria-hidden="true" />
      {/* Escurece o miolo para o texto respirar sobre a cidade */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,#0d1929_35%,transparent_100%)] opacity-90"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center space-y-8">
          <p
            style={{ animationDelay: '0s' }}
            className="hero-in font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[#FFC21A] sm:text-base"
          >
            Duall Engenharia
          </p>

          <h1
            style={{ animationDelay: '0.08s' }}
            className="hero-in font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            Know-how em projetos de <span className="text-[#EDA700]">instalações elétricas e hidráulicas</span>
          </h1>

          <p
            style={{ animationDelay: '0.16s' }}
            className="hero-in max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl"
          >
            A Duall Engenharia desenvolve projetos de instalações elétricas e hidráulicas para empreendimentos
            residenciais, comerciais e mistos de médio e alto padrão. Cada projeto é entregue com comprometimento com o
            prazo, qualidade gráfica, segurança e soluções otimizadas.
          </p>

          <div
            style={{ animationDelay: '0.24s' }}
            className="hero-in flex flex-col gap-3 pt-2 sm:flex-row"
          >
            <ButtonLink to="/projetos">Ver projetos</ButtonLink>
            <ChatButton variant="ghost">Falar com a Duall</ChatButton>
          </div>
        </div>
      </div>
    </section>
  );
}
