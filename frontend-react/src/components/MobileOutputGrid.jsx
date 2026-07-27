import { motion } from "framer-motion";

import { EASE_ORGANIC, EASE_ENTRANCE } from "../lib/motion";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_ENTRANCE } },
};

/**
 * Compact, in-flow version of the desktop floating cards. Same visual
 * language (glass card, AI Output label, icon) but grid-positioned instead
 * of absolutely anchored, so the hero's value proposition stays visible on
 * screens too narrow for the orbiting layout.
 */
function MobileOutputGrid({ cards }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="md:hidden grid grid-cols-2 gap-3 w-full max-w-md mx-auto mt-8"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            variants={cardVariants}
            className="rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.3)] text-left overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: card.floatDuration, repeat: Infinity, ease: EASE_ORGANIC, delay: card.floatDelay }}
              className="p-3"
            >
              <div className="flex items-center gap-2 text-violet-300">
                <Icon size={14} />
                <span className="text-[9px] uppercase tracking-wider text-violet-300/70">
                  AI Output
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-white/90 leading-snug">{card.title}</p>
              <p className="mt-1 text-[11px] text-white/45 leading-snug">{card.text}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default MobileOutputGrid;
