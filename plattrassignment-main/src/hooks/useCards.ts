import { useState, useCallback } from 'react';
import { Card } from '../types';
import { shuffleArray } from '../utils/array';
import { ICONS } from '../utils/icons';

export function useCards(difficulty: number) {
  const [gameState, setGameState] = useState({
    cards: [] as Card[],
    moves: 0,
    matches: 0,
    flippedIndices: [] as number[],
    isLocked: false,
    isPlaying: false
  });

  const initializeCards = useCallback(() => {
    const totalCards = difficulty * difficulty;
    const selectedIcons = shuffleArray(ICONS).slice(0, totalCards / 2);
    const cardPairs = [...selectedIcons, ...selectedIcons];
    const shuffledCards = shuffleArray(cardPairs).map(icon => ({
      icon,
      isFlipped: false,
      isMatched: false,
    }));
    
    setGameState(prev => ({ ...prev, cards: shuffledCards }));
  }, [difficulty]);

  const flipCard = (index: number) => {
    if (gameState.isLocked || gameState.cards[index].isMatched) return;
    if (gameState.flippedIndices.includes(index)) return;
    
    setGameState(prev => {
      // If two cards are already flipped, return early
      if (prev.flippedIndices.length === 2) return prev;

      const newCards = [...prev.cards];
      newCards[index] = { ...newCards[index], isFlipped: true };
      const newFlippedIndices = [...prev.flippedIndices, index];

      // If this is the second card flipped
      if (newFlippedIndices.length === 2) {
        const [firstIndex, secondIndex] = newFlippedIndices;
        const isMatch = newCards[firstIndex].icon === newCards[secondIndex].icon;

        if (isMatch) {
          // Mark cards as matched
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          return {
            ...prev,
            cards: newCards,
            flippedIndices: [],
            matches: prev.matches + 1,
            moves: prev.moves + 1,
            isPlaying: true
          };
        }

        // If no match, flip cards back after delay
        setTimeout(() => {
          setGameState(current => {
            const resetCards = [...current.cards];
            resetCards[firstIndex].isFlipped = false;
            resetCards[secondIndex].isFlipped = false;
            return {
              ...current,
              cards: resetCards,
              flippedIndices: [],
              isLocked: false
            };
          });
        }, 1000);

        return {
          ...prev,
          cards: newCards,
          flippedIndices: newFlippedIndices,
          moves: prev.moves + 1,
          isLocked: true,
          isPlaying: true
        };
      }

      // First card flip
      return {
        ...prev,
        cards: newCards,
        flippedIndices: newFlippedIndices,
        isPlaying: true
      };
    });
  };

  const resetGame = () => {
    setGameState({
      cards: [],
      moves: 0,
      matches: 0,
      flippedIndices: [],
      isLocked: false,
      isPlaying: false
    });
    initializeCards();
  };

  return {
    gameState,
    initializeCards,
    flipCard,
    resetGame
  };
}