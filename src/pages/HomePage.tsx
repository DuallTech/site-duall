import AboutSummarySection from '../sections/AboutSummarySection';
import ClientsSection from '../sections/ClientsSection';
import ContactSection from '../sections/ContactSection';
import ContentFaqSection from '../sections/ContentFaqSection';
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection';
import HeroSection from '../sections/HeroSection';
import SolutionsSection from '../sections/SolutionsSection';
import TechnologySection from '../sections/TechnologySection';
import Seo from '../seo/Seo';
import { faqLd } from '../seo/jsonld';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Projetos de instalações elétricas e hidráulicas | Duall Engenharia"
        description="Projetos de instalações elétricas e hidráulicas para empreendimentos residenciais, comerciais e mistos de médio e alto padrão, com BIM e Duall Dynamic."
        path="/"
        jsonLd={[faqLd()]}
      />
      <HeroSection />
      <FeaturedProjectsSection />
      <SolutionsSection />
      <TechnologySection />
      <AboutSummarySection />
      <ClientsSection showLink />
      <ContentFaqSection />
      <ContactSection />
    </>
  );
}
