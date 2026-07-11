import { useCallback, useEffect, useState } from "react";

import { pickComputerMove } from "../game/ai";
import { calculateWinner, emptyBoard, isFull } from "../game/board";
import type {
  Difficulty,
  Player,
  PlayableMode,
  SquareValue,
} from "../game/types";

export const HUMAN: Player = "X";
export const COMPUTER: Player = "O";

/** A beat before the computer answers, so its move reads as a reply. */
const THINKING_MS = 450;

export function useGame(mode: PlayableMode, difficulty: Difficulty) {
  const [squares, setSquares] = useState<SquareValue[]>(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [round, setRound] = useState(0);

  const result = calculateWinner(squares);
  const isDraw = result === null && isFull(squares);
  const gameOver = result !== null || isDraw;
  const turn: Player = xIsNext ? "X" : "O";
  const isComputerTurn = mode === "computer" && !gameOver && turn === COMPUTER;

  const play = useCallback(
    (i: number) => {
      if (gameOver || squares[i]) return;

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
      } else if (isFull(next)) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }
    },
    [gameOver, squares, turn],
  );

  useEffect(() => {
    if (!isComputerTurn) return;

    const timer = setTimeout(() => {
      const move = pickComputerMove(squares, COMPUTER, difficulty);
      if (move !== null) play(move);
    }, THINKING_MS);

    return () => clearTimeout(timer);
  }, [isComputerTurn, squares, difficulty, play]);

  const newGame = useCallback(() => {
    setSquares(emptyBoard());
    setXIsNext(true);
    setRound((prev) => prev + 1);
  }, []);

  return {
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
  };
}
