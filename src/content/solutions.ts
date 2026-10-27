/**
 * Soluções da Duall. O `summary` é o texto de abertura da página interna.
 */

export interface Solution {
  slug: string;
  name: string;
  /** Título curto para menus e cards. */
  short: string;
  /** Frase curta do card da Home (o texto completo, `summary`, fica na página da solução). */
  teaser: string;
  /** Texto completo: abertura da página interna. */
  summary: string;
  scope: string[];
  seoTitle: string;
  seoDescription: string;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'eletrica',
    name: 'Projetos de instalações elétricas',
    short: 'Instalações elétricas',
    teaser: 'Da entrada de energia à distribuição, iluminação e proteção contra descargas.',
    summary:
      'Da rede de entrada de energia à distribuição em média e baixa tensão, com instalações de iluminação, circuitos e pontos de alimentação específicos, sistemas de proteção contra descargas atmosféricas e choques elétricos, e estudos comparativos de soluções otimizadas.',
    scope: [
      'Rede de entrada de energia',
      'Distribuição em média e baixa tensão',
      'Instalações de iluminação, circuitos e pontos de alimentação específicos',
      'Sistemas de proteção contra descargas atmosféricas e choques elétricos',
      'Estudos comparativos de soluções otimizadas',
    ],
    seoTitle: 'Projetos de instalações elétricas | Duall Engenharia',
    seoDescription:
      'Projetos de instalações elétricas da Duall Engenharia: entrada de energia, média e baixa tensão, iluminação, proteção contra descargas atmosféricas e estudos comparativos.',
  },
  {
    slug: 'hidraulica',
    name: 'Projetos de instalações hidráulicas',
    short: 'Instalações hidráulicas',
    teaser: 'Água fria, esgoto, aquecimento solar, drenagem, gás e combate a incêndio.',
    summary:
      'Da adução de água potável fria ao esgoto sanitário, com sistemas de aquecimento de água e aquecimento solar, drenagem pluvial, gás natural e GLP, prevenção e combate a incêndio, e estudos comparativos de soluções otimizadas.',
    scope: [
      'Adução de água potável fria',
      'Esgoto sanitário',
      'Sistemas de aquecimento de água e aquecimento solar',
      'Drenagem pluvial',
      'Gás natural e GLP',
      'Prevenção e combate a incêndio',
      'Estudos comparativos de soluções otimizadas',
    ],
    seoTitle: 'Projetos de instalações hidráulicas | Duall Engenharia',
    seoDescription:
      'Projetos de instalações hidráulicas da Duall Engenharia: água fria, esgoto, aquecimento solar, drenagem pluvial, gás, prevenção e combate a incêndio.',
  },
  {
    slug: 'sistemas',
    name: 'Projetos de infraestrutura para sistemas',
    short: 'Infra para sistemas',
    teaser: 'Dados e voz, CATV, medição individualizada e alarme de incêndio.',
    summary:
      'Redes de dados e voz, entrada de comunicações, TV a cabo e antena TV/FM, distribuição de CATV, medição individualizada de energia, água e gás, e sistemas de detecção, alarme e apoio ao combate a incêndio.',
    scope: [
      'Redes de dados e voz',
      'Entrada de comunicações',
      'TV a cabo e antena TV/FM',
      'Distribuição de CATV',
      'Medição individualizada de energia, água e gás',
      'Sistemas de detecção, alarme e apoio ao combate a incêndio',
    ],
    seoTitle: 'Projetos de infraestrutura para sistemas | Duall Engenharia',
    seoDescription:
      'Projetos de infraestrutura para sistemas da Duall Engenharia: dados e voz, CATV, medição individualizada de energia, água e gás, detecção e alarme de incêndio.',
  },
  {
    slug: 'bim',
    name: 'Modelagem BIM',
    short: 'Modelagem BIM',
    teaser: 'Modelo 3D, arquivos IFC, quantitativos e compatibilização.',
    summary:
      'Modelagem tridimensional e informatizada dos projetos, com representação fiel às disciplinas contempladas, entrega em arquivos IFC, lista de quantitativos e identificação de incompatibilidades entre as disciplinas modeladas.',
    scope: [
      'Modelagem tridimensional e informatizada dos projetos',
      'Representação fiel às disciplinas contempladas',
      'Entrega em arquivos IFC',
      'Lista de quantitativos',
      'Identificação de incompatibilidades entre as disciplinas modeladas',
    ],
    seoTitle: 'Modelagem BIM para instalações | Duall Engenharia',
    seoDescription:
      'Modelagem BIM da Duall Engenharia: modelo tridimensional, arquivos IFC, lista de quantitativos e identificação de incompatibilidades entre disciplinas.',
  },
  {
    slug: 'consultoria-atp',
    name: 'Consultoria ATP, Avaliação Técnica de Projeto',
    short: 'Consultoria ATP',
    // [VALIDAR descrição com a Duall]
    teaser: 'Avaliação técnica de projetos de outros escritórios.',
    summary:
      'Avaliação técnica de projetos de instalações desenvolvidos por outros escritórios de engenharia, para verificar se o projeto está correto antes da execução.',
    scope: [
      'Avaliação técnica de projetos de instalações de outros escritórios de engenharia',
      'Verificação do projeto antes da execução',
    ],
    seoTitle: 'Consultoria ATP, Avaliação Técnica de Projeto | Duall Engenharia',
    seoDescription:
      'Consultoria ATP da Duall Engenharia: avaliação técnica de projetos de instalações de outros escritórios para verificar se o projeto está correto antes da execução.',
  },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
