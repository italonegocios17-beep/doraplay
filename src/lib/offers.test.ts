import { describe, expect, it } from "vitest";
import { BUMP, COMBOS, FRONT_CENTS, UPSELL, canOfferUpsell, checkoutTotal } from "./offers";

describe("ofertas da prévia", () => {
  it("front custa R$ 9,90", () => expect(FRONT_CENTS).toBe(990));
  it("bump de 2 títulos custa R$ 9,90 e vem desmarcado", () => {
    expect(BUMP.cents).toBe(990);
    expect(BUMP.titles).toBe(2);
    expect(BUMP.defaultChecked).toBe(false);
  });
  it("total soma o bump só quando marcado", () => {
    expect(checkoutTotal(false)).toBe(990);
    expect(checkoutTotal(true)).toBe(1980);
  });
  it("upsell 10 títulos custa R$ 29,90", () => expect(UPSELL.cents).toBe(2990));
  it("upsell só com 10+ títulos reais", () => {
    expect(canOfferUpsell(1)).toBe(false);
    expect(canOfferUpsell(10)).toBe(true);
  });
  it("combos 3 por R$ 19,90 e 5 por R$ 29,90", () => {
    expect(COMBOS.map((c) => [c.titles, c.cents])).toEqual([[3, 1990], [5, 2990]]);
  });
});
