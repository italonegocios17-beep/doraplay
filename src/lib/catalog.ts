// Dados locais da Etapa 1 (sem banco). Na Etapa 2 serão substituídos por consultas ao Lovable Cloud.
export type GroupId = "romance-bilionarios" | "traicao-vinganca" | "fantasia-lobisomens";
export type NovelaStatus = "rascunho" | "demonstracao";

export interface Novela {
  slug: string;
  title: string;
  status: NovelaStatus;
  categories: string[];
  groups: GroupId[];
  priceCents: number;
  priceNote: string;
  language: string;
  synopsis: string | null;
  videoUrl: string | null; // futuro: vídeo único completo (Bunny Stream)
  trailerUrl: string | null;
  hue: number; // matiz da capa abstrata original
  isNew: boolean;
}

export const GROUPS: { id: GroupId; label: string }[] = [
  { id: "romance-bilionarios", label: "Romance & Bilionários" },
  { id: "traicao-vinganca", label: "Traição & Vingança" },
  { id: "fantasia-lobisomens", label: "Fantasia & Lobisomens" },
];

const demo = (slug: string, title: string, groups: GroupId[], categories: string[], hue: number, isNew = false): Novela => ({
  slug, title, status: "demonstracao", categories, groups, priceCents: 990, priceNote: "Preço ilustrativo de demonstração",
  language: "Demonstração", synopsis: null, videoUrl: null, trailerUrl: null, hue, isNew,
});

export const NOVELAS: Novela[] = [
  {
    slug: "a-luna-traida-que-se-tornou-a-rainha-dos-lobos",
    title: "A Luna Traída que se Tornou a Rainha dos Lobos",
    status: "rascunho",
    categories: ["Romance", "Fantasia", "Lobisomens", "Vingança"],
    groups: ["fantasia-lobisomens", "traicao-vinganca", "romance-bilionarios"],
    priceCents: 990,
    priceNote: "Preço provisório",
    language: "Português brasileiro (pretendido)",
    synopsis: null,
    videoUrl: null,
    trailerUrl: null,
    hue: 350,
    isNew: true,
  },
  demo("contrato-com-o-herdeiro", "Contrato com o Herdeiro", ["romance-bilionarios"], ["Romance", "Bilionários"], 20, true),
  demo("o-preco-da-traicao", "O Preço da Traição", ["traicao-vinganca"], ["Traição", "Vingança"], 5),
  demo("marca-da-lua-cheia", "Marca da Lua Cheia", ["fantasia-lobisomens"], ["Fantasia", "Lobisomens"], 290, true),
  demo("casamento-por-engano", "Casamento por Engano", ["romance-bilionarios"], ["Romance", "Bilionários"], 330),
  demo("volta-por-cima", "Volta por Cima", ["traicao-vinganca"], ["Vingança", "Drama"], 40),
  demo("herdeira-das-sombras", "Herdeira das Sombras", ["fantasia-lobisomens"], ["Fantasia"], 260),
  demo("o-ceo-e-a-garconete", "O CEO e a Garçonete", ["romance-bilionarios"], ["Romance", "Bilionários"], 10),
];

export const getNovela = (slug: string) => NOVELAS.find((n) => n.slug === slug);
export const brl = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const statusLabel = (s: NovelaStatus) => (s === "rascunho" ? "Rascunho" : "Demonstração");
