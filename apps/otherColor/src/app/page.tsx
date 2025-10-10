"use client";

import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [stage, setStage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [correctColor, setCorrectColor] = useState("");
  const [wrongColor, setWrongColor] = useState("");

  const getGridSize = (currentStage: number) => {
    return 2 + Math.floor((currentStage - 1) / 2);
  };

  const gridSize = getGridSize(stage);

  const generateColors = useCallback((currentStage: number) => {
    const baseColor = {
      r: Math.floor(Math.random() * 200) + 55,
      g: Math.floor(Math.random() * 200) + 55,
      b: Math.floor(Math.random() * 200) + 55,
    };

    const colorDifference = Math.max(10, 80 - currentStage * 5);

    const correctColorObj = {
      r: Math.min(255, baseColor.r + colorDifference),
      g: Math.min(255, baseColor.g + colorDifference),
      b: Math.min(255, baseColor.b + colorDifference),
    };

    return {
      correct: `rgb(${correctColorObj.r}, ${correctColorObj.g}, ${correctColorObj.b})`,
      wrong: `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`,
    };
  }, []);

  const initializeStage = useCallback(() => {
    const colors = generateColors(stage);
    setCorrectColor(colors.correct);
    setWrongColor(colors.wrong);
    const totalTiles = gridSize * gridSize;
    setCorrectIndex(Math.floor(Math.random() * totalTiles));
    setTimeLeft(15);
  }, [stage, gridSize, generateColors]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      initializeStage();
    }
  }, [stage, gameStarted, gameOver, initializeStage]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  const handleTileClick = (index: number) => {
    if (gameOver) return;

    if (index === correctIndex) {
      const stageBonus = stage * 100;
      const timeBonus = timeLeft * 10;
      setScore((prev: number) => prev + stageBonus + timeBonus);
      setStage((prev: number) => prev + 1);
    } else {
      setTimeLeft((prev: number) => {
        const newTime = prev - 3;
        if (newTime <= 0) {
          setGameOver(true);
          return 0;
        }
        return newTime;
      });
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setStage(1);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
  };

  const restartGame = () => {
    startGame();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 drop-shadow-lg">
            다른색깔 찾기
          </h1>
          <p className="text-2xl text-white/90 mb-8">
            다른 색깔의 타일을 찾아보세요!
          </p>
          <button
            onClick={startGame}
            className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            게임 시작
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-pink-500 to-orange-500">
        <div className="text-center bg-white/10 backdrop-blur-md p-12 rounded-3xl border-2 border-white/20">
          <h1 className="text-6xl font-bold text-white mb-6">게임 오버</h1>
          <p className="text-3xl text-white mb-4">최종 점수: {score}</p>
          <p className="text-2xl text-white/80 mb-8">
            도달 스테이지: {stage}
          </p>
          <button
            onClick={restartGame}
            className="px-10 py-4 bg-white text-pink-600 rounded-full font-bold text-xl hover:bg-pink-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            다시 시작
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border-2 border-white/20">
          <div className="text-center">
            <p className="text-white/70 text-sm font-medium mb-1">스테이지</p>
            <p className="text-white text-4xl font-bold">{stage}</p>
          </div>
          <div className="text-center">
            <p className="text-white/70 text-sm font-medium mb-1">남은 시간</p>
            <p
              className={`text-4xl font-bold ${
                timeLeft <= 5 ? "text-red-300 animate-pulse" : "text-white"
              }`}
            >
              {timeLeft}초
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/70 text-sm font-medium mb-1">점수</p>
            <p className="text-white text-4xl font-bold">{score}</p>
          </div>
        </div>

        <div
          className="grid gap-3 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            maxWidth: `${Math.min(600, gridSize * 120)}px`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleTileClick(index)}
              className="aspect-square rounded-lg transition-all hover:scale-105 hover:shadow-2xl active:scale-95 border-2 border-white/20"
              style={{
                backgroundColor:
                  index === correctIndex ? correctColor : wrongColor,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


