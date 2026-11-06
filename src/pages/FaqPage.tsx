import { Container, PageHero } from '../components/ui';
import { FaqList } from '../sections/ContentFaqSection';
import Seo from '../seo/Seo';
import { breadcrumbLd, faqLd } from '../seo/jsonld';

export function FaqPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];
  return (
    <>
      <Seo
        title="Perguntas frequentes | Duall Engenharia"
        description="Respostas sobre o que a Duall Engenharia faz, os empreendimentos que atende, modelagem BIM, Consultoria ATP e como solicitar um projeto."
        path="/faq"
        jsonLd={[breadcrumbLd(crumbs), faqLd()]}
      />
      <PageHero
        eyebrow="FAQ"
        title="Perguntas frequentes sobre a Duall Engenharia"
        lead="Respostas diretas sobre nossos projetos, soluções e como solicitar uma proposta."
        crumbs={crumbs}
      />
      <section className="bg-blueprint py-20">
        <Container className="max-w-4xl">
          <FaqList />
        </Container>
      </section>
    </>
  );
}
