import VideoCarousel from '../components/VideoCarousel';
import { Container, Eyebrow, PageHero } from '../components/ui';
import ClientsSection from '../sections/ClientsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import Seo from '../seo/Seo';
import { breadcrumbLd } from '../seo/jsonld';

export function AboutPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'A Duall', path: '/a-duall' },
  ];

  return (
    <>
      <Seo
        title="A Duall Engenharia: quem somos | Duall Engenharia"
        description="A Duall Engenharia é um time de engenheiros dedicado a projetos de instalações, com comprometimento com o prazo, qualidade gráfica, segurança e soluções otimizadas."
        path="/a-duall"
        jsonLd={[breadcrumbLd(crumbs)]}
      />

      <PageHero
        eyebrow="A Duall"
        ghost="Duall"
        title="Comprometimento é a palavra que rege o nosso trabalho"
        lead="A Duall Engenharia desenvolve projetos de instalações elétricas e hidráulicas para empreendimentos residenciais, comerciais e mistos de médio e alto padrão."
        crumbs={crumbs}
      />

      {/* Quem somos: diretores, missão, visão, valores e vídeo, tudo nas abas (cada coisa aparece uma vez) */}
      <section className="bg-blueprint relative overflow-hidden py-20 md:py-24" aria-labelledby="quem-somos">
        <Container className="space-y-12">
          <div className="reveal max-w-3xl space-y-5">
            <Eyebrow>Quem somos</Eyebrow>
            <h2 id="quem-somos" className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-5xl">
              Engenharia que faz a diferença na prática
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Entendemos que, quando um projeto nasce, expectativas são criadas.
            </p>
          </div>

          <div className="reveal">
            <VideoCarousel isHighContrast={false} />
          </div>
        </Container>
      </section>

      <ClientsSection />
      <TestimonialsSection />
    </>
  );
}
