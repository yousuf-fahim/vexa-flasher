import { boards } from "../lib/flashing/manifest";
import type { BoardProfile } from "../lib/flashing/types";

interface Props {
  selectedId: string | null;
  onSelect: (board: BoardProfile) => void;
  disabled: boolean;
}

export default function BoardSelector({ selectedId, onSelect, disabled }: Props) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-400">
        1. Select your board
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {boards.map((board) => {
          const active = selectedId === board.id;
          return (
            <button
              key={board.id}
              disabled={disabled}
              onClick={() => onSelect(board)}
              className={`rounded-lg border p-4 text-left transition ${
                active
                  ? "border-orange-500 bg-orange-500/10 ring-1 ring-orange-500/40"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
              } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-white">{board.name}</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {board.description}
                  </p>
                </div>
                <span className="ml-2 shrink-0 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                  {board.chipFamily}
                </span>
              </div>
              <div className="mt-2 text-[10px] text-zinc-500">
                {board.parts.length} part{board.parts.length !== 1 && "s"} &middot;{" "}
                {board.flashSize} &middot; {board.baudRate.toLocaleString()} baud
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
