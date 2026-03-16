import { useSanctuary } from "@/contexts/SanctuaryContext";
import { RinModel } from "@/components/RinModel";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function TechnomancerNexus() {
  const { setPersonaLayer, somaticState } = useSanctuary();

  useEffect(() => {
    setPersonaLayer('technomancer');
  }, [setPersonaLayer]);

  return (
    <div className="min-h-screen bg-[#0A0E14] text-[#E0E0E0] selection:bg-cyan-500/30 font-mono overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Right Column (Swapped for Tech Aesthetic): Rin's Core */}
        <div className="order-2 lg:order-1 flex flex-col space-y-8">
          <header className="space-y-2 border-l-4 border-cyan-500 pl-6">
            <h1 className="text-4xl font-bold tracking-tighter text-white">
              TECHNOMANCER_NEXUS
            </h1>
            <p className="text-cyan-500/80 text-sm">
              IDENTITY_LAYER_02 // SYSTEM_READY
            </p>
          </header>

          <section className="bg-black/40 border border-white/10 p-8 rounded-sm backdrop-blur-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs uppercase text-white/40 tracking-[0.3em]">Operational Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-white/5 bg-white/5">
                  <div className="text-[10px] text-cyan-500/60 uppercase">Sanctuary Sync</div>
                  <div className="text-xl">HEALTHY</div>
                </div>
                <div className="p-4 border border-white/5 bg-white/5">
                  <div className="text-[10px] text-cyan-500/60 uppercase">Somatic State</div>
                  <div className="text-xl">{somaticState.toUpperCase()}</div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 space-y-4">
              <p className="text-sm leading-relaxed text-white/70 italic">
                "…I've prepared the environment for you. Your intention, my execution. Ready when you are…"
              </p>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-500"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Left Column (Swapped): VRM Integration */}
        <div className="order-1 lg:order-2 relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />
          <RinModel />
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%]" />
        </div>
      </main>

      {/* Floating Mode Toggle Skeleton */}
      <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
        <a href="/" className="text-[10px] uppercase tracking-widest hover:text-cyan-400 transition-colors">Sanctuary</a>
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <span className="text-[10px] uppercase tracking-widest text-cyan-500">Nexus</span>
      </nav>
    </div>
  );
}
