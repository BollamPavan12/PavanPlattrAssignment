import React from 'react';
import { useGame } from '../context/GameContext';
import { Clock } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

export function Timer() {
  const { time, gameWon, isPlaying } = useGame();
  const { formatTime } = useTimer(isPlaying, gameWon);

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center gap-2">
      <Clock className="w-5 h-5" />
      <span>{formatTime(time)}</span>
    </div>
  );
}