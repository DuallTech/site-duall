import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

const STATS = [
  { value: 300, prefix: '+', suffix: '', label: 'Projetos Entregues' },
  { value: 120, prefix: '+', suffix: '', label: 'Clientes Atendidos' },
  { value: 4, prefix: '+', suffix: 'M', label: 'M² Projetados' },
  { value: 18, prefix: '+', suffix: '', label: 'Anos de Experiência' },
];

function AnimatedNumber({ value, prefix = '', suffix = '' }: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#0d1929] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-center text-white/50 text-[11px] font-mono font-bold uppercase tracking-[0.28em] mb-8">
          Somos especialistas em projetos de instalações prediais BIM com mais de 18 anos de experiência e conhecimento no ramo
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0d1929] flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="text-4xl sm:text-5xl font-display font-extrabold text-[#EDA700] leading-none tracking-tight">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </span>
              <span className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
