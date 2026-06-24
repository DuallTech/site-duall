import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileText, MapPin, X } from 'lucide-react';

import { PORTFOLIO_PROJECTS } from '../data';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from './animations';

const portfolioFilters = [
  { id: 'all', label: 'Todos os Projetos' },
  { id: 'eletrico', label: 'Projeto Elétrico' },
  { id: 'hidraulico', label: 'Projeto Hidráulico' },
  { id: 'incendio', label: 'Combate a Incêndio' },
  { id: 'climatizacao', label: 'Climatização' },
] as const;

const portfolioGalleryImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
];

const portfolioMockProjects = Array.from({ length: 30 }, (_, index) => {
  const templates = [
    {
      titleBase: 'Residencial Panorama',
      type: 'Residencial Vertical',
      specialties: ['Elétrico', 'Hidráulico', 'Incêndio'],
      city: 'São Paulo - SP',
    },
    {
      titleBase: 'Corporate Nexus',
      type: 'Corporativo Premium',
      specialties: ['Elétrico', 'Climatização'],
      city: 'Campinas - SP',
    },
    {
      titleBase: 'Living Coast',
      type: 'Residencial Multifamiliar',
      specialties: ['Hidráulico', 'Incêndio', 'Climatização'],
      city: 'Santos - SP',
    },
    {
      titleBase: 'Medical Tower',
      type: 'Complexo de Saúde',
      specialties: ['Climatização', 'Elétrico', 'Incêndio'],
      city: 'São Paulo - SP',
    },
    {
      titleBase: 'Business Park',
      type: 'Mixed-Use Comercial',
      specialties: ['Elétrico', 'Hidráulico'],
      city: 'Americana - SP',
    },
  ];

  const template = templates[index % templates.length];
  const number = index + 1;
  const area = 8500 + index * 1350;

  return {
    id: `mock_portfolio_${number}`,
    title: `${template.titleBase} ${number}`,
    type: template.type,
    location: template.city,
    area: `${area.toLocaleString('pt-BR')} m²`,
    year: 2021 + (index % 5),
    specialties: template.specialties,
    imageUrl: portfolioGalleryImages[index % portfolioGalleryImages.length],
  };
});

function getPortfolioCategoryLabel(index: number) {
  if (index === 0) return 'Residencial Alto Padrão';
  if (index === 1) return 'Corporativo Premium';
  if (index === 2) return 'Residencial de Luxo';
  if (index === 3) return 'Comercial / Mixed-Use';
  return 'Complexo de Saúde';
}

function getPortfolioWrapperClass(index: number) {
  if (index === 0) return 'lg:col-span-7';
  if (index === 1) return 'lg:col-span-5';
  return 'lg:col-span-4';
}

function getPortfolioImageHeight(index: number) {
  if (index === 0 || index === 1) return 'h-[280px] md:h-[320px] lg:h-[340px]';
  return 'h-[210px] md:h-[225px]';
}

export default function PortfolioSection() {
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'eletrico' | 'hidraulico' | 'incendio' | 'climatizacao'>('all');

  const filteredPortfolioProjects = useMemo(() => {
    return portfolioMockProjects.filter((project) => {
      if (portfolioFilter === 'all') return true;

      const mappedSpec =
        portfolioFilter === 'eletrico'
          ? 'Elétrico'
          : portfolioFilter === 'hidraulico'
            ? 'Hidráulico'
            : portfolioFilter === 'incendio'
              ? 'Incêndio'
              : 'Climatização';

      return project.specialties.includes(mappedSpec);
    });
  }, [portfolioFilter]);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-24 bg-white border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            className="max-w-3xl text-left"
          >
            <div className="flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-[#315676]">
              <span className="h-px w-5 bg-[#315676]" />
              <span>Portfólio de Obras</span>
            </div>
            <h2
              id="portfolio-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-[3.35rem] font-display font-extrabold text-[#2D3845] tracking-tight leading-[1]"
            >
              Veja nossas obras de destaque.
            </h2>
            <p className="mt-4 text-base text-[#5E6B7A] leading-relaxed max-w-2xl">
              Projetos de instalações prediais de alta complexidade desenvolvidos integralmente em tecnologia BIM (LOD 400), garantindo precisão executiva e zero interferências.
            </p>
          </motion.div>

          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            type="button"
            onClick={() => setIsPortfolioModalOpen(true)}
            className="shrink-0 inline-flex items-center justify-center gap-2.5 bg-[#315676] text-white px-5 py-3.5 rounded-md text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-200 hover:bg-[#254261] hover:-translate-y-px shadow-[0_4px_16px_rgba(49,86,118,0.18)]"
          >
            <FileText size={16} />
            <span>Abrir Portfólio Completo</span>
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5"
        >
          {PORTFOLIO_PROJECTS.slice(0, 5).map((project, index) => {
            const isFeatured = index === 0;
            const isSideFeature = index === 1;

            return (
              <motion.article
                key={project.id}
                variants={staggerItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`${getPortfolioWrapperClass(index)} overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-[0_6px_22px_rgba(15,23,42,0.07)] group h-full`}
              >
                <div className={`relative overflow-hidden ${getPortfolioImageHeight(index)}`}>
                  <img
                    src={project.imageUrl}
                    alt={`Empreendimento ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute left-4 top-4 rounded-full bg-[#315676] px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-md">
                    {getPortfolioCategoryLabel(index)}
                  </div>
                </div>

                <div className="bg-white px-5 py-4 md:px-5 md:py-5">
                  <h3
                    className={`font-display font-extrabold tracking-tight text-[#2D3845] leading-tight ${
                      isFeatured
                        ? 'text-[2rem] md:text-[2.25rem]'
                        : isSideFeature
                          ? 'text-[1.45rem] md:text-[1.7rem]'
                          : 'text-[1.28rem] md:text-[1.45rem]'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mt-2 text-[#5E6B7A] ${
                      isFeatured || isSideFeature ? 'text-[14px] leading-7' : 'text-[13px] leading-6'
                    }`}
                  >
                    {project.area} · BIM 2024 · {project.specialities.join(', ')}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {isPortfolioModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPortfolioModalOpen(false)}
                className="absolute inset-0 bg-[#06111f]/78 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-[1580px] h-[92vh] rounded-[28px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(6,17,31,0.32)] border border-slate-200 flex flex-col"
              >
                <div className="flex items-start justify-between gap-6 px-6 py-5 md:px-8 border-b border-slate-200 bg-white">
                  <div className="max-w-4xl">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-[#315676]">
                      Portfólio Completo
                    </span>
                    <h3 className="mt-3 text-2xl md:text-4xl font-display font-extrabold text-[#2D3845] tracking-tight leading-tight">
                      Projetos já desenvolvidos pela Duall Engenharia.
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-[#5E6B7A] leading-relaxed">
                      Explore uma base mock com dezenas de empreendimentos organizados por disciplina. Cada projeto traz tipologia, localização, área e imagem de referência.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPortfolioModalOpen(false)}
                    className="shrink-0 w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-[#315676] transition flex items-center justify-center"
                    aria-label="Fechar portfólio"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="px-6 pt-5 pb-4 md:px-8 border-b border-slate-200 bg-slate-50/70">
                  <div className="flex gap-2.5 flex-wrap">
                    {portfolioFilters.map((filter) => {
                      const isActive = portfolioFilter === filter.id;

                      return (
                        <button
                          key={filter.id}
                          type="button"
                          onClick={() => setPortfolioFilter(filter.id)}
                          className={`px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] border transition ${
                            isActive
                              ? 'bg-[#315676] text-white border-[#315676] shadow-md'
                              : 'bg-white text-[#315676] border-slate-200 hover:border-[#315676]/35 hover:bg-slate-50'
                          }`}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-7 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {filteredPortfolioProjects.map((project) => (
                      <article
                        key={project.id}
                        className="overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                      >
                        <div className="relative h-48 overflow-hidden bg-slate-100">
                          <img
                            src={project.imageUrl}
                            alt={`Projeto ${project.title}`}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 rounded-full bg-[#315676] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-white">
                            {project.type}
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <h4 className="font-display text-[1.35rem] font-extrabold text-[#2D3845] leading-tight">
                            {project.title}
                          </h4>

                          <div className="space-y-1.5 text-[13px] text-[#5E6B7A]">
                            <p className="flex items-center gap-2">
                              <MapPin size={14} className="text-[#315676] shrink-0" />
                              <span>{project.location}</span>
                            </p>
                            <p className="font-semibold text-[#315676]">
                              Área: {project.area}
                            </p>
                            <p>Ano de referência: BIM {project.year}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {project.specialties.map((specialty) => (
                              <span
                                key={`${project.id}-${specialty}`}
                                className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#315676] border border-slate-200"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
