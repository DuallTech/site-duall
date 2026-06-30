/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectSpeciality, Testimony, VideoDifferential, PortfolioProject } from './types';

export const SPECIALITIES: ProjectSpeciality[] = [
  {
    id: 'eletrico',
    name: 'Instalações Elétricas & SPDA',
    icon: 'Zap',
    description: 'Projetos elétricos inteligentes com foco em eficiência energética, segurança operacional e conformidade total com a NBR 5410 e NBR 5419.',
    details: [
      'Sistemas de Média e Baixa Tensão',
      'Subestações Transformadoras Abrigadas/Aéreas',
      'Cabeamento Estruturado e Telecomunicações',
      'Geradores, No-breaks e Sistemas de Emergência',
      'SPDA (Para-raios) com Análise de Risco Computadorizada',
      'Projetos Luminotécnicos de Alta Eficiência baseados em DIALux'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1544724480-1a6c4dfdcf27?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hidraulico',
    name: 'Instalações Hidrossanitárias',
    icon: 'Droplet',
    description: 'Detalhamento hidrossanitário em modelo tridimensional de alto nível de detalhe (LOD 400), eliminando interferências físicas nas tubulações.',
    details: [
      'Redes de Água Fria e Água Quente com recirculação',
      'Esgoto Sanitário e Ventilação Assistida',
      'Sistemas de Coleta e Drenagem Pluvial Avançada',
      'Estações de Tratamento de Águas Cinzas (ETA) e Reuso',
      'Sistemas de Pressurização Inteligentes e Automação de Reservatórios',
      'Gás Canalizado de Alta e Baixa Pressão (GLP e GN)'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'incendio',
    name: 'Prevenção contra Incêndio (PPCI)',
    icon: 'ShieldAlert',
    description: 'Projetos rigorosos de segurança e combate a incêndio aprovados junto ao Corpo de Bombeiros com máxima segurança à vida e ao patrimônio.',
    details: [
      'Cálculo Hidráulico Automatizado de Sprinklers e Hidrantes',
      'Sistemas de Detecção, Alarme e Iluminação de Emergência',
      'Rotas de Fuga, Sinalização de Emergência e Saídas de Emergência',
      'Sistemas Especiais de Extinção (CO2, FE-36 e Espuma)',
      'Controle de Fumaça por Pressurização de Escadas',
      'Assessoria Técnica para AVCB e Renovação de Licenças'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mecanico',
    name: 'Compatibilização BIM',
    icon: 'Cpu',
    description: 'Detecção e resolução de interferências geométricas entre disciplinas antes do canteiro, garantindo obra limpa, sem improvisos e com rastreabilidade total.',
    details: [
      'Clash Detection automatizado entre estrutura e instalações',
      'Coordenação Multidisciplinar em ambiente BIM unificado',
      'Relatórios de interferências com rastreabilidade por revisão',
      'Integração arquitetura, estrutura e MEP em modelo único',
      'Exportação IFC/NWD para revisão colaborativa em nuvem',
      'LOD 400 — precisão executiva sem improvisos no canteiro'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimony[] = [
  {
    id: 'test_1',
    name: 'Eng. Ricardo Silveira',
    role: 'Diretor de Operações',
    company: 'Construtora Polaris',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'A precisão geométrica dos projetos BIM da Duall Engenharia nos poupou milhares de reais em readequação de obra. A compatibilização de tubulações com vigas estruturais veio 100% resolvida no modelo tridimensional de instalação.'
  },
  {
    id: 'test_2',
    name: 'Paula Vasconcellos',
    role: 'Gerente Executiva de Projetos',
    company: 'Metrópole Empreendimentos',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'Trabalhamos com a Duall há mais de 5 anos nos empreendimentos de São Paulo e Americana. Eles dominam o fluxo de licenças, aprovações de bombeiro e concessionárias locais, entregando revisões extremamente céleres.'
  },
  {
    id: 'test_3',
    name: 'Roberto Camargo',
    role: 'Coordenador BIM Nacional',
    company: 'Horizon Incorporações',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'O nível de detalhe (LOD) dos entregáveis da Duall é inigualável. Nossos montadores em Santos conseguem seguir exatamente o projeto executivo sem improvisos no canteiro. Sinônimo de obra limpa e engenharia de alto nível.'
  }
];

export const VIDEO_DIFFERENTIALS: VideoDifferential[] = [
  {
    id: 'vid_1',
    title: 'Compatibilização BIM em Tempo Real: Estrutura vs Tubulações',
    description: 'Veja como a nossa equipe detecta e resolve interferências geométricas críticas antes que virem prejuízo real na sua obra.',
    duration: '1:45',
    category: 'Tecnologia BIM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    videoHighlights: [
      { time: '0:15', text: 'Importação de modelos de arquitetura e estrutura' },
      { time: '0:45', text: 'Rodando checagem de colisões automáticas (Clash Detection)' },
      { time: '1:20', text: 'Desvio inteligente de tubulações hidráulicas sob vigas de concreto' }
    ]
  },
  {
    id: 'vid_2',
    title: 'Estudo de Caso: Redução de 22% em Desperdício de Materiais',
    description: 'Entenda os números cruciais de quantitativos precisos gerados automaticamente pelo Revit no fluxo de desenvolvimento da Duall.',
    duration: '2:10',
    category: 'Engenharia de Valor',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    videoHighlights: [
      { time: '0:20', text: 'Extração automática de listas de conexões e barramentos' },
      { time: '1:10', text: 'Redução de custos de estocagem desnecessária no canteiro' },
      { time: '1:55', text: 'Análise de sustentabilidade e otimização energética' }
    ]
  },
  {
    id: 'vid_3',
    title: 'Instalações Complexas: Design Tridimensional de Subestações',
    description: 'Um tour técnico detalhado sobre como projetamos sistemas de média tensão e painéis elétricos com facilidade de manutenção futura.',
    duration: '1:50',
    category: 'Infraestrutura Elétrica',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    videoHighlights: [
      { time: '0:10', text: 'Fluxo térmico e refrigeração de transformadores' },
      { time: '0:50', text: 'Dimensionamento seguro de barramentos elétricos' },
      { time: '1:30', text: 'Rotas de eletrocalhas integradas tridimensionalmente' }
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'port_1',
    title: 'Edifício Residencial Horizon',
    location: 'Pinheiros, São Paulo - SP',
    type: 'Residencial Vertical (Alto Padrão)',
    area: '28.500 m²',
    description: 'Escopo completo de projetos elétricos, hidrossanitários, combate a incêndio e climatização integrados em BIM para torre de 34 pavimentos.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Elétrico', 'Hidráulico', 'Incêndio', 'Climatização']
  },
  {
    id: 'port_2',
    title: 'Unique Corporate Center',
    location: 'Centro, Americana - SP',
    type: 'Lajes Comerciais Corporativas',
    area: '12.000 m²',
    description: 'Moderna estrutura de lajes de aço e concreto onde projetamos sistema VRF de climatização, subestação blindada de 750kVA e SPDA estrutural.',
    imageUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Elétrico', 'Climatização', 'Incêndio']
  },
  {
    id: 'port_3',
    title: 'Blue Coast Luxury Residences',
    location: 'Ponta da Praia, Santos - SP',
    type: 'Torre Residencial Multi-familiar',
    area: '18.200 m²',
    description: 'Sistemas hidráulicos completos integrando captação de água pluvial e estação de reuso, além de pressurização hidropneumática e PPCI com aprovação rápida pelo Corpo de Bombeiros.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Hidráulico', 'Incêndio', 'Elétrico']
  },
  {
    id: 'port_4',
    title: 'Lages Corporativas Prime',
    location: 'Itaim Bibi, São Paulo - SP',
    type: 'Edifício Comercial de Luxo',
    area: '22.000 m²',
    description: 'Desenvolvimento e modelagem BIM LOD 400 de infraestrutura elétrica primária com 3 geradores silenciados de 500kVA instalados no subsolo.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Elétrico', 'Climatização']
  }
];
