import React from 'react';
import { useGame } from '../context/GameContext';
import { Move, Clock, Trophy } from 'lucide-react';

export function GameStats() {
  const { moves, time, matches, totalPairs } = useGame();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-8">
      <StatCard icon={<Move />} label="Moves" value={moves} />
      <StatCard icon={<Clock />} label="Time" value={formatTime(time)} />
      <StatCard 
        icon={<Trophy className="text-yellow-300" />} 
        label="Progress" 
        value={`${matches}/${totalPairs}`} 
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">{label}:</span>
      </div>
      <span className="font-bold">{value}</span>
    </div>
  );
}