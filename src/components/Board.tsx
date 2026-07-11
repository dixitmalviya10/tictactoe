import type { Line, Player, SquareValue } from "../game/types";
import { Square } from "./Square";
import { WinLine } from "./WinLine";

type BoardProps = {
  squares: SquareValue[];
  /** The player about to move, or null when the board is not playable. */
  turn: Player | null;
  winningLine: Line | null;
  onPlay: (index: number) => void;
};

export function Board({ squares, turn, winningLine, onPlay }: BoardProps) {
  return (
    <div className="relative mt-5 grid grid-cols-3">
      {squares.map((value, i) => (
        <Square
          key={i}
          index={i}
          value={value}
          isWinning={winningLine?.includes(i) ?? false}
          turn={turn}
          onSquareClick={() => onPlay(i)}
        />
      ))}
      {winningLine && <WinLine line={winningLine} />}
    </div>
  );
}
