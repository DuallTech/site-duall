import { ButtonLink, Container, PageHero } from '../components/ui';
import { SITE } from '../content/site';
import ContactSection from '../sections/ContactSection';
import Seo from '../seo/Seo';
import { breadcrumbLd } from '../seo/jsonld';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contato e solicitação de proposta | Duall Engenharia"
        description="Fale com a Duall Engenharia pelo formulário, WhatsApp ou chatbot. A equipe técnica retorna para alinhar escopo, prazo e documentação."
        path="/contato"
        jsonLd={[
          breadcrumbLd([
            { name: 'Início', path: '/' },
            { name: 'Contato', path: '/contato' },
          ]),
        ]}
      />
      <ContactSection asPage />
    </>
  );
}

/** [VALIDAR com a Duall e com o responsável por LGPD] Texto-base; não substitui revisão jurídica. */
export function PrivacyPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Política de privacidade', path: '/politica-de-privacidade' },
  ];
  return (
    <>
      <Seo
        title="Política de privacidade | Duall Engenharia"
        description="Como a Duall Engenharia usa os dados informados no formulário de contato do site."
        path="/politica-de-privacidade"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="Legal" title="Política de privacidade" crumbs={crumbs} />
      <section className="bg-white py-20">
        <Container className="max-w-3xl space-y-5 text-lg leading-relaxed text-slate-700">
          <p>
            Os dados informados no formulário de contato do site da {SITE.name} (nome, empresa, e-mail, telefone ou
            WhatsApp, tipo de empreendimento e mensagem) são usados apenas para o retorno deste contato.
          </p>
          <p>
            Para solicitar informações, correção ou exclusão dos seus dados, fale com a equipe pelo WhatsApp{' '}
            {SITE.whatsappDisplay}.
          </p>
        </Container>
      </section>
    </>
  );
}

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Página não encontrada | Duall Engenharia" description="A página que você procura não existe." path="/404" noindex />
      <PageHero
        eyebrow="Erro 404"
        title="Página não encontrada"
        lead="O endereço que você acessou não existe ou foi movido."
        crumbs={[{ name: 'Início', path: '/' }]}
        actions={
          <>
            <ButtonLink to="/">Voltar ao início</ButtonLink>
            <ButtonLink to="/projetos" variant="outline">
              Ver projetos
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
