"use client";

import { useEffect, useState } from "react";

type Board = number[][];

const GRID_SIZE = 4;

const initializeBoard = (): Board => {
  return Array(GRID_SIZE)
    .fill(0)
    .map(() => Array(GRID_SIZE).fill(0));
};

const addRandomTile = (board: Board): Board => {
  const emptyPositions: [number, number][] = [];
  
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        emptyPositions.push([i, j]);
      }
    });
  });

  if (emptyPositions.length === 0) return board;

  const [i, j] = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
  
  return newBoard;
};

const startNewGame = (): Board => {
  let board = initializeBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

export default function Home() {
  const [board, setBoard] = useState<Board>(startNewGame());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const savedBestScore = localStorage.getItem("bestScore2048");
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore2048", score.toString());
    }
  }, [score, bestScore]);

  const canMove = (board: Board): boolean => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board[i][j] === 0) return true;
        if (j < GRID_SIZE - 1 && board[i][j] === board[i][j + 1]) return true;
        if (i < GRID_SIZE - 1 && board[i][j] === board[i + 1][j]) return true;
      }
    }
    return false;
  };

  const moveLeft = (board: Board): [Board, number] => {
    let newScore = 0;
    const newBoard = board.map(row => {
      const nonZero = row.filter(cell => cell !== 0);
      const merged: number[] = [];
      
      for (let i = 0; i < nonZero.length; i++) {
        if (i < nonZero.length - 1 && nonZero[i] === nonZero[i + 1]) {
          merged.push(nonZero[i] * 2);
          newScore += nonZero[i] * 2;
          i++;
        } else {
          merged.push(nonZero[i]);
        }
      }
      
      while (merged.length < GRID_SIZE) {
        merged.push(0);
      }
      
      return merged;
    });
    
    return [newBoard, newScore];
  };

  const rotateBoard = (board: Board): Board => {
    const newBoard = initializeBoard();
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        newBoard[j][GRID_SIZE - 1 - i] = board[i][j];
      }
    }
    return newBoard;
  };

  const boardsEqual = (board1: Board, board2: Board): boolean => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board1[i][j] !== board2[i][j]) return false;
      }
    }
    return true;
  };

  const move = (direction: "left" | "right" | "up" | "down") => {
    if (gameOver) return;

    let currentBoard = board.map(row => [...row]);
    let rotations = 0;

    if (direction === "right") rotations = 2;
    else if (direction === "up") rotations = 1;
    else if (direction === "down") rotations = 3;

    for (let i = 0; i < rotations; i++) {
      currentBoard = rotateBoard(currentBoard);
    }

    const [movedBoard, earnedScore] = moveLeft(currentBoard);

    for (let i = 0; i < rotations; i++) {
      currentBoard = rotateBoard(rotateBoard(rotateBoard(movedBoard)));
    }
    if (rotations > 0) {
      for (let i = 0; i < (4 - rotations); i++) {
        currentBoard = rotateBoard(currentBoard);
      }
    } else {
      currentBoard = movedBoard;
    }

    if (!boardsEqual(board, currentBoard)) {
      const newBoard = addRandomTile(currentBoard);
      setBoard(newBoard);
      setScore(prev => prev + earnedScore);

      if (!canMove(newBoard)) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        
        if (e.key === "ArrowLeft") move("left");
        else if (e.key === "ArrowRight") move("right");
        else if (e.key === "ArrowUp") move("up");
        else if (e.key === "ArrowDown") move("down");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver]);

  const handleNewGame = () => {
    setBoard(startNewGame());
    setScore(0);
    setGameOver(false);
  };

  const getTileColor = (value: number): string => {
    const colors: { [key: number]: string } = {
      0: "bg-gray-300",
      2: "bg-yellow-100",
      4: "bg-yellow-200",
      8: "bg-orange-300",
      16: "bg-orange-400",
      32: "bg-orange-500",
      64: "bg-red-400",
      128: "bg-yellow-400",
      256: "bg-yellow-500",
      512: "bg-yellow-600",
      1024: "bg-yellow-700",
      2048: "bg-yellow-800",
    };
    return colors[value] || "bg-yellow-900";
  };

  const getTileTextColor = (value: number): string => {
    return value > 4 ? "text-white" : "text-gray-800";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-bold text-gray-800">2048</h1>
            <div className="flex gap-3">
              <div className="bg-orange-400 rounded-lg px-4 py-2 text-center">
                <div className="text-xs font-semibold text-white uppercase">점수</div>
                <div className="text-2xl font-bold text-white">{score}</div>
              </div>
              <div className="bg-orange-500 rounded-lg px-4 py-2 text-center">
                <div className="text-xs font-semibold text-white uppercase">최고</div>
                <div className="text-2xl font-bold text-white">{bestScore}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              방향키로 타일을 움직여 <strong>2048</strong>을 만드세요!
            </p>
            <button
              onClick={handleNewGame}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              새 게임
            </button>
          </div>
        </div>

        <div className="bg-orange-400 rounded-xl p-4 relative">
          <div className="grid grid-cols-4 gap-4">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center
                    font-bold text-2xl transition-all duration-150
                    ${getTileColor(cell)}
                    ${getTileTextColor(cell)}
                    ${cell === 0 ? "" : "shadow-md"}
                  `}
                >
                  {cell !== 0 && cell}
                </div>
              ))
            )}
          </div>

          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">게임 오버!</h2>
                <p className="text-gray-600 mb-4">최종 점수: {score}</p>
                <button
                  onClick={handleNewGame}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  다시 시작
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-gray-600 text-sm">
          <p>키보드 방향키로 조작하세요</p>
        </div>
      </div>
    </main>
  );
}
