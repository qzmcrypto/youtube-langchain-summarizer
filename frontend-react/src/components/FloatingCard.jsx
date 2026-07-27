import { motion } from "framer-motion";

import { EASE_ORGANIC, EASE_ENTRANCE } from "../lib/motion";

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: EASE_ENTRANCE },
  },
};

function FloatingCard({
  icon: Icon,
  title,
  text,
  anchor,
  floatDuration = 7,
  floatDelay = 0,
  floatY = 11,
  floatX = 0,
}) {
  const wobble = floatX >= 0 ? 1.4 : -1.4;

  return (
    // Static positioning wrapper — kept free of Framer's animated transform
    // so the left/top/-50% centering never gets clobbered by motion writes.
    <div
      className="absolute z-10 hidden md:block"
      style={{ left: `${anchor.x}%`, top: `${anchor.y}%`, transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 240, damping: 24 } }}
        className="w-32 md:w-36 lg:w-44 xl:w-48 p-2.5 md:p-3 lg:p-4 rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.3)] text-left will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -floatY, 0], x: [0, floatX, 0], rotate: [0, wobble, 0] }}
          transition={{
            y: { duration: floatDuration, repeat: Infinity, ease: EASE_ORGANIC, delay: floatDelay },
            x: { duration: floatDuration * 1.5, repeat: Infinity, ease: EASE_ORGANIC, delay: floatDelay },
            rotate: { duration: floatDuration * 1.7, repeat: Infinity, ease: EASE_ORGANIC, delay: floatDelay },
          }}
          className="relative will-change-transform"
        >
          <motion.span
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: EASE_ORGANIC, delay: floatDelay }}
            className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_2px_rgba(196,181,253,0.7)]"
          />
          <div className="flex items-center gap-2 text-violet-300">
            <Icon size={15} />
            <span className="text-[9px] lg:text-[10px] uppercase tracking-wider text-violet-300/70">
              AI Output
            </span>
          </div>
          <p className="mt-2 text-xs lg:text-sm font-medium text-white/90 leading-snug">{title}</p>
          {text && <p className="mt-1 text-[11px] lg:text-xs text-white/45 leading-snug">{text}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FloatingCard;
