import { FAQ } from '../content/faq';
import { SITE, absoluteUrl } from '../content/site';
import { SOLUTIONS } from '../content/solutions';

type Json = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export const organizationLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: 'Duall',
  url: `${SITE.url}/`,
  logo: `${SITE.url}/logo-duall.png`,
  slogan: SITE.signature,
  description: SITE.description,
  ...(SITE.foundingYear ? { foundingDate: String(SITE.foundingYear) } : {}),
  telephone: `+${SITE.whatsappNumber}`,
  address: SITE.units.map((u) => ({
    '@type': 'PostalAddress',
    addressLocality: u.city,
    addressRegion: u.region,
    addressCountry: 'BR',
    ...(u.street ? { streetAddress: u.street } : {}),
  })),
  areaServed: { '@type': 'AdministrativeArea', name: 'Estado de São Paulo' },
  sameAs: [SITE.social.linkedin, SITE.social.instagram],
  knowsAbout: [
    'Projetos de instalações elétricas',
    'Projetos de instalações hidráulicas',
    'Infraestrutura para sistemas',
    'Modelagem BIM',
    'Duall Dynamic',
    'Avaliação Técnica de Projeto',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: `+${SITE.whatsappNumber}`,
    availableLanguage: 'pt-BR',
    url: absoluteUrl('/contato'),
  },
});

export const websiteLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  inLanguage: SITE.locale,
  publisher: { '@id': ORG_ID },
});

export const faqLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

export const breadcrumbLd = (items: Array<{ name: string; path: string }>): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const serviceLd = (slug: string): Json | null => {
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteUrl(`/solucoes/${solution.slug}#service`),
    name: solution.name,
    description: solution.summary,
    url: absoluteUrl(`/solucoes/${solution.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'AdministrativeArea', name: 'Estado de São Paulo' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Construtoras, incorporadoras e escritórios de arquitetura',
    },
  };
};

export const servicesListLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Soluções da Duall Engenharia',
  itemListElement: SOLUTIONS.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: absoluteUrl(`/solucoes/${s.slug}`),
    name: s.name,
  })),
});

export const projectLd = (project: {
  title: string;
  slug: string;
  client: string;
  description: string;
  image?: string;
  location?: string;
}): Json => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description,
  url: absoluteUrl(`/projetos/${project.slug}`),
  creator: { '@id': ORG_ID },
  sponsor: { '@type': 'Organization', name: project.client },
  ...(project.location ? { locationCreated: { '@type': 'Place', name: project.location } } : {}),
  ...(project.image ? { image: project.image } : {}),
  inLanguage: SITE.locale,
});

export const articleLd = (article: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  author?: string;
}): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.summary, 
  datePublished: article.date,
  dateModified: article.date,
  inLanguage: SITE.locale,
  mainEntityOfPage: absoluteUrl(`/conteudo/artigos/${article.slug}`),
  author: article.author ? { '@type': 'Person', name: article.author } : { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
});

export const eventLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'EducationEvent',
  name: '3º Workshop Técnico Duall',
  description:
    'Treinamento técnico para construtoras, incorporadoras e arquitetos, realizado pela Duall Engenharia.',
  organizer: { '@id': ORG_ID },
  url: absoluteUrl('/conteudo/workshop-tecnico'),
  inLanguage: SITE.locale,
});
