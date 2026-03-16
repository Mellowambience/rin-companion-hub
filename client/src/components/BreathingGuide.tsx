import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BreathingGuideProps {
  onPhaseChange?: (phase: number) => void;
  isActive?: boolean;
}

const BREATH_CYCLE = {
  inhale: 4,    // 4 seconds
  hold: 4,      // 4 seconds
  exhale: 6,    // 6 seconds
  rest: 2,      // 2 seconds
};

const TOTAL_CYCLE = BREATH_CYCLE.inhale + BREATH_CYCLE.hold + BREATH_CYCLE.exhale + BREATH_CYCLE.rest;

export function BreathingGuide({ onPhaseChange, isActive = false }: BreathingGuideProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(isActive);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.016; // ~60fps
        
        if (next >= TOTAL_CYCLE) {
          setCycleCount((c) => c + 1);
          return 0;
        }

        // Determine current phase
        let currentPhase: 'inhale' | 'hold' | 'exhale' | 'rest';
        if (next < BREATH_CYCLE.inhale) {
          currentPhase = 'inhale';
        } else if (next < BREATH_CYCLE.inhale + BREATH_CYCLE.hold) {
          currentPhase = 'hold';
        } else if (next < BREATH_CYCLE.inhale + BREATH_CYCLE.hold + BREATH_CYCLE.exhale) {
          currentPhase = 'exhale';
        } else {
          currentPhase = 'rest';
        }

        setPhase(currentPhase);
        onPhaseChange?.(next / TOTAL_CYCLE);

        return next;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isRunning, onPhaseChange]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return '…breathe in…';
      case 'hold':
        return '…hold…';
      case 'exhale':
        return '…breathe out…';
      case 'rest':
        return '…rest…';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-amber-100 to-amber-50';
      case 'hold':
        return 'from-rose-100 to-rose-50';
      case 'exhale':
        return 'from-purple-100 to-purple-50';
      case 'rest':
        return 'from-slate-100 to-slate-50';
    }
  };

  const scaleValue = {
    inhale: 1.3,
    hold: 1.3,
    exhale: 0.8,
    rest: 0.8,
  }[phase];

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      {/* Breathing Ring */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          className={`absolute inset-0 rounded-full border-4 border-amber-200 bg-gradient-to-br ${getPhaseColor()} shadow-lg`}
          animate={{ scale: scaleValue }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        
        {/* Inner circle */}
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-br from-white to-amber-50 shadow-inner"
          animate={{ scale: scaleValue * 0.8 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Center text */}
        <div className="relative z-10 text-center">
          <motion.p
            className="text-lg font-light text-amber-800"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getPhaseText()}
          </motion.p>
          <p className="text-sm text-amber-600 mt-2">Cycle {cycleCount + 1}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-200 to-rose-100 text-amber-900 font-light hover:shadow-md transition-shadow"
        >
          {isRunning ? '…pause…' : '…breathe…'}
        </button>
        <button
          onClick={() => {
            setProgress(0);
            setPhase('inhale');
            setCycleCount(0);
          }}
          className="px-6 py-2 rounded-full bg-slate-100 text-slate-700 font-light hover:shadow-md transition-shadow"
        >
          …reset…
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-slate-600 max-w-sm">
        <p className="font-light">Breathe with Rin. Let your breath guide you.</p>
        <p className="text-xs mt-2 text-slate-500">Inhale 4s • Hold 4s • Exhale 6s • Rest 2s</p>
      </div>
    </div>
  );
}
