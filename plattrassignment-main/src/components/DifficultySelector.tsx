import React from 'react';
import { useGame } from '../context/GameContext';
import { Layout, LayoutGrid, Grid } from 'lucide-react';

interface DifficultyOption {
  size: number;
  label: string;
  icon: React.ReactNode;
}

const difficulties: DifficultyOption[] = [
  { size: 4, label: 'Easy', icon: <Layout className="w-4 h-4" /> },
  { size: 6, label: 'Medium', icon: <LayoutGrid className="w-4 h-4" /> },
  { size: 8, label: 'Hard', icon: <Grid className="w-4 h-4" /> },
];

export function DifficultySelector() {
  const { setDifficulty, difficulty, resetGame } = useGame();

  const handleDifficultyChange = (size: number) => {
    setDifficulty(size);
    resetGame();
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {difficulties.map(({ size, label, icon }) => (
        <button
          key={size}
          onClick={() => handleDifficultyChange(size)}
          className={`
            px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
            ${difficulty === size
              ? 'bg-white text-indigo-500 shadow-lg scale-105'
              : 'bg-white/20 text-white hover:bg-white/30'
            }
          `}
        >
          {icon}
          <span>{label}</span>
          <span className="text-sm opacity-75">({size}x{size})</span>
        </button>
      ))}
    </div>
  );
}