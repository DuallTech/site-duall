/** Portfólio. Cada empreendimento gera uma página em /projetos/[slug]. */

export type ProjectCategory = 'Residencial' | 'Misto' | 'Comercial';

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  imageFileName: string;
  extraImageFileNames?: string[];
  imageClassName?: string;
  area?: string;
  location?: string;
}

type Entry = Omit<Project, 'slug'>;

const entries: Entry[] = [
  { id: 'port_1', title: 'Misto Infinity Square', client: 'Tarraf', category: 'Misto', imageFileName: 'Tarraf-Square-principal.jpg', imageClassName: 'object-[center_18%]', area: '43.116 m²', location: 'São José do Rio Preto, SP' },
  { id: 'port_2', title: 'Residencial Casa Eden', client: 'Cyrela', category: 'Residencial', imageFileName: 'Casa-Eden-Principal.jpg', area: '30.334 m²', location: 'Itaim Bibi, São Paulo, SP' },
  { id: 'port_3', title: 'Misto Mata', client: 'Idea! Zarvos', category: 'Misto', imageFileName: 'Misto-Mata-Principal.png', area: '33.336 m²', location: 'Itaim Bibi, São Paulo, SP' },
  { id: 'port_4', title: 'Misto Lavandisca', client: 'SKR', category: 'Residencial', imageFileName: 'Lavandisca- Principal.jpeg', area: '14.554 m²', location: 'Moema, São Paulo, SP' },
  { id: 'port_bless_principal', title: 'Bless Jardim Esperança', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Bless-Jardim-Esperança-Principal.webp', area: '10.138 m²', location: 'Barueri, SP' },
  { id: 'port_5', title: 'Eden West', client: 'Cyrela', category: 'Residencial', imageFileName: 'Eden-West.jpg', area: '79.542 m²', location: 'São Paulo, SP' },
  { id: 'port_6', title: 'Gran Alphaville', client: 'P4 Engenharia / RSF', category: 'Residencial', imageFileName: 'Gran-Alphaville.jpg', area: '2.698 m²', location: 'Barueri, SP' },
  { id: 'port_7', title: 'Res. Ventis', client: 'Urben', category: 'Residencial', imageFileName: 'Ventis.jpg', area: '27.129 m²', location: 'Ribeirão Preto, SP' },
  { id: 'port_8', title: 'Res. Marques de Olinda', client: 'Fratta', category: 'Residencial', imageFileName: 'Res.-Marques-de-Olinda.jpg', area: '3.523 m²', location: 'São Paulo, SP' },
  { id: 'port_9', title: 'Res. Borghese Boulevard 2', client: 'Tarraf', category: 'Residencial', imageFileName: 'Res.-Borghese-Boulevard-2.jpg', area: '26.332 m²', location: 'São José do Rio Preto, SP' },
  { id: 'port_10', title: 'Res. Hildebrando 131', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Hidelbrando-131.jpg', area: '6.417 m²', location: 'Osasco, SP' },
  { id: 'port_11', title: 'Res. My Way Guanabara', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'My-Way-Guanabara.jpg', area: '19.546 m²', location: 'Campinas, SP' },
  { id: 'port_12', title: 'Res. Apogeo', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Apogeo.jpg', area: '43.100 m²', location: 'Ribeirão Preto, SP' },
  { id: 'port_13', title: 'Res. Reserva Urano', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'RP25-Urano.jpg', area: '41.801 m²', location: 'Barueri, SP' },
  { id: 'port_14', title: 'Misto Alameda Franca', client: 'Idea Zarvos', category: 'Misto', imageFileName: 'Alameda-Franca.jpg', area: '10.791 m²', location: 'São Paulo, SP' },
  { id: 'port_15', title: 'Misto Jazz Moema Chanes', client: 'Gerporj-I / Rev3', category: 'Misto', imageFileName: 'MISTO-JAZZ-MOEMA-CHANES.jpg', area: '3.069 m²', location: 'São Paulo, SP' },
  { id: 'port_16', title: 'Misto Botani', client: 'Gamaro', category: 'Misto', imageFileName: 'Misto-Botani.jpg', area: '28.054 m²', location: 'São Paulo, SP' },
  { id: 'port_17', title: 'Res. Terrae', client: 'Gamaro', category: 'Residencial', imageFileName: 'Terrae.jpg', area: '10.640 m²', location: 'São Paulo, SP' },
  { id: 'port_18', title: 'Res. Torres de Ozanam', client: 'Santa Angela', category: 'Residencial', imageFileName: 'RES.TORRES-OZANAM.jpg', area: '19.161 m²', location: 'Jundiaí, SP' },
  { id: 'port_19', title: 'Res. Soma', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Soma,jpg.webp', area: '2.000 m²', location: 'São Paulo, SP' },
  { id: 'port_20', title: 'Res. Viva Jaguaribe', client: 'P4 Engenharia', category: 'Residencial', imageFileName: 'Viva-Jaguaribe.jpg', area: '4.876 m²', location: 'Osasco, SP' },
  { id: 'port_21', title: 'Res. Mirai Guarapiranga', client: 'Sugoi', category: 'Residencial', imageFileName: 'Mirai-Guarapiranga.webp', area: '43.976 m²', location: 'São Paulo, SP' },
  { id: 'port_22', title: 'Res. Mirai Cidade Líder', client: 'Sugoi', category: 'Residencial', imageFileName: 'Mirai-Cidade-Lider.webp', area: '18.073 m²', location: 'São Paulo, SP' },
  { id: 'port_23', title: 'Res. Mirai Campinas Jardim do Lago', client: 'Sugoi', category: 'Residencial', imageFileName: 'Mirai-Campinas-Jardim-do-Lago.webp', area: '11.329 m²', location: 'Campinas, SP' },
  { id: 'port_24', title: 'Res. Monreal', client: 'Tarraf', category: 'Residencial', imageFileName: 'Monreal.webp', area: '18.448 m²', location: 'São José do Rio Preto, SP' },
  { id: 'port_25', title: 'Res. Pereque Açu', client: 'Stylos', category: 'Residencial', imageFileName: 'Pereque-Açu.webp', area: '62.802 m²', location: 'Ubatuba, SP' },
  { id: 'port_26', title: 'Res. Vale Verde', client: 'Planeta', category: 'Residencial', imageFileName: 'Vale-Verde.webp', area: '31.750 m²', location: 'Sorocaba, SP' },
  { id: 'port_27', title: 'Res. Bonnard 307', client: 'CNA Spitaletti', category: 'Residencial', imageFileName: 'Bonnard-307.webp', area: '19.258 m²', location: 'Barueri, SP' },
  { id: 'port_29', title: 'Res. HM59 Osasco', client: 'HM', category: 'Residencial', imageFileName: 'Res-HM59-Osasco.webp', area: '23.064 m²', location: 'Osasco, SP' },
  { id: 'port_30', title: 'Res. Vivendas de Limeira HM54', client: 'HM', category: 'Residencial', imageFileName: 'Res.-Vivendas-de-Limeira.webp', area: '43.538 m²', location: 'Limeira, SP' },
  { id: 'port_31', title: 'Res. Villa Parka Osasco', client: 'Emccamp', category: 'Residencial', imageFileName: 'Villa-Park-Osasco.webp', area: '12.547 m²', location: 'Osasco, SP' },
  { id: 'port_32', title: 'Res. Terras Altas', client: 'Embraplan', category: 'Residencial', imageFileName: 'Terras-Altas.webp', area: '31.653 m²', location: 'Piracicaba, SP' },
  { id: 'port_33', title: 'Res. Ozz Quitauna', client: 'Econ', category: 'Residencial', imageFileName: 'Ozz-Quituana.webp', area: '38.582 m²', location: 'Osasco, SP' },
  { id: 'port_34', title: 'Res. Moove', client: 'Bild', category: 'Residencial', imageFileName: 'Moove.webp', area: '7.472 m²', location: 'Araraquara, SP' },
  { id: 'port_35', title: 'Res. Tomas Alves', client: 'Canopus', category: 'Residencial', imageFileName: 'Tomas-Alves.webp', area: '1.196 m²', location: 'São Paulo, SP' },
  { id: 'port_36', title: 'E/ Life Mandaqui', client: 'Econ', category: 'Residencial', imageFileName: 'Life Mandaqui.webp', area: '18.506 m²', location: 'São Paulo, SP' },
  { id: 'port_39', title: 'Res. Kairos', client: 'Bild', category: 'Residencial', imageFileName: 'Res Kairos.webp', area: '16.424 m²', location: 'Ribeirão Preto, SP' },
  { id: 'port_40', title: 'Tayga', client: 'Bild', category: 'Residencial', imageFileName: 'tayga-1.jpg', area: '30.571 m²', location: 'Ribeirão Preto, SP' },
  { id: 'port_41', title: 'KlubHaus Cajamar', client: 'Hausbau / CLLB', category: 'Residencial', imageFileName: 'KlubHaus-Cajamar.jpg', area: '64.524 m²', location: 'Cajamar, SP' },
];

export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const PROJECTS: Project[] = entries.map((e) => ({ ...e, slug: slugify(e.title) }));

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

const imageModules = import.meta.glob('../assets/images/projetos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const imageByFile = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [path.split('/').pop() as string, url]),
);

export const projectImage = (fileName: string) => imageByFile[fileName] as string | undefined;

export const CLIENT_NAMES = Array.from(new Set(PROJECTS.map((p) => p.client))).sort((a, b) =>
  a.localeCompare(b, 'pt-BR'),
);
