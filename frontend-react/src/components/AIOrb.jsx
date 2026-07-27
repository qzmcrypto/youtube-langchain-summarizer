import { motion } from "framer-motion";
import { Mic } from "lucide-react";

import VoiceWave from "./VoiceWave";
import { EASE_ORGANIC } from "../lib/motion";

const ORBIT_A = Array.from({ length: 6 });
const ORBIT_B = Array.from({ length: 4 });

function AIOrb() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* atmospheric halo — sets the orb apart from the background.
          (Previously two stacked blur layers; merged into one to cut a
          redundant composited layer with no visible difference.) */}
      <motion.div
        animate={{ scale: [1, 1.09, 1], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 9, repeat: Infinity, ease: EASE_ORGANIC }}
        className="absolute w-[26rem] h-[26rem] rounded-full bg-violet-600/10 blur-[120px] will-change-transform"
      />

      {/* radiating voice-wave rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.65, 1], opacity: [0.22, 0, 0.22] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: i * 1.8, ease: EASE_ORGANIC }}
          className="absolute w-36 h-36 rounded-full border border-violet-400/25 will-change-transform"
        />
      ))}

      {/* soft pulsing aura */}
      <motion.div
        animate={{ scale: [1, 1.13, 1], opacity: [0.35, 0.62, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: EASE_ORGANIC }}
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-blue-500/20 blur-3xl will-change-transform"
      />

      {/* inner warm core glow, adds depth behind the glass */}
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: EASE_ORGANIC, delay: 0.3 }}
        className="absolute w-24 h-24 rounded-full bg-violet-400/25 blur-2xl will-change-transform"
      />

      {/* AI processing particles — true circular orbit, no yo-yo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 will-change-transform"
      >
        {ORBIT_A.map((_, i) => {
          const angle = (i / ORBIT_A.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const radius = 95;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_2px_rgba(196,181,253,0.6)]"
              style={{
                transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 3.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.35,
                ease: EASE_ORGANIC,
              }}
            />
          );
        })}
      </motion.div>

      {/* secondary, wider orbit for parallax depth */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 will-change-transform"
      >
        {ORBIT_B.map((_, i) => {
          const angle = (i / ORBIT_B.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const radius = 125;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-indigo-200/70 shadow-[0_0_6px_1px_rgba(199,210,254,0.4)]"
              style={{
                transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)`,
              }}
              animate={{ opacity: [0.1, 0.55, 0.1] }}
              transition={{
                duration: 4.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.5,
                ease: EASE_ORGANIC,
              }}
            />
          );
        })}
      </motion.div>

      {/* floating glass mic orb */}
      <motion.div
        animate={{ y: [0, -9, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: EASE_ORGANIC }}
        className="relative z-10 w-36 h-36 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_-8px_rgba(139,92,246,0.65)] flex flex-col items-center justify-center gap-3 will-change-transform overflow-hidden"
      >
        {/* subtle top-left glass highlight for lighting/depth */}
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/25 blur-2xl pointer-events-none" />
        <Mic size={36} className="relative text-white drop-shadow-[0_0_10px_rgba(196,181,253,0.8)]" />
        <VoiceWave barCount={6} size="sm" className="relative" />
      </motion.div>
    </div>
  );
}

export default AIOrb;
