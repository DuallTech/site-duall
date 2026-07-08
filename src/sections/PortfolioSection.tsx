import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Building2, FileText, MapPin, Ruler, X } from 'lucide-react';

import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from './animations';

type PortfolioEntry = {
  id: string;
  title: string;
  client?: string;
  category: string;
  imageFileName: string;
  imageClassName?: string;
};

type PortfolioProjectDetails = {
  area?: string;
  location?: string;
};

const portfolioProjectDetails: Record<string, PortfolioProjectDetails> = {
  port_bless_principal: { area: '10.138 m²', location: 'Barueri, SP' },
  port_5: { area: '79.542 m²', location: 'São Paulo, SP' },
  port_6: { area: '2.698 m²', location: 'Barueri, SP' },
  port_7: { area: '27.129 m²', location: 'Ribeirão Preto, SP' },
  port_8: { area: '3.523 m²', location: 'São Paulo, SP' },
  port_9: { area: '26.332 m²', location: 'São José do Rio Preto, SP' },
  port_10: { area: '6.417 m²', location: 'Osasco, SP' },
  port_11: { area: '19.546 m²', location: 'Campinas, SP' },
  port_12: { area: '43.100 m²', location: 'Ribeirão Preto, SP' },
  port_13: { area: '41.801 m²', location: 'Barueri, SP' },
  port_14: { area: '10.791 m²', location: 'São Paulo, SP' },
  port_15: { area: '3.069 m²', location: 'São Paulo, SP' },
  port_16: { area: '28.054 m²', location: 'São Paulo, SP' },
  port_17: { area: '10.640 m²', location: 'São Paulo, SP' },
  port_18: { area: '19.161 m²', location: 'Jundiai, SP' },
  port_19: { area: '2.000 m²', location: 'São Paulo, SP' },
  port_20: { area: '4.876 m²', location: 'Osasco, SP' },
  port_21: { area: '43.976 m²', location: 'São Paulo, SP' },
  port_22: { area: '18.073 m²', location: 'São Paulo, SP' },
  port_23: { area: '11.329 m²', location: 'Campinas, SP' },
  port_24: { area: '18.448 m²', location: 'São José do Rio Preto, SP' },
  port_25: { area: '62.802 m²', location: 'Ubatuba, SP' },
  port_26: { area: '31.750 m²', location: 'Sorocaba, SP' },
  port_27: { area: '19.258 m²', location: 'Barueri, SP' },
  port_28: { area: '10.138 m²', location: 'Barueri, SP' },
  port_29: { area: '23.064 m²', location: 'Osasco, SP' },
  port_30: { area: '43.538 m²', location: 'Limeira, SP' },
  port_31: { area: '12.547 m²', location: 'Osasco, SP' },
  port_32: { area: '31.653 m²', location: 'Piracicaba, SP' },
  port_33: { area: '38.582 m²', location: 'Osasco, SP' },
  port_34: { area: '7.472 m²', location: 'Araraquara, SP' },
  port_35: { area: '1.196 m²', location: 'São Paulo, SP' },
  port_36: { area: '18.506 m²', location: 'São Paulo, SP' },
  port_39: { area: '16.424 m²', location: 'Ribeirão Preto, SP' },
  port_40: { area: '30.571 m²', location: 'Ribeirão Preto, SP' },
  port_41: { area: '64.524 m²', location: 'Cajamar, SP' },
};

const portfolioEntries: PortfolioEntry[] = [
  {
    id: 'port_1',
    title: 'Tarraf Square',
    client: 'Tarraf',
    category: 'Misto',
    imageFileName: 'Tarraf-Square-principal.jpg',
    imageClassName: 'object-center object-[center_18%]',
  },
  { id: 'port_2', title: 'Casa Eden', client: 'Cyrela', category: 'Residencial', imageFileName: 'Casa-Eden-Principal.jpg' },
  { id: 'port_3', title: 'Misto Mata', client: 'Idea! Zarvos', category: 'Misto', imageFileName: 'Misto-Mata-Principal.png' },
  { id: 'port_4', title: 'Lavandisca', client: 'SKR', category: 'Residencial', imageFileName: 'Lavandisca- Principal.jpeg' },
  {
    id: 'port_bless_principal',
    title: 'Bless Jardim Esperanca',
    client: 'P4 Engenharia',
    category: 'Residencial',
    imageFileName: 'Bless-Jardim-Esperança-Principal.webp',
  },
  { id: 'port_5', title: 'Eden West', client: 'Cyrela', category: 'Residencial', imageFileName: 'Eden-West.jpg' },
  { id: 'port_6', title: 'Gran Alphaville', client: 'P4 Engenharia / RSF', category: 'Residencial', imageFileName: 'Gran-Alphaville.jpg' },
  { id: 'port_7', title: 'Res. Ventis', client: 'Urben', category: 'Residencial', imageFileName: 'Ventis.jpg' },
  { id: 'port_8', title: 'Res. Marques de Olinda', client: 'Fratta', category: 'Residencial', imageFileName: 'Res.-Marques-de-Olinda.jpg' },
  { id: 'port_9', title: 'Res. Borghese Boulevard 2', client: 'Tarraf', category: 'Residencial', imageFileName: 'Res.-Borghese-Boulevard-2.jpg' },
  { id: 'port_10', title: 'Res. Hildebrando 131', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Hidelbrando-131.jpg' },
  { id: 'port_11', title: 'Res. My Way Guanabara', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'My-Way-Guanabara.jpg' },
  { id: 'port_12', title: 'Res. Apogeo', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Apogeo.jpg' },
  { id: 'port_13', title: 'Res. Reserva Urano', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'RP25-Urano.jpg' },
  { id: 'port_14', title: 'Misto Alameda Franca', client: 'Idea Zarvos', category: 'Misto', imageFileName: 'Alameda-Franca.jpg' },
  { id: 'port_15', title: 'Misto Jazz Moema Chanes', client: 'Gerporj-I / Rev3', category: 'Misto', imageFileName: 'MISTO-JAZZ-MOEMA-CHANES.jpg' },
  { id: 'port_16', title: 'Misto Botani', client: 'Gamaro', category: 'Misto', imageFileName: 'Misto-Botani.jpg' },
  { id: 'port_17', title: 'Res. Terrae', client: 'Gamaro', category: 'Residencial', imageFileName: 'Terrae.jpg' },
  { id: 'port_18', title: 'Res. Torres de Ozanam', client: 'Santa Angela', category: 'Residencial', imageFileName: 'RES.TORRES-OZANAM.jpg' },
  { id: 'port_19', title: 'Res. Soma', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Soma,jpg.webp' },
  { id: 'port_20', title: 'Res. Viva Jaguaribe', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Viva-Jaguaribe.jpg' },
  { id: 'port_21', title: 'Res. Mirai Guarapiranga', client: 'Sugoi', category: 'Residencial', imageFileName: 'Mirai-Guarapiranga.webp' },
  { id: 'port_22', title: 'Res. Mirai Cidade Lider', client: 'Sugoi', category: 'Residencial', imageFileName: 'Mirai-Cidade-Lider.webp' },
  {
    id: 'port_23',
    title: 'Res. Mirai Campinas Jardim do Lago',
    client: 'Sugoi',
    category: 'Residencial',
    imageFileName: 'Mirai-Campinas-Jardim-do-Lago.webp',
  },
  { id: 'port_24', title: 'Res. Monreal', client: 'Tarraf', category: 'Residencial', imageFileName: 'Monreal.webp' },
  { id: 'port_25', title: 'Res. Pereque Acu', client: 'Stylos', category: 'Residencial', imageFileName: 'Pereque-Açu.webp' },
  { id: 'port_26', title: 'Res. Vale Verde', client: 'Planeta', category: 'Residencial', imageFileName: 'Vale-Verde.webp' },
  { id: 'port_27', title: 'Res. Bonnard 307', client: 'CNA Spitaletti', category: 'Residencial', imageFileName: 'Bonnard-307.webp' },
  { id: 'port_28', title: 'Res. Bless Jardim Esperanca', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Bless-Jardim-Esperança.webp' },
  { id: 'port_29', title: 'Res. HM59 Osasco', client: 'HM', category: 'Residencial', imageFileName: 'Res-HM59-Osasco.webp' },
  { id: 'port_30', title: 'Res. Vivendas de Limeira HM54', client: 'HM', category: 'Residencial', imageFileName: 'Res.-Vivendas-de-Limeira.webp' },
  { id: 'port_31', title: 'Res. Villa Parka Osasco', client: 'Emccamp', category: 'Residencial', imageFileName: 'Villa-Park-Osasco.webp' },
  { id: 'port_32', title: 'Res. Terras Altas', client: 'Embraplan', category: 'Residencial', imageFileName: 'Terras-Altas.webp' },
  { id: 'port_33', title: 'Res. Ozz Quitauna', client: 'Econ', category: 'Residencial', imageFileName: 'Ozz-Quituana.webp' },
  { id: 'port_34', title: 'Res. Moove', client: 'Bild', category: 'Residencial', imageFileName: 'Moove.webp' },
  { id: 'port_35', title: 'Res. Tomas Alves', client: 'Canopus', category: 'Residencial', imageFileName: 'Tomas-Alves.webp' },
  { id: 'port_36', title: 'E/ Life Mandaqui', client: 'Econ', category: 'Residencial', imageFileName: 'Life Mandaqui.webp' },
  { id: 'port_39', title: 'Res. Kairos', client: 'Bild', category: 'Residencial', imageFileName: 'Res Kairos.webp' },
  { id: 'port_40', title: 'Tayga', client: 'BILD', category: 'Residencial', imageFileName: 'tayga-1.jpg' },
  { id: 'port_41', title: 'KlubHaus Cajamar', client: 'Hausbau / CLLB', category: 'Residencial', imageFileName: 'KlubHaus-Cajamar.jpg' },
];

const portfolioImageModules = import.meta.glob('../assets/images/projetos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const portfolioImageByFileName = Object.fromEntries(
  Object.entries(portfolioImageModules).map(([path, imageUrl]) => [
    path.split('/').pop() ?? path.split('\\').pop() ?? path,
    imageUrl,
  ]),
);

function getPortfolioWrapperClass(index: number) {
  if (index === 0 || index === 1) return 'lg:col-span-6';
  return 'lg:col-span-4';
}

function getPortfolioImageHeight(index: number) {
  if (index === 0 || index === 1) return 'h-[280px] md:h-[320px] lg:h-[360px]';
  return 'h-[210px] md:h-[225px]';
}

export default function PortfolioSection() {
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const portfolioProjects = useMemo(
    () =>
      portfolioEntries
        .map((project) => ({
          ...project,
          imageUrl: portfolioImageByFileName[project.imageFileName],
          area: portfolioProjectDetails[project.id]?.area,
          location: portfolioProjectDetails[project.id]?.location,
        }))
        .filter((project) => Boolean(project.imageUrl)),
    [],
  );

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="border-t border-slate-200/80 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            className="max-w-3xl text-left"
          >
            <div className="flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-[#315676]">
              <span className="h-px w-5 bg-[#315676]" />
              <span>Portfolio de Obras</span>
            </div>
            <h2
              id="portfolio-heading"
              className="mt-5 font-display text-3xl font-extrabold leading-[1] tracking-tight text-[#2D3845] md:text-4xl lg:text-[3.35rem]"
            >
              Projetos ja desenvolvidos pela Duall.
            </h2>
          </motion.div>

          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            type="button"
            onClick={() => setIsPortfolioModalOpen(true)}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-md bg-[#315676] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_16px_rgba(49,86,118,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-[#254261]"
          >
            <FileText size={16} />
            <span>Ver Portfolio Completo</span>
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5"
        >
          {portfolioProjects.slice(0, 5).map((project, index) => {
            const isFeatured = index === 0;
            const isSideFeature = index === 1;

            return (
              <motion.article
                key={project.id}
                variants={staggerItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`${getPortfolioWrapperClass(index)} group h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_6px_22px_rgba(15,23,42,0.07)]`}
              >
                <div className={`relative overflow-hidden ${getPortfolioImageHeight(index)}`}>
                  <img
                    src={project.imageUrl}
                    alt={`Projeto ${project.title}`}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                      project.imageClassName ?? 'object-center'
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 translate-y-3 rounded-2xl border border-white/20 bg-[#0e2135]/88 p-3 text-white opacity-0 shadow-[0_18px_50px_rgba(6,17,31,0.28)] backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
                      {project.client && (
                        <div className="flex items-center gap-2 text-[12px] leading-5">
                          <Building2 size={14} className="shrink-0 text-[#9FD3FF]" />
                          <span>Cliente: {project.client}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute left-4 top-4 rounded-full bg-[#315676] px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-md">
                    {project.category}
                  </div>
                </div>

                <div className="bg-white px-5 py-4 md:px-5 md:py-5">
                  <h3
                    className={`font-display font-extrabold leading-tight tracking-tight text-[#2D3845] ${
                      isFeatured || isSideFeature
                        ? 'text-[1.8rem] md:text-[2.1rem]'
                        : 'text-[1.28rem] md:text-[1.45rem]'
                    }`}
                  >
                    {project.title}
                  </h3>

                  {project.client && (
                    <div className="mt-3 flex items-center gap-2 text-[#5E6B7A]">
                      <Building2 size={16} className="shrink-0 text-[#315676]" />
                      <p className={`${isFeatured || isSideFeature ? 'text-[15px] leading-7' : 'text-[14px] leading-6'}`}>
                        Cliente:
                        {' '}
                        <span className="font-semibold text-[#315676]">{project.client}</span>
                      </p>
                    </div>
                  )}
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
                className="relative z-10 flex h-[92vh] w-full max-w-[1580px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(6,17,31,0.32)]"
              >
                <div className="flex items-start justify-between gap-6 border-b border-slate-200 bg-white px-6 py-5 md:px-8">
                  <div className="max-w-4xl">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-[#315676]">
                      Portfolio Completo
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-[#2D3845] md:text-4xl">
                      Empreendimentos da Duall Engenharia
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPortfolioModalOpen(false)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-[#315676]"
                    aria-label="Fechar portfolio"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-white px-6 py-6 md:px-8 md:py-7">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {portfolioProjects.map((project) => (
                      <article
                        key={project.id}
                        className="group overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                      >
                        <div className="relative h-56 overflow-hidden bg-slate-100">
                          <img
                            src={project.imageUrl}
                            alt={`Projeto ${project.title}`}
                            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${project.imageClassName ?? 'object-center'}`}
                          />
                          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-3 rounded-2xl border border-white/20 bg-[#0e2135]/88 p-3 text-white opacity-0 shadow-[0_18px_50px_rgba(6,17,31,0.28)] backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
                              {project.client && (
                                <div className="flex items-center gap-2 text-[12px] leading-5">
                                  <Building2 size={14} className="shrink-0 text-[#9FD3FF]" />
                                  <span>Cliente: {project.client}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="absolute left-3 top-3 rounded-full bg-[#315676] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-white">
                            {project.category}
                          </div>
                        </div>

                        <div className="space-y-3 p-5">
                          <h4 className="font-display text-[1.35rem] font-extrabold leading-tight text-[#2D3845]">
                            {project.title}
                          </h4>

                          {project.client && (
                            <p className="flex items-center gap-2 text-[14px] leading-6 text-[#5E6B7A]">
                              <Building2 size={15} className="shrink-0 text-[#315676]" />
                              <span>
                                Cliente:
                                {' '}
                                <span className="font-semibold text-[#315676]">{project.client}</span>
                              </span>
                            </p>
                          )}
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
