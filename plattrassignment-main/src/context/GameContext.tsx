import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameContextType } from '../types';
import { useCards } from '../hooks/useCards';
import { useTimer } from '../hooks/useTimer';

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [difficulty, setDifficulty] = useState(4);
  const { gameState, initializeCards, flipCard, resetGame: resetCards } = useCards(difficulty);
  const { time, setTime, formatTime } = useTimer(gameState.isPlaying, gameState.matches === (difficulty * difficulty) / 2);

  const totalPairs = (difficulty * difficulty) / 2;
  const gameWon = gameState.matches === totalPairs;

  // Initialize cards when component mounts
  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  // Reset game handler that also resets the timer
  const resetGame = () => {
    resetCards();
    setTime(0);
  };

  const contextValue: GameContextType = {
    ...gameState,
    time,
    setTime,
    gameWon,
    difficulty,
    setDifficulty,
    flipCard,
    resetGame,
    totalPairs
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}