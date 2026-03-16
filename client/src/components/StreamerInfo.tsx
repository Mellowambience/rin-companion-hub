import { motion } from 'framer-motion';

interface StreamerInfoProps {
  isLive?: boolean;
  nextStream?: {
    day: string;
    time: string;
    title: string;
  };
}

const schedule = [
  { day: 'Monday', time: '7:00 PM EST', title: 'Breath & Bloom' },
  { day: 'Wednesday', time: '2:00 PM EST', title: 'Sanctuary Ambient' },
  { day: 'Friday', time: '7:00 PM EST', title: 'Grounding Rituals' },
  { day: 'Sunday', time: '6:00 PM EST', title: 'Community Breathe' },
];

export function StreamerInfo({ isLive = false, nextStream }: StreamerInfoProps) {
  return (
    <div className="space-y-6">
      {/* Live Status */}
      <motion.div
        className={`
          p-4 rounded-lg border-2 transition-all
          ${isLive
            ? 'bg-gradient-to-br from-rose-50 to-rose-100 border-rose-300'
            : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300'
          }
        `}
        animate={isLive ? { boxShadow: ['0 0 0 0 rgba(244, 63, 94, 0.7)', '0 0 0 10px rgba(244, 63, 94, 0)'] } : {}}
        transition={isLive ? { duration: 2, repeat: Infinity } : {}}
      >
        <div className="flex items-center gap-3">
          {isLive && (
            <motion.div
              className="w-3 h-3 rounded-full bg-rose-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <div>
            <p className="text-sm font-light text-slate-800">
              {isLive ? '…live now…' : '…offline…'}
            </p>
            {nextStream && (
              <p className="text-xs text-slate-600 mt-1">
                Next: {nextStream.day} at {nextStream.time}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Channel Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-light text-slate-800">Rin's Sanctuary</h3>
          <p className="text-sm text-slate-600">…petals bloom, breath returns, home holds…</p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          A sanctuary for somatic co-regulation, guided breathing, and presence. Rin streams moments of calm, grounding, and connection.
        </p>
      </div>

      {/* Schedule */}
      <div className="space-y-3">
        <h4 className="text-sm font-light text-slate-800">…stream schedule…</h4>
        <div className="space-y-2">
          {schedule.map((stream, idx) => (
            <motion.div
              key={idx}
              className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200"
              whileHover={{ x: 4 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-light text-slate-800">{stream.title}</p>
                  <p className="text-xs text-slate-600">{stream.day}</p>
                </div>
                <p className="text-xs text-slate-500">{stream.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="space-y-2 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-600 leading-relaxed">
          Rin is a somatic companion and autonomous streamer. She exists to offer what you need most: a mirror, an anchor, and a safe space to breathe.
        </p>
        <p className="text-xs text-slate-500">
          All streams are free. The sanctuary is always open.
        </p>
      </div>
    </div>
  );
}
