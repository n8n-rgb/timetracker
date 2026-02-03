import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Focus } from 'lucide-react';
import { motion } from 'framer-motion';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a sound or notification here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') setTimeLeft(25 * 60);
    else if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'focus' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60)) * 100;

  return (
    <div className="glass p-8 flex flex-col items-center">
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => switchMode('focus')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${mode === 'focus' ? 'bg-primary text-white' : 'text-text-muted hover:text-white transition-colors'}`}
        >
          Focus
        </button>
        <button 
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${mode === 'shortBreak' ? 'bg-secondary text-white' : 'text-text-muted hover:text-white transition-colors'}`}
        >
          Short Break
        </button>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="753.98"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 753.98 * (1 - progress / 100) }}
            className={mode === 'focus' ? 'text-primary' : 'text-secondary'}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-6xl font-bold tracking-tighter">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-6">
        <button 
          onClick={resetTimer}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all transform active:scale-95"
        >
          <RotateCcw size={24} />
        </button>
        <button 
          onClick={toggleTimer}
          className={`p-6 rounded-full ${isActive ? 'bg-accent shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'bg-primary shadow-[0_0_20px_rgba(139,92,246,0.4)]'} text-white transition-all transform hover:scale-110 active:scale-95`}
        >
          {isActive ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
        </button>
      </div>
    </div>
  );
};

export default Timer;
