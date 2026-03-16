import { useSanctuary } from "@/contexts/SanctuaryContext";
import { motion, AnimatePresence } from 'framer-motion';

export function BreathingGuide() {
  const { breath } = useSanctuary();

  const getPhaseText = () => {
    switch (breath.stage) {
      case 'inhale': return '…breathe in…';
      case 'hold': return '…hold…';
      case 'exhale': return '…breathe out…';
      case 'rest': return '…rest…';
    }
  };

  const stageProgress = breath.progress;

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-4">
      {/* Breathing Ring */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#D4AF8F]/10 bg-[#D4AF8F]/5 shadow-[0_0_50px_rgba(212,175,143,0.1)]"
          animate={{ 
            scale: breath.stage === 'inhale' || breath.stage === 'hold' ? 1.4 : 0.9,
            opacity: breath.stage === 'inhale' ? 0.8 : 0.4
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        
        {/* Progress Circle (SVG) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="#D4AF8F"
            strokeWidth="2"
            strokeDasharray="100 100"
            strokeDashoffset={100 - (stageProgress * 100)}
            className="transition-all duration-100 ease-linear opacity-20"
          />
        </svg>

        {/* Center Text */}
        <div className="relative z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={breath.stage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-lg font-serif text-[#2D1B0E]"
            >
              {getPhaseText()}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-[#8B735B]">
        <p className="font-light">Sync your breath with Rin</p>
        <p className="text-xs mt-1 opacity-60">Inhale 4s • Hold 4s • Exhale 6s • Rest 2s</p>
      </div>
    </div>
  );
}
