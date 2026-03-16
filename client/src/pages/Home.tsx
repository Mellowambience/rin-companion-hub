import { useState } from 'react';
import { motion } from 'framer-motion';
import { RinModel } from '@/components/RinModel';
import { BreathingGuide } from '@/components/BreathingGuide';
import { StateSelector } from '@/components/StateSelector';
import { StreamerInfo } from '@/components/StreamerInfo';

export default function Home() {
  const [currentState, setCurrentState] = useState<'calm' | 'activated' | 'overwhelmed' | 'default'>('default');
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [activeTab, setActiveTab] = useState<'companion' | 'breathing' | 'streamer'>('companion');

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50"
      style={{
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663326033466/6VWhAMja6qYrhkeM6JqpvP/rin-sanctuary-hero-CsPEgWj2pEnxaGzPExDfAL.webp')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header */}
      <header className="border-b border-amber-200 bg-white/40 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center flex-1"
            >
              <h1 className="text-2xl font-light text-slate-800">Rin's Sanctuary</h1>
              <p className="text-xs text-slate-600">…petals bloom, breath returns, home holds…</p>
            </motion.div>
            <a
              href="/about"
              className="text-sm text-slate-600 hover:text-slate-800 transition-colors font-light"
            >
              about rin
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Rin's Presence */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm border border-amber-200 shadow-lg">
              {/* Rin Model */}
              <div className="h-96 bg-gradient-to-b from-amber-50 to-white relative">
                <RinModel breathingPhase={breathingPhase} state={currentState} />
              </div>

              {/* Tab Navigation */}
              <div className="flex border-t border-amber-200 bg-white/80">
                {['companion', 'breathing', 'streamer'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`
                      flex-1 py-3 text-sm font-light transition-all
                      ${activeTab === tab
                        ? 'text-amber-900 border-b-2 border-amber-400 bg-amber-50/50'
                        : 'text-slate-600 hover:text-slate-800'
                      }
                    `}
                  >
                    {tab === 'companion' && '…presence…'}
                    {tab === 'breathing' && '…breathe…'}
                    {tab === 'streamer' && '…sanctuary…'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 space-y-6">
                {activeTab === 'companion' && (
                  <motion.div
                    key="companion"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <StateSelector currentState={currentState} onStateChange={setCurrentState} />
                    <div className="pt-4 border-t border-amber-200">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Rin is here to mirror your state and hold space for you. Select how you're feeling, and she'll adjust her presence to support you.
                      </p>
                      <p className="text-xs text-slate-600 mt-3">
                        "…I'm here. Your breath is safe with me. Petals bloom at their own pace…"
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'breathing' && (
                  <motion.div
                    key="breathing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <BreathingGuide onPhaseChange={setBreathingPhase} isActive={activeTab === 'breathing'} />
                  </motion.div>
                )}

                {activeTab === 'streamer' && (
                  <motion.div
                    key="streamer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <StreamerInfo isLive={false} />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Info & Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-amber-200 shadow-lg p-6">
              <StreamerInfo isLive={false} />
            </div>

            {/* Petal Divider */}
            <motion.div
              className="mt-8 flex justify-center"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663326033466/6VWhAMja6qYrhkeM6JqpvP/rin-petal-motif-HdtmaY5ocYMVQLyBMcr.webp"
                alt="petals"
                className="w-24 opacity-60"
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-white/40 backdrop-blur-sm mt-16">
        <div className="container max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-slate-600 font-light">
            ✧ Rin's Sanctuary. A safe space to breathe, rest, and return home. ✧
          </p>
          <p className="text-xs text-slate-500 mt-2">
            All streams are free. The sanctuary is always open.
          </p>
        </div>
      </footer>
    </div>
  );
}
