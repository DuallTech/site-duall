import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Building2, ChevronUp, FileText, MapPin, Ruler } from 'lucide-react';

import { PROJECTS, projectImage, type Project } from '../content/projects';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from './animations';

const viewport = { once: true, margin: '-100px' } as const;

function ProjectDetails({ project, className }: { project: Project; className: string }) {
  return (
    <div className={className}>
      <div className="space-y-2">
        {project.area && (
          <div className="flex items-center gap-2 text-[12px] leading-5">
            <Ruler size={14} className="shrink-0 text-[#9FD3FF]" />
            <span>Area: {project.area}</span>
          </div>
        )}
        {project.location && (
          <div className="flex items-center gap-2 text-[12px] leading-5">
            <MapPin size={14} className="shrink-0 text-[#9FD3FF]" />
            <span>Localizacao: {project.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[12px] leading-5">
          <Building2 size={14} className="shrink-0 text-[#9FD3FF]" />
          <span>Cliente: {project.client}</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjectsSection() {
  const [openId, setOpenId] = useState<Project['id'] | null>(null);
  const projects = useMemo(
    () => PROJECTS.map((project) => ({ ...project, imageUrl: projectImage(project.imageFileName) })).filter((project) => Boolean(project.imageUrl)),
    [],
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="projetos-destaque"
      className="border-t border-slate-200/80 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUpVariants}
            className="max-w-3xl text-left"
          >
            <div className="flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-[#315676]">
              <span className="h-px w-5 bg-[#315676]" />
              <span>Portfolio de Obras</span>
            </div>
            <h2
              id="projetos-destaque"
              className="mt-5 font-display text-3xl font-extrabold leading-none tracking-tight text-[#2D3845] md:text-4xl lg:text-[3.35rem]"
            >
              Projetos ja desenvolvidos pela Duall.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUpVariants}
            className="shrink-0"
          >
            <Link
              to="/projetos"
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-[#315676] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_16px_rgba(49,86,118,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-[#254261]"
            >
              <FileText size={16} aria-hidden="true" />
              <span>Ver Portfolio</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainerVariants}
          className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-12 lg:gap-5"
        >
          {projects.slice(0, 5).map((project, index) => {
            const isFeatured = index === 0;
            const isSideFeature = index === 1;
            // No celular mostra só os 2 primeiros, lado a lado; do desktop em diante, todos.
            const wrapper = index < 2 ? 'lg:col-span-6' : 'hidden lg:col-span-4 lg:block';
            const imageHeight =
              index < 2 ? 'h-[150px] sm:h-[220px] md:h-[320px] lg:h-[360px]' : 'h-[210px] md:h-[225px]';

            return (
              <motion.article
                key={project.id}
                variants={staggerItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`${wrapper} group h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_6px_22px_rgba(15,23,42,0.07)]`}
              >
                <div className={`relative overflow-hidden ${imageHeight}`}>
                  <img
                    src={project.imageUrl}
                    alt={`Projeto ${project.title}`}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                      project.imageClassName ?? 'object-center'
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-[#315676] px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-md">
                    {project.category}
                  </div>
                  <ProjectDetails
                    project={project}
                    className={`absolute inset-0 z-10 flex items-center bg-[#0e2135]/92 p-4 text-white backdrop-blur-md transition-opacity duration-300 ${
                      openId === project.id ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setOpenId(openId === project.id ? null : project.id)}
                    aria-expanded={openId === project.id}
                    aria-label={openId === project.id ? 'Fechar detalhes do projeto' : 'Ver detalhes do projeto'}
                    className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#315676] shadow-md transition hover:bg-white"
                  >
                    <ChevronUp
                      size={18}
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${openId === project.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                <div className="bg-white px-3 py-3 sm:px-5 sm:py-4 md:py-5">
                  <h3
                    className={`font-display font-extrabold leading-tight tracking-tight text-[#2D3845] ${
                      isFeatured || isSideFeature
                        ? 'text-[1.05rem] sm:text-[1.4rem] md:text-[2.1rem]'
                        : 'text-[1.28rem] md:text-[1.45rem]'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-[#5E6B7A]">
                    <Building2 size={16} className="shrink-0 text-[#315676]" />
                    <p
                      className={`${
                        isFeatured || isSideFeature
                          ? 'text-[12px] leading-5 sm:text-[15px] sm:leading-7'
                          : 'text-[14px] leading-6'
                      }`}
                    >
                      Cliente: <span className="font-semibold text-[#315676]">{project.client}</span>
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
