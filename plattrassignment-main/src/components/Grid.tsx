import React from 'react';
import { Card } from './Card';
import { useGame } from '../context/GameContext';

interface GridProps {
  size: number;
}

export function Grid({ size }: GridProps) {
  const { cards } = useGame();
  
  return (
    <div 
      className="grid gap-4 w-full max-w-4xl mx-auto"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      }}
    >
      {cards.map((card, index) => (
        <Card key={index} index={index} {...card} />
      ))}
    </div>
  );
}