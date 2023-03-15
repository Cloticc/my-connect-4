import "./App.css";

// src/App.jsx
import React, { useState } from "react";

const rows = 6;
const columns = 7;

const createBoard = () =>
  Array.from({ length: rows }, () => Array(columns).fill(null));

const checkWin = (board, player) => {
  // Check rows for a win
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns - 3; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check columns for a win
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows - 3; row++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonals (top-left to bottom-right) for a win
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < columns - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonals (bottom-left to top-right) for a win
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col < columns - 3; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
};

const App = () => {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winner, setWinner] = useState(null);

  const handleClick = (column) => {
    if (winner) return;

    const newBoard = [...board];
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][column]) {
        newBoard[row][column] = currentPlayer;

        if (checkWin(newBoard, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
        }

        setBoard(newBoard);
        break;
      }
    }
  };

  const handleReset = () => {
    setBoard(createBoard());
    setCurrentPlayer("red");
    setWinner(null);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Connect 4</h1>
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`cell ${cell || ""}`}
                  onClick={() => handleClick(columnIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {winner && <h2>{winner} wins!</h2>}
      <button id="resetButton" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default App;
