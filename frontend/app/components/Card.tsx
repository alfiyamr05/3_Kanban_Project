"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card as CardType } from "../types/kanban";

interface Props {
  card: CardType;
  index: number;
  onDelete: (cardId: string) => void;
}

export default function Card({ card, index, onDelete }: Props) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing transition-all duration-150 ${
            snapshot.isDragging
              ? "shadow-lg rotate-1 opacity-95 border-blue"
              : "hover:shadow-md hover:-translate-y-0.5"
          }`}
        >
          <p className="text-sm font-medium text-navy leading-snug pr-5">
            {card.title}
          </p>
          {card.details && (
            <p className="mt-1 text-xs text-gray-text leading-relaxed line-clamp-2">
              {card.details}
            </p>
          )}
          <button
            onClick={() => onDelete(card.id)}
            className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-50 transition-all duration-100"
            aria-label="Delete card"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="1" y1="1" x2="9" y2="9" />
              <line x1="9" y1="1" x2="1" y2="9" />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  );
}
