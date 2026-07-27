import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function FloatingCard({
  icon: Icon,
  title,
  text,
  className = "",
  floatDuration = 4,
  floatDelay = 0,
  floatY = 12,
  floatX = 0,
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`absolute w-40 lg:w-52 p-3 lg:p-4 rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.3)] text-left hidden md:block will-change-transform ${className}`}
    >
      <motion.div
        animate={{ y: [0, -floatY, 0], x: [0, floatX, 0] }}
        transition={{
          y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
          x: { duration: floatDuration * 1.4, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        }}
        className="will-change-transform"
      >
        <div className="flex items-center gap-2 text-violet-300">
          <Icon size={16} />
          <span className="text-[10px] uppercase tracking-wider text-violet-300/70">AI Output</span>
        </div>
        <p className="mt-2 text-sm font-medium text-white/90">{title}</p>
        {text && <p className="mt-1 text-xs text-white/45">{text}</p>}
      </motion.div>
    </motion.div>
  );
}

export default FloatingCard;
