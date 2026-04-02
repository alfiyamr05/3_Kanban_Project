import { describe, it, expect } from "vitest";
import { seedBoard } from "../data/seed";

describe("seedBoard", () => {
  it("has exactly 5 columns", () => {
    expect(seedBoard.columns).toHaveLength(5);
  });

  it("each column has at least 1 card", () => {
    seedBoard.columns.forEach((col) => {
      expect(col.cards.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("all card ids are unique", () => {
    const ids = seedBoard.columns.flatMap((col) => col.cards.map((c) => c.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
