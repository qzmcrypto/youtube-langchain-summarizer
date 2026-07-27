import { motion } from "framer-motion";
import { Mic } from "lucide-react";

import VoiceWave from "./VoiceWave";

const PARTICLES = Array.from({ length: 10 });

function AIOrb() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* radiating voice-wave rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.7, 1], opacity: [0.25, 0, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
          className="absolute w-36 h-36 rounded-full border border-violet-400/30 will-change-transform"
        />
      ))}

      {/* soft pulsing aura */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-blue-500/20 blur-3xl will-change-transform"
      />

      {/* AI processing particles */}
      {PARTICLES.map((_, i) => {
        const angle = (i / PARTICLES.length) * Math.PI * 2;
        const radius = 95;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_2px_rgba(196,181,253,0.6)]"
            animate={{ x: [0, x, 0], y: [0, y, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* floating glass mic orb */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-36 h-36 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_-8px_rgba(139,92,246,0.65)] flex flex-col items-center justify-center gap-3"
      >
        <Mic size={36} className="text-white drop-shadow-[0_0_10px_rgba(196,181,253,0.8)]" />
        <VoiceWave barCount={9} size="sm" />
      </motion.div>
    </div>
  );
}

export default AIOrb;
