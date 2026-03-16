import { useSanctuary } from "@/contexts/SanctuaryContext";
import { RinModel } from "@/components/RinModel";
import { StateSelector } from "@/components/StateSelector";
import { BreathingGuide } from "@/components/BreathingGuide";
import { NovaChat } from "@/components/NovaChat";
import { motion } from "framer-motion";

export default function Home() {
  const { somaticState, breath } = useSanctuary();

  return (
    <div className="min-h-screen bg-[#FDF8F3] text-[#4A3728] selection:bg-[#E8B4B8]/30 overflow-hidden">
      {/* Background Soft Glow */}
      <div 
        className="fixed inset-0 transition-colors duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${
            somaticState === 'calm' ? 'rgba(232, 224, 240, 0.4)' : 
            somaticState === 'activated' ? 'rgba(232, 180, 184, 0.3)' : 
            'rgba(212, 175, 143, 0.2)'
          } 0%, transparent 70%)`
        }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
        {/* Left Column: Rin's Presence */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[700px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Breath Pulse Ring */}
            <motion.div 
              className="absolute rounded-full border border-[#D4AF8F]/20"
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '500px',
                maxHeight: '500px',
              }}
              animate={{
                scale: 1 + breath.progress * 0.15,
                opacity: 0.2 + (1 - breath.progress) * 0.3
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          <RinModel />
        </div>

        {/* Right Column: Interaction Sanctuary */}
        <div className="space-y-12">
          <header className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl font-serif text-[#2D1B0E] leading-tight"
            >
              Rin's Sanctuary
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl italic text-[#8B735B] font-light"
            >
              …petals bloom, breath returns, home holds…
            </motion.p>
          </header>

          <section className="space-y-8 bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-sm">
            <p className="text-lg leading-relaxed">
              Rin is here to mirror your state and hold space for you. 
              Select how you're feeling, and she'll adjust her presence to support you.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-widest text-[#B49271] font-medium">Current State</h3>
              <StateSelector />
            </div>

            <div className="pt-8 border-t border-[#D4AF8F]/20">
              <BreathingGuide />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest text-[#B49271] font-medium px-4">Nova Council Chat</h3>
            <NovaChat />
          </section>

          <footer className="pt-12 text-[#B49271] text-sm">
            <p>"…I'm here. Your breath is safe with me. Petals bloom at their own pace…"</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
