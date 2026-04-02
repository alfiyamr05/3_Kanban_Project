"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useBoardState } from "../hooks/useBoardState";
import Column from "./Column";

export default function Board() {
  const { board, moveCard, addCard, deleteCard, renameColumn } = useBoardState();

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    moveCard(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-6 overflow-x-auto h-full items-start">
        {board.columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            onAddCard={(title, details) => addCard(col.id, title, details)}
            onDeleteCard={(cardId) => deleteCard(col.id, cardId)}
            onRename={(title) => renameColumn(col.id, title)}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
