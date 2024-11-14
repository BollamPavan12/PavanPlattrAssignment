import React from 'react';
import { useGame } from '../context/GameContext';
import { Grid } from './Grid';
import { GameStats } from './GameStats';
import { DifficultySelector } from './DifficultySelector';
import { Trophy } from 'lucide-react';

export default function Game() {
  const { gameWon, moves, time, resetGame, difficulty } = useGame();

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-white text-center">Memory Match</h1>
      
      {gameWon ? (
        <div className="bg-white rounded-lg p-8 text-center animate-fadeIn shadow-xl max-w-md w-full">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-gray-600">You've completed the game!</p>
            <div className="flex justify-center gap-4">
              <div className="bg-indigo-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-indigo-600">{moves}</p>
                <p className="text-sm text-indigo-600">Moves</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-purple-600">{time}</p>
                <p className="text-sm text-purple-600">Seconds</p>
              </div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <GameStats />
          <DifficultySelector />
          <Grid size={difficulty} />
        </>
      )}
    </div>
  );
}