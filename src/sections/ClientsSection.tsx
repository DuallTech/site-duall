import { useEffect, useRef, useState } from 'react';

import { ButtonLink, Container, Eyebrow } from '../components/ui';
import { CLIENTS, NUMBERS } from '../content/clients';

/** Carrossel infinito de logos. A segunda cópia é só visual: fica fora da árvore de acessibilidade e dos rastreadores. */
export function ClientLogoMarquee() {
  const card =
    'group flex h-40 w-40 shrink-0 items-center justify-center rounded-xs border border-slate-200 bg-slate-50 px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[#1992BB]/35 hover:bg-white';
  const img = 'max-h-28 max-w-36 w-auto object-contain opacity-95 transition-opacity duration-300 group-hover:opacity-100';

  return (
    <div className="relative mx-auto w-[calc(100%-3rem)] max-w-[1800px] overflow-hidden motion-reduce:overflow-x-auto md:w-[82%]">
      {/* Bordas desfocadas: o carrossel "some" para dentro do desfoque e não vai até o fim da tela */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-white/60 backdrop-blur-[3px] [mask-image:linear-gradient(to_right,#000,transparent)] md:w-28"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-white/60 backdrop-blur-[3px] [mask-image:linear-gradient(to_left,#000,transparent)] md:w-28"
        aria-hidden="true"
      />

      <div className="animate-ticker flex w-max py-3">
        <ul className="flex gap-6 pr-6">
          {CLIENTS.map((client) => (
            <li key={client.name} className={card}>
              <img
                src={client.logo}
                alt={`Logo de ${client.name}, cliente da Duall Engenharia`}
                loading="lazy"
                decoding="async"
                className={img}
              />
            </li>
          ))}
        </ul>
        <ul className="flex gap-6 pr-6" aria-hidden="true">
          {CLIENTS.map((client) => (
            <li key={client.name} className={card}>
              <img src={client.logo} alt="" loading="lazy" decoding="async" className={img} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Número que conta de 0 até o valor ao entrar na tela. O HTML estático já traz o valor final. */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setCount(0);

    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1600, 1);
        setCount(Math.round((1 - Math.pow(1 - t, 4)) * target));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setCount(0);
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref}>
      {match[1]}
      {count.toLocaleString('pt-BR')}
      {match[3]}
    </span>
  );
}

/** Faixa azul escura com os números da Duall. */
export function NumbersBand() {
  if (!NUMBERS.length) return null;

  return (
    <div className="relative isolate overflow-hidden bg-[#0d1929] py-20 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="blob pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-[#315676]/50 blur-3xl" aria-hidden="true" />
      <div className="blob-slow pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#EDA700]/15 blur-3xl" aria-hidden="true" />
      <Container className="space-y-12">
        <div className="reveal space-y-4">
          <Eyebrow light>Em números</Eyebrow>
          <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">A Duall em números</h3>
        </div>

        <dl className="reveal grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {NUMBERS.map((item) => (
            <div key={item.label} className="group border-l border-white/15 pl-6 transition duration-500 hover:border-[#EDA700] lg:pl-8">
              <dd className="font-display text-5xl font-extrabold leading-none tracking-tight text-[#EDA700] md:text-6xl">
                <CountUp value={item.value} />
              </dd>
              <dt className="mt-3 max-w-[16rem] text-sm leading-snug text-slate-300">{item.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}

/** Bloco 5. Clientes e números. */
export default function ClientsSection({ showLink = false }: { showLink?: boolean }) {
  return (
    <section aria-labelledby="clientes" className="bg-white pt-24">
      <Container>
        <div className="reveal max-w-3xl space-y-5">
          <Eyebrow>Clientes</Eyebrow>
          <h2
            id="clientes"
            className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2D3845] md:text-5xl"
          >
            Clientes da Duall Engenharia
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            A Duall Engenharia atende grandes players do mercado imobiliário e da construção civil, com portfólio em
            empreendimentos de alta complexidade técnica.
          </p>
        </div>
      </Container>

      <div className="reveal mt-14">
        <ClientLogoMarquee />
      </div>

      <div className={`flex justify-center ${showLink ? 'mb-24 mt-10' : 'mb-24'}`}>
        {showLink && (
          <ButtonLink to="/a-duall#clientes" variant="outline">
            Conhecer nossos clientes
          </ButtonLink>
        )}
      </div>

      <NumbersBand />
    </section>
  );
}
