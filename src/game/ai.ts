import { calculateWinner, emptyIndices, isFull, opponentOf } from "./board";
import type { Difficulty, Player, SquareValue } from "./types";

/** How often "medium" throws the game by playing at random instead of optimally. */
const MEDIUM_BLUNDER_RATE = 0.45;

/**
 * Score a finished board from `me`'s perspective, or null while it is still live.
 * Depth is folded in so a win that arrives sooner outranks a slower one — without
 * it the search happily stalls a forced win.
 */
function terminalScore(
  squares: SquareValue[],
  me: Player,
  depth: number,
): number | null {
  const result = calculateWinner(squares);
  if (result) return result.player === me ? 10 - depth : depth - 10;
  if (isFull(squares)) return 0;
  return null;
}

function minimax(
  squares: SquareValue[],
  me: Player,
  turn: Player,
  depth: number,
): number {
  const settled = terminalScore(squares, me, depth);
  if (settled !== null) return settled;

  const scores = emptyIndices(squares).map((i) => {
    const next = squares.slice();
    next[i] = turn;
    return minimax(next, me, opponentOf(turn), depth + 1);
  });

  return turn === me ? Math.max(...scores) : Math.min(...scores);
}

/** Every move that ties for the best outcome, so the computer is not predictable. */
function bestMoves(squares: SquareValue[], me: Player): number[] {
  let best = -Infinity;
  let moves: number[] = [];

  for (const i of emptyIndices(squares)) {
    const next = squares.slice();
    next[i] = me;
    const score = minimax(next, me, opponentOf(me), 1);

    if (score > best) {
      best = score;
      moves = [i];
    } else if (score === best) {
      moves.push(i);
    }
  }

  return moves;
}

const pickOne = (moves: number[]) =>
  moves[Math.floor(Math.random() * moves.length)];

/** The square the computer plays, or null if the board is already full. */
export function pickComputerMove(
  squares: SquareValue[],
  me: Player,
  difficulty: Difficulty,
): number | null {
  const open = emptyIndices(squares);
  if (open.length === 0) return null;

  if (difficulty === "easy") return pickOne(open);
  if (difficulty === "medium" && Math.random() < MEDIUM_BLUNDER_RATE) {
    return pickOne(open);
  }
  return pickOne(bestMoves(squares, me));
}
