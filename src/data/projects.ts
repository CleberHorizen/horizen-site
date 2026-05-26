export type ProjectCategory =
  | "Energia Solar"
  | "Projetos Elétricos"
  | "Postos de Transformação"
  | "Redes de Distribuição"
  | "Infraestrutura Elétrica";

export type ProjectStatus = "Concluído" | "Entregue" | "Em execução";

export type ProjectFilterCategory = "Todos" | ProjectCategory;

export const PROJECT_CATEGORIES: ProjectFilterCategory[] = [
  "Todos",
  "Energia Solar",
  "Projetos Elétricos",
  "Postos de Transformação",
  "Redes de Distribuição",
  "Infraestrutura Elétrica",
];

export const PROJECT_WHATSAPP_MESSAGE =
  "Olá, vi um projeto no site da Horizen Soluções e gostaria de uma análise para um serviço semelhante.";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  clientInitials?: string;
  city: string;
  state: string;
  image: string;
  description: string;
  serviceType: string;
  status: ProjectStatus;
  featured: boolean;
  powerKwp?: number;
  averageGenerationKwh?: number;
  estimatedSavingsPercent?: number;
  moduleCount?: number;
  installationType?: string;
  transformerPowerKva?: number;
  voltageLevel?: string;
  projectScope?: string;
};

/**
 * Adicione fotos reais em public/images/projetos/ com os nomes referenciados em `image`.
 */
export const projects: Project[] = [
  {
    id: "solar-comercial-bandeirantes",
    title: "Sistema Fotovoltaico Comercial",
    category: "Energia Solar",
    clientInitials: "Colégio Maximus",
    city: "Bandeirantes",
    state: "PR",
    image: "/images/projetos/solar-comercial-bandeirantes-pr-27-5kwp.webp",
    description:
      "Projeto, homologação e instalação de sistema on-grid com monitoramento e documentação completa para concessionária.",
    serviceType: "Energia solar on-grid",
    status: "Concluído",
    featured: true,
    powerKwp: 27.5,
    averageGenerationKwh: 3317,
    estimatedSavingsPercent: 92,
    moduleCount: 50,
    installationType: "Telhado Metálico",
  },
  {
    id: "solar-comercial-piraju",
    title: "Usina solar em Telhado Comercial",
    category: "Energia Solar",
    clientInitials: "Tabacaria Arruda",
    city: "Piraju",
    state: "SP",
    image: "/images/projetos/solar-comercial-piraju-sp-8-1kwp.webp",
    description:
      "Dimensionamento técnico e execução para redução de custo operacional em unidade comercial.",
    serviceType: "Energia Solar Comercial",
    status: "Concluído",
    featured: true,
    powerKwp: 8.1,
    averageGenerationKwh: 961,
    estimatedSavingsPercent: 88,
    moduleCount: 14,
    installationType: "Telhado de Cimento",
  },
  {
    id: "solar-comercial-cerqueira-cesar",
    title: "Sistema Solar Para Comércio",
    category: "Energia Solar",
    clientInitials: "Sorveteria Tropical",
    city: "Cerqueira César",
    state: "SP",
    image: "/images/projetos/solar-comercial-cerqueira-cesar-sp-11-0kwp.webp",
    description:
      "Solução fotovoltaica para comércio com foco em confiabilidade, segurança elétrica e integração com carga existente.",
    serviceType: "Energia Solar Comercial",
    status: "Entregue",
    featured: true,
    powerKwp: 11.0,
    averageGenerationKwh: 1300,
    estimatedSavingsPercent: 90,
    moduleCount: 20,
    installationType: "Telhado de Fibrocimento",
  },
  {
    id: "projeto-eletrico-bt-piraju",
    title: "Projeto Elétrico BT — residencial",
    category: "Projetos Elétricos",
    clientInitials: "R.P.",
    city: "Piraju",
    state: "SP",
    image: "/images/projetos/projeto-eletrico-residencial-sp.webp",
    description:
      "Projeto executivo, diagramas unifilares, memorial descritivo e especificações para instalação de cargas elétricas.",
    serviceType: "Projeto elétrico de baixa tensão",
    status: "Concluído",
    featured: false,
    voltageLevel: "220/127 V",
    projectScope: "Projeto elétrico residencial",
  },
  {
    id: "posto-transformacao-piraju",
    title: "Posto de Transformação Para Irrigação",
    category: "Postos de Transformação",
    clientInitials: "W.P.",
    city: "Piraju",
    state: "SP",
    image: "/images/projetos/posto-transformacao-75kva-piraju-sp.webp",
    description:
      "Projeto e documentação para posto de transformação, medição e proteção em área rural com tramitação na concessionária.",
    serviceType: "Posto de transformação e medição",
    status: "Entregue",
    featured: false,
    transformerPowerKva: 75,
    voltageLevel: "13,8 kV / 380 V",
    projectScope: "Padrão de entrada, proteção e medição para pivô",
  },  
];

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export function filterProjectsByCategory(category: ProjectFilterCategory): Project[] {
  if (category === "Todos") return projects;
  return projects.filter((p) => p.category === category);
}
