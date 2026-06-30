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
    description:
      'Projetos elétricos inteligentes com foco em eficiência energética, segurança operacional e conformidade total com a NBR 5410 e NBR 5419.',
    details: [
      'Sistemas de Média e Baixa Tensão',
      'Subestações Transformadoras Abrigadas/Aéreas',
      'Cabeamento Estruturado e Telecomunicações',
      'Geradores, No-breaks e Sistemas de Emergência',
      'SPDA (Para-raios) com Análise de Risco Computadorizada',
      'Projetos Luminotécnicos de Alta Eficiência baseados em DIALux',
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1544724480-1a6c4dfdcf27?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hidraulico',
    name: 'Instalações Hidrossanitárias',
    icon: 'Droplet',
    description:
      'Detalhamento hidrossanitário em modelo tridimensional de alto nível de detalhe (LOD 400), eliminando interferências físicas nas tubulações.',
    details: [
      'Redes de Água Fria e Água Quente com recirculação',
      'Esgoto Sanitário e Ventilação Assistida',
      'Sistemas de Coleta e Drenagem Pluvial Avançada',
      'Estações de Tratamento de Águas Cinzas (ETA) e Reuso',
      'Sistemas de Pressurização Inteligentes e Automação de Reservatórios',
      'Gás Canalizado de Alta e Baixa Pressão (GLP e GN)',
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'incendio',
    name: 'Prevenção contra Incêndio (PPCI)',
    icon: 'ShieldAlert',
    description:
      'Projetos rigorosos de segurança e combate a incêndio aprovados junto ao Corpo de Bombeiros com máxima segurança à vida e ao patrimônio.',
    details: [
      'Cálculo Hidráulico Automatizado de Sprinklers e Hidrantes',
      'Sistemas de Detecção, Alarme e Iluminação de Emergência',
      'Rotas de Fuga, Sinalização de Emergência e Saídas de Emergência',
      'Sistemas Especiais de Extinção (CO2, FE-36 e Espuma)',
      'Controle de Fumaça por Pressurização de Escadas',
      'Assessoria Técnica para AVCB e Renovação de Licenças',
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80',
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
    name: 'Guido Gardin',
    role: 'Engenheiro',
    company: 'Enplan',
    rating: 5,
    avatarUrl: '',
    text: 'A Duall Engenharia é uma de nossas parceiras pois oferecem atendimento rápido e eficiente, apresentam comparativos para definição das melhores soluções tanto tecnicamente quanto economicamente, têm boa interação com os projetistas das demais disciplinas, prezam por respeitar os prazos estabelecidos, buscando sempre atender as necessidades da obra, além de entregarem projetos com ótimo nível de detalhamento.',
  },
  {
    id: 'test_2',
    name: 'Rubens Tiezzi',
    role: '',
    company: 'JZ Engenharia',
    rating: 5,
    avatarUrl: '',
    text: 'Mesmo com pouco tempo de parceria é possível perceber que a Duall trata com muita seriedade, empenho e profissionalismo os projetos, serviços e demandas que lhes são solicitados.',
  },
  {
    id: 'test_3',
    name: 'Charles Bigot',
    role: 'CEO',
    company: 'Charles Bigot Empreendimentos',
    rating: 5,
    avatarUrl: '',
    text: 'Conheci a DUALL engenharia há um ano atrás. Fizemos 3 reuniões para se conhecer e falar dos projetos antes de me decidir a trabalhar junto. No me arrependo pois a empresa é muito prestativa e topa sempre para estudar uma solução nova. Recomendo mesmo !',
  },
  {
    id: 'test_4',
    name: 'Jonatas',
    role: 'Diretor',
    company: 'Team Prime Empreendimentos',
    rating: 5,
    avatarUrl: '',
    text: 'A Duall Engenharia é uma empresa com excelentes profissionais, pois quando procurei a mesma acreditava que seria igual algumas empresas que já trabalhei, porem fui surpreendido positivamente, pelo excelente atendimento e principalmente pelas soluções encontradas nos projetos no qual realizamos com eles que fez nos gerar uma economia significativa, pelas soluções sugeridas e aplicadas no nossos projetos. Parabéns a Equipe da Duall Engenharia Excelente parceiros.',
  },
  {
    id: 'test_5',
    name: 'Sergio Selistre',
    role: 'Diretor',
    company: 'Planicon Engenharia',
    rating: 5,
    avatarUrl: '',
    text: 'Conheço o Denis há alguns anos. Já desenvolvemos inúmeros projetos juntos, dos mais diversos tipos e complexidade. Trata-se de profissional altamente comprometido e capaz, sempre colaborando para agregar valor ao produto final de seus clientes com a proposição das soluções mais adequadas para cada caso.',
  },
  {
    id: 'test_6',
    name: 'Caito Caccia',
    role: 'Engenheiro',
    company: 'C2J Construtora',
    rating: 5,
    avatarUrl: '',
    text: 'Nós da C2J tivemos uma grata surpresa ao iniciar nossa parceria com a Duall, fomos desde o início extremamente bem atendidos e também surpreendidos com a apresentação de diversas soluções mais econômicas para nossos empreendimentos.',
  },
  {
    id: 'test_7',
    name: 'Cesar',
    role: '',
    company: 'Addere',
    rating: 5,
    avatarUrl: '',
    text: 'Só tenho a agradecer nossa parceria, sempre nos atenderam com muita agilidade e segurança. Os prazos são ótimos e minha recomendação é apenas manter o padrão. Parabéns a toda equipe envolvida desde o atendimento até a diretoria.',
  },
  {
    id: 'test_8',
    name: 'Elcio Moreira',
    role: 'Coordenador de Projetos',
    company: 'Direcional Engenharia',
    rating: 5,
    avatarUrl: '',
    text: 'A relação com a empresa foi ótima, mesmo com ajustes que foram necessários nesse primeiro projeto que trabalhamos em parceria. Ambos os lados souberam entender as situações ocorridas e tentamos finalizar os assuntos da melhor forma possível. Acredito que esse tipo de tratamento leva a uma parceria mais duradoura e por isso meu objetivo é aumentar essa parceria, com novos projetos (em desenvolvimento e a desenvolver).',
  },
  {
    id: 'test_9',
    name: 'Edson',
    role: '',
    company: 'Garbin Associados',
    rating: 5,
    avatarUrl: '',
    text: 'Estou muito satisfeito com qualidade e agilidade com que fui atendido pela Duall, em todos os aspectos, tanto da parte técnica (projetos) como da equipe comercial, que me atenderam prontamente todas as vezes que precisei. Com certeza quero ter outras parcerias nos próximos projetos, como também indicaria a empresa para outros parceiros no ramo atividade.',
  },
  {
    id: 'test_10',
    name: 'Norival Norberto',
    role: 'Diretor de Engenharia',
    company: 'GNG Engenharia',
    rating: 5,
    avatarUrl: '',
    text: 'Grande parceiro, disponibilidade, dedicação e pronto atendimento. Somos muito grato por trabalharmos juntos.',
  },
  {
    id: 'test_11',
    name: 'Jocelito',
    role: 'Coordenador de Obras',
    company: 'Embraplan',
    rating: 5,
    avatarUrl: '',
    text: 'Forte da Dual é a apresentação das possibilidades e custos na área de elétrica quando fez a apresentação da proposta.',
  },
  {
    id: 'test_12',
    name: 'Lucas Curi',
    role: '',
    company: 'Bild Desenvolvimento Imobiliário',
    rating: 5,
    avatarUrl: '',
    text: 'O escritório passa uma sensação de ter uma boa estrutura, são parceiros dos clientes e são bem engajados.',
  },
  {
    id: 'test_13',
    name: 'Jefferson Sousa',
    role: '',
    company: 'Agapee',
    rating: 5,
    avatarUrl: '',
    text: 'Empresa sempre disponível e parceira. Indicaria para amigos com certeza.',
  },
  {
    id: 'test_14',
    name: 'Juliana Felicíssimo',
    role: 'Arquiteta',
    company: 'Ilha Arquitetura',
    rating: 5,
    avatarUrl: '',
    text: 'A Duall é uma ótima parceira. Precisa nas informações e sempre soluções funcionais e criativas, valorizando o nosso projeto.',
  },
  {
    id: 'test_15',
    name: 'Paulo Toshio',
    role: '',
    company: 'Arccos Arquitetura',
    rating: 5,
    avatarUrl: '',
    text: 'A Duall Engenharia tem qualificação técnica e comprometimento. Esta afirmação se sustenta na sua qualificação para participar do nosso grupo de trabalho de um projeto de Bairro Sustentável com Certificação Aqua através da Fundação Vanzollini. Neste trabalho é imprescindível aliar a competência técnica com o entendimento de sustentabilidade.',
  },
  {
    id: 'test_16',
    name: 'Jhonata Romão',
    role: '',
    company: 'AR2 Arquitetura',
    rating: 5,
    avatarUrl: '',
    text: 'A AR2 Arquitetura gostaria de agradecer vocês pelo profissionalismo e comprometimento com os projetos realizados! Estamos muito satisfeitos com a competência dos profissionais da DUALL, sempre muito solícitos! Muito obrigado, e com certeza não paramos por aqui.',
  },
  {
    id: 'test_17',
    name: 'Juliana Lima',
    role: 'Coordenadora de Projetos',
    company: 'P4 Engenharia',
    rating: 5,
    avatarUrl: '',
    text: 'Parceria e boa vontade em solucionar os problemas, foi minha primeira experiência trabalhando com a Duall. O projeto em questão é um enorme desafio, como um todo, pela quantidade enorme de problemas que enfrentamos, mas Alex Kubo é sempre muito parceiro e prestativo. Espero que possamos ter outras possibilidades de trabalharmos juntos numa situação mais "leve" e confortável para todos. Muito obrigada!',
  },
  {
    id: 'test_18',
    name: 'Vinícios',
    role: '',
    company: 'Metro4',
    rating: 5,
    avatarUrl: '',
    text: 'Tivemos uma feliz experiência com a Duall na elaboração do projeto residencial do condomínio Spazio Emma da Metro4. Estamos muito satisfeitos com o trabalho prestado.',
  },
];

export const VIDEO_DIFFERENTIALS: VideoDifferential[] = [
  {
    id: 'vid_1',
    title: 'Compatibilização BIM em Tempo Real: Estrutura vs Tubulações',
    description:
      'Veja como a nossa equipe detecta e resolve interferências geométricas críticas antes que virem prejuízo real na sua obra.',
    duration: '1:45',
    category: 'Tecnologia BIM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    videoHighlights: [
      { time: '0:15', text: 'Importação de modelos de arquitetura e estrutura' },
      { time: '0:45', text: 'Rodando checagem de colisões automáticas (Clash Detection)' },
      { time: '1:20', text: 'Desvio inteligente de tubulações hidráulicas sob vigas de concreto' },
    ],
  },
  {
    id: 'vid_2',
    title: 'Estudo de Caso: Redução de 22% em Desperdício de Materiais',
    description:
      'Entenda os números cruciais de quantitativos precisos gerados automaticamente pelo Revit no fluxo de desenvolvimento da Duall.',
    duration: '2:10',
    category: 'Engenharia de Valor',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    videoHighlights: [
      { time: '0:20', text: 'Extração automática de listas de conexões e barramentos' },
      { time: '1:10', text: 'Redução de custos de estocagem desnecessária no canteiro' },
      { time: '1:55', text: 'Análise de sustentabilidade e otimização energética' },
    ],
  },
  {
    id: 'vid_3',
    title: 'Instalações Complexas: Design Tridimensional de Subestações',
    description:
      'Um tour técnico detalhado sobre como projetamos sistemas de média tensão e painéis elétricos com facilidade de manutenção futura.',
    duration: '1:50',
    category: 'Infraestrutura Elétrica',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    videoHighlights: [
      { time: '0:10', text: 'Fluxo térmico e refrigeração de transformadores' },
      { time: '0:50', text: 'Dimensionamento seguro de barramentos elétricos' },
      { time: '1:30', text: 'Rotas de eletrocalhas integradas tridimensionalmente' },
    ],
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'port_1',
    title: 'Edifício Residencial Horizon',
    location: 'Pinheiros, São Paulo - SP',
    type: 'Residencial Vertical (Alto Padrão)',
    area: '28.500 m²',
    description:
      'Escopo completo de projetos elétricos, hidrossanitários, combate a incêndio e climatização integrados em BIM para torre de 34 pavimentos.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Elétrico', 'Hidráulico', 'Incêndio', 'Climatização'],
  },
  {
    id: 'port_2',
    title: 'Unique Corporate Center',
    location: 'Centro, Americana - SP',
    type: 'Lajes Comerciais Corporativas',
    area: '12.000 m²',
    description:
      'Moderna estrutura de lajes de aço e concreto onde projetamos sistema VRF de climatização, subestação blindada de 750kVA e SPDA estrutural.',
    imageUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Elétrico', 'Climatização', 'Incêndio'],
  },
  {
    id: 'port_3',
    title: 'Blue Coast Luxury Residences',
    location: 'Ponta da Praia, Santos - SP',
    type: 'Torre Residencial Multi-familiar',
    area: '18.200 m²',
    description:
      'Sistemas hidráulicos completos integrando captação de água pluvial e estação de reuso, além de pressurização hidropneumática e PPCI com aprovação rápida pelo Corpo de Bombeiros.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Hidráulico', 'Incêndio', 'Elétrico'],
  },
  {
    id: 'port_4',
    title: 'Lages Corporativas Prime',
    location: 'Itaim Bibi, São Paulo - SP',
    type: 'Edifício Comercial de Luxo',
    area: '22.000 m²',
    description:
      'Desenvolvimento e modelagem BIM LOD 400 de infraestrutura elétrica primária com 3 geradores silenciados de 500kVA instalados no subsolo.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=600&q=80',
    specialities: ['Elétrico', 'Climatização'],
  },
];
