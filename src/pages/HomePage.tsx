import AboutSummarySection from '../sections/AboutSummarySection';
import { NumbersBand } from '../sections/ClientsSection';
import ContactSection from '../sections/ContactSection';
import ContentFaqSection from '../sections/ContentFaqSection';
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection';
import HeroSection from '../sections/HeroSection';
import SolutionsSection from '../sections/SolutionsSection';
import Seo from '../seo/Seo';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Projetos de instalações elétricas e hidráulicas | Duall Engenharia"
        description="Projetos de instalações elétricas e hidráulicas para empreendimentos residenciais, comerciais e mistos de médio e alto padrão, com BIM."
        path="/"
      />
      <HeroSection />
      <NumbersBand blend />
      <FeaturedProjectsSection />
      <SolutionsSection />
      <AboutSummarySection />
      <ContentFaqSection />
      <ContactSection />
    </>
  );
}
