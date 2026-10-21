import heroFallback from '../assets/images/duall_hero_building_1782134245778.jpg';
import { ButtonLink, ChatButton, ClientOnly, Container } from '../components/ui';

const FALLBACK_ALT =
  'Volumes tridimensionais de edifícios residenciais, comerciais e mistos projetados pela Duall Engenharia.';

/** Bloco 1. Título e parágrafo em HTML real, fora do canvas; a cena 3D carrega depois do texto. */
export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-[#0d1929] pb-20 pt-32 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-20 opacity-50" aria-hidden="true" />

      <div className="absolute inset-y-0 right-0 -z-10 w-full opacity-60 lg:w-[62%] lg:opacity-100">
        <ClientOnly
          load={() => import('../components/HeroScene')}
          fallback={
            <img
              src={heroFallback}
              alt={FALLBACK_ALT}
              fetchPriority="low"
              className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
            />
          }
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#0d1929] via-[#0d1929]/80 to-transparent lg:via-[#0d1929]/70"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-2xl space-y-7">
          <p
            style={{ animationDelay: '0s' }}
            className="hero-in inline-flex items-center gap-2 rounded-full border border-[#EDA700]/30 bg-[#EDA700]/10 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#EDA700]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#EDA700]" aria-hidden="true" />
            Duall Engenharia
          </p>

          <h1
            style={{ animationDelay: '0.08s' }}
            className="hero-in font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.6rem]"
          >
            Know-how em projetos de <span className="text-[#EDA700]">instalações elétricas e hidráulicas</span>
          </h1>

          <p
            style={{ animationDelay: '0.16s' }}
            className="hero-in text-lg leading-relaxed text-slate-300"
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
      </Container>
    </section>
  );
}
