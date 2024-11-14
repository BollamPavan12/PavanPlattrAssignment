import type { LucideIcon } from 'lucide-react';

export interface Card {
  icon: keyof typeof LucideIcon;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  matches: number;
  flippedIndices: number[];
  isLocked: boolean;
  isPlaying: boolean;
}

export interface GameContextType extends GameState {
  time: number;
  setTime: (time: number) => void;
  gameWon: boolean;
  difficulty: number;
  setDifficulty: (size: number) => void;
  flipCard: (index: number) => void;
  resetGame: () => void;
  totalPairs: number;
}