import { useSanctuary, SomaticState } from "@/contexts/SanctuaryContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const STATES: { id: SomaticState; label: string; description: string }[] = [
  { id: 'calm', label: 'Calm', description: 'Resting in the sanctuary' },
  { id: 'activated', label: 'Activated', description: 'Energetic and present' },
  { id: 'overwhelmed', label: 'Overwhelmed', description: 'Seeking a quiet anchor' },
  { id: 'grounded', label: 'Grounded', description: 'Returning to baseline' }
];

export function StateSelector() {
  const { somaticState, setSomaticState } = useSanctuary();

  return (
    <div className="grid grid-cols-2 gap-4">
      {STATES.map((state) => (
        <button
          key={state.id}
          onClick={() => setSomaticState(state.id)}
          className={cn(
            "p-4 rounded-2xl border transition-all duration-500 text-left group relative overflow-hidden",
            somaticState === state.id 
              ? "bg-white border-[#D4AF8F] shadow-md scale-[1.02]" 
              : "bg-white/20 border-transparent hover:bg-white/40"
          )}
        >
          <span className="block font-serif text-lg text-[#2D1B0E] relative z-10">{state.label}</span>
          <span className="block text-xs text-[#8B735B] mt-1 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
            {state.description}
          </span>
          {somaticState === state.id && (
            <motion.div 
              layoutId="active-bg"
              className="absolute inset-0 bg-[#D4AF8F]/5 z-0"
              transition={{ duration: 0.5 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
