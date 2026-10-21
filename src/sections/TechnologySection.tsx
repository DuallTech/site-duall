import { Check } from 'lucide-react';

import DuallDynamicVisual from '../components/DuallDynamicVisual';
import { ButtonLink, Container, Eyebrow } from '../components/ui';
import { DUALL_DYNAMIC_BENEFITS, DUALL_DYNAMIC_DEFINITION } from '../content/solutions';

/** Bloco 4. Definição citável do Duall Dynamic, idêntica à da página /solucoes/duall-dynamic. */
export default function TechnologySection() {
  return (
    <section aria-labelledby="tecnologia" className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#eef4fa] to-[#e3edf7] py-24">
      <div className="blob pointer-events-none absolute -right-24 top-10 -z-10 h-96 w-96 rounded-full bg-[#315676]/15 blur-3xl" aria-hidden="true" />
      <div className="blob-slow pointer-events-none absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#EDA700]/15 blur-3xl" aria-hidden="true" />
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="reveal space-y-6">
            <Eyebrow>Tecnologia própria</Eyebrow>
            <h2
              id="tecnologia"
              className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-5xl"
            >
              Duall Dynamic: a documentação do projeto em um PDF acessível no celular
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">{DUALL_DYNAMIC_DEFINITION}</p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {DUALL_DYNAMIC_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 text-sm font-medium text-slate-700 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#315676]/40 hover:shadow-lg">
                  <Check size={18} className="mt-0.5 shrink-0 text-[#315676]" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>

            <p className="text-slate-600">
              Além do Duall Dynamic, os projetos da Duall são desenvolvidos em 2D, 3D e modelagem BIM.
            </p>

            <ButtonLink to="/solucoes/duall-dynamic" variant="dark">
              Conhecer o Duall Dynamic
            </ButtonLink>
          </div>

          <div className="reveal">
            <DuallDynamicVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
