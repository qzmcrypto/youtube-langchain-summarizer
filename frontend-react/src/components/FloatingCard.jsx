import { motion } from "framer-motion";

function FloatingCard({
  icon: Icon,
  title,
  text,
  className = "",
  delay = 0,
  floatDuration = 4,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay },
      }}
      whileHover={{ scale: 1.05 }}
      className={`absolute w-52 p-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.35)] text-left hidden md:block ${className}`}
    >
      <div className="flex items-center gap-2 text-violet-300">
        <Icon size={16} />
        <span className="text-[10px] uppercase tracking-wider text-violet-300/70">AI Output</span>
      </div>
      <p className="mt-2 text-sm font-medium text-white/90">{title}</p>
      {text && <p className="mt-1 text-xs text-white/45">{text}</p>}
    </motion.div>
  );
}

export default FloatingCard;
