import { MapPin } from 'lucide-react';

import VideoCarousel from '../components/VideoCarousel';
import CtaBand from '../components/CtaBand';
import { ButtonLink, Container, Eyebrow, PageHero } from '../components/ui';
import { SITE } from '../content/site';
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
        eyebrow="Quem somos"
        title="Comprometimento é a palavra que rege o nosso trabalho"
        lead="A Duall Engenharia desenvolve projetos de instalações elétricas e hidráulicas para empreendimentos residenciais, comerciais e mistos de médio e alto padrão."
        crumbs={crumbs}
      />

      <section className="bg-white py-20" aria-labelledby="manifesto">
        <Container className="space-y-12">
          <div className="max-w-3xl space-y-5">
            <Eyebrow>Manifesto</Eyebrow>
            <h2 id="manifesto" className="font-display text-3xl font-extrabold text-[#2D3845] md:text-4xl">
              Engenharia que faz a diferença na prática
            </h2>
            <p className="text-lg text-slate-600">
              “Entendemos que, quando um projeto nasce, expectativas são criadas.”
            </p>
          </div>
          <VideoCarousel isHighContrast={false} />
        </Container>
      </section>

      <section className="bg-slate-50 py-20" aria-labelledby="unidades">
        <Container className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Unidades</Eyebrow>
            <h2 id="unidades" className="font-display text-3xl font-extrabold text-[#2D3845] md:text-4xl">
              Americana e Santos
            </h2>
          </div>
          <ul className="grid gap-5 md:grid-cols-2">
            {SITE.units.map((unit) => (
              <li key={unit.city} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-7">
                <MapPin className="mt-1 shrink-0 text-[#315676]" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl font-bold text-[#2D3845]">
                    {unit.city}, {unit.region}
                  </h3>
                  {unit.street && <p className="text-sm text-slate-600">{unit.street}</p>}
                  {unit.phone && <p className="text-sm text-slate-600">{unit.phone}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClientsSection />
      <TestimonialsSection />

      <section className="bg-[#0d1929] py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl space-y-2">
            <h2 className="font-display text-2xl font-extrabold">Quer fazer parte do time?</h2>
            <p className="text-slate-300">Conheça as oportunidades de carreira na Duall Engenharia.</p>
          </div>
          <ButtonLink to={SITE.careersUrl} variant="ghost">
            Trabalhe conosco
          </ButtonLink>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
