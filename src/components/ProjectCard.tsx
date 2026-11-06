import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Ruler } from 'lucide-react';

import { projectImage, type Project } from '../content/projects';

/** Card em HTML com texto real; o link leva o nome do empreendimento. */
export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const image = projectImage(project.imageFileName);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {image && (
          <img
            src={image}
            alt={`${project.title}, ${project.category.toLowerCase()}, projeto de instalações desenvolvido pela Duall Engenharia.`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.imageClassName ?? 'object-center'}`}
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[#315676] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight text-[#2D3845]">
          <Link
            to={`/projetos/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-[#315676]"
          >
            {project.title}
          </Link>
        </h3>

        <dl className="space-y-1.5 text-sm text-slate-600">
          <div className="flex gap-2">
            <dt className="sr-only">Cliente</dt>
            <dd>
              Cliente <span className="font-semibold text-[#315676]">{project.client}</span>
            </dd>
          </div>
          {project.location && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Localização</dt>
              <MapPin size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
              <dd>{project.location}</dd>
            </div>
          )}
          {project.area && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Área</dt>
              <Ruler size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
              <dd>{project.area}</dd>
            </div>
          )}
        </dl>

        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold text-[#315676]">
          Ver projeto
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
