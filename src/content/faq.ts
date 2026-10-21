/** Perguntas frequentes da Home. O mesmo texto vai para o HTML visível e para o JSON-LD FAQPage. */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'O que a Duall Engenharia faz?',
    answer:
      'A Duall Engenharia desenvolve projetos de instalações elétricas, hidráulicas e de infraestrutura para sistemas, além de modelagem BIM, Duall Dynamic e Consultoria ATP, para empreendimentos residenciais, comerciais e mistos de médio e alto padrão.',
  },
  {
    question: 'Quais tipos de empreendimento a Duall Engenharia atende?',
    answer:
      'A Duall Engenharia atende empreendimentos residenciais, comerciais e mistos de médio e alto padrão, com portfólio em projetos de alta complexidade técnica.',
  },
  {
    question: 'O que é o Duall Dynamic?',
    answer:
      'Duall Dynamic é a ferramenta da Duall Engenharia que reúne as informações de um projeto de instalações em um arquivo PDF acessível em dispositivos móveis, com clareza, agilidade e documentação precisa.',
  },
  {
    question: 'A Duall Engenharia entrega projetos em BIM?',
    answer:
      'Sim. A Duall Engenharia faz a modelagem tridimensional dos projetos, entrega arquivos IFC e lista de quantitativos, e identifica incompatibilidades entre as disciplinas modeladas.',
  },
  {
    question: 'O que é a Consultoria ATP?',
    answer:
      'ATP é a Avaliação Técnica de Projeto: a Duall Engenharia avalia projetos de instalações desenvolvidos por outros escritórios de engenharia para verificar se o projeto está correto antes da execução.',
  },
  {
    // [VALIDAR unidades e abrangência geográfica com a Duall]
    question: 'Onde a Duall Engenharia atua?',
    answer: 'A Duall Engenharia está sediada no estado de São Paulo, com unidades em Americana e Santos.',
  },
  {
    question: 'Como solicitar um projeto ou uma avaliação técnica?',
    answer:
      'Pelo formulário de contato, pelo WhatsApp ou pelo chatbot do site da Duall Engenharia. A equipe técnica retorna para alinhar escopo, prazo e documentação.',
  },
];
