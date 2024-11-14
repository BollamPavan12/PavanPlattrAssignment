import React from 'react';
import { useGame } from '../context/GameContext';
import * as Icons from 'lucide-react';

interface CardProps {
  index: number;
  icon: keyof typeof Icons;
  isFlipped: boolean;
  isMatched: boolean;
}

export function Card({ index, icon, isFlipped, isMatched }: CardProps) {
  const { flipCard } = useGame();
  const IconComponent = Icons[icon];

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      flipCard(index);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative aspect-square cursor-pointer
        transition-all duration-300 perspective-1000
        ${isMatched ? 'opacity-60 animate-matchPulse' : ''}
        ${!isMatched && !isFlipped ? 'hover:scale-105' : ''}
      `}
    >
      <div 
        className={`
          relative w-full h-full transition-all duration-500 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        {/* Front face */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-indigo-500 text-2xl font-bold">?</div>
          </div>
        </div>
        
        {/* Back face */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl shadow-lg flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}