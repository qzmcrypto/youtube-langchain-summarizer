import { useMemo } from "react";
import { motion } from "framer-motion";

const SIZES = { sm: 14, md: 28, lg: 48 };

function VoiceWave({ barCount = 24, size = "md", color = "bg-violet-300/80", className = "" }) {
  const max = SIZES[size] || SIZES.md;

  const bars = useMemo(
    () =>
      Array.from({ length: barCount }).map(() => ({
        duration: 0.6 + Math.random() * 0.9,
        delay: Math.random() * 0.6,
      })),
    [barCount]
  );

  return (
    <div className={`flex items-end gap-[3px] ${className}`} style={{ height: max }}>
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className={`w-[3px] rounded-full ${color}`}
          animate={{ height: [max * 0.2, max, max * 0.35, max * 0.8, max * 0.2] }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default VoiceWave;
