"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Board, Card } from "../types/kanban";
import { seedBoard } from "../data/seed";

export function useBoardState() {
  const [board, setBoard] = useState<Board>(() => seedBoard);

  function moveCard(
    sourceColId: string,
    destColId: string,
    sourceIndex: number,
    destIndex: number
  ) {
    setBoard((prev) => {
      const columns = prev.columns.map((col) => ({
        ...col,
        cards: [...col.cards],
      }));

      const sourceCol = columns.find((c) => c.id === sourceColId)!;
      const destCol = columns.find((c) => c.id === destColId)!;

      const [moved] = sourceCol.cards.splice(sourceIndex, 1);
      destCol.cards.splice(destIndex, 0, moved);

      return { columns };
    });
  }

  function addCard(colId: string, title: string, details: string) {
    const newCard: Card = { id: uuidv4(), title, details };
    setBoard((prev) => ({
      columns: prev.columns.map((col) =>
        col.id === colId ? { ...col, cards: [...col.cards, newCard] } : col
      ),
    }));
  }

  function deleteCard(colId: string, cardId: string) {
    setBoard((prev) => ({
      columns: prev.columns.map((col) =>
        col.id === colId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      ),
    }));
  }

  function renameColumn(colId: string, title: string) {
    setBoard((prev) => ({
      columns: prev.columns.map((col) =>
        col.id === colId ? { ...col, title } : col
      ),
    }));
  }

  return { board, moveCard, addCard, deleteCard, renameColumn };
}
