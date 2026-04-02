import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBoardState } from "../hooks/useBoardState";

describe("useBoardState", () => {
  it("initializes with 5 columns from seed data", () => {
    const { result } = renderHook(() => useBoardState());
    expect(result.current.board.columns).toHaveLength(5);
  });

  it("moveCard moves a card between columns", () => {
    const { result } = renderHook(() => useBoardState());
    const srcColId = result.current.board.columns[0].id;
    const destColId = result.current.board.columns[1].id;
    const movedCard = result.current.board.columns[0].cards[0];
    const initialDestCount = result.current.board.columns[1].cards.length;

    act(() => {
      result.current.moveCard(srcColId, destColId, 0, 0);
    });

    const srcCol = result.current.board.columns.find((c) => c.id === srcColId)!;
    const destCol = result.current.board.columns.find((c) => c.id === destColId)!;

    expect(srcCol.cards.find((c) => c.id === movedCard.id)).toBeUndefined();
    expect(destCol.cards[0].id).toBe(movedCard.id);
    expect(destCol.cards).toHaveLength(initialDestCount + 1);
  });

  it("moveCard reorders within the same column", () => {
    const { result } = renderHook(() => useBoardState());
    const col = result.current.board.columns[0];
    const firstCard = col.cards[0];
    const secondCard = col.cards[1];

    act(() => {
      result.current.moveCard(col.id, col.id, 0, 1);
    });

    const updated = result.current.board.columns.find((c) => c.id === col.id)!;
    expect(updated.cards[0].id).toBe(secondCard.id);
    expect(updated.cards[1].id).toBe(firstCard.id);
  });

  it("addCard appends a card to the correct column", () => {
    const { result } = renderHook(() => useBoardState());
    const col = result.current.board.columns[2];
    const before = col.cards.length;

    act(() => {
      result.current.addCard(col.id, "New Task", "Some details");
    });

    const updated = result.current.board.columns.find((c) => c.id === col.id)!;
    expect(updated.cards).toHaveLength(before + 1);
    expect(updated.cards[updated.cards.length - 1].title).toBe("New Task");
    expect(updated.cards[updated.cards.length - 1].details).toBe("Some details");
  });

  it("deleteCard removes the card by id", () => {
    const { result } = renderHook(() => useBoardState());
    const col = result.current.board.columns[0];
    const cardToDelete = col.cards[0];

    act(() => {
      result.current.deleteCard(col.id, cardToDelete.id);
    });

    const updated = result.current.board.columns.find((c) => c.id === col.id)!;
    expect(updated.cards.find((c) => c.id === cardToDelete.id)).toBeUndefined();
  });

  it("renameColumn updates the column title", () => {
    const { result } = renderHook(() => useBoardState());
    const col = result.current.board.columns[0];

    act(() => {
      result.current.renameColumn(col.id, "Renamed Column");
    });

    const updated = result.current.board.columns.find((c) => c.id === col.id)!;
    expect(updated.title).toBe("Renamed Column");
  });
});
