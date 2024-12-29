import React, { useState } from "react";
import styles from "./TicTacToe.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameWinner, setGameWinner] = useState(null);
  const [matchWinner, setMatchWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || gameWinner || matchWinner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameWinner(winner);
      updateScores(winner);
    }
  };

  const calculateWinner = (board) => {
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
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const updateScores = (winner) => {
    const newScores = { ...scores, [winner]: scores[winner] + 1 };
    setScores(newScores);

    if (newScores[winner] === 3) {
      setMatchWinner(winner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameWinner(null);
  };

  const resetMatch = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ X: 0, O: 0 });
    setGameWinner(null);
    setMatchWinner(null);
  };

  return (
    <div className={`${styles.game} container text-center`}>
      <h1 className="mb-4">Tic Tac Toe - Best of Three</h1>
      <div className={`${styles.scoreboard} row mb-4`}>
        <div className="col">
          <h4>Player X: {scores.X}</h4>
        </div>
        <div className="col">
          <h4>Player O: {scores.O}</h4>
        </div>
      </div>
      <div className={`${styles.board} row`}>
        {board.map((cell, index) => (
          <div
            key={index}
            className={`${styles.cell} col-4 border`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {gameWinner && (
        <p className="mt-3">
          Game Winner: <strong>{gameWinner}</strong>
        </p>
      )}
      {matchWinner ? (
        <p className={`${styles.matchWinner} mt-3`}>
          Match Winner: <strong>{matchWinner}</strong>!
        </p>
      ) : (
        <p className="mt-3">Next Player: {isXNext ? "X" : "O"}</p>
      )}
      <button className="btn btn-primary mt-3 me-2" onClick={resetGame}>
        Next Game
      </button>
      <button className="btn btn-danger mt-3" onClick={resetMatch}>
        Reset Match
      </button>
    </div>
  );
};

export default TicTacToe;
