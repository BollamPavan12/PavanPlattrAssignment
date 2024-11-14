import React from 'react';
import { useGame } from '../context/GameContext';
import { RotateCcw, Move } from 'lucide-react';

export function Stats() {
  const { moves, resetGame } = useGame();

  return (
    <div className="flex items-center gap-4">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center gap-2">
        <Move className="w-5 h-5" />
        <span className="font-medium">Moves:</span>
        <span>{moves}</span>
      </div>
      
      <button
        onClick={resetGame}
        className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-white/30 transition-colors"
        title="Reset Game"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
}