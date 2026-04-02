export default function BoardHeader() {
  return (
    <header className="bg-navy px-8 py-4 flex items-center gap-3 shrink-0">
      <div className="w-1 h-6 rounded-full bg-yellow" />
      <h1 className="text-white text-xl font-semibold tracking-wide">
        Kanban Board
      </h1>
    </header>
  );
}
