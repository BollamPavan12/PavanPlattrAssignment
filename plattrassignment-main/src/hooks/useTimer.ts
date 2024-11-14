import { useState, useEffect } from 'react';

export function useTimer(isPlaying: boolean, gameWon: boolean) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number;
    
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return { time, setTime, formatTime };
}