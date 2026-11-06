/** Logos de clientes. [VALIDAR lista de clientes e autorização de uso de logo] */

export interface Client {
  name: string;
  logo: string;
}

const logoModules = import.meta.glob('../assets/images/clients/*.{png,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const NAME_OVERRIDES: Record<string, string> = {
  hm: 'HM',
  hc: 'HC',
  hf: 'HF',
  rm: 'RM',
  rsf: 'RSF',
  p4: 'P4 Engenharia',
  ebm: 'EBM',
  cvc: 'CVC',
  mpd: 'MPD',
  jz: 'JZ Engenharia',
  enelpa: 'ENELPA',
  'cna-spitaletti': 'CNA Spitaletti',
  'inova-ts': 'Inova TS',
  'mc-casas': 'MC Casas',
  'logo_torres-engenharia': 'Torres Engenharia',
  brookfiled: 'Brookfield',
  idea: 'Idea!',
  metro4: 'Metro4',
};

const titleCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const CLIENTS: Client[] = Object.entries(logoModules)
  .map(([path, logo]) => {
    const key = (path.split('/').pop() ?? '').replace(/\.(png|svg|webp)$/i, '');
    return { name: NAME_OVERRIDES[key.toLowerCase()] ?? titleCase(key), logo };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

/**
 * Números institucionais. Cada número carrega unidade e contexto na própria frase (GEO).
 *
 * ATENÇÃO: com exceção dos anos de atuação [VALIDAR], os valores abaixo são MOCK (provisórios).
 * Substituir pelos dados reais confirmados pela Duall antes de publicar e remover `mock: true`.
 * Ver PENDENCIAS.txt.
 */
export const NUMBERS: Array<{ value: string; label: string; mock?: boolean }> = [
  { value: '11', label: 'anos de atuação em projetos de instalações, desde 2015' },
  { value: '+500', label: 'empreendimentos projetados', mock: true },
  { value: '+3 mi', label: 'de m² de área projetada', mock: true },
  { value: '+40', label: 'cidades atendidas no estado de São Paulo', mock: true },
];
