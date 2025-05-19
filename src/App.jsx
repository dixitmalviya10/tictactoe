import React from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="border-2 h-28 sm:h-36 border-gray-800 bg-gray-200 text-7xl font-bold text-gray-800 hover:bg-gray-300">
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextTurn, setNextTurn] = React.useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (nextTurn) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setNextTurn((prev) => !prev);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!winner && !squares.includes(null)) {
    status = "Draw";
  } else {
    status = nextTurn ? "X" : "O";
  }
  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
      <div className="p-2 max-w-[600px] w-full shadow-xl rounded-lg text-center text-amber-300 bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h3
            className={`${
              status === "X" ? "animate-bounce" : ""
            } text-lg sm:text-2xl font-bold text-gray-800 bg-amber-300 w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full`}>
            X
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl">
            {winner || (!winner && !squares.includes(null))
              ? status
              : "Tic - Tac - Toe"}
          </h1>
          <h3
            className={`${
              status === "O" ? "animate-bounce" : ""
            } text-lg sm:text-2xl font-bold text-gray-800 bg-amber-300 w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full`}>
            O
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-1 mb-1">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="grid grid-cols-3 gap-1 mb-1">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

export default App;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
