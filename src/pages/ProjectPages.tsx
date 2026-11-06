import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Building2, MapPin, Ruler } from 'lucide-react';

import ProjectCard from '../components/ProjectCard';
import { Container, PageHero } from '../components/ui';
import { CLIENT_NAMES, PROJECTS, getProject, projectImage, type ProjectCategory } from '../content/projects';
import { SITE, absoluteUrl } from '../content/site';
import Seo from '../seo/Seo';
import { breadcrumbLd, projectLd } from '../seo/jsonld';
import NotFoundPage from './MiscPages';

const CATEGORIES: Array<'Todos' | ProjectCategory> = ['Todos', 'Residencial', 'Misto'];

export function ProjectsPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Todos');
  const [client, setClient] = useState('Todos');

  const filtered = useMemo(
    () =>
      PROJECTS.filter(
        (p) => (category === 'Todos' || p.category === category) && (client === 'Todos' || p.client === client),
      ),
    [category, client],
  );

  return (
    <>
      <Seo
        title="Projetos de instalações em empreendimentos | Duall Engenharia"
        description={`Portfólio da Duall Engenharia: ${PROJECTS.length} empreendimentos residenciais e mistos com projetos de instalações elétricas, hidráulicas e BIM.`}
        path="/projetos"
        jsonLd={[
          breadcrumbLd([
            { name: 'Início', path: '/' },
            { name: 'Projetos', path: '/projetos' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Projetos da Duall Engenharia',
            itemListElement: PROJECTS.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(`/projetos/${p.slug}`),
              name: p.title,
            })),
          },
        ]}
      />
      <PageHero
        compact
        eyebrow="Portfólio"
        title="Projetos de instalações em empreendimentos de médio e alto padrão"
        lead="O portfólio da Duall Engenharia reúne projetos de instalações para empreendimentos residenciais, comerciais e mistos de alta complexidade técnica."
        crumbs={[
          { name: 'Início', path: '/' },
          { name: 'Projetos', path: '/projetos' },
        ]}
      />

      <section className="bg-white py-6">
        <Container>
          {/* Filtros e lista formam um bloco só: a página fica parada e a rolagem acontece dentro da lista */}
          <div className="flex h-[max(26rem,calc(100svh-21rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60">
            <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 bg-slate-50 p-3 md:flex-row md:items-center md:justify-between">
              <div role="group" aria-label="Filtrar por tipo" className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                    className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                      category === c
                        ? 'border-[#315676] bg-[#315676] text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-[#315676]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <p role="status" className="ml-2 text-sm text-slate-500">
                  {filtered.length} {filtered.length === 1 ? 'projeto' : 'projetos'}
                </p>
              </div>
              <div className="flex items-center gap-2 md:w-72">
                <label htmlFor="filtro-cliente" className="shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cliente
                </label>
                <select
                  id="filtro-cliente"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#315676] focus:outline-none focus:ring-2 focus:ring-[#315676]/25"
                >
                  <option>Todos</option>
                  {CLIENT_NAMES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div
              role="region"
              aria-label="Lista de projetos"
              tabIndex={0}
              className="min-h-0 flex-1 overflow-y-auto p-4 [scrollbar-color:#315676_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-[#315676]"
            >
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, i) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} priority={i < 3} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function ProjectPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFoundPage />;

  const images = [project.imageFileName, ...(project.extraImageFileNames ?? [])]
    .map((file) => projectImage(file))
    .filter((src): src is string => Boolean(src));

  const description = `${project.title} é um empreendimento ${project.category.toLowerCase()}${
    project.location ? ` em ${project.location}` : ''
  }${project.area ? `, com ${project.area} de área` : ''}, desenvolvido para ${project.client}. A Duall Engenharia atuou nos projetos de instalações do empreendimento.`;

  const related = PROJECTS.filter(
    (p) => p.slug !== project.slug && (p.client === project.client || p.category === project.category),
  )
    .sort((a, b) => Number(b.client === project.client) - Number(a.client === project.client))
    .slice(0, 3);

  const path = `/projetos/${project.slug}`;
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: project.title, path },
  ];

  return (
    <>
      <Seo
        title={`${project.title}: projeto de instalações | ${SITE.name}`}
        description={description}
        path={path}
        image={images[0]}
        jsonLd={[
          breadcrumbLd(crumbs),
          projectLd({
            title: project.title,
            slug: project.slug,
            client: project.client,
            description,
            location: project.location,
            image: images[0] ? (images[0].startsWith('http') ? images[0] : absoluteUrl(images[0])) : undefined,
          }),
        ]}
      />
      <PageHero eyebrow={`Projeto ${project.category.toLowerCase()}`} title={project.title} crumbs={crumbs} compact />

      <section className="bg-white py-8">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            {images.map((src, i) => (
              <div key={src} className="corner-marks relative m-2">
                <i />
                <i />
                <i />
                <i />
                <img
                  src={src}
                  alt={`${project.title}, ${project.category.toLowerCase()}, projeto de instalações desenvolvido pela Duall Engenharia.`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={`aspect-[16/9] max-h-[62vh] w-full rounded-xl object-cover shadow-xl ${i === 0 ? (project.imageClassName ?? '') : ''}`}
                />
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm leading-relaxed text-slate-600">{description}</p>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-slate-200 pt-5">
              <div className="flex gap-3">
                <Building2 size={16} className="mt-1 shrink-0 text-[#315676]" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Cliente</dt>
                  <dd className="font-display text-base font-bold leading-tight text-[#2D3845]">{project.client}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Building2 size={16} className="mt-1 shrink-0 text-[#315676]" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Tipo</dt>
                  <dd className="font-display text-base font-bold leading-tight text-[#2D3845]">{project.category}</dd>
                </div>
              </div>
              {project.location && (
                <div className="flex gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-[#315676]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Localização</dt>
                    <dd className="font-display text-base font-bold leading-tight text-[#2D3845]">{project.location}</dd>
                  </div>
                </div>
              )}
              {project.area && (
                <div className="flex gap-3">
                  <Ruler size={16} className="mt-1 shrink-0 text-[#315676]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Área</dt>
                    <dd className="font-display text-base font-bold leading-tight text-[#2D3845]">{project.area}</dd>
                  </div>
                </div>
              )}
              </dl>
              <Link to="/projetos" className="block text-sm font-bold text-[#315676] underline">
                ← Todos os projetos
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-slate-50 py-16" aria-labelledby="relacionados">
          <Container className="space-y-8">
            <h2 id="relacionados" className="font-display text-2xl font-extrabold text-[#2D3845] md:text-3xl">
              Outros projetos
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
