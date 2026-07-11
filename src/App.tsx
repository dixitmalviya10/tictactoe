import { useState } from "react";

type Player = "X" | "O";
type SquareValue = Player | null;
type Line = readonly [number, number, number];
type WinResult = { player: Player; line: Line } | null;

const LINES: readonly Line[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const MARK: Record<Player, string> = {
  X: "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.9)]",
  O: "text-fuchsia-400 drop-shadow-[0_0_18px_rgba(232,121,249,0.9)]",
};

const emptyBoard = () => Array<SquareValue>(9).fill(null);

function calculateWinner(squares: SquareValue[]): WinResult {
  for (const line of LINES) {
    const [a, b, c] = line;
    const player = squares[a];
    if (player && player === squares[b] && player === squares[c]) {
      return { player, line };
    }
  }
  return null;
}

type SquareProps = {
  value: SquareValue;
  index: number;
  isWinning: boolean;
  /** The player about to move, or null once the game is over. */
  turn: Player | null;
  onSquareClick: () => void;
};

function Square({ value, index, isWinning, turn, onSquareClick }: SquareProps) {
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

/** Strike-through drawn across the three winning cells. */
function WinLine({ line }: { line: Line }) {
  const [start, , end] = line;
  const center = (i: number) => [(i % 3) + 0.5, Math.floor(i / 3) + 0.5];
  const [x1, y1] = center(start);
  const [x2, y2] = center(end);

  return (
    <svg
      viewBox="0 0 3 3"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        {/* userSpaceOnUse: a horizontal/vertical line has a zero-area bounding
            box, and an objectBoundingBox gradient on one is never painted. */}
        <linearGradient
          id="win-stroke"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="3"
          y2="3">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#win-stroke)"
        strokeWidth="0.07"
        strokeLinecap="round"
        pathLength={1}
        style={{ strokeDasharray: 1 }}
        className="animate-draw-line drop-shadow-[0_0_10px_rgba(232,121,249,0.9)]"
      />
    </svg>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  active: boolean;
  tone: "cyan" | "fuchsia" | "slate";
};

const TONE: Record<StatCardProps["tone"], { text: string; active: string }> = {
  cyan: {
    text: "text-cyan-300",
    active:
      "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_25px_-6px_rgba(34,211,238,0.9)]",
  },
  fuchsia: {
    text: "text-fuchsia-400",
    active:
      "border-fuchsia-400/60 bg-fuchsia-500/10 shadow-[0_0_25px_-6px_rgba(232,121,249,0.9)]",
  },
  slate: { text: "text-slate-300", active: "" },
};

function StatCard({ label, value, active, tone }: StatCardProps) {
  const styles = TONE[tone];
  return (
    <div
      className={`rounded-2xl border px-2 py-2 text-center transition duration-300 ${
        active
          ? `scale-105 ${styles.active}`
          : "border-white/10 bg-white/5 opacity-70"
      }`}>
      <div className={`text-xl font-black ${styles.text}`}>{label}</div>
      <div className="text-xs font-semibold tracking-wider text-slate-400 tabular-nums">
        {value}
      </div>
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState<SquareValue[]>(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [round, setRound] = useState(0);

  const result = calculateWinner(squares);
  const isDraw = result === null && squares.every((square) => square !== null);
  const gameOver = result !== null || isDraw;
  const turn: Player = xIsNext ? "X" : "O";

  function handleClick(i: number) {
    if (squares[i] || gameOver) return;

    const next = squares.slice();
    next[i] = turn;
    setSquares(next);
    setXIsNext((prev) => !prev);

    const outcome = calculateWinner(next);
    if (outcome) {
      setScores((prev) => ({
        ...prev,
        [outcome.player]: prev[outcome.player] + 1,
      }));
    } else if (next.every((square) => square !== null)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  }

  function newGame() {
    setSquares(emptyBoard());
    setXIsNext(true);
    setRound((prev) => prev + 1);
  }

  let status: string;
  if (result) {
    status = `${result.player} wins!`;
  } else if (isDraw) {
    status = "It's a draw";
  } else {
    status = `${turn} to move`;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="animate-blob absolute -right-16 -bottom-24 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl [animation-delay:-7s]" />
        <div className="animate-blob absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl [animation-delay:-14s]" />
      </div>

      <div
        className={`relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl transition-shadow duration-500 sm:p-7 ${
          result ? "shadow-[0_0_60px_-15px_rgba(217,70,239,0.7)]" : ""
        }`}>
        <h1 className="animate-gradient-x bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-[length:200%_auto] bg-clip-text text-center text-3xl font-black tracking-[0.2em] text-transparent sm:text-4xl">
          TIC TAC TOE
        </h1>

        <p
          key={status}
          aria-live="polite"
          className={`animate-rise mt-2 text-center text-sm font-semibold tracking-widest uppercase ${
            result
              ? MARK[result.player]
              : isDraw
                ? "text-slate-300"
                : "text-slate-400"
          }`}>
          {status}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <StatCard
            label="X"
            value={scores.X}
            tone="cyan"
            active={!gameOver && turn === "X"}
          />
          <StatCard
            label="Draw"
            value={scores.draws}
            tone="slate"
            active={isDraw}
          />
          <StatCard
            label="O"
            value={scores.O}
            tone="fuchsia"
            active={!gameOver && turn === "O"}
          />
        </div>

        <div key={round} className="relative mt-5 grid grid-cols-3">
          {squares.map((value, i) => (
            <Square
              key={i}
              index={i}
              value={value}
              isWinning={result?.line.includes(i) ?? false}
              turn={gameOver ? null : turn}
              onSquareClick={() => handleClick(i)}
            />
          ))}
          {result && <WinLine line={result.line} />}
        </div>

        <button
          type="button"
          onClick={newGame}
          className="mt-5 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 font-bold tracking-widest text-white uppercase transition duration-300 hover:shadow-[0_0_35px_-6px_rgba(217,70,239,0.9)] hover:brightness-110 active:scale-95">
          New Game
        </button>
      </div>
    </main>
  );
}

export default App;
