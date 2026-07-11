import type { Difficulty, PlayableMode } from "../game/types";
import { HUMAN, useGame } from "../hooks/useGame";
import { MARK } from "../theme";
import { Board } from "./Board";
import { ScoreBoard } from "./ScoreBoard";
import { StatusLine } from "./StatusLine";
import { Title } from "./Title";

type GameProps = {
  mode: PlayableMode;
  difficulty: Difficulty;
  onExit: () => void;
};

export function Game({ mode, difficulty, onExit }: GameProps) {
  const {
    squares,
    turn,
    result,
    isDraw,
    gameOver,
    isComputerTurn,
    scores,
    round,
    play,
    newGame,
  } = useGame(mode, difficulty);

  const vsComputer = mode === "computer";

  let status: string;
  if (result) {
    if (!vsComputer) status = `${result.player} wins!`;
    else status = result.player === HUMAN ? "You win!" : "Computer wins!";
  } else if (isDraw) {
    status = "It's a draw";
  } else if (isComputerTurn) {
    status = "Computer is thinking…";
  } else {
    status = vsComputer ? "Your move" : `${turn} to move`;
  }

  const tone = result
    ? MARK[result.player]
    : isDraw
      ? "text-slate-300"
      : "text-slate-400";

  return (
    <div
      className={`relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl transition-shadow duration-500 sm:p-7 ${
        result ? "shadow-[0_0_60px_-15px_rgba(217,70,239,0.7)]" : ""
      }`}>
      {/* Absolute so the header row costs the card no extra height. */}
      <button
        type="button"
        onClick={onExit}
        aria-label="Change mode"
        className="absolute top-4 left-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 sm:top-6 sm:left-6">
        <span aria-hidden="true">←</span>
      </button>

      <Title />
      <StatusLine text={status} tone={tone} />

      <ScoreBoard
        scores={scores}
        mode={mode}
        turn={gameOver ? null : turn}
        isDraw={isDraw}
      />

      <Board
        key={round}
        squares={squares}
        turn={gameOver || isComputerTurn ? null : turn}
        winningLine={result?.line ?? null}
        onPlay={play}
      />

      <button
        type="button"
        onClick={newGame}
        className="mt-5 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 font-bold tracking-widest text-white uppercase transition duration-300 hover:shadow-[0_0_35px_-6px_rgba(217,70,239,0.9)] hover:brightness-110 active:scale-95">
        New Game
      </button>
    </div>
  );
}
