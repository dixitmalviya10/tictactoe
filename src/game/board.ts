import type { Line, Player, SquareValue, WinResult } from "./types";

export const LINES: readonly Line[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const emptyBoard = () => Array<SquareValue>(9).fill(null);

export function calculateWinner(squares: SquareValue[]): WinResult {
  for (const line of LINES) {
    const [a, b, c] = line;
    const player = squares[a];
    if (player && player === squares[b] && player === squares[c]) {
      return { player, line };
    }
  }
  return null;
}

export const isFull = (squares: SquareValue[]) =>
  squares.every((square) => square !== null);

export function emptyIndices(squares: SquareValue[]): number[] {
  const open: number[] = [];
  squares.forEach((square, i) => {
    if (square === null) open.push(i);
  });
  return open;
}

export const opponentOf = (player: Player): Player =>
  player === "X" ? "O" : "X";
