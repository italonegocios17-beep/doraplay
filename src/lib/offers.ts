// Regras comerciais da prévia de checkout. Nenhum pagamento é processado na Etapa 1.
export const FRONT_CENTS = 990;
export const BUMP = { id: "bump-2", label: "Leve mais 2 títulos", titles: 2, cents: 990, defaultChecked: false } as const;
export const UPSELL = { id: "upsell-10", label: "Pacote 10 títulos", titles: 10, cents: 2990, requiresRealCatalog: true } as const;
export const COMBOS = [
  { id: "combo-3", label: "Combo 3 títulos", titles: 3, cents: 1990 },
  { id: "combo-5", label: "Combo 5 títulos", titles: 5, cents: 2990 },
] as const;

export function checkoutTotal(bump: boolean) {
  return FRONT_CENTS + (bump ? BUMP.cents : 0);
}

/** O upsell de 10 títulos só pode ser oferecido com catálogo real suficiente. */
export function canOfferUpsell(realTitles: number) {
  return realTitles >= UPSELL.titles;
}
