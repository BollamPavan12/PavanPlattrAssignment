import React from 'react';
import { useGame } from '../context/GameContext';

export function Settings() {
  const { setDifficulty, difficulty, resetGame } = useGame();

  const handleDifficultyChange = (newDifficulty: number) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  return (
    <div className="flex justify-center gap-4 mb-8">
      {[4, 6, 8].map((size) => (
        <button
          key={size}
          onClick={() => handleDifficultyChange(size)}
          className={`
            px-4 py-2 rounded-lg transition-colors
            ${difficulty === size
              ? 'bg-white text-indigo-500 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
            }
          `}
        >
          {size}x{size}
        </button>
      ))}
    </div>
  );
}