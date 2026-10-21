import { ButtonLink, ChatButton, Container } from './ui';

export default function CtaBand({
  title = 'Tem um empreendimento em desenvolvimento?',
  text = 'Envie as informações e a equipe técnica da Duall Engenharia retorna para alinhar escopo, prazo e documentação.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-[#315676] py-16 text-white">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{title}</h2>
          <p className="text-slate-100">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/contato">Solicitar proposta</ButtonLink>
          <ChatButton variant="ghost">Falar com a Duall</ChatButton>
        </div>
      </Container>
    </section>
  );
}
