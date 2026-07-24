import { motion } from "framer-motion";

function GlassPanel({
  children,
  className = "",
  glow = true,
  hover = true,
  delay = 0,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] ${className}`}
      {...props}
    >
      {glow && (
        <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-violet-500/20 blur-3xl" />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export default GlassPanel;
