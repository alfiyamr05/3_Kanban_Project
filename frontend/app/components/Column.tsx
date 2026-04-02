"use client";

import { useState, useRef } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Column as ColumnType } from "../types/kanban";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

interface Props {
  column: ColumnType;
  onAddCard: (title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
  onRename: (title: string) => void;
}

export default function Column({ column, onAddCard, onDeleteCard, onRename }: Props) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(column.title);
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function commitRename() {
    const trimmed = draftTitle.trim();
    if (trimmed && trimmed !== column.title) onRename(trimmed);
    else setDraftTitle(column.title);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") commitRename();
    if (e.key === "Escape") {
      setDraftTitle(column.title);
      setEditing(false);
    }
  }

  function startEditing() {
    setDraftTitle(column.title);
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }

  return (
    <div className="flex flex-col w-64 shrink-0 bg-slate-50 rounded-xl border border-gray-100 overflow-hidden">
      {/* Column top accent */}
      <div className="h-1 bg-yellow w-full" />

      {/* Column header */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between gap-2">
        {editing ? (
          <input
            ref={inputRef}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={commitRename}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded px-1.5 py-0.5 text-sm font-semibold text-navy border border-blue outline-none bg-white"
          />
        ) : (
          <button
            onDoubleClick={startEditing}
            title="Double-click to rename"
            className="flex-1 text-left text-sm font-semibold text-navy truncate hover:text-blue transition-colors"
          >
            {column.title}
          </button>
        )}
        <span className="shrink-0 text-xs font-medium text-gray-text bg-gray-100 rounded-full px-2 py-0.5">
          {column.cards.length}
        </span>
      </div>

      {/* Cards */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 px-3 py-1 min-h-[60px] flex-1 overflow-y-auto transition-colors duration-150 ${
              snapshot.isDraggingOver ? "bg-blue/5" : ""
            }`}
          >
            {column.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDelete={(cardId) => onDeleteCard(cardId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add card */}
      <div className="px-3 pb-3 pt-1">
        {showForm ? (
          <AddCardForm
            onAdd={(title, details) => {
              onAddCard(title, details);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center gap-1.5 text-sm text-gray-text hover:text-blue transition-colors py-1"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="7" y1="1" x2="7" y2="13" />
              <line x1="1" y1="7" x2="13" y2="7" />
            </svg>
            Add card
          </button>
        )}
      </div>
    </div>
  );
}
