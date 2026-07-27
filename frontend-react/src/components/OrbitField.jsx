import { motion } from "framer-motion";

const RING_DOTS_OUTER = [10, 100, 190, 280];
const RING_DOTS_INNER = [40, 130, 220, 310];

function ringDotStyle(deg) {
  const rad = (deg * Math.PI) / 180;
  return {
    left: `${50 + 50 * Math.cos(rad)}%`,
    top: `${50 + 50 * Math.sin(rad)}%`,
  };
}

/**
 * Subtle orbit rings + curved connecting lines from the orb center to each
 * floating card anchor. Purely decorative, sits behind the orb and cards.
 */
function OrbitField({ anchors = [] }) {
  const center = { x: 50, y: 50 };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none">
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orbitLineFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(196,181,253,0)" />
            <stop offset="45%" stopColor="rgba(196,181,253,0.16)" />
            <stop offset="100%" stopColor="rgba(196,181,253,0)" />
          </linearGradient>
        </defs>
        {anchors.map((a, i) => {
          const dx = a.x - center.x;
          const dy = a.y - center.y;
          const bend = i % 2 === 0 ? 1 : -1;
          const cx = (center.x + a.x) / 2 - dy * 0.14 * bend;
          const cy = (center.y + a.y) / 2 + dx * 0.14 * bend;
          return (
            <motion.path
              key={i}
              d={`M ${center.x} ${center.y} Q ${cx} ${cy} ${a.x} ${a.y}`}
              fill="none"
              stroke="url(#orbitLineFade)"
              strokeWidth="0.35"
              strokeDasharray="1.4 3.4"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{
                duration: 8 + i * 0.9,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] aspect-square rounded-full border border-dashed border-white/[0.06] will-change-transform"
      >
        {RING_DOTS_OUTER.map((deg) => (
          <motion.span
            key={deg}
            animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.4, 1] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: deg / 90,
            }}
            className="absolute w-1 h-1 rounded-full bg-violet-300/80 shadow-[0_0_6px_2px_rgba(196,181,253,0.4)] -translate-x-1/2 -translate-y-1/2"
            style={ringDotStyle(deg)}
          />
        ))}
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full border border-dashed border-white/[0.045] will-change-transform"
      >
        {RING_DOTS_INNER.map((deg) => (
          <motion.span
            key={deg}
            animate={{ opacity: [0.18, 0.55, 0.18], scale: [1, 1.3, 1] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: deg / 80,
            }}
            className="absolute w-[3px] h-[3px] rounded-full bg-indigo-200/60 -translate-x-1/2 -translate-y-1/2"
            style={ringDotStyle(deg)}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default OrbitField;
