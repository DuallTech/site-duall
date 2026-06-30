import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { TESTIMONIALS } from '../data';
import { fadeInUpVariants } from './animations';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const getTestimonialMeta = (role: string, company: string) =>
  [role, company].filter(Boolean).join(' · ');

export default function TestimonialsSection() {
  const [cardsPerView, setCardsPerView] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
        return;
      }

      if (window.innerWidth < 1280) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalPages = Math.max(1, Math.ceil(TESTIMONIALS.length / cardsPerView));
  const translate = `${page * (100 / cardsPerView)}%`;

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1));
  }, [totalPages]);

  return (
    <section
      id="depoimentos"
      aria-label="Opinião de Clientes"
      className="py-24 bg-[#f4f4f4]"
    >
      <div className="max-w-[1800px] mx-auto px-2 sm:px-5 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-duall-blue">
              <span className="h-px w-5 bg-duall-blue" />
              <span>Feedbacks e Depoimentos</span>
            </div>
            <h2 className="mt-6 max-w-4xl text-4xl md:text-5xl xl:text-[4rem] font-display font-extrabold leading-[0.98] tracking-tight text-slate-900">
              O que dizem os <span className="text-duall-blue">nossos parceiros.</span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3 self-end">
            <div className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#5E6B7A]">
              {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="relative mt-12"
        >
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
            className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6DEE8] bg-white text-duall-blue shadow-sm transition hover:border-duall-blue hover:bg-duall-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 xl:flex"
            aria-label="Ver depoimentos anteriores"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
            disabled={page === totalPages - 1}
            className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6DEE8] bg-white text-duall-blue shadow-sm transition hover:border-duall-blue hover:bg-duall-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 xl:flex"
            aria-label="Ver mais depoimentos"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${translate})` }}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="w-full shrink-0 px-2.5"
                style={{ flexBasis: `${100 / cardsPerView}%` }}
              >
                <blockquote className="h-full min-h-66.25 rounded-lg border border-[#D6DEE8] bg-white px-7 py-10 shadow-[0_14px_30px_rgba(29,53,87,0.06)]">
                  <div className="flex text-[#EDA700] text-sm tracking-[0.2em]">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))}
                  </div>

                  <p className="mt-6 min-h-26 text-[15px] leading-8 text-duall-blue italic">
                    "{testimonial.text}"
                  </p>

                  <div className="mt-10 h-px w-7 bg-[#D6DEE8]" />

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-duall-blue text-base font-extrabold text-white">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <div className="text-[1.02rem] font-display font-bold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-[13px] leading-relaxed text-[#5E6B7A]">
                        {getTestimonialMeta(testimonial.role, testimonial.company)}
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>
            ))}
          </div>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6DEE8] bg-white text-duall-blue transition hover:border-duall-blue hover:bg-duall-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 xl:hidden"
            aria-label="Ver depoimentos anteriores"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPage(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === page ? 'w-8 bg-[#EDA700]' : 'w-2.5 bg-[#C7D3E0] hover:bg-[#8EA8C3]'
              }`}
              aria-label={`Ir para o grupo de depoimentos ${idx + 1}`}
            />
          ))}

          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
            disabled={page === totalPages - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6DEE8] bg-white text-duall-blue transition hover:border-duall-blue hover:bg-duall-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 xl:hidden"
            aria-label="Ver mais depoimentos"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
