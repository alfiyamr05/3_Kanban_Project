"use client";

import { useState } from "react";

interface Props {
  onAdd: (title: string, details: string) => void;
  onCancel: () => void;
}

export default function AddCardForm({ onAdd, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, details.trim());
    setTitle("");
    setDetails("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
      <input
        autoFocus
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-navy placeholder-gray-300 outline-none focus:border-blue focus:ring-1 focus:ring-blue transition"
      />
      <textarea
        placeholder="Details (optional)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={2}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-navy placeholder-gray-300 outline-none focus:border-blue focus:ring-1 focus:ring-blue transition resize-none"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-md bg-purple py-1.5 text-sm font-medium text-white hover:opacity-90 transition"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-md border border-gray-200 py-1.5 text-sm font-medium text-gray-text hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
