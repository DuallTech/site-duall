/**
 * Dados institucionais da Duall. Fonte única para cabeçalho, rodapé, SEO e JSON-LD.
 * Valores `null` são dados ainda a confirmar com a Duall: não são exibidos nem entram no schema.
 */

const envUrl = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL;

export const SITE = {
  name: 'Duall Engenharia ',
  // [VALIDAR domínio final do site novo]
  url: (envUrl ?? 'https://duallengenharia.com.br').replace(/\/$/, ''),
  signature: ' Know-how em projetos de instalações',
  description:
    'Projetos de instalações elétricas e hidráulicas para empreendimentos residenciais, comerciais e mistos de médio e alto padrão.',
  locale: 'pt-BR',
  // [VALIDAR ano de fundação]: 11 anos de atuação em 2026.
  foundingYear: 2015 as number | null,
  whatsappNumber: '5511945406289',
  whatsappDisplay: '+55 11 94540-6289',
  careersUrl: 'https://talentos.duallengenharia.com.br/login',
  social: {
    linkedin: 'https://www.linkedin.com/company/duall-engenharia/',
    instagram: 'https://www.instagram.com/duallengenharia',
  },
  units: [
    { city: 'Americana', region: 'SP', street: null as string | null, phone: null as string | null },
    { city: 'Santos', region: 'SP', street: null as string | null, phone: null as string | null },
  ],
} as const;

export const NAV = [
  { label: 'Projetos', href: '/projetos' },
  { label: 'Soluções', href: '/solucoes' },
  { label: 'A Duall', href: '/a-duall' },
  { label: 'Conteúdo', href: '/conteudo' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contato' },
] as const;

export const absoluteUrl = (path: string) => `${SITE.url}${path}`;
