import type { Player, PlayableMode } from "../game/types";
import { StatCard } from "./StatCard";

type ScoreBoardProps = {
  scores: { X: number; O: number; draws: number };
  mode: PlayableMode;
  /** The player about to move, or null once the game is over. */
  turn: Player | null;
  isDraw: boolean;
};

export function ScoreBoard({ scores, mode, turn, isDraw }: ScoreBoardProps) {
  const vsComputer = mode === "computer";

  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      <StatCard
        label={vsComputer ? "YOU" : "X"}
        value={scores.X}
        tone="cyan"
        active={turn === "X"}
      />
      <StatCard label="Draw" value={scores.draws} tone="slate" active={isDraw} />
      <StatCard
        label={vsComputer ? "CPU" : "O"}
        value={scores.O}
        tone="fuchsia"
        active={turn === "O"}
      />
    </div>
  );
}
