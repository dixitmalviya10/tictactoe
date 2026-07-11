import type { Player, SquareValue } from "../game/types";
import { MARK } from "../theme";

type SquareProps = {
  value: SquareValue;
  index: number;
  isWinning: boolean;
  /** The player about to move, or null when the square cannot be played. */
  turn: Player | null;
  onSquareClick: () => void;
};

export function Square({
  value,
  index,
  isWinning,
  turn,
  onSquareClick,
}: SquareProps) {
  const playable = value === null && turn !== null;

  return (
    <div className="p-1 sm:p-1.5">
      <button
        type="button"
        onClick={onSquareClick}
        disabled={!playable}
        aria-label={`Square ${index + 1}, ${value ?? "empty"}`}
        style={{ animationDelay: `${index * 45}ms` }}
        className={`group animate-tile-in relative flex aspect-square w-full items-center justify-center rounded-2xl border text-5xl font-black backdrop-blur-sm transition duration-300 sm:text-6xl ${
          isWinning
            ? "animate-win-pulse border-white/40 bg-gradient-to-br from-cyan-500/25 to-fuchsia-500/25 shadow-[0_0_35px_-5px_rgba(217,70,239,0.65)]"
            : "border-white/10 bg-white/5"
        } ${
          playable
            ? "cursor-pointer hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.75)] active:scale-95"
            : "cursor-default"
        }`}>
        {value ? (
          <span className={`animate-pop-in ${MARK[value]}`}>{value}</span>
        ) : turn ? (
          <span
            aria-hidden="true"
            className={`opacity-0 transition-opacity duration-200 group-hover:opacity-25 ${MARK[turn]}`}>
            {turn}
          </span>
        ) : null}
      </button>
    </div>
  );
}
