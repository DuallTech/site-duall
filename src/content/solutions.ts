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
  /** Lista completa de serviços da página interna. Sem ela, a página usa o `scope`. */
  services?: string[];
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
      'Projetos de instalações elétricas personalizados, atendendo as normas técnicas vigentes e diversas tipologias de edificações residenciais, comerciais e industriais.',
    scope: [
      'Rede de entrada de energia',
      'Distribuição em média e baixa tensão',
      'Instalações de iluminação, circuitos e pontos de alimentação específicos',
      'Sistemas de proteção contra descargas atmosféricas e choques elétricos',
      'Estudos comparativos de soluções otimizadas',
    ],
    services: [
      'Instalações de alimentação de energia;',
      'Rede de entrada de energia em Baixa Tensão;',
      'Quadros gerais e circuitos de distribuição em Baixa Tensão;',
      'Sistemas de iluminação da área total de implantação;',
      'Quadros de força e funcionais para equipamentos;',
      'SPDA — Sistema de proteção contra descargas atmosféricas;',
      'Sistema de aterramento funcional e de proteção geral;',
      'Aprovações: Entrada e medição de energia;',
      'Rede de entrada de energia com subestação em Média Tensão;',
      'Distribuição de energia em Média e Baixa Tensão;',
      'Circuitos e pontos de alimentação específicos (ar condicionado, ventilação, motores, bombas);',
      'Circuitos e pontos de alimentação de uso geral;',
      'Quadros terminais para iluminação e tomadas;',
      'Sistema de proteção contra choques elétricos;',
      'Projeto e dimensionamento de Gerador para cargas essenciais;',
    ],
    seoTitle: 'Projetos de instalações elétricas | Duall Engenharia',
    seoDescription:
      'Projetos de instalações elétricas da Duall Engenharia: entrada de energia, média e baixa tensão, iluminação, proteção contra descargas atmosféricas e estudos comparativos.',
  },
  {
    slug: 'hidraulica',
    name: 'Projetos de instalações hidráulicas',
    short: 'Instalações Hidráulicas',
    teaser: 'Água fria, esgoto, aquecimento solar, drenagem, gás e combate a incêndio.',
    summary:
      'Projetos de instalações hidráulicas com detalhamento técnico rigoroso, alto desempenho e compatibilização entre todas as disciplinas do empreendimento.',
    services: [
      'Sistemas de abastecimento de água fria;',
      'Esgoto sanitário e ventilação de esgoto;',
      "Piscinas e espelhos d'água;",
      'Sistema de aquecimento a gás;',
      'Sistema de aquecimento central solar e a gás;',
      'Captação e aproveitamento de águas pluviais;',
      'Sistema de distribuição de gás e ventilações de gás;',
    ],
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
    short: 'Instalações de Sistemas',
    teaser: 'Infraestrutura para dados e voz, CATV, medição individualizada e alarme de incêndio.',
    summary:
      'Projetos de infraestrutura para sistemas e automação predial, com detalhamento técnico e compatibilização com as demais disciplinas do empreendimento.',
    scope: [
      'Infraestrutura para redes de dados e voz',
      'Infraestrutura para entrada de comunicações',
      'Infraestrutura para TV a cabo e antena TV/FM',
      'Infraestrutura para distribuição de CATV',
      'Infraestrutura para medição individualizada de energia, água e gás',
      'Infraestrutura para sistemas de detecção, alarme e apoio ao combate a incêndio',
    ],
    services: [
      'Infraestrutura para cabeamento estruturado (lógico e telefônico);',
      'Infraestrutura para CFTV — circuito fechado de televisão;',
      'Infraestrutura para sistemas de som ambiente e comunicação interna;',
      'Infraestrutura para sistemas de gerenciamento de energia (SGE);',
      'Infraestrutura para sistemas de automação predial e BMS;',
      'Infraestrutura para controle de acesso e segurança eletrônica;',
      'Infraestrutura para redes Wi-Fi corporativas;',
      'Infraestrutura para recarga de veículos elétricos;',
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
    slug: 'corpo-de-bombeiro',
    name: 'Projetos para aprovação no Corpo de Bombeiro',
    short: 'Corpo de Bombeiro',
    teaser: 'Projetos de prevenção e combate a incêndio para aprovação no Corpo de Bombeiro.',
    summary:
      'Projetos de prevenção e combate a incêndio para aprovação no Corpo de Bombeiro, com detalhamento técnico e compatibilização com as demais disciplinas do empreendimento.',
    scope: [
      'Projetos de prevenção e combate a incêndio',
      'Sistemas de detecção e alarme de incêndio',
      'Compatibilização com as instalações do empreendimento',
      'Documentação técnica do projeto para aprovação no Corpo de Bombeiro',
    ],
    services: [
      'Elaboração de Projetos Legais (PT): Análise de risco, dimensionamento das medidas de segurança, elaboração das plantas de medidas de segurança, elaboração dos memoriais descritivos e de cálculo;',
      'Adequação às normas ABNT e às ITs do CB estadual;',
      'Protocolo, acompanhamento e aprovação de projetos de segurança contra incêndio;',
      'Consultoria em projetos já aprovados;',
      'Protocolo, acompanhamento e aprovação de FATs (Formulários de Atendimento Técnico).',
    ],
    seoTitle: 'Projetos para o Corpo de Bombeiro | Duall Engenharia',
    seoDescription:
      'Projetos de prevenção e combate a incêndio para aprovação no Corpo de Bombeiro, com detalhamento técnico e compatibilização das instalações.',
  },
  {
    slug: 'aquecimento-solar',
    name: 'Projetos de aquecimento solar',
    short: 'Aquecimento Solar',
    teaser: 'Sistemas de aquecimento solar integrados às instalações de água quente.',
    summary:
      'Projetos de aquecimento solar eficientes e sustentáveis, com estudo de viabilidade, dimensionamento completo e integração total ao projeto hidráulico.',
    services: [
      'Dimensionamento de coletores solares térmicos;',
      'Integração com sistema de apoio a gás ou elétrico;',
      'Estudo de viabilidade energética e payback;',
      'Monitoramento de desempenho e eficiência energética;',
      'Reservatórios térmicos (boilers) e sistemas de acumulação;',
      'Integração com projeto hidráulico e de água quente;',
      'Sistemas fotovoltaicos para geração de energia;',
    ],
    scope: [
      'Sistemas de aquecimento solar de água',
      'Integração com os sistemas de água quente',
      'Compatibilização com as instalações hidráulicas',
      'Estudos comparativos de soluções de aquecimento',
    ],
    seoTitle: 'Projetos de aquecimento solar | Duall Engenharia',
    seoDescription:
      'Projetos de aquecimento solar de água da Duall Engenharia, integrados aos sistemas de água quente e às instalações hidráulicas do empreendimento.',
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
