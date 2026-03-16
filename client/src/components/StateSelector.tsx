import { motion } from 'framer-motion';

interface StateSelectorProps {
  currentState: 'calm' | 'activated' | 'overwhelmed' | 'default';
  onStateChange: (state: 'calm' | 'activated' | 'overwhelmed' | 'default') => void;
}

const states = [
  {
    id: 'calm',
    label: '…calm…',
    description: 'Grounded and present',
    color: 'from-amber-100 to-amber-50',
    borderColor: 'border-amber-300',
  },
  {
    id: 'activated',
    label: '…activated…',
    description: 'Alert and engaged',
    color: 'from-rose-100 to-rose-50',
    borderColor: 'border-rose-300',
  },
  {
    id: 'overwhelmed',
    label: '…overwhelmed…',
    description: 'Need support',
    color: 'from-purple-100 to-purple-50',
    borderColor: 'border-purple-300',
  },
  {
    id: 'default',
    label: '…neutral…',
    description: 'Just here',
    color: 'from-slate-100 to-slate-50',
    borderColor: 'border-slate-300',
  },
];

export function StateSelector({ currentState, onStateChange }: StateSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-slate-600 font-light">…how are you right now?…</p>
      <div className="grid grid-cols-2 gap-3">
        {states.map((state) => (
          <motion.button
            key={state.id}
            onClick={() => onStateChange(state.id as any)}
            className={`
              relative p-4 rounded-lg border-2 transition-all
              ${state.borderColor}
              ${currentState === state.id
                ? `bg-gradient-to-br ${state.color} shadow-md`
                : 'bg-white hover:shadow-sm'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-left">
              <p className="text-sm font-light text-slate-800">{state.label}</p>
              <p className="text-xs text-slate-500 mt-1">{state.description}</p>
            </div>
            {currentState === state.id && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-current"
                layoutId="selectedState"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
