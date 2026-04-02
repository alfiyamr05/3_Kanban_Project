import BoardHeader from "./components/BoardHeader";
import Board from "./components/Board";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <BoardHeader />
      <main className="flex-1 overflow-hidden">
        <Board />
      </main>
    </div>
  );
}
